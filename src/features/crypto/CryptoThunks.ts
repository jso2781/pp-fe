import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { decryptoApiPath } from '@/api/crypto/CryptoApiPaths'
import type { CryptoEncryptoPVO, CryptoEncryptoRVO } from './CryptoTypes'
import type { AxiosResponse } from 'axios'

/**
 * CA 복호화 API 프록시 (`CryptoController#decrypto`)
 * 회원정보수정 화면에서 회원 프로필 항목중 암호화된 회원명, 회원전화번호, 회원이메일 값을 복호화하는 용도로 호출됨.
 */
export const decrypto = createAsyncThunk<CryptoEncryptoRVO, CryptoEncryptoPVO, { rejectValue: string }>(
  '/crypto/decrypto',
  async (params: CryptoEncryptoPVO, { rejectWithValue }) => {
    try {
      const res = await https.post(decryptoApiPath(), params)
      const payload = res.data?.data;
      return payload as CryptoEncryptoRVO;
    }catch(e){
      console.log('CryptoThunks decrypto error', e)
      return rejectWithValue('CryptoThunks decrypto error')
    }
  }
)
