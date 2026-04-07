/**
 * 백엔드 `CryptoEncryptoPVO`와 동일 필드 (암·복호화 단건 VO)
 * 요청 시 보낼 암호화 필드
 */
export interface CryptoEncryptoPVO {
  /** 회원성명 */
  mbrFlnm?: string
  /** 회원이메일 */
  mbrEmlNm?: string
  /** 회원비밀번호 */
  mbrPswd?: string
  /** 직원전화번호 */
  empTelno?: string
  /** 회원전화번호 */
  mbrTelno?: string
  /** 직원이메일명 */
  empEmlNm?: string
  /** 관리자 비밀번호 */
  mngrPswd?: string
  /** 암호화 회원성명 */
  encptMbrFlnm?: string
  /** 암호화 회원이메일 */
  encptMbrEmlNm?: string
  /** 암호화 회원비밀번호 */
  encptMbrPswd?: string
  /** 암호화 회원전화번호 */
  encptMbrTelno?: string
  /** 암호화직원전화번호 */
  encptEmpTelno?: string
  /** 암호화직원이메일명 */
  encptEmpEmlNm?: string
  /** 암호화관리자비밀번호 */
  encptMngrPswd?: string
  /** 자문위원주민등록번호 */
  cnstnMbcmtRrno?: string
  /** 자문위원계좌번호 */
  cnstnMbcmtActno?: string
  /** 암호화자문위원주민등록번호 */
  encptCnstnMbcmtRrno?: string
  /** 암호화자문위원계좌번호 */
  encptCnstnMbcmtActno?: string
  /** 이전비밀번호 */
  bfrPswd?: string
  /** 암호화이전비밀번호 */
  encptBfrPswd?: string
  /** 복호화이전비밀번호 */
  decptBfrPswd?: string
  /** 댓글비밀번호 */
  cmntPswd?: string
  /** 암호화댓글비밀번호 */
  encptCmntPswd?: string
  /** 복호화댓글비밀번호 */
  decptCmntPswd?: string
  /** 담당자전화번호 */
  picTelno?: string
  /** 암호화담당자전화번호 */
  encptPicTelno?: string
  /** 복호화담당자전화번호 */
  decptPicTelno?: string
  /** 법정대리인전화번호 */
  sttyAgtTelno?: string
  /** 암호화법정대리인전화번호 */
  encptSttyAgtTelno?: string
  /** 복호화법정대리인전화번호 */
  decptSttyAgtTelno?: string
  /** 전문가성명 */
  exprtFlnm?: string
  /** 암호화전문가성명 */
  encptExprtFlnm?: string
  /** 복호화전문가성명 */
  decptExprtFlnm?: string
  /** 전문가기관이메일명 */
  exprtInstEmlNm?: string
  /** 암호화전문가기관이메일명 */
  encptExprtInstEmlNm?: string
  /** 복호화전문가기관이메일명 */
  decptExprtInstEmlNm?: string
  /** 작성자성명 */
  wrtrFlnm?: string
  /** 암호화작성자성명 */
  encptWrtrFlnm?: string
  /** 복호화작성자성명 */
  decptWrtrFlnm?: string
  /** 작성자전화번호 */
  wrtrTelno?: string
  /** 암호화작성자전화번호 */
  encptWrtrTelno?: string
  /** 복호화작성자전화번호 */
  decptWrtrTelno?: string
}

/**
 * 복호화 API 응답 `data`에 담기는 결과 필드
 */
export interface CryptoEncryptoRVO {
  /** 회원명 복호화 */
  decptMbrFlnm?: string
  /** 회원 이메일 복호화 */
  decptMbrEmlNm?: string
  /** 회원 전화번호 복호화 */
  decptMbrTelno?: string
  /** 직원 전화번호 복호화 */
  decptEncEmpTelno?: string
  /** 직원 이메일 복호화 */
  decptEmpEmlNm?: string
  /** 자문위원 주민등록번호 복호화 */
  decptCnstnMbcmtRrno?: string
  /** 자문위원 계좌번호 복호화 */
  decptCnstnMbcmtActno?: string
  /** 담당자전화번호 복호화 */
  decptPicTelno?: string
  /** 법정대리인전화번호 복호화 */
  decptSttyAgtTelno?: string
  /** 전문가성명 복호화 */
  decptExprtFlnm?: string
  /** 전문가기관이메일 복호화 */
  decptExprtInstEmlNm?: string
  /** 작성자성명 복호화 */
  decptWrtrFlnm?: string
  /** 작성자전화번호 복호화 */
  decptWrtrTelno?: string
}