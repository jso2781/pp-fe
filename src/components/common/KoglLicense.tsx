import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';

export default function KoglLicense() {
  const location = useLocation();
  const { getMenuInfo } = useAuth();

  // ex) /maintask/dur/DurUnderstand
  console.log('KoglLicense location.pathname=', location.pathname);

  const menuInfo = getMenuInfo(location.pathname);
  let koglCprgtTypeCd = '4';
  let koglCprgtTypeTitle = '공공누리 제4유형 저작권 상세정보';
  let koglCprgtTypeUrl = 'http://www.kogl.or.kr/info/licenseType4.do';
  let koglCprgtTypeNm = '공공누리 제4유형: 출처표시, 상업적 이용금지, 변경금지';
  let koglCprgtTypeImage = '/img/kogl/mark_type4.png';
  let koglCprgtTypeImageAlt = '공공누리 제4유형 저작권 상세정보';
  let koglCprgtTypeDescription = '본 저작물은 "공공누리" 제4유형 : 출처표시 + 상업적 이용금지 + 변경금지 조건에 따라 이용할 수 있습니다.';

  if(menuInfo && menuInfo.menuKoglCprgtTypeCd && menuInfo.menuKoglCprgtTypeCd !== '') {
    koglCprgtTypeCd = menuInfo.menuKoglCprgtTypeCd;
    
    if(koglCprgtTypeCd === '1') {
      koglCprgtTypeNm = '공공누리 제1유형: 출처표시, 상업적 이용금지, 변경금지';
    } else if(koglCprgtTypeCd === '2') {
      koglCprgtTypeNm = '공공누리 제2유형: 출처표시, 상업적 이용금지, 변경금지';
    } else if(koglCprgtTypeCd === '3') {
      koglCprgtTypeNm = '공공누리 제3유형: 출처표시, 상업적 이용금지, 변경금지';
    }
    console.log(menuInfo.menuKoglCprgtTypeCd);
  }

  return (
    <Box className="kogl-license-wrap">
      <Box className="kogl-container">
        <Link 
          href={koglCprgtTypeUrl}
          underline="none"
          target="_blank"
          title={koglCprgtTypeTitle}
          rel="noopener noreferrer"
        >
          <Box className="kogl-image">
            <img 
              src={koglCprgtTypeImage}
              alt={koglCprgtTypeImageAlt}
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