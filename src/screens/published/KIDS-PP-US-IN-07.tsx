import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../ScreenShell';

export default function KIDS_PP_US_IN_07() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '고객헌장' 
    },
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-IN-07" title="고객헌장" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>고객헌장</span>
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

                  <section className="pageCont-AboutCharter">
                    <div className="category-link-tabs" aria-label="카테고리 이동">
                      <ul className="tabs-list" role="tablist">
                        <li className="tab-item"><a href="/cms/CmsPage/" className="tab-link active" aria-current="page">고객헌장</a></li>
                        <li className="tab-item"><a href="/cms/CmsPage/" className="tab-link">핵심서비스 이행표준</a></li>
                        <li className="tab-item"><a href="/cms/CmsPage/" className="tab-link">고객응대 서비스 이행표준</a></li>
                      </ul>
                    </div>
                    <h3 className="section-title">CS MISSION</h3>
                    <div className="section-desc sec01">
                      국민 건강증진을 위한 고객 중심의 의약품 안전관리 서비스 제공
                    </div>
                    <h3 className="section-title">CS VISION</h3>
                    <div className="section-desc sec02">
                      국민이 신뢰할 수 있는 의약품 안전관리 전문기관
                    </div>
                    <h3 className="section-title">고객헌장</h3>
                    <div className="section-desc sec03">
                      <p className="txt">한국의약품안전관리원은, 의약품 등의 안전과 관련한 <br/>
                      각종 정보의 수집, 관리, 분석,평가 및 제공 업무를 효율적이고 <br/>
                      체계적으로 수행하여 국민 건강 증진 및 사회적 가치 실현에 앞장서겠습니다.</p>
                      <ul className="promise-list">
                        <li>
                          <span className="num">하나,</span>
                          <p>우리는 <span className="txt-2">고객이 신뢰할 수 있는</span> 의약품등 <span className="txt-2">안전관리 업무를 수행</span>하겠습니다.</p>
                        </li>
                        <li>
                          <span className="num">하나,</span>
                          <p>우리는 실효성 높은 의약품등 <span className="txt-2">안전 정보를 수집 및 분석하여 제공</span>하겠습니다.</p>
                        </li>
                        <li>
                          <span className="num">하나,</span>
                          <p>우리는 <span className="txt-2">소중한 고객의 의견</span>을 적극적으로 <span className="txt-2">업무 개선에 반영</span>하겠습니다.</p>
                        </li>
                        <li>
                          <span className="num">하나,</span>
                          <p>우리는 국민 건강 증진에 기여하는 <span className="txt-2">사회적 책임을 성실히 수행</span>하겠습니다.</p>
                        </li>
                      </ul>
                      <p className="txt">이러한 약속을 지키기 위해,<br/>구체적인 서비스 이행 기준을 마련하고, 한국의약품안전관리원 임직원들은 성실하게 지킬 것을 약속드립니다.</p>
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
