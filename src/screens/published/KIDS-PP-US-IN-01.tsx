import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../ScreenShell';

export default function KIDS_PP_US_IN_01() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '기관장 인사말' 
    },
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-IN-01" title="기관장 인사말" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>기관장 인사말</span>
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

                  <section className="pageCont-AboutGreeting">
                    <p className="intro-message"><span>‘한국의약품안전관리원 누리집’ </span>방문을 진심으로 환영합니다.</p>
                    <div className="greeting-content-box">
                      <div className="ceo-img"><img src="/img/cms/aboutGreeting_img01.png" alt="한국의약품안전관리원장 손수정" /></div>
                      <div className="greeting-article">
                        <p className="txt1 mb24">안녕하십니까?<br/>한국의약품안전관리원장 손수정입니다.</p>
                        <p className="mb24">
                          한국의약품안전관리원은 <br/>
                          식품의약품안전처 산하 공공기관으로<br/>
                          국민들이 안심하고, 우수하고 안전한 의약품을 사용할 수 있도록 <br/>
                          과학적 의약품 안전관리 정보를 제공하는 전문기관입니다.
                        </p>
                        <p className="mb24">
                          코로나19 이후 건강한 삶에 대한 국민적 관심과 기대가 지속적으로 증가하고 있으며,
                          전 세계적으로 AI·디지털 등을 활용한 첨단과학기술의 개발이 가속화되면서
                          의약품 안전관리에도 새로운 미래를 선도하는 혁신적 변화가 요구되고 있습니다.
                        </p>
                        <p className="mb24">
                          한국의약품안전관리원은 의약품 안전정보 수집ㆍ분석ㆍ평가, 의약품 부작용 피해 구제,
                          마약류통합관리 시스템 및 첨단바이오의약품 장기추적조사시스템 운영 등의 
                          주요 업무를 다섯 가지 핵심가치 ‘FIRST - 국민 우선(First), 혁신 추구(Innovation),
                          협력 소통(Relationship), 전문성(Speciality), 신뢰제고(Trust)‘에 역점을 두고 
                          국민에게 신뢰받는 기관으로 한걸음 더 성장할 수 있도록 힘쓰겠습니다.
                        </p>
                        <p className="mb24">
                          한국의약품안전관리원은 항상 열린 마음으로 <br/>
                          국민 여러분의 목소리를 적극 경청하고 소통하며 함께 하겠습니다.
                        </p>   
                        <p>감사합니다.</p>
                        <p className="signature">한국의약품안전관리원장 <span className="name">손수정</span></p>
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
