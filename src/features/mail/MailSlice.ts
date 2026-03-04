import { createSlice } from '@reduxjs/toolkit'
import { sendEmail } from './MailThunks'

export interface MailState {
  sendYn: boolean | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_전문가업무신청관리 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: MailState = {  
  sendYn: null,
  loading: false,
  error: null
}

const MailSlice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder 
      .addCase(sendEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to sendEmail';
      })      
  }
});

export default MailSlice.reducer