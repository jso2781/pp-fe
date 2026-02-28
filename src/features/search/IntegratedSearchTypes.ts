/**
 * 통합검색 조회 파라미터 (API 요청 시 사용)
 */
export interface IntegratedSearchPVO {
  /** 통합검색 조회용 입력 키워드 */
  searchText: string

  /**
   * 정렬기준
   * 최신순 - latest
   * 관련도순 - relevance
   */
  sortBy: string
}

/**
 * 통합검색 1건 레코드 결과
 * (API 응답 JSON의 한 건에 해당하는 타입)
 */
export interface SearchItem {
  /** 최상위 메뉴 일련번호 */
  rootMenuSn: string
  /** 최상위 메뉴명 */
  rootMenuNm: string
  /** 메뉴 일련번호 */
  menuSn: string
  /** 메뉴명 */
  menuNm: string
  /** 메뉴 경로(메뉴 일련번호 기준) ex) 1 > 34 > 45 */
  path: string
  /** 메뉴 경로명(메뉴명 기준) ex) 주요업무 > DUR 정보 > 알림 게시판 */
  pathNm: string
  /** 메뉴 URL 주소 */
  menuUrlAddr: string
  /** 문서 ID (게시판: pst_sn, CMS: conts_sn) */
  docSn: string
  /** 문서 제목 (게시판: pst_ttl, CMS: conts_ttl) */
  docTtl: string
  /** 문서 내용 (게시판: pst_cn, CMS: conts_cn) */
  docCn: string
}

/**
 * 통합검색 결과 (API 응답 JSON 루트 타입)
 * 각 탭별 검색 결과 리스트를 담는 RVO
 */
export interface IntegratedSearchRVO {
  /** 전체 통합검색 목록 (전체 탭에 표기) */
  totalList: SearchItem[]
  /** 주요업무 통합검색 목록 (주요업무 탭에 표기) */
  mainTaskList: SearchItem[]
  /** 정보공개 통합검색 목록 (정보공개 탭에 표기) */
  infoOpenList: SearchItem[]
  /** 기관소식 통합검색 목록 (기관소식 탭에 표기) */
  instNewsList: SearchItem[]
  /** 기관소개 통합검색 목록 (기관소개 탭에 표기) */
  instIntroList: SearchItem[]
}
