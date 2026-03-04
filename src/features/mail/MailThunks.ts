import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { sendEmailApiPath } from '@/api/mail/MailApiPaths'
import { MailSendPVO } from '@/features/mail/MailTypes'

/**
 * 이메일 발송
 */
export const sendEmail = createAsyncThunk<string, MailSendPVO | undefined, { rejectValue: string }>(
  '/mail/send',
  async (params: MailSendPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(sendEmailApiPath(), params);
      const payload = res.data?.data?.result;
      return payload;
    }
    catch (e) {
      console.error("MailThunks sendEmail error!!", e);
      return rejectWithValue('MailThunks sendEmail error!!');
    }
  }
)