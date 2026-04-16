import axios, { AxiosInstance } from 'axios'
import i18n from '@/i18n/i18n'
import { store } from '@/store/store'
import type { AppDispatch } from '@/store/store'
import { setAcsTokenCn } from '@/features/auth/AuthSlice'
import type { MbrInfoRVO } from '@/features/mbr/MbrInfoTypes'
import { logout } from '@/features/auth/AuthThunks'
import { clearAuthSessionAction } from '@/features/auth/authSessionActions'
import { refreshApiPath } from '@/api/auth/AuthApiPaths'
import { setInternalServerError } from '@/features/ui/uiSlice'

/**
 * 공통 axios 인스턴스
 * API base URL
 *
 * - development: '/api' (handled by Vite dev-server proxy)
 *   http://localhost:8080/api/pp
 *
 * - production : '/api/pp' (handled by infra/nginx)
 *   빌드 시에는 항상 상대 경로 '/api/pp' 사용 (proxy 미사용)
 *
 * NEVER put full origin here.
 */
// 빌드 시에는 항상 '/api/pp/' 사용 (환경 변수 무시)
const apiBaseURL = (import.meta.env.MODE === 'production' || import.meta.env.MODE === 'stg')
  ? '/api/pp'
  : (import.meta.env.VITE_API_BASE_URL ?? '/api')

/** 인증 API 전용 서버 (login, refresh, logout, extend 만 이 도메인으로 호출) */
const authApiBaseURL = import.meta.env.VITE_AUTH_API_BASE_URL ?? 'http://localhost:8088/api/ca/auth'
const AUTH_PATHS = ['/login', '/refresh', '/logout', '/extend', '/workAccessLog/insert']

/** CA API 서버(mail,..) */
const caApiBaseURL = import.meta.env.VITE_CA_API_BASE_URL ?? 'http://localhost:8089/api/ca'
const CA_PATHS = ['/mail/send', '/mail/list']

/** 자문위원 API 전용 서버(자격여부확인(exprtAplyChk), 신청하기(updateExprtAprvStts)) */
const adviceApiBaseURL = import.meta.env.VITE_ADVICE_API_BASE_URL ?? 'http://localhost:8088/api/uex'
const ADVICE_PATHS = ['/exprt/exprtAplyChk', '/exprt/updateExprtAprvStts']

/** CDM API 서버 */
const cdmApiBaseURL = import.meta.env.VITE_CDM_API_BASE_URL ?? 'http://localhost:8090/api/cm'
const CDM_PATHS = ['/community']

const ppApiPathPrefix =
  (import.meta.env.MODE === 'production' || import.meta.env.MODE === 'stg') ? '/api/pp' : (import.meta.env.VITE_API_BASE_URL ?? '/api')

/** PP-be 동일 오리진(또는 Vite proxy) 요청에만 Spring CSRF 헤더 부착 — CA/자문/CDM 등 타 서버에는 쿠키가 없음 */
function isPpBackendRequest(config: { baseURL?: string; url?: string }): boolean {
  const base = config.baseURL ?? apiBaseURL
  if (base === authApiBaseURL || base === caApiBaseURL || base === adviceApiBaseURL || base === cdmApiBaseURL) {
    return false
  }
  return true
}

/** CookieCsrfTokenRepository 기본 쿠키명 */
function readXsrfTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null
  const m = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]*)/)
  if (!m?.[1]) return null
  try {
    return decodeURIComponent(m[1].replace(/^"(.*)"$/, '$1'))
  } catch {
    return m[1].replace(/^"(.*)"$/, '$1')
  }
}

function resolveLgnSeCdFromClient(): string {
  const fromStore = store.getState().auth.lgnSeCd
  if (fromStore != null && fromStore !== '') return String(fromStore)
  try {
    const raw = sessionStorage.getItem('auth')
    if (raw) {
      const p = JSON.parse(raw) as { lgnSeCd?: string }
      if (p?.lgnSeCd != null && p.lgnSeCd !== '') return String(p.lgnSeCd)
    }
  } catch {
    /* ignore */
  }
  return '1'
}

async function requestAnyIdLogoutThenClearClient(dispatch: AppDispatch): Promise<void> {
  const token = store.getState().auth.acsTokenCn
  const lang = (i18n.language || 'ko').startsWith('en') ? 'en' : 'ko'
  try {
    await axios.post(`${ppApiPathPrefix}/auth/anyid/logout`, {}, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Accept-Language': lang,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'X-App-Id': import.meta.env.VITE_PRGRM_ID ?? 'kids-pp-dev',
      },
    })
  } catch {
    /* PP 세션 무효화 실패 시에도 클라이언트 상태는 정리 */
  }
  dispatch(clearAuthSessionAction())
}

async function dispatchLogoutByLoginChannel(dispatch: AppDispatch, tokenSn: number | null): Promise<void> {
  if (resolveLgnSeCdFromClient() === '2') {
    await requestAnyIdLogoutThenClearClient(dispatch)
    return
  }
  if (tokenSn != null) {
    dispatch(logout({ tokenSn }))
  }
}

const https: AxiosInstance = axios.create({
  baseURL: apiBaseURL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
  // Any-ID 로그인은 서버 세션을 사용하므로(기본 샘플과 동일),
  // 개발 환경처럼 API와 UI 오리진이 다를 때 쿠키 전송을 위해 필요
  withCredentials: true
})

/*
 * ✅ 모든 요청에 locale 헤더 자동 주입
 * 1. 인증 API는 authApiBaseURL로 전송
 * 2. 자문위원 API는 adviceApiBaseURL로 전송
 * 3. CDM API는 cdmApiBaseURL로 전송
 * 4. 그 이외 API는 기본적으로 포탈 사용자 API(pp-be) 전송송
 */
https.interceptors.request.use((config) => {
  const url = config.url ?? ''
  if (AUTH_PATHS.some((p) => (url === p || url.startsWith(p + '?')) && !url.startsWith('/anyid/login'))) {
    config.baseURL = authApiBaseURL
  }
  else if(CA_PATHS.some((p) => url === p || url.startsWith(p + '?'))) {
    config.baseURL = caApiBaseURL
  }
  else if(ADVICE_PATHS.some((p) => url === p || url.startsWith(p + '?'))) {
    config.baseURL = adviceApiBaseURL
  }
  else if(CDM_PATHS.some((p) => url.includes(p) || url.startsWith(p + '?'))) {
    config.baseURL = cdmApiBaseURL
  }

  const method = (config.method ?? 'get').toLowerCase()
  if (isPpBackendRequest(config) && ['post', 'put', 'patch', 'delete'].includes(method)) {
    const xsrf = readXsrfTokenFromCookie()
    if (xsrf) {
      config.headers = config.headers ?? {}
      config.headers['X-XSRF-TOKEN'] = xsrf
    }
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
      let lgnSeCd1: string | null = null;

      if (authData) {
        try {
          const parsed = JSON.parse(authData);
          tokenSn1 = parsed.tokenSn || null;
          updtTokenCn1 = parsed.updtTokenCn || null;
          lgnSeCd1 = parsed.lgnSeCd || null;
        } catch (e) {
          // 파싱 실패 시 별도 키에서 가져오기
          updtTokenCn1 = sessionStorage.getItem("updtTokenCn");
        }
      } else {
        updtTokenCn1 = sessionStorage.getItem("updtTokenCn");
        lgnSeCd1 = store.getState().auth.lgnSeCd;
      }

      // 401이고 refresh 토큰이 없을 때 더 이상 엑세스 토큰을 갱신 못 하니 강제 로그아웃 처리
      if (!updtTokenCn1) {
        await dispatchLogoutByLoginChannel(dispatch, tokenSn1);
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

        // RefreshRVO: lgnSeCd·토큰은 data 최상위, userInfo는 별도 — userInfo만 넘기면 회원객체의 lgnSeCd(예: 과거 자체로그인 1)가 남아 Any-ID(2) 세션과 불일치
        const d = resp.data?.data ?? {}
        const tokenSn = d.tokenSn ?? null
        const newAcsTokenCn = d.acsTokenCn ?? null
        const newUpdtTokenCn = d.updtTokenCn ?? null
        const pswdErrNmtm = d.pswdErrNmtm
        const userInfoRaw = d.userInfo ?? null
        type UserInfoShape = Record<string, unknown> & { lgnSeCd?: string }
        const ui = userInfoRaw as UserInfoShape | null

        // Redux Store의 AuthSlice에 저장할 데이터 생성(신규 newAcsTokenCn, newUpdtTokenCn, pswdErrNmtm 등 포함)
        const mergedForStore =
          ui != null
            ? {
                ...ui,
                lgnSeCd: lgnSeCd1 ?? ui.lgnSeCd,
                tokenSn: tokenSn ?? (ui.tokenSn as number | undefined),
                acsTokenCn: newAcsTokenCn ?? (ui.acsTokenCn as string | undefined),
                updtTokenCn: newUpdtTokenCn ?? (ui.updtTokenCn as string | undefined),
                pswdErrNmtm: pswdErrNmtm ?? ui.pswdErrNmtm,
              }
            : ({
                lgnSeCd: lgnSeCd1,
                tokenSn,
                acsTokenCn: newAcsTokenCn,
                updtTokenCn: newUpdtTokenCn,
                pswdErrNmtm,
              } as UserInfoShape)

        // Redux Store의 AuthSlice에 저장(AuthSlice.setAcsTokenCn)
        dispatch(setAcsTokenCn(mergedForStore as MbrInfoRVO))

        // sessionStorage에 통일된 키로 저장 (AuthContext와 동기화)
        if (newUpdtTokenCn) {
          const existingAuth = sessionStorage.getItem("auth")
          let authData: Record<string, unknown> = {}
          if (existingAuth) {
            try {
              authData = JSON.parse(existingAuth) as Record<string, unknown>
            } catch {
              /* ignore */
            }
          }

          authData.tokenSn = tokenSn
          authData.acsTokenCn = newAcsTokenCn
          authData.updtTokenCn = newUpdtTokenCn
          if (lgnSeCd1 != null && lgnSeCd1 !== "") {
            authData.lgnSeCd = lgnSeCd1
          }
          if (ui != null) {
            authData.userInfo = {
              ...ui,
              lgnSeCd: lgnSeCd1 ?? ui.lgnSeCd,
            }
          }

          // sessionStorage에 auth 데이터 저장
          sessionStorage.setItem("auth", JSON.stringify(authData))
          // 하위 호환성을 위해 updtTokenCn도 별도로 저장
          sessionStorage.setItem("updtTokenCn", newUpdtTokenCn)
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
        await dispatchLogoutByLoginChannel(dispatch, tokenSn1);
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
          const parsed = JSON.parse(authData) as { tokenSn?: number; lgnSeCd?: string };
          const tokenSn = parsed.tokenSn || null;
          const lgn = parsed.lgnSeCd ?? store.getState().auth.lgnSeCd;

          if (String(lgn ?? '1') === '2') {
            console.log('408 Request Timeout — Any-ID 로그아웃 처리');
            await requestAnyIdLogoutThenClearClient(dispatch);
            return Promise.reject(error);
          }
          if(tokenSn){
            console.log("408 Request Timeout 시 자체로그인에 대한 로그아웃 처리(서버 Idle Timeout 처리) tokenSn=", tokenSn);
            dispatch(logout({ tokenSn }));
            return Promise.reject(error);
          }
          console.log("408 Request Timeout 시 로그아웃 처리(서버 Idle Timeout 처리) tokenSn 없음");
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
