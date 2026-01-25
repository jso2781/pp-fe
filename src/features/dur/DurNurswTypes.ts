/**
 * 대국민포털_DUR수유부주의기본 조회 목업 정보 
 */
export const mockDurNurswList = [
  {
    /** 순번 */
    no: 1,

    /** 수유부주의일련번호 */
    nurswCutnSn: 'XXX',

    /** 제품코드 */
    prdctCd: 'XXX',

    /** 주요성분코드 */
    mainIgrdCd: 'XXX',

    /** 성분명 */
    igrdNm: 'XXX',

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

    /** 공고일자 */
    pbancYmd: 'XXX',

    /** 공고번호 */
    pbancNo: 'XXX',

    /** 적용년월 */
    aplcnYm: 'XXX',

    /** 비고 */
    rmrkCn: 'XXX',

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
 * 대국민포털_DUR수유부주의기본 조회/입력/수정/저장 파라메터 정보 
 */
export interface DurNurswPVO {
  /** 수유부주의일련번호 */
  nurswCutnSn?: string

  /** 제품코드 */
  prdctCd?: string

  /** 주요성분코드 */
  mainIgrdCd?: string

  /** 성분명 */
  igrdNm?: string

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

  /** 공고일자 */
  pbancYmd?: string

  /** 공고번호 */
  pbancNo?: string

  /** 적용년월 */
  aplcnYm?: string

  /** 비고 */
  rmrkCn?: string

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
 * 대국민포털_DUR수유부주의기본 정보 
 */
export interface DurNurswRVO {
  /** 순번 */
  no?: 1

  /** 수유부주의일련번호 */
  nurswCutnSn?: string

  /** 제품코드 */
  prdctCd?: string

  /** 주요성분코드 */
  mainIgrdCd?: string

  /** 성분명 */
  igrdNm?: string

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

  /** 공고일자 */
  pbancYmd?: string

  /** 공고번호 */
  pbancNo?: string

  /** 적용년월 */
  aplcnYm?: string

  /** 비고 */
  rmrkCn?: string

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
 * 대국민포털_DUR수유부주의기본 목록 조회용 파라메터 정보 
 */
export interface DurNurswListPVO {
  /** 수유부주의일련번호 */
  nurswCutnSn?: string

  /** 제품코드 */
  prdctCd?: string

  /** 주요성분코드 */
  mainIgrdCd?: string

  /** 성분명 */
  igrdNm?: string

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

  /** 공고일자 */
  pbancYmd?: string

  /** 공고번호 */
  pbancNo?: string

  /** 적용년월 */
  aplcnYm?: string

  /** 비고 */
  rmrkCn?: string

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
 * 대국민포털_DUR수유부주의기본 정보 목록 
 */
export interface DurNurswListRVO {
  list: DurNurswRVO[]
  totalCount: number
}

/**
 * 대국민포털_DUR수유부주의기본 삭제 파라메터 정보 
 */
export interface DurNurswDVO {
  /** 수유부주의일련번호 */
  nurswCutnSn: string

}

