/**
 * 대국민포털_DUR효능군중복성분기본 조회 목업 정보 
 */
export const mockDurEftgrpIgrdList = [
  {
    /** 순번 */
    no: 1,

    /** 효능군중복일련번호 */
    eftgrpDpcnSn: 'XXX',

    /** 효능군명 */
    eftgrpNm: 'XXX',

    /** 계통명 */
    bsysNm: 'XXX',

    /** 한글성분명 */
    kornIgrdNm: 'XXX',

    /** 영문성분명 */
    engIgrdNm: 'XXX',

    /** 비고 */
    rmrk: 'XXX',

    /** 식약처제품명 */
    mfdsPrdctNm: 'XXX',

    /** 식약처성분코드 */
    mfdsIgrdCd: 'XXX',

    /** 식약처성분명 */
    mfdsIgrdNm: 'XXX',

    /** 적용년월 */
    aplcnYm: 'XXX',

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
 * 대국민포털_DUR효능군중복성분기본 조회/입력/수정/저장 파라메터 정보 
 */
export interface DurEftgrpIgrdPVO {
  /** 효능군중복일련번호 */
  eftgrpDpcnSn?: string

  /** 효능군명 */
  eftgrpNm?: string

  /** 계통명 */
  bsysNm?: string

  /** 한글성분명 */
  kornIgrdNm?: string

  /** 영문성분명 */
  engIgrdNm?: string

  /** 비고 */
  rmrk?: string

  /** 식약처제품명 */
  mfdsPrdctNm?: string

  /** 식약처성분코드 */
  mfdsIgrdCd?: string

  /** 식약처성분명 */
  mfdsIgrdNm?: string

  /** 적용년월 */
  aplcnYm?: string

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
 * 대국민포털_DUR효능군중복성분기본 정보 
 */
export interface DurEftgrpIgrdRVO {
  /** 순번 */
  no?: 1

  /** 효능군중복일련번호 */
  eftgrpDpcnSn?: string

  /** 효능군명 */
  eftgrpNm?: string

  /** 계통명 */
  bsysNm?: string

  /** 한글성분명 */
  kornIgrdNm?: string

  /** 영문성분명 */
  engIgrdNm?: string

  /** 비고 */
  rmrk?: string

  /** 식약처제품명 */
  mfdsPrdctNm?: string

  /** 식약처성분코드 */
  mfdsIgrdCd?: string

  /** 식약처성분명 */
  mfdsIgrdNm?: string

  /** 적용년월 */
  aplcnYm?: string

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
 * 대국민포털_DUR효능군중복성분기본 목록 조회용 파라메터 정보 
 */
export interface DurEftgrpIgrdListPVO {
  /** 효능군중복일련번호 */
  eftgrpDpcnSn?: string

  /** 효능군명 */
  eftgrpNm?: string

  /** 계통명 */
  bsysNm?: string

  /** 한글성분명 */
  kornIgrdNm?: string

  /** 영문성분명 */
  engIgrdNm?: string

  /** 비고 */
  rmrk?: string

  /** 식약처제품명 */
  mfdsPrdctNm?: string

  /** 식약처성분코드 */
  mfdsIgrdCd?: string

  /** 식약처성분명 */
  mfdsIgrdNm?: string

  /** 적용년월 */
  aplcnYm?: string

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
 * 대국민포털_DUR효능군중복성분기본 정보 목록 
 */
export interface DurEftgrpIgrdListRVO {
  list: DurEftgrpIgrdRVO[]
  totalCount: number
}

/**
 * 대국민포털_DUR효능군중복성분기본 삭제 파라메터 정보 
 */
export interface DurEftgrpIgrdDVO {
  /** 효능군중복일련번호 */
  eftgrpDpcnSn: string

}

