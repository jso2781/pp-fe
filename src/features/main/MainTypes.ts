/**
 * 대국민포털_메인화면 컨텐츠 게시판별 게시글 정보 
 */
export interface PostVO {
  /** 게시글일련번호 */
  pstSn?: string

  /** 순번 */
  no?: 1

  /** 게시판아이디 */
  bbsId?: string

  /** 게시물제목 */
  pstTtl?: string

  /** 등록일시 */
  regDt?: string

  /** 첨부파일명 */
  atchFileNm?: string

  /** 첨부파일경로 */
  atchFilePath?: string
}

/**
 * 대국민포털_메인화면 컨텐츠 정보 
 */
export interface MainRVO {
  youtube: PostVO[]
  insta: PostVO[]
  news: PostVO[]
  bodo: PostVO[]
  blog: PostVO[]
  card: PostVO[]
  promotion: PostVO[]
  notice: PostVO[]
  mainImageUrl: string
}