import React, { useMemo } from 'react';
import { Box, Typography} from '@mui/material';
// import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_EN_07() {

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'Introduction of KAERS',
      children: [
        { key: '#', label: 'Introduction of KAERS' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-07" title="Introduction of KAERS" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>Introduction of KAERS</span>
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

                  <section className="pageCont-introKAERS">
                    <h3 className="section-title">The Korea Adverse Event Reporting System (KAERS)</h3>
                    <div className="section-desc">
                      <ul className="list-bullet-2">
                        <li>KAERS is a system developed by KIDS to facilitate reporting and management of adverse event (AE) reports. All reports of AEs have been accumulated in KAERS since 2012.</li>
                        <li>Suspected drug and AE information are reported to KIDS in a form named ‘Individual Case Safety Reports (ICSRs)’.</li>
                        <li>AEs can also be reported via ADR call center.  However, all information received are stored within KAERS as an ICSR. KIDS detects and evaluates signals from cumulated data to generate and provide drug safety information. KAERS database is compatible with the international standards, and the WHO-UMC (Uppsala Monitoring Centre) international drug monitoring program.</li>
                        <li>The minimum criteria for an adverse event report to be valid are AE information, drug information, patient and reporter information.</li>
                        <li>KIDS periodically provides Ministry of Food and Drug Safety (MFDS) with AE report statistics and safety information generated.</li>
                      </ul>
                    </div>
                    <div className="img-switcher">
                      <img src="/img/cms/en/introKAERS_img01.png" alt="" className="responsive-img pc-only"/>
                      <img src="/img/cms/en/introKAERS_img01_m.png"  alt="" aria-hidden="true" className="responsive-img mo-only"/>
                    </div>
                    <h3 className="section-title">Who reports to KAERS?</h3>
                    <div className="section-desc">
                      <ul className="list-bullet-2">
                        <li>Anyone who experiences AEs can report to KIDS using KAERS; Consumers, Healthcare Professionals (HCPs), Regional Pharmacovigilance Centers (RPVCs) and Marketing Authorization Holders (MAHs), who are mostly pharmaceutical companies.</li>
                        <li>Regional Pharmacovigilance Centers (RPVCs) evaluate causal relationships of AE reports submitted to their  center within the region and reports them to KIDS via KAERS.</li>
                        <li>Pharmaceutical companies report AEs via KAERS as well, especially the mandatory reports required by the  pharmaceutical regulation.</li>
                      </ul>
                    </div>
                    <h3 className="section-title">What kinds of reports are submitted to KAERS?</h3>
                    <div className="section-desc">
                      <ul className="list-bullet-2">
                        <li>KIDS collects domestic and foreign ICSRs and manages the quality of the reports via KAERS.</li>
                        <li>Submission of foreign ICSRs has been made mandatory since Aug 2014 for the MAHs, as an effort to manage safety information comprehensively.</li>
                        <li>KAERS database includes the data collected through spontaneous reports, reports from studies(re-examination, post-marketing studies, individual case studies, etc), and literature information</li>
                      </ul>
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