import { MbrInfoRVO } from "@/features/mbr/MbrInfoTypes"

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

/** Any-ID 로그인 요청 파라미터 (POST /auth/anyid/login) */
export interface AnyIdLoginPVO {
  ssob?: string
  tag?: string
  ci?: string
}

/** Any-ID 로그인 응답 결과 (POST /auth/anyid/login) */
export interface AnyIdLoginRVO {
  /**
   * status: 로그인 상태 (LoggedIn: 로그인 성공, SignUpSel: 회원가입 선택)
   */
  status?: string

  /**
   * Any-ID 본인인증 응답 결과로 CI(Certification Information) 값을 전달 받음.
   * ci: 인증 토큰
   */
  ci?: string

  /**
   * status: 로그인 상태((로그인 성공, status=LoggedIn)일 경우만  회원정보가 전달됨.)
   * 회원정보
   */
  userInfo?: MbrInfoRVO

  /**
   * JWT토큰일련번호((로그인 성공, status=LoggedIn)일 경우만 JWT토큰일련번호가 전달됨.)
   */
  tokenSn?: number

  /**
   * JWT_Access_Token((로그인 성공, status=LoggedIn)일 경우만 JWT_Access_Token가 전달됨.)
   */
  acsTokenCn?: string

  /**
   * JWT_Refresh_Token((로그인 성공, status=LoggedIn)일 경우만 JWT_Refresh_Token가 전달됨.)
   */
  updtTokenCn?: string

  /**
   * 비밀번호오류횟수((로그인 성공, status=LoggedIn)일 경우만 비밀번호오류횟수=0이 전달됨.)
   */
  pswdErrNmtm?: number
}

/** Any-ID 사용자 정보 조회 결과 */
export interface AnyIdUserInfoRVO {
  anyid?: Map<String, Object>         /* Any-ID 세션 정보 */
  sso?: Map<String, Object>           /* SSO 사용자 정보 */
  anyIdUserinfo?: Map<String, Object> /* SSO 사용자 정보와 Any-ID 세션 정보를 모두 가지고 있는 데이터맵 */
}
