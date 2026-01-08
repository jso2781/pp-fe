/**
 * 대국민포털_DUR연령금기기본 조회 목업 정보 
 */
export const mockDurAgeBannList = [
  {
    /** 순번 */
    no: 1,

    /** 연령금기일련번호 */
    ageBannSn: 'XXX',

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

    /** 해당연령 */
    rlvtAge: -1,

    /** 해당연령단위 */
    rlvtAgeUnit: 'XXX',

    /** 연령처리조건 */
    agePrcsCnd: 'XXX',

    /** 고시번호 */
    ancmntNo: 'XXX',

    /** 고시일자 */
    ancmntYmd: 'XXX',

    /** 상세정보 */
    dtlInfo: 'XXX',

    /** 적용년월 */
    aplcnYm: 'XXX',

    /** 유형코드 */
    typeCd: 'XXX',

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
 * 대국민포털_DUR연령금기기본 조회/입력/수정/저장 파라메터 정보 
 */
export interface DurAgeBannPVO {
  /** 연령금기일련번호 */
  ageBannSn?: string

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

  /** 해당연령 */
  rlvtAge?: number

  /** 해당연령단위 */
  rlvtAgeUnit?: string

  /** 연령처리조건 */
  agePrcsCnd?: string

  /** 고시번호 */
  ancmntNo?: string

  /** 고시일자 */
  ancmntYmd?: string

  /** 상세정보 */
  dtlInfo?: string

  /** 적용년월 */
  aplcnYm?: string

  /** 유형코드 */
  typeCd?: string

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
 * 대국민포털_DUR연령금기기본 정보 
 */
export interface DurAgeBannRVO {
  /** 순번 */
  no?: 1

  /** 연령금기일련번호 */
  ageBannSn?: string

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

  /** 해당연령 */
  rlvtAge?: number

  /** 해당연령단위 */
  rlvtAgeUnit?: string

  /** 연령처리조건 */
  agePrcsCnd?: string

  /** 고시번호 */
  ancmntNo?: string

  /** 고시일자 */
  ancmntYmd?: string

  /** 상세정보 */
  dtlInfo?: string

  /** 적용년월 */
  aplcnYm?: string

  /** 유형코드 */
  typeCd?: string

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
 * 대국민포털_DUR연령금기기본 목록 조회용 파라메터 정보 
 */
export interface DurAgeBannListPVO {
  /** 연령금기일련번호 */
  ageBannSn?: string

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

  /** 해당연령 */
  rlvtAge?: number

  /** 해당연령단위 */
  rlvtAgeUnit?: string

  /** 연령처리조건 */
  agePrcsCnd?: string

  /** 고시번호 */
  ancmntNo?: string

  /** 고시일자 */
  ancmntYmd?: string

  /** 상세정보 */
  dtlInfo?: string

  /** 적용년월 */
  aplcnYm?: string

  /** 유형코드 */
  typeCd?: string

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
 * 대국민포털_DUR연령금기기본 정보 목록 
 */
export interface DurAgeBannListRVO {
  list: DurAgeBannRVO[]
  totalCount: number
}

/**
 * 대국민포털_DUR연령금기기본 삭제 파라메터 정보 
 */
export interface DurAgeBannDVO {
  /** 연령금기일련번호 */
  ageBannSn: string

}

