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
      label: 'Resources',
      children: [
        { key: '#', label: 'Resources' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-21" title="Resources" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>Resources</span>
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

                  <section className="pageCont-resources">
                    <div className="resource-item">
                      <div className="thumbnail">
                        <img src="/fe/img/cms/en/resources_img01.png" alt="2020 Ministry of Food and Drug Safety White Paper" />
                      </div>
                      <div className="info-body">
                        <dl>
                          <dt>2020 Ministry of Food and Drug Safety White Paper</dt>
                          <dd>Ministry of Food and Drug Safety (MFDS) annually publishes ‘Ministry of Food and Drug Safety White Paper as a guidance to follow MFDS’s policies and implementations on food and drug safety. Under Part 3 Section 1 Subsection 5 & 6, the paper introduces the 'Laying the Foundations for Safe Use of Narcotics' and 'Strengthening Safety Management of Narcotic Drugs'.</dd>
                        </dl>
                        <a href="https://www.mfds.go.kr/eng/brd/m_60/view.do?seq=74498" target="_blank" title="move" className="btn_outline_sub xsmall">
                          VISIT<span className="ico-arr-right" aria-hidden="true"></span>
                        </a>
                      </div>
                    </div>
                    <div className="resource-item">
                      <div className="thumbnail">
                        <img src="/fe/img/cms/en/resources_img02.png" alt="2019 Ministry of Food and Drug Safety White Paper" />
                      </div>
                      <div className="info-body">
                        <dl>
                          <dt>2019 Ministry of Food and Drug Safety White Paper</dt>
                          <dd>Ministry of Food and Drug Safety (MFDS) annually publishes ‘Ministry of Food and Drug Safety White Paper as a guidance to follow MFDS’s policies and implementations on food and drug safety. Under Part 3 Section 1 Subsection 5 & 6, the paper introduces the ‘Establishment of a Management System for Preventing Abuse and Misuse of Narcotic Drugs’ and ‘Maintenance of the Narcotic Drugs Management System and Strengthening Safety Management’.</dd>
                        </dl>
                        <a href="https://www.mfds.go.kr/eng/brd/m_60/view.do?seq=73753" target="_blank" title="move" className="btn_outline_sub xsmall">
                          VISIT<span className="ico-arr-right" aria-hidden="true"></span>
                        </a>
                      </div>
                    </div>
                    <div className="resource-item">
                      <div className="thumbnail">
                        <img src="/fe/img/cms/en/resources_img03.png" alt="2018 Ministry of Food and Drug Safety White Paper" />
                      </div>
                      <div className="info-body">
                        <dl>
                          <dt>2018 Ministry of Food and Drug Safety White Paper</dt>
                          <dd>Ministry of Food and Drug Safety (MFDS) annually publishes ‘Ministry of Food and Drug Safety White Paper as a guidance to follow MFDS’s policies and implementations on food and drug safety. Under Part 3 Section 1 Subsection 5 & 6, the paper introduces the ‘Establishment of a Management System for Preventing Abuse and Misuse of Narcotic Drugs’ and ‘Establishment of a Pre-emptive Narcotic Drugs Prevention Management System for Reassuring the People’.</dd>
                        </dl>
                        <a href="https://www.mfds.go.kr/eng/brd/m_60/view.do?seq=72621" target="_blank" title="move" className="btn_outline_sub xsmall">
                          VISIT<span className="ico-arr-right" aria-hidden="true"></span>
                        </a>
                      </div>
                    </div>
                    <div className="resource-item">
                      <div className="thumbnail">
                        <img src="/fe/img/cms/en/resources_img04.png" alt="2017 Ministry of Food and Drug Safety White Paper" />
                      </div>
                      <div className="info-body">
                        <dl>
                          <dt>2017 Ministry of Food and Drug Safety White Paper</dt>
                          <dd>Ministry of Food and Drug Safety (MFDS) annually publishes ‘Ministry of Food and Drug Safety White Paper as a guidance to follow MFDS’s policies and implementations on food and drug safety. Under Part 3 Section 1 Subsection 5, the paper introduces the ‘Establishment of a Management System for Preventing Abuse and Misuse of Narcotic Drugs’.</dd>
                        </dl>
                        <a href="https://www.mfds.go.kr/eng/brd/m_60/view.do?seq=72620" target="_blank" title="move" className="btn_outline_sub xsmall">
                          VISIT<span className="ico-arr-right" aria-hidden="true"></span>
                        </a>
                      </div>
                    </div>
                    <div className="resource-item">
                      <div className="thumbnail">
                        <img src="/fe/img/cms/en/resources_img05.png" alt="Narcotics Control Act" />
                      </div>
                      <div className="info-body">
                        <dl>
                          <dt>Narcotics Control Act</dt>
                          <dd>The Narcotics Control Act and its regulations provide a framework for an effective management of the narcotics and psychotropic drugs that may be harmful to an individual or to society when misused or abused. The Act states that all narcotic handlers shall report to the Minister of Food and Drug Safety regarding all narcotic handling information and provides law enforcement agencies with the authority to take action if they fail to follow the law.</dd>
                        </dl>
                        <a href="http://law.go.kr/LSW/eng/engLsSc.do?menuId=2&amp;section=lawNm&amp;query=narcotics+&amp;x=0&amp;y=0#liBgcolor32" target="_blank" title="move" className="btn_outline_sub xsmall">
                          VISIT<span className="ico-arr-right" aria-hidden="true"></span>
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