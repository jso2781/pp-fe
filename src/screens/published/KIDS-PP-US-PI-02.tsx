import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../ScreenShell';

export default function KIDS_PP_US_PI_02() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: 'KAERS란?' 
    },
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-PI-02" title="KAERS란?" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>KAERS란?</span>
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

                  <section className="pageCont-AdverseKaers">
                    <div className="info-summary-box">
                      <h3 className="info-summary-box__title">의약품이상사례보고시스템(KAERS)이란?</h3>
                      <div className="info-summary-box__desc">
                        <p>의약품등 투여 후 이상사례(부작용)가 발생하였을 때 이에 대한 <span className="fw-700">정보를 보고 및 관리할 수 있는 시스템</span>을 의미합니다.</p>
                        <p>한국의약품안전관리원은 KAERS로 수집된 이상사례(부작용)정보를 활용하여 <span className="fw-700">실마리정보 탐색 · 평가 및 안전성 정보 생산 · 제공하는 업무를 수행</span>하고 있습니다.</p>
                        <p>KAERS database는 국제 약물감시 프로그램과 호환되며 주기적으로 세계보건기구-약물부작용모니터링센터(웁살라모니터링센터)로 전송됩니다.</p>
                      </div>
                    </div> 

                    <div className="img-switcher">
                      {/* PC용 이미지 */}
                      <img src="/img/adverseKaers_img01.png" alt="의약품이상사례보고시스템 (PC)" className="responsive-img pc-only"/>
                      {/* 모바일용 이미지 */}
                      <img src="/img/adverseKaers_img01_m.png"  alt="의약품이상사례보고시스템 (모바일)" className="responsive-img mo-only"/>
                    </div>
                    <div className="sr-only">
                      KAERS 한국의약품안전관리원
                      A 일반인(소비자) 의약품을 복용한 후 이상사례(부작용) 경험이 있는 분이라면 누구나 KAERS의 ‘일반인보고’ 화면을 통해 보고 가능합니다.
                      B 의약전문가 의약전문가는 일반인의 의약품 이상사례에 대하여 KAERS의 ‘전자보고 국내외이상사례 보고’를 통하여 보고가능합니다.
                      C 지역의약품안전센터 지역센터는 원내외에서 수집된 의약품 이상사례의 인과 관계를 평가하며 KAERS를 통하여 보고 가능합니다.
                      D 제조/수입업체 의약품을 제조 또는 수입하는 기업은 의약품 이상사례가 확인되면 KAERS의 ‘전자보고 국내외이상사례 보고’를 통하여 보고 가능합니다.
                      E 웁살라모니터링센터 한국의약품안전관리원은 KAERS의 이상사례 정보를 ICH-E2B포맷(XML파일)으로 전환하여 주기적으로 웁살라모니터링 센터에 제공합니다.
                      F식품의약품안전처 의약품을 복용한 후 이상사례(부작용) 경험이 있는 분이라면 누구나 KAERS의 ‘일반인보고’ 화면을 통해 보고 가능합니다.
                    </div> 

                    <div className="mb40"></div>

                    <div className="box-type-1">
                      <ul className="list-bullet-2">
                        <li>의약품이상사례는 전화, 온라인 등 다양한 방법을 통하여 한국의약품안전관리원으로 보고가능하며, 접수된 정보는 모두 KAERS에서 관리됩니다. 다만, 필수정보 4가지(이상사례(부작용) 정보, 의심되는 의약품등 정보, 환자 정보, 보고자   정보)가 항상 충족되어야 KAERS에 접수 가능합니다.</li>
                        <li>지역의약품안전센터란 한국의약품안전관리원에서 의약품 이상사례 수집 및 모니터링을 위하여 전국 거점별로 지정한 병원 또는 기관을 의미합니다.</li>
                        <li className="txt-4">상세한 정보는 의약품안전나라 의약품통합정보시스템을 통해 확인하실 수 있습니다.</li>
                        <li>
                          <a 
                            href="https://nedrug.mfds.go.kr/index" 
                            className="fw-700 underline" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            title="바로가기(새 창 열림)"
                          >
                            의약품안전나라 바로가기
                            <span className="ico-link" aria-hidden="true"></span>
                            <span className="sr-only">(새 창 열림)</span>
                          </a>
                        </li>
                    </ul>
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
