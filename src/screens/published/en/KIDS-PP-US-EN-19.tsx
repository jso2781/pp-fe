import React, { useMemo } from 'react';
import { Box, Typography} from '@mui/material';
// import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_EN_19() {

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'Statistics on ADR Relief System',
      children: [
        { key: '#', label: 'Statistics on ADR Relief System' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-19" title="Statistics on ADR Relief System" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>Statistics on ADR Relief System</span>
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

                  <section className="pageCont-statisticsAdrRelf">
                    <h3 className="section-title">Request for relief of injury</h3>
                    <div className="base-table-container">
                      <div className="base-table-meta">
                        <p className="update-date">(‘2025.11.30, uint : cases)</p>
                      </div>
                      <div className="img-switcher">
                        <img src="/fe/img/cms/en/statisticsAdrRelf_img01.png" alt="Request for relief of injury" className="responsive-img"/>
                      </div>
                    </div>
                    
                    <h3 className="section-title">Request for relief of injury</h3>
                    <div className="base-table-container">
                      <div className="base-table-meta">
                        <p className="update-date">(‘2025.11.30, uint : cases)</p>
                      </div>
                      <div className="table-responsive has-scroll">
                        <table className="base-table">
                          <caption className="sr-only">Request for relief of injury</caption>
                          <thead>
                            <tr>
                              <th scope="col"></th>
                              <th scope="col">Death compensation</th>
                              <th scope="col">Funeral cost</th>
                              <th scope="col">Disability compensation</th>
                              <th scope="col">Medical expenses</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">Request for relief</th>
                              <td>197</td>
                              <td>187</td>
                              <td>68</td>
                              <td>1266</td>
                            </tr>
                            <tr>
                              <th scope="row">Approved</th>
                              <td>128</td>
                              <td>127</td>
                              <td>41</td>
                              <td>970</td>
                            </tr>
                            <tr>
                              <th scope="row">Rejected</th>
                              <td>56</td>
                              <td>47</td>
                              <td>15</td>
                              <td>122</td>
                            </tr>
                            <tr>
                              <th scope="row">Withdrawn</th>
                              <td>1</td>
                              <td>1</td>
                              <td>4</td>
                              <td>15</td>
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