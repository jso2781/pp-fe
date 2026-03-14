/**
 * ANY-ID SSO 기본 정보 조회
 */
export const ssoInfoApiPath = () => '/auth/anyid/ssoInfo';

/**
 * ANY-ID 초기화 정보 조회
 */
export const anyIdInitApiPath = () => '/auth/anyid/init';

/**
 * ANY-ID 사용자 정보 조회
 * (SSO 사용자 정보와 Any-ID 세션 정보를 조회)
 */
export const anyIdUserInfoApiPath = () => '/auth/anyid/userInfo';
