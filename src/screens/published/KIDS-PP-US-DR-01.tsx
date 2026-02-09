import React, { useMemo, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../ScreenShell';

export default function KIDS_PP_US_DR_01() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/',  
      label: '피해구제' 
    },
  ], []);

  // 앵커탭
  useEffect(() => {
    const handleAnchorScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('.category-anchor-tabs .tab-link') as HTMLAnchorElement | null;
      
      if (!link) return;

      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault(); 

          const tabContainer = link.closest('.category-anchor-tabs');
          if (tabContainer) {
            const allTabs = tabContainer.querySelectorAll('.tab-link');
            
            allTabs.forEach((tab) => {
              tab.classList.remove('active');
              tab.setAttribute('aria-selected', 'false');
            });

            link.classList.add('active');
            link.setAttribute('aria-selected', 'true');
          }

          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };
    document.addEventListener('click', handleAnchorScroll);
    return () => {
      document.removeEventListener('click', handleAnchorScroll);
    };
  }, []);

  return (
    <ScreenShell screenId="KIDS-PP-US-DR-01" title="피해구제" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>피해구제</span>
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

                  <section className="pageCont-reliefIntro">
                      <div className="info-summary-box">
                        <h3 className="info-summary-box__title">피해구제 제도란?</h3>
                        <div className="info-summary-box__desc">
                          <p>의약품 부작용으로 사망, 장애, 질병피해를 입은 유족 및 환자에게 사망일시보상금,장애일시보상금, 진료비 및 장례비를 지급하는 사업입니다.</p>
                        </div>
                      </div> 
                      <div className="category-anchor-tabs" aria-label="카테고리 이동">
                      <ul className="tabs-list" role="tablist">
                        <li className="tab-item" role="none">
                          <a href="#anchor-sec1" id="tab1" className="tab-link active" role="tab" aria-selected="true" aria-controls="anchor-sec1">사업 운영체계 및 절차</a>
                        </li>
                        <li className="tab-item" role="none">
                          <a href="#anchor-sec2" id="tab2" className="tab-link" role="tab" aria-selected="false" aria-controls="anchor-sec2">보상범위</a>
                        </li>
                        <li className="tab-item" role="none">
                          <a href="#anchor-sec3" id="tab3" className="tab-link" role="tab" aria-selected="false" aria-controls="anchor-sec3">신청안내</a>
                        </li>
                        <li className="tab-item" role="none">
                          <a href="#anchor-sec4" id="tab4" className="tab-link" role="tab" aria-selected="false" aria-controls="anchor-sec4">신청서류</a>
                        </li>
                        <li className="tab-item" role="none">
                          <a href="#anchor-sec5" id="tab5" className="tab-link" role="tab" aria-selected="false" aria-controls="anchor-sec5">신청방법</a>
                        </li>
                      </ul>
                    </div>
                    {/* 탭 컨텐츠 */}
                    <div className="anchor-contents-area">
                      <section id="anchor-sec1" className="tab-section" role="tabpanel" tabIndex={0} aria-labelledby="tab1">
                        <div className="inner-box">
                          <h3 className="section-title">사업 운영체계 및 절차</h3>
                          <div className="section-desc">
                            <div className="org-list">
                              <div className="org-info-box item1">
                                <div className="org-title-group">
                                  <strong className="org-title">주관기관</strong>
                                  <span className="org-name">식품의약품안전처</span>
                                </div>
                                <p className="org-desc">의약품부작용 피해구제 사업관리 및 의약품부작용 심의위원회 운영 등</p>
                              </div>
                              <div className="org-info-box item2">
                                <div className="org-title-group">
                                  <strong className="org-title">운영기관</strong>
                                  <span className="org-name">한국의약품안전관리원</span>
                                </div>
                                <p className="org-desc">의약품부작용 피해구제 신청 접수, 피해조사 및 피해 구제 급여 지급 관리 등</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section id="anchor-sec2" className="tab-section" role="tabpanel" tabIndex={0} aria-labelledby="tab2">
                        <div className="inner-box">
                          <h3 className="section-title">보상범위</h3> 
                          <div className="section-desc">
                            <dl className="list-definition">
                              <dt>보상금의 종류</dt>
                              <dd>
                                <ul className="list-bullet-3">
                                  <li>피해 유형에 따라 사망일시보상금, 장애일시보상금, 장례비, 진료비 등 4종으로 나누어 지급</li> 
                                </ul>
                              </dd>
                            </dl>
                            <div className="base-table-container">
                              <div className="table-responsive">
                                <table className="base-table">
                                  <caption className="sr-only">보상범위 산정기준</caption>
                                  <colgroup>
                                    <col style={{ width: '25%' }} />
                                    <col  />
                                  </colgroup>
                                  <thead>
                                    <tr>
                                      <th scope="col">구분</th>
                                      <th scope="col">산정기준</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <th scope="row" className="th2">진료비</th>
                                      <td className="tal">
                                        <p className="mb20">입원치료가 필요하여 입원을 하거나 이와 같은 정도 이상의 상태에 해당하여 의료기관에서 통상적인 치료를 받은 경우 그 치료에 드는 비용 중 다음 각 목의 구분에 따른 금액</p>

                                        <p className="mb20">가. 「국민건강보험법」 의 적용을 받는 경우 : 3천만원 이하의 범위에서 다음의 금액을 환산한 금액</p>

                                        <p>1) 「국민건강보험법」 제41조제1항의 요양급여에 대한 비용 중 같은 법 제44조제1항에 따라 요양 급여를 받는 자가 부담한 금액(같은 법 시행령 제19조제3항의 각 호에 따른 금액은 제외한다.) 다만, 같은 법 제44조제2항에 따른 본인부담상한액을 초과할 수 없다.</p>
                                        <p>2) 「국민건강보험법」 제41조제1항의 요양급여에 대한 비용 중 같은 법 시행령 제 19조제3항 각 호의 어느 하나에 해당하는 금액</p>
                                        <p className="mb20">3) 「국민건강보험법」 제41조제1항에 따라 요양급여 대상에서 제외되는 사항에 대해 본인이 부담한 금액</p>

                                        <p className="mb20">나. 「의료급여법」의 적용을 받는 경우 : 3천만원 이하의 범위에서 다음의 금액을 환산한 금액</p>

                                        <p>1) 「의료급여법」 제7조제1항의 의료급여에 대한 비용 중 같은 법 제10조에 따라 본인이 부담한 금액(같은 법 시행령 제13조제3항에 따라 본인이 부담한 금액을 포함한다.)</p>
                                        <p className="mb20">2) 「의료급여법」 제7조제3항에 따라 의료급여 대상에서 제외되는 사항에 대해 본인이 부담한 금액</p>

                                        <p>*입원치료비 30만원 이상인 경우 신청 가능, 3천만원 이하의 범위에서 보상(‘24.12.6. 피해구제 신청건부터 적용)</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th scope="row" className="th2">사망일시보상금</th>
                                      <td className="tal">
                                        <p className="mb20">피해구제급여 지급 결정 당시 「최저임금법」 제10조제1항에 따라 고시된 최저임금의 월환산액의 5년치에 해당하는 금액. 다만, 사망과 다음 각 목의 요인 사이에 추가적인 인과관계가 인정되는 경우에는 본문에 따른 금액에 다음 각 목의 구분에 따른 비율을 곱한 금액을 본문에 따른 금액에서 각각 공제한 금액을 지급한다.</p>

                                        <p className="mb10">가. 피해자의 연령 : 20% 이내</p>

                                        <p className="mb10">나. 피해자의 기저질환 : 20%</p>

                                        <p className="mb20">다. 피해자의 경과실 등 그 밖에 사망의 발생 가능성을 증가시킨 요인 : 10%</p>

                                        <p>* 위 요인과 추가적인 인과관계가 인정되는 경우의 공제지급은 '23.6.29' 이후 의약품의 부작용으로 인하여 사망하는 경우 부터 적용</p>

                                      </td>
                                    </tr>
                                    <tr>
                                      <th scope="row" className="th2">장애일시보상금</th>
                                      <td className="tal">
                                        <p>제2호의 장애등급 기준에 따른 다음 각목의 금액</p>

                                        <p>가. 장애등급 1급: 사망일시보상금x1</p>

                                        <p>나. 장애등급 2급: 사망일시보상금x0.75</p>

                                        <p>다. 장애등급 3급: 사망일시보상금x0.5</p>

                                        <p>라. 장애등급 4급: 사망일시보상금x0.25</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th scope="row" className="th2">장례비</th>
                                      <td className="tal">
                                          <p>피해구제급여 지급 결정 당시 「국가배상법 시행령」 제4조에 따른 평균임금의 3개월치에 해당하는 금액</p>
                                      </td>
                                    </tr> 
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <dl className="list-definition">
                              <dt>보상 제외범위</dt>
                              <dd>
                                <ul className="list-bullet-3">
                                  <li>암이나 특수질병에 사용되는 의약품으로 인한 경우 <span className="fw-700">(의약품부작용 피해구제급여 지급 제외 대상 의약품의 지정고시)</span></li>
                                  <li>국가예방접종으로 인한 경우</li>
                                  <li>피해자의 고의 또는 중과실로 인한 경우</li>
                                  <li>「의료사고 피해구제 및 의료분쟁 조정 등에 관한 법률」에 따른 의료사고인 경우</li>
                                  <li>동일 사유로 민법이나 그 밖의 법령에 따라 구제급여를 이미 받은 경우</li>
                                  <li>전문 또는 일반의약품으로 분류되지 않는 의약품인 경우</li>
                                  <li>임상시험용 의약품인 경우</li>
                                  <li>약국제제 및 의료기관 조제실제제인 경우</li>
                                  <li>자가치료용 의약품인 경우</li>
                                  <li>혈액제제인 경우</li>
                                </ul>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </section>
                      <section id="anchor-sec3" className="tab-section" role="tabpanel" tabIndex={0} aria-labelledby="tab3">
                        <div className="inner-box">
                          <h3 className="section-title">신청안내</h3> 
                          <div className="section-desc">
                            <dl className="apply-info-row type-target">
                              <dt>신청대상</dt>
                              <dd>
                                <p> 2014년 12월 19일 이후부터 발생하는 의약품 부작용으로 인하여 질병에 걸리거나 장애가 발생한 사람 및 사망한 사람의 유족</p>
                                <p> (약사법, 2014.12.19. 시행) </p>
                                <p>*유족 : 배우자(사실혼 포함), 자녀, 부모, 손자녀, 조부모 및 형제자매 </p>
                              </dd>
                            </dl>
                            <dl className="apply-info-row type-period">
                              <dt>신청기간</dt>
                              <dd>
                                <ul className="list-bullet-3">
                                  <li>진료비 : 해당 진료가 있은 날부터 5년 이내</li>
                                  <li>사망일시보상금, 장애일시보상금, 장례비 : 장애가 발생하거나 사망한 날부터 5년 이내</li>
                                </ul>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </section>
                      <section id="anchor-sec4" className="tab-section" role="tabpanel" tabIndex={0} aria-labelledby="tab4">
                        <div className="inner-box">
                          <h3 className="section-title">신청서류</h3> 
                          <div className="section-desc">
                            <div className="base-table-container">
                              <div className="table-responsive">
                                <table className="base-table table-type-2">
                                  <caption className="sr-only">신청서류 목록</caption>
                                  <colgroup>
                                    <col />
                                    <col style={{ width: '120px' }} />
                                    <col style={{ width: '110px' }} />
                                  </colgroup>
                                  <tbody>
                                    <tr>
                                      <th scope="row" className="fw-700 tal">의약품 부작용 피해구제에 관한 규정 시행규칙 제 8조3항의 서류</th>
                                      <td>
                                         <button className="btn_outline_sub xsmall"><span className="ico-down"></span>다운로드</button>
                                      </td>
                                      <td>
                                        <button type="button" className="btn_outline_sub xsmall">견본</button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <p className="txt-4">의약품 부작용 피해구제급여 신청시, 이전에 지급 결정 통지를 받은 경우가 있다면 중복되는 서류가 있을 수 있으므로 확인바랍니다.</p>
                            <p><span className="ico-tel"></span>1644-6223(14-3330) </p>
                          </div>
                        </div>
                      </section>
                      <section id="anchor-sec5" className="tab-section" role="tabpanel" tabIndex={0} aria-labelledby="tab5">
                        <div className="inner-box">
                          <h3 className="section-title">신청방법</h3> 
                          <div className="section-desc">
                          <dl className="apply-info-row type-post">
                              <dt>우편신청</dt>
                              <dd>
                                <p>우편신청은 <span className="fw-700">제출서류</span>와 <span className="fw-700">제증빙서류</span>를 준비하여 한국의약품안전관리원으로 보내주시면 됩니다.</p>
                                <p>4051)경기도 안양시 동안구 부림로 169번길 22 2층 한국의약품안전관리원 의약품부작용피해구제팀</p>
                              </dd>
                            </dl>
                            <dl className="apply-info-row type-online">
                              <dt>온라인신청</dt>
                              <dd>
                                <p>온라인신청은 <span className="fw-700">제출서류와 증빙서류를 스캔 또는 pdf 등 보안이 유지되는 파일형식으로 저장</span>하시고 좌측 메뉴의 신청서 작성을 클릭하여 진행하시면 됩니다.</p>
                              </dd>
                            </dl>
                          </div>
                          <div className="btn-group-control right">
                            <button type="button" className="btn_default xsmall">회원가입</button>
                            <button type="button" className="btn_outline_sub xsmall"><span className="ico-down" aria-hidden="true"></span>민원신청 매뉴얼 다운로드</button>
                            <button type="button" className="btn_outline_sub xsmall">피해구제 민원신청 바로가기<span className="ico-arr-right" aria-hidden="true"></span></button>
                          </div> 
                        </div>
                        <div className="mb40"></div>
                        <h3 className="section-title">오시는길</h3> 
                        <div className="section-desc">
                          <div className="location-map">
                            <div className="img-switcher">
                              <img src="/img/reliefIntro_img01.png" alt="한국의약품안전관리원 오시는 길 지도" className="responsive-img pc-only"/>
                              <img src="/img/reliefIntro_img01_m.png" alt="" aria-hidden="true" className="responsive-img mo-only"/>
                            </div>
                            <div className="location-details">
                              <p className="detail-item">
                                <span className="label">주소</span>
                                <span className="text">경기도 안양시 동안구 부림로 169번길 22 2층 한국의약품안전관리원</span>
                              </p>
                              <p className="detail-item">
                                <span className="label">대표전화</span>
                                <span className="text">02-1644-6223</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </section>


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
