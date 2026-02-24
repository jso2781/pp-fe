import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../../ScreenShell';

export default function KIDS_PP_US_PI_01() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '이상사례 보고란?' 
    },
  ], []);

  //return <FormTemplate screenId="KIDS-PP-US-PI-01" title="이상사례 보고란?" config={config} />
  return (
    <ScreenShell screenId="KIDS-PP-US-PI-01" title="이상사례 보고란?" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>이상사례 보고란?</span>
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

                  <section className="pageCont-AdverseIntro">
                    <div className="info-summary-box">
                      <h3 className="info-summary-box__title">이상사례(Adverse Event, AE)란?</h3>
                      <div className="info-summary-box__desc">
                        <p>의약품등의 투여·사용 중 발생한 바람하지 하지 않고 의도되지 않은 징후(Sign 예. 실험실적 검사치의 이상), 증상(Symptom)또는 질병을 말하며, 해당 의약품등과 반드시 인과관계를 가져야하는 것은 아니다.</p>
                      </div>
                    </div> 

                    <div className="terminology-box">
                      <dl className="circle-box side-effect">
                        <dt>부작용 <span>(Side Effect)</span></dt>
                        <dd>의약품등을 정상적인 용량에 따라 투여할 경우 발생하는 모든 의도되지 않은 효과</dd>
                      </dl>
                      <dl className="circle-box adverse-event">
                        <dt>이상사례 <span>(Adverse Event)</span></dt>
                        <dd>의약품등의 투여·사용 중 발생한 바람직하지 않고 의도되지 아니한 징후, 증상 또는 질병</dd>
                      </dl>
                      <dl className="circle-box adr">
                        <dt>약물이상반응 <span>(Adverse Drug Reaction)</span></dt>
                        <dd>의약품등을 정상적으로 투여·사용하여 발생한 유해하고 의도하지 아니한 반응으로서 해당 의약품등과의 인과관계를 배제할 수 없는 경우</dd>
                      </dl>
                    </div>
                    <div className="mb40"></div>

                    <h3 className="section-title">중대한 이상사례·약물이상반응(Serious AE/ADR)이란?</h3>
                    <div className="section-desc">
                      <p className="txt-type-1 txt-2">이상사례·약물이상반응 중 다음 각 항목의 어느 하나에 해당하는 경우를 말합니다.</p>
                      <div className="mb15"></div>
                      <ul className="num-list">
                        <li>
                          <span className="num">1.</span>
                          <p className="txt">사망을 초래하거나 생명을 위협하는 사례</p>
                        </li>
                        <li>
                          <span className="num">2.</span>
                          <p className="txt">입원 또는 입원기간의 연장이 필요한 사례</p>
                        </li>
                        <li>
                          <span className="num">3.</span>
                          <p className="txt">지속적 또는 중대한 불구나 기능저하를 초래하는 사례</p>
                        </li>
                        <li>
                          <span className="num">4.</span>
                          <p className="txt">선천적 기형 또는 이상을 초래하는 사례</p>
                        </li>
                        <li>
                          <span className="num">5.</span>
                          <p className="txt">
                            제1호부터 제4호까지의 사례 외에 약물 의존성이나 남용의 발생 또는 혈액질환 등 그밖에 의학적으로 중요한 상황이 발생하여 치료가 필요한 사례
                          </p>
                        </li>
                      </ul>
                    </div>

                    <h3 className="section-title">의약품 이상사례 보고의 필요성</h3>
                    <div className="section-desc">
                      <p>의약품은 시판 전 동물시험에 의한 전임상시험과 사람에 대한 임상시험을 거쳐 시판 허가를 받게 됩니다.</p>
                      <p>이런한 임상시험은 관찰기간이 제한되고, 한정된 연구대상자를 대상으로 하기 때문에 모든 약물이상반응을 파악하는 것은 불가능합니다.</p>
                      <p>따라서 시판 후 약물감시는 대단히 중요하며, 의약품 사용시 나타나는 각종 이상사례를 수집·평가하여 안전대책을 강구함으로써 국민의 안전한 의약품 사용을 도모할 수 있습니다.</p>
                    </div>

                    <h3 className="section-title">이상사례 보고 방법</h3>
                    <div className="section-desc">
                      <div className="report-info-box">
                        <ul className="report-step-list">
                          <li>
                            <span className="label">온라인 보고</span>
                            <div className="con">
                              <p className="txt">의약품안전나라 의약품통합정보시스템을 이용하실 수 있습니다.</p>
                            </div>
                          </li>
                          <li>
                            <span className="label">전화</span>
                            <div className="con">
                              <p className="txt">한국의약품안전관리원 대표전화 1644-62243 (또는 14-3330)으로 보고 하실 수 있습니다.</p>
                            </div>
                          </li>
                        </ul>
                        <div className="btn-action">
                          <a 
                              href="https://nedrug.mfds.go.kr/CCCBA03F010/getReport" 
                              className="btn_default" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              title="의약품안전나라 온라인 보고 바로가기(새 창 열림)"
                            >
                              온라인 보고 바로가기
                              <span className="ico-link" aria-hidden="true"></span>
                              <span className="sr-only">(새 창 열림)</span>
                            </a>
                        </div>
                      </div>
                    </div>

                    <h3 className="section-title">이상사례 보고 후 과정</h3>
                    <div className="section-desc">
                      <p>이상사례가 보고되면, 한국의약품안전관리원에서는 이러한 정보를 체계적으로 수집하고, 보고된 자료 관리를 통하여 이상사례보고 데이터베이스를 구축합니다.</p>
                      <p>이렇게 축적된 이상사례 데이터베이스를 이용하여 약물이상사례의 실마리정보를 분석하게 되며, 또한 특정 이상사례에 대해 보다 체계적으로 평가하거나 심층적인 약물역학연구를 수행합니다.</p>
                      <p>이를 통해 의약품 안전성정보를 생산하며, 정부의 위해 관리정책에 대한 근거를 제공하는 업무를 수행하고 있습니다.</p>
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
