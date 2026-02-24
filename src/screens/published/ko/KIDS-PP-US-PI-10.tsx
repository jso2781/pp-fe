import React, { useMemo, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../../ScreenShell';

export default function KIDS_PP_US_PI_10() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/',  
      label: '유관기관' 
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
    <ScreenShell screenId="KIDS-PP-US-PI-10" title="유관기관" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>유관기관</span>
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

                  <section className="pageCont-SafetyRelated">
                    <div className="category-anchor-tabs" aria-label="카테고리 이동">
                      <ul className="tabs-list" role="tablist">
                        <li className="tab-item" role="none">
                          <a href="#anchor-sec1" id="tab1" className="tab-link active" role="tab" aria-selected="true" aria-controls="anchor-sec1">국내기관</a>
                        </li>
                        <li className="tab-item" role="none">
                          <a href="#anchor-sec2" id="tab2" className="tab-link" role="tab" aria-selected="false" aria-controls="anchor-sec2">국외기관</a>
                        </li>
                      </ul>
                    </div>
                    {/* 탭 컨텐츠 */}
                    <div className="anchor-contents-area">
                      <section id="anchor-sec1" className="tab-section" role="tabpanel" tabIndex={0} aria-labelledby="tab1">
                        <div className="inner-box">
                          {/* 정부부처 */}
                          <div className="base-table-container">
                            <div className="table-responsive">
                              <table className="base-table table-type-3">
                                <caption className="sr-only">정부부처 목록</caption>
                                <colgroup>
                                  <col style={{ width: '60%' }} />
                                  <col style={{ width: '40%' }} />
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col" colSpan={2}>정부부처</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row"><span className="org-name">식품의약품안전처</span></th>
                                    <td><a href="http://www.mfds.go.kr/" target="_blank" rel="noopener noreferrer">http://www.mfds.go.kr/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">의약품 안전나라</span></th>
                                    <td><a href="https://nedrug.mfds.go.kr/index" target="_blank" rel="noopener noreferrer">https://nedrug.mfds.go.kr/index</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">중앙약사심의위원회</span></th>
                                    <td><a href="https://nedrug.mfds.go.kr/cntnts/83#none" target="_blank" rel="noopener noreferrer">https://nedrug.mfds.go.kr/cntnts/83#none</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">규제과학IN</span></th>
                                    <td><a href="https://rsedu.mfds.go.kr" target="_blank" rel="noopener noreferrer">https://rsedu.mfds.go.kr</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">보건복지부</span></th>
                                    <td><a href="http://www.mohw.go.kr/" target="_blank" rel="noopener noreferrer">http://www.mohw.go.kr/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">질병관리본부</span></th>
                                    <td><a href="http://www.cdc.go.kr/" target="_blank" rel="noopener noreferrer">http://www.cdc.go.kr/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">통계청</span></th>
                                    <td><a href="http://kostat.go.kr" target="_blank" rel="noopener noreferrer">http://kostat.go.kr</a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          {/* 공공기관 */}
                          <div className="base-table-container">
                            <div className="table-responsive">
                              <table className="base-table table-type-3">
                                <caption className="sr-only">공공기관 목록</caption>
                                <colgroup>
                                  <col style={{ width: '60%' }} />
                                  <col style={{ width: '40%' }} />
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col" colSpan={2}>공공기관</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row"><span className="org-name">한국소비자원</span></th>
                                    <td><a href="http://www.kca.go.kr/" target="_blank" rel="noopener noreferrer">http://www.kca.go.kr/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">건강보험심사평가원</span></th>
                                    <td><a href="http://www.hira.or.kr" target="_blank" rel="noopener noreferrer">http://www.hira.or.kr</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">식품의약품안전평가원</span></th>
                                    <td><a href="http://www.nifds.go.kr" target="_blank" rel="noopener noreferrer">http://www.nifds.go.kr</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">국립암센터</span></th>
                                    <td><a href="http://www.ncc.re.kr" target="_blank" rel="noopener noreferrer">http://www.ncc.re.kr</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">한국보건산업진흥원</span></th>
                                    <td><a href="http://www.khidi.or.kr" target="_blank" rel="noopener noreferrer">http://www.khidi.or.kr</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">한국보건사회연구원</span></th>
                                    <td><a href="http://www.kihasa.re.kr" target="_blank" rel="noopener noreferrer">http://www.kihasa.re.kr</a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          {/* 관련기관 */}
                          <div className="base-table-container">
                            <div className="table-responsive">
                              <table className="base-table table-type-3">
                                <caption className="sr-only">관련기관 목록</caption>
                                <colgroup>
                                  <col style={{ width: '60%' }} />
                                  <col style={{ width: '40%' }} />
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col" colSpan={2}>관련기관</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row"><span className="org-name">한국병원약사회</span></th>
                                    <td><a href="http://www.kshp.or.kr" target="_blank" rel="noopener noreferrer">http://www.kshp.or.kr</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">한국제약바이오협회</span></th>
                                    <td><a href="http://www.kpma.or.kr/" target="_blank" rel="noopener noreferrer">http://www.kpma.or.kr/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">약학정보원</span></th>
                                    <td><a href="http://www.health.kr/" target="_blank" rel="noopener noreferrer">http://www.health.kr</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">마더세이프전문상담센터</span></th>
                                    <td><a href="http://www.mothersafe.or.kr/" target="_blank" rel="noopener noreferrer">http://www.mothersafe.or.kr/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">임상진료지침정보센터</span></th>
                                    <td><a href="http://www.guideline.or.kr/" target="_blank" rel="noopener noreferrer">http://www.guideline.or.kr</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">한국의약품수출입협회</span></th>
                                    <td><a href="http://www.kpta.or.kr" target="_blank" rel="noopener noreferrer">http://www.kpta.or.kr</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">킴스온라인</span></th>
                                    <td><a href="http://www.kimsonline.co.kr/" target="_blank" rel="noopener noreferrer">http://www.kimsonline.co.kr/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">드러그인포</span></th>
                                    <td><a href="http://www.druginfo.co.kr" target="_blank" rel="noopener noreferrer">http://www.druginfo.co.kr</a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          {/* 관련학회 */}
                          <div className="base-table-container">
                            <div className="table-responsive">
                              <table className="base-table table-type-3">
                                <caption className="sr-only">관련학회 목록</caption>
                                <colgroup>
                                  <col style={{ width: '60%' }} />
                                  <col style={{ width: '40%' }} />
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col" colSpan={2}>관련학회</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row"><span className="org-name">대한약물역학위해관리학회</span></th>
                                    <td><a href="http://www.koperm.org/" target="_blank" rel="noopener noreferrer">http://www.koperm.org/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">대한임상약리학회</span></th>
                                    <td><a href="http://www.kscpt.org/" target="_blank" rel="noopener noreferrer">http://www.kscpt.org/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">한국역학회 Korean Society of Epidemiology</th>
                                    <td><a href="http://www.ksepi.org/" target="_blank" rel="noopener noreferrer">http://www.ksepi.org/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">대한약학회 The Pharmaceutical Society of Korea</th>
                                    <td><a href="http://psk.or.kr/" target="_blank" rel="noopener noreferrer">http://psk.or.kr/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">한국임상약학회</span></th>
                                    <td><a href="http://www.kccp.or.kr/" target="_blank" rel="noopener noreferrer">http://www.kccp.or.kr/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">대한예방의학회</span></th>
                                    <td><a href="http://www.prevmed.or.kr/" target="_blank" rel="noopener noreferrer">http://www.prevmed.or.kr/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">대한 천식 및 알레르기학회</span></th>
                                    <td><a href="http://www.allergy.or.kr/" target="_blank" rel="noopener noreferrer">http://www.allergy.or.kr/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">대한가정의학회</span></th>
                                    <td><a href="http://www.kafm.or.kr/" target="_blank" rel="noopener noreferrer">http://www.kafm.or.kr/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">대한의학회</span></th>
                                    <td><a href="http://www.kams.or.kr/" target="_blank" rel="noopener noreferrer">http://www.kams.or.kr/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">대한내과학회</span></th>
                                    <td><a href="http://www.kaim.or.kr/" target="_blank" rel="noopener noreferrer">http://www.kaim.or.kr/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">대한간학회</span></th>
                                    <td><a href="http://www.kasl.org/" target="_blank" rel="noopener noreferrer">http://www.kasl.org/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">대한심장학회</span></th>
                                    <td><a href="http://www.circulation.or.kr/" target="_blank" rel="noopener noreferrer">http://www.circulation.or.kr/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">대한신장학회</span></th>
                                    <td><a href="http://www.ksn.or.kr/" target="_blank" rel="noopener noreferrer">http://www.ksn.or.kr/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">대한신경과학회</span></th>
                                    <td><a href="http://www.neuro.or.kr/" target="_blank" rel="noopener noreferrer">http://www.neuro.or.kr/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">대한피부과학회</span></th>
                                    <td><a href="http://www.derma.or.kr/" target="_blank" rel="noopener noreferrer">http://www.derma.or.kr/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">대한소아과학회</span></th>
                                    <td><a href="http://www.pediatrics.or.kr/" target="_blank" rel="noopener noreferrer">http://www.pediatrics.or.kr/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span className="org-name">대한노인병학회</span></th>
                                    <td><a href="http://www.geriatrics.or.kr/" target="_blank" rel="noopener noreferrer">http://www.geriatrics.or.kr/</a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                    <div className="anchor-contents-area">
                      <section id="anchor-sec2" className="tab-section" role="tabpanel" tabIndex={0} aria-labelledby="tab2">
                        <div className="inner-box">
                          <div className="base-table-container">
                            <div className="table-responsive">
                              <table className="base-table table-type-3">
                                <caption className="sr-only">미국 국외 사이트 목록</caption>
                                <colgroup>
                                  <col style={{ width: '60%' }} />
                                  <col style={{ width: '40%' }} />
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col" colSpan={2}>미국</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">FDA</th>
                                    <td><a href="http://www.fda.gov/" target="_blank" rel="noopener noreferrer">http://www.fda.gov/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">CDC</th>
                                    <td><a href="http://www.cdc.gov/" target="_blank" rel="noopener noreferrer">http://www.cdc.gov/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">
                                      의약품 안전성정보<br />
                                      <a href="http://www.fda.gov/Drugs/DrugSafety/PostmarketDrugSafetyInformationforPatientsandProviders/default.htm" target="_blank" rel="noopener noreferrer">- 시판후 의약품안전성정보 검색</a><br />
                                      <a href="http://www.fda.gov/Drugs/DrugSafety/DrugRecalls/default.htm" target="_blank" rel="noopener noreferrer">- 의약품 회수조치 정보 검색</a><br />
                                      - <a href="http://www.fda.gov/Safety/MedWatch/default.htm" target="_blank" rel="noopener noreferrer">의약품 안전성정보 검색</a><br />
                                      - <a href="http://www.fda.gov/Drugs/GuidanceComplianceRegulatoryInformation/Surveillance/AdverseDrugEffects/ucm258366.htm" target="_blank" rel="noopener noreferrer">실마리정보</a>
                                    </th>
                                    <td><a href="http://www.fda.gov/" target="_blank" rel="noopener noreferrer">http://www.fda.gov/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">CMS(Center for Medicare and Medicaid Services)</th>
                                    <td><a href="http://www.cms.gov/" target="_blank" rel="noopener noreferrer">http://www.cms.gov/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Medicare service</th>
                                    <td><a href="http://www.medicare.gov" target="_blank" rel="noopener noreferrer">http://www.medicare.gov</a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="base-table-container">
                            <div className="table-responsive">
                              <table className="base-table table-type-3">
                                <caption className="sr-only">유럽 국외 사이트 목록</caption>
                                <colgroup>
                                  <col style={{ width: '60%' }} />
                                  <col style={{ width: '40%' }} />
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col" colSpan={2}>유럽</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">EMA(European Medicines Agency)</th>
                                    <td><a href="http://www.ema.europa.eu/" target="_blank" rel="noopener noreferrer">http://www.ema.europa.eu/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">ENCePP</th>
                                    <td><a href="http://www.encepp.eu/" target="_blank" rel="noopener noreferrer">http://www.encepp.eu/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">의약품 안전성정보(Patient safety)</th>
                                    <td><a href="http://www.ema.europa.eu/ema/index.jsp?curl=pages/medicines/general/general_content_000420.jsp&amp;mid=WC0b01ac058001d126" target="_blank" rel="noopener noreferrer">http://www.ema.europa.eu</a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="base-table-container">
                            <div className="table-responsive">
                              <table className="base-table table-type-3">
                                <caption className="sr-only">영국 국외 사이트 목록</caption>
                                <colgroup>
                                  <col style={{ width: '60%' }} />
                                  <col style={{ width: '40%' }} />
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col" colSpan={2}>영국</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">MHRA(Medicines and Healthcare Products Regulatory Agency)</th>
                                    <td><a href="http://www.mhra.gov.uk" target="_blank" rel="noopener noreferrer">http://www.mhra.gov.uk</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">의약품 안전성정보(Drug Alerts)</th>
                                    <td><a href="http://www.mhra.gov.uk/Safetyinformation/Safetywarningsalertsandrecalls/index.htm" target="_blank" rel="noopener noreferrer">http://www.mhra.gov.uk/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">의약품 안전성정보(YellowCard)</th>
                                    <td><a href="https://yellowcard.mhra.gov.uk/" target="_blank" rel="noopener noreferrer">https://yellowcard.mhra.gov.uk/</a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="base-table-container">
                            <div className="table-responsive">
                              <table className="base-table table-type-3">
                                <caption className="sr-only">프랑스 국외 사이트 목록</caption>
                                <colgroup>
                                  <col style={{ width: '60%' }} />
                                  <col style={{ width: '40%' }} />
                                </colgroup>
                                <thead><tr><th scope="col" colSpan={2}>프랑스</th></tr></thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">의약품 안전성정보(Informations de sécuritee)</th>
                                    <td><a href="http://ansm.sante.fr/S-informer/Informations-de-securite-Lettres-aux-professionnels-de-sante" target="_blank" rel="noopener noreferrer">http://ansm.sante.fr</a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div className="base-table-container">
                            <div className="table-responsive">
                              <table className="base-table table-type-3">
                                <caption className="sr-only">독일 국외 사이트 목록</caption>
                                <colgroup>
                                  <col style={{ width: '60%' }} />
                                  <col style={{ width: '40%' }} />
                                </colgroup>
                                <thead><tr><th scope="col" colSpan={2}>독일</th></tr></thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">BfArM</th>
                                    <td><a href="http://www.bfarm.de/DE/Home/home_node.html" target="_blank" rel="noopener noreferrer">http://www.bfarm.de/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">약물감시정보(Pharmacovigilance)</th>
                                    <td><a href="http://www.bfarm.de/DE/Pharmakovigilanz/pharmakovig-mode.html" target="_blank" rel="noopener noreferrer">http://www.bfarm.de/</a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="base-table-container">
                            <div className="table-responsive">
                              <table className="base-table table-type-3">
                                <caption className="sr-only">이탈리아 국외 사이트 목록</caption>
                                <colgroup>
                                  <col style={{ width: '60%' }} />
                                  <col style={{ width: '40%' }} />
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col" colSpan={2}>이탈리아</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">Agenxia Italiana del Farmaco (AIFA : the Italian Medicines Agency)</th>
                                    <td><a href="http://www.agenziafarmaco.gov.it/en" target="_blank" rel="noopener noreferrer">http://www.agenziafarmaco.gov.it/en</a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="base-table-container">
                            <div className="table-responsive">
                              <table className="base-table table-type-3">
                                <caption className="sr-only">캐나다 국외 사이트 목록</caption>
                                <colgroup>
                                  <col style={{ width: '60%' }} />
                                  <col style={{ width: '40%' }} />
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col" colSpan={2}>캐나다</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">HC (Health Canada)</th>
                                    <td><a href="http://www.hc-sc.gc.ca/index-eng.php" target="_blank" rel="noopener noreferrer">http://www.hc-sc.gc.ca/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">의약품 안전성정보(Advisories, Warnings &amp; Recalls)</th>
                                    <td><a href="http://www.hc-sc.gc.ca/dhp-mps/medeff/advisories-avis/index-eng.php" target="_blank" rel="noopener noreferrer">http://www.hc-sc.gc.ca/</a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="base-table-container">
                            <div className="table-responsive">
                              <table className="base-table table-type-3">
                                <caption className="sr-only">일본 국외 사이트 목록</caption>
                                <colgroup>
                                  <col style={{ width: '60%' }} />
                                  <col style={{ width: '40%' }} />
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col" colSpan={2}>일본</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">PMDA (Pharmaceuticals and Medical Devices Agency)</th>
                                    <td><a href="http://www.pmda.go.jp" target="_blank" rel="noopener noreferrer">http://www.pmda.go.jp</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">의약품 안전성정보(副作用情報)</th>
                                    <td><a href="http://www.info.pmda.go.jp/psearch/html/menu_tenpu_fukusayou.html" target="_blank" rel="noopener noreferrer">http://www.info.pmda.go.jp/</a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="base-table-container">
                            <div className="table-responsive">
                              <table className="base-table table-type-3">
                                <caption className="sr-only">스위스 국외 사이트 목록</caption>
                                <colgroup>
                                  <col style={{ width: '60%' }} />
                                  <col style={{ width: '40%' }} />
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col" colSpan={2}>스위스</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">Swissmedic</th>
                                    <td><a href="http://www.swissmedic.ch/index.html?lang=en" target="_blank" rel="noopener noreferrer">http://www.swissmedic.ch/</a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="base-table-container">
                            <div className="table-responsive">
                              <table className="base-table table-type-3">
                                <caption className="sr-only">호주 국외 사이트 목록</caption>
                                <colgroup>
                                  <col style={{ width: '60%' }} />
                                  <col style={{ width: '40%' }} />
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col" colSpan={2}>호주</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">의약품관리국 (TGA)</th>
                                    <td><a href="http://www.tga.gov.au/index.htm" target="_blank" rel="noopener noreferrer">http://www.tga.gov.au/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">의약품 안전성정보(Product recalls, Alerts, Safety information &amp; education)</th>
                                    <td><a href="http://www.tga.gov.au/safety/information.htm" target="_blank" rel="noopener noreferrer">http://www.tga.gov.au/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">의약품 적정사용정보((NPS) National Prescribing Service)</th>
                                    <td><a href="http://www.nps.org.au/" target="_blank" rel="noopener noreferrer">http://www.nps.org.au/</a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="base-table-container">
                            <div className="table-responsive">
                              <table className="base-table table-type-3">
                                <caption className="sr-only">중국 국외 사이트 목록</caption>
                                <colgroup>
                                  <col style={{ width: '60%' }} />
                                  <col style={{ width: '40%' }} />
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col" colSpan={2}>중국</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">SFDA</th>
                                    <td><a href="http://eng.sfda.gov.cn/" target="_blank" rel="noopener noreferrer">http://eng.sfda.gov.cn/</a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="base-table-container">
                            <div className="table-responsive">
                              <table className="base-table table-type-3">
                                <caption className="sr-only">대만 국외 사이트 목록</caption>
                                <colgroup>
                                  <col style={{ width: '60%' }} />
                                  <col style={{ width: '40%' }} />
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col" colSpan={2}>대만</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">CDE</th>
                                    <td><a href="http://www.cde.org.tw" target="_blank" rel="noopener noreferrer">http://www.cde.org.tw</a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="base-table-container">
                            <div className="table-responsive">
                              <table className="base-table table-type-3">
                                <caption className="sr-only">기타 국외 사이트 목록</caption>
                                <colgroup>
                                  <col style={{ width: '60%' }} />
                                  <col style={{ width: '40%' }} />
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col" colSpan={2}>기타</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">World Health Organization(WHO)</th>
                                    <td><a href="http://www.who.int/" target="_blank" rel="noopener noreferrer">http://www.who.int/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">국제약물감시협회(ISoP)</th>
                                    <td><a href="http://www.isoponline.org/" target="_blank" rel="noopener noreferrer">http://www.isoponline.org/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">국제약물역학회(ISPE)</th>
                                    <td><a href="http://www.pharmacoepi.org/" target="_blank" rel="noopener noreferrer">http://www.pharmacoepi.org/</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">APEC Harmonization Center</th>
                                    <td><a href="http://www.apec-ahc.org" target="_blank" rel="noopener noreferrer">http://www.apec-ahc.org</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">ICH</th>
                                    <td><a href="http://www.ich.org" target="_blank" rel="noopener noreferrer">http://www.ich.org</a></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">AsPEN</th>
                                    <td><a href="p://aspennet.asia" target="_blank" rel="noopener noreferrer">p://aspennet.asia</a></td>
                                  </tr>
                                </tbody>
                              </table>
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
