import React, { useMemo } from 'react';
import { Box, Typography} from '@mui/material';
// import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_EN_11() {

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'History of RPVC',
      children: [
        { key: '#', label: 'History of RPVC' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-11" title="History of RPVC" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>History of RPVC</span>
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

                  <section className="pageCont-historyRPVC">
                    <h3 className="section-title">Number of RPVCs</h3>
                    <div className="section-desc">
                      <ul className="list-bullet-2">
                        <li>Starting from 3 RPVCs designated from KFDA (now, MFDS) in 2006, the number of centers gradually increased to  6 in 2007 and to 9 in 2008. By 2011, it increased to 20 centers through Pharmacovigilance Research  Network (PVNet).</li>
                        <li>Since 2012, the Korea Institute of Drug Safety and Risk Management (KIDS) has taken on the role of a central center that manages all RPVCs, including 22 RPVCs in 2013 and 27 RPVCs in 2019</li>
                        <li>Since 2020, with the new RPVC for Korean Herbal Medicines, KIDS manages a total of 28 RPVCs.</li>  
                      </ul>
                    </div>
                    <div className="img-switcher">
                      <img src="/fe/img/cms/en/historyRPVC_img01.png" alt="" className="responsive-img"/>
                    </div>
                    <h3 className="section-title">RPVCs Location Status</h3>
                    <p className="fs-18 fw-700 mb20">28 sites in total, As of 2025)</p>
                    <div className="locationStatus">
                      <div className="region-group seoul">
                        <p className="region-name">Seoul (8)</p>
                        <ul>
                          <li>The Catholic Univ. of Korea Seoul St. Mary's Hospital</li>
                          <li>Korea Univ. Guro Hospital</li>
                          <li>Samsung Medical Center</li>
                          <li>Seoul National Univ. Hospital</li>
                          <li>Asan Medical Center</li>
                          <li>Severance Hospital</li>
                          <li>Chung-Ang Univ. Hospital</li>
                          <li>Hanyang Univ. Hospital</li>
                        </ul>
                      </div>

                      <div className="region-group gyeonggi-incheon">
                        <p className="region-name">Gyeonggi, Incheon (4)</p>
                        <ul>
                          <li>Seoul National Univ. Bundang Hospital</li>
                          <li>Ajou Univ. Hospital</li>
                          <li>Inha Univ. Hospital</li>
                          <li>Hallym Univ. Dongtan Sacred Heart Hospital</li>
                        </ul> 
                      </div>

                      <div className="region-group daejeon-chungcheong type02">
                        <p className="region-name">Daejeon, Sejong, Chungcheong (3)</p>
                        <ul>
                          <li>Dankook Univ. Hospital</li>
                          <li>Chungnam National Univ. Hospital</li>
                          <li>Chungbuk National Univ. Hospital</li>
                        </ul>
                      </div>

                      <div className="region-group gwangju-jeolla-jeju type02">
                        <p className="region-name">Gwangju, Jeolla, Jeju (3)</p>
                        <ul>
                          <li>Jeonbuk National Univ. Hospital</li>
                          <li>Chonnam National Univ. Hospital</li>
                          <li>Chosun Univ. Hospital</li>
                        </ul>
                      </div>
                     
                      <div className="region-group pharmacy type03">
                        <p className="region-name">Pharmacy Network (1)</p>
                        <ul>
                          <li>Korean Pharmaceutical Association</li>
                        </ul>
                      </div>

                      <div className="region-group public-medical type03">
                        <p className="region-name">Public Medical Institution Center (1)</p>
                        <ul>
                          <li>National Medical Center</li>
                        </ul>
                      </div>

                      <div className="region-group oriental-medicine type03">
                        <p className="region-name">Oriental medicine (Herbal medicine) Formulation Center (1)</p>
                        <ul>
                          <li>Dongguk Univ. Ilsan Oriental Hospital</li>
                        </ul>
                      </div>

                      <div className="region-group gangwon">
                        <p className="region-name">Gangwon (1)</p>
                        <ul>
                          <li>Hallym Univ. Chuncheon Sacred Heart Hospital</li>
                        </ul>
                      </div>

                      <div className="region-group daegu-gyeongbuk">
                        <p className="region-name">Deagu, Gyeongbuk (2)</p>
                        <ul>
                          <li>Kyungpook National Univ. Hospital</li>
                          <li>Keimyung Univ. Dongsan Hospital</li>
                        </ul>
                      </div>

                      <div className="region-group busan-ulsan-gyeongnam">
                        <p className="region-name">Busan, Ulsan, Gyeongnam (4)</p>
                        <ul>
                          <li>Dong-A Univ. Hospital</li>
                          <li>Pusan National Univ. Hospital</li>
                          <li>Ulsan Univ. Hospital</li>
                          <li>Inje Univ. Haeundae Paik Hospital</li>
                        </ul>
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