/**
 * 대국민포털_DUR노인주의기본 조회 목업 정보 
 */
export const mockDurSnctzList = [
  {
    /** 순번 */
    no: 1,

    /** 노인주의일련번호 */
    snctzCutnSn: 'XXX',

    /** 제품코드 */
    prdctCd: 'XXX',

    /** DUR성분명 */
    durIgrdNm: 'XXX',

    /** DUR성분코드 */
    durIgrdCd: 'XXX',

    /** DUR제품명 */
    durPrdctNm: 'XXX',

    /** DUR업체명 */
    durBzentyNm: 'XXX',

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

    /** 약품상세정보 */
    mdcnDtlInfo: 'XXX',

    /** 적용년월 */
    aplcnYm: 'XXX',

    /** 비고 */
    rmrk: 'XXX',

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
 * 대국민포털_DUR노인주의기본 조회/입력/수정/저장 파라메터 정보 
 */
export interface DurSnctzPVO {
  /** 노인주의일련번호 */
  snctzCutnSn?: string

  /** 제품코드 */
  prdctCd?: string

  /** DUR성분명 */
  durIgrdNm?: string

  /** DUR성분코드 */
  durIgrdCd?: string

  /** DUR제품명 */
  durPrdctNm?: string

  /** DUR업체명 */
  durBzentyNm?: string

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

  /** 약품상세정보 */
  mdcnDtlInfo?: string

  /** 적용년월 */
  aplcnYm?: string

  /** 비고 */
  rmrk?: string

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
 * 대국민포털_DUR노인주의기본 정보 
 */
export interface DurSnctzRVO {
  /** 순번 */
  no?: 1

  /** 노인주의일련번호 */
  snctzCutnSn?: string

  /** 제품코드 */
  prdctCd?: string

  /** DUR성분명 */
  durIgrdNm?: string

  /** DUR성분코드 */
  durIgrdCd?: string

  /** DUR제품명 */
  durPrdctNm?: string

  /** DUR업체명 */
  durBzentyNm?: string

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

  /** 약품상세정보 */
  mdcnDtlInfo?: string

  /** 적용년월 */
  aplcnYm?: string

  /** 비고 */
  rmrk?: string

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
 * 대국민포털_DUR노인주의기본 목록 조회용 파라메터 정보 
 */
export interface DurSnctzListPVO {
  /** 노인주의일련번호 */
  snctzCutnSn?: string

  /** 제품코드 */
  prdctCd?: string

  /** DUR성분명 */
  durIgrdNm?: string

  /** DUR성분코드 */
  durIgrdCd?: string

  /** DUR제품명 */
  durPrdctNm?: string

  /** DUR업체명 */
  durBzentyNm?: string

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

  /** 약품상세정보 */
  mdcnDtlInfo?: string

  /** 적용년월 */
  aplcnYm?: string

  /** 비고 */
  rmrk?: string

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
 * 대국민포털_DUR노인주의기본 정보 목록 
 */
export interface DurSnctzListRVO {
  list: DurSnctzRVO[]
  totalCount: number
}

/**
 * 대국민포털_DUR노인주의기본 삭제 파라메터 정보 
 */
export interface DurSnctzDVO {
  /** 노인주의일련번호 */
  snctzCutnSn: string

}

