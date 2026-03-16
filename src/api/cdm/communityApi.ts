// src/communityApi.ts
import https from '@/api/axiosInstance'
import type { BoardItem, FaqItem, AsmtPrpItem } from "@/api/cdm/communityInterface";

/* =========================
 * 타입
 * ========================= */
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

export type FetchBoardDetailParams = {
  bbsId: string;
  pstSn: string;
};

export type InsertBoardParams = FormData;

export type UpdateBoardParams = FormData;

export type DeleteBoardParams = {
  bbsId: string;
  pstSn: string;
};

/* =========================
 * BoardListView 공통 API (Admin/Member)
 * ========================= */
export const fetchBoardList = (
  params: FetchBoardListParams
): Promise<FetchBoardListResponse> => {
  return https
    .get("/community/board/selectList", { params })
    .then((res) => {
      return {
        list: res.data?.data || [],
        totalCount: res.data?.total || 0,
      };
    });
};

/* =========================
 * AdminBoardWriteView 전용 API
 * ========================= */
export const fetchBoardDetail = (
  params: FetchBoardDetailParams
): Promise<BoardItem> => {
  return https
    .get("/community/board/selectDetail", { params })
    .then((res) => res.data?.data);
};

/* =========================
 * MemberBoardDetailView 전용 API
 * ========================= */
export type IncreaseViewCountParams = {
  pstSn: string;
};

export const increaseViewCount = (
  params: IncreaseViewCountParams
): Promise<any> => {
  return https
    .post("/community/board/increaseViewCount", null, { params })
    .then((res) => res.data?.data);
};

/* =========================
 * FAQ API
 * ========================= */
export type FetchFaqListParams = {
  page: number;
  pageSize: string;
  faqClsfNm?: string;
  searchType?: string;
  searchKeyword?: string;
};

export type FetchFaqListResponse = {
  list: FaqItem[];
  totalCount: number;
};

export const fetchFaqList = (
  params: FetchFaqListParams
): Promise<FetchFaqListResponse> => {
  return https
    .get("/community/faq/selectList", { params })
    .then((res) => {
      return {
        list: res.data?.data || [],
        totalCount: res.data?.total || 0,
      };
    });
};

export const fetchFaqDetail = (faqSn: string): Promise<FaqItem> => {
  return https
    .get("/community/faq/selectDetail", {
      params: { bbsId: "faq", faqSn },
    })
    .then((res) => res.data?.data);
};

export const increaseFaqViewCount = (faqSn: string) => {
  return https
    .post("/community/faq/increaseViewCount", null, {
      params: { faqSn },
    })
    .then((res) => res.data?.data);
};

/* =========================
 * QNA API
 * ========================= */
export type FetchQnaListParams = {
  bbsId?: string;
  page: number;
  pageSize: string;
  searchType?: string;
  searchKeyword?: string;
  qstnPrgrsSttsCd?: string;
};

export type FetchQnaListResponse = {
  list: any[];
  totalCount: number;
};

export const fetchQnaList = (
  params: FetchQnaListParams
): Promise<FetchQnaListResponse> => {
  return https
    .get("/community/qna/selectList", { params })
    .then((res) => {
      return {
        list: res.data?.data || [],
        totalCount: res.data?.total || 0,
      };
    });
};

export const fetchQnaDetail = (qstnSn: string, bbsId?: string) => {
  return https
    .get("/community/qna/selectDetail", {
      params: { qstnSn, bbsId },
    })
    .then((res) => res.data?.data);
};

export const insertQna = (formData: FormData) => {
  return https
    .post("/community/qna/insertQna", formData)
    .then((res) => res.data?.data);
};

export const deleteQna = (params: {
  ansSn?: number;
  qstnSn: string;
}) => {
  return https
    .delete("/community/qna/deleteQna", {
      data: params,
    })
    .then((res) => res.data?.data);
};

export const fetchQnaAnswer = (qstnSn: string) => {
  return https
    .get("/community/qna/selectAnswer", {
      params: { qstnSn },
    })
    .then((res) => res.data?.data);
};

export const increaseQnaViewCount = (qstnSn: string) => {
  return https
    .post("/community/qna/increaseViewCount", null, {
      params: { qstnSn },
    })
    .then((res) => res.data?.data);
};

export const updateQna = (formData: FormData) => {
  return https
    .put("/community/qna/updateQna", formData)
    .then((res) => res.data?.data);
};

/* =========================
 * TaskProposal (과제제안 / asmtprp) API
 * ========================= */
/* 리스트 */
export type FetchAsmtPrpListParams = {
  page: number;
  pageSize: string;
  searchType?: string;
  searchKeyword?: string;
};

export type FetchAsmtPrpListResponse = {
  list: AsmtPrpItem[];
  totalCount: number;
};

export const fetchAsmtPrpList = (
  params: FetchAsmtPrpListParams
): Promise<FetchAsmtPrpListResponse> => {
  return https
    .get("/community/asmtprp/selectList", { params })
    .then((res) => {
      return {
        list: res.data?.data || [],
        totalCount: res.data?.total || 0,
      };
    });
};

/* 상세 */
export const fetchAsmtPrpDetail = (
  asmtPrpSn: string
): Promise<AsmtPrpItem> => {
  return https
    .get("/community/asmtprp/selectDetail", {
      params: { asmtPrpSn },
    })
    .then((res) => res.data?.data);
};

/* 조회수 증가 */
export const increaseAsmtPrpViewCount = (asmtPrpSn: string) => {
  return https
    .post("/community/asmtprp/increaseViewCount", null, {
      params: { asmtPrpSn },
    })
    .then((res) => res.data?.data);
};

/* 등록 */
export const insertAsmtPrp = (formData: FormData) => {
  return https
    .post("/community/asmtprp/insertAsmtPrp", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data?.data);
};

/* 수정 */
export const updateAsmtPrp = (formData: FormData) => {
  return https
    .put("/community/asmtprp/updateAsmtPrp", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data?.data);
};

/* 삭제 */
export const deleteAsmtPrp = (params: {
  asmtPrpSn: string;
  ansSn?: string;
}) => {
  return https.delete("/community/asmtprp/deleteAsmtPrp", {
    params,
  });
};

/* 답변 조회 */
export const fetchAsmtPrpAnswer = (asmtPrpSn: string) => {
  return https
    .get("/community/asmtprp/selectAnswer", {
      params: { asmtPrpSn },
    })
    .then((res) => res.data?.data);
};