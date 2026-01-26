/**
 * 대국민포털_DUR노인주의해열진통소염제기본 조회 목업 정보 
 */
export const mockDurSnctzMedList = [
  {
    /** 순번 */
    no: 1,

    /** 노인주의약일련번호 */
    snctzCutnMedSn: 'XXX',

    /** 제품코드 */
    prdctCd: 'XXX',

    /** 성분코드 */
    igrdCd: 'XXX',

    /** 성분명 */
    igrdNm: 'XXX',

    /** 제품명 */
    prdctNm: 'XXX',

    /** 업소명 */
    entpNm: 'XXX',

    /** 식약처제품명 */
    mfdsPrdctNm: 'XXX',

    /** 식약처성분코드 */
    mfdsIgrdCd: 'XXX',

    /** 식약처성분명 */
    mfdsIgrdNm: 'XXX',

    /** 약품상세정보 */
    mdcnDtlInfo: 'XXX',

    /** 적용년월 */
    aplcnYm: 'XXX',

    /** 유형코드 */
    typeCd: 'XXX',

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
 * 대국민포털_DUR노인주의해열진통소염제기본 조회/입력/수정/저장 파라메터 정보 
 */
export interface DurSnctzMedPVO {
  /** 노인주의약일련번호 */
  snctzCutnMedSn?: string

  /** 제품코드 */
  prdctCd?: string

  /** 성분코드 */
  igrdCd?: string

  /** 성분명 */
  igrdNm?: string

  /** 제품명 */
  prdctNm?: string

  /** 업소명 */
  entpNm?: string

  /** 식약처제품명 */
  mfdsPrdctNm?: string

  /** 식약처성분코드 */
  mfdsIgrdCd?: string

  /** 식약처성분명 */
  mfdsIgrdNm?: string

  /** 약품상세정보 */
  mdcnDtlInfo?: string

  /** 적용년월 */
  aplcnYm?: string

  /** 유형코드 */
  typeCd?: string

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
 * 대국민포털_DUR노인주의해열진통소염제기본 정보 
 */
export interface DurSnctzMedRVO {
  /** 순번 */
  no?: 1

  /** 노인주의약일련번호 */
  snctzCutnMedSn?: string

  /** 제품코드 */
  prdctCd?: string

  /** 성분코드 */
  igrdCd?: string

  /** 성분명 */
  igrdNm?: string

  /** 제품명 */
  prdctNm?: string

  /** 업소명 */
  entpNm?: string

  /** 식약처제품명 */
  mfdsPrdctNm?: string

  /** 식약처성분코드 */
  mfdsIgrdCd?: string

  /** 식약처성분명 */
  mfdsIgrdNm?: string

  /** 약품상세정보 */
  mdcnDtlInfo?: string

  /** 적용년월 */
  aplcnYm?: string

  /** 유형코드 */
  typeCd?: string

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
 * 대국민포털_DUR노인주의해열진통소염제기본 목록 조회용 파라메터 정보 
 */
export interface DurSnctzMedListPVO {
  /** 노인주의약일련번호 */
  snctzCutnMedSn?: string

  /** 제품코드 */
  prdctCd?: string

  /** 성분코드 */
  igrdCd?: string

  /** 성분명 */
  igrdNm?: string

  /** 제품명 */
  prdctNm?: string

  /** 업소명 */
  entpNm?: string

  /** 식약처제품명 */
  mfdsPrdctNm?: string

  /** 식약처성분코드 */
  mfdsIgrdCd?: string

  /** 식약처성분명 */
  mfdsIgrdNm?: string

  /** 약품상세정보 */
  mdcnDtlInfo?: string

  /** 적용년월 */
  aplcnYm?: string

  /** 유형코드 */
  typeCd?: string

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
 * 대국민포털_DUR노인주의해열진통소염제기본 정보 목록 
 */
export interface DurSnctzMedListRVO {
  list: DurSnctzMedRVO[]
  totalCount: number
}

/**
 * 대국민포털_DUR노인주의해열진통소염제기본 삭제 파라메터 정보 
 */
export interface DurSnctzMedDVO {
  /** 노인주의약일련번호 */
  snctzCutnMedSn: string

}

