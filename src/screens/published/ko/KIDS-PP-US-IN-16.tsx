import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../../ScreenShell';

export default function KIDS_PP_US_IN_16() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '캐릭터소개' 
    },
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-IN-16" title="캐릭터소개" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>캐릭터소개</span>
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

                  <section className="pageCont-AboutCharacter">
                    <h3 className="section-title">캐릭터소개</h3>
                    <div className="section-desc char-intro">
                      <div className="char-item">
                        <div className="char-img">
                          <img src="/fe/img/cms/aboutCharacter_img01.png" alt="메인 캐릭터 올슨" />
                        </div>
                        <div className="char-content">
                          <h4 className="char-name">올슨(Owl Cine)</h4>
                          <p className="char-slogan">국민의 안전한 의약품 사용을 선도하는 의약품 분야 탐정 꿈나무</p>
                          <div className="char-text">
                            <p>한국의약품안전관리원의 탐정 꿈나무로 탄생한 올슨은 부엉이 캐릭터입니다.</p>
                            <p>우리 국민의 의약품 안전사용을 위해 관련 정보를 수집·분석·관리하고 모니터링하는 KIDS.</p>
                            <p>어두운 환경에서도 사물을 정확하게 파악하는 '부엉이'의 특성에서 착안하여 우리기관의 캐릭터로 탄생했습니다.</p>
                          </div>
                        </div>
                      </div>
                      <div className="char-item reverse">
                        <div className="char-img">
                          <img src="/fe/img/cms/aboutCharacter_img02.png" alt="캐릭터 컨셉, 디자인 설명" />
                        </div>
                        <div className="char-content">
                          <div className="char-info-box">
                            <strong className="info-title">&lt;캐릭터 컨셉&gt;</strong>
                            <p className="info-desc">올슨은 경기 안양시 출신으로 한국의약품안전관리원 탐정 사무소에서 인턴으로 근무 중이며 탐정 코스튬과 다양한 아이템을 장착하고 다니는 무궁무진한 매력을 지닌 친구입니다.</p>
                          </div>
                          <div className="char-info-box">
                            <strong className="info-title">&lt;디자인 설명&gt;</strong>
                            <p className="info-desc">CI를 표현한 <span className="txt-2">하트 앞머리</span> 한 가닥, <span className="txt-2">알약 모양의 가방</span>으로 기관을 연상할 수 있는 외형을 구성하고, 포동포동 통통한 몸매와 초롱초롱 동그란 눈으로 친근한 이미지를 전달합니다.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3 className="section-title">서브 캐릭터</h3>
                    <div className="section-desc  char-intro char-intro-sub">
                      <div className="char-item">
                        <div className="char-img">
                          <img src="/fe/img/cms/aboutCharacter_img03.png" alt="서브 캐릭터 디디" />
                        </div>
                        <div className="char-content">
                          <h4 className="char-name">디디(DD)</h4>
                          <p className="char-slogan">빛을 내어 너의 주변을 밝혀줄게!</p>
                          <div className="char-text">
                            <p>메인 캐릭터 올슨과 상생관계 설정으로 탄생한 디디는 반딧불이 캐릭터입니다.</p>
                            <p>올슨의 둘도 없는 친구이자 조력자로 올슨이 어두운 환경에서 일할 때 빛을 내며 옆을 지켜 주고, 어려운 일에 직면해 힘들어할 때면 현명한 조언으로 도움을 주는 빛과 같은 존재입니다.</p>
                          </div>
                        </div>
                      </div>
                      <div className="char-item reverse">
                        <div className="char-img">
                          <img src="/fe/img/cms/aboutCharacter_img04.png" alt="캐릭터 컨셉, 디자인 설명" />
                        </div>
                        <div className="char-content">
                          <div className="char-info-box">
                            <strong className="info-title">&lt;캐릭터 컨셉&gt;</strong>
                            <p className="info-desc">디디는 날개 없이 태어난 반딧불이로 걸어다니는 번거로움에서 벗어나기 위해 전동 날개를 장착하고 다니는 효율적이며 믿음직한 친구입니다.</p>
                          </div>
                          <div className="char-info-box">
                            <strong className="info-title">&lt;디자인 설명&gt;</strong>
                            <p className="info-desc">CI를 활용한 <span>하트 배</span>로 기관을 연상할 수 있는 외형을 구성 하고 <span>더듬이 빛과 날개</span>로 반딧불이의 형상을 표현했습니다. 단순하며 짧은 형태를 구현해 귀여운 이미지를 전달합니다. </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p>※캐릭터 활용과 관련된 세부사항은 <span className="fw-700">DownLoad 탭</span>의 <span className="fw-700">[매뉴얼북]</span> 을 확인해 주세요.</p>
                    <div className="download-area">
                      <a href="/download/manual_book.zip" download className="btn_outline small">
                        매뉴얼북(PDF) 다운로드 <span className="ico-down-v2" aria-hidden="true"></span>
                      </a>
                      <a href="/download/design_ai.zip" download className="btn_outline small">
                        캐릭터동작(AI) 다운로드 <span className="ico-down-v2" aria-hidden="true"></span>
                      </a>
                      <a href="/download/design_png.zip" download className="btn_outline small">
                        캐릭터동작(PNG) 다운로드 <span className="ico-down-v2" aria-hidden="true"></span>
                      </a>
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
