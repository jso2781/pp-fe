import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../ScreenShell';

export default function KIDS_PP_US_IN_04() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '비전 및 목표' 
    },
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-IN-04" title="비전 및 목표" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>비전 및 목표</span>
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

                 <section className="pageCont-AboutVision">
                  <h3 className="section-title">미션과 비전</h3>
                  <div className="section-mission-vision">
                    <div className="goal-box type-mission">
                      <div className="goal-head">
                        <div className="head-label">
                          <span className="label-kor">미션</span>
                          <span className="label-eng">MISSION</span>
                        </div>
                      </div>
                      <div className="goal-body">
                        <div className="goal-content">
                          의약품 안전관리를 통한<span className="text-highlight">“국민건강 증진”</span>
                        </div>
                      </div>
                    </div>
                    <div className="goal-box type-vision">
                      <div className="goal-head">
                        <div className="head-label">
                          <span className="label-kor">비전</span>
                          <span className="label-eng">VISION</span>
                        </div>
                      </div>
                      <div className="goal-body">
                        <div className="goal-content">
                          <span className="text-highlight">국민의 안전한 의약품 사용을 선도</span>하는 전문기관
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="section-title">핵심가치</h3>
                  <div className="img-switcher">
                    <img src="/img/aboutVision_img01.png" alt="핵심가치 5대 요소 도식화" className="responsive-img pc-only"/>
                    <img src="/img/aboutVision_img01_m.png"  alt="" aria-hidden="true" className="responsive-img mo-only"/>
                  </div>
                  <div className="sr-only">
                      <ul>
                        <li>First: 국민우선</li>
                        <li>Innovation: 혁신추구</li>
                        <li>Relationship: 협력소통</li>
                        <li>Speciality: 전문성</li>
                        <li>Trust: 신뢰제고</li>
                      </ul>
                  </div>
                  <h3 className="section-title">전략목표 및 전략과제</h3>
                  <div className="strategic-system">
                    <div className="strategic-target-area">
                      <h4 className="target-title">4대 전략목표</h4>
                      <ul className="target-list">
                        <li>의약품<br />안전관리 체계<br />선진화</li>
                        <li>환자중심<br />의약품 안전관리<br />수준 향상</li>
                        <li>마약류 오남용<br />예방체계 강화</li>
                        <li>의약품<br />안전관리<br />미래선도</li>
                      </ul>
                    </div>
                    <div className="strategic-task-area">
                      <h4 className="task-title">12대 전략과제</h4>
                      <ul className="task-list">
                        <li>국제표준에<br />맞는 약물<br />감시 고도화</li>
                        <li>의약품 부작용<br />피해구제 사회<br />안전망 강화</li>
                        <li>마약류 안전관리<br />인프라 개선</li>
                        <li>의약품 안전관리<br />전문인력 양성 및<br />인식제고</li>
                        <li>능동적 의약품<br />부작용 관리<br />체계 구축</li>
                        <li>첨단<br />바이오 의약품<br />규제과학 선진화</li>
                        <li>마약류 빅데이터<br />활용제고</li>
                        <li>의약품통합정보관리<br />고도화</li>
                        <li>사각지대 없는<br />의약품 안전사용<br />정보제공</li>
                        <li>환자중심<br />안전 관리<br />체계 운영</li>
                        <li>마약류 오남용<br />예방 인식 확산</li>
                        <li>미래중심<br />혁신경영 구현</li>
                      </ul>
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
