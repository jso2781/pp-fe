/**
 * 대국민포털_DUR효능군중복품목기본 조회 목업 정보 
 */
export const mockDurEftgrpItemList = [
  {
    /** 순번 */
    no: 1,

    /** 효능군중복일련번호 */
    eftgrpDpcnSn: 'XXX',

    /** 약품코드 */
    mdcnCd: 'XXX',

    /** 효능그룹 */
    eftGroup: 'XXX',

    /** 그룹 */
    group: 'XXX',

    /** 그룹1 */
    group1: 'XXX',

    /** 효능군중복점검코드 */
    eftgrpDpcnChckCd: 'XXX',

    /** 일반명코드 */
    gnrlNmCd: 'XXX',

    /** 일반명 */
    gnrlNm: 'XXX',

    /** 품목명 */
    itemNm: 'XXX',

    /** 업체명 */
    bzentyNm: 'XXX',

    /** 식약처제품명 */
    mfdsPrdctNm: 'XXX',

    /** 식약처성분코드 */
    mfdsIgrdCd: 'XXX',

    /** 식약처성분명 */
    mfdsIgrdNm: 'XXX',

    /** 공고일자 */
    pbancYmd: 'XXX',

    /** 공고번호 */
    pbancNo: 'XXX',

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
 * 대국민포털_DUR효능군중복품목기본 조회/입력/수정/저장 파라메터 정보 
 */
export interface DurEftgrpItemPVO {
  /** 효능군중복일련번호 */
  eftgrpDpcnSn?: string

  /** 약품코드 */
  mdcnCd?: string

  /** 효능그룹 */
  eftGroup?: string

  /** 그룹 */
  group?: string

  /** 그룹1 */
  group1?: string

  /** 효능군중복점검코드 */
  eftgrpDpcnChckCd?: string

  /** 일반명코드 */
  gnrlNmCd?: string

  /** 일반명 */
  gnrlNm?: string

  /** 품목명 */
  itemNm?: string

  /** 업체명 */
  bzentyNm?: string

  /** 식약처제품명 */
  mfdsPrdctNm?: string

  /** 식약처성분코드 */
  mfdsIgrdCd?: string

  /** 식약처성분명 */
  mfdsIgrdNm?: string

  /** 공고일자 */
  pbancYmd?: string

  /** 공고번호 */
  pbancNo?: string

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
 * 대국민포털_DUR효능군중복품목기본 정보 
 */
export interface DurEftgrpItemRVO {
  /** 순번 */
  no?: 1

  /** 효능군중복일련번호 */
  eftgrpDpcnSn?: string

  /** 약품코드 */
  mdcnCd?: string

  /** 효능그룹 */
  eftGroup?: string

  /** 그룹 */
  group?: string

  /** 그룹1 */
  group1?: string

  /** 효능군중복점검코드 */
  eftgrpDpcnChckCd?: string

  /** 일반명코드 */
  gnrlNmCd?: string

  /** 일반명 */
  gnrlNm?: string

  /** 품목명 */
  itemNm?: string

  /** 업체명 */
  bzentyNm?: string

  /** 식약처제품명 */
  mfdsPrdctNm?: string

  /** 식약처성분코드 */
  mfdsIgrdCd?: string

  /** 식약처성분명 */
  mfdsIgrdNm?: string

  /** 공고일자 */
  pbancYmd?: string

  /** 공고번호 */
  pbancNo?: string

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
 * 대국민포털_DUR효능군중복품목기본 목록 조회용 파라메터 정보 
 */
export interface DurEftgrpItemListPVO {
  /** 효능군중복일련번호 */
  eftgrpDpcnSn?: string

  /** 약품코드 */
  mdcnCd?: string

  /** 효능그룹 */
  eftGroup?: string

  /** 그룹 */
  group?: string

  /** 그룹1 */
  group1?: string

  /** 효능군중복점검코드 */
  eftgrpDpcnChckCd?: string

  /** 일반명코드 */
  gnrlNmCd?: string

  /** 일반명 */
  gnrlNm?: string

  /** 품목명 */
  itemNm?: string

  /** 업체명 */
  bzentyNm?: string

  /** 식약처제품명 */
  mfdsPrdctNm?: string

  /** 식약처성분코드 */
  mfdsIgrdCd?: string

  /** 식약처성분명 */
  mfdsIgrdNm?: string

  /** 공고일자 */
  pbancYmd?: string

  /** 공고번호 */
  pbancNo?: string

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
 * 대국민포털_DUR효능군중복품목기본 정보 목록 
 */
export interface DurEftgrpItemListRVO {
  list: DurEftgrpItemRVO[]
  totalCount: number
}

/**
 * 대국민포털_DUR효능군중복품목기본 삭제 파라메터 정보 
 */
export interface DurEftgrpItemDVO {
  /** 효능군중복일련번호 */
  eftgrpDpcnSn: string

}

