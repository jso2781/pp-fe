/**
 * 이상사례 통계 정보
 * 목록 조회/상세 조회 결과에 공용으로 사용한다.
 * 상세 전용 필드(chargerNm, hldPrd* 등)는 optional로 선언한다.
 */
export interface StatisticsRVO {
  /** 통계 데이터셋 관리 일련번호 */
  statsDsetMngSn: number

  /** 통계명 */
  statsNm: string

  /** 국내/국외 구분 코드 */
  domstForgnSeCd: string

  /** 자료기간 시작일자 */
  rptDataBgngYmd: string

  /** 자료기간 종료일자 */
  rptDataEndYmd: string

  /** 생성 기관 */
  creationOrg: string

  /** 등록일시 */
  regDt: string

  /** 상태 코드 */
  status: string

  /** 담당자명 (상세) */
  chargerNm?: string

  /** 보유기간 시작일자 (상세) */
  hldPrdBgngYmd?: string

  /** 보유기간 종료일자 (상세) */
  hldPrdEndYmd?: string
}

/**
 * 이상사례 통계 목록 조회용 파라메터 정보
 */
export interface StatisticsListPVO {
  /** 통계명 검색어 */
  statsNm?: string

  /** 페이지 크기 */
  limit?: number

  /** 페이지 오프셋 */
  offset?: number
}

/**
 * 이상사례 통계 목록 조회 결과 정보
 */
export interface StatisticsListRVO {
  list: StatisticsRVO[]
  totalCount: number
}

/**
 * 이상사례 통계 생성 조건 정보
 */
export interface StatisticsCndVO {
  /** 조건 유형 구분 코드 */
  cndTypeSeCd: string

  /** 조건 값 */
  cndLtrVl: string
}

/**
 * 이상사례 통계 저장 파라메터 정보
 */
export interface StatisticsSavePVO {
  /** 통계 데이터셋 관리 일련번호 (신규 생성 시 미지정) */
  statsDsetMngSn?: number

  /** 통계명 */
  statsNm: string

  /** 담당자명 */
  chargerNm?: string

  /** 데이터셋 관리 일련번호 */
  dsetMngSn?: number

  /** 자료기간 시작일자 */
  rptDataBgngYmd?: string

  /** 자료기간 종료일자 */
  rptDataEndYmd?: string

  /** 통계 생성 조건 목록 */
  conditions: StatisticsCndVO[]
}

/**
 * 데이터셋 정보 (통계 생성 화면에서 선택 후보)
 */
export interface DatasetRVO {
  /** 데이터셋 관리 일련번호 */
  dsetMngSn: number

  /** 데이터셋명 */
  dsetNm: string

  /** 국내/국외 구분 코드 */
  domstForgnSeCd: string

  /** 자료기간 시작일자 */
  rptDataBgngYmd: string

  /** 자료기간 종료일자 */
  rptDataEndYmd: string

  /** 데이터셋 상태 코드 */
  dsetSttsCd: string

  /** 보유기간 시작일자 */
  hldPrdBgngYmd: string

  /** 보유기간 종료일자 */
  hldPrdEndYmd: string

  /** 등록일시 */
  regDt: string
}

/**
 * 대표 데이터셋 지정 여부 포함 데이터셋 정보
 */
export interface DatasetWithRprsRVO extends DatasetRVO {
  /** 대표 데이터셋 여부 (Y/N) */
  rprsYn: string
}

/**
 * 통계 생성 조건 유형 코드
 */
export const CND_TYPE = {
  PRODUCT: '01',
  INGREDIENT: '02',
  CLASS_INGREDIENT: '03',
  CLEANSING_INGREDIENT: '04',
  SOC: '05',
  PT: '06',
  LLT: '07',
  BY_PRODUCT: '08',
  AGE_AT_ONSET: '09',
  SERIOUS_AE_TYPE: '10',
  REPORTER_TYPE: '11',
  GENDER: '12',
  REPORT_COUNT: '13',
  REPORT_DETAIL: '14',
  ADVERSE_EVENT: '15',
  BY_INGREDIENT: '16',
}
