import { AtchRVO } from "../atch/AtchTypes"

/**
 * 대국민포털_전문가업무신청관리 조회 파라메터 정보 
 */
export interface ExprtApprovalPVO {
  /** 회원번호 */
  mbrNo?: string

  /** 전문가업무일련번호 */
  exprtTaskSn?: string

  /** 현재 페이지 인덱스 */
  pageNum?: number

  /** 한 페이지에 보여줄 아이템의 개수 */
  pageSize?: number  

  /** 검색조건 */
  searchCnd?: string

  /** 검색어 */
  searchWrd?: string  

  /** 승인상태코드 */
  aprvSttsCode?: string

  /** 업무구분코드 */
  taskSeCd?: string

  /** 사업자업무관리번호 목록 */
  bzmnTaskMngNos?: string[];
}

/**
 * 대국민포털_전문가업무신청관리 수정 파라메터 정보 
 */
export interface ExprtApprovalUVO {

  /** 전문가업무일련번호 */
  exprtTaskSn?: string

  /** 전문가번호 */
  exprtNo?: string
  
  /** 회원아이디 */
  mbrId?: string

  /** 회원번호 */
  mbrNo?: string

  /** 전문가 승인상태코드 */
  exprtAprvSttsCode?: string

  /** 전문가 전환 반려사유 */
  exprtRjctRsn?: string

  /** 업무시스템 승인상태코드 */
  taskAprvSttsCode?: string

  /** 업무시스템 반려사유 */
  taskRjctRsn?: string

  /** 전문가 업무시스템 권한 목록 */
  taskAuthList?: ExprtTaskAuthRVO[]  
}

/**
 * 대국민포털_전문가업무신청관리 정보 
 */
export interface ExprtApprovalRVO {
  /** 순번 */
  no?: 1

  /** 회원번호 */
  mbrNo?: string

  /** 회원아이디 */
  mbrId?: string  

  /** 성명 */
  name?: string

  /** 전화번호 */
  telNo?: string  

  /** 전문가번호 */
  exprtNo?: string  

  /** 기관명 */
  instNm?: string

  /** 기관이메일 */
  instEmlNm?: string

  /** 전문가재직여부 */
  exprtHdofYn?: string

  /** 업무/시스템 라벨 (목록 표시명) */
  label?: string

  /** 업무/시스템 코드 */
  value?: string

  /** 업무시스템 신청일시 */
  taskApplyRegDt?: string

  /** 전문가 전환 승인처리일시 */
  exprtAprvPrcsDt?: string

  /** 전문가 전환 반려사유 */
  exprtRjctRsn?: string  

  /** 전문가 승인상태코드 */
  exprtAprvSttsCode?: string  

  /** 전문가 승인상태코드라벨 */
  exprtAprvSttsLabel?: string  

  /** 전문가업무일련번호 */
  exprtTaskSn?: string

  /** 업무시스템 승인처리일시 */
  taskAprvPrcsDt?: string

  /** 업무시스템 반려사유 */
  taskRjctRsn?: string

  /** 업무시스템 승인상태코드 */
  taskAprvSttsCode?: string

  /** 업무시스템 승인상태코드라벨 */
  taskAprvSttsLabel?: string    

  /** 전문가 회원 전환 신청일시 */
  exprtInfoRegDt?: string

  /** 사업자업무관리번호 */
  bzmnTaskMngNo?: string

  /** 파일객체 */
  file?: AtchRVO
}

/**
 * 대국민포털_전문가업무신청관리 권한 정보 
 */
export interface ExprtTaskAuthRVO {
  /** 권한코드 */
  authrtCd?: string

  /** 권한명 */
  authrtNm?: string
}

/**
 * 대국민포털_전문가업무신청관리 정보 목록 
 */
export interface ExprtApprovalListRVO {
  list: ExprtApprovalRVO[]
  totalCount: number
  totalPages: number
}

/**
 * 대국민포털_전문가업무신청관리 상세 정보
 */
export interface ExprtApprovalDetailRVO {
  detail: ExprtApprovalRVO
  authList: ExprtTaskAuthRVO[]
  defenseYn: false;
}