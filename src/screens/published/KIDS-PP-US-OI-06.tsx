import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../ScreenShell';

export default function KIDS_PP_US_OI_06() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '공공데이터 개방' 
    },
  ], []);

  //return <FormTemplate screenId="KIDS-PP-US-OI-06" title="공공데이터 개방" config={config} />
  return (
    <ScreenShell screenId="KIDS-PP-US-OI-06" title="공공데이터 개방" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>공공데이터 개방</span>
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

                  <section className="pageCont-AdverseIntro">
                    <div className="info-summary-box">
                      <h3 className="info-summary-box__title">공공데이터 개방이란?</h3>
                      <div className="info-summary-box__desc">
                        <p>국가기관이 보유·관리하는 데이터를 민간이 활용할 수 있도록 공개·제공하는 것</p>
                      </div>
                    </div> 
                    <h3 className="section-title">왜 공공 데이터를 개방해야 하나?</h3>
                    <div className="section-desc">
                      <dl className="list-definition">
                        <dt>투명성 제고</dt>
                        <dd>
                          <ul className="list-bullet-3">
                              <li>각국의 전자정부 구현 수준이 고도화 되면서 공급자 측면에서의 구현단계를 지나, 시민참여를 확대시키는 새로운 단계로 진입</li>
                          </ul>
                        </dd>
                        <dt>공개요구 증대</dt>
                        <dd>
                          <ul className="list-bullet-3">
                              <li>영리, 비영리 측면에서 공공 데이터를 활용하기 위해 공개를 요구하는 시민의 새로운 수요 급증</li>
                          </ul>
                        </dd>
                        <dt>신규서비스 창출</dt>
                        <dd>
                          <ul className="list-bullet-3">
                              <li>급변하는 ICT 신기술을 기반으로한 서비스가 다양화 되면서, 공공 데이터를 활용한 부가가치 서비스를 창출</li>
                          </ul>
                        </dd>
                      </dl>
                    </div>
                    <h3 className="section-title">공공데이터 제공</h3>
                    <div className="section-desc">
                      <p className="mb24">전 공공기관에서 개방 중인 데이터는 행정안전부 공공데이터포털(www.data.go.kr)에서 확인 가능</p>
                      <div className="btn-group-control right">
                        <a 
                          href="https://www.data.go.kr" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn_outline"
                          title="공공데이터 포털 사이트로 이동(새창)"
                        >
                          공공데이터 포털 이동 <span className="sr-only">(새창)</span>
                        </a>
                        
                        <a 
                          href="https://www.data.go.kr/tcs/dor/insertDataOfferReqstProcssView.do" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn_outline"
                          title="공공데이터 제공신청 안내 페이지로 이동(새창)"
                        >
                          공공데이터 제공신청 안내 <span className="sr-only">(새창)</span>
                        </a>
                      </div>
                    </div>
                    <h3 className="section-title">공공데이터 제공 책임관 및 실무담당자 </h3>
                    <div className="section-desc">
                      <div className="base-table-container">
                        <div className="table-responsive has-scroll">
                          <table className="base-table table-type-2">
                            <caption className="sr-only">공공데이터 제공 책임관 및 실무담당자 정보</caption>
                            <colgroup>
                                <col style={{ width: '20%' }} />
                                <col style={{ width: '18%' }} />
                                <col style={{ width: '10%' }} />
                                <col style={{ width: '20%' }} />
                                <col />
                              </colgroup>
                            <thead>
                              <tr>
                                <th scope="col">구분</th>
                                <th scope="col">부서/직위</th>
                                <th scope="col">성명</th>
                                <th scope="col">연락처</th>
                                <th scope="col">이메일</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">공공데이터 제공 책임관</th>
                                <td>기획경영본부/본부장</td>
                                <td>정대현</td>
                                <td>02-2172-3860</td>
                                <td>dhjeong0323@drugsafe.or.kr</td>
                              </tr>
                              <tr>
                                <th scope="row">공공데이터 실무 담당자</th>
                                <td>정보화팀/대리</td>
                                <td>하연경</td>
                                <td>02-2172-3819</td>
                                <td>ygha3@drugsafe.or.kr</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <h3 className="section-title">공공데이터 의견제안</h3>
                    <div className="suggestion-section">
                      <form>
                        <div className="suggestion-field-set">
                          <label htmlFor="public-opinion" className="sr-only">의견 제안 내용</label>
                          <textarea 
                            id="public-opinion" 
                            className="suggestion-input" 
                            placeholder="공공데이터에 대한 의견이나 제안사항을 입력해 주세요."
                          ></textarea>
                          <button type="submit" className="btn_default">제출</button>
                        </div>
                      </form>
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
