import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../ScreenShell';

export default function KIDS_PP_US_IN_03() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '연혁' 
    },
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-IN-03" title="연혁" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>연혁</span>
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

                 <section className="pageCont-AboutHistory">
                    <div className="history-list">
                      <div className="history-item odd">
                        <span className="year">2025</span>
                        <div className="history-desc">
                          <p><span>03.25.</span> 손수정 5대 원장 취임</p>
                          <p><span>01.01.</span> 임상시험안전지원기관 지정</p>
                        </div>
                      </div>

                      <div className="history-item even">
                        <span className="year">2024</span>
                        <div className="history-desc">
                          <p><span>03.25.</span> 식품의약품안전처 디지털 역량 최우수기관 선정</p>
                        </div>
                      </div>

                      <div className="history-item odd">
                        <span className="year">2023</span>
                        <div className="history-desc">
                          <p><span>09.14.</span> 제12회 대한민국 지식대상 행정안전부 장관상 수상</p>
                          <p><span>07.31.</span> 식품의약품안전처 경영실적평가 우수(A)등급 달성</p>
                        </div>
                      </div>

                      <div className="history-item even">
                        <span className="year">2022</span>
                        <div className="history-desc">
                          <p><span>07.21.</span> 식품의약품안전처 경영실적평가 우수(A)등급 달성</p>
                        </div>
                      </div>

                      <div className="history-item odd">
                        <span className="year">2021</span>
                        <div className="history-desc">
                          <p><span>10.25.</span> 오정완 4대 원장 취임</p>
                          <p><span>07.14.</span> 식품의약품안전처 경영실적평가 우수(A)등급 달성</p>
                        </div>
                      </div>

                      <div className="history-item even">
                        <span className="year">2020</span>
                        <div className="history-desc">
                          <p><span>09.23.</span> 첨단바이오의약품규제과학센터 지정</p>
                          <p><span>07.09.</span> 식품의약품안전처 경영실적평가 우수(A)등급 달성</p>
                          <p><span>03.16.</span> 식품의약품안전처 부패방지 시책평가 최우수 등급 달성</p>
                        </div>
                      </div>

                      <div className="history-item odd">
                        <span className="year">2019</span>
                        <div className="history-desc">
                          <p><span>12.12.</span> 의약품통합정보시스템 운영</p>
                          <p><span>11.11.</span> 식품의약품안전처 혁신경진대회 공공기관 최우수상 수상</p>
                        </div>
                      </div>

                      <div className="history-item even">
                        <span className="year">2018</span>
                        <div className="history-desc">
                          <p><span>12.03.</span> 행정안전부 2018 안전문화대상 우수기관 표창</p>
                          <p><span>07.25.</span> 한순영 3대 원장 취임</p>
                          <p><span>05.25.</span> WHO UAE 보건재단상 수상</p>
                          <p><span>05.18.</span> 마약류 취급보고 제도 시행</p>
                        </div>
                      </div>

                      <div className="history-item odd">
                        <span className="year">2017</span>
                        <div className="history-desc">
                          <p><span>08.18.</span> APEC 약물감시 전문교육훈련기관 (APEC CoE) 공식승인</p>
                        </div>
                      </div>

                      <div className="history-item even">
                        <span className="year">2016</span>
                        <div className="history-desc">
                          <p><span>09.06.</span> APEC 약물감시 전문교육훈련기관교육 (APEC CoE Pilot) 운영</p>
                        </div>
                      </div>

                      <div className="history-item odd">
                        <span className="year">2015</span>
                        <div className="history-desc">
                          <p><span>07.20.</span> 마약류통합정보관리센터 지정</p>
                          <p><span>02.13.</span> 구본기 2대 원장 취임</p>
                        </div>
                      </div>

                      <div className="history-item even">
                        <span className="year">2014</span>
                        <div className="history-desc">
                          <p><span>12.19.</span> 의약품 부작용 피해구제 시행</p>
                          <p><span>10.10.</span> 안전관리책임자 교육기관 지정</p>
                        </div>
                      </div>

                      <div className="history-item odd">
                        <span className="year">2013</span>
                        <div className="history-desc">
                          <p><span>01.31.</span> 기타공공기관 지정</p>
                        </div>
                      </div>

                      <div className="history-item even">
                        <span className="year">2012</span>
                        <div className="history-desc">
                          <p><span>11.01.</span> 의약품부작용신고센터 설치</p>
                          <p><span>10.01.</span> 의약품이상사례보고시스템 (KAERS) 구축 및 국내 이상사례 보고 수집</p>
                          <p><span>04.17.</span> 개원식 및 심포지엄 개최</p>
                          <p><span>02.06.</span> 박병주 초대 원장 취임</p>
                          <p><span>01.06.</span> 한국의약품안전관리원 설립</p>
                        </div>
                      </div>
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
