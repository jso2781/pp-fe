/**
 * 화면ID: KIDS-PP-US-IN-17
 * 화면명: 클린신고센터
 * 화면경로: /ko/about/ethics/CleanCenter
 * 화면설명: 클린신고센터
 */
import DepsLocation from '@/components/common/DepsLocation'
import Lnb from '@/components/common/Lnb'
import { useAuth } from '@/contexts/AuthContext';
import { paginationDshstyDclrList } from '@/features/dclr/DshstyDclrSelector';
import { selectDshstyDclrList } from '@/features/dclr/DshstyDclrThunks';
import type { DshstyDclrListPVO, DshstyDclrRVO } from '@/features/dclr/DshstyDclrTypes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Box, Link, Pagination, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CleanCenter() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const { list, totalCount, loading } = useAppSelector(s => s.dclr);
  const paginaList = useAppSelector(s => paginationDshstyDclrList(s, page));
  const navigate = useNavigate();

  const currentUrl = location.pathname;

  const totalPages = Math.max(1, Math.ceil((totalCount || 1) / 10));

  useEffect(() => {
    scrollTo(0, 0);

    if(true) {//TODO Any-Id 인증 여부
      dispatch(selectDshstyDclrList({} as DshstyDclrListPVO));
    }
  }, []);
  

  const handleWriteForm = () => {
    if(true){
      navigate('/ko/about/ethics/CleanForm');
    }
    //TODO Any-Id 인증이 안되있다면 본인인증 페이지로 이동
    // navigate('/');
  }

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
                  {/* <div className="btn-group center">
                    <button type="button" className="btn_default w260">로그인하기</button>
                  </div> */}

                  <div className="mb40"></div>

                  {/* {(isAuthenticated || true) && // (isAuthenticated || Any-Id 인증여부) TODO Any-Id 인증여부 확인 후 추가 필요 */}
                  {(isAuthenticated) ?
                    <>
                      <div className="section-title-group">
                        <h3 className="section-title">클린신고서 목록</h3>
                        <div className="controller">
                          <button className="btn_outline_sub small" onClick={handleWriteForm}>신고서 작성</button>
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
                            {list.length > 0
                            ?
                              <>
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
                                  {paginaList.map((dshstyDclrRVO: DshstyDclrRVO, i: number) => (
                                    <tr key={`clean-${i}`}>
                                      <td>{(list.length - i) - ((page - 1) * 10)}</td>
                                      <td>
                                        <Link
                                          component={RouterLink}
                                          to={`/ko/about/ethics/CleanDetail`}
                                          color="inherit"
                                          aria-label={`${dshstyDclrRVO.dclrTtlNm} 상세보기`}
                                          underline="hover"
                                          sx={{ 
                                            display: 'inline-block',
                                            width: '100%',
                                            fontWeight: 500,
                                            cursor: 'pointer'
                                          }}
                                          state={dshstyDclrRVO}
                                        >
                                          {dshstyDclrRVO.dclrTtlNm}
                                        </Link>
                                      </td>
                                      <td>접수완료</td>
                                      <td>{dshstyDclrRVO?.regDt?.split('.')[0]}</td>
                                      <td>-</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </>
                            :
                              <tbody>
                                <tr>
                                  <td colSpan={5}>
                                    <div className="no-data">
                                      <p>등록하신 클린신고서가 없습니다.</p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            }
                          </table>
                          <Stack className="paging-wrap">
                            <Pagination
                              count={totalPages}
                              page={page}
                              onChange={(_, page) => setPage(page)}
                            />
                          </Stack>
                        </div>
                      </div>
                    </>
                    :
                    <div className="section-title-group">
                      <div className="controller">
                        <button className="btn_outline_sub small" onClick={handleWriteForm}>신고서 작성</button>
                      </div>
                    </div>
                  }
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


