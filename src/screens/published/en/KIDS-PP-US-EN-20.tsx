import React, { useMemo } from 'react';
import { Box, Typography} from '@mui/material';
// import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_EN_20() {

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'Introduction of NNHR',
      children: [
        { key: '#', label: 'Introduction of NNHR' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-20" title="Introduction of NNHR" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>Introduction of NNHR</span>
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

                  <section className="pageCont-introNNHR">
                    <h3 className="section-title">Narcotics Control Act In Korea</h3>
                    <div className="section-desc">
                      <dl className="list-definition-plain">
                        <dt className="txt-2">1) Narcotic drugs</dt>
                        <dd>
                          <ul>
                            <li>(a) Poppy, Opium, Coca leaves</li>
                            <li>(b) All alkaloids extracted from poppy, opium, coca leaves and chemical compounds similar thereto, as determined by Presidential Decree</li>
                            <li>(c) Other chemical compounds equally likely to be abused or caused harmful effects</li>
                            <li>(d) A mixture or concoction that contains substances listed above</li>
                          </ul>
                        </dd>
                      </dl>
                      <dl className="list-definition-plain">
                        <dt className="txt-2">2) Psychotropic drugs</dt>
                        <dd>
                          <p className="class-desc">A drug or a substance that falls under any of the following items</p>
                          <ul>
                            <li>(a) High potential for misuse or abuse and currently has no accepted medical use in treatment</li>
                            <li>(b) High potential for misuse or abuse and has a very limited medical use in treatment</li>
                            <li>(c) Relatively lower potential for misuse or abuse than those listed in items (a) and (b) and currently has an accepted medical use in medical treatment</li>
                            <li>(d) Relatively lower potential for misuse or abuse than the drug or substance listed in item (c) and currently has an accepted medical use in treatment</li>
                            <li>(e) A mixture or concoction that contains drugs or substances listed in items (a) through (d)</li>
                          </ul>
                        </dd>
                      </dl>
                      <dl className="list-definition-plain">
                        <dt className="txt-2">3) Marijuana</dt>
                        <dd>
                          <p className="class-desc">Any of the following substances excluding the seeds and roots of the hemp plant, the mature stalks of such plant, and the products manufactured using them</p>
                          <ul>
                            <li>(a) The hemp plant or its resin</li>
                            <li>(b) All the products manufactured using the hemp plant or its resin</li>
                            <li>(c) Chemical compounds or mixture, similar to those specified in item (a) or item (b)</li>
                            <li>(d) A mixture or concoction that contains substances specified in items (a) through (c)</li>
                          </ul>
                          <p className="notice-txt">* Only some of cannabinol derivatives were approved as orphan drugs in Korea</p>
                        </dd>
                      </dl>
                    </div>
                    <h3 className="section-title">Narcotics Handling Report System</h3>
                    <div className="section-desc">
                      <div className="report-system-content">
                        <p className="article-info">
                          Narcotics Control Act ------------ Article 11 (Report of Handling Narcotics)
                        </p>
                        <p className="system-summary">
                          A person handling narcotics or a person who has obtained approval for handling narcotics shall, whenever narcotics or psychotropic drugs are exported and imported, manufactured, sold, taken over, transferred, purchased, used, discarded, compounded, administered, provided for administration, or used for academic research, report to the Minister of Food and Drug Safety.
                        </p>
                        <p className="report-details">
                          The report should contain matters regarding the names, quantities, dates of use, place of purchase, the total stock, serial number, name of the counter party concerned (if an animal is subject to the compounding or administration of narcotics or psychotropic drugs, it means its owner) etc.
                        </p>
                        <div className="practitioner-info">
                          <p className="info-label">A medical practitioner and a retailer shall report the following matters, except as otherwise expressly:</p>
                          <ul className="info-list">
                            <li>Patient ID number (resident registration number, passport number or foreign registration number)</li>
                            <li>Disease classification code or name of disease</li>
                            <li>Information of prescription (name of prescriber and license number, name of business etc)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <h3 className="section-title">Role of KIDS</h3>
                    <div className="section-desc">
                      <p>In July 2015, KIDS was designated as the Center for Narcotics Information Management under the Narcotics Control Act. Since then, KIDS proactively operates a narcotics monitoring system called the ‘Narcotics Information Management System (NIMS)’ which collects data from the whole life-cycle of medical narcotics and psychotropic drugs. The collected big data of all handling information of narcotics and psychotropic drugs are standardized, analyzed and provided for research and education purposes. KIDS provide regular education and training for healthcare professionals and linkage guidance to healthcare software developers. KIDS also conduct risk prevention and narcotics management measures to prevent abuse and misuse of drugs and to promote safer public healthcare system.</p>
                    </div>
                    <div className="img-switcher">
                      <img src="/img/cms/en/introNNHR_img01.png" alt="Role of KIDS" className="responsive-img pc-only"/>
                      <img src="/img/cms/en/introNNHR_img01_m.png"  alt="" aria-hidden="true" className="responsive-img mo-only"/>
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