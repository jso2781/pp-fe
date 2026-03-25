import { MbrInfoRVO } from "../mbr/MbrInfoTypes"

/**
 * 대국민포털_로그인 요청 파라메터 정보보
 */
export interface LoginPVO {
  /**
   * JWT토큰일련번호
   */
  tokenSn?: number

  /**
   * 회원아이디
   */
  mbrId?: string

  /**
   * 회원암호화비밀번호
   */
  encptMbrPswd?: string

  /**
   * 프로그램아이디
   */
  prgrmId?: string

  /**
   * JWT_Refresh_Token
   */
  updtTokenCn?: string

  /**
   * JWT_Access_Token
   */
  acsTokenCn?: string
}

export interface LoginRVO {
  /**
   * 회원정보
   */
  userInfo: MbrInfoRVO

  /**
   * 로그인구분코드 (1 : ID 로그인 , 2 : 애니아이디 로그인)
   */
  lgnSeCd: string

  /**
   * JWT토큰일련번호
   */
  tokenSn: number

  /**
   * JWT_Access_Token
   */
  acsTokenCn: string

  /**
   * JWT_Refresh_Token
   */
  updtTokenCn: string

  /**
   * 비밀번호오류횟수
   */
  pswdErrNmtm: number
}

export interface RefreshPVO {
  /**
   * JWT토큰일련번호
   */
  tokenSn: number

  /**
   * JWT_Refresh_Token
   */
  updtTokenCn: string
}

export interface RefreshRVO {
  lgnSeCd: string
  tokenSn: number
  acsTokenCn: string
  updtTokenCn: string
  pswdErrNmtm: number
  userInfo: MbrInfoRVO
}

export interface LogoutPVO {
  /**
   * JWT토큰일련번호
   */
  tokenSn: number
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