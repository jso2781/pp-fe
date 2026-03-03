import React, { useMemo, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../../ScreenShell';

export default function KIDS_PP_US_MF_01() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '' 
    },
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-MF-01" title="메일폼" uiType="">

    <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">
            {/* 컨텐츠 본문 영역 */}
            <Box className="sub-content">
              <DepsLocation />
              <Box className="content-view" id="content">
                <Box className="page-content">
                {/* --- 본문 시작 --- */}

                
                  <p>published/ko/screens/ KIDS-PP-US-MF-01.html - 전문가회원 신청 결과 안내</p>
                  <p>published/ko/screens/ KIDS-PP-US-MF-02.html - 클린신고 접수 안내</p>
                  <p>published/ko/screens/ KIDS-PP-US-MF-03.html - 비밀번호 발급 메일</p>


                {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      
      
    </ScreenShell>
  );
}
