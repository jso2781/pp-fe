import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../../ScreenShell';

export default function KIDS_PP_US_IN_06() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '설립근거 및 관련법령' 
    },
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-IN-05" title="설립근거 및 관련법령" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>설립근거 및 관련법령</span>
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

                  <section className="pageCont-AboutLaw">
                    <h3 className="section-title">설립근거</h3>
                    <div className="section-desc">
                      <p className="mb15">(설립목적) 의약품 부작용 및 품목허가정보 등 의약품 안전과 관련한 각종 정보의 수집, 관리, 분석, 평가 제공 업무의 효율적, 체계적 수행을 목적으로 함.</p>
                      <div className="box-type-3 mb24">
                        <p>취약요인 선제대응으로 국민안심 확보 및 의약품 부작용 정보의 자체수집 분석기반(한국형 Medwatch 시스템) 마련을 통해 
                            선진국 수준의 의약품 안전정보 관리체계 조성 ※ 관련근거 : 약사법 제68조의3(설립)</p>
                      </div>
                      <p>(주요사업) 약사법 제68조의4(사업)에 따라, 식품의약품안전처(장)으로 위탁받은 사업 및 대통령령으로 정하는 수입사업</p>
                      <p className="mb15">마약류 관리에 관한 법률 시행령 제8조(마약류통합정보관리센터의 지정 등)에 따라, 마약류통합정보관리센터지정되어 위탁된 업무</p>
                      <div className="box-type-3">
                        <ul className="num-list">
                          <li>
                            <span className="num">①</span>
                            <p className="txt">약화사고 등 의약품 부작용 인과관계 조사・규명</p>
                          </li>
                          <li>
                            <span className="num">②</span>
                            <p className="txt">의약품안전정보의 수집 및 관리를 위한 의약품안전정보관리시스템 구축</p>
                          </li>
                          <li>
                            <span className="num">③</span>
                            <p className="txt">의약품안전정보의 수집·분석·평가·관리 및 제공</p>
                          </li>
                          <li>
                            <span className="num">④</span>
                            <p className="txt">의악품안전정보의 개발・활용을 위한 조사연구 및 교육‧홍보</p>
                          </li>
                          <li>
                            <span className="num">⑤</span>
                            <p className="txt">의약품부작용 피해구제</p>
                          </li>
                          <li>
                            <span className="num">⑥</span>
                            <p className="txt">마약류통합정보관리</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h3 className="section-title">관련법령 상세</h3>
                    <div className="section-desc">
                      <div className="base-table-container">
                        <div className="table-responsive">
                          <table className="base-table table-type-3">
                            <caption className="sr-only">테이블제목</caption>
                            <colgroup>
                              <col style={{ width: '40%' }} />
                              <col style={{ width: '40%' }} />
                              <col style={{ width: '20%' }} />
                            </colgroup>
                            <thead>
                              <tr>
                                <th scope="col">약사법 전</th>
                                <th scope="col">약사법 시행령</th>
                                <th scope="col">정관</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <a href="https://www.law.go.kr/lsSc.do?menuId=1&subMenuId=15&query=%EC%95%BD%EC%82%AC%EB%B2%95&dt=20201211#liBgcolor4" className="underline" target="_blank"  rel="noopener noreferrer" title="바로가기(새 창 열림)">
                                    법제처 링크
                                    <span className="sr-only">(새 창 열림)</span>
                                  </a>
                                </td>
                                <td>
                                  <a href="https://www.law.go.kr/LSW/lsSc.do?section=&menuId=1&subMenuId=15&tabMenuId=81&eventGubun=060101&query=%EC%95%BD%EC%82%AC%EB%B2%95+%EC%8B%9C%ED%96%89%EB%A0%B9#undefined" className="underline" target="_blank"  rel="noopener noreferrer" title="바로가기(새 창 열림)">
                                    법제처 링크
                                    <span className="sr-only">(새 창 열림)</span>
                                  </a>
                                </td>
                                <td></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
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
