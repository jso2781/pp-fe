/**
 * 제품 상세 조회 파라메터 정보
 */
export interface DurPrdctDetailListPVO {
  /** 현재 페이지 인덱스 */
  pageNum?: number

  /** 한 페이지에 보여줄 아이템의 개수 */
  pageSize?: number

  /** 성분명 */
  igrdNm?: string

  /**
   * 금기 유형 코드
   * ex)
   * conc - DUR병용금기 정보에서 제품별 제약회사 조회(성분명 조건)
   * age - DUR연령금기 정보에서 제품별 제약회사 조회(성분명 조건)
   * prgnt - DUR임부금기 정보에서 제품별 제약회사 조회(성분명 조건)
   * cpct - DUR용량주의 정보에서 제품별 제약회사 조회(성분명 조건)
   * dosage - DUR투여기간주의 정보에서 제품별 제약회사 조회(성분명 조건)
   * eftgrp - DUR효능군중복 정보에서 제품별 제약회사 조회(성분명 조건)
   * snctz - DUR노인주의 정보에서 제품별 제약회사 조회(성분명 조건)
   * nursw - DUR수유부주의 정보에서 제품별 제약회사 조회(성분명 조건)
   */
  bannTypeCd: string

  /** 연령금기 해당연령 */
  rlvtAge?: string
}

/**
 * 제품 상세 조회 결과 정보
 */
export interface DurPrdctDetailRVO {
    /**
     * 제품명
     * ex) 메토클로프라미드, 비사코딜
     */
    prdctNm: string;

    /**
     * 제약회사(업체명)
     */
    bzentyNm: string;
}

/**
 * DUR 제품 상세 조회 결과 목록
 */
export interface DurPrdctDetailListRVO {
  list: DurPrdctDetailRVO[]
  totalCount: number
  totalPages: number
}