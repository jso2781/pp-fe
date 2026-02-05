import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../ScreenShell';

export default function KIDS_PP_US_PI_11() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '의약품부작용보고원시자료' 
    },
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-PI-11" title="의약품부작용보고원시자료" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>의약품부작용보고원시자료</span>
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

                  <section className="pageCont-OriReport">
                    <div className="box-type-2">
                      <p className="txt-icon-1 fw-500">이상사례·약물이상반응 중 다음 각 항목의 어느 하나에 해당하는 경우를 말합니다.</p>
                    </div>
                     <div className="mb30"></div>
                    <div className="info-summary-box">
                      <h3 className="info-summary-box__title">의약품이상사례보고시스템(KAERS)이란?</h3>
                      <div className="info-summary-box__desc">
                        <p>의약품등 투여 후 이상사례(부작용)가 발생하였을 때 이에 대한 <span className="fw-700">정보를 보고 및 관리할 수 있는 시스템</span>을 의미합니다.</p>
                        <p>한국의약품안전관리원은 KAERS로 수집된 이상사례(부작용)정보를 활용하여 <span className="fw-700">실마리정보 탐색 · 평가 및 안전성 정보 생산 · 제공하는 업무를 수행</span>하고 있습니다.</p>
                        <p>KAERS database는 국제 약물감시 프로그램과 호환되며 주기적으로 세계보건기구-약물부작용모니터링센터(웁살라모니터링센터)로 전송됩니다.</p>
                      </div>
                    </div> 

                    <h3 className="section-title">의약품부작용보고원시자료 제공범위</h3>  
                    <ul className="list-bullet-2">
                        <li>본 자료는 「개인정보보호법」에 의거하여 개인정보에 해당하는 사항은 포함되어 있지 않습니다.</li>
                        <li>개별 보고서를 식별하기 위한 고유번호는 난수화하여 제공되며, 이를 활용하여 테이블 간 연계가 가능합니다.</li>
                    </ul>

                    <h3 className="section-title">의약품부작용보고원시자료 요청자격</h3>  
                    <dl className="list-definition">
                      <dt>연구/의료/공공기관</dt>
                      <dd>
                        <p>1) ‘대학 등 연구기관 및 의료기관(지역센터 등)’에서 의약품안전관리를 위한 목적으로 활용하고자 하는 경우</p>
                        <p>2) ‘국가 및 공공기관’에서 보건의료분야의 국민건강 증진을 위한 업무를 위해 특별히 요청하는 경우</p>
                        <p>※ 공공기관: 「공공기관의 정보공개에 관한 –법률」 제2조제3호에 따른 1) 국가기관, 2) 지방자치단체,</p>
                        <p>3) 「공공기관의 운영에 관한 법률」 제2조에 따른 공공기관, 4) 그 밖에 대통령령으로 정하는 기관</p>
                      </dd>
                    </dl>
                    <dl className="list-definition">
                      <dt>제조·수입업체</dt>
                      <dd>
                        <p>1) ‘안전관리책임자’가 해당 제조(수입)품목에 대한 자료를 요청하는 경우</p>
                        <p>2) ’안전관리책임자’가 ’타사 허가품목권자’에게 제공 동의를 받은 품목에 대한 자료를 요청하는 경우</p>
                      </dd>
                    </dl>
                    
                    
                    
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
