/**
 * 화면ID: 모든 국문 CMS 화면 보기용 템플릿 화면
 * 화면명: 모든 국문 CMS 화면 보기용 템플릿 화면
 * 화면경로: /pp/ko/cms/CmsPage
 * 화면설명: 모든 국문 CMS 화면 보기용 템플릿 화면
 */
import DOMPurify from 'dompurify';
import React, { useEffect, useRef } from 'react';
import { Box, Typography, Link, Button} from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import KakaoRoughMap from '@/components/common/KakaoRoughMap';
import Lnb from '@/components/common/Lnb';
import KoglLicense from '@/components/common/KoglLicense';
import { useParams, useLocation } from 'react-router-dom';
import ContactArea from '@/components/common/ContactArea';
import { useAuth } from '@/contexts/AuthContext';
import DgstfnExnm from '@/components/common/DgstfnExnm';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCms } from '@/features/cms/CmsThunks';
import CleanHtml from '@/components/common/CleanHtml';
import LnbSectionTitle from '@/components/common/LnbSectionTitle';

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

  /** CMS 본문 컨테이너 ref - dangerouslySetInnerHTML 렌더 후 .map div에 KakaoRoughMap 마운트용 */
  const contentRef = useRef<HTMLDivElement>(null);

  // CMS 식별키(콘텐츠일련번호, contsSn) 추출 (예: /pp/ko/cms/CmsPage/cms001 에서 cms001)
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

  /** HTML 본문에 <div class="map">가 있으면 그 안에 KakaoRoughMap 마운트 (오시는 길 등) */
  useEffect(() => {
    if (!current?.contsCn) return;

    const timer = setTimeout(() => {
      const container = contentRef.current;
      if (!container) return;

      // class에 "kakao-map-placeholder" 이 있는 div 에 별도 React Root 를 생성하고 여기에 KakaoRoughMap 마운트
      const mapEl = container.querySelector('.kakao-map-placeholder');
      if (!mapEl) return;

      const el = mapEl as HTMLElement;
      el.innerHTML = '';

      const iframe = document.createElement('iframe');
      iframe.src = `${import.meta.env.BASE_URL}kakao-roughmap.html`;
      iframe.title = '오시는 길 지도';
      iframe.style.width = '100%';
      iframe.style.maxWidth = '640px';
      iframe.style.height = '360px';
      iframe.style.border = '0';
      iframe.loading = 'lazy';
  
      el.appendChild(iframe);
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [current?.contsCn]);

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">

          {/* Lnb 영역 */}
          <Box className="lnb-wrap">
            <Box className="lnb-menu">
              <Typography component="h2" className="lnb-tit">
                <LnbSectionTitle />
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

                {/* <CleanHtml html={current?.contsCn} loading={false} /> */}
                <div ref={contentRef} dangerouslySetInnerHTML={{ __html: current?.contsCn ?? '' }} />

                {/* 공공(KOGL) 저작물 */}
                {menuKoglCprgtTypeCd && (
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
