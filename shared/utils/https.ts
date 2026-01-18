import axios, { AxiosInstance } from 'axios'
import i18n from '@/i18n/i18n'
import { store } from '@/store/store'
import type { AppDispatch } from '@/store/store'
import { setAccessToken } from '@/features/auth/AuthSlice'
import { refresh, logout } from '@/features/auth/AuthThunks'
import { RefreshPVO, LogoutPVO } from '@/features/auth/AuthTypes'
import { refreshApiPath } from '@/api/auth/AuthApiPaths'

/**
 * 공통 axios 인스턴스
 * API base URL
 *
 * - development: '/api' (handled by Vite dev-server proxy)
 *   http://localhost:8080/pp/api
 * 
 * - production : '/api' (handled by infra/nginx)
 *   https://www.drugsafe.or.kr/api
 * 
 * NEVER put full origin here.
 */
const apiBaseURL = import.meta.env.VITE_API_BASE_URL ?? '/api'

const https: AxiosInstance = axios.create({
  baseURL: apiBaseURL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
  // Any-ID 로그인은 서버 세션을 사용하므로(기본 샘플과 동일),
  // 개발 환경처럼 API와 UI 오리진이 다를 때 쿠키 전송을 위해 필요
  withCredentials: true
})

// ✅ 모든 요청에 locale 헤더 자동 주입
https.interceptors.request.use((config) => {
  const lang = (i18n.language || 'ko').startsWith('en') ? 'en' : 'ko'

  config.headers = config.headers ?? {}
  // 서버가 요구하는 헤더명에 맞춰 선택:
  config.headers['Accept-Language'] = lang
  // config.headers['X-Locale'] = lang // 필요하면 둘 다

  const token = store.getState().auth.accessToken;
  if(token) config.headers['Authorization'] = `Bearer ${token}`;

  config.headers["X-App-Id"] = import.meta.env.VITE_APP_ID ?? 'kids-pp-dev';

  return config
})

// refresh 동시 호출 방지용
let isRefreshing = false;
let queue: Array<(token: string | null) => void> = [];

function runQueue(token: string | null) {
  queue.forEach((cb) => cb(token));
  queue = [];
}

// https.interceptors.response.use((res) => res, (err) => Promise.reject(err))
// 401이면 refresh 후 재시도
https.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const dispatch: AppDispatch = store.dispatch;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      // 세션 스토리지에서 인증정보(auth) 가져오기
      const authData = sessionStorage.getItem("auth");

      let tokenId1: number | null = null;
      let refreshToken1: string | null = null;

      if (authData) {
        try {
          const parsed = JSON.parse(authData);
          tokenId1 = parsed.tokenId || null;
          refreshToken1 = parsed.refreshToken || null;
        } catch (e) {
          // 파싱 실패 시 별도 키에서 가져오기
          refreshToken1 = sessionStorage.getItem("refreshToken");
        }
      } else {
        refreshToken1 = sessionStorage.getItem("refreshToken");
      }
      
      if (!refreshToken1) {
        // tokenId가 있으면 로그아웃 처리, 없으면 그냥 에러 반환
        if (tokenId1) {
          dispatch(logout({ tokenId: tokenId1 }));
        }
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push((token) => {
            if (!token) return reject(error);
            original.headers.Authorization = `Bearer ${token}`;
            resolve(https(original));
          });
        });
      }

      isRefreshing = true;

      try {
        // refresh API 호출 (baseURL 포함)
        const resp = await axios.post(`${apiBaseURL}${refreshApiPath()}`,{ "tokenId": tokenId1 , "refreshToken": refreshToken1 });

        console.log("/auth/refresh rest api response resp.data=", resp.data);

        // 서버 응답에서 토큰 정보 추출
        const tokenId = resp.data?.data?.tokenId ?? null;
        const newAccessToken = resp.data?.data?.accessToken ?? null;
        const newRefreshToken = resp.data?.data?.refreshToken ?? null;
        const pswdErrNmtm = resp.data?.data?.pswdErrNmtm ?? null;
        const userInfo = resp.data?.data?.userInfo ?? null;

        // Redux store에 새 토큰 저장 (setAccessToken 액션 사용)
        dispatch(setAccessToken({
          tokenId,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          pswdErrNmtm: pswdErrNmtm,
          userInfo
        }));

        // sessionStorage에 통일된 키로 저장 (AuthContext와 동기화)
        if (newRefreshToken) {
          // 기존 auth 데이터 가져오기
          const existingAuth = sessionStorage.getItem("auth");
          let authData: Record<string, unknown> = {};
          if (existingAuth) {
            try {
              authData = JSON.parse(existingAuth) as Record<string, unknown>;
            } catch (e) {
              // 파싱 실패 시 빈 객체 사용
            }
          }
          
          // 토큰 정보 업데이트
          authData.tokenId = tokenId;
          authData.accessToken = newAccessToken;
          authData.refreshToken = newRefreshToken;
          
          // 통일된 키로 저장
          sessionStorage.setItem("auth", JSON.stringify(authData));
          // 하위 호환성을 위해 refreshToken도 별도로 저장
          sessionStorage.setItem("refreshToken", newRefreshToken);
        }

        // 대기 중인 요청들에 새 토큰 전달
        runQueue(newAccessToken);
        
        // 원래 요청에 새 accessToken 설정 후 재시도
        if (newAccessToken) {
          original.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return https(original);
      }catch (e){
        // refresh 실패 시 대기 중인 요청들 모두 실패 처리
        runQueue(null);
        // 로그아웃 처리 (tokenId가 null이면 0 사용, AuthContext와 동일한 로직)
        if (tokenId1) {
          dispatch(logout({ tokenId: tokenId1 }));
        }
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    // 408 Request Timeout 시 로그아웃 처리(서버 Idle Timeout 처리)
    else if(error.response?.status === 408){

      // 세션 스토리지에서 인증정보(auth) 가져오기
      const authData = sessionStorage.getItem("auth");

      if(authData){
        try{
          const parsed = JSON.parse(authData);
          let tokenId = parsed.tokenId || null;

          if(tokenId){
            console.log("408 Request Timeout 시 로그아웃 처리(서버 Idle Timeout 처리) tokenId=", tokenId);
            dispatch(logout({ tokenId }));
            return Promise.reject(error);
          }else{
            console.log("408 Request Timeout 시 로그아웃 처리(서버 Idle Timeout 처리) tokenId 없음");
          }
        }catch(e){}
      }

    }

    return Promise.reject(error);
  }
);

export {https}
