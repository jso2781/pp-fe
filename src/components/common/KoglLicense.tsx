import { useTranslation } from 'react-i18next';
import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';

export default function KoglLicense() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { getMenuInfo } = useAuth();

  const menuInfo = getMenuInfo(location.pathname);
  let koglCprgtTypeCd = '4';
  let koglCprgtTypeTitle = i18n.language === 'ko' ? t('koglCprgtType4KoTitle') : t('koglCprgtType4EnTitle');
  let koglCprgtTypeUrl = i18n.language === 'ko' ? t('koglCprgtType4KoUrl') : t('koglCprgtType4EnUrl');
  let koglCprgtTypeNm = i18n.language === 'ko' ? t('koglCprgtType4KoNm') : t('koglCprgtType4EnNm');
  let koglCprgtTypeImage = i18n.language === 'ko' ? t('koglCprgtType4KoImage') : t('koglCprgtType4EnImage');
  let koglCprgtTypeImageAlt = i18n.language === 'ko' ? t('koglCprgtType4KoImageAlt') : t('koglCprgtType4EnImageAlt');
  let koglCprgtTypeDescription = i18n.language === 'ko' ? t('koglCprgtType4KoDescription') : t('koglCprgtType4EnDescription');


  if(menuInfo && menuInfo.menuKoglCprgtTypeCd && menuInfo.menuKoglCprgtTypeCd !== '') {
    koglCprgtTypeCd = menuInfo.menuKoglCprgtTypeCd;

    // ex) /maintask/dur/DurUnderstand
    console.log('KoglLicense menuInfo.menuKoglCprgtTypeCd='+koglCprgtTypeCd+", location.pathname="+location.pathname);

    if(koglCprgtTypeCd === '1'){
      koglCprgtTypeTitle = i18n.language === 'ko' ? t('koglCprgtType1KoTitle') : t('koglCprgtType1EnTitle');
      koglCprgtTypeUrl = i18n.language === 'ko' ? t('koglCprgtType1KoUrl') : t('koglCprgtType1EnUrl');
      koglCprgtTypeNm = i18n.language === 'ko' ? t('koglCprgtType1KoNm') : t('koglCprgtType1EnNm');
      koglCprgtTypeImage = i18n.language === 'ko' ? t('koglCprgtType1KoImage') : t('koglCprgtType1EnImage');
      koglCprgtTypeImageAlt = i18n.language === 'ko' ? t('koglCprgtType1KoImageAlt') : t('koglCprgtType1EnImageAlt');
      koglCprgtTypeDescription = i18n.language === 'ko' ? t('koglCprgtType1KoDescription') : t('koglCprgtType1EnDescription');
    }else if(koglCprgtTypeCd === '2'){
      koglCprgtTypeTitle = i18n.language === 'ko' ? t('koglCprgtType2KoTitle') : t('koglCprgtType2EnTitle');
      koglCprgtTypeUrl = i18n.language === 'ko' ? t('koglCprgtType2KoUrl') : t('koglCprgtType2EnUrl');
      koglCprgtTypeNm = i18n.language === 'ko' ? t('koglCprgtType2KoNm') : t('koglCprgtType2EnNm');
      koglCprgtTypeImage = i18n.language === 'ko' ? t('koglCprgtType2KoImage') : t('koglCprgtType2EnImage');
      koglCprgtTypeImageAlt = i18n.language === 'ko' ? t('koglCprgtType2KoImageAlt') : t('koglCprgtType2EnImageAlt');
      koglCprgtTypeDescription = i18n.language === 'ko' ? t('koglCprgtType2KoDescription') : t('koglCprgtType2EnDescription');
    }else if(koglCprgtTypeCd === '3'){
      koglCprgtTypeTitle = i18n.language === 'ko' ? t('koglCprgtType3KoTitle') : t('koglCprgtType3EnTitle');
      koglCprgtTypeUrl = i18n.language === 'ko' ? t('koglCprgtType3KoUrl') : t('koglCprgtType3EnUrl');
      koglCprgtTypeNm = i18n.language === 'ko' ? t('koglCprgtType3KoNm') : t('koglCprgtType3EnNm');
      koglCprgtTypeImage = i18n.language === 'ko' ? t('koglCprgtType3KoImage') : t('koglCprgtType3EnImage');
      koglCprgtTypeImageAlt = i18n.language === 'ko' ? t('koglCprgtType3KoImageAlt') : t('koglCprgtType3EnImageAlt');
      koglCprgtTypeDescription = i18n.language === 'ko' ? t('koglCprgtType3KoDescription') : t('koglCprgtType3EnDescription');
    }
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
            {koglCprgtTypeDescription}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}