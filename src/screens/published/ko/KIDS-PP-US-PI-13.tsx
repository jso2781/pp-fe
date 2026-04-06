import React, { useMemo, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../../ScreenShell';

export default function KIDS_PP_US_PI_13() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/',  
      label: '의약품-의료정보 연계분석이란?' 
    },
  ], []);


  return (
    <ScreenShell screenId="KIDS-PP-US-PI-13" title="의약품-의료정보 연계분석이란?" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>의약품-의료정보 연계분석이란?</span>
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

                  <section className="pageCont-analysis">
                    <div className="video-area">
                      <div className="video-box">
                        {/* 제목 제공 (aria-label) */}
                        <video 
                          id="myVideo" 
                          width="886" 
                          height="502" 
                          controls
                          preload="metadata"
                          aria-label="의약품·의료정보 연계분석 영상" 
                          poster="/fe/img/analysis_video_thumbnail.png" // 미리보기 이미지 제공
                        >
                          <source src="/video/20161220marketing.mp4" type="video/mp4" />
                          <source src="/video/20161220marketing.webm" type="video/webm" />
                          {/* 자막 파일 제공 */}
                          <track 
                            kind="captions" 
                            src="20161220marketing_ko.vtt" 
                            srcLang="ko" 
                            label="한국어 자막" 
                            default 
                          />
                          {/* 비디오 미지원 브라우저용 대체 텍스트 */}
                          <div className="v-fallback">
                            <p>사용 중인 브라우저에서 비디오를 재생할 수 없습니다.</p>
                            <a href="/video/20161220marketing.mp4" download>영상 파일 다운로드</a>
                          </div>
                        </video>
                      </div>

                      {/* 비디오 스크립트 제공 */}
                      <div className="video-transcript">
                        <div className="sr-only">
                          <h3>의약품부작용 보고 원시자료 활용 안내 영상 대본</h3>
                          <p>[자막] 의약품부작용 보고 원시자료 활용 및 분석 안내</p>
                          <p>[화면 설명] 한국의약품안전관리원의 캐릭터가 등장하여 자료 활용 절차를 소개합니다.</p>
                          <p>
                            [내용] 한국의약품안전관리원에서는 의약품 안전사용 환경 조성을 위해 부작용 보고 원시자료를 공익적 목적으로 개방하고 있습니다. 
                            자료 신청은 시스템 홈페이지에서 가능하며, 이용 목적과 분석 계획서를 작성하여 제출해야 합니다.
                          </p>
                          <p>
                            [절차 안내]
                            1. 원시자료 개방 및 분석시스템 접속 후 신청서 작성
                            2. 내부 심의 및 승인 절차 진행
                            3. 승인 시 온라인 가상 분석실 또는 오프라인 분석센터를 통해 데이터 제공
                          </p>
                          <p>
                            [분석 환경] 
                            개인정보 보호를 위해 보안이 강화된 환경에서 SAS, R, STATA 등 다양한 통계 도구를 활용할 수 있습니다. 
                            분석이 완료된 결과물은 반출 심의를 거쳐 최종적으로 활용할 수 있습니다.
                          </p>
                          <p>본 자료는 국민의 안전한 의약품 사용을 위한 연구 및 정책 수립의 기초 자료로 활용됩니다.</p>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="section-title">의약품·의료정보 연계분석</h3>
                    <div className="section-desc">
                      <p>건강보험 빅데이터 등을 활용하여 안정성 이슈가 제기된 의약품에 대한 신뢰도 높은 정보를 제공할 수 있는 의약품-의료정보 연계분석에 대해 아시나요?</p>
                      <p>의약품-의료정보 연계분석을 통해 유관 기관 및 의료기관 데이터, 자발보고등에 대한 의약품 부작용 정보에 방대한 데이터를 통합 분석하여 의약품과 이상사례간의 인과관계를 확인할 수 있습니다.</p>
                      <p>이런 연계분석을 수행하기 위해서는 연구계획을 수립하고 이에 맞는 데이터를 수집합니다. 수집된 데이터를 안전하게 저장 관리하며 데이터 처리 분석 과정을 거쳐 정보를 쉽게 볼 수 있도록 시각화 작업을 진행하게 됩니다.</p>
                      <p>신뢰도 높은 안전정보를 생산함으로써 약물 사용자별 맞춤형 정보제공, 의약품 안전사고 예방, 사회경제적 비용절감 등 국민건강 향상에 기여할 수 있습니다.</p>
                      <p className="fw-700">의약품 안전망을 구축을 위한 의약품-의료정보 연계분석은 식품의약품안전처와 한국의약품안전관리원이 함께 합니다.</p>
                    </div>
                    <div className="org-list">
                      <div className="org-info-box">
                        <span className="logo"><img src="/fe/img/logo_mfds.png" alt="식품의약품안전처"/></span>
                      </div>
                      <div className="org-info-box">
                        <span className="logo"><img src="/fe/img/logo_drugsafe.png" alt="한국의약품안전관리원"/></span>
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
