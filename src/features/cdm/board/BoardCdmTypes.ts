export interface FileItem {
  atchFileId: string;
  fileNm: string;
  fileExtnNm: string;
  fileSz: number;
  fileStrgPathDsctn: string;
}

export interface BoardItem {
  id: string;
  title: string;
  content: string;
  writer: string;
  pstSn: string;
  bbsId: string;
  pstTtl: string;
  pstCn: string;
  pstInqCnt: string;
  pstKoglCprgtTypeCd: string;
  atchFileGroupId: string;
  thmbId: string;
  fixYn: string;
  fixBgngYmd: string;
  fixEndYmd: string;
  vdoUrlAddr: string;
  expsrYn: string;
  wrtrDeptNm: string;
  mdfrDeptNm: string;
  rgtrId: string;
  regDt: string;
  mdfrId: string;
  mdfcnDt: string;
  hasFile: string;
  fileList?: FileItem[];
}

export type FetchBoardListParams = {
  bbsId: string;
  page: number;
  pageSize: string;
  searchType?: string;
  searchKeyword?: string;
};

export type FetchBoardListResponse = {
  list: BoardItem[];
  totalCount: number;
};
