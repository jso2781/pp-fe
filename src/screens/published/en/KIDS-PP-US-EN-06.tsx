import React, { useMemo } from 'react';
import { Box, Typography} from '@mui/material';
// import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_EN_06() {

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'Contact Us',
      children: [
        { key: '#', label: 'Contact Us' }
      ] 
    }
  ], []);

  return (
    // <ScreenShell screenId="KIDS-PP-US-EN-06" title="Contact Us" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>Contact Us</span>
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

                  <section className="pageCont-contactUs">
                    <h3 className="section-title">Location</h3>
                    <div className="img-switcher">
                      <img src="/fe/img/cms/en/contactUs_img01.png" alt="" className="responsive-img"/>
                    </div>
                    <div className="location-contact-list">
                      <div className="contact-item">
                        <span className="item-label">Address</span>
                        <div className="item-value">5th Fl., 30, Burim-ro 169beon-gil, Dongan-gu, Anyang-si, Gyeonggi-do, Republic of Korea</div>
                      </div>

                      <div className="contact-item">
                        <span className="item-label">ADR call center</span>
                        <div className="item-value">+82-2-1644-6223</div>
                      </div>

                      <div className="contact-item">
                        <span className="item-label">Address</span>
                        <div className="item-value">Institute of Drug Safety & Risk Management. 5th floor, 30 Burim-ro, 169beon-gil, Dongan-gu, Anyang-si, Gyeonggi-do</div>
                      </div>

                      <div className="contact-item">
                        <span className="item-label">Tel.</span>
                        <div className="item-value">+82-2-2172-6700</div>
                      </div>

                      <div className="contact-item">
                        <span className="item-label">E-MAIL</span>
                        <div className="item-value">kids@drugsafe.or.kr</div>
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