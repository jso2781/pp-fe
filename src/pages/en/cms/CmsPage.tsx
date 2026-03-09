/**
 * 화면ID: 모든 영문 CMS 화면 보기용 템플릿 화면
 * 화면명: 모든 영문 CMS 화면 보기용 템플릿 화면
 * 화면경로: /pp/en/cms/CmsPage
 * 화면설명: 모든 영문 CMS 화면 보기용 템플릿 화면
 */
import DOMPurify from 'dompurify';
import React, { useEffect, useMemo } from 'react';
import { Box, Typography, Link, Button} from '@mui/material';
import KoglLicense from '@/components/common/KoglLicense';
import { useParams, useLocation } from 'react-router-dom';
import ContactArea from '@/components/common/ContactArea';
import { useAuth } from '@/contexts/AuthContext';
import DgstfnExnm from '@/components/common/DgstfnExnm';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCms } from '@/features/cms/CmsThunks';
import CleanHtml from '@/components/common/CleanHtml';
import EngDepsLocation from '@/components/common/EngDepsLocation';
import EngLnbSectionTitle from '@/components/common/EngLnbSectionTitle';
import EngLnb from '@/components/common/EngLnb';

export default function CmsPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { current } = useAppSelector((s) => s.cms)
  // const cleanHtml = DOMPurify.sanitize(current?.contsCn ?? '');
  // console.log('CmsPage cms cleanHtml=', cleanHtml);

  const { getMenuInfo } = useAuth();
  const menuInfo = getMenuInfo(location.pathname);

  /** 개인정보포함여부 */
  const prvcInclYn = menuInfo?.prvcInclYn ?? null;

  /** 만족도조사여부 */
  const dgstfnExmnYn = menuInfo?.dgstfnExmnYn ?? null;

  /** 메뉴노출여부 */
  const menuExpsrYn = menuInfo?.menuExpsrYn ?? null;

  /** 부서정보노출여부 */
  const deptInfoExpsrYn = menuInfo?.deptInfoExpsrYn ?? null;

  /** 담당자정보노출여부 */
  const picInfoExpsrYn = menuInfo?.picInfoExpsrYn ?? null;

  /** 메뉴공공누리저작권유형코드 */
  const menuKoglCprgtTypeCd = menuInfo?.menuKoglCprgtTypeCd ?? null;

  const menuSn = menuInfo?.menuSn ?? null;
  const contactDepNm = menuInfo?.menuTkcgDeptNm ?? null;
  const contactPersonNm = menuInfo?.menuPicFlnm ?? null;
  const contactPhoneNum = menuInfo?.encptPicTelno ?? null;

  // CMS 식별키(콘텐츠일련번호, contsSn) 추출 (예: /pp/en/cms/CmsPage/cms001 에서 cms001)
  const { contsSn } = useParams<{ contsSn: string }>();

  // Lnb 랜더링용
  const currentUrl = location.pathname;

  useEffect(() => {
    if (contsSn) dispatch(getCms({contsSn}))
  }, [dispatch, contsSn])

  // 앵커 탭
  useEffect(() => {
    const handleAnchorScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('.category-anchor-tabs .tab-link') as HTMLAnchorElement | null;
      
      if (!link) return;

      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault(); 

          const tabContainer = link.closest('.category-anchor-tabs');
          if (tabContainer) {
            const allTabs = tabContainer.querySelectorAll('.tab-link');
            
            allTabs.forEach((tab) => {
              tab.classList.remove('active');
              tab.setAttribute('aria-selected', 'false');
            });

            link.classList.add('active');
            link.setAttribute('aria-selected', 'true');
          }

          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };
    document.addEventListener('click', handleAnchorScroll);
    return () => {
      document.removeEventListener('click', handleAnchorScroll);
    };
  }, []);


  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">

          {/* Lnb 영역 */}
          <Box className="lnb-wrap">
            <Box className="lnb-menu">
              <Typography component="h2" className="lnb-tit">
                <EngLnbSectionTitle />
              </Typography>
              <Box className="lnb-list">
                <EngLnb currentUrl={currentUrl}/>
              </Box>
            </Box>
          </Box>

          {/* 컨텐츠 본문 영역 */}
          <Box className="sub-content">
            <EngDepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
                {/* --- 본문 시작 --- */}

                {/* <CleanHtml html={current?.contsCn} loading={false} /> */}
                {<div dangerouslySetInnerHTML={{ __html: current?.contsCn ?? '' }}></div>  }

                {/* 공공(KOGL) 저작물 */}
                {menuKoglCprgtTypeCd && menuKoglCprgtTypeCd?.trim() !== '' && (
                  <KoglLicense menuKoglCprgtTypeCd={menuKoglCprgtTypeCd} />
                )}

                {/* 만족도 조사 */}
                {dgstfnExmnYn && (
                  <DgstfnExnm menuSn={menuSn} />
                )}

                {/* 업무 담당 부서 및 연락처 */}
                {deptInfoExpsrYn && (
                  <ContactArea
                    contactDepNm={contactDepNm}
                    contactPersonNm={contactPersonNm}
                    contactPhoneNum={contactPhoneNum}
                  />
                )}

                {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
