/**
 * 대국민포털_DUR임부금기성분기본 조회 목업 정보 
 */
export const mockDurPrgntIgrdList = [
  {
    /** 순번 */
    no: 1,

    /** 임부금기일련번호 */
    prgntBannSn: 'XXX',

    /** 성분명 */
    igrdNm: 'XXX',

    /** 금기등급 */
    bannGrd: 'XXX',

    /** 비고 */
    rmrk: 'XXX',

    /** 상세내용 */
    dtlCn: 'XXX',

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
 * 대국민포털_DUR임부금기성분기본 조회/입력/수정/저장 파라메터 정보 
 */
export interface DurPrgntIgrdPVO {
  /** 임부금기일련번호 */
  prgntBannSn?: string

  /** 성분명 */
  igrdNm?: string

  /** 금기등급 */
  bannGrd?: string

  /** 비고 */
  rmrk?: string

  /** 상세내용 */
  dtlCn?: string

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
 * 대국민포털_DUR임부금기성분기본 정보 
 */
export interface DurPrgntIgrdRVO {
  /** 순번 */
  no?: 1

  /** 임부금기일련번호 */
  prgntBannSn?: string

  /** 성분명 */
  igrdNm?: string

  /** 금기등급 */
  bannGrd?: string

  /** 비고 */
  rmrk?: string

  /** 상세내용 */
  dtlCn?: string

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
 * 대국민포털_DUR임부금기성분기본 목록 조회용 파라메터 정보 
 */
export interface DurPrgntIgrdListPVO {
  /** 임부금기일련번호 */
  prgntBannSn?: string

  /** 성분명 */
  igrdNm?: string

  /** 금기등급 */
  bannGrd?: string

  /** 비고 */
  rmrk?: string

  /** 상세내용 */
  dtlCn?: string

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
 * 대국민포털_DUR임부금기성분기본 정보 목록 
 */
export interface DurPrgntIgrdListRVO {
  list: DurPrgntIgrdRVO[]
  totalCount: number
}

/**
 * 대국민포털_DUR임부금기성분기본 삭제 파라메터 정보 
 */
export interface DurPrgntIgrdDVO {
  /** 임부금기일련번호 */
  prgntBannSn: string

}

