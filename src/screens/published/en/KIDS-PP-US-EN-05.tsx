import React, { useMemo } from 'react';
import { Box, Typography} from '@mui/material';
// import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_EN_05() {

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'Introduction of CI',
      children: [
        { key: '#', label: 'Introduction of CI' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-05" title="Introduction of CI" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>Introduction of CI</span>
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

                  <section className="pageCont-introCI">
                    <div className="section-desc">
                      <div className="intro-ci">
                        <div className="img-box"><img src="/img/cms/en/introCI_img01.png" alt="KIDS" /></div>
                        <div className="text-box">The shape of a shield with a heart inside symbolizes a philanthropic attitude of the KIDS. It represents the will of our organization to promote healthier lives by protecting people from preventable adverse drug events and providing drug safety information. The bold letters emphasize the professionalism and responsibility as a national organization.</div>
                      </div>
                    </div>
                    <div className="section-desc">
                      <div className="logo-grid">
                          <div className="logo-item">
                            <span className="logo-label">English</span>
                            <div className="logo-signature">
                              <img src="/img/cms/en/introCI_img02.png" alt="English CI " />
                            </div>
                          </div>
                          <div className="logo-item">
                            <span className="logo-label">English+Korean</span>
                            <div className="logo-signature">
                              <img src="/img/cms/en/introCI_img03.png" alt="English+Korean CI" />
                            </div>
                          </div>
                          <div className="logo-item">
                            <span className="logo-label">Korean</span>
                            <div className="logo-signature">
                              <img src="/img/cms/en/introCI_img04.png" alt="Korean CI" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <h3 className="section-title">CI File Download</h3>
                      <div className="section-desc sec03">
                        <div className="download-area">
                        {/* <a href="/download/" download className="btn-down">
                          <img src="/img/cms/en/ico_pdf.png" alt="pdf" />
                          <span>CI Mamual file download</span>
                        </a> 
                        <a href="/download/" download className="btn-down">
                          <img src="/img/cms/en/ico_ai.png" alt="ai" />
                          <span>CI Design files download</span>
                        </a> */}
                        <a href="javascript:void(0);" onClick={() => alert('Coming soon!')} className="btn-down">
                          <img src="/img/cms/en/ico_pdf.png" alt="pdf" />
                          <span>CI Mamual file download</span>
                        </a>
                        <a href="javascript:void(0);" onClick={() => alert('Coming soon!')} className="btn-down">
                          <img src="/img/cms/en/ico_ai.png" alt="ai" />
                          <span>CI Design files download</span>
                        </a>
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