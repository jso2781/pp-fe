import React from 'react';
import { useState } from "react";
import { Box, InputBase, IconButton, Tabs, Tab, Typography, Button, Link, Pagination, Stack} from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import { useSearchParams } from 'react-router-dom';
import DepsLocation from '@/components/common/DepsLocation';
import SearchIcon from '@mui/icons-material/Search';
import EastIcon from '@mui/icons-material/East';
import LaunchIcon from '@mui/icons-material/Launch';
import ScreenShell from '../../ScreenShell';

export default function KIDS_PP_US_IS_01() {

   // 탭
  const categoryNaming: Record<string, string> = {
     all: "전체(2)",
    TAB1: "주요업무(2)",
    TAB2: "정보공개(2)",
    TAB3: "기관소식(2)",
    TAB4: "기관소개(2)",
  };
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveCategory(newValue);
  };
  
  //검색결과 정렬기준
  const [sort, setSort] = useState("relevance");
  const sortOptions = [
    { value: "relevance", label: "관련도순" },
    { value: "latest", label: "최신순" },
  ];

  //페이징
  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = Number(searchParams.get('page') || 1);
  const { list, totalCount } = useAppSelector((s) => s.pst);
  const totalPages = Math.max(1, Math.ceil((totalCount || 1) / 10));

  //return <ListTemplate screenId="KIDS-PP-US-IS-01" title="통합검색 결과" config={config} />
  return (
    <ScreenShell screenId="KIDS-PP-US-IS-01" title="통합검색 결과" uiType="list">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">
            {/* 컨텐츠 본문 영역 */}
            <Box className="sub-content">
              <DepsLocation />
              <Box className="content-view" id="content">
                <Box className="page-content">
                {/* --- 본문 시작 --- */}

                  <section className="pageCont-integrated-search" aria-label="통합검색 섹션">
                    <Box className="search-form-box">
                      <Box component="form" noValidate role="search" onSubmit={(e) => e.preventDefault()} className="search-form">
                        <InputBase
                          className="search-input"
                          placeholder="검색어를 입력하세요."
                          inputProps={{ 
                            'aria-label': '통합검색어 입력',
                            'type': 'search'
                          }}
                        />
                        <IconButton 
                          type="submit" 
                          className="search-button"
                          aria-label="검색 실행"
                        >
                          <SearchIcon aria-hidden="true" /> 
                        </IconButton>
                      </Box>  
                    </Box>

                    <Box className="mb40"></Box>

                    <Box className="category-tabs box-variant" role="navigation" aria-label="기본 카테고리 선택">
                      <Tabs
                        value={activeCategory} 
                        onChange={handleTabChange}
                        scrollButtons="auto"
                        selectionFollowsFocus
                      >
                        {Object.keys(categoryNaming).map((category) => (
                          <Tab 
                            key={`type1-${category}`} 
                            value={category} 
                            label={categoryNaming[category]} 
                            id={`tab-type1-${category}`}
                            aria-controls={`tabpanel-type1-${category}`}
                          />
                        ))}
                      </Tabs>
                    </Box>

                    {Object.keys(categoryNaming).map((category) => (
                      <Box
                        key={`panel-type1-${category}`}
                        role="tabpanel" 
                        id={`tabpanel-type1-${category}`} // Tab의 aria-controls와 매칭
                        aria-labelledby={`tab-type1-${category}`} // 이 패널의 이름이 무엇인지 연결
                        hidden={activeCategory !== category} // 선택되지 않은 패널은 숨김
                        className="tab-panel-container"
                      >
                        {activeCategory === category && (
                          <Box className="panel-content">
                            <Typography className="sr-only">{categoryNaming[category]} 탭 컨텐츠 </Typography>
                            {/* 테스트용 */}{categoryNaming[category]} 내용이 출력됩니다.{/* 테스트용 */}

                            <Box className="search-summary">
                              <Box className="search-meta">
                                <Box className="board-info board-keyword" aria-label="적용된 검색어">
                                  <Typography className="board-count">
                                    적용된 검색어 ‘<Typography component="span" className="count">DUR</Typography>’
                                  </Typography>
                                </Box>
                                <Box className="board-info board-result" aria-label="게시판 검색결과">
                                  <Typography className="board-count">
                                    검색결과 <Typography component="span" className="count">1</Typography>건
                                  </Typography>
                                </Box>
                              </Box>
                              <Box className="filter-control">
                                <Typography className="sort-label">정렬기준</Typography>
                                <ul className="sort-list">
                                  {sortOptions.map((option) => (
                                    <li key={option.value}>
                                      <button
                                        type="button"
                                        className={`sort-item ${sort === option.value ? "active" : ""}`}
                                        onClick={() => setSort(option.value)}
                                      >
                                        {option.label}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </Box>
                            </Box>

                            <Box className="search-result-list">
                              <Box className="item">
                                <Box className="item-meta">
                                  <span className="badge">의약품 정보</span>
                                  <span className="date">2025.11.01</span>
                                </Box>
                                <Box className="item-body">
                                  <dl className="item-txt">
                                    <dt>의약품적정사용 <span className="keyword">(DUR)</span> 특정연령대 금기 정보</dt>
                                    <dd>
                                      <span className="keyword">DUR</span> 의약품적정사용 정보는 특정연령대 금기 정보에 따라 허가사항(사용상의 주의사항)을 변경지시하였음을 알려드리니 관련 업무에 참고하시기 바랍니다. 두 줄 이상의 내용은 말줄임을 표시하도록 함.
                                    </dd>
                                  </dl>
                                  <Box className="item-thumb">
                                    <img src="/fe/img/img_test.png" alt="썸네일" />
                                  </Box>
                                </Box>
                                <Box className="item-action"> 
                                  <Box className="depth-path">
                                    <span>기관소식</span>
                                    <Link href="/" className="loc-link">뉴스・소식</Link>
                                  </Box>
                                  <Button 
                                    className="btn-more" 
                                    endIcon={<EastIcon />}
                                    size="small"
                                  >
                                    자세히보기
                                  </Button>
                                </Box>
                              </Box>
                              <Box className="item">
                                <Box className="item-meta">
                                  <span className="badge">의약품 정보</span>
                                  <span className="date">2025.11.01</span>
                                </Box>
                                <Box className="item-body">
                                  <dl className="item-txt">
                                    <dt>의약품적정사용 <span className="keyword">(DUR)</span> 특정연령대 금기 정보</dt>
                                    <dd>
                                      <span className="keyword">DUR</span> 의약품적정사용 정보는 특정연령대 금기 정보에 따라 허가사항(사용상의 주의사항)을 변경지시하였음을 알려드리니 관련 업무에 참고하시기 바랍니다. 두 줄 이상의 내용은 말줄임을 표시하도록 함.
                                    </dd>
                                  </dl>
                                </Box>
                                <Box className="item-action"> 
                                  <Box className="depth-path">
                                    <span>기관소식</span>
                                    <Link href="/" className="loc-link">뉴스・소식</Link>
                                  </Box>
                                  <Button 
                                    className="btn-more" 
                                    endIcon={<EastIcon />}
                                    size="small"
                                  >
                                    자세히보기
                                  </Button>
                                </Box>
                              </Box>
                              <Box className="item">
                                <Box className="item-meta">
                                  <span className="badge">의약품 정보</span>
                                </Box>
                                <Box className="item-body">
                                  <dl className="item-txt">
                                    <dt>의약품적정사용 <span className="keyword">(DUR)</span> 특정연령대 금기 정보</dt>
                                    <dd>
                                      <span className="keyword">DUR</span> 의약품적정사용 정보는 특정연령대 금기 정보에 따라 허가사항(사용상의 주의사항)을 변경지시하였음을 알려드리니 관련 업무에 참고하시기 바랍니다. 두 줄 이상의 내용은 말줄임을 표시하도록 함.
                                    </dd>
                                  </dl>
                                </Box>
                                <Box className="item-action"> 
                                  <Link 
                                    href="https://labor.moel.go.kr/cmmt/calRtrmnt.do" 
                                    className="btn-blank-link"
                                    target="_blank" 
                                    rel="noopener" 
                                    underline="hover"
                                  >
                                    https://labor.moel.go.kr/cmmt/calRtrmnt.do
                                    <LaunchIcon className="link-icon" />
                                  </Link>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                          /* panel-content */
                        )}
                      </Box>
                    ))}
                    <Stack className="paging-wrap">
                      <Pagination count={totalPages} page={pageIndex} onChange={(_, p) => {
                        const next = new URLSearchParams(searchParams);
                        next.set('page', String(p));
                        setSearchParams(next);
                      }} />
                    </Stack>

                    {/* 검색 전 초기 상태 */}
                    <Box className="search-status-box status-empty">
                      <p className="status-title">검색어를 입력해주세요.</p>
                    </Box>

                    {/* 검색 결과가 없는 상태 */}
                    <Box className="search-status-box status-no-result">
                      <p className="status-title">검색 결과가 없습니다.</p>
                      <p className="status-desc">
                        입력하신 검색 결과가 없습니다. 통합검색 창에서 검색어를 다시 입력해주세요.
                      </p>
                    </Box>
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
