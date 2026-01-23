/**
 * 대국민포털_메인화면 컨텐츠 게시판별 게시글 정보 
 */
export interface PostVO {
  /** 게시글일련번호 */
  pstSn?: string | null

  /** 순번 */
  no?: 1

  /** 게시판아이디 */
  bbsId?: string | null

  /** 게시물제목 */
  pstTtl?: string | null

  /** 게시물내용 */
  pstCn?: string | null

  /** 등록일시 */
  regDt?: string | null

  /** 첨부파일명 */
  atchFileNm?: string

  /** 첨부파일경로 */
  atchFilePath?: string

  /** 첨부파일아이디 */
  atchFileId?: string | null

  /** 썸네일아이디 */
  thmbId?: string | null

  /** 썸네일 첨부파일명 */
  thmbFileNm?: string | null

  /** 썸네일 첨부파일경로 */
  thmbFilePath?: string | null

  /** 동영상 ID */
  videoId?: string | null

  /** SNS 타입 */
  snsType?: string | null

  /** 팝업 제목 */
  popupTtl?: string | null

  /** 팝업 링크 주소 */
  popupLnkgAddr?: string | null
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
  all_sns?: PostVO[]
  popup?: PostVO[]
  mainImageUrl?: string
}