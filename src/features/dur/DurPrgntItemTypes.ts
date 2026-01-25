/**
 * 대국민포털_DUR임부금기품목기본 조회 목업 정보 
 */
export const mockDurPrgntItemList = [
  {
    /** 순번 */
    no: 1,

    /** 임부금기일련번호 */
    prgntBannSn: 'XXX',

    /** 제품코드 */
    prdctCd: 'XXX',

    /** 성분명 */
    igrdNm: 'XXX',

    /** 성분코드 */
    igrdCd: 'XXX',

    /** 제품명 */
    prdctNm: 'XXX',

    /** 업체명 */
    bzentyNm: 'XXX',

    /** 식약처제품명 */
    mfdsPrdctNm: 'XXX',

    /** 식약처성분코드 */
    mfdsIgrdCd: 'XXX',

    /** 식약처성분명 */
    mfdsIgrdNm: 'XXX',

    /** 고시일자 */
    ancmntYmd: 'XXX',

    /** 고시번호 */
    ancmntNo: 'XXX',

    /** 금기등급 */
    bannGrd: -1,

    /** 상세정보 */
    dtlInfo: 'XXX',

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
 * 대국민포털_DUR임부금기품목기본 조회/입력/수정/저장 파라메터 정보 
 */
export interface DurPrgntItemPVO {
  /** 임부금기일련번호 */
  prgntBannSn?: string

  /** 제품코드 */
  prdctCd?: string

  /** 성분명 */
  igrdNm?: string

  /** 성분코드 */
  igrdCd?: string

  /** 제품명 */
  prdctNm?: string

  /** 업체명 */
  bzentyNm?: string

  /** 식약처제품명 */
  mfdsPrdctNm?: string

  /** 식약처성분코드 */
  mfdsIgrdCd?: string

  /** 식약처성분명 */
  mfdsIgrdNm?: string

  /** 고시일자 */
  ancmntYmd?: string

  /** 고시번호 */
  ancmntNo?: string

  /** 금기등급 */
  bannGrd?: number

  /** 상세정보 */
  dtlInfo?: string

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
 * 대국민포털_DUR임부금기품목기본 정보 
 */
export interface DurPrgntItemRVO {
  /** 순번 */
  no?: 1

  /** 임부금기일련번호 */
  prgntBannSn?: string

  /** 제품코드 */
  prdctCd?: string

  /** 성분명 */
  igrdNm?: string

  /** 성분코드 */
  igrdCd?: string

  /** 제품명 */
  prdctNm?: string

  /** 업체명 */
  bzentyNm?: string

  /** 식약처제품명 */
  mfdsPrdctNm?: string

  /** 식약처성분코드 */
  mfdsIgrdCd?: string

  /** 식약처성분명 */
  mfdsIgrdNm?: string

  /** 고시일자 */
  ancmntYmd?: string

  /** 고시번호 */
  ancmntNo?: string

  /** 금기등급 */
  bannGrd?: number

  /** 상세정보 */
  dtlInfo?: string

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
 * 대국민포털_DUR임부금기품목기본 목록 조회용 파라메터 정보 
 */
export interface DurPrgntItemListPVO {
  /** 임부금기일련번호 */
  prgntBannSn?: string

  /** 제품코드 */
  prdctCd?: string

  /** 성분명 */
  igrdNm?: string

  /** 성분코드 */
  igrdCd?: string

  /** 제품명 */
  prdctNm?: string

  /** 업체명 */
  bzentyNm?: string

  /** 식약처제품명 */
  mfdsPrdctNm?: string

  /** 식약처성분코드 */
  mfdsIgrdCd?: string

  /** 식약처성분명 */
  mfdsIgrdNm?: string

  /** 고시일자 */
  ancmntYmd?: string

  /** 고시번호 */
  ancmntNo?: string

  /** 금기등급 */
  bannGrd?: number

  /** 상세정보 */
  dtlInfo?: string

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
 * 대국민포털_DUR임부금기품목기본 정보 목록 
 */
export interface DurPrgntItemListRVO {
  list: DurPrgntItemRVO[]
  totalCount: number
}

/**
 * 대국민포털_DUR임부금기품목기본 삭제 파라메터 정보 
 */
export interface DurPrgntItemDVO {
  /** 임부금기일련번호 */
  prgntBannSn: string

}

