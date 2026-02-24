import React, { useMemo, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../../ScreenShell';

export default function KIDS_PP_US_NO_14() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/',  
      label: '국민신문고' 
    },
  ], []);


  return (
    <ScreenShell screenId="KIDS-PP-US-NO-14" title="국민신문고" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>국민신문고</span>
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

                  <section className="pageCont-NewsPetition">
                    <div className="info-summary-box">
                      <h3 className="info-summary-box__title">국민신문고는?</h3>
                      <div className="info-summary-box__desc">
                        <p>정부에 대한 민원 · 제안 · 참여 · 부패 · 공익신고, 행정심판 등을 인터넷으로 간편하게 신청하고 처리하는 <span className="fw-700">범정부
                          대표 온라인 소통 창구</span>로, 모든 행정기관(중앙 · 지자체 · 교육청 · 해외공관), 사법부, 주요 공공기관과 연결되어 <span className="fw-700">원-스톱 서비스를 제공</span>합니다.</p>
                      </div>
                    </div> 

                    <h3 className="section-title">한국의약품안전관리원에서는</h3>
                    <div className="section-desc">
                      <p>국민 여러분의 다양한 의견을 보다 가까이에서 듣고자 합니다. 한국의약품안전관리원에 의견을 주실 내용은 국민신문고를 통해서 접수 하실 수 있습니다.(실명인증 필요)</p>
                    </div>
                    <div className="blank-link-box">
                      <div className="text-group">
                        <p className="title">국민신문고 홈페이지로 이동</p>
                        <p className="desc">https://www.epeople.go.kr 로 이동하며 새창으로 이동됩니다.</p>
                      </div>
                      <div className="btn-action">
                        <a 
                            href="https://www.epeople.go.kr" 
                            className="btn_default" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            title="국민신문고 바로가기(새 창 열림)"
                          >
                            국민신문고 바로가기
                            <span className="ico-link" aria-hidden="true"></span>
                            <span className="sr-only">(새 창 열림)</span>
                          </a>
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
