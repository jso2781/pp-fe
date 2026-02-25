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
                      <ul className="list-bullet-2">
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
                      <div className="mb20"></div>
                      <div className="img-switcher">
                        <img src="/img/cms/en/introNIMS_img02.png" alt="" className="responsive-img"/>
                      </div>
                    </div>
                    <h3 className="section-title">Utilization of NIMS Data</h3>
                    <div className="section-desc">
                      <div className="img-switcher">
                        <img src="/img/cms/en/introNIMS_img03.png" alt="" className="responsive-img"/>
                      </div>
                      <div className="mb20"></div>
                      <div className="narcotic-prevention">
                        <dl className="service-list">
                          <div className="class-group">
                            <dt>1) Narcotics Shopping Prevention Program w/ Patient Care Needs</dt>
                            <dd>
                              <p className="txt-type-4">Physicians can check a patient’s narcotic prescription history for the past year prior to issuing a new prescription.</p>
                              <p className="txt-type-4">Patient Care Needs: Risk levels are color-coded using a traffic light signal (red, amber, and green) to help doctors assess the likelihood of narcotics misuse.</p>
                            </dd>
                          </div>
                          <div className="class-group">
                            <dt>2) My Medication History Check Service</dt>
                            <dd>
                              <p className="txt-type-4">Through this service, all individuals may access information on medical narcotics that they have been prescribed or dispensed at medical institutions and pharmacies within the past two years.</p>
                            </dd>
                          </div>
                          <div className="class-group">
                            <dt>3) Data Access Service for Researchers</dt>
                            <dd>
                              <p className="txt-type-4">Researchers can get access to four categorized data sets (Production, Manufacturing, Distribution, Usage) for purposes such as research, surveys, and education related to narcotics misuse.</p>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                    <h3 className="section-title">Benefits of NIMS</h3>
                    <div className="section-desc">
                      <p className="txt-type-4 mb20">
                        NIMS contributes to improving appropriate prescribing practices for medical
                        narcotics in Korea. KIDS operates the system by analyzing large-scale prescribing
                        data from healthcare professionals to identify prescribing volumes or patterns that
                        exceed approved indications, and by issuing Safety-Use Advisory Letters aimed at preventing over-prescribing.
                      </p>
                      <p className="tac txt-3">&lt;Online Safety-Use Advisory Letters and Statistics/Analysis information&gt;</p>
                      <div className="img-switcher">
                        <img src="/img/cms/en/introNIMS_img04.png" alt="" className="responsive-img"/>
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