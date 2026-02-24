import React, { useMemo, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../../ScreenShell';

export default function KIDS_PP_US_PI_09() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/',  
      label: '부작용인과관계규명' 
    },
  ], []);


  return (
    <ScreenShell screenId="KIDS-PP-US-PI-09" title="부작용인과관계규명" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>부작용인과관계규명</span>
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

                  <section className="pageCont-SafetyCausality">
                    <h3 className="section-title">인과관계 규명을 위한 약물역학조사·연구 실시</h3>
                    <div className="section-desc">
                      <p>아래와 같은 의약품안전성문제가 제기되면, 원인을 파악하여 문제를 해결하기 위한 "부작용인과관계규명연구"를 실시하게 됩니다. 우리나라 인구를 기반으로 해당 안전성문제의 과거 발생여부와 발생규모를 파악하고, 원인약물과 부작용간의 인과관계를 확인하기 위한 약물역학조사연구를 실시하거나, 기존 수행된 개별연구를 체계적으로 수집·선정·정리하는 체계적문헌고찰을 수행합니다.</p>
                      <ul className="list-bullet-2">
                          <li>특정 약물복용군 또는 특정 시기에 집집하여 안전성 문제가 발생하는 경우</li>
                          <li>허가사항에 기재되지 않은 이상사례, 특히 입원이나 사망 등 중증도(severity$)와 위해의 중대성(seriousness$) 측면에서 임상적 중요성이 큰 경우</li>
                          <li>부작용 보고자료로부터 실마리정보가 도출된 경우</li>
                          <li>일반인구에서 극히 드물게 발생하는 중대한 사례가 발생한 경우</li>
                          <li>새로운 약물-약물간 상호작용 문제가 제기된 경우</li>
                          <li>이전에 인지되지 못한 위험인구집단이 의심되는 경우(예. 특정 질환 동반자)</li>
                          <li>집중모니터링 대상 안전성 문제가 발견되는 경우 등</li>
                          <li>국내외 문헌 등 그 외 경로로 의약품 안전성 문제가 제기되는 경우</li>
                      </ul>
                      <div className="mb24"></div>
                      <div className="img-switcher">
                        <img src="/img/cms/safetyCausality_img01.png" alt="의약품안전성문제 관리 흐름도" className="responsive-img"/>
                      </div>
                    </div>

                    <h3 className="section-title">약물역학조사연구 방법</h3>
                    <div className="section-desc">
                      <dl className="list-definition">
                        <dt>연구설계</dt>
                        <dd>
                          <p>약물과 이상사례의 인과성을 과학적으로 평가하기 위하여, 약물 노출/비노출 연구대상자를 추적·관찰하여, 결과변수 발생을 
                            비교하는 코호트 연구설계, 부작용 발생/미발생 환자에서 약물노출을 비교하는 환자-대조군 연구설계 등을 적용할 수 
                            있습니다.</p>
                        </dd>
                      </dl>
                      <div className="base-table-container mb5">
                        <div className="table-responsive has-scroll">
                          <table className="base-table">
                            <caption className="sr-only">약물역학조사연구 방법 목록</caption>
                            <colgroup>
                              <col style={{ width: '20%' }} />
                              <col />
                              <col style={{ width: '22%' }} />
                              <col style={{ width: '15%' }} />
                            </colgroup>
                            <thead>
                              <tr>
                                <th scope="col">구분(intervention)</th>
                                <th scope="col">연구설계</th>
                                <th scope="col">구분(인과관계)</th>
                                <th scope="col">설득력의 크기</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row" rowSpan={5}>관찰적 연구</th>
                                <td>환자사례보고 (Case report)</td>
                                <td rowSpan={3}>기술적 연구 <br/>(관련성 평가, Association)</td>
                                <td>가장 약함</td>
                              </tr>
                              <tr>
                                <td>환자군연구 (Case series study)</td>
                                <td rowSpan={4}></td>
                              </tr>
                              <tr>
                                <td>단면 연구 (Cross-sectional study)</td>
                              </tr>
                              <tr>
                                <td>환자-대조군연구 (Case-control study)</td>
                                <td rowSpan={3}>분석적 연구 <br/>(인과성 평가, Causation)</td>
                              </tr>
                              <tr>
                                <td>코호트연구 (Cohort study)</td>
                              </tr>
                              <tr>
                                <th scope="row">실험적 연구</th>
                                <td>무작위배정 임상시험 (Randomized clinical trial)</td>
                                <td>가장 강함</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <p className="txt-3 mb24">*의약품-부작용 인과관계규명을 위한 약물역학연구설계</p>
                      <dl className="list-definition">
                        <dt>자료수집</dt>
                        <dd>
                          <p>약물역학조사는 직접 자료를 수집하거나, 이전에 구축된 자료원 (예. 보험청구자료, 의무기록자료, 사망원인통계 등 기구축된 전산데이터베이스)을 이차적으로 활용하여 수행됩니다.</p>
                        </dd>
                      </dl>
                      <div className="mb40"></div>
                      <dl className="list-definition-paren">
                        <dt>직접 자료수집</dt>
                        <dd>
                          <ul className="list-bullet-3">
                            <li>
                              약물노출, 부작용 발생 및 그 외 교란요인 등 임상정보를 상세히 파악하기 위하여 의료전문가 및 환자 조사, 임상기록 등의 심층조사를 실시합니다.
                            </li>
                            <li>
                              이차자료원으로 정보 파악이 어려운 경우(예. 일반의약품이거나 급여범위를 벗어나는 약물, 진단코드로 정의가 어려운 이상사례 등) 직접 자료를 수집하게 됩니다.
                            </li>
                            <li>
                              안전성 모니터링이 필요한 약물사용자 또는 약물이상반응 발생자에 대한 등록체계(registry)를 구축하여, 추후 인과관계 분석 시 임상정보를 유용하게 활용할 수 있습니다.
                            </li>
                          </ul>
                        </dd>
                        <dt>이차자료원 활용</dt>
                        <dd>
                          <ul className="bullet-list">
                            <li>
                              대규모 인구집단을 포괄하기 때문에 대표성이 높으며, 비교적 타당도 높은 정보를 단기간에 효율적으로 확보할 수 있습니다.
                            </li>
                            <li>
                              여러 자료원을 환자단위로 연계하여 의약품 사용과 암 발생, 사망 등 관련성에 대한 분석 수행이 가능합니다.
                            </li>
                            <li>
                              최근에는 병원자료를 기반으로 하는 CDM(공통데이터모델, Common Data Model)을 활용하여 약물역학연구를 실시하고 있으며, 이는 비급여 의약품이나 검사 등도 포함하고 있으므로 다른 이차원자료에 비해 풍부하고 정밀한 분석연구를 수행할 수 있습니다.
                            </li>
                          </ul>
                        </dd>
                      </dl>
                    </div>

                    <h3 className="section-title">자료평가 및 결론도출</h3>
                    <div className="section-desc">
                      <p className="txt-3">수집된 자료의 정리·통계분석을 통해 결과를 산출하고, 아래 기준에 따라 결론을 도출합니다. 약물이상사례 인과관계를 판정함으로써, 안전한 약물사용에 대한 정보를 제공합니다.</p>
                    </div>
                    <div className="base-table-container mb5">
                      <div className="table-responsive">
                        <table className="base-table">
                          <caption className="sr-only">자료평가 및 결론도출 목록</caption>
                          <colgroup>
                            <col style={{ width: '60%' }} />
                            <col />
                          </colgroup>
                          <thead>
                            <tr>
                              <th scope="col">Bradford Hill (1965년)</th>
                              <th scope="col">Surgeon General (1964년)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>관련성의 강도</td>
                              <td>Strength of the association</td>
                            </tr>
                            <tr>
                              <td>관련성의 일관성</td>
                              <td>Consistency of the association</td>
                            </tr>
                            <tr>
                              <td>관련성의 특이성</td>
                              <td>Specificity of the association</td>
                            </tr>
                            <tr>
                              <td>시간적 선후관계</td>
                              <td>Temporality of the association</td>
                            </tr>
                            <tr>
                              <td>양-반응관계 (Biological gradient)</td>
                              <td>-</td>
                            </tr>
                            <tr>
                              <td>그럴듯함 (Plausibility)</td>
                              <td>-</td>
                            </tr>
                            <tr>
                              <td>기존지식과 일치 정도</td>
                              <td>Coherence of the association</td>
                            </tr>
                            <tr>
                              <td>실험적 조작 또는 예방효과의 가능성 (Experimental evidence)</td>
                              <td>-</td>
                            </tr>
                            <tr>
                              <td>유사성 (Analogy)</td>
                              <td>-</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <p className="txt-3 mb24">참고문헌 : 안윤옥,유근영,박병주,김동현,배종면,강대희,신명희,이무송. 역학의 원리와 응용. 초판: 서울대학교출판부; 2005.</p>
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
