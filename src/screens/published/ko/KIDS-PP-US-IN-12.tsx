import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../../ScreenShell';

export default function KIDS_PP_US_IN_12() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: 'CI소개' 
    },
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-IN-12" title="CI소개" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>CI소개</span>
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

                  <section className="pageCont-AboutCi">
                    <h3 className="section-title">CI 컨셉</h3>
                    <div className="section-desc sec01">
                      <div className="logo-signature">
                        <img src="/img/cms/aboutCi_img01.png" alt="CI 로고" />
                      </div>
                      <div className="desc-content">
                        <p className="text-item">
                          의약품안전정보 수집, 분석, 평가, 관리를 통해 국내 의약품 부작용 정보 및 해외 안전 정보 및 해외 안전정보등을 체계적으로 관리하는 조직, 
                          즉 <span className="txt-2">국민의 더 나은 건강생활의 방패막이자 사랑을 실천하는 따뜻한 기관</span>임을 표현하였다.
                        </p> 
                        <p className="text-item">
                          KIDS의 로고타입에서는 Bold 서체를 사용, 국가기관의 전문성을 나타냈으며 
                          국제화 시대에 빠르게 대응하는 의미로 서체를 사용하였다.
                        </p>
                      </div>
                    </div>
                    <h3 className="section-title">타입별 디자인</h3>
                    <div className="section-desc sec02">
                      <p className="desc-text">로고타입은 한국의약품안전관리원의 독특한 글씨체로서 심볼과의 조화성과 통일성을 고려하여 디자인 되었으며, 독립적으로 쓰여지기 보다는 심볼을 보조하는 요소로 쓰여진다.</p>
                      <div className="logo-grid">
                        <div className="logo-item">
                          <span className="logo-label">영문</span>
                          <div className="logo-signature">
                            <img src="/img/cms/aboutCi_img02.png" alt="영문 CI 로고" />
                          </div>
                        </div>
                        <div className="logo-item">
                          <span className="logo-label">영문+국문</span>
                          <div className="logo-signature">
                            <img src="/img/cms/aboutCi_img03.png" alt="영문+국문 CI 로고" />
                          </div>
                        </div>
                        <div className="logo-item">
                          <span className="logo-label">국문</span>
                          <div className="logo-signature">
                            <img src="/img/cms/aboutCi_img04.png" alt="국문 CI 로고" />
                          </div>
                        </div>
                      </div>
                      <div className="download-area">
                        <a href="/download/KIDS_AI.zip" download className="btn_outline small">
                          AI 다운로드 <span className="ico-down-v2" aria-hidden="true"></span>
                        </a>
                        <a href="/download/KIDS_PNG.zip" download className="btn_outline small">
                          PNG 다운로드 <span className="ico-down-v2" aria-hidden="true"></span>
                        </a>
                      </div>
                    </div>
                    <h3 className="section-title">슬로건</h3>
                    <div className="section-desc sec03">
                      <p><span className="fw-700">(문구)</span> 의약품 안전으로 국민의 건강을 ‘약속’하고 안전한 ‘의약품 속에서’ 국민건강을 찾도록 노력하겠다는 의미를 나타낸다.</p>
                      <p className="mb24"><span className="fw-700">(디자인)</span> 기관 CI와 동일한 방패 이미지를 넣어 통일감을 부여하고, 슬로건 문구 속 ‘약속’의 중의적인 의미를 표현했다.</p>
                      <div className="logo-signature">
                        <div className="signature-item">
                          <div className="desc-logo">
                            <img src="/img/cms/aboutCi_img05.png" alt="단색조합 슬로건" />
                          </div>
                          <span className="logo-caption">[단색조합]</span>
                        </div>
                        <div className="signature-item">
                          <div className="desc-logo">
                            <img src="/img/cms/aboutCi_img05.png" alt="그라데이션 슬로건" />
                          </div>
                          <span className="logo-caption">[그라데이션]</span>
                        </div>
                      </div>
                      <div className="download-area">
                        <a href="/download/KIDS_(AI).zip" download className="btn_outline xsmall">
                          AI 다운로드 <span className="ico-down-v2" aria-hidden="true"></span>
                        </a>
                        <a href="/download/KIDS_(PNG).zip" download className="btn_outline xsmall">
                          PNG 다운로드 <span className="ico-down-v2" aria-hidden="true"></span>
                        </a>
                      </div>
                      <h3 className="section-title">SIGNATURE</h3>
                      <div className="section-desc">
                        <ul className="list-bullet-2">
                          <li>시그니쳐는 심볼과 로고타입을 가장 효과적으로 조합시킨 정식 표기이다.</li>
                          <li>시그니쳐 사용시 절대로 비례나 간격, 크기를 임의로 변경할 수 없고, 색상 역시 색상규정을 준수하여야 한다.</li>
                        </ul>
                        <p className="fs-20 fw-700 mt5 mb5">&lt;최소공간 규정&gt;</p>
                        <ul className="list-bullet-2">
                          <li>시그니쳐의 공간활용 규정은 충분한 공간이 확보되었을 때 아이덴티티가 살아난다.</li>
                          <li>본 항에서 제시한 공간 규정은 CI가 가진 특성을 가장 잘 살릴 수 있는 최소 공간을 나타낸 것이다.</li>
                        </ul>
                      </div>
                      <h3 className="section-title">COLOR SYSTEM</h3>
                      <div className="section-desc">
                        <ul className="list-bullet-2">
                          <li>전용색상은 시각적 이미지 통일을 위해 정확한 색상 관리가 요구되며 색상재현 시 최상의 표준색상을 얻기 위해서는 색상 견본과 비교하여 사용하여야 한다.</li>
                          <li>단, 색상표현은 별색을 원칙으로 하나 적용 매체의 특성에 따라 프로세스 4원색 방식으로 표현할 수 있다.</li>
                        </ul>
                      </div>
                      <h3 className="section-title">SIGNATURE COLOR SYSTEM</h3>
                      <div className="section-desc">
                        <ul className="list-bullet-2">
                          <li>CI의 색상표현은 백색바탕에 사용하는 기본형을 원칙으로 하나 경우에 따라 아래의 예시와 같이 여러 가지 배경색에 응용 활용할 수 있다.</li>
                          <li>또한, 어떠한 배경색에도 항상 명확하게 표현되어야 하며, 아래에 포함되어 있지 않은 경우는 명도, 채도, 색상 등을 고려하여 가장 유사한 색상을 적용시키고, 특수한 상황이 생길 때에는 반드시 제작처와 협의 후 사용하도록 한다.</li>
                        </ul>
                      </div>
                      <h3 className="section-title">국문지정서체</h3>
                      <div className="section-desc">
                        <ul className="list-bullet-2 mb24">
                          <li>지정서체는 다양한 홍보매체의 중요한 시각적 정보전달 수단에 사용하는 것으로 CI와 조화성을 고려하여 선정하였으며 어떠한 경우라도 임의로 변경하여 사용할 수 없다.</li>
                          <li>아래 이외의 서체사용 시는 제작처와 협의하여 사용한다.</li>
                        </ul>
                        <div className="logo-signature">
                          <img src="/img/cms/aboutCi_img07.png" alt="국문지정서체" />
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
