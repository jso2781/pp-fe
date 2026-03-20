export type FetchFaqListParams = {
  page: number;
  pageSize: string;
  bbsId: string;
  faqClsfNm?: string;
  searchType?: string;
  searchKeyword?: string;
};

export type FetchFaqListResponse = {
  list: FaqItem[];
  totalCount: number;
};

export interface FaqItem {
  id: number;
  title: string;
  content: string;
  writer: string;
  faqSn: string;
  taskSeCd: string;
  faqClsfNm: string;
  faqSeNm: string;
  faqTtl: string;
  faqSeq: number;
  useYn: string;
  langSeId: string;
  faqAnsCn: string;
  atchFileId: string;
  wrtrDeptNm: string;
  mdfrDeptNm: string;
  rgtrId: string;
  regDt: string;
  mdfrId: string;
  mdfcnDt: string;
  pstInqCnt: string;
}