/**
 * 대국민포털_기관정보기본 조회 목업 정보 
 */
export const mockInstList = [
  {
    /** 순번 */
    no: 1,

    /** 사업자등록번호 */
    brno: 'XXX',

    /** 기관명 */
    instNm: 'XXX',

    /** 삭제여부 */
    delYn: 'XXX',

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
 * 대국민포털_기관정보기본 조회/입력/수정/저장 파라메터 정보 
 */
export interface InstPVO {
  /** 사업자등록번호 */
  brno?: string

  /** 기관명 */
  instNm?: string

  /** 삭제여부 */
  delYn?: string

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
 * 대국민포털_기관정보기본 정보 
 */
export interface InstRVO {
  /** 순번 */
  no?: 1

  /** 사업자등록번호 */
  brno?: string

  /** 기관명 */
  instNm?: string

  /** 삭제여부 */
  delYn?: string

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
 * 대국민포털_기관정보기본 목록 조회용 파라메터 정보 
 */
export interface InstListPVO {
  /** 사업자등록번호 */
  brno?: string

  /** 기관명 */
  instNm?: string

  /** 삭제여부 */
  delYn?: string

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
 * 대국민포털_기관정보기본 정보 목록 
 */
export interface InstListRVO {
  list: InstRVO[]
  totalCount: number
}

/**
 * 대국민포털_기관정보기본 삭제 파라메터 정보 
 */
export interface InstDVO {
  /** 사업자등록번호 */
  brno: string

}

