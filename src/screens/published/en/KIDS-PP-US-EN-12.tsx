import React, { useMemo } from 'react';
import { Box, Typography} from '@mui/material';
// import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_EN_12() {

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'Current activities of RPVC',
      children: [
        { key: '#', label: 'Current activities of RPVC' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-12" title="" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>Current activities of RPVC</span>
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

                  <section className="pageCont-currentRPVC">
                    <h3 className="section-title">AE reporting collection, evaluation, and achievement</h3>
                    <div className="section-desc">
                      <ul className="list-bullet-2">
                        <li>The RPVCs have individual electronic AE reporting systems. Each center builds collaborative relationships with local healthcare providers to stimulate voluntary AE reporting.</li>
                        <li>The number of voluntary AE reports, approximately 1,000 reports per year in 2005, has been significantly increased with initiation of RPVC in late 2006. Significant increase in the number of voluntary AE reports within a short period of time testifies the importance of RPVCs in stimulating AE monitoring.</li>
                      </ul>
                    </div>
                    <div className="img-switcher">
                      <img src="/img/cms/en/currentRPVC_img01.png" alt="" className="responsive-img"/>
                    </div>
                    <h3 className="section-title">Drug-AE intensive monitoring</h3>
                    <div className="section-desc">
                      <ul className="list-bullet-2 mb10">
                        <li>
                          <p>RPVCs continuously conduct intensive monitoring in special medicines and special populations, especially for ediatrics and geriatrics.</p>
                        </li>
                      </ul>
                      <p>➀ Special medicinal products designated by MFDS (oral contraceptives, appetite suppressants, NSAIDs,angiotensin II receptor antagonists, etc.)</p>
                      <p>➁ Special populations (i.e. pediatrics, geriatrics)</p>
                    </div>
                    <h3 className="section-title">Surveillance of Drug-AEs and Education/Promotions</h3>
                    <div className="section-desc">
                      <ul className="list-bullet-2">
                        <li>In RPVCs, education and promotional campaigns regarding the importance of pharmacovigilance are done periodically.</li>
                        <li>The activities are as follows: production and distribution of newsletters, press-release update in the bulletin.</li>
                      </ul>
                    </div>
                    <p className="tac fw-700 fs-18 mb10">&lt;Operating System of RPVCs&gt;</p>
                    <div className="img-switcher">
                      <img src="/img/cms/en/currentRPVC_img02.png" alt="" className="responsive-img pc-only"/>
                      <img src="/img/cms/en/currentRPVC_img02_m.png"  alt="" aria-hidden="true" className="responsive-img mo-only"/>
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