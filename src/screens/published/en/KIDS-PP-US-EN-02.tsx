import React, { useMemo } from 'react';
import { Box, Typography} from '@mui/material';
// import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_EN_02() {

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'Brief History',
      children: [
        { key: '#', label: 'Brief History' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-02" title="Brief History" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>Brief History</span>
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

                  <section className="pageCont-BriefHistory">
                    <div className="history-list">
                      <div className="history-item odd">
                        <span className="year">2018</span>
                        <div className="history-desc">
                          <p><span>25 MAY 2018</span> WHO United Arab Amirates(UAE) Health Foundation Prize</p>
                        </div>
                      </div>
                      <div className="history-item even">
                        <span className="year">2017</span>
                        <div className="history-desc">
                          <p><span>13 SEP 2017</span> Operation of APEC PV Center of Excellence(CoE) Program</p>
                        </div>
                      </div>
                      <div className="history-item odd">
                        <span className="year">2015</span>
                        <div className="history-desc">
                          <p><span>20 JUL 2015</span> Designated as a Center for Narcotics Information Management</p>
                        </div>
                      </div>
                      <div className="history-item even">
                        <span className="year">2014</span>
                        <div className="history-desc">
                          <p><span>19 DEC 2014</span> Korea ADR Relidf program was launched</p>
                          <p><span>10 OCT 2014</span> Designated as a PV training center</p>
                          <p><span>21 AUG 2014</span> Collection of foreign adverse event reports</p>
                        </div>
                      </div>
                      <div className="history-item odd">
                        <span className="year">2013</span>
                        <div className="history-desc">
                          <p><span>31 JAN 2013</span> Designated as public institution</p>
                        </div>
                      </div>
                      <div className="history-item even">
                        <span className="year">2012</span>
                        <div className="history-desc">
                          <p><span>1 NOV 2012</span> ADR call center established</p>
                          <p><span>1 OCT 2012</span> Initiation of KAERS to receive adverse event reports</p>
                          <p><span>17 APR 2012</span> Official opening of the KIDS</p>
                        </div>
                      </div>
                      <div className="history-item odd">
                        <span className="year">2011</span>
                        <div className="history-desc">
                          <p><span>29 DEC 2011</span> Permission for establishing the KIDS</p>
                          <p><span>4 JUL 2011</span> Launch of committee for establishing the KIDS</p>
                          <p><span>7 JUN 2011</span> Amendment of the Pharmaceutical Affairs Law for establishing the KIDS</p>
                        </div>
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