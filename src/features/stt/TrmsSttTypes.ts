/**
 * 대국민포털_약관법령기본 조회 목업 정보 
 */
export const mockTrmsSttList = [
  {
    /** 순번 */
    no: 1,

    /** 약관법령코드 */
    trmsSttCd: 'XXX',

    /** 약관법령적용일 */
    trmsSttAplcnYmd: 'XXX',

    /** 약관법령종료일 */
    trmsSttEndYmd: 'XXX',

    /** 약관법령내용 */
    trmsSttCn: 'XXX',

    /** 첨부파일그룹아이디 */
    atchFileGroupId: 'XXX',

    /** 작성자부서명 */
    wrtrDeptNm: 'XXX',

    /** 수정자부서명 */
    mdfrDeptNm: 'XXX',

    /** 등록자아이디 */
    rgtrId: 'XXX',

    /** 등록일시 */
    regDt: '2026-01-23',
    /** 수정자아이디 */
    mdfrId: 'XXX',

    /** 수정일시 */
    mdfcnDt: '2026-01-23'
  }
]

/**
 * 대국민포털_약관법령기본 조회/입력/수정/저장 파라메터 정보 
 */
export interface TrmsSttPVO {
  /** 약관법령코드 */
  trmsSttCd?: string

  /** 약관법령적용일 */
  trmsSttAplcnYmd?: string

  /** 약관법령종료일 */
  trmsSttEndYmd?: string

  /** 약관법령내용 */
  trmsSttCn?: string

  /** 첨부파일그룹아이디 */
  atchFileGroupId?: string

  /** 작성자부서명 */
  wrtrDeptNm?: string

  /** 수정자부서명 */
  mdfrDeptNm?: string

  /** 등록자아이디 */
  rgtrId?: string

  /** 등록일시 */
  regDt?: string
  /** 수정자아이디 */
  mdfrId?: string

  /** 수정일시 */
  mdfcnDt?: string
}

/**
 * 대국민포털_약관법령기본 정보 
 */
export interface TrmsSttRVO {
  /** 순번 */
  no?: 1

  /** 약관법령코드 */
  trmsSttCd?: string

  /** 약관법령적용일 */
  trmsSttAplcnYmd?: string

  /** 약관법령종료일 */
  trmsSttEndYmd?: string

  /** 약관법령내용 */
  trmsSttCn?: string

  /** 첨부파일그룹아이디 */
  atchFileGroupId?: string

  /** 작성자부서명 */
  wrtrDeptNm?: string

  /** 수정자부서명 */
  mdfrDeptNm?: string

  /** 등록자아이디 */
  rgtrId?: string

  /** 등록일시 */
  regDt?: string
  /** 수정자아이디 */
  mdfrId?: string

  /** 수정일시 */
  mdfcnDt?: string
  /** 상위업무코드(TB_PP_M_TASK_CD.up_task_cd) */
  upTaskCd?: string
  
  /** 업무코드명(TB_PP_M_TASK_CD.task_cd_nm) */
  taskCdNm?: string
}

/**
 * 대국민포털_약관법령기본 목록 조회용 파라메터 정보 
 */
export interface TrmsSttListPVO {
  /** 약관법령코드 */
  trmsSttCd?: string

  /** 약관법령적용일 */
  trmsSttAplcnYmd?: string

  /** 약관법령종료일 */
  trmsSttEndYmd?: string

  /** 약관법령내용 */
  trmsSttCn?: string

  /** 첨부파일그룹아이디 */
  atchFileGroupId?: string

  /** 작성자부서명 */
  wrtrDeptNm?: string

  /** 수정자부서명 */
  mdfrDeptNm?: string

  /** 등록자아이디 */
  rgtrId?: string

  /** 등록일시 */
  regDt?: string
  /** 수정자아이디 */
  mdfrId?: string

  /** 수정일시 */
  mdfcnDt?: string
}

/**
 * 대국민포털_약관법령기본 정보 목록 
 */
export interface TrmsSttListRVO {
  list: TrmsSttRVO[]
  totalCount: number
}

/**
 * 대국민포털_약관법령기본 삭제 파라메터 정보 
 */
export interface TrmsSttDVO {
}

/**
 * 대국민포털_약관법령기본 조회 목업 정보 
 */
export const mockTrmsListForSignUp = [
  {
    /** 약관법령코드 */
    trmsSttCd: 'UTZTN',

      /** 상위업무코드(TB_PP_M_TASK_CD.up_task_cd) */
    upTaskCd: 'TRMS',
  
  /** 업무코드명(TB_PP_M_TASK_CD.task_cd_nm) */
    taskCdNm: '이용약관',

    /** 약관법령적용일 */
    trmsSttAplcnYmd: '20260115',

    /** 약관법령종료일 */
    trmsSttEndYmd: '20261231',

    /** 약관법령내용 */
    trmsSttCn: '이용약관 상세 내용입니다.<br/>내용이 길어지면 자동으로 스크롤이 생성됩니다.11'
  },
  {
    /** 약관법령코드 */
    trmsSttCd: 'CLCT',

      /** 상위업무코드(TB_PP_M_TASK_CD.up_task_cd) */
    upTaskCd: 'TRMS',
  
  /** 업무코드명(TB_PP_M_TASK_CD.task_cd_nm) */
    taskCdNm: '개인정보 수집〮이용 동의',

    /** 약관법령적용일 */
    trmsSttAplcnYmd: '20260115',

    /** 약관법령종료일 */
    trmsSttEndYmd: '20261231',

    /** 약관법령내용 */
    trmsSttCn: '개인정보 수집 및 이용동의 상세 내용입니다.22'
  },
  {
    /** 약관법령코드 */
    trmsSttCd: 'STTY_AGT',

      /** 상위업무코드(TB_PP_M_TASK_CD.up_task_cd) */
    upTaskCd: 'TRMS',
  
  /** 업무코드명(TB_PP_M_TASK_CD.task_cd_nm) */
    taskCdNm: '개인정보 수집〮이용 동의_법정대리인',

    /** 약관법령적용일 */
    trmsSttAplcnYmd: '20260115',

    /** 약관법령종료일 */
    trmsSttEndYmd: '20261231',

    /** 약관법령내용 */
    trmsSttCn: '만 14세 미만 아동에 관한 개인정보 수집〮이용 동의_법정대리인 상세 내용입니다.33'
  },
  {
    /** 약관법령코드 */
    trmsSttCd: 'STT_PRVC',

      /** 상위업무코드(TB_PP_M_TASK_CD.up_task_cd) */
    upTaskCd: 'STT',
  
  /** 업무코드명(TB_PP_M_TASK_CD.task_cd_nm) */
    taskCdNm: '개인정보취급방침',

    /** 약관법령적용일 */
    trmsSttAplcnYmd: '20260115',

    /** 약관법령종료일 */
    trmsSttEndYmd: '20261231',

    /** 약관법령내용 */
    trmsSttCn: '개인정보취급방침 상세 내용입니다.44'
  }
]
