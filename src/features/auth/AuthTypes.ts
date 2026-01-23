import { MbrInfoRVO } from "../mbr/MbrInfoTypes"

/**
 * 대국민포털_로그인 요청 파라메터 정보보
 */
export interface AuthPVO {
  /**
   * JWT토큰ID
   */
  tokenId?: number

  /**
   * 회원아이디
   */
  mbrId?: string

  /**
   * 회원암호화비밀번호
   */
  encptMbrPswd?: string

  /**
   * 애플리케이션ID
   */
  appId?: string

  /**
   * JWT_Refresh_Token
   */
  refreshToken?: string

  /**
   * JWT_Access_Token
   */
  accessToken?: string
}

/**
 * 대국민포털_로그인 응답 정보(회원정보 + 토큰정보)
 */
export interface AuthRVO {
  /**
   * 회원번호
   */
  mbrNo?: string

  /**
   * 회원아이디
   */
  mbrId?: string

  /**
   * 회원암호화성명
   */
  encptMbrFlnm?: string

  /**
   * 회원암호화이메일
   */
  encptMbrEmlNm?: string

  /**
   * 회원암호화비밀번호
   */
  encptMbrPswd?: string

  /**
   * 회원암호화전화번호
   */
  encptMbrTelno?: string

  /**
   * 회원유형코드
   */
  mbrTypeCd?: string

  /**
   * 회원가입상태
   */
  mbrJoinSttsCd?: string

  /**
   * 회원가입일시
   */
  mbrJoinDt?: string

  /**
   * 회원탈퇴사유
   */
  mbrWhdwlRsn?: string

  /**
   * 회원탈퇴일시
   */
  mbrWhdwlDt?: string

  /**
   * 이전암호화비밀번호
   */
  bfrEnpswd?: string

  /**
   * 비밀번호변경일시
   */
  pswdChgDt?: string

  /**
   * 비밀번호오류횟수
   */
  pswdErrNmtm?: number

  /**
   * 연계정보식별아이디
   */
  linkInfoIdntfId?: string

  /**
   * 인증토큰
   */
  certTokenVl?: string

  /**
   * 등록자아이디
   */
  rgtrId?: string

  /**
   * 등록일시
   */
  regDt?: string

  /**
   * 등록프로그램아이디
   */
  regPrgrmId?: string

  /**
   * 수정자아이디
   */
  mdfrId?: string

  /**
   * 수정일시
   */
  mdfcnDt?: string

  /**
   * 수정프로그램아이디
   */
  mdfcnPrgrmId?: string

  /**
   * JWT토큰ID
   */
  tokenId?: number

  /**
   * 애플리케이션ID
   */
  appId?: string

  /**
   * JWT_Refresh_Token
   */
  refreshToken?: string

  /**
   * JWT_Access_Token
   */
  accessToken?: string

  /**
   * 자문위원여부
   */
   cnstnMbcmtYn?: string
}

export interface LoginRVO {
  /**
   * 회원정보
   */
  userInfo: AuthRVO

  /**
   * JWT토큰ID
   */
  tokenId: number

  /**
   * JWT_Access_Token
   */
  accessToken: string

  /**
   * JWT_Refresh_Token
   */
  refreshToken: string

  /**
   * 비밀번호오류횟수
   */
  pswdErrNmtm: number
}

export interface RefreshPVO {
  /**
   * JWT토큰ID
   */
  tokenId: number

  /**
   * JWT_Refresh_Token
   */
  refreshToken: string
}

export interface RefreshRVO {
  tokenId: number
  accessToken: string
  refreshToken: string
  pswdErrNmtm: number
  userInfo: MbrInfoRVO
}

export interface LogoutPVO {
  /**
   * JWT토큰ID
   */
  tokenId: number
}

export interface LogoutRVO {
  /**
   * 응답코드
   */
  code: string

  /**
   * 응답메시지
   */
  msg: string
}

export interface LoginExtendRVO {
  /**
   * 응답코드
   */
  code: string

  /**
   * 응답메시지
   */
  msg: string
}