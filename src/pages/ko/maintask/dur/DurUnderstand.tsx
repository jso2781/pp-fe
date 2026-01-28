/**
 * 화면ID: KIDS-PP-US-DI-01
 * 화면명: DUR 이해
 * 화면경로: /maintask/dur/DurUnderstand
 * 화면설명: DUR 이해
 */
import React, { useMemo } from 'react';
import { Box, Typography, Link, Button} from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import KoglLicense from '@/components/common/KoglLicense';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// --- lnb ---
// const sideItems = useMemo(() => [
//   { 
//     key: '#', 
//     label: 'DUR 정보',
//     children: [
//       { key: '#', label: 'DUR 이해' }
//     ] 
//   }
// ], []);

export default function DurUnderstand() {
  return (
    <Box className="page-layout">
    <Box className="sub-container">
      <Box className="content-wrap">

        {/* Lnb 영역 */}
        <Box className="lnb-wrap">
          <Box className="lnb-menu">
            <Typography component="h2" className="lnb-tit">
              <span>DUR 정보</span>
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

              <section className="pageCont-dur-intro">
                <div className="info-summary-box">
                  <h3 className="info-summary-box__title">DUR (Drug Utilization Review)이란?</h3>
                  <div className="info-summary-box__desc">
                    <p>
                      의약품 적정사용(Drug Utilization Review, 이하 DUR)은 <strong>의약품을 병용하거나 소아·노인·임부·수유부에게 투여 시 
                      주의해야 할 정보를 사전에 알리고, 정해진 기준에 따라 약물 사용이 적절하게 이뤄지는지 점검하고 평가하는 
                      제도</strong>입니다.
                    </p>
                    <p>
                      부적절한 약물 사용을 사전에 방지함으로써 <strong>부작용을 예방</strong>하고 환자에게 제공하는 <strong>의료서비스의 질을 향상</strong>시키며
                      의약품을 <strong>안전하게 사용</strong>할 수 있는 환경을 조성하는데 그 목적이 있습니다.
                    </p>
                  </div>
                </div> 

                <h3 className="section-title">DUR 정보 제공 흐름</h3>
                <p className="section-desc">
                  현재 한국의약품안전관리원에서 개발한 DUR 정보는 식품의약품안전처 고시 및 공고 등의 형태로 전 국민에게 제공되고, 
                  건강보험심사평가원 DUR 전산시스템(의약품안전사용서비스)를 통해 의료현장에 제공됩니다.
                </p>

                <div className="img-switcher">
                  {/* PC용 이미지 */}
                  <img 
                    src="/img/dur_intro_img01.png" 
                    alt="한국의약품안전관리원 개발 정보가 식약처 고시를 거쳐 심평원 DUR 시스템으로 의료현장에 제공되는 과정 (PC)" 
                    className="responsive-img pc-only"
                  />
                  {/* 모바일용 이미지 */}
                  <img 
                    src="/img/dur_intro_img01_m.png" 
                    alt="한국의약품안전관리원 개발 정보가 식약처 고시를 거쳐 심평원 DUR 시스템으로 의료현장에 제공되는 과정 (모바일)" 
                    className="responsive-img mo-only"
                  />
                </div>

                <h3 className="section-title">DUR 정보 정의</h3>
                <ul className="definition-list">
                  {/* 1. 병용금기 */}
                  <li className="definition-list__item">
                    <div className="definition-list__icon">
                      <img src="/img/ico_dur_01.png" alt="병용금기 성분 아이콘" />
                    </div>
                    <div className="definition-list__text">
                      <span className="definition-list__title">1. 병용금기 성분</span>
                      <span className="definition-list__desc">
                        <strong>두 가지 이상의 의약품</strong>을 함께 사용하는 경우, 치료 효과의 변화 또는 심각한 부작용 발생 등의 우려가 있어 동시에 사용하지 않아야 하는 유효성분의 조합
                      </span>
                    </div>
                  </li>

                  {/* 2. 특정연령대 금기 */}
                  <li className="definition-list__item">
                    <div className="definition-list__icon">
                      <img src="/img/ico_dur_02.png" alt="특정연령대 금기 성분 아이콘" />
                    </div>
                    <div className="definition-list__text">
                      <span className="definition-list__title">2. 특정연령대 금기 성분</span>
                      <span className="definition-list__desc">
                        소아, 노인 등 특정연령대의 환자가 사용함에 있어 안전성이 확보되지 않았거나 심각한 부작용 발생 등의 우려가 있어 사용하지 않아야 하는 유효성분
                      </span>
                    </div>
                  </li>

                  {/* 3. 임부금기 */}
                  <li className="definition-list__item">
                    <div className="definition-list__icon">
                      <img src="/img/ico_dur_03.png" alt="임부금기 성분 아이콘" />
                    </div>
                    <div className="definition-list__text">
                      <span className="definition-list__title">3. 임부금기 성분</span>
                      <span className="definition-list__desc">
                        태아에게 매우 심각한 위해성(태아기형 또는 태아독성 등)을 유발하거나 유발할 가능성이 높아 임부에게 사용하는 것이 권장되지 않는 유효성분
                      </span>
                    </div>
                  </li>

                  {/* 4. 용량주의 */}
                  <li className="definition-list__item">
                    <div className="definition-list__icon">
                      <img src="/img/ico_dur_04.png" alt="용량주의 성분 아이콘" />
                    </div>
                    <div className="definition-list__text">
                      <span className="definition-list__title">4. 용량주의 성분</span>
                      <span className="definition-list__desc">
                        성인에게 특정 용량 초과 시 효과의 증가는 기대하기 어렵고 용량의존적 부작용 발생 가능성이 높아져 1일 최대용량에 대한 주의가 필요한 유효성분
                      </span>
                    </div>
                  </li>

                  {/* 5. 투여기간주의 */}
                  <li className="definition-list__item">
                    <div className="definition-list__icon">
                      <img src="/img/ico_dur_05.png" alt="투여기간주의 성분 아이콘" />
                    </div>
                    <div className="definition-list__text">
                      <span className="definition-list__title">5. 투여기간주의 성분</span>
                      <span className="definition-list__desc">
                        특정 투여기간 초과 시 효과의 증가는 기대하기 어렵고 부작용 발생 가능성이 높아져 1회 최대 투여기간에 대한 주의가 필요한 유효성분
                      </span>
                    </div>
                  </li>

                  {/* 6. 효능군중복주의 */}
                  <li className="definition-list__item">
                    <div className="definition-list__icon">
                      <img src="/img/ico_dur_06.png" alt="효능군중복주의 성분 아이콘" />
                    </div>
                    <div className="definition-list__text">
                      <span className="definition-list__title">6. 효능군중복주의 성분</span>
                      <span className="definition-list__desc">
                        약리기전이 동일하거나 유사한 효능군 내에서 중복 투여할 때 추가적인 효과의 증가는 기대하기 어렵고 부작용 발생 가능성이 높아져 주의가 필요한 유효성분
                      </span>
                    </div>
                  </li>

                  {/* 7. 노인주의 */}
                  <li className="definition-list__item">
                    <div className="definition-list__icon">
                      <img src="/img/ico_dur_07.png" alt="노인주의 성분 아이콘" />
                    </div>
                    <div className="definition-list__text">
                      <span className="definition-list__title">7. 노인주의 성분</span>
                      <span className="definition-list__desc">
                        노인에서 부작용 발생 빈도 증가 등의 우려가 있어 주의가 필요한 유효성분
                      </span>
                    </div>
                  </li>

                  {/* 8. 수유부주의 */}
                  <li className="definition-list__item">
                    <div className="definition-list__icon">
                      <img src="/img/ico_dur_08.png" alt="수유부주의 성분 아이콘" />
                    </div>
                    <div className="definition-list__text">
                      <span className="definition-list__title">8. 수유부주의 성분</span>
                      <span className="definition-list__desc">
                        수유 중의 소아에게 부작용 발생 등의 우려가 있어 수유부에게 사용 시 주의가 필요한 유효성분
                      </span>
                    </div>
                  </li>

                  {/* 9. 분할주의 */}
                  <li className="definition-list__item">
                    <div className="definition-list__icon">
                      <img src="/img/ico_dur_09.png" alt="분할주의 의약품 아이콘" />
                    </div>
                    <div className="definition-list__text">
                      <span className="definition-list__title">9. 분할주의 의약품</span>
                      <span className="definition-list__desc">
                        단위의 제형을 분할하여 복용할 경우 약효를 기대하기 어려운 의약품
                      </span>
                    </div>
                  </li>
                </ul>

                <h3 className="section-title">DUR 정보 현황</h3>
                <div className="base-table-container">
                  <div className="base-table-meta">
                    <p className="update-date">(2025.07.14 기준)</p>
                  </div>
                  
                  <div className="table-responsive">
                    <table className="base-table">
                      <caption className="sr-only">DUR 정보 유형별 건수 및 고시/공고 현황</caption>
                      <colgroup>
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '45%' }} />
                        <col style={{ width: '30%' }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope="col" colSpan={2}>정보 유형</th>
                          <th scope="col">정보 건수</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row" rowSpan={3}>금기성분 고시</th>
                          <td>병용금기 (2004년~)</td>
                          <td>1,450</td>
                        </tr>
                        <tr>
                          <td>특정연령대금기 (2004년~)</td>
                          <td>207</td>
                        </tr>
                        <tr>
                          <td>임부금기 (2008년~)</td>
                          <td>1,210</td>
                        </tr>

                        <tr>
                          <th scope="row" rowSpan={6}>주의성분 공고</th>
                          <td>효능군중복주의 (2013년~)</td>
                          <td>392</td>
                        </tr>
                        <tr>
                          <td>용량주의 (2014년~)</td>
                          <td>331</td>
                        </tr>
                        <tr>
                          <td>투여기간주의 (2014년~)</td>
                          <td>60</td>
                        </tr>
                        <tr>
                          <td>노인주의 (2015년~)</td>
                          <td>108</td>
                        </tr>
                        <tr>
                          <td>수유부주의 (2024년~)</td>
                          <td>180</td>
                        </tr>
                        <tr>
                          <td>분할주의 (2015년~)</td>
                          <td>2,262(품목기준)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <h3 className="section-title">의약품 적정사용 자료 개발 및 홍보</h3>
                <div className="info-action-list">
                  <div className="info-action-item">
                    <div className="info-action-item__text-group">
                      <strong className="info-action-item__title">
                        <span className="info-action-item__tag">[전문가 대상]</span> 의약품 적정사용 정보집
                      </strong>
                      <p className="info-action-item__desc">
                        전문가를 위한 의약품 안전사용 정보집을 발간하고 의약품 처방 조제 시 참고자료로 활용하도록 하고 있습니다.
                      </p>
                    </div>
                    <div className="info-action__btn">
                      <Button 
                        variant="text" 
                        className="btn-link" 
                        endIcon={<ChevronRightIcon />}
                      >
                        바로가기
                      </Button>
                    </div>
                  </div>

                  <div className="info-action-item">
                    <div className="info-action-item__text-group">
                      <strong className="info-action-item__title">
                        <span className="info-action-item__tag">[대국민 대상]</span> 의약품 안전사용 교육자료
                      </strong>
                      <p className="info-action-item__desc">
                        전문가뿐 아니라 대국민 대상으로 다양한 주제의 의약품 안전사용 교육자료를 개발 배포함으로써 안전한 의약품 사용문화 조성에 이바지하고 있습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </section> 

              {/* 공공(KOGL) 저작물 */}
              <KoglLicense />

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
  )
}
