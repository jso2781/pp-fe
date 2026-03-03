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

                
                  <p>published/ko/screens/ KIDS-PP-US-MF-01.html 파일 확인</p>


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
