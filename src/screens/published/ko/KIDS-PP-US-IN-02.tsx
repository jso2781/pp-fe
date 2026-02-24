import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../../ScreenShell';

export default function KIDS_PP_US_IN_02() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '역대 기관장' 
    },
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-IN-02" title="역대 기관장" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>역대 기관장</span>
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

                  <section className="pageCont-AboutFormer">
                    <div className="former-list">
                      <div className="box">
                        <div className="thumbnail">
                          <img src="/img/cms/aboutForme_img01.png" alt="4대 원장 오정완" />
                        </div> 
                        <div className="former-info">
                          <p className="former-tit"><strong>오정완</strong>(4대 원장)</p>
                          <ul>
                            <li>한국규제과학센터 이사</li>
                            <li>마약류안전관리심위원회 위원</li>
                            <li>경인지방식품의약품안전청장</li>
                            <li>식품의약품안전처 과장</li>
                            <li>보건복지부 약무정책 서기관</li>
                          </ul>
                        </div>
                      </div>

                      <div className="box">
                        <div className="thumbnail">
                          <img src="/img/cms/aboutForme_img02.png" alt="3대 원장 한순영" />
                        </div>
                        <div className="former-info">
                          <p className="former-tit"><strong>한순영</strong>(3대 원장)</p>
                          <ul>
                            <li>고려대학교 약학대학 특임교수</li>
                            <li>광주·대전지방식품의약품안전청장</li>
                            <li>국립보건연구원 국가병원체자원은행장</li>
                            <li>마약류과학정보회 회장</li>
                            <li>식약처 식품의약품안전평가원 부장</li>
                          </ul>
                        </div>
                      </div>

                      <div className="box">
                        <div className="thumbnail">
                          <img src="/img/cms/aboutForme_img03.png" alt="2대 원장 구본기" />
                        </div>
                        <div className="former-info">
                          <p className="former-tit"><strong>구본기</strong>(2대 원장)</p>
                          <ul>
                            <li>병원약학교육연구원 원장</li>
                            <li>대한약물역학위해관리학회 부회장</li>
                            <li>한국병원약사회 부회장</li>
                            <li>인제대학교 약학대학 겸임교수</li>
                            <li>인제대학교 일산백병원 약제부장</li>
                          </ul>
                        </div>
                      </div>

                      <div className="box">
                        <div className="thumbnail">
                          <img src="/img/cms/aboutForme_img04.png" alt="1대 원장 박병주" />
                        </div>
                        <div className="former-info">
                          <p className="former-tit"><strong>박병주</strong>(1대 원장)</p>
                          <ul>
                            <li>서울대학교 의과대학 명예교수</li>
                            <li>대한약물역학위해관리학회 회장</li>
                            <li>한국역학회장</li>
                            <li>대한보건협회장</li>
                            <li>대한민국 의학한림원 부원장</li>
                          </ul>
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
