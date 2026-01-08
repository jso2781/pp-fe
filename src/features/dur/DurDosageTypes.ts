/**
 * 대국민포털_DUR투여기간주의기본 조회 목업 정보 
 */
export const mockDurDosageList = [
  {
    /** 순번 */
    no: 1,

    /** 투여기간주의일련번호 */
    dosagePrdCutnSn: 'XXX',

    /** 약품코드 */
    mdcnCd: 'XXX',

    /** 약품명 */
    mdcnNm: 'XXX',

    /** 일반명코드 */
    gnrlNmCd: 'XXX',

    /** 일반명 */
    gnrlNm: 'XXX',

    /** 최대투여기간일수 */
    maxDosagePrdDays: -1,

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

    /** 비고 */
    rmrk: 'XXX',

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
 * 대국민포털_DUR투여기간주의기본 조회/입력/수정/저장 파라메터 정보 
 */
export interface DurDosagePVO {
  /** 투여기간주의일련번호 */
  dosagePrdCutnSn?: string

  /** 약품코드 */
  mdcnCd?: string

  /** 약품명 */
  mdcnNm?: string

  /** 일반명코드 */
  gnrlNmCd?: string

  /** 일반명 */
  gnrlNm?: string

  /** 최대투여기간일수 */
  maxDosagePrdDays?: number

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

  /** 비고 */
  rmrk?: string

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
 * 대국민포털_DUR투여기간주의기본 정보 
 */
export interface DurDosageRVO {
  /** 순번 */
  no?: 1

  /** 투여기간주의일련번호 */
  dosagePrdCutnSn?: string

  /** 약품코드 */
  mdcnCd?: string

  /** 약품명 */
  mdcnNm?: string

  /** 일반명코드 */
  gnrlNmCd?: string

  /** 일반명 */
  gnrlNm?: string

  /** 최대투여기간일수 */
  maxDosagePrdDays?: number

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

  /** 비고 */
  rmrk?: string

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
 * 대국민포털_DUR투여기간주의기본 목록 조회용 파라메터 정보 
 */
export interface DurDosageListPVO {
  /** 투여기간주의일련번호 */
  dosagePrdCutnSn?: string

  /** 약품코드 */
  mdcnCd?: string

  /** 약품명 */
  mdcnNm?: string

  /** 일반명코드 */
  gnrlNmCd?: string

  /** 일반명 */
  gnrlNm?: string

  /** 최대투여기간일수 */
  maxDosagePrdDays?: number

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

  /** 비고 */
  rmrk?: string

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
 * 대국민포털_DUR투여기간주의기본 정보 목록 
 */
export interface DurDosageListRVO {
  list: DurDosageRVO[]
  totalCount: number
}

/**
 * 대국민포털_DUR투여기간주의기본 삭제 파라메터 정보 
 */
export interface DurDosageDVO {
  /** 투여기간주의일련번호 */
  dosagePrdCutnSn: string

}

