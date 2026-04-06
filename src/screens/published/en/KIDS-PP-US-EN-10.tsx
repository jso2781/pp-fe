import React, { useMemo } from 'react';
import { Box, Typography} from '@mui/material';
// import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_EN_10() {

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'Introduction of RPVC',
      children: [
        { key: '#', label: 'Introduction of RPVC' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-10" title="Introduction of RPVC" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>Introduction of RPVC</span>
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

                  <section className="pageCont-introRPVC">
                    <div className="section-desc">
                      <ul className="list-bullet-2">
                        <li>In Korea, pharmacovigilance system is operated on a decentralized basis.</li>
                        <li>In this system, a central center functions as the focal point for regional centers and collects data from each  regional center. These regional centers are called Regional Pharmacovigilance Center (RPVC).</li>
                        <li>There are 27 RPVCs since 2014, which are 26 local teaching hospitals and one nationwide RPVC. The nationwide  RPVC is Korea Pharmaceutical Association, which is linked with nationwide pharmacies respectively.</li>
                        <li>In 2020, one RPVC for Korean Herbal Medicines was added.</li>
                      </ul>
                    </div>
                    <div className="img-switcher">
                      <img src="/fe/img/cms/en/introRPVC_img01.png" alt="" className="responsive-img pc-only"/>
                      <img src="/fe/img/cms/en/introRPVC_img01_m.png"  alt="" aria-hidden="true" className="responsive-img mo-only"/>
                    </div>
                    <div className="mb40"></div>
                    <ul className="list-bullet-2">
                      <li>Each RPVC monitors AE reports within the center and also outside reports from local clinics and pharmacies. It  performs an intensive monitoring on special populations (pediatrics, geriatrics, etc) or special medicinal products  designated by MFDS (Ministry of Food and Drug Safety) and offers consultations to reporters and consumers as  well. Finally, it emphasizes education and promotional campaigns to stimulate the pharmacovigilance  activities.</li>
                    </ul>
                    <div className="mb40"></div>
                    <div className="img-switcher">
                      <img src="/fe/img/cms/en/introRPVC_img02.png" alt="" className="responsive-img pc-only"/>
                      <img src="/fe/img/cms/en/introRPVC_img02_m.png"  alt="" aria-hidden="true" className="responsive-img mo-only"/>
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