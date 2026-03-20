export interface FileItem {
  atchFileId: string;
  fileNm: string;
  fileExtnNm: string;
  fileSz: number;
  fileStrgPathDsctn: string;
}

export interface QnaItem {
  id: number;
  title: string;
  content: string;
  writer: string;
  qstnSn: string;
  bbsId: string;
  pstTtl: string;
  qstnrNm: string;
  qstnrEml: string;
  rlsYn: string;
  pstEnpswd: string;
  pstCn: string;
  pstInqCnt: string;
  atchFileId: string;
  thmbId: string;
  delYn: string;
  rgtrId: string;
  regDt: string;
  regPrgmId: string;
  mdfrId: string;
  mdfcnDt: string;
  mdfcnPrgmId: string;
  qstnPrgrsSttsCd: string;
  hasFile: string;
  fileList?: FileItem[];
}

export type FetchQnaListParams = {
  bbsId?: string;
  page: number;
  pageSize: string;
  searchType?: string;
  searchKeyword?: string;
  qstnPrgrsSttsCd?: string;
};

export type FetchQnaListResponse = {
  list: QnaItem[];
  totalCount: number;
};
