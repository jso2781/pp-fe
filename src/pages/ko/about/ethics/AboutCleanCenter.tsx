import DepsLocation from '@/components/common/DepsLocation'
import Lnb from '@/components/common/Lnb'
import { Box, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom';

export default function AboutCleanCenter() {
  const location = useLocation();

  const currentUrl = location.pathname;

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">

          {/* Lnb 영역 */}
          <Box className="lnb-wrap">
            <Box className="lnb-menu">
              <Typography component="h2" className="lnb-tit">
                <span>윤리경영</span>
              </Typography>
              <Box className="lnb-list">
                <Lnb currentUrl={currentUrl} />
              </Box>
            </Box>
          </Box>

          {/* 컨텐츠 본문 영역 */}
          <Box className="sub-content">
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
              {/* --- 본문 시작 --- */}
                <section className="pageCont-cleanCenter">
                  <div className="info-guide-box">
                    <div className="guide-section">
                      <span className="guide-item-title">1. 신고대상</span>
                      <ul className="guide-list">
                        <li>공직자가 직무와 관련하여 그 지위 또는 권한을 남용하거나 법령을 위반하여 자기 또는 제3자의 이익을 도모하는 행위</li>
                        <li>공공기관의 예산사용, 공공기관 재산의 취득ㆍ관리ㆍ처분 또는 공공기관을 당사자로 하는 계약의 체결 및 그 이행에 있어서 법령에 위반하여 공공기관에 대하여 재산상 손해를 가하는 행위</li>
                      </ul>
                      <p className="guide-desc">위에서 규정한 행위나 그 은폐를 강요, 권고, 제의, 유인하는 행위 시 신고해주세요.</p>
                    </div>
                    <div className="guide-section">
                      <span className="guide-item-title">2. 신고방법</span>
                      <ul className="guide-list">
                        <li>본인인증 또는 정부통합로그인 후 신고서 작성 버튼을 클릭하여 작성하신 후 제출하기 버튼 클릭하면 신고가 완료됩니다.</li>
                      </ul>
                    </div>
                    <div className="guide-section">
                      <span className="guide-item-title">3. 신고자보호</span>
                      <ul className="guide-list">
                        <li>신고를 이유로 불이익 조치를 받지 않습니다.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="btn-group center">
                    <button type="button" className="btn_default w260">로그인하기</button>
                  </div>

                  <div className="mb40"></div>

                  <div className="section-title-group">
                    <h3 className="section-title">클린신고서 목록</h3>
                    <div className="controller">
                      <button className="btn_outline_sub small">신고서 작성</button>
                    </div>
                  </div>
                  <div className="base-table-container">
                    <div className="table-responsive has-scroll">
                      <table className="base-table">
                        <caption className="sr-only">신고서 목록</caption>
                        <colgroup>
                          <col style={{ width: '8%' }} />
                          <col />
                          <col style={{ width: '10%' }} />
                          <col style={{ width: '20%' }} />
                          <col style={{ width: '20%' }} />
                        </colgroup>
                        <thead>
                          <tr>
                            <th scope="col">번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">진행상태</th>
                            <th scope="col">등록일시</th>
                            <th scope="col">처리일시</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>2</th>
                            <td>클린한 관리원이 되기 위해 작성</td>
                            <td>접수완료</td>
                            <td>2026-03-31 12:34</td>
                            <td>2026-04-02 12:34</td>
                          </tr>
                          <tr>
                            <th>1</th>
                            <td>클린한 관리원이 되기 위해 작성</td>
                            <td>접수완료</td>
                            <td>2026-03-31 12:34</td>
                            <td>2026-04-02 12:34</td>
                          </tr>
                          <tr>
                            <td colSpan={5}>
                              <div className="no-data">
                                <p>등록하신 클린신고서가 없습니다.</p>
                              </div>
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
  )
}
