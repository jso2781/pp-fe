import { combineReducers } from '@reduxjs/toolkit'
import menuReducer from '@/features/auth/MenuSlice'
import boardReducer from '@/features/board/boardSlice'
import noticeReducer from '@/features/notice/noticeSlice'
import pstReducer from '@/features/pst/PstSlice'
import uiReducer from '@/features/ui/uiSlice'

const rootReducer = combineReducers({
  board: boardReducer,  // FIXME 테스트 이후 삭제예정
  notice: noticeReducer,  // FIXME 테스트 이후 삭제예정
  ui: uiReducer,
  menu: menuReducer,
  pst: pstReducer // 게시판
})

export default rootReducer
