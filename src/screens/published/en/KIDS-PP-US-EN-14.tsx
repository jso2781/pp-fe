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
      label: 'PE Study Design',
      children: [
        { key: '#', label: 'PE Study Design' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-21" title="PE Study Design" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>PE Study Design</span>
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

                  <section className="pageCont-PEStudydesign">
                    <h3 className="section-title">Study design</h3>
                    <div className="section-desc">
                      <p>To evaluate the causality between a drug and an adverse event, we monitor and observe the case and control groups of a study and we use research designs like cohort (all users of a drug are identified and followed up to determine what events or ADRs occur) and case-control study (all cases of the disease are identified and the use of the drug of interest is compared with controls without the disease).</p>
                    </div>
                    <div className="base-table-container">
                      <div className="table-responsive has-scroll">
                        <table className="base-table">
                          <caption className="sr-only">Study design</caption>
                          <colgroup>
                            <col style={{ width: '25%' }} />
                            <col style={{ width: '25%' }} />
                            <col style={{ width: '25%' }} />
                            <col style={{ width: '25%' }} />
                          </colgroup>
                          <thead>
                            <tr>
                              <th scope="col">Intervention</th>
                              <th scope="col">Study designs</th>
                              <th scope="col">Classification<br/>(causal relationship)</th>
                              <th scope="col">Convincing power</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row" rowSpan={5}>Observational study</th>
                              <td>Case report</td>
                              <td rowSpan={3}>Descriptive study<br/>(Association)</td>
                              <td>very weak</td>
                            </tr>
                            <tr>
                              <td>Case series study</td>
                              <td rowSpan={4}></td>
                            </tr>
                            <tr>
                              <td>Cross-sectional study</td>
                            </tr>
                            <tr>
                              <td>Case-control study</td>
                              <td rowSpan={3}>Analytic study<br/>(Causation)</td>
                            </tr>
                            <tr>
                              <td>Cohort study</td>
                            </tr>
                            <tr>
                              <th scope="row">Experimental study</th>
                              <td>Randomized clinical trial</td>
                              <td>very strong</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <h3 className="section-title">Data collection</h3>
                    <div className="section-desc">
                      <p className="mb40">To conduct a pharmacoepidemiologic study, we collect data directly or analyze databases such as health insurance claims database, hospital EMR database, and national statistics mortality data.</p>
                      <dl className="list-definition-plain">
                        <dt className="txt-2">1) Collection of data</dt>
                        <dd>
                          <ul className="list-bullet-3">
                            <li>We conduct in-depth studies on drug exposure, adverse events, confounding factors, and etc.</li>
                            <li>
                              We directly collect data on about adverse events if necessary. Such cases include over-the-counter
                              drugs, drugs  not covered under national health insurance, and adverse events without diagnostic codes</li>
                            <li>
                               We also use drug registry data, which contain information on the drug users and adverse events, for 
                              causality  assessments.
                            </li>
                          </ul>
                        </dd>
                      </dl>
                      <dl className="list-definition-plain">
                        <dt className="txt-2">2) Analysis using other databases</dt>
                        <dd>
                          <ul className="list-bullet-3">
                            <li>
                              Advantages of using other databases include their representativeness of a large population, high validity, and efficiency.
                            </li>
                            <li>
                              We can analyze associations among drug use, cancer risk and death by linking different databases.
                            </li>
                            <li>
                              Recently, we conducted pharmacoepidemiological studies using the Common Data Model(CDM). CDM is  
                              based on hospital data, and includes laboratory test results and drugs not covered by national health  
                              insurance.
                            </li>
                          </ul>
                        </dd>
                      </dl>
                    </div>
                    <h3 className="section-title">Evaluation and Conclusion</h3>
                    <div className="section-desc">
                      <p>We analyze the data to determine whether the suspected causal drugs actually had an effect on the outcome and generate drug safety information.</p>
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