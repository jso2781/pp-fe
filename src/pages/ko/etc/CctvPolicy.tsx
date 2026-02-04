/**
 * 화면ID: KIDS-PP-US-CS-03
 * 화면명: 고정형 영상정보처리기기 운영·관리 방침
 * 화면경로: /etc/CctvPolicy
 * 화면설명: 고정형 영상정보처리기기 운영·관리 방침
 */
import DepsLocation from '@/components/common/DepsLocation';
import RenderTrmsStt from '@/pages/ko/etc/components/RenderTrmsStt';
import { Box } from '@mui/material';

export default function CctvPolicy() {
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
  
                  <RenderTrmsStt trmsSttCd='STT_CCTV' isList={true} />
  
                {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
  )
}