import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { getPstListPath, getPstDetailPath } from '@/api/pst/PstApiPaths'
import { mockPstList, PstPVO, PstRVO, PstListPVO, PstListRVO, PstDVO  } from './PstTypes'

/**
 * 대국민포털_게시물기본 정보 목록 조회 
 */
export const selectPstList = createAsyncThunk<PstListRVO, PstListPVO | undefined>(
  '/notice/selectPstList',
  async (params: PstListPVO = {}) => {
    try {
      const res = await https.post(getPstListPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data?.data?.list;

      // 서버가 Pst[] 형식으로 주므로 PstListRVO 형식으로 데이터 구조 재조정 
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as PstListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("PstThunks selectPstList mockPstList=",mockPstList);
      const filtered = mockPstList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: PstListRVO = { list: filtered as PstRVO[], totalCount: filtered.length }
      return result;
    }
  }
)

/**
 * 대국민포털_게시물기본 정보 조회 
 */
export const getPst = createAsyncThunk<PstRVO, PstPVO | undefined>(
  '/notice/getPst',
  async (params: PstPVO = {}) => {
    try {
      const res = await https.post(getPstDetailPath(), params);

      const payload = res.data;

      // 서버가 PstRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("PstThunks getPst mockPstList=",mockPstList);
      return mockPstList[0] || null;
    }
  }
)