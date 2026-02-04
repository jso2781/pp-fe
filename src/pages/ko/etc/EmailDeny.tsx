/**
 * 화면ID: KIDS-PP-US-CS-04
 * 화면명: 이메일 무단수집 거부
 * 화면경로: /etc/EmailDeny
 * 화면설명: 이메일 무단수집 거부
 */
import DepsLocation from '@/components/common/DepsLocation';
import RenderTrmsStt from '@/pages/ko/etc/components/RenderTrmsStt';
import { Box } from '@mui/material';

export default function EmailDeny() {
  return (
    
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">

          {/* 컨텐츠 본문 영역 */}
          <Box className="sub-content">
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
              {/* --- 본문 시작 --- */}

                <RenderTrmsStt trmsSttCd='STT_EML' isList={false}/>

              {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}