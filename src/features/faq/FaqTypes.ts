/**
 * 대국민포털_FAQ기본 조회 목업 정보 
 */
export const mockFaqList = [
  {
    /** 순번 */
    no: 1,

    /** 업무구분코드 */
    taskSeCd: 'XXX',

    /** FAQ분류 */
    faqClsf: 'XXX',

    /** FAQ제목 */
    faqTtl: 'XXX',

    /** FAQ순서 */
    faqSeq: -1,

    /** 사용여부 */
    useYn: 'XXX',

    /** 언어구분코드 */
    langSeCd: 'XXX',

    /** FAQ답변 */
    faqAns: 'XXX',

    /** 첨부파일아이디 */
    atchFileId: 'XXX',

    /** 작성자부서명 */
    wrtrDeptNm: 'XXX',

    /** 수정자부서명 */
    mdfrDeptNm: 'XXX',

    /** 등록자아이디 */
    rgtrId: 'XXX',

    /** 등록일시 */
    regDt: '2026-01-23',

    /** 등록프로그램아이디 */
    regPrgrmId: 'XXX',

    /** 수정자아이디 */
    mdfrId: 'XXX',

    /** 수정일시 */
    mdfcnDt: '2026-01-23',

    /** 수정프로그램아이디 */
    mdfcnPrgrmId: 'XXX',

  }
]

/**
 * 대국민포털_FAQ기본 조회/입력/수정/저장 파라메터 정보 
 */
export interface FaqPVO {
  /** 업무구분코드 */
  taskSeCd?: string

  /** FAQ분류 */
  faqClsf?: string

  /** FAQ제목 */
  faqTtl?: string

  /** FAQ순서 */
  faqSeq?: number

  /** 사용여부 */
  useYn?: string

  /** 언어구분코드 */
  langSeCd?: string

  /** FAQ답변 */
  faqAns?: string

  /** 첨부파일아이디 */
  atchFileId?: string

  /** 작성자부서명 */
  wrtrDeptNm?: string

  /** 수정자부서명 */
  mdfrDeptNm?: string

  /** 등록자아이디 */
  rgtrId?: string

  /** 등록일시 */
  regDt?: string

  /** 등록프로그램아이디 */
  regPrgrmId?: string

  /** 수정자아이디 */
  mdfrId?: string

  /** 수정일시 */
  mdfcnDt?: string

  /** 수정프로그램아이디 */
  mdfcnPrgrmId?: string

}

/**
 * 대국민포털_FAQ기본 정보 
 */
export interface FaqRVO {
  /** 순번 */
  no?: 1

  /** 업무구분코드 */
  taskSeCd?: string

  /** FAQ분류 */
  faqClsf?: string

  /** FAQ제목 */
  faqTtl?: string

  /** FAQ순서 */
  faqSeq?: number

  /** 사용여부 */
  useYn?: string

  /** 언어구분코드 */
  langSeCd?: string

  /** FAQ답변 */
  faqAns?: string

  /** 첨부파일아이디 */
  atchFileId?: string

  /** 작성자부서명 */
  wrtrDeptNm?: string

  /** 수정자부서명 */
  mdfrDeptNm?: string

  /** 등록자아이디 */
  rgtrId?: string

  /** 등록일시 */
  regDt?: string

  /** 등록프로그램아이디 */
  regPrgrmId?: string

  /** 수정자아이디 */
  mdfrId?: string

  /** 수정일시 */
  mdfcnDt?: string

  /** 수정프로그램아이디 */
  mdfcnPrgrmId?: string

}

/**
 * 대국민포털_FAQ기본 목록 조회용 파라메터 정보 
 */
export interface FaqListPVO {
  /** 업무구분코드 */
  taskSeCd?: string

  /** FAQ분류 */
  faqClsf?: string

  /** FAQ제목 */
  faqTtl?: string

  /** FAQ순서 */
  faqSeq?: number

  /** 사용여부 */
  useYn?: string

  /** 언어구분코드 */
  langSeCd?: string

  /** FAQ답변 */
  faqAns?: string

  /** 첨부파일아이디 */
  atchFileId?: string

  /** 작성자부서명 */
  wrtrDeptNm?: string

  /** 수정자부서명 */
  mdfrDeptNm?: string

  /** 등록자아이디 */
  rgtrId?: string

  /** 등록일시 */
  regDt?: string

  /** 등록프로그램아이디 */
  regPrgrmId?: string

  /** 수정자아이디 */
  mdfrId?: string

  /** 수정일시 */
  mdfcnDt?: string

  /** 수정프로그램아이디 */
  mdfcnPrgrmId?: string

}

/**
 * 대국민포털_FAQ기본 정보 목록 
 */
export interface FaqListRVO {
  list: FaqRVO[]
  totalCount: number
}

/**
 * 대국민포털_FAQ기본 삭제 파라메터 정보 
 */
export interface FaqDVO {
}

//API에서 받아오는 값 한정적으로 고정
export type CategoryCode = 'all' | 'tempClsf1' | 'tempClsf2';

export interface FaqItem {
  title: string;
  content: string;
  category: CategoryCode;
}

export interface FaqParam {
  activeCategory: CategoryCode;
  searchWord: string;
  page: number;
}
