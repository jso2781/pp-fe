import React, { useMemo, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../ScreenShell';

export default function KIDS_PP_US_PI_08() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/',  
      label: '약물감시용어' 
    },
  ], []);


  return (
    <ScreenShell screenId="KIDS-PP-US-PI-08" title="약물감시용어" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>약물감시용어</span>
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

                  <section className="pageCont-SafetyTerms">
                    <div className="info-summary-box">
                      <h3 className="info-summary-box__title">약물감시(Pharmacovigilance) 란?</h3>
                      <div  className="mb24"></div> 
                      <div className="info-summary-box__desc">
                         <div className="img-switcher">
                          <img src="/img/safetyTerms_img01.png" alt="약물감시 도식화" className="responsive-img pc-only"/>
                          <img src="/img/safetyTerms_im g01_m.png"  alt="" aria-hidden="true" className="responsive-img mo-only"/>
                        </div>
                        <div  className="mb24"></div> 
                        <p>의약품등의 이상사례 또는 안전성 관련 문제의 탐지·평가·해석·예방에 관한 과학적 활동을 말합니다.</p>
                        <p>(CIOMS VI, ICH E2E, WHO).약물감시는 "약"이라는 뜻의 그리스어 Pharmakon과 "계속 깨어 있으면서 지켜보고 경계한다"는 뜻의 라틴어에서 
                        유래한 합성어입니다. 약물감시는 의약품의 안전성정보 수집에서부터 위해 관리에 이르기까지 의약품의 전 주기를 거쳐서 
                        이어지는 활동입니다.</p>
                      </div>
                    </div> 

                    <h3 className="section-title">부작용(Side Effect)이란?</h3>
                    <div className="section-desc">
                      <p>의약품등을 정상적인 용량에 따라 투여한 경우 발생하는 모든 의도되지 않은 효과를 말하며, 의도되지 않은 바람직한 효과를 포함합니다.</p>
                    </div>

                    <h3 className="section-title">이상사례(Adverse Event/Adverse Experience, AE)란?</h3>
                    <div className="section-desc">
                      <p>의약품등의 투여·사용 중 발생한 바람직하지 않고 의도되지 않은 징후(sign, 예 ; 실험실적 검사치의 이상), 증상(symptom) 또는 질병을 말하며, 당해 의약품등과 반드시 인과관계를 가져야 하는 것은 아닙니다.</p>
                    </div>

                    <h3 className="section-title">약물이상반응(Adverse Drug Reaction, ADR)이란?</h3>
                    <div className="section-desc">
                      <p>의약품등을 정상적으로 투여·사용하여 발생한 유해하고 의도하지 아니한 반응으로서 해당 의약품등과의 인과관계를 배제할 수 없는 경우를 말하며, 자발적으로 보고된 이상사례 중에서 의약품등과의 인과관계가 알려지지 않은 경우에는 약물이상반응으로 간주합니다. 다만, 보고자와 제조자/의뢰자 모두가 의약품등과 관련이 없다고 판단한 경우에는 약물이상반응에서 제외하고 있습니다.</p>
                    </div>

                    <h3 className="section-title">약물이상반응(Adverse Drug Reaction, ADR)이란?</h3>
                    <div className="section-desc">
                      <p>의약품등을 정상적으로 투여·사용하여 발생한 유해하고 의도하지 아니한 반응으로서 해당 의약품등과의 인과관계를 배제할 수 없는 경우를 말하며, 자발적으로 보고된 이상사례 중에서 의약품등과의 인과관계가 알려지지 않은 경우에는 약물이상반응으로 간주합니다. 다만, 보고자와 제조자/의뢰자 모두가 의약품등과 관련이 없다고 판단한 경우에는 약물이상반응에서 제외하고 있습니다.</p>
                    </div>

                    <h3 className="section-title">실마리정보(Signal)란?</h3>
                    <div className="section-desc">
                      <p>실마리정보란 약물과 이상사례간의 새로운 잠재적 인과관계 또는 알려진 관계의 새로운 측면을 제시하는 정보로서 하나 또는 그 이상의 보고원으로부터 얻어지는 정보 중에서 분석할 만한 가치가 있는 정보이며, 그 관계가 유해한 것에 국한되지 않습니다.</p>
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
