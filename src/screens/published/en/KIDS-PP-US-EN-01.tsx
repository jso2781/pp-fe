import React, { useMemo } from 'react';
import { Box, Typography} from '@mui/material';
// import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_EN_01() {

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'Greetings',
      children: [
        { key: '#', label: 'Greetings' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-01" title="Greetings" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>Greetings</span>
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

                  <section className="pageCont-greetings">
                    <p className="intro-message">Message from President <span>Soojung Sohn</span></p>
                    <div className="greeting-content-box">
                      <div className="ceo-img"><img src="/img/cms/aboutGreeting_img01.png" alt="Soojung Sohn" /></div>
                      <div className="greeting-article">
                        <p className="mb24">
                          Greetings to all.<br/>
                          This is Soojung Sohn, president of the Korea Institute<br/>
                          of Drug Safety and Risk Management(KIDS).
                        </p>
                        <p className="mb24">
                          KIDS is a specialized public institution under the
                          Ministry of Food and Drug Safety, dedicated to
                          ensuring that the public can use high-quality and safe
                          medicines with confidence by providing scientific and
                          reliable drug safety information.
                        </p>
                        <p className="mb24">
                          Since the COVID-19 pandemic, public interest and
                          expectations regarding a healthy life have continued to
                          grow. At the same time, the rapid advancement of
                          cutting-edge technologies—such as artificial
                          intelligence and digital innovation—calls for a forward-looking and innovative approach to drug safety management.
                        </p>
                        <p className="mb24">
                          KIDS focuses on key tasks such as collecting, analyzing, and evaluating drug safety information, providing compensation for adverse drug side effects,
                          managing the integrated narcotics control system, and operating the long-term follow-up system for advanced biological products. We prioritize
                          the five core values of ‘FIRST - First for the public(F), Innovation(I),Relationship(R), Speciality(S), and Trust(T)’. With these values at the heart of our mission, we strive to become a more trusted and respected institution.
                        </p>   
                        <p className="mb24">KIDS will always listen with an open mind, communicate sincerely, and walk together with the public.</p>
                        <p>Thank you.</p>
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