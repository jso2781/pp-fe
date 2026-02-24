import React, { useMemo } from 'react';
import { Box, Typography} from '@mui/material';
// import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_EN_09() {

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'APEC CoE',
      children: [
        { key: '#', label: 'APEC CoE' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-09" title="APEC CoE" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>APEC CoE</span>
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

                  <section className="pageCont-APECCoE">
                    <div className="video-area">
                      <div className="video-box">
                        {/* 제목 제공 (aria-label) */}
                        <video 
                          id="myVideo" 
                          width="886" 
                          height="502" 
                          controls
                          preload="metadata"
                          aria-label="KIDS-APEC PV Training Website Link Banner" 
                          poster="/img/APECCoE_video_thumbnail.png" // 미리보기 이미지 제공
                        >
                          <source src="/video/.mp4" type="video/mp4" />
                          {/* 자막 파일 제공 */}
                          <track 
                            kind="captions" 
                            src="#" 
                            srcLang="en" 
                            label="영어 자막" 
                            default 
                          />
                          {/* 비디오 미지원 브라우저용 대체 텍스트 */}
                          <div className="v-fallback">
                            <p>사용 중인 브라우저에서 비디오를 재생할 수 없습니다.</p>
                            <a href="/video/20161220marketing.mp4" download>영상 파일 다운로드</a>
                          </div>
                        </video>
                      </div>

                      {/* 비디오 스크립트 제공 */}
                      <div className="video-transcript">
                        <div className="sr-only">
                        </div>
                      </div>
                    </div>
                    <div className="mb40"></div>

                    <h3 className="section-title">What is the APEC Pharmacovigilance Center of Excellence (CoE)?</h3>
                    <div className="section-desc">
                      <p>The APEC Pharmacovigilance Center of Excellence (CoE) is a capacity-building program established
                          to support the development and strengthening of pharmacovigilance systems among APEC
                          economies.</p>
                      <p>The CoE serves as a platform for regulatory authorities and government-affiliated institutions to
                        share knowledge, experiences, and best practices in post-marketing drug safety, with the aim of
                        promoting regulatory convergence and protecting public health.</p>
                    </div>
                    <h3 className="section-title">Background and Governance</h3>
                    <div className="section-desc">
                      <p>The Pharmacovigilance CoE operates under the Roadmap of the APEC Regulatory Harmonization Steering Committee (RHSC).</p>
                      <p>Within the RHSC framework, pharmacovigilance is designated as a Priority Work Area (PWA), championed by the Ministry of Food and Drug Safety (MFDS) of the Republic of Korea.</p>
                      <p>The program is hosted by the Korea Institute of Drug Safety and Risk Management (KIDS), the national institution responsible for post-marketing drug safety in the Republic of Korea.</p>
                      <p>KIDS was designated as the formal CoE host institution in 2017, based on its expertise in adverse
                        drug event reports, assessing drug safety information, performing causality assessments,
                        disseminating safety information and providing education to the healthcare professionals as well as
                        the public.</p>
                    </div>
                    <h3 className="section-title">Background and Governance</h3>
                    <div className="section-desc">
                      <p>Centers of Excellence play a crucial role in sharing and disseminating knowledge and expertise, fostering advancements, and facilitating collaboration in their respective fields.</p>
                      <p>Primary objectives of a CoE are to:</p>
                      <ul className="list-bullet-3">
                        <li>build skilled human capacity in regulatory sciences to bring safe, effective, and quality medical products to patients and people as quickly as possible</li>
                        <li>promote dialogue to share understanding in science and best practices</li>
                        <li>achieve a model of sustainable operation that includes periodic updates to maintain regulatory relevancy of materials and ensures continued value to all participating entities</li>
                        <li>avoid duplication of efforts and leverage work that already exists and has a level of convergence</li>
                      </ul>
                    </div>
                    <h3 className="section-title">Goals of the ‘KIDS-APEC PV Training’</h3>
                    <div className="section-desc">
                      <p>The primary goals of the ‘KIDS-APEC PV Training’ are to</p>
                      <ul className="list-bullet-3">
                        <li>provide a forum to facilitate understanding of the current pharmacovigilance activities in different APEC regions and beyond</li>
                        <li>implement effective measures and system to promote global public health</li>
                        <li>strengthen the pharmacovigilance capacity of regulatory and public bodies and build capacity to improve the pharmacovigilance system</li>
                      </ul>
                    </div>
                    <h3 className="section-title">Program Archive</h3>
                    <p>Information on past CoE training programs, agendas, and related materials is available in the Archive section of this website.</p>
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