import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import {
  selectBoardListApiPath,
  getBoardDetailApiPath,
  increaseBoardViewCountApiPath,
} from '@/api/cdm/board/BoardCdmApiPaths'
import { BoardItem, FetchBoardListParams, FetchBoardListResponse } from './BoardCdmTypes'

/**
 * 게시판 목록 조회
 */
export const selectBoardList = createAsyncThunk<FetchBoardListResponse, FetchBoardListParams | undefined, { rejectValue: string }>(
  '/community/board/selectList',
  async (params: FetchBoardListParams = { bbsId: '', page: 1, pageSize: '10', searchType: '', searchKeyword: '' }, { rejectWithValue }) => {
    try {
      const res = await https.get(selectBoardListApiPath(), { params });
      return {
        list: res.data?.data || [],
        totalCount: res.data?.total || 0,
      } as FetchBoardListResponse;
    } catch (e) {
      console.error('BoardCdmThunks selectBoardList error!!', e);
      return rejectWithValue('BoardCdmThunks selectBoardList error!!');
    }
  }
)

/**
 * 게시판 상세 조회
 */
export const getBoardDetail = createAsyncThunk<BoardItem, { bbsId: string; pstSn: string } | undefined, { rejectValue: string }>(
  '/community/board/selectDetail',
  async (params: { bbsId: string; pstSn: string } = { bbsId: '', pstSn: '' }, { rejectWithValue }) => {
    try {
      const res = await https.get(getBoardDetailApiPath(), { params });
      return res.data?.data as BoardItem;
    } catch (e) {
      console.error('BoardCdmThunks getBoardDetail error!!', e);
      return rejectWithValue('BoardCdmThunks getBoardDetail error!!');
    }
  }
)

/**
 * 게시판 조회수 증가
 */
export const increaseBoardViewCount = createAsyncThunk<void, { pstSn: string } | undefined, { rejectValue: string }>(
  '/community/board/increaseViewCount',
  async (params: { pstSn: string } = { pstSn: '' }, { rejectWithValue }) => {
    try {
      await https.post(increaseBoardViewCountApiPath(), null, { params });
      return;
    } catch (e) {
      console.error('BoardCdmThunks increaseBoardViewCount error!!', e);
      return rejectWithValue('BoardCdmThunks increaseBoardViewCount error!!');
    }
  }
)
