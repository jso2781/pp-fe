/**
 * 화면ID: KIDS-PP-US-DI-01
 * 화면명: DUR 이해
 * 화면경로: /maintask/dur/DurUnderstand
 * 화면설명: DUR 이해
 */
import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import KoglLicense from '@/components/common/KoglLicense';
import { useLocation } from 'react-router-dom';
import ContactArea from '@/components/common/ContactArea';
import { useAuth } from '@/contexts/AuthContext';
import DgstfnExnm from '@/components/common/DgstfnExnm';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCms } from '@/features/cms/CmsThunks';

export default function DurUnderstand() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { current, loading, error } = useAppSelector(s => s.cms);
  const location = useLocation();
  const { getMenuInfo } = useAuth();
  const menuInfo = getMenuInfo(location.pathname);
  const menuSn = menuInfo?.menuSn ?? 0;
  const menuKoglCprgtTypeCd = menuInfo?.menuKoglCprgtTypeCd ?? '4';
  const contactDepNm = menuInfo?.menuTkcgDeptNm ?? null;
  const contactPersonNm = menuInfo?.menuPicFlnm ?? null;
  const contactPhoneNum = menuInfo?.encptPicTelno ?? null;

  // Lnb 랜더링용
  const currentUrl = location.pathname;

  useEffect(() => {
    dispatch(getCms({ contsSn: 'durunder01' }));
  }, [dispatch]);

  if(error) return <>에러!</>

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">

          {/* Lnb 영역 */}
          <Box className="lnb-wrap">
            <Box className="lnb-menu">
              <Typography component="h2" className="lnb-tit">
                <span>{t('menuDur')}</span>
              </Typography>
              <Box className="lnb-list">
                <Lnb currentUrl={currentUrl}/>
              </Box>
            </Box>
          </Box>

          {/* 컨텐츠 본문 영역 */}
          <Box className="sub-content">
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
              {/* --- 본문 시작 --- */}

                {
                  loading
                  ? <>loading...</>
                  :  <div dangerouslySetInnerHTML={{ __html: current?.contsCn ?? 'DUR이해 컨텐츠 미존재' }}></div>
                }

                {/* 공공(KOGL) 저작물 */}
                <KoglLicense menuKoglCprgtTypeCd={menuKoglCprgtTypeCd} />

                {/* 만족도 조사 */}
                <DgstfnExnm menuSn={menuSn} />

                {/* 업무 담당 부서 및 연락처 */}
                <ContactArea
                  contactDepNm={contactDepNm}
                  contactPersonNm={contactPersonNm}
                  contactPhoneNum={contactPhoneNum}
                />

              {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
