export interface FileItem {
  atchFileId: string;
  fileNm: string;
  fileExtnNm: string;
  fileSz: number;
  fileStrgPathDsctn: string;
}

export interface AsmtPrpItem {
  id: number;
  title: string;
  content: string;
  writer: string;
  asmtPrpSn: string;
  pstEnpswd: string;
  rlsYn: string;
  asmtPrpsrNm: string;
  asmtPrpsrEml: string;
  asmtPrpsrTelno: string;
  asmtPrpsrOgdpNm: string;
  tpcTtlNm: string;
  asmtPrpCn: string;
  asmtExptEfctCn: string;
  asmtEtcExplnCn: string;
  asmtCutnMttrCn: string;
  atchFileId: string;
  delYn: string;
  rgtrId: string;
  regDt: string;
  regPrgmId: string;
  mdfrId: string;
  mdfcnDt: string;
  mdfcnPrgmId: string;
  pstInqCnt: string;
  asmtPrpAnsSttsCd: string;
  hasFile: string;
  fileList?: FileItem[];
}

export type FetchAsmtPrpListParams = {
  page: number;
  pageSize: string;
  searchType?: string;
  searchKeyword?: string;
  loginId?: string;
};

export type FetchAsmtPrpListResponse = {
  list: AsmtPrpItem[];
  totalCount: number;
};
