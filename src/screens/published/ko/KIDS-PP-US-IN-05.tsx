import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../../ScreenShell';

export default function KIDS_PP_US_IN_05() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '조직도' 
    },
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-IN-05" title="조직도" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>조직도</span>
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

                 <section className="pageCont-AboutOrg">
                  <div className="org-tree">
                    <div className="org-top-section">
                      <div className="node-boss">원장</div>
                      
                      <div className="board-audit-group">
                        <div className="node-board">이사회</div>
                        <div className="node-audit">감사팀</div>
                      </div>
                    </div>

                    <div className="org-division-row">
                      <div className="division-column">
                        <div className="division-header">기획경영본부</div>
                        <div className="team-container">
                          <ul className="team-list">
                            <li className="team-item">전략기획팀</li>
                            <li className="team-item">혁신경영팀</li>
                            <li className="team-item">교육홍보팀</li>
                            <li className="team-item">정보화팀</li>
                            <li className="team-item">의약품통합정보관리팀</li>
                          </ul>
                        </div>
                      </div>

                      <div className="division-column">
                        <div className="division-header">의약품안전정보본부</div>
                        <div className="team-container">
                          <ul className="team-list">
                            <li className="team-item">안전정보관리팀</li>
                            <li className="team-item">약물역학빅데이터팀</li>
                            <li className="team-item">DUR정보팀</li>
                          </ul>
                        </div>
                      </div>

                      <div className="division-column">
                        <div className="division-header">의약품안전조사본부</div>
                        <div className="team-container">
                          <ul className="team-list">
                            <li className="team-item">의약품부작용피해구제팀</li>
                            <li className="team-item">첨단바이오규제과학팀</li>
                            <li className="team-item">임상시험안전지원팀</li>
                          </ul>
                        </div>
                      </div>

                      <div className="division-column">
                        <div className="division-header">마약류통합정보관리본부</div>
                        <div className="team-container">
                          <ul className="team-list">
                            <li className="team-item">마약류시스템운영팀</li>
                            <li className="team-item">마약류제도지원팀</li>
                            <li className="team-item">마약류정보분석팀</li>
                          </ul>
                        </div>
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
