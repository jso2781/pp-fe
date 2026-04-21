import { combineReducers } from '@reduxjs/toolkit'
import menuReducer from '@/features/auth/MenuSlice'
import authReducer from '@/features/auth/AuthSlice'
import orgchtReducer from '@/features/dep/OrgchtSlice'
import pstReducer from '@/features/pst/PstSlice'
import uiReducer from '@/features/ui/uiSlice'
import faqReducer from '@/features/faq/FaqSlice'
import opnnReducer from '@/features/opnn/OpnnSlice'
import mainReducer from '@/features/main/MainSlice'
import sttReducer from '@/features/stt/TrmsSttSlice'
import mbrInfoReducer from '@/features/mbr/MbrInfoSlice'
import cmsReducer from '@/features/cms/CmsSlice'
import exprtTaskReducer from '@/features/exprt/ExprtTaskSlice'
import exprtApprovalReducer from '@/features/exprt/ExprtApprovalSlice'
import DshstyDclrReucer from '@/features/dclr/DshstyDclrSlice'
import DurSearchRoomReducer from '@/features/dur/DurSearchRoomSlice'
import DurMyDrugInfoReducer from '@/features/dur/DurMyDrugInfoSlice'
import DurEftgrpDetailReducer from '@/features/dur/DurEftgrpDetailSlice'
import DurPrdctDetailReducer from '@/features/dur/DurPrdctDetailSlice'
import IntegratedSearchReducer from '@/features/search/IntegratedSearchSlice'
import AnyIdReducer from '@/features/auth/AnyIdSlice'
import mbcmtApplyReducer from '@/features/advice/MbcmtApplySlice'
import cdmBoardReducer from '@/features/cdm/board/BoardCdmSlice'
import cdmFaqReducer from '@/features/cdm/faq/FaqCdmSlice'
import cdmQnaReducer from '@/features/cdm/qna/QnaCdmSlice'
import cdmAsmtPrpReducer from '@/features/cdm/asmtprp/AsmtprpCdmSlice'
import cryptoReducer from '@/features/crypto/CryptoSlice'
import niceReducer from '@/features/auth/NiceSlice'

const rootReducer = combineReducers({
  ui: uiReducer,
  menu: menuReducer,
  auth: authReducer,
  orgcht: orgchtReducer, // 조직도
  stt: sttReducer, // 약관법령
  pst: pstReducer, // 게시판
  faq: faqReducer, // FAQ
  opnn: opnnReducer, // 의견제안
  main: mainReducer, // 메인화면
  mbrInfo: mbrInfoReducer, // 회원정보
  cms: cmsReducer, // CMS
  exprtTask: exprtTaskReducer, // 전문가내업무관리
  exprtApproval: exprtApprovalReducer, // 전문가업무신청관리
  dclr: DshstyDclrReucer, // 부정신고,
  durSearchRoom: DurSearchRoomReducer, // DUR 정보 검색
  durMyDrugInfo: DurMyDrugInfoReducer, // 내가 먹는 약의 DUR 정보
  durEftgrpDetail: DurEftgrpDetailReducer, // DUR 효능군중복주의 상세 조회 팝업
  durPrdctDetail: DurPrdctDetailReducer, // DUR 제품 상세 조회 팝업
  integratedSearch: IntegratedSearchReducer, // 통합검색
  anyId: AnyIdReducer, // SSO, ANY-ID 정보
  mbcmtApply: mbcmtApplyReducer, // 자문위원 전환신청
  cdmBoard: cdmBoardReducer, // CDM 게시판
  cdmFaq: cdmFaqReducer, // CDM FAQ
  cdmQna: cdmQnaReducer, // CDM Q&A
  cdmAsmtPrp: cdmAsmtPrpReducer, // CDM 과제제안
  crypto: cryptoReducer, // 암·복호화(CA decrypto 등)
  nice: niceReducer, // 나이스 본인인증
})

export default rootReducer
