/** 자문위원 자격여부 요청 파라미터 */
export interface MbcmtApplyPVO {
  mbrNo?: number
  cnstnMbcmtId?: string
  exprtFlnm?: string
  encptCnstnMbcmtTelno?: string
}

/** 자격여부 체크 응답 */
export interface MbcmtApplyRVO {
  resCd: '0' | '1'
  resMsg: string
}
