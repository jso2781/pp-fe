import { combineReducers } from '@reduxjs/toolkit'
import menuReducer from '@/features/auth/MenuSlice'
import authReducer from '@/features/auth/AuthSlice'
import pstReducer from '@/features/pst/PstSlice'
import uiReducer from '@/features/ui/uiSlice'
import faqReducer from '@/features/faq/FaqSlice'
import opnnReducer from '@/features/opnn/OpnnSlice'
import mainReducer from '@/features/main/MainSlice'


const rootReducer = combineReducers({
  ui: uiReducer,
  menu: menuReducer,
  auth: authReducer,
  pst: pstReducer, // 게시판
  faq: faqReducer, // FAQ
  opnn: opnnReducer, // 의견제안
  main: mainReducer // 메인화면
})

export default rootReducer
