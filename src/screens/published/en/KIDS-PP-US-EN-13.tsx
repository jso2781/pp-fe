import React, { useMemo } from 'react';
import { Box, Typography} from '@mui/material';
// import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_EN_21() {

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'Introduction of PE (Pharmacoepidemiology)',
      children: [
        { key: '#', label: 'Introduction of PE (Pharmacoepidemiology)' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-21" title="Introduction of PE (Pharmacoepidemiology)" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>Introduction of PE (Pharmacoepidemiology)</span>
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

                  <section className="pageCont-introPE">
                    <h3 className="section-title">Pharmacoepidemiologic Investigation</h3>
                    <div className="section-desc">
                      <ul className="list-bullet-2">
                        <li>Conduct in-depth review of serious ADE reports and important safety signals.</li>
                        <li>Conduct field pharmacoepidemiologic investigations on emerging ADE epidemics.</li>
                        <li>Conduct strategic pharmacoepidemiologic investigations on medicinal products with drug safety issues.</li>
                        <li>Keep up-to-date with pharmacoepidemiologic assessment methodologies and guidelines.</li>
                      </ul>
                    </div>
                    <div className="img-switcher">
                      <img src="/fe/img/cms/en/introPE_img01.png" alt="" className="responsive-img pc-only"/>
                      <img src="/fe/img/cms/en/introPE_img01_m.png"  alt="" aria-hidden="true" className="responsive-img mo-only"/>
                    </div>
                    <h3 className="section-title">Methods for Causality Assessment</h3>
                    <div className="section-desc">
                      <p className="mb10">For individual case reports, we apply causality assessment algorithms which are based on decision criteria including challenge, dechallenge, rechallenge, previous bibliographic descriptions, and other etiologic alternatives. Once the signal of a potential drug safety issue is generated, a signal evaluation is performed. </p>
                      <p>It includes systematic reviews of relevant literature and pharmacoepidemiologic studies either as ad-hoc basis or as database analysis. Pharmacoepidemiologic studies can provide high quality of evidence for clinical decision-making by empirically specifying the nature and magnitude of the risk of having a particular adverse outcome associated with a medication.</p>
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