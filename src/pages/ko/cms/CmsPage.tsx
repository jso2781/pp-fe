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

  // none,blcok 탭
  useEffect(() => {
    const injectTabEvents = () => {
      // 1. 컨텐츠 영역 안에서 탭과 섹션을 찾습니다.
      const contentArea = document.getElementById('content');
      if (!contentArea) return;

      const tabs = contentArea.querySelectorAll('.category-link-tabs .tab-link');
      const sections = contentArea.querySelectorAll('section');

      if (tabs.length === 0 || sections.length === 0) return;

      // 2. 초기 상태 설정 (첫 번째 섹션만 보이게)
      sections.forEach((sec, idx) => {
        if (sec instanceof HTMLElement) {
          sec.style.display = idx === 0 ? 'block' : 'none';
        }
      });

      // 3. 각 탭에 클릭 이벤트 부여
      tabs.forEach((tab, index) => {
        const tabBtn = tab as HTMLElement;
        
        // 중복 방지를 위해 기존 onclick 제거 후 새로 할당
        tabBtn.onclick = (e) => {
          e.preventDefault();

          // 모든 탭 active 제거 및 현재 탭 추가
          tabs.forEach(t => t.classList.remove('active'));
          tabBtn.classList.add('active');

          // 모든 섹션 숨기고 해당 인덱스 섹션만 표시
          sections.forEach((sec, idx) => {
            if (sec instanceof HTMLElement) {
              sec.style.display = idx === index ? 'block' : 'none';
            }
          });
        };
      });
    };

    // [실행 1] 페이지 로드 시 즉시 실행
    injectTabEvents();

    // [실행 2] MutationObserver: #content 내부 HTML이 바뀌는 순간(CMS 로드) 감지
    const observer = new MutationObserver(() => {
      injectTabEvents();
    });

    const targetNode = document.getElementById('content');
    if (targetNode) {
      observer.observe(targetNode, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, []);

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
