/**
 * ANY-ID SSO 기본 정보 조회
 */
export const ssoInfoApiPath = () => '/auth/anyid/ssoInfo';

/**
 * ANY-ID 초기화 정보 조회
 */
export const anyIdInitApiPath = () => '/auth/anyid/init';

/**
 * ANY-ID 로그인 (ssob/tag/ci 전송, 세션 생성)
 */
export const anyIdLoginApiPath = () => '/auth/anyid/login';

/**
 * ANY-ID 로그아웃 (PP 서버 세션 무효화, 접속이력 lgnSeCd=2)
 */
export const anyIdLogoutApiPath = () => '/auth/anyid/logout';

/**
 * ANY-ID 사용자 정보 조회
 * (SSO 사용자 정보와 Any-ID 세션 정보를 조회)
 */
export const anyIdUserInfoApiPath = () => '/auth/anyid/userInfo';

/**
 * ANY-ID 인증완료 후 전달받은 ssob를 복호화 후 ssob 정보중에 CI 정보를 추출
 */
export const anyIdCiFromSsobApiPath = () => '/auth/anyid/getCiFromSsob';

/**
 * ANY-ID 인증완료 후 전달받은 ssob를 복호화 후 ssob 내용 전체(JSON)를 추출
 */
export const anyIdUserInfoFromSsobApiPath = () => '/auth/anyid/getUserInfoFromSsob';