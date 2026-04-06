import React, { useMemo } from 'react';
import { Box, Typography} from '@mui/material';
// import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_EN_18() {

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'Introduction of ADR Relief System',
      children: [
        { key: '#', label: 'Introduction of ADR Relief System' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-18" title="Introduction of ADR Relief System" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>Introduction of ADR Relief System</span>
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

                  <section className="pageCont-introAdrRelf">
                    <h3 className="section-title">Adverse Drug Reaction(ADR) Relief System</h3>
                    <div className="section-desc">
                      <p>System to socially admit the risk of side effects due to drug and medical supplies, and to protect all of the victims, the drug manufacturers and the medical suppliers from serious damages that can happen to anyone even with a very low possibility.</p>
                    </div>
                    <h3 className="section-title">Progress of the ADR Relief System</h3>
                    <div className="section-desc">
                      <ul className="list-bullet-2">
                        <li>JUL 2013 : Initiation of amendments to the Pharmaceutical Affairs Act.</li>
                        <li>MAR 2014 : National Assembly adopt the amendment for enforcement of relief of injury from adverse drug  reaction</li>
                        <li>DEC 2014 : Implementation of receipt, investigation, indemnification of relief of injury from ADR</li>
                        <li>
                          <p>FEB 2015 : 2015 First-half year Allotment Collection</p>
                          <p className="txt-type-4">378 out of total 379 pharmaceuticals paid (Collection rate 99.7%)</p>
                        </li>
                        <li>
                          <p>APR 2015 : First payment decision on lump sum for death of compensation</p>
                          <p className="txt-type-4">Toxic epidermal necrolysis from lamotrigine and DRESS syndrome from carbamazepine</p>
                        </li>
                        <li>
                          <p>MAR 2016 : First payment decision on funeral cost</p>
                          <p className="txt-type-4">Toxic epidermal necrolysis from lamotrigine</p>
                        </li>
                        <li>
                          <p>DEC 2016 : First payment decision on lump sum for disability of compensation</p>
                          <p className="txt-type-4">Optic neuritis from ethambutol</p>
                        </li>
                        <li>
                          <p>APR 2017 : First payment decision on medical expenses(hospitalization) of compensation</p>
                          <p className="txt-type-4">Anaphylactic shock from diclofenac sodium</p>
                        </li>
                        <li>JUN 2019 : Expansion of compensation for Non-benefit medical expenses</li>
                        <li>AUG 2020 : Insurance coverage for HLA-B*5801 Gene test for allopurinol prescription</li>
                        <li>DEC 2020 : Pilot project for providing personalized DUR information for ADR relief</li>
                        <li>MAR 2023 : ADR relief for Emergency Use Authorization</li>
                        <li>JUN 2023 : Expansion of compensation targets through deductible payment for death lump-sum compensation </li>
                      </ul>
                    </div>
                    <h3 className="section-title">ADR Relief System Flow Chart</h3>
                    <div className="img-switcher">
                      <img src="/fe/img/cms/en/introAdrRelf_img01.png" alt="ADR Relief System Flow Chart" className="responsive-img pc-only"/>
                      <img src="/fe/img/cms/en/introAdrRelf_img01_m.png"  alt="" aria-hidden="true" className="responsive-img mo-only"/>
                    </div>
                    <h3 className="section-title">Types of Relief Benefits</h3>
                    <div className="img-switcher">
                      <img src="/fe/img/cms/en/introAdrRelf_img02.png" alt="Types of Relief Benefits" className="responsive-img pc-only"/>
                      <img src="/fe/img/cms/en/introAdrRelf_img02_m.png"  alt="" aria-hidden="true" className="responsive-img mo-only"/>
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