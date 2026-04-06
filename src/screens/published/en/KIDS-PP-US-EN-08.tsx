import React, { useMemo } from 'react';
import { Box, Typography} from '@mui/material';
// import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_EN_08() {

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'No. of Reported ICSRs by year',
      children: [
        { key: '#', label: 'No. of Reported ICSRs by year' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-08" title="No. of Reported ICSRs by year" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>No. of Reported ICSRs by year</span>
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

                  <section className="pageCont-reportedICSR">
                    <h3 className="section-title">No. of Reported ICSRs by year</h3>
                    <div className="base-table-container mb10">
                      <div className="table-responsive has-scroll">
                        <table className="base-table">
                          <caption className="sr-only"></caption>
                          <colgroup>
                            <col />
                            <col style={{ width: '14%' }} />
                            <col style={{ width: '14%' }} />
                            <col style={{ width: '14%' }} />
                            <col style={{ width: '14%' }} />
                            <col style={{ width: '14%' }} />
                            <col style={{ width: '14%' }} />
                          </colgroup>
                          <thead>
                            <tr>
                              <th scope="col">Year</th>
                              <th scope="col">~2019</th>
                              <th scope="col">2020</th>
                              <th scope="col">2021</th>
                              <th scope="col">2022</th>
                              <th scope="col">2023</th>
                              <th scope="col">2024</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row" className="th2">No.</th>
                              <td>1,862,195</td>
                              <td>259,089</td>
                              <td>539,441</td>
                              <td>315,867</td>
                              <td>268,148</td>
                              <td>253,486</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <p className="txt-3 mb20">*ICSRs : Individual Case Safety Reports</p>
                    <div className="img-switcher">
                      <img src="/fe/img/cms/en/reportedICSR_img01.png" alt="" className="responsive-img"/>
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