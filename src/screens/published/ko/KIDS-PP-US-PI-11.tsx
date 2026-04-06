import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../../ScreenShell';

export default function KIDS_PP_US_PI_11() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '의약품부작용보고원시자료' 
    },
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-PI-11" title="의약품부작용보고원시자료" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>의약품부작용보고 원시자료</span>
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

                  <section className="pageCont-OriReport">
                    <div className="box-type-2">
                      <p className="txt-icon-1 fw-500">이상사례·약물이상반응 중 다음 각 항목의 어느 하나에 해당하는 경우를 말합니다.</p>
                    </div>
                    <div className="mb30"></div>
                    <div className="info-summary-box">
                      <h3 className="info-summary-box__title">의약품이상사례보고시스템(KAERS)이란?</h3>
                      <div className="info-summary-box__desc">
                        <p>의약품등 투여 후 이상사례(부작용)가 발생하였을 때 이에 대한 <span className="fw-700">정보를 보고 및 관리할 수 있는 시스템</span>을 의미합니다.</p>
                        <p>한국의약품안전관리원은 KAERS로 수집된 이상사례(부작용)정보를 활용하여 <span className="fw-700">실마리정보 탐색 · 평가 및 안전성 정보 생산 · 제공하는 업무를 수행</span>하고 있습니다.</p>
                        <p>KAERS database는 국제 약물감시 프로그램과 호환되며 주기적으로 세계보건기구-약물부작용모니터링센터(웁살라모니터링센터)로 전송됩니다.</p>
                      </div>
                    </div> 

                    <h3 className="section-title">의약품부작용보고원시자료 제공범위</h3>  
                    <div className="section-desc">
                      <ul className="list-bullet-2">
                          <li>본 자료는 「개인정보보호법」에 의거하여 개인정보에 해당하는 사항은 포함되어 있지 않습니다.</li>
                          <li>개별 보고서를 식별하기 위한 고유번호는 난수화하여 제공되며, 이를 활용하여 테이블 간 연계가 가능합니다.</li>
                      </ul>
                    </div>

                    <h3 className="section-title">의약품부작용보고원시자료 요청자격</h3>
                    <div className="section-desc">
                      <dl className="list-definition">
                        <dt>연구/의료/공공기관</dt>
                        <dd>
                          <p>1) ‘대학 등 연구기관 및 의료기관(지역센터 등)’에서 의약품안전관리를 위한 목적으로 활용하고자 하는 경우</p>
                          <p>2) ‘국가 및 공공기관’에서 보건의료분야의 국민건강 증진을 위한 업무를 위해 특별히 요청하는 경우</p>
                          <p>※ 공공기관: 「공공기관의 정보공개에 관한 –법률」 제2조제3호에 따른 1) 국가기관, 2) 지방자치단체,</p>
                          <p>3) 「공공기관의 운영에 관한 법률」 제2조에 따른 공공기관, 4) 그 밖에 대통령령으로 정하는 기관</p>
                        </dd>
                      </dl>
                      <dl className="list-definition">
                        <dt>제조·수입업체</dt>
                        <dd>
                          <p>1) ‘안전관리책임자’가 해당 제조(수입)품목에 대한 자료를 요청하는 경우</p>
                          <p>2) ’안전관리책임자’가 ’타사 허가품목권자’에게 제공 동의를 받은 품목에 대한 자료를 요청하는 경우</p>
                        </dd>
                      </dl>
                    </div>

                    <h3 className="section-title">의약품부작용보고원시자료 제공절차</h3> 
                    <div className="section-desc">
                      <dl className="list-definition">
                        <dt>연구/의료/공공기관</dt>
                        <dd>
                          <p>1) 월말까지 자료 요청서 작성 및 제출</p>
                          <p>2) 익월 요청서 접수</p>
                          <p>3) 심의 및 심의결과 통지(접수일로부터 30일 이내)</p>
                          <p>4) 자료 추출 및 제공</p>
                          <p>* “보완 후 재심의” 통지 받는 경우, 이의신청 가능</p>
                        </dd>
                      </dl>
                      <div className="mb40"></div>
                      <div className="img-switcher">
                        <img src="/fe/img/cms/oriReport_img01.png" alt="의약품부작용보고원시자료 제공절차 연구·의료·공공기관 도식" className="responsive-img pc-only"/>
                        <img src="/fe/img/cms/oriReport_img01_m.png" alt="" aria-hidden="true" className="responsive-img mo-only"/>
                      </div>
                      <div className="mb24"></div>
                      <dl className="list-definition">
                        <dt>제조·수입업체</dt>
                        <dd>
                          <p>1) 자료 요청서 작성 및 제출</p>
                          <p>2) 순차적으로 검토 및 접수</p>
                          <p>3) 자료 추출 및 제공</p>
                        </dd>
                      </dl>
                      <div className="mb20"></div>
                      <div className="img-switcher">
                        <img src="/fe/img/cms/oriReport_img02.png" alt="의약품부작용보고원시자료 제공절차 제조·수입업체 도식" className="responsive-img pc-only"/>
                        <img src="/fe/img/cms/oriReport_img02_m.png" alt="" aria-hidden="true" className="responsive-img mo-only"/>
                      </div>
                    </div>

                    <h3 className="section-title">의약품부작용보고원시자료 활용 사전협의 및 활용결과 등록</h3> 
                    <div className="section-desc">
                      <p>원시자료를 이용하여 생산한 안전성정보 평가 결과를 외부에 발표하는 경우, 다음의 절차를 따라야 합니다.</p>  
                      <p className="txt-4">※ 원시자료 활용 사전협의 및 활용결과 등록에 관한 규정을 위반하는 경우 원시자료 이용이 제한될 수 있습니다.</p>
                      <div className="mb24"></div>
                      <dl className="list-definition-num">
                        <dt>사전협의</dt>
                        <dd>
                          <ul className="list-bullet-2">
                              <li>발표일 기준 최소 7일 전 한국의약품안전관리원과 사전 협의해야 합니다.</li>
                              <li>만약, 사전협의 없이 원시자료를 이용하여 생산한 안전성 정보 평가결과를 발표한 경우 사후 요청 및 사전협의 요청서 미제출 사유서를 제출해야 합니다.</li>
                          </ul>
                        </dd>
                        <dt>활용결과 등록</dt>
                        <dd>
                          <ul className="list-bullet-2">
                              <li>논문(또는 학위논문)은 게재 확정 후 90일 이내, 보고서, 학술대회 포스터 및 구연발표는 발표 후 30 일 이내에 활용결과를 등록해야 합니다.</li>
                          </ul>
                        </dd>
                      </dl>
                      <div className="mb24"></div>

                      <div className="img-switcher">
                        <img src="/fe/img/cms/oriReport_img03.png" alt="의약품부작용보고원시자료 활용 사전협의 및 활용결과 등록 도식" className="responsive-img pc-only"/>
                        <img src="/fe/img/cms/oriReport_img03_m.png" alt="" aria-hidden="true" className="responsive-img mo-only"/>
                      </div>
                    </div>

                    <h3 className="section-title">의약품부작용보고원시자료 요청 시스템 위치</h3> 
                    <div className="section-desc">
                      <p>약품부작용보고원시자료는 <span className="fw-700">[의약품안전나라 누리집] &gt; [전자민원/보고] &gt; [이상사례] &gt; [의약품부작용 보고원시자료]</span> 에서 신청할 수 있습니다.</p>
                      <p className="txt-4 mb10">※ 보다 자세한 사항은 <span className="fw-700">최신 버전의 이용지침서</span>를 확인하여 주시기 바랍니다.</p>
                      <div className="shortcut-link">
                        <a 
                          href="https://nedrug.mfds.go.kr/bbs/148" 
                          className="btn-link-blank-html"
                          target="_blank" 
                          rel="noopener noreferrer"
                          title="바로가기(새 창 열림)"
                        >
                          의약품부작용보고원시자료 시스템 바로가기
                          <span className="ico-link-blank" aria-hidden="true"></span>
                          <span className="sr-only">(새 창 열림)</span>
                        </a>
                      </div>
                    </div>

                    <h3 className="section-title">의약품부작용보고원시자료 문의</h3> 
                    <div className="section-desc">
                      <p className="txt-type-2">운영시간: 평일 10~16시, 공휴일 제외</p>
                      <dl className="list-definition">
                        <dt>규정 및 신청방법 문의</dt>
                        <dd>
                          <ul className="list-bullet-3">
                              <li>이메일 : kids_kd@drugsafe.or.kr</li>
                              <li>전화 : 02-2172-6700(-1-3)</li>
                          </ul>
                        </dd>
                        <dt>신청 시스템 오류 문의</dt>
                        <dd>
                          <ul className="list-bullet-3">
                              <li>1:1 온라인 문의: 의약품안전나라 홈페이지 &gt; 고객지원 &gt; 1:1 온라인 문의(회원)</li>
                              <li> 전화 : 02-2172-6700(-1-2)</li>
                          </ul>
                        </dd>
                      </dl>
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
