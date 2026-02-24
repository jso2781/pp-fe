import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../../ScreenShell';

export default function KIDS_PP_US_OI_07() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '경영공시' 
    },
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-OI-07" title="경영공시" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>경영공시</span>
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

                  <section className="pageCont-disclosure">
                    <div className="base-table-container">
                      <div className="table-responsive">
                        <table className="base-table table-type-2">
                          <caption className="sr-only">일반현황, 기관운영, 주요산업 및 경영성과, 대내외 평가, 공지사항 관련 링크</caption>
                          <colgroup>
                            <col style={{ width: '15%' }} />
                            <col style={{ width: '75%' }} />
                          </colgroup>
                          <tbody>
                            {/* 1. 일반현황 */}
                            <tr>
                              <th scope="row">1. 일반현황</th>
                              <td>
                                <ul className="list-bul">
                                  <li>
                                    <a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=10101" target="_blank" rel="noopener noreferrer">
                                      일반현황 <span className="sr-only">(새창열림)</span>
                                    </a>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                            {/* 2. 기관운영 */}
                            <tr>
                              <th scope="row">2. 기관운영</th>
                              <td>
                                <ul className="list-bul">
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=2020" target="_blank" rel="noopener noreferrer">임직원수 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popSusi.do?apbaId=C0862&reportFormRootNo=20305" target="_blank" rel="noopener noreferrer">임원현황 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=2040" target="_blank" rel="noopener noreferrer">신규채용현황 및 유연근무현황 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=2050" target="_blank" rel="noopener noreferrer">임원연봉 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=20601" target="_blank" rel="noopener noreferrer">직원평균보수 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=20701" target="_blank" rel="noopener noreferrer">기관장업무추진비 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=20801" target="_blank" rel="noopener noreferrer">복리후생비 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popSusi.do?apbaId=C0862&reportFormRootNo=20905" target="_blank" rel="noopener noreferrer">임원 국외출장정보 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=2102" target="_blank" rel="noopener noreferrer">노동조합 관련현황 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popSusiView21110.do?seq=2016102801303509" target="_blank" rel="noopener noreferrer">취업규칙 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/" target="_blank" rel="noopener noreferrer">징계현황 <span className="sr-only">(새창열림)</span></a></li>
                                </ul>
                              </td>
                            </tr>

                            {/* 3. 주요산업 및 경영성과 */}
                            <tr>
                              <th scope="row">3. 주요산업 및 경영성과</th>
                              <td>
                                <ul className="list-bul">
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=3120" target="_blank" rel="noopener noreferrer">요약대차대조표(또는 요약재무상태표) <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=3130" target="_blank" rel="noopener noreferrer">요약손익계산서(또는 포괄손익계산서) <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=31401" target="_blank" rel="noopener noreferrer">수입*지출현황 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=31501" target="_blank" rel="noopener noreferrer">주요사업 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=3160" target="_blank" rel="noopener noreferrer">공공기관 투자집행현황 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=31701" target="_blank" rel="noopener noreferrer">자본금 및 주주현황 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=3180" target="_blank" rel="noopener noreferrer">장단기 차입금현황 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=31901" target="_blank" rel="noopener noreferrer">투자 및 출자현황 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=32001" target="_blank" rel="noopener noreferrer">연간 출연 및 증여 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=32101" target="_blank" rel="noopener noreferrer">경영부담비용 추계 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=32211" target="_blank" rel="noopener noreferrer">납세정보현황 <span className="sr-only">(새창열림)</span></a></li>
                                </ul>
                              </td>
                            </tr>

                            {/* 4. 대내외 평가 */}
                            <tr>
                              <th scope="row">4. 대내외 평가</th>
                              <td>
                                <ul className="list-bul">
                                  <li><a href="http://www.alio.go.kr/popSusi.do?apbaId=C0862&reportFormRootNo=B1210" target="_blank" rel="noopener noreferrer">국회 지적사항 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popSusi.do?apbaId=C0862&reportFormRootNo=B1220" target="_blank" rel="noopener noreferrer">감사원 지적사항 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popSusi.do?apbaId=C0000&reportFormRootNo=B1230" target="_blank" rel="noopener noreferrer">경영실적 평가정보 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=4270" target="_blank" rel="noopener noreferrer">경영평가 지적사항 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popSusi.do?apbaId=C0000&reportFormRootNo=B1240" target="_blank" rel="noopener noreferrer">고객만족도 조사결과 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popSusi.do?apbaId=C0000&reportFormRootNo=B1250" target="_blank" rel="noopener noreferrer">감사(감사위원)의 실적평가결과 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popSusi.do?apbaId=C0862&reportFormRootNo=43005,43006,43007,43008" target="_blank" rel="noopener noreferrer">이사회 회의록 내부 감사결과 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popSusi.do?apbaId=C0862&reportFormRootNo=B1050" target="_blank" rel="noopener noreferrer">창의경영사례 <span className="sr-only">(새창열림)</span></a></li>
                                </ul>
                              </td>
                            </tr>

                            {/* 5. 공지사항 */}
                            <tr>
                              <th scope="row">5. 공지사항</th>
                              <td>
                                <ul className="list-bul">
                                  <li><a href="http://www.alio.go.kr/popSusi.do?apbaId=C0862&reportFormRootNo=B1020" target="_blank" rel="noopener noreferrer">채용정보 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popReportTerm.do?apbaId=C0862&reportFormRootNo=7030" target="_blank" rel="noopener noreferrer">입찰정보 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popSusi.do?apbaId=C0862&reportFormRootNo=B1040" target="_blank" rel="noopener noreferrer">연구보고서 <span className="sr-only">(새창열림)</span></a></li>
                                  <li><a href="http://www.alio.go.kr/popSusi.do?apbaId=C0862&reportFormRootNo=B1060" target="_blank" rel="noopener noreferrer">기타정보공개 <span className="sr-only">(새창열림)</span></a></li>
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
    </ScreenShell>
  );
}
