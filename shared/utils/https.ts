import axios, { AxiosInstance } from 'axios'
import i18n from '@/i18n/i18n'
import { store } from '@/store/store'
import type { AppDispatch } from '@/store/store'
import { setAcsTokenCn } from '@/features/auth/AuthSlice'
import { logout } from '@/features/auth/AuthThunks'
import { refreshApiPath } from '@/api/auth/AuthApiPaths'
import { useNavigate } from 'react-router-dom'
import { setInternalServerError } from '@/features/ui/uiSlice'

/**
 * 공통 axios 인스턴스
 * API base URL
 *
 * - development: '/api' (handled by Vite dev-server proxy)
 *   http://localhost:8080/pp/api
 * 
 * - production : '/pp/api' (handled by infra/nginx)
 *   빌드 시에는 항상 상대 경로 '/pp/api' 사용 (proxy 미사용)
 * 
 * NEVER put full origin here.
 */
// 빌드 시에는 항상 '/pp/api' 사용 (환경 변수 무시)
const apiBaseURL = import.meta.env.MODE === 'production' 
  ? '/api' 
  : (import.meta.env.VITE_API_BASE_URL ?? '/api')

/** 인증 API 전용 서버 (login, refresh, logout, extend 만 이 도메인으로 호출) */
const authApiBaseURL = import.meta.env.VITE_AUTH_API_BASE_URL ?? 'http://localhost:8088/api/ca'
const AUTH_PATHS = ['/auth/login', '/auth/refresh', '/auth/logout', '/auth/extend']

const https: AxiosInstance = axios.create({
  baseURL: apiBaseURL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
  // Any-ID 로그인은 서버 세션을 사용하므로(기본 샘플과 동일),
  // 개발 환경처럼 API와 UI 오리진이 다를 때 쿠키 전송을 위해 필요
  withCredentials: true
})

// ✅ 모든 요청에 locale 헤더 자동 주입 + 인증 API는 authApiBaseURL로 전송
https.interceptors.request.use((config) => {
  const url = config.url ?? ''
  if (AUTH_PATHS.some((p) => url === p || url.startsWith(p + '?'))) {
    config.baseURL = authApiBaseURL
  }

  const lang = (i18n.language || 'ko').startsWith('en') ? 'en' : 'ko'

  config.headers = config.headers ?? {}
  config.headers['Accept-Language'] = lang
  const token = store.getState().auth.acsTokenCn;
  if(token) config.headers['Authorization'] = `Bearer ${token}`;
  config.headers["X-App-Id"] = import.meta.env.VITE_PRGRM_ID ?? 'kids-pp-dev';

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

      let tokenSn1: number | null = null;
      let updtTokenCn1: string | null = null;

      if (authData) {
        try {
          const parsed = JSON.parse(authData);
          tokenSn1 = parsed.tokenSn || null;
          updtTokenCn1 = parsed.updtTokenCn || null;
        } catch (e) {
          // 파싱 실패 시 별도 키에서 가져오기
          updtTokenCn1 = sessionStorage.getItem("updtTokenCn");
        }
      } else {
        updtTokenCn1 = sessionStorage.getItem("updtTokenCn");
      }
      
      if (!updtTokenCn1) {
        // tokenSn가 있으면 로그아웃 처리, 없으면 그냥 에러 반환
        if (tokenSn1) {
          dispatch(logout({ tokenSn: tokenSn1 }));
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
        const resp = await axios.post(`${authApiBaseURL}${refreshApiPath()}`, { "tokenSn": tokenSn1 , "updtTokenCn": updtTokenCn1 });

        console.log("/auth/refresh rest api response resp.data=", resp.data);

        // 서버 응답에서 토큰 정보 추출
        const tokenSn = resp.data?.data?.tokenSn ?? null;
        const newAcsTokenCn = resp.data?.data?.acsTokenCn ?? null;
        const newUpdtTokenCn = resp.data?.data?.updtTokenCn ?? null;
        const userInfo = resp.data?.data?.userInfo ?? null;

        // Redux store에 새 토큰 저장 (setAcsTokenCn 액션 사용)
        dispatch(setAcsTokenCn(userInfo));

        // sessionStorage에 통일된 키로 저장 (AuthContext와 동기화)
        if (newUpdtTokenCn) {
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
          authData.tokenSn = tokenSn;
          authData.acsTokenCn = newAcsTokenCn;
          authData.updtTokenCn = newUpdtTokenCn;
          
          // 통일된 키로 저장
          sessionStorage.setItem("auth", JSON.stringify(authData));
          // 하위 호환성을 위해 updtTokenCn도 별도로 저장
          sessionStorage.setItem("updtTokenCn", newUpdtTokenCn);
        }

        // 대기 중인 요청들에 새 토큰 전달
        runQueue(newAcsTokenCn);
        
        // 원래 요청에 새 acsTokenCn 설정 후 재시도
        if (newAcsTokenCn) {
          original.headers.Authorization = `Bearer ${newAcsTokenCn}`;
        }
        return https(original);
      }catch (e){
        // refresh 실패 시 대기 중인 요청들 모두 실패 처리
        runQueue(null);
        // 로그아웃 처리 (tokenSn가 null이면 0 사용, AuthContext와 동일한 로직)
        if (tokenSn1) {
          dispatch(logout({ tokenSn: tokenSn1 }));
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
          let tokenSn = parsed.tokenSn || null;

          if(tokenSn){
            console.log("408 Request Timeout 시 로그아웃 처리(서버 Idle Timeout 처리) tokenSn=", tokenSn);
            dispatch(logout({ tokenSn }));
            return Promise.reject(error);
          }else{
            console.log("408 Request Timeout 시 로그아웃 처리(서버 Idle Timeout 처리) tokenSn 없음");
          }
        }catch(e){}
      }

    }
    // 500에러 페이징 처리.
    else if(error.response.status === 500){
      //TODO 특정 restAPI주소만 500에러화면 전환 지정작업 필요.
      const API_URL = error.request.responseURL;
      const criAPIs = ['/dshstyDclr/insertDshstyDclr', '/opnn/insertOpnn'];
      
      if(criAPIs.some(api => API_URL.includes(api))){
        dispatch(setInternalServerError(true));
      }
    }

    return Promise.reject(error);
  }
);

export {https}
