import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../ScreenShell';

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
                            <li className="team-.org-tree {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .org-top-section {
    display: flex;
    align-items: flex-start; 
    gap: 34px;
    margin-bottom: 118px;
    padding-left: 211px; 
    position: relative;

    @media (max-width: 900px) {
      flex-direction: column;
      align-items: center;
      padding-left: 0;
      margin-bottom: 40px;
      gap: 16px;
      width: 100%; // 상단 섹션 전체 너비 사용
    }

    .node-boss {
      width: 202px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background: #087C80;
      color: #fff;
      font-weight: 700;
      font-size: 20px;
      position: relative; 

      @media (max-width: 900px) {
        width: 100%; // 900 이하에서 너비 100%
      }

      // [라인] 원장에서 이사회로 가는 가로선
      &::after {
        content: "";
        position: absolute;
        right: -34px; 
        top: 50%;
        width: 34px;
        height: 1px;
        background-color: #8A949E;
        @media (max-width: 900px) { display: none; } // 라인 제거
      }

      // [라인] 원장에서 아래로 내려가는 세로선 시작
      &::before {
        content: "";
        position: absolute;
        bottom: -175px; 
        left: 50%;
        width: 1px;
        height: 175px;
        background-color: #8A949E;
        @media (max-width: 900px) { display: none; } // 라인 제거
      }
    }

    .board-audit-group {
      display: flex;
      flex-direction: column;
      gap: 56px;
      align-items: flex-start;
      position: relative;

      @media (max-width: 900px) {
        align-items: center;
        gap: 16px;
        width: 100%; // 그룹 전체 너비 100%
      }

      .node-board {
        width: 202px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        border: 2px solid #229C91;
        color: #229C91;
        font-weight: 700;
        font-size: 18px;
        box-sizing: border-box;

        @media (max-width: 900px) {
          width: 100%; // 900 이하에서 너비 100%
        }
      }

      .node-audit {
        width: 202px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        border: 2px solid #229C91;
        color: #229C91;
        font-weight: 700;
        font-size: 18px;
        box-sizing: border-box;
        position: relative;

        @media (max-width: 900px) {
          width: 100%; // 900 이하에서 너비 100%
        }

        // [라인] 감사팀으로 뻗어 들어가는 짧은 가로선
        &::before {
          content: "";
          position: absolute;
          left: -135px;
          top: 50%;
          width: 135px;
          height: 1px;
          background-color: #8A949E;
          @media (max-width: 900px) { display: none; } // 라인 제거
        }
      }
    }
  }

  .org-division-row {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    width: 100%;
    align-items: stretch;

    @media (max-width: 900px) {
      flex-direction: column;
      align-items: center;
      gap: 30px;
    }

    // [라인] 본부들을 가로로 잇는 긴 수평선
    &::before {
      content: "";
      position: absolute;
      top: -46px;
      left: 11.2%; 
      right: 12.1%; 
      height: 1px;
      background-color: #8A949E;

      @media (max-width: 1200px) { left: 11.8%; right: 11.8%; }
      @media (max-width: 960px) { left: 11.2%; right: 12.0%; }
      @media (max-width: 900px) { display: none; } // 라인 제거
    }

    .division-column {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;

      @media (max-width: 900px) {
        width: 100%;
      }

      // [라인] 수평선에서 각 본부 헤더로 내려오는 짧은 세로선
      &::before {
        content: "";
        position: absolute;
        top: -46px;
        left: 50%;
        width: 1px;
        height: 46px;
        background-color: #8A949E;
        @media (max-width: 900px) { display: none; } // 라인 제거
      }

      .division-header {
        padding: 14px;
        border-radius: 8px;
        background: #4D99A0;
        color: #fff;
        text-align: center;
        font-size: 18px;
        font-weight: 700;
      }

      .team-container {
        flex: 1;
        border-radius: 8px;
        border: 1px solid #D8D8D8;
        padding: 16px;
        background: #fff;

        .team-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;

          .team-item {
            font-size: 16px;
            display: flex;
            align-items: center;

            &::before {
              content: "";
              display: inline-block;
              width: 4px;
              height: 4px;
              background-color: #1E2124;
              border-radius: 50%;
              margin-right: 8px;
              flex-shrink: 0;
            }
          }
        }
      }
    }
  }
}eam-item">약물역학빅데이터팀</li>
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
