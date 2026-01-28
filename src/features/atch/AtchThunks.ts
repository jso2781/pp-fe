import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectAtchListApiPath, getAtchApiPath, insertAtchApiPath, updateAtchApiPath, saveAtchApiPath, deleteAtchApiPath, downloadAtchApiPath } from '@/api/atch/AtchApiPaths'
import { mockAtchList, AtchPVO, AtchRVO, AtchListPVO, AtchListRVO, AtchDVO, AtchDownVO  } from './AtchTypes'

/**
 * 공통_첨부파일기본 정보 목록 조회 
 */
export const selectAtchList = createAsyncThunk<AtchListRVO, AtchListPVO | undefined>(
  '/atch/selectAtchList',
  async (params: AtchListPVO = {}) => {
    try {
      const res = await https.post(selectAtchListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data;

      // 서버가 Atch[] 형식으로 주므로 AtchListRVO 형식으로 데이터 구조 재조정 
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as AtchListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("AtchThunks selectAtchList mockAtchList=",mockAtchList);
      const filtered = mockAtchList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: AtchListRVO = { list: filtered as AtchRVO[], totalCount: filtered.length }
      return result;
    }
  }
)

/**
 * 공통_첨부파일기본 정보 조회 
 */
export const getAtch = createAsyncThunk<AtchRVO, AtchPVO | undefined>(
  '/atch/getAtch',
  async (params: AtchPVO = {}) => {
    try {
      const res = await https.post(getAtchApiPath(), params);

      const payload = res.data;

      // 서버가 AtchRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("AtchThunks getAtch mockAtchList=",mockAtchList);
      return (mockAtchList).find((n) => mockAtchList[0]) || null;
    }
  }
)

/**
 * 공통_첨부파일기본 입력 
 */
export const insertAtch = createAsyncThunk<number, AtchPVO>(
  '/atch/insertAtch',
  async (params: AtchPVO) => {
    try {
      const res = await https.post(insertAtchApiPath(), params);

      const insertCnt = res.data;

      // 입력된 건수 반환함. 
      return insertCnt;
    }
    catch (e) {
      console.log("AtchThunks insertAtch");
      return -1;
    }
  }
)

/**
 * 공통_첨부파일기본 수정 
 */
export const updateAtch = createAsyncThunk<number, AtchPVO>(
  '/atch/updateAtch',
  async (params: AtchPVO) => {
    try {
      const res = await https.post(updateAtchApiPath(), params);

      const updateCnt = res.data;

      // 수정된 건수 반환함. 
      return updateCnt;
    }
    catch (e) {
      console.log("AtchThunks updateAtch");
      return -1;
    }
  }
)

/**
 * 공통_첨부파일기본 저장 
 */
export const saveAtch = createAsyncThunk<number, AtchPVO>(
  '/atch/saveAtch',
  async (params: AtchPVO) => {
    try {
      const res = await https.post(saveAtchApiPath(), params);

      const saveCnt = res.data;

      // 저장된 건수 반환함. 
      return saveCnt;
    }
    catch (e) {
      console.log("AtchThunks saveAtch error!!");
      return -1;
    }
  }
)

/**
 * 공통_첨부파일기본 삭제 
 */
export const deleteAtch = createAsyncThunk<number, AtchDVO>(
  '/atch/deleteAtch',
  async (params: AtchDVO) => {
    try {
      const res = await https.post(deleteAtchApiPath(), params);

      const deleteCnt = res.data;

      // 삭제된 건수 반환함. 
      return deleteCnt;
    }
    catch (e) {
      console.log("AtchThunks deleteAtch error!!");
      return -1;
    }
  }
)

/**
 * 공통_첨부파일 다운로드
 */
export const downloadAtch = createAsyncThunk<void, AtchDownVO>(
  '/atch/download',
  async (params: AtchDownVO) => {
    try {
      const res = await https.post(
        downloadAtchApiPath(),
        params,
        {
          responseType: 'blob', 
        }
      );

      const blob = new Blob([res.data]);

      let fileName = 'download.file';
      const disposition = res.headers['content-disposition'];

      if (disposition) {
        // filename*=UTF-8''xxx
        const utf8Match = disposition.match(/filename\*\=UTF-8''(.+)/);

        if (utf8Match) {
          fileName = decodeURIComponent(utf8Match[1]);
        } else {
          // filename="xxx"
          const asciiMatch = disposition.match(/filename="?([^"]+)"?/);

          if (asciiMatch) {
            fileName = asciiMatch[1];
          }        
        }
      }

      // 브라우저 다운로드 처리
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error('AtchThunks downloadAtch error!!', e);      
    }
  }
);