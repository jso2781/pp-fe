import React from 'react';
import { Box, Typography, Link } from '@mui/material';

export default function KoglLicense() {
  return (
    <Box className="kogl-license-wrap">
      <Box className="kogl-container">
        <Link 
          href="http://www.kogl.or.kr/info/licenseType4.do"
          underline="none"
          target="_blank"
          title="새창열림: 공공누리 제4유형 저작권 상세정보"
          rel="noopener noreferrer"
        >
          <Box className="kogl-image">
            <img 
              src="/img/icon_kogl.png" 
              alt="공공누리 제4유형: 출처표시, 상업적 이용금지, 변경금지" 
            />
          </Box>
        </Link>
        <Box className="kogl-text">
          <Typography component="p">
            본 저작물은 "공공누리" 제4유형 : 출처표시 + 상업적 이용금지 + 변경금지 조건에 따라 이용할 수 있습니다.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}