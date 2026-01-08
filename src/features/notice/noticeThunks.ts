import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { getNoticeDetailPath, getNoticeListPath } from '@/api/noticeApi'
import {NoticeListParams, Notice, NoticeList, mockNoticeListForTable} from './noticeTypes'

export const fetchNoticeList = createAsyncThunk<NoticeList, NoticeListParams | undefined>(
  'notice/fetchList',
  async ({ pageIndex = 1, searchCnd = '', searchWrd = '' }: NoticeListParams = {}) => {
    try {
      const res = await https.post(getNoticeListPath(), {params: { pageIndex, searchCnd, searchWrd }});

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data;

      // 서버가 Notice[] 형식으로 주므로 NoticeListResult 형식으로 데이터 구조 재조정
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      }as NoticeList;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("noticeThunks fetchNoticeList mockNoticeListForTable=",mockNoticeListForTable);
      const filtered = mockNoticeListForTable.filter((n) => {
        if (!searchWrd) return true
        const v = (searchCnd === 'content' ? n.content : n.title) || ''
        return v.includes(searchWrd)
      })
      const result: NoticeList = { list: filtered as Notice[], totalCount: filtered.length }
      return result
    }
  },
)

export const fetchNoticeDetail = createAsyncThunk<
  Notice,
  number | string,
  { rejectValue: string }
>('notice/fetchDetail', async (id, { rejectWithValue }) => {
  try {
    const res = await https.get(getNoticeDetailPath(id));
    console.log("noticeThunks fetchNoticeDetail getNoticeDetailPath id="+id+", res=",res.data);

    // HTML이면 API가 아니라 index.html을 받은 것 → 실패 처리
    if (typeof res.data === 'string' && res.data.trim().startsWith('<!doctype html')) {
      // return rejectWithValue('API 응답이 HTML입니다. Vite proxy/baseURL 설정을 확인하세요.')
      return rejectWithValue('Detail API returned HTML (check baseURL/proxy/path)')
    }
    return res.data;
  } catch (e) {
    console.log("noticeThunks fetchNoticeDetail mockNoticeListForTable=",mockNoticeListForTable);
    return (mockNoticeListForTable as Notice[]).find((n) => String(n.id) === String(id)) || null
  }
})
