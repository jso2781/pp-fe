import React, { useMemo } from 'react';
import { Box, Typography} from '@mui/material';
// import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_EN_03() {

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'Mission & Vision',
      children: [
        { key: '#', label: 'Mission & Vision' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-03" title="Mission & Vision" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>Mission & Vision</span>
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

                  <section className="pageCont-missionVision">
                    <div className="section-mission-vision">
                      <div className="goal-box type-mission">
                        <div className="goal-head">
                          <div className="head-label">
                            <span className="label-eng">MISSION</span>
                          </div>
                        </div>
                        <div className="goal-body">
                          <div className="goal-content">
                            To promote public health through drug safety management
                          </div>
                        </div>
                      </div>
                      <div className="goal-box type-vision">
                        <div className="goal-head">
                          <div className="head-label">
                            <span className="label-eng">VISION</span>
                          </div>
                        </div>
                        <div className="goal-body">
                          <div className="goal-content">
                            To be world leading research institute of drug safety & risk management
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="section-title">CORE VALUES</h3>
                    <div className="core-values-section">
                      <div className="core-values-content">
                        <div className="value-list">
                          <div className="value-item item-01">Best oriented</div>
                          <div className="value-item item-02">Pursuing cooperation</div>
                          <div className="value-item item-03">Respecting customers</div>
                        </div>
                        <div className="value-description">
                          We strive to exercise professionalism and autonomy as a professional research institute. Our goal is to achieve excellence with creativity to proactively collect, analyze, assess and manage drug safety information. With the drug safety information, we serve and devote to the safety of Korean citizens through public education and training programs. The KIDS will be a global leading institute in pharmacovigilance and risk management.
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
    // </ScreenShell>
  );
}