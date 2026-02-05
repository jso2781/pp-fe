import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../ScreenShell';

export default function KIDS_PP_US_PI_03() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '오프라인 보고' 
    },
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-PI-03" title="오프라인 보고" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>오프라인 보고</span>
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

                  <section className="pageCont-AdverseOffline">
                    <h3 className="section-title">한국의약품안전관리원 대표 연락처</h3>  
                    <div className="base-table-container">
                      <div className="table-responsive">
                        <table className="base-table table-type-2">
                          <caption className="sr-only">한국의약품안전관리원 대표 연락처</caption>
                          <colgroup>
                            <col style={{ width: '45%' }} />
                            <col />
                          </colgroup>
                          <tbody>
                            <tr>
                              <th scope="row"><span className="fw-700">전화</span></th>
                              <td><span className="fw-700">1644-6223(또는 14-3330)</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <h3 className="section-title">지역의약품안전센터 대표 연락처</h3>  
                    <div className="base-table-container">
                      <div className="table-responsive">
                        <table className="base-table table-type-2">
                          <caption className="sr-only">지역 약물감시센터: 지역, 센터명, 전화번호 정보 제공</caption>
                          <colgroup>
                            <col style={{ width: '15%' }} />
                            <col />
                            <col style={{ width: '25%' }} />
                          </colgroup>
                          <thead>
                            <tr>
                              <th scope="col">지역</th>
                              <th scope="col">센터명</th>
                              <th scope="col">전화번호</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">전국약국 통합</th>
                              <td>
                                <a href="http://www.kpanet.or.kr/" target="_blank" rel="noopener noreferrer" title="대한약사회 홈페이지 바로가기(새 창 열림)">
                                  대한약사회
                                </a>
                              </td>
                              <td>02-582-7896</td>
                            </tr>
                            <tr>
                              <th scope="row">공공의료기관</th>
                              <td>
                                <a href="https://www.nmc.or.kr/" target="_blank" rel="noopener noreferrer" title="국립중앙의료원 홈페이지 바로가기(새 창 열림)">
                                  국립중앙의료원
                                </a>
                              </td>
                              <td>02-2262-4865</td>
                            </tr>
                            <tr>
                              <th scope="row">한약(생약)제제</th>
                              <td>
                                <a href="http://www.dumc.or.kr/index02.jsp" target="_blank" rel="noopener noreferrer" title="동국대학교 일산한방병원 홈페이지 바로가기(새 창 열림)">
                                  동국대학교 일산한방병원
                                </a>
                              </td>
                              <td>031-961-8441</td>
                            </tr>
                            <tr>
                              <th scope="row">서울</th>
                              <td>
                                <a href="http://www.cmcseoul.or.kr/" target="_blank" rel="noopener noreferrer" title="가톨릭대학교 서울성모병원 홈페이지 바로가기(새 창 열림)">
                                  가톨릭대학교 서울성모병원
                                </a>
                              </td>
                              <td>02-2258-2533</td>
                            </tr>
                            <tr>
                              <th scope="row">서울</th>
                              <td>
                                <a href="http://guro.kumc.or.kr/" target="_blank" rel="noopener noreferrer" title="고려대학교 구로병원 홈페이지 바로가기(새 창 열림)">
                                  고려대학교 구로병원
                                </a>
                              </td>
                              <td>02-2626-1657</td>
                            </tr>
                            <tr>
                              <th scope="row">서울</th>
                              <td>
                                <a href="http://www.samsunghospital.com/" target="_blank" rel="noopener noreferrer" title="삼성서울병원 홈페이지 바로가기(새 창 열림)">
                                  삼성서울병원
                                </a>
                              </td>
                              <td>02-3410-3392</td>
                            </tr>
                            <tr>
                              <th scope="row">서울</th>
                              <td>
                                <a href="http://www.snuh.org/" target="_blank" rel="noopener noreferrer" title="서울대학교병원 홈페이지 바로가기(새 창 열림)">
                                  서울대학교병원
                                </a>
                              </td>
                              <td>02-2072-2684</td>
                            </tr>
                            <tr>
                              <th scope="row">서울</th>
                              <td>
                                <a href="http:/amc.seoul.kr" target="_blank" rel="noopener noreferrer" title="서울아산병원 홈페이지 바로가기(새 창 열림)">
                                  서울아산병원
                                </a>
                              </td>
                              <td>02-3010-1020</td>
                            </tr>
                            <tr>
                              <th scope="row">서울</th>
                              <td>
                                <a href="http://severance.healthcare/" target="_blank" rel="noopener noreferrer" title="연세대학교 세브란스병원 홈페이지 바로가기(새 창 열림)">
                                  연세대학교 세브란스병원
                                </a>
                              </td>
                              <td>02-2228-1966</td>
                            </tr>
                            <tr>
                              <th scope="row">서울</th>
                              <td>
                                <a href="http://cauhs.or.kr/" target="_blank" rel="noopener noreferrer" title="중앙대학교병원 홈페이지 바로가기(새 창 열림)">
                                  중앙대학교병원
                                </a>
                              </td>
                              <td>02-6299-1330</td>
                            </tr>
                            <tr>
                              <th scope="row">서울</th>
                              <td>
                                <a href="https://www.hyumc.com/" target="_blank" rel="noopener noreferrer" title="한양대학교병원 홈페이지 바로가기(새 창 열림)">
                                  한양대학교병원
                                </a>
                              </td>
                              <td>02-2290-9061</td>
                            </tr>
                            <tr>
                              <th scope="row">인천‧경기</th>
                              <td>
                                <a href="http://www.snubh.org/" target="_blank" rel="noopener noreferrer" title="분당서울대학교병원 홈페이지 바로가기(새 창 열림)">
                                  분당서울대학교병원
                                </a>
                              </td>
                              <td>031-787-2478</td>
                            </tr>
                            <tr>
                              <th scope="row">인천‧경기</th>
                              <td>
                                <a href="http://hosp.ajoumc.or.kr/" target="_blank" rel="noopener noreferrer" title="아주대학교병원 홈페이지 바로가기(새 창 열림)">
                                  아주대학교병원
                                </a>
                              </td>
                              <td>031-219-4039</td>
                            </tr>
                            <tr>
                              <th scope="row">인천‧경기</th>
                              <td>
                                <a href="http://www.inha.com/" target="_blank" rel="noopener noreferrer" title="인하대학교병원 홈페이지 바로가기(새 창 열림)">
                                  인하대학교병원
                                </a>
                              </td>
                              <td>032-890-3319</td>
                            </tr>
                            <tr>
                              <th scope="row">인천‧경기</th>
                              <td>
                                <a href="https://dongtan.hallym.or.kr/" target="_blank" rel="noopener noreferrer" title="한림대학교 동탄성심병원 홈페이지 바로가기(새 창 열림)">
                                  한림대학교 동탄성심병원
                                </a>
                              </td>
                              <td>031-8086-3126</td>
                            </tr>
                            <tr>
                              <th scope="row">강원</th>
                              <td>
                                <a href="http://chuncheon.hallym.or.kr/" target="_blank" rel="noopener noreferrer" title="한림대학교 춘천성심병원 홈페이지 바로가기(새 창 열림)">
                                  한림대학교 춘천성심병원
                                </a>
                              </td>
                              <td>033-240-5265</td>
                            </tr>
                            <tr>
                              <th scope="row">대구‧경북</th>
                              <td>
                                <a href="http://knuh.kr/" target="_blank" rel="noopener noreferrer" title="경북대학교병원 홈페이지 바로가기(새 창 열림)">
                                  경북대학교병원
                                </a>
                              </td>
                              <td>053-200-6560</td>
                            </tr>
                            <tr>
                              <th scope="row">대구‧경북</th>
                              <td>
                                <a href="http://www.dsmc.or.kr/" target="_blank" rel="noopener noreferrer" title="계명대 동산병원 홈페이지 바로가기(새 창 열림)">
                                  계명대학교 동산병원
                                </a>
                              </td>
                              <td>053-258-6697</td>
                            </tr>
                            <tr>
                              <th scope="row">부산‧울산‧경남</th>
                              <td>
                                <a href="http://www.damc.or.kr/" target="_blank" rel="noopener noreferrer" title="동아대학교병원 홈페이지 바로가기(새 창 열림)">
                                  동아대학교병원
                                </a>
                              </td>
                              <td>051-240-5860</td>
                            </tr>
                            <tr>
                              <th scope="row">부산‧울산‧경남</th>
                              <td>
                                <a href="https://www.pnuh.or.kr/" target="_blank" rel="noopener noreferrer" title="부산대학교병원 홈페이지 바로가기(새 창 열림)">
                                  부산대학교병원
                                </a>
                              </td>
                              <td>051-240-7926</td>
                            </tr>
                            <tr>
                              <th scope="row">부산‧울산‧경남</th>
                              <td>
                                <a href="https://www.uuh.ulsan.kr/kr/" target="_blank" rel="noopener noreferrer" title="울산대학교병원 홈페이지 바로가기(새 창 열림)">
                                  울산대학교병원
                                </a>
                              </td>
                              <td>052-250-7521</td>
                            </tr>
                            <tr>
                              <th scope="row">부산‧울산‧경남</th>
                              <td>
                                <a href="https://www.paik.ac.kr/haeundae/user/main/view.do" target="_blank" rel="noopener noreferrer" title="인제대 부산백병원 홈페이지 바로가기(새 창 열림)">
                                  인제대학교 해운대백병원
                                </a>
                              </td>
                              <td>051-797-2542</td>
                            </tr>
                            <tr>
                              <th scope="row">광주·전라·제주</th>
                              <td>
                                <a href="http://www.jbuh.co.kr/" target="_blank" rel="noopener noreferrer" title="전북대학교병원 홈페이지 바로가기(새 창 열림)">
                                  전북대학교병원
                                </a>
                              </td>
                              <td>063-250-2801</td>
                            </tr>
                            <tr>
                              <th scope="row">광주·전라·제주</th>
                              <td>
                                <a href="http://www.cnuh.com/" target="_blank" rel="noopener noreferrer" title="전남대학교병원 홈페이지 바로가기(새 창 열림)">
                                  전남대학교병원
                                </a>
                              </td>
                              <td>062-220-5321</td>
                            </tr>
                            <tr>
                              <th scope="row">광주·전라·제주</th>
                              <td>
                                <a href="http://hosp.chosun.ac.kr/" target="_blank" rel="noopener noreferrer" title="조선대학교병원 홈페이지 바로가기(새 창 열림)">
                                  조선대학교병원
                                </a>
                              </td>
                              <td>062-220-3969</td>
                            </tr>
                            <tr>
                              <th scope="row">대전·세종·충청</th>
                              <td>
                                <a href="http://www.dkuh.co.kr/" target="_blank" rel="noopener noreferrer" title="단국대학교병원 홈페이지 바로가기(새 창 열림)">
                                  단국대학교병원
                                </a>
                              </td>
                              <td>041-550-6693</td>
                            </tr>
                            <tr>
                              <th scope="row">대전·세종·충청</th>
                              <td>
                                <a href="https://www.cnuh.co.kr/" target="_blank" rel="noopener noreferrer" title="충남대학교병원 홈페이지 바로가기(새 창 열림)">
                                  충남대학교병원
                                </a>
                              </td>
                              <td>042-280-6108</td>
                            </tr>
                            <tr>
                              <th scope="row">대전·세종·충청</th>
                              <td>
                                <a href="https://www.cbnuh.or.kr/" target="_blank" rel="noopener noreferrer" title="충북대학교병원 홈페이지 바로가기(새 창 열림)">
                                  충북대학교병원
                                </a>
                              </td>
                              <td>043-269-6769</td>
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
