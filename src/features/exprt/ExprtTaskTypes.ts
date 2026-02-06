/**
 * 대국민포털_전문가내업무관리 조회/입력/수정/저장 파라메터 정보 
 */
export interface ExprtTaskPVO {
  /** 전문가번호 */
  exprtNo?: string

  /** 전문가업무일련번호 */
  exprtTaskSn?: string

  /** 회원번호 */
  mbrNo?: string

  /** 회원아이디 */
  mbrId?: string

  /** 사업자등록번호 */
  brno?: string

  /** 사업자업무관리번호 */
  bzmnTaskMngNo?: string
}

/**
 * 대국민포털_전문가업무기본 정보 
 */
export interface ExprtTaskRVO {
  /** 순번 */
  no?: 1

  /** 업무/시스템 라벨 (목록 표시명) */
  label?: string

  /** 업무/시스템 코드 */
  value?: string

  /** 암호화전문가성명 */
  encptExprtFlnm?: string

  /** 반려사유 */
  rjctRsn?: string

  /** 전문가번호 */
  exprtNo?: string

  /** 회원번호 */
  mbrNo?: string

  /** 기관명 */
  instNm?: string

  /** 전문가 승인상태코드 */
  exprtAprvSttsCode?: string

  /** 전문가 승인상태코드라벨 */
  exprtAprvSttsLabel?: string  

  /** 사용여부 */
  useYn?: string

  /** 전문가업무일련번호 */
  exprtTaskSn?: string

  /** 업무시스템 승인상태코드 */
  taskAprvSttsCode?: string

  /** 업무시스템 승인상태코드라벨 */
  taskAprvSttsLabel?: string    

  /** 사업자업무관리번호 */
  bzmnTaskMngNo?: string
}

/**
 * 대국민포털_전문가업무기본 조회 타입 
 */
export interface ExprtTaskFullVO {
  /** 순번 */
  info?: ExprtTaskRVO

  /** 암호화전문가성명 */
  task?: ExprtTaskRVO[]
}