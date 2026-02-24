import React, { useMemo } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ScreenShell from '../../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import KoglLicense from '@/components/common/KoglLicense';
import { useAuth } from '@/contexts/AuthContext';

export default function KIDS_PP_US_DI_13() {
  const location = useLocation();
  const { getMenuInfo } = useAuth();
  const menuKoglCprgtTypeCd = getMenuInfo(location.pathname)?.menuKoglCprgtTypeCd ?? '4';

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'DUR 정보',
      children: [
        { key: '#', label: '내가 먹는 약의 DUR 정보' }
      ] 
    }
  ], []);

  //return <FormTemplate screenId="KIDS-PP-US-DI-13" title="의약품 적정사용 정보집" config={config} />
  return (
    <ScreenShell screenId="KIDS-PP-US-DI-13" title="의약품 적정사용 정보집" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>알림마당</span>
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

                  
                  <section className="pageCont-dur-ApprUseBook">
                    <ul className="list-bullet-2">
                      <li>식품의약품안전처와 한국의약품안전관리원에서는 전문가를 위한 의약품 적정사용 정보집을 발간하고 의약품 처방‧조제 시 참고자료로 활용하도록 하고 있습니다.</li>
                      <li>2009년에는 노인에 대한 의약품 적정사용 정보집, 2010년에는 임부에 대한 의약품 적정사용 정보집, 2011년에는 소아, 신질환 환자에 대한 의약품 적정사용 정보집, 2012년에는 간질환 환자에 대한 의약품 적정사용 정보집을 개발‧제공 하였습니다.</li>
                      <li>한국의약품안전관리원 개원 후 2015년에는 최신 의약품 정보를 바탕으로 노인에 대한 의약품 적정사용 정보집을 개정하였으며, 노인에서 다빈도로 쓰이는 의약품 등에 대한 정보를 보강하였습니다.</li>
                      <li>2017년에는 국내 신∙간질환 환자 수 증가에 따른 잠재적 위험 인구 증가 양상에 따라 신질환 및 간질환 환자에 대한 의약품 적정사용 정보집을 최신화하여 개정하였습니다.</li>
                      <li>2022년에는 소아·청소년에서 다빈도로 쓰이는 의약품을 반영하여 소아‧청소년 의약품 적정사용 정보집을 개정했습니다.</li>
                      <li>이와 같이 의약품 적정사용 정보집 발간 및 개정을 통해, 부작용에 취약한 환자에서 더욱 안전한 의약품 사용이 이루어질 수 있도록 도모하고 있습니다.</li>  
                    </ul>

                    <Box className="appr-use-book-download">
                      <p className="guide-txt">아래의 그림을 클릭하면 최신의 해당 정보집을 내려 받을 수 있습니다.</p>
                      <ul className="book-list">
                        <li>
                          <button type="button" className="btn-book">
                            <img src="/img/cms/ApprUseBook_img01.png" alt="소아·청소년 정보집" />
                            <p className="book-name">소아·청소년에 대한 의약품 적정사용 정보집(’22)</p>
                          </button>
                        </li>
                        <li>
                          <button type="button" className="btn-book">
                            <img src="/img/cms/ApprUseBook_img02.png" alt="어르신 정보집" />
                            <p className="book-name">어르신에 대한 의약품 적정사용 정보집(’22)</p>
                          </button>
                        </li>
                        <li>
                          <button type="button" className="btn-book">
                            <img src="/img/cms/ApprUseBook_img03.png" alt="임산부 정보집" />
                            <p className="book-name">임산부에 대한 의약품 적정사용 정보집(’22)</p>
                          </button>
                        </li>
                        <li>
                          <button type="button" className="btn-book">
                            <img src="/img/cms/ApprUseBook_img04.png" alt="특정 질환별 정보집" />
                            <p className="book-name">특정 질환별 의약품 적정사용 정보집(’23)</p>
                          </button>
                        </li>
                        <li>
                          <button type="button" className="btn-book">
                            <img src="/img/cms/ApprUseBook_img05.png" alt="가이드북" />
                            <p className="book-name">의약품 안전사용 가이드북(’24)</p>
                          </button>
                        </li>
                      </ul>
                    </Box>
                    <p className="desc-text">활용 시 출처표시 문구: “본 저작물은 한국의약품안전관리원에서 개발하여 공공누리 제4유형으로 개방한 ‘□□에 대한 의약품 적정사용 정보집’ 을 이용하였습니다."</p>
                  </section>

                  {/* 공공(KOGL) 저작물 */}
                  <KoglLicense menuKoglCprgtTypeCd={menuKoglCprgtTypeCd} />

                  <Box className="evaluation-box">
                    <fieldset className="evaluation-fieldset">
                      <legend className="evaluation-legend">현재 페이지의 콘텐츠에 만족하시나요? </legend>
                      <Box className="evaluation-group">
                        {[
                          { id: 'v-good', label: '매우 만족' },
                          { id: 'good', label: '만족' },
                          { id: 'normal', label: '보통' },
                          { id: 'bad', label: '불만족' },
                          { id: 'v-bad', label: '매우 불만족' }
                        ].map((item) => (
                          <div key={item.id} className="evaluation-item">
                            <input type="radio" id={item.id} name="page-eval" value={item.id} className="a11y-radio" />
                            <label htmlFor={item.id} className="evaluation-label">{item.label}</label>
                          </div>
                        ))}
                        <Button variant="contained" className="evaluation-btn">제출</Button>
                      </Box>
                    </fieldset>
                  </Box>

                  <Box className="contact-box">
                    <div className="info-item">
                      <span className="info-label">업무 담당 부서</span>
                      <span className="info-value">정보화팀</span>
                    </div>
                    
                    <div className="info-item">
                      <span className="info-label">업무 담당자</span>
                      <span className="info-value">하연경</span>
                    </div>
                    
                    <div className="info-item">
                      <span className="info-label">전화번호</span>
                      <span className="info-value">
                        <a href="tel:02-2172-6738" className="info-tel">02-2172-6738</a>
                        <span className="info-sub">(응대시간: 평일 09:00 - 17:00, 국경일 및 휴일 제외)</span>
                      </span>
                    </div>
                  </Box>

                  

                {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ScreenShell>
  );
}
