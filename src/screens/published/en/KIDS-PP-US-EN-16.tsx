import React, { useMemo } from 'react';
import { Box, Typography} from '@mui/material';
// import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_EN_16() {

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'DUR Criteria',
      children: [
        { key: '#', label: 'DUR Criteria' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-16" title="DUR Criteria" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>DUR Criteria</span>
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

                  <section className="pageCont-dur-Criteria">
                    <h3 className="section-title">Current Status of DUR Criteria</h3>
                    <div className="section-desc">
                      <p>UR information is provided in three types of contraindication information and six types of precautionary information.</p>
                    </div>
                    <div className="base-table-container">
                      <div className="base-table-meta">
                        <p className="update-date">(as of July 14, 2025)</p>
                      </div>
                      <div className="table-responsive">
                        <table className="base-table">
                          <caption className="sr-only">Current Status of DUR Criteria</caption>
                          <colgroup>
                            <col style={{ width: '25%' }} />
                            <col style={{ width: '45%' }} />
                            <col style={{ width: '30%' }} />
                          </colgroup>
                          <thead>
                            <tr>
                              <th scope="col" colSpan={2}>Type of Criteria</th>
                              <th scope="col">Number of Items</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row" rowSpan={3}>Contraindicated Drugs</th>
                              <td>Drug–Drug Interaction (since 2004)</td>
                              <td>1,450</td>
                            </tr>
                            <tr>
                              <td>Drug-Age Contraindication (since 2004)</td>
                              <td>207</td>
                            </tr>
                            <tr>
                              <td>Drug-Pregnancy Contraindication (since 2008)</td>
                              <td>1,210</td>
                            </tr>

                            <tr>
                              <th scope="row" rowSpan={6}>Cautionary Drugs</th>
                              <td>Therapeutic Duplication (since 2013)</td>
                              <td>392</td>
                            </tr>
                            <tr>
                              <td>Inappropriate Dosage (since 2014)</td>
                              <td>331</td>
                            </tr>
                            <tr>
                              <td>Inappropriate Treatment Duration (since 2014)</td>
                              <td>60</td>
                            </tr>
                            <tr>
                              <td>Geriatric Precautions (since 2015)</td>
                              <td>108</td>
                            </tr>
                            <tr>
                              <td>Lactation Precautions (since 2024)</td>
                              <td>180</td>
                            </tr>
                            <tr>
                              <td>Drug Splitting Precautions (since 2015)</td>
                              <td>2,262(품목기준)</td>
                            </tr>
                          </tbody>
                        </table>
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