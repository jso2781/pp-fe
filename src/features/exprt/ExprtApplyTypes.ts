/**
 * 대국민포털_전문가회원전환신청관리 조회/입력/수정/저장 파라메터 정보 
 */
export interface ExprtApplyPVO {
  /** 회원번호 */
  mbrNo?: string

  /** 회원아이디 */
  mbrId?: string

  /** 사업자등록번호 */
  brno?: string

  /** 이메일 */
  email?: string

  /** 전문가재직여부 */
  exprtHdofYn?: string

  /** 업무시스템 코드목록 */
  taskSystemCodes?: string[]
}

/**
 * 대국민포털_전문가회원전환신청관리 업무시스템 
 */
export interface ExprtApplyTaskVO {

  /** 업무 시스템명 */
  label?: string

  /** 업무 시스템 코드 */
  value?: string
}

/**
 * 대국민포털_전문가회원전환신청관리 조회 정보 
 */
export interface ExprtApplyRVO {

  /** 기관명 */
  instNm?: string

  /** 사용중인 업무 시스템 목록 */
  taskSystemList?: ExprtApplyTaskVO[]
}