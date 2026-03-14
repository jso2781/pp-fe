export interface AnyIdInitPVO {
  tx?: string
}

export interface AnyIdInitRVO {
  cfg?: string        /* Any-ID 설정파일 경로 (기본값: /config/config.anyidc.json) */
  txId?: string       /* Any-ID 트랜잭션 ID(tx) */
  tag?: string        /* Any-ID 태그 */
  lvl?: number        /* Any-ID 레벨(기본값: 3) */
  bypass?: number     /* Any-ID 바이패스(기본값 0: 패스, 1: 비패스) */
  theme?: string      /* Any-ID 테마(기본값: 4.2.2) */
  toggle?: boolean    /* Any-ID 토글(기본값: true) */
}

export interface SsoInfoPVO {
  mt?: string
}

export interface SsoInfoRVO {
  mt?: string
  portalJoinUri?: string
  ssoByPass?: number          /* Any-ID SSO 바이패스(기본값 0: 패스, 1: 비패스) */
  agencyContextPath?: string  /* Any-ID 기관 컨텍스트 경로 (기본값: "") */
}

/** Any-ID 사용자 정보 조회 결과 */
export interface AnyIdUserInfoRVO {
  anyid?: Map<String, Object>         /* Any-ID 세션 정보 */
  sso?: Map<String, Object>           /* SSO 사용자 정보 */
  anyIdUserinfo?: Map<String, Object> /* SSO 사용자 정보와 Any-ID 세션 정보를 모두 가지고 있는 데이터맵 */
}
