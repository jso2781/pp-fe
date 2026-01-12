/**
 * 대국민포털_게시물기본 조회 목업 정보 
 */
export const mockPstList = [
  {
    /** 순번 */
    no: 1,

    /** 게시판아이디 */
    bbsId: 'XXX',

    /** 게시물제목 */
    pstTtl: 'XXX',

    /** 게시물내용 */
    pstCn: 'XXX',

    /** 게시물공공누리저작권유형코드 */
    pstKoglCprgtTypeCd: 'XXX',

    /** 첨부파일아이디 */
    atchFileId: 'XXX',

    /** 썸네일아이디 */
    thmbId: 'XXX',

    /** 공지여부 */
    ntcYn: 'XXX',

    /** 삭제여부 */
    delYn: 'XXX',

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

    /** 조회수 */
    pstInqCnt: 100
  }
]

/**
 * 대국민포털_게시물기본 조회/입력/수정/저장 파라메터 정보 
 */
export interface PstPVO {
  /** 게시판아이디 */
  bbsId?: string

  /** 게시물제목 */
  pstTtl?: string

  /** 게시물내용 */
  pstCn?: string

  /** 게시물공공누리저작권유형코드 */
  pstKoglCprgtTypeCd?: string

  /** 첨부파일아이디 */
  atchFileId?: string

  /** 썸네일아이디 */
  thmbId?: string

  /** 공지여부 */
  ntcYn?: string

  /** 삭제여부 */
  delYn?: string

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
 * 대국민포털_게시물기본 정보 
 */
export interface PstRVO {
  /** 순번 */
  no?: 1

  /** 게시판아이디 */
  bbsId?: string

  /** 게시물제목 */
  pstTtl?: string

  /** 게시물내용 */
  pstCn?: string

  /** 게시물공공누리저작권유형코드 */
  pstKoglCprgtTypeCd?: string

  /** 첨부파일아이디 */
  atchFileId?: string

  /** 썸네일아이디 */
  thmbId?: string

  /** 공지여부 */
  ntcYn?: string

  /** 삭제여부 */
  delYn?: string

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

  /** 조회수 */
  pstInqCnt?: number
}

/**
 * 대국민포털_게시물기본 목록 조회용 파라메터 정보 
 */
export interface PstListPVO {
  /** 현재 페이지 인덱스 */
  pageNum?: number

  /** 한 페이지에 보여줄 아이템의 개수 */
  pageSize?: number

  /** 게시판아이디 */
  bbsId?: string

  /** 검색조건 */
  searchCnd?: string

  /** 검색어 */
  searchWrd?: string
}

/**
 * 대국민포털_게시물기본 정보 목록 
 */
export interface PstListRVO {
  list: PstRVO[]
  totalCount: number
  totalPages: number
}

/**
 * 대국민포털_게시물기본 삭제 파라메터 정보 
 */
export interface PstDVO {
}

