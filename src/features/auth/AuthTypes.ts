import { MbrInfoRVO } from "../mbr/MbrInfoTypes"

/**
 * 대국민포털_로그인 요청 파라메터 정보보
 */
export interface LoginPVO {
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

export interface LoginRVO {
  /**
   * 회원정보
   */
  userInfo: MbrInfoRVO

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