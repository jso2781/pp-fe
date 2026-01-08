/**
 * 대국민포털_게시판기본 조회 목업 정보 
 */
export const mockBbsList = [
  {
    /** 순번 */
    no: 1,

    /** 게시판아이디 */
    bbsId: 'XXX',

    /** 게시판명 */
    bbsNm: 'XXX',

    /** 게시판속성 */
    bbsAtrb: 'XXX',

    /** 게시판설명 */
    bbsExpln: 'XXX',

    /** 게시판요약 */
    bbsSmry: 'XXX',

    /** 댓글사용여부 */
    cmntUseYn: 'XXX',

    /** 조회수노출여부 */
    inqCntExpsrYn: 'XXX',

    /** 부서노출여부 */
    deptExpsrYn: 'XXX',

    /** 파일첨부여부 */
    fileAtchYn: 'XXX',

    /** 첨부가능파일수 */
    atchPsbltyFileCnt: -1,

    /** 언어구분코드 */
    langSeCd: 'XXX',

    /** 사용여부 */
    useYn: 'XXX',

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
 * 대국민포털_게시판기본 조회/입력/수정/저장 파라메터 정보 
 */
export interface BbsPVO {
  /** 게시판아이디 */
  bbsId?: string

  /** 게시판명 */
  bbsNm?: string

  /** 게시판속성 */
  bbsAtrb?: string

  /** 게시판설명 */
  bbsExpln?: string

  /** 게시판요약 */
  bbsSmry?: string

  /** 댓글사용여부 */
  cmntUseYn?: string

  /** 조회수노출여부 */
  inqCntExpsrYn?: string

  /** 부서노출여부 */
  deptExpsrYn?: string

  /** 파일첨부여부 */
  fileAtchYn?: string

  /** 첨부가능파일수 */
  atchPsbltyFileCnt?: number

  /** 언어구분코드 */
  langSeCd?: string

  /** 사용여부 */
  useYn?: string

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
 * 대국민포털_게시판기본 정보 
 */
export interface BbsRVO {
  /** 순번 */
  no?: 1

  /** 게시판아이디 */
  bbsId?: string

  /** 게시판명 */
  bbsNm?: string

  /** 게시판속성 */
  bbsAtrb?: string

  /** 게시판설명 */
  bbsExpln?: string

  /** 게시판요약 */
  bbsSmry?: string

  /** 댓글사용여부 */
  cmntUseYn?: string

  /** 조회수노출여부 */
  inqCntExpsrYn?: string

  /** 부서노출여부 */
  deptExpsrYn?: string

  /** 파일첨부여부 */
  fileAtchYn?: string

  /** 첨부가능파일수 */
  atchPsbltyFileCnt?: number

  /** 언어구분코드 */
  langSeCd?: string

  /** 사용여부 */
  useYn?: string

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
 * 대국민포털_게시판기본 목록 조회용 파라메터 정보 
 */
export interface BbsListPVO {
  /** 게시판아이디 */
  bbsId?: string

  /** 게시판명 */
  bbsNm?: string

  /** 게시판속성 */
  bbsAtrb?: string

  /** 게시판설명 */
  bbsExpln?: string

  /** 게시판요약 */
  bbsSmry?: string

  /** 댓글사용여부 */
  cmntUseYn?: string

  /** 조회수노출여부 */
  inqCntExpsrYn?: string

  /** 부서노출여부 */
  deptExpsrYn?: string

  /** 파일첨부여부 */
  fileAtchYn?: string

  /** 첨부가능파일수 */
  atchPsbltyFileCnt?: number

  /** 언어구분코드 */
  langSeCd?: string

  /** 사용여부 */
  useYn?: string

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
 * 대국민포털_게시판기본 정보 목록 
 */
export interface BbsListRVO {
  list: BbsRVO[]
  totalCount: number
}

/**
 * 대국민포털_게시판기본 삭제 파라메터 정보 
 */
export interface BbsDVO {
  /** 게시판아이디 */
  bbsId: string

}

