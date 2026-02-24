import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../../ScreenShell';

export default function KIDS_PP_US_IN_21() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '오시는 길' 
    },
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-IN-21" title="오시는 길" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>오시는 길</span>
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

                  <section className="pageCont-AboutMap">
                    <h3 className="section-title">약도보기</h3>
                    <div className="section-desc sec01">
                      <div className="map">
                        <img src="/img/cms/aboutMap_img01.png" alt="한국의약품안전관리원 약도" className="maxw100"/>
                      </div>
                      <div className="contact-info">
                        <div className="info-item">
                          <span className="label">주소</span>
                          <span className="text">경기도 안양시 동안구 부림로 169번길 22 2층 한국의약품안전관리원</span>
                        </div>
                        <div className="info-item">
                          <span className="label">대표전화</span>
                          <span className="text">02-1644-6223</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="section-title">대중교통 안내</h3>
                    <div className="section-desc transport-info">
                      <div className="transport-item">
                        <div className="type-label">지하철</div>
                        <div className="content">
                          <div className="route-main">
                            <span className="route-tag">[4호선]</span>
                            <span className="station">평촌역 3번출구</span>
                          </div>
                          <p className="description">
                            평촌역 사거리에서 400m 직진 ▷ 수원지방법원안양지원 방향 좌회전 ▷ 산업은행 방향 우회전 ▷ 100M
                          </p>
                        </div>
                      </div>
                      <div className="transport-item">
                        <div className="type-label">버스</div>
                        <div className="content">
                          <ul className="bus-list">
                            <li><span className="bus-type">[직행]</span> 1303</li>
                            <li><span className="bus-type">[일반]</span> 6, 6-3, 22, 52, 52-1</li>
                            <li><span className="bus-type">[마을]</span> 5, 5-1, 5-5, 6, 6-1, 7, 8, 10-1</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <h3 className="section-title">승용차 안내</h3>
                    <div className="section-desc car-info">
                      <div className="car-route-item">
                        <div className="route-title">서울(강남) 방면에서 오실 때</div>
                        <div className="route-content">
                          <p>사당/양재 ▷ 과천 ▷ 정부종합청사 ▷ 인덕원사거리 ▷ 500M직진 ▷ 인덕원교에서 우회전 ▷ 1,000M직진 ▷ 이마트 사거리에서 우회전 ▷ 300M 직진 후 좌회전 ▷ 150M 직진</p>
                        </div>
                      </div>
                      <div className="car-route-item">
                        <div className="route-title">서울에서 경수산업도로 이용하여 오실 때</div>
                        <div className="route-content">
                          <p>시흥IC ▷ 대림대학 ▷ 비산사거리 ▷ 범계역 사거리에서 좌회전 ▷ 1,600M직진 ▷ 이마트 사거리에서 좌회전 ▷ 300M 직진 후 좌회전 ▷ 150M 직진</p>
                        </div>
                      </div>
                      <div className="car-route-item">
                        <div className="route-title">경부고속도로를 이용하여 오실 때</div>
                        <div className="route-content">
                          <p>판교IC ▷ (서울외곽순환고속도로)학의IC ▷ 평촌IC ▷ 200M직진 ▷ 사거리 ▷ 안양시청 이정표 방향으로 1,800M 직진(한림대성심병원 경유) ▷ 안양교육청에서 우회전 ▷ 250M직진 ▷ 산업은행 방향 좌회전 ▷ 100M 직진</p>
                        </div>
                      </div>
                      <div className="car-route-item">
                        <div className="route-title">일산, 김포공항방면에서 오실 때</div>
                        <div className="route-content">
                          <p>(서울외곽순환고속도로)산본IC ▷ 평촌IC ▷ 11시 방향으로 500M직진 ▷ 사거리 ▷ 안양시청(안양교육청)이정표 쪽으로 좌회전 ▷ 안양시청 이정표 방향으로 1,800M직진(한림대성심병원 경유) ▷ 안양교육청에서 우회전 ▷ 250M직진 ▷ 산업은행 방향 좌회전 ▷ 100M 직진</p>
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
