/**
 * 효능군중복주의 상세 조회 파라메터 정보
 */
export interface DurEftgrpDetailListPVO {
  /** 현재 페이지 인덱스 */
  pageNum?: number

  /** 한 페이지에 보여줄 아이템의 개수 */
  pageSize?: number

  /**
   * 효능그룹명
   * ex) 해열진통소염제, 최면진정제
   */
  effGroupNm?: string

  /**
   * 계열(그룹명)
   */
  groupNm?: string

  /** 성분명 */
  igrdNm?: string  
}

/**
 * 효능군중복주의 상세 조회 결과 정보
 */
export interface DurEftgrpDetailRVO {
    /**
     * 효능그룹명
     * ex) 해열진통소염제, 최면진정제
     */
    effGroupNm: string;

    /**
     * 계열(그룹명)
     */
    groupNm: string;

    /**
     * 검색한 제품의 성분
     */
    igrdNm: string;
}

/**
 * DUR 효능군중복주의 상세 조회 결과 목록
 */
export interface DurEftgrpDetailListRVO {
  list: DurEftgrpDetailRVO[]
  totalCount: number
  totalPages: number
}