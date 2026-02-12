import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../ScreenShell';

export default function KIDS_PP_US_IN_08() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '핵심서비스 이행표준' 
    },
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-IN-08" title="핵심서비스 이행표준" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>핵심서비스 이행표준</span>
                </Typography>
                <Box className="lnb-list">
                  <Lnb items={sideItems} />
                </Box>
              </Box>
            </Box>

            {/* 컨텐츠 본문 영역 */}
            <Box className="sub-content">
              <DepsLocation />
              <Box className="content-view" id="content">
                <Box className="page-content">
                {/* --- 본문 시작 --- */}

                  <section className="pageCont-ServiceStandard">
                    <div className="category-link-tabs" aria-label="카테고리 이동">
                      <ul className="tabs-list" role="tablist">
                        <li className="tab-item"><a href="/cms/CmsPage/" className="tab-link">고객헌장</a></li>
                        <li className="tab-item"><a href="/cms/CmsPage/" className="tab-link active" aria-current="page">핵심서비스 이행표준</a></li>
                        <li className="tab-item"><a href="/cms/CmsPage/" className="tab-link">고객응대 서비스 이행표준</a></li>
                      </ul>
                    </div>
                    <h3 className="section-title">핵심서비스 이행표준</h3>
                    <div className="section-desc sec01">
                      <dl className="standard-list">
                        <dt>1. 신뢰할 수 있는 의약품등 안전관리</dt>
                        <dd>
                          <p className="bullet-text">대국민 의약품안정보시스템을 99%이상의 가동률로 안정적으로 이용할 수 있도록 하겠습니다.</p>
                          <p className="bullet-text">의약품 부작용 보고 원시자료의제공 승인 이후 30일 이내에 제공하겠습니다.</p>
                          <p className="bullet-text">마약류통합관리시스템의 무중단운영 원칙을 준수하며, 시스템장애 발생을 최소화하겠습니다.</p>
                        </dd>
                      </dl>
                      <dl className="standard-list">
                        <dt>2. 실효성 높은 의약품등 안전정보 제공</dt>
                        <dd>
                          <p className="bullet-text">대국민 의약품안정보시스템을 99%이상의 가동률로 안정적으로 이용할 수 있도록 하겠습니다.</p>
                          <p className="bullet-text">의약품 부작용 보고 원시자료의제공 승인 이후 30일 이내에 제공하겠습니다.</p>
                          <p className="bullet-text">마약류통합관리시스템의 무중단운영 원칙을 준수하며, 시스템장애 발생을 최소화하겠습니다.</p>
                        </dd>
                      </dl>
                      <dl className="standard-list">
                        <dt>3. 고객 중심의 업무 개선</dt>
                        <dd>
                          <p className="bullet-text">피해구제 신청인의 편의성 제고를위하여 진료기록부 제출 서류 항목을 3종으로 간소화하겠습니다.</p>
                          <p className="bullet-text">의약품 안전 사용의 인식제고를 위해 홍보물 등을 지속적으로 배포하여 의약품 안전사용 환경을 구축하는데 기여하겠습니다.</p>
                          <p className="bullet-text">년간 50회 이상의 모니터링을 통하여 변경된 허가 사항이 반영된 최신 DUR(의약품 적정 사용) 정보를 제공하겠습니다.</p>
                          <p className="bullet-text">마약류통합관리시스템 사용자의 편의성을 위하여 년 4회 이상 시스템 기능 개선을 추진 및 반영하겠습니다.</p>
                        </dd>
                      </dl>
                      <dl className="standard-list">
                        <dt>4. 국민 건강 증진 기여</dt>
                        <dd>
                          <p className="bullet-text">다양한 홍보 콘텐츠 및 매체를 활용하여 의약품부작용피해구제제도의 대 국민 인지도를 제고하겠습니다.</p>
                          <p className="bullet-text">약물역학조사 대상의 약물 성분을 100개 이상으로 확대하여 안전한 의약품을 사용할 수 있는 정보를 제공하겠습니다</p>
                        </dd>
                      </dl>
                    </div>
                  </section>

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
