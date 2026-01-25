/**
 * 대국민포털_DUR병용금기기본 조회 목업 정보 
 */
export const mockConcBannList = [
  {
    /** 순번 */
    no: 1,

    /** 병용금기일련번호 */
    concBannSn: 'XXX',

    /** 제품코드1 */
    prdctCd1: 'XXX',

    /** 제품코드2 */
    prdctCd2: 'XXX',

    /** 성분명1 */
    igrdNm1: 'XXX',

    /** 성분코드1 */
    igrdCd1: 'XXX',

    /** 제품명1 */
    prdctNm1: 'XXX',

    /** 업체명1 */
    bzentyNm1: 'XXX',

    /** 구분1 */
    se1: 'XXX',

    /** 식약처제품명1 */
    mfdsPrdctNm1: 'XXX',

    /** 식약처성분코드1 */
    mfdsIgrdCd1: 'XXX',

    /** 식약처성분명1 */
    mfdsIgrdNm1: 'XXX',

    /** 성분명2 */
    igrdNm2: 'XXX',

    /** 성분코드2 */
    igrdCd2: 'XXX',

    /** 제품명2 */
    prdctNm2: 'XXX',

    /** 업체명2 */
    bzentyNm2: 'XXX',

    /** 구분2 */
    se2: 'XXX',

    /** 식약처제품명2 */
    mfdsPrdctNm2: 'XXX',

    /** 식약처성분코드2 */
    mfdsIgrdCd2: 'XXX',

    /** 식약처성분명2 */
    mfdsIgrdNm2: 'XXX',

    /** 고시번호 */
    ancmntNo: 'XXX',

    /** 고시적용일 */
    ancmntAplcnDay: 'XXX',

    /** 주의사항 */
    cutnMttr: 'XXX',

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
 * 대국민포털_DUR병용금기기본 조회/입력/수정/저장 파라메터 정보 
 */
export interface ConcBannPVO {
  /** 병용금기일련번호 */
  concBannSn?: string

  /** 제품코드1 */
  prdctCd1?: string

  /** 제품코드2 */
  prdctCd2?: string

  /** 성분명1 */
  igrdNm1?: string

  /** 성분코드1 */
  igrdCd1?: string

  /** 제품명1 */
  prdctNm1?: string

  /** 업체명1 */
  bzentyNm1?: string

  /** 구분1 */
  se1?: string

  /** 식약처제품명1 */
  mfdsPrdctNm1?: string

  /** 식약처성분코드1 */
  mfdsIgrdCd1?: string

  /** 식약처성분명1 */
  mfdsIgrdNm1?: string

  /** 성분명2 */
  igrdNm2?: string

  /** 성분코드2 */
  igrdCd2?: string

  /** 제품명2 */
  prdctNm2?: string

  /** 업체명2 */
  bzentyNm2?: string

  /** 구분2 */
  se2?: string

  /** 식약처제품명2 */
  mfdsPrdctNm2?: string

  /** 식약처성분코드2 */
  mfdsIgrdCd2?: string

  /** 식약처성분명2 */
  mfdsIgrdNm2?: string

  /** 고시번호 */
  ancmntNo?: string

  /** 고시적용일 */
  ancmntAplcnDay?: string

  /** 주의사항 */
  cutnMttr?: string

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
 * 대국민포털_DUR병용금기기본 정보 
 */
export interface ConcBannRVO {
  /** 순번 */
  no?: 1

  /** 병용금기일련번호 */
  concBannSn?: string

  /** 제품코드1 */
  prdctCd1?: string

  /** 제품코드2 */
  prdctCd2?: string

  /** 성분명1 */
  igrdNm1?: string

  /** 성분코드1 */
  igrdCd1?: string

  /** 제품명1 */
  prdctNm1?: string

  /** 업체명1 */
  bzentyNm1?: string

  /** 구분1 */
  se1?: string

  /** 식약처제품명1 */
  mfdsPrdctNm1?: string

  /** 식약처성분코드1 */
  mfdsIgrdCd1?: string

  /** 식약처성분명1 */
  mfdsIgrdNm1?: string

  /** 성분명2 */
  igrdNm2?: string

  /** 성분코드2 */
  igrdCd2?: string

  /** 제품명2 */
  prdctNm2?: string

  /** 업체명2 */
  bzentyNm2?: string

  /** 구분2 */
  se2?: string

  /** 식약처제품명2 */
  mfdsPrdctNm2?: string

  /** 식약처성분코드2 */
  mfdsIgrdCd2?: string

  /** 식약처성분명2 */
  mfdsIgrdNm2?: string

  /** 고시번호 */
  ancmntNo?: string

  /** 고시적용일 */
  ancmntAplcnDay?: string

  /** 주의사항 */
  cutnMttr?: string

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
 * 대국민포털_DUR병용금기기본 목록 조회용 파라메터 정보 
 */
export interface ConcBannListPVO {
  /** 병용금기일련번호 */
  concBannSn?: string

  /** 제품코드1 */
  prdctCd1?: string

  /** 제품코드2 */
  prdctCd2?: string

  /** 성분명1 */
  igrdNm1?: string

  /** 성분코드1 */
  igrdCd1?: string

  /** 제품명1 */
  prdctNm1?: string

  /** 업체명1 */
  bzentyNm1?: string

  /** 구분1 */
  se1?: string

  /** 식약처제품명1 */
  mfdsPrdctNm1?: string

  /** 식약처성분코드1 */
  mfdsIgrdCd1?: string

  /** 식약처성분명1 */
  mfdsIgrdNm1?: string

  /** 성분명2 */
  igrdNm2?: string

  /** 성분코드2 */
  igrdCd2?: string

  /** 제품명2 */
  prdctNm2?: string

  /** 업체명2 */
  bzentyNm2?: string

  /** 구분2 */
  se2?: string

  /** 식약처제품명2 */
  mfdsPrdctNm2?: string

  /** 식약처성분코드2 */
  mfdsIgrdCd2?: string

  /** 식약처성분명2 */
  mfdsIgrdNm2?: string

  /** 고시번호 */
  ancmntNo?: string

  /** 고시적용일 */
  ancmntAplcnDay?: string

  /** 주의사항 */
  cutnMttr?: string

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
 * 대국민포털_DUR병용금기기본 정보 목록 
 */
export interface ConcBannListRVO {
  list: ConcBannRVO[]
  totalCount: number
}

/**
 * 대국민포털_DUR병용금기기본 삭제 파라메터 정보 
 */
export interface ConcBannDVO {
  /** 병용금기일련번호 */
  concBannSn: string
}

