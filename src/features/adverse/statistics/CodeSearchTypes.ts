/**
 * 코드검색 타입 정의
 */
export type CodeSearchType =
  | 'item'
  | 'ingredient'
  | 'classIngredient'
  | 'foreignItem'
  | 'foreignIngredient'
  | 'llt'
  | 'pt'
  | 'soc'

/**
 * 코드검색 결과 단건 정보
 */
export interface CodeSearchRVO {
  /** 코드 */
  code: string

  /** 한글명 */
  nameKor: string

  /** 영문명 */
  nameEng?: string

  /** 부가정보 */
  additionalInfo?: string
}

/**
 * 코드검색 페이지 조회 파라메터 정보
 */
export interface CodeSearchPagePVO {
  /** 검색 키워드 */
  keyword?: string | null

  /** 페이지 번호 (0-based) */
  page: number

  /** 페이지 크기 */
  size: number

  /** 버전 (국외 품목/성분, MedDRA 전용) */
  version?: string
}

/**
 * 코드검색 페이지 조회 결과 정보
 */
export interface CodeSearchPageRVO {
  list: CodeSearchRVO[]
  totalCount: number
  page: number
  size: number
  totalPages: number
}
