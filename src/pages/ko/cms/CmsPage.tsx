/**
 * 화면ID: 모든 CMS 화면 보기용 템플릿 화면
 * 화면명: 모든 CMS 화면 보기용 템플릿 화면
 * 화면경로: /cms/CmsPage
 * 화면설명: 모든 CMS 화면 보기용 템플릿 화면
 */
import DOMPurify from 'dompurify';
import React, { useEffect, useMemo } from 'react';
import { Box, Typography, Link, Button} from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import KoglLicense from '@/components/common/KoglLicense';
import { useParams } from 'react-router-dom';
import ContactArea from '@/components/common/ContactArea';
import { useAuth } from '@/contexts/AuthContext';
import DgstfnExnm from '@/components/common/DgstfnExnm';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCms } from '@/features/cms/CmsThunks';
import CleanHtml from '@/components/common/CleanHtml';

export default function CmsPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  
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

  // CMS 식별키(콘텐츠일련번호, contsSn) 추출 (예: /cms/CmsPage/cms001)
  const match = location.pathname.match(/\/cms\/CmsPage\/([^/]+)/);
  const contsSN1 = match?.[1] as string;
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

  useEffect(() => {
    // 탭 로직을 함수로 분리
    const initTabFeature = () => {
      const tabs = document.querySelectorAll('.category-link-tabs .tab-link');
      const charterSec = document.querySelector('.pageCont-AboutCharter') as HTMLElement;
      const standardSecs = document.querySelectorAll('.pageCont-ServiceStandard');
      
      const sections = [charterSec, standardSecs[0] as HTMLElement, standardSecs[1] as HTMLElement];

      // 요소가 하나라도 없으면 중단 (HTML이 아직 안 그려졌을 때 대비)
      if (tabs.length === 0 || !charterSec) return;

      // 첫 번째 섹션만 표시
      sections.forEach((sec, idx) => {
        if (sec) sec.style.display = idx === 0 ? 'block' : 'none';
      });

      const handleTabClick = (e: Event, index: number) => {
        e.preventDefault();
        tabs.forEach(t => t.classList.remove('active'));
        (e.currentTarget as HTMLElement).classList.add('active');
        sections.forEach((sec, idx) => {
          if (sec) sec.style.display = idx === index ? 'block' : 'none';
        });
      };

      // 중복 등록 방지를 위해 기존 리스너 제거 후 등록 (익명함수 이슈 해결용)
      tabs.forEach((tab, index) => {
        tab.onclick = (e) => handleTabClick(e, index);
      });
    };

    // 1. 즉시 한 번 실행
    initTabFeature();

    // 2. CMS 데이터 로드 등으로 DOM이 변하는 것을 감지 (MutationObserver)
    const observer = new MutationObserver(() => {
      initTabFeature();
    });

    // #content 영역을 관찰하여 내부 HTML이 바뀌면 탭 기능을 다시 활성화
    const contentNode = document.getElementById('content');
    if (contentNode) {
      observer.observe(contentNode, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, []); // 의존성 배열이 빈 배열이어도 Observer가 변화를 감지합니다.

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

                {/* <CleanHtml html={current?.contsCn} loading={false} /> */}
                {<div dangerouslySetInnerHTML={{ __html: current?.contsCn ?? '' }}></div>  }

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
