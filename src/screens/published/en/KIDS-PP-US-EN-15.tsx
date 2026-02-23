import React, { useMemo } from 'react';
import { Box, Typography} from '@mui/material';
// import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_EN_15() {

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'Introduction of DUR',
      children: [
        { key: '#', label: 'Introduction of DUR' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-15" title="Introduction of DUR" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>Introduction of DUR</span>
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

                  <section className="pageCont-dur-intro">
                    <h3 className="section-title">What is Drug Utilization Review (DUR)?</h3>
                    <div className="section-desc">
                      <p>Drug Utilization Review (DUR) is defined as an authorized, structured, and ongoing program that reviews, analyzes, and interprets patterns of drug use in a given health care delivery system against predetermined standards.</p>
                      <p>DUR plays a key role in improving the quality of pharmaceutical care by helping to prevent inappropriate drug use and adverse drug reactions. DUR programs provide prescribers and pharmacists with feedback on their performance and prescribing practices. DUR information allows to provide safe and effective care.</p>
                    </div>
                    <h3 className="section-title">How the DUR System Works in Korea</h3>
                    <div className="section-desc">
                      <p>DUR criteria are developed by the Korea Institute of Drug Safety & Risk Management (KIDS), announced by the Ministry of Food and Drug Safety (MFDS), and embedded into the DUR system by the Health Insurance Review & Assessment Service (HIRA).</p>
                      <p>Hospital and pharmacy computer systems are connected to HIRA’s system, enabling real-time transmission of prescribing and dispensing information. Warnings are displayed as pop-up alerts to prompt caution in the use certain medications.</p>
                    </div>
                    <div className="img-switcher">
                      <img 
                        src="/img/cms/en/dur_intro_img01_en.png" 
                        alt="한국의약품안전관리원 개발 정보가 식약처 고시를 거쳐 심평원 DUR 시스템으로 의료현장에 제공되는 과정 (PC)" 
                        className="responsive-img pc-only"
                      />
                      <img 
                        src="/img/cms/en/dur_intro_img01_m_en.png" 
                        alt="한국의약품안전관리원 개발 정보가 식약처 고시를 거쳐 심평원 DUR 시스템으로 의료현장에 제공되는 과정 (모바일)" 
                        className="responsive-img mo-only"
                      />
                    </div>
                  </section>


                {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    // </ScreenShell>
  );
}