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
      label: 'Introduction of NIMS',
      children: [
        { key: '#', label: 'Introduction of NIMS' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-21" title="Introduction of NIMS" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>Introduction of NIMS</span>
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

                  <section className="pageCont-introNIMS">
                    <h3 className="section-title">What is NIMS?</h3>
                    <div className="section-desc">
                      <ul className="list-bullet-2">
                        <li>
                            NIMS (Narcotics Information Management System) was launched to address the
                            limitations of manual management methods and to prevent the growing problem
                            of medical narcotics misuse.
                        </li>
                        <li>
                          Based upon Narcotics Control Act Article 11, all narcotics handlers and narcotics
                          handling-approved personnel must report the details of all narcotics handling
                          cases to NIMS as of May 18th, 2018.
                        </li>
                      </ul>
                    </div>
                    <h3 className="section-title">NIMS: Comprehensive Management system for Medical Narcotics</h3>
                    <div className="section-desc">
                      <ul>
                        <li>
                          NIMS manages the entire lifecycle of medical narcotics from production and distribution to dispensing and administration.
                        </li>
                        <li>
                          It tracks overall handling information of narcotics and psychotropic drugs, and monitor all cases to detect suspicious distribution.
                        </li>
                      </ul>
                      <div className="mb20"></div>
                      <div className="img-switcher">
                        <img src="/img/cms/en/introNIMS_img01.png" alt="" className="responsive-img"/>
                      </div>
                      <div className="mb20"></div>
                      <p className="txt-type-5">
                        Through this reporting system, NIMS accumulates extensive big data on medical
                        narcotics and plays a central role in preventing misuse/abuse and supporting
                        related research in collaboration with relevant government agencies.
                      </p>
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