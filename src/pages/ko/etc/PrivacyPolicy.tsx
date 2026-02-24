/**
 * 화면ID: KIDS-PP-US-CS-02
 * 화면명: 개인정보취급방침
 * 화면경로: /etc/PrivacyPolicy
 * 화면설명: 개인정보취급방침
 */
import { useEffect } from 'react';
import DepsLocation from '@/components/common/DepsLocation';
import RenderTrmsStt from '@/pages/ko/etc/components/RenderTrmsStt';
import { Box } from '@mui/material';

export default function PrivacyPolicy() {

  // 목차 클릭 시 해당 본문으로 링크
  const goToScroll = (className: string) => {
    const element = document.querySelector(`.${className}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if(!window.goToScroll) {
    //리액트 dom으로 관리되지않는 innerHTML 내부 이벤트 처리를 위한 전역함수.
    window.goToScroll = (className: string) => {
      const element = document.querySelector(`.${className}`);
      console.log(element)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
  }

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

                <RenderTrmsStt trmsSttCd='STT_PRVC_PP' isList={true} />
                
              {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
