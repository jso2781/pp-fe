import { combineReducers } from '@reduxjs/toolkit'
import menuReducer from '@/features/auth/MenuSlice'
import authReducer from '@/features/auth/AuthSlice'
import pstReducer from '@/features/pst/PstSlice'
import uiReducer from '@/features/ui/uiSlice'
import faqReducer from '@/features/faq/FaqSlice'
import opnnReducer from '@/features/opnn/OpnnSlice'
import mainReducer from '@/features/main/MainSlice'
import sttReducer from '@/features/stt/TrmsSttSlice'
import mbrInfoReducer from '@/features/mbr/MbrInfoSlice'

const rootReducer = combineReducers({
  ui: uiReducer,
  menu: menuReducer,
  auth: authReducer,
  stt: sttReducer, // 약관법령
  pst: pstReducer, // 게시판
  faq: faqReducer, // FAQ
  opnn: opnnReducer, // 의견제안
  main: mainReducer, // 메인화면
  mbrInfo: mbrInfoReducer // 회원정보
})

export default rootReducer
