/**
 * 화면ID: KIDS-PP-US-CS-01
 * 화면명: 이용약관
 * 화면경로: /etc/Terms
 * 화면설명: 이용약관
 */
import DepsLocation from '@/components/common/DepsLocation';
import RenderTrmsStt from '@/pages/ko/etc/components/RenderTrmsStt';
import { Box } from '@mui/material';

export default function Terms() {
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

                <RenderTrmsStt trmsSttCd='UTZTN' isList={false}/>

              {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
