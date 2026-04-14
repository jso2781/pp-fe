import { createSlice } from '@reduxjs/toolkit'
import { selectAsmtPrpList, getAsmtPrpDetail, getAsmtPrpAnswer, increaseAsmtPrpViewCount, selectAsmtPrpStatusCodes } from './AsmtprpCdmThunks'
import { AsmtPrpItem } from './AsmtprpCdmTypes'

export interface CdmAsmtPrpState {
  list: AsmtPrpItem[]
  totalCount: number
  detail: AsmtPrpItem | null
  answer: any | null
  statusCodeMap: Record<string, string>
  loading: boolean
  error: string | null
}

const initialState: CdmAsmtPrpState = {
  list: [],
  totalCount: 0,
  detail: null,
  answer: null,
  statusCodeMap: {},
  loading: false,
  error: null,
}

const CdmAsmtPrpSlice = createSlice({
  name: 'cdmAsmtPrp',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.detail = null;
      state.answer = null;
    },
    resetResults: (state) => {
      state.list = [];
      state.totalCount = 0;
      state.detail = null;
      state.answer = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectAsmtPrpList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.list = [];
        state.totalCount = 0;
      })
      .addCase(selectAsmtPrpList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectAsmtPrpList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load asmtprp list';
      })
      .addCase(getAsmtPrpDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.detail = null;
      })
      .addCase(getAsmtPrpDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(getAsmtPrpDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load asmtprp detail';
      })
      .addCase(getAsmtPrpAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.answer = null;
      })
      .addCase(getAsmtPrpAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.answer = action.payload;
      })
      .addCase(getAsmtPrpAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load asmtprp answer';
      })
      .addCase(increaseAsmtPrpViewCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(increaseAsmtPrpViewCount.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(increaseAsmtPrpViewCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to increase asmtprp view count';
      })
      .addCase(selectAsmtPrpStatusCodes.fulfilled, (state, action) => {
        state.statusCodeMap = action.payload;
      })
  },
});

export const { clearCurrent, resetResults } = CdmAsmtPrpSlice.actions
export default CdmAsmtPrpSlice.reducer
