import React, { useMemo, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../ScreenShell';

export default function KIDS_PP_US_OI_01() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/',  
      label: '업무처리절차' 
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
    <ScreenShell screenId="KIDS-PP-US-OI-01" title="정보공개 업무처리절차" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>업무처리절차</span>
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

                  <section className="pageCont-TaskProgress">
                    <div className="info-summary-box">
                      <h3 className="info-summary-box__title">정보공개제도 란?</h3>
                      <div className="info-summary-box__desc">
                        <p>국가기관·지방자치단체 등 공공기관이 업무 수행 중 생산·접수하여 보유· 관리하는 정보를 국민에게 공개함으로써, <br/><span className="fw-700">국민의 알권리를 보장하고 더 많은 정보를 바탕으로 국정운영에 대한 참여를 유도</span>하기 위한 제도입니다.</p>
                      </div>
                    </div> 
                    
                    <div className="category-anchor-tabs">
                      <ul className="tabs-list" role="tablist">
                        <li className="tab-item" role="none">
                          <a href="#anchor-sec1" id="tab1" className="tab-link active" role="tab" aria-selected="true" aria-controls="anchor-sec1">사전협의</a>
                        </li>
                        <li className="tab-item" role="none">
                          <a href="#anchor-sec2" id="tab2" className="tab-link" role="tab" aria-selected="false" aria-controls="anchor-sec2">활용결과 등록</a>
                        </li>
                        <li className="tab-item" role="none">
                          <a href="#anchor-sec3" id="tab3" className="tab-link" role="tab" aria-selected="false" aria-controls="anchor-sec3">시스템 이용 문의</a>
                        </li>
                      </ul>
                    </div>
                    {/* 탭 컨텐츠 */}
                    <div className="anchor-contents-area">
                      <section id="anchor-sec1" className="tab-section" role="tabpanel" tabIndex={0} aria-labelledby="tab1">
                        <div className="inner-box">
                          <h3 className="section-title">정보공개법의 제정·시행</h3>
                          <div className="section-desc">
                            <p>국민의 알권리를 확대하고 국정운영의 투명성을 높이기 위해 지난 '96년 &lt;공공기관의 정보공개에 관한 법률&gt; 을 제정·공포하고, '98년 1월 1일부터 시행하였습니다.</p>  
                          </div>
                          <h3 className="section-title">정보공개법의 최초 제정(1996.12)과 시행(1998.01)</h3>
                          <div className="section-desc">
                            <p>정보공개 대상기관 중 공공기관의 정의를 명확히 하고, 국민의 알권리 확대 및 행정의
                                투명성 제고를 위하여 공개로 분류된 정보는 국민의 청구가 없더라도 사전에 공개하도록 하는 등 현행 제도의 운영상 나타난 일부 미비점을 개선 · 보완하는 한편, 법적 간
                                결성 · 함축성과 조화를 이루는 범위에서, 어려운 용어를 쉬운 우리말로 풀어쓰고 복잡한 문장은 체계를 정리하여 간결하게 다듬음으로써 쉽게 읽고 잘 이해할 수 있도록
                                2020년 12월 22일 최종 개정하였습니다.</p>
                          </div>
                        </div>
                      </section>
                      <section id="anchor-sec2" className="tab-section" role="tabpanel" tabIndex={0} aria-labelledby="tab2">
                        <div className="inner-box">
                          <h3 className="section-title">청구인</h3>
                          <div className="claimant-list">
                            <dl>
                              <dt>모든 국민</dt>
                              <dd>모든 국민은 청구인 본인 또는 그 대리인을 통하여 공공기관에 정보공개를 청구할 수 있습니다.</dd>
                            </dl>
                            <dl>
                              <dt>법인·단체</dt>
                              <dd>법인과 단체의 경우 대표자의 명의로 공공기관에 정보공개를 청구할 수 있습니다.</dd>
                            </dl>
                            <dl>
                              <dt>외국인</dt>
                              <dd>국내에 일정한 주소를 두고 거주하거나, 학술·연구를 위하여 일시적으로 체류하는 자, 국내에 사무소를 두고 있는 법인 또는 단체에 한해 정보공개를 청구할 수 있습니다.</dd>
                            </dl>
                          </div>
                          <h3 className="section-title">청구가능정보</h3>
                          <div className="section-desc">
                            <p className="txt-type-2">공공기관이 직무상 작성 또는 취득하여 관리하고 있는 문서(전자문서 포함)· 도면 · 사진 · 필름 · 테이프 · 슬라이드 및 기타 이에 준하는 매체 등에 기록된 사항</p>
                            <dl className="list-definition">
                              <dt>공공기관의 기록물관리에 관한 법률상 기록물과의 관계</dt>
                              <dd>
                                <p> "공공기관이 업무와 관련하여 생산 또는 접수한 문서 · 도서 · 대장 · 카드 · 도면 · 시청각물 · 전자문서 등 모든 형태의 기록정보자료" 인 기록물은 모두 정보공개청구의 대상이 되는 정보에 해당합니다.</p>
                              </dd>
                            </dl>
                          </div>
                          <h3 className="section-title">사전정보공표</h3>
                          <div className="section-desc">
                            <p className="txt-type-2">사전정보공표는 국민들이 정보공개를 청구하기 전에 국민이 필요로 하는 정보를 선제적·능동적 공개하는 제도입니다.</p>
                            <dl className="list-definition">
                              <dt>사전정보 대상</dt>
                              <dd>
                                <p>비공개 대상 정보 외에 국민이 알아야 할 필요가 있는 모든 정보 (공공기관의 정보공개에 관한 법률 제7조 제1항 및 제2항)</p>
                                <ul className="list-bullet-3">
                                    <li>국민생활에 매우 큰 영향을 미치는 정책에 관한 정보</li>
                                    <li>국가의 시책으로 시행하는 공사(工事) 등 대규모 예산이 투입되는 사업에 관한 정보</li>
                                    <li>예산집행의 내용과 사업평가 결과 등 행정감시를 위하여 필요한 정보</li>
                                    <li>그 밖에 공공기관의 장이 정하는 정보</li>
                                </ul>
                              </dd>
                              <dt>사전정보공표 방법</dt>
                              <dd>각 기관 홈페이지를 통해 최신정보를 공개합니다. 정보공개시스템에서는 각 기관의 사전정보의 목록을 제공합니다.</dd>
                            </dl>
                          </div>
                        </div>
                      </section>
                      <section id="anchor-sec3" className="tab-section" role="tabpanel" tabIndex={0} aria-labelledby="tab3">
                        <div className="inner-box">
                          <h3 className="section-title">청구절차</h3>
                          <div className="img-switcher">
                            <img src="/img/taskProgress_img01.png" alt="청구절차 도식화" className="responsive-img pc-only"/>
                            <img src="/img/taskProgress_img01_m.png"  alt="" aria-hidden="true" className="responsive-img mo-only"/>
                          </div>
                          <div className="sr-only">
                            <p>정보목록검색 - 원문정보조회</p>
                            정보목록검색 -정보공개청구 -공개여부결정(10일) - 정보공개
                          </div>
                          <div className="mb5"></div>
                          <div className="shortcut-link">
                            <a 
                              href="https://nedrug.mfds.go.kr/CCCBA03F010/getReport" 
                              className="btn-link-blank-html"
                              target="_blank" 
                              rel="noopener noreferrer"
                              title="바로가기(새 창 열림)"
                            >
                              정보공개포털 바로가기
                              <span className="ico-link-blank" aria-hidden="true"></span>
                              <span className="sr-only">(새 창 열림)</span>
                            </a>
                          </div>
                          <h3 className="section-title">정보공개 청구</h3>
                          <div className="section-desc">
                            <p className="txt-type-2">청구인은 원하는 정보가 있을 경우 정보공개시스템 (www.open.go.kr)에서 원문을 조회하거나 이를 보유 · 관리 하는 공공기관에 정보공개 청구서를 기재하여 제출합니다.</p>
                            <dl className="list-definition mb5">
                              <dt>청구서 기재사항</dt>
                              <dd>
                                <ul className="list-bullet-3">
                                    <li>청구인의 이름 · 주민등록번호 및 주소 청구하는 정보의 내용, 정보형태, 공개방법 등</li>
                                    <li>청구인이 공공기관에 우편 · 팩스 또는  직접 출석하여 제출하거나 정보공개시스템(www.open.go.kr)을 통해 청구서를 제출할 수 있습니다.</li>
                                </ul>
                              </dd>
                            </dl>
                            <p className="txt-type-3">청구를 받은 공공기관은 정보공개처리대장에 기록하고 청구인에게 접수증을 교부하고, 접수부서는 이를 담당부서 또는 소관기관에 이송하게 됩니다.</p>
                          </div>
                          <h3 className="section-title">공개여부의 결정</h3>
                          <div className="section-desc">
                            <p className="txt-type-2">공공기관은 청구를 받은 날부터 "10일" 이내에 공개여부를 결정해야 하며, 부득이한 경우 10일의 범위내에서 연장할 수 있습니다.</p>
                            <dl className="list-definition mb5">
                              <dt>공공기관은 청구정보가 제3자와 관련이 있는 경우 제3자에게 통보하고 필요한 경우 그 의견을 청취하여 결정하게 됩니다.</dt>
                              <dd>
                                <ul className="list-bullet-3">
                                    <li>공개청구량이 과다하여 정상적인 업무수행에 현저한 지장을 초래할 우려가 있는 경우 정보의 사본 · 복제물을 먼저 열람하게 한 후 일정기간별로 교부하되 2개월 이내에 완료하여야 합니다.</li>
                                    <li>비공개정보와 공개정보가 혼합되어 분리가능한 경우 공개청구의 취지에 부합하는 범위내에서 부분공개가 가능합니다.</li>
                                </ul>
                              </dd>
                            </dl>
                          </div>
                          <h3 className="section-title">공개여부 결정의 통지</h3>
                          <div className="section-desc">
                            <dl className="list-definition mb5">
                              <dt>공공기관이 정보의 공개를 결정한 때에는 공개일시 · 공개장소 등을 명시하여 청구인에게 통지하되, 공개를 결정한 날로부터 "10일" 이내에 공개해야 합니다.</dt>
                              <dd>
                                <ul className="list-bullet-3">
                                    <li>공개청구량이 과다하여 정상적인 업무수행에 현저한 지장을 초래할 우려가 있는 경우 정보의 사본 · 복제물을 먼저 열람하게 한 후 일정기간별로 교부하되 2개월 이내에 완료하여야 합니다.</li>
                                    <li>비공개정보와 공개정보가 혼합되어 분리가능한 경우 공개청구의 취지에 부합하는 범위내에서 부분공개가 가능합니다.</li>
                                </ul>
                              </dd>
                            </dl>
                            <p className="txt-type-2">공공기관이 정보를 비공개로 결정한 때에는 비공개사유·불복방법 등을 명시하여 청구인에게 지체없이 문서로 통지하여야 합니다.</p>
                            <dl className="list-definition mb5">
                              <dt>정보공개 방법</dt>
                              <dd>
                                <ul className="list-bullet-3">
                                  <li>문서, 도면, 카드, 사진 등 : 열람 또는 사본의 교부</li>
                                  <li>필름, 녹음 · 녹화테이프 등 : 시청 또는 인화물 · 복제물 교부</li>
                                  <li>마이크로필름, 슬라이드 등 : 시청·열람 또는 사본 · 복제본의 교부</li>
                                  <li>전자적 형태로 보유·관리하는 정보 : 파일을 복제하여 정보통신망을 활용한 정보공개시스템으로 송부, 매체에 저장하여 제공, 열람·시청 또는 사본·출력물의 제공</li>
                                </ul>
                              </dd>
                            </dl>
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
