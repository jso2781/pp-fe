/**
 * 화면ID: KIDS-PP-US-IS-01
 * 화면명: 통합검색
 * 화면경로: /pp/ko/search/IntegratedSearch
 * 화면설명: 통합검색(키워드 검색)
 */
import React, { useEffect } from 'react';
import { useState } from "react";
import { Box, InputBase, IconButton, Tabs, Tab, Typography, Button, Link, Pagination, Stack} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useSearchParams } from 'react-router-dom';
import DepsLocation from '@/components/common/DepsLocation';
import SearchIcon from '@mui/icons-material/Search';
import EastIcon from '@mui/icons-material/East';
import LaunchIcon from '@mui/icons-material/Launch';
import { useTranslation } from 'react-i18next';
import { getIntegratedSearchJson } from '@/features/search/IntegratedSearchThunks';
import { resetResults } from '@/features/search/IntegratedSearchSlice';
import { IntegratedSearchPVO, SearchItem } from '@/features/search/IntegratedSearchTypes';

/** 탭 키 → current 내 리스트 접근용 */
const TAB_LIST_KEYS = ['all', 'mainTask', 'infoOpen', 'instNews', 'instIntro'] as const;
const PAGE_SIZE = 10;

/**
 * HTML 문자열에서 태그 내부가 아닌 텍스트만 검색 키워드와 매칭하여
 * <span class="keyword">매칭문자열</span> 로 감싼 HTML 반환.
 * 검색어는 공백 기준 여러 개 지원, 대소문자 무시.
 */
function highlightKeywordInHtml(html: string, searchText: string): string {
  const raw = html ?? '';
  const keywords = (searchText ?? '').trim().split(/\s+/).filter(Boolean);
  if (keywords.length === 0) return raw;

  const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const segments = raw.split(/(<[^>]*>)/g);

  const highlighted = segments.map((seg) => {
    if (seg.startsWith('<') && seg.endsWith('>')) return seg;
    let text = seg;
    for (const kw of keywords) {
      const re = new RegExp(`(${escapeRegex(kw)})`, 'gi');
      text = text.replace(re, '<span class="keyword">$1</span>');
    }
    return text;
  });

  return highlighted.join('');
}

function getListForCategory(current: { totalList: SearchItem[]; mainTaskList: SearchItem[]; infoOpenList: SearchItem[]; instNewsList: SearchItem[]; instIntroList: SearchItem[] } | null, category: string): SearchItem[] {
  if (!current) return [];
  switch (category) {
    case 'all': return current.totalList ?? [];
    case 'mainTask': return current.mainTaskList ?? [];
    case 'infoOpen': return current.infoOpenList ?? [];
    case 'instNews': return current.instNewsList ?? [];
    case 'instIntro': return current.instIntroList ?? [];
    default: return [];
  }
}

export default function IntegratedSearch() {
    const { t, i18n: i18nInstance } = useTranslation();
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchText = searchParams.get('searchText') ?? '';
    const sortBy = searchParams.get('sortBy') ?? 'relevance';

    /** 검색 입력란 값 (URL과 동기화, 폼 제출 시 searchParams 반영용) */
    const [localSearchInput, setLocalSearchInput] = useState(searchText);
    const [localSortBy, setLocalSortBy] = useState(sortBy);

    useEffect(() => {
      setLocalSearchInput(searchText);
      setLocalSortBy(sortBy);
    }, [searchText, sortBy]);

    const { current, loading } = useAppSelector((s) => s.integratedSearch);

    /** 검색어 공백 제거 후 2자 미만이면 조회하지 않고 결과 초기화, 2자 이상일 때만 API 호출 */
    useEffect(() => {
        const trimmed = searchText.trim();
        if (trimmed.length < 2) {
            dispatch(resetResults());
            return;
        }
        dispatch(getIntegratedSearchJson({ searchText: trimmed, sortBy: localSortBy, langSeCd: i18nInstance.language === 'ko' ? 'KOR' : 'ENG'}));
    }, [dispatch, searchText, localSortBy]);

    /** 탭별 현재 페이지 (탭 전환 시 유지, 검색 결과 갱신 시 1로 초기화) */
    const [tabPageNum, setTabPageNum] = useState<Record<string, number>>({
      all: 1, mainTask: 1, infoOpen: 1, instNews: 1, instIntro: 1,
    });

    useEffect(() => {
      setTabPageNum({ all: 1, mainTask: 1, infoOpen: 1, instNews: 1, instIntro: 1 });
    }, [current]);

    /** 탭별 전체 리스트에서 현재 페이지만 잘라서 반환 (클라이언트 페이징) */
    const getPagedTabList = (category: string) => {
      const list = getListForCategory(current, category);
      const totalCount = list.length;
      const currentPage = tabPageNum[category] ?? 1;
      const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
      const start = (currentPage - 1) * PAGE_SIZE;
      const pagedList = list.slice(start, start + PAGE_SIZE);
      return { pagedList, totalCount, totalPages, currentPage };
    };

    const setTabPage = (category: string, page: number) => {
      setTabPageNum((prev) => ({ ...prev, [category]: page }));
    };

    // 탭 라벨: 탭명(건수) — 데이터 없으면 0으로 표기
    const categoryNaming: Record<string, string> = {
      all: `${t("all")}(${current?.totalList?.length ?? 0})`,
      mainTask: `${t("mainTask")}(${current?.mainTaskList?.length ?? 0})`,
      infoOpen: `${t("infoOpen")}(${current?.infoOpenList?.length ?? 0})`,
      instNews: `${t("instNews")}(${current?.instNewsList?.length ?? 0})`,
      instIntro: `${t("instIntro")}(${current?.instIntroList?.length ?? 0})`,
    };

    const [activeCategory, setActiveCategory] = useState<string>('all');
    const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
      setActiveCategory(newValue);
    };

    // 검색결과 정렬기준 (활성 값은 URL sortBy 사용)
    const sortOptions = [
      { value: "relevance", label: t("relevance") },
      { value: "latest", label: t("latest") },
    ];

    /** 정렬 클릭: 이전 값과 다르고 검색어가 있으면 URL 갱신 → useEffect에서 조회 실행 */
    const handleSortClick = (newSortBy: string) => {
      if (newSortBy === sortBy) return;
      const next: Record<string, string> = { sortBy: newSortBy };
      if (searchText.trim()) next.searchText = searchText.trim();
      setSearchParams(next);
    };

    /** 검색어 2자 이상이면 조회된 상태로 간주 → 탭/결과 영역 표시, '검색어를 입력해주세요' 숨김 */
    const hasValidSearch = searchText.trim().length >= 2;

    /** 전체 결과 건수 (모든 탭 합산) */
    const totalResultCount = current
      ? (current.totalList?.length ?? 0) +
        (current.mainTaskList?.length ?? 0) +
        (current.infoOpenList?.length ?? 0) +
        (current.instNewsList?.length ?? 0) +
        (current.instIntroList?.length ?? 0)
      : 0;

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">
          {/* 컨텐츠 본문 영역 */}
          <Box className="sub-content">
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
                {/* --- 본문 시작 --- */}
                <section className="pageCont-integrated-search" aria-label={t("integratedSearch")}>
                  <Box className="search-form-box">
                    <Box
                      component="form"
                      noValidate
                      role="search"
                      className="search-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const trimmed = localSearchInput.trim();
                        const tempSortBy = localSortBy.trim();
                        const next: Record<string, string> = {};
                        if (trimmed) next.searchText = trimmed;
                        if (tempSortBy) next.sortBy = tempSortBy;
                        setSearchParams(next);
                      }}
                    >
                      <InputBase
                          className="search-input"
                          placeholder={t("searchKeywordInput")}
                          value={localSearchInput}
                          onChange={(e) => setLocalSearchInput(e.target.value)}
                          inputProps={{
                            'aria-label': t("integratedSearchKeywordInput"),
                            'type': 'search'
                          }}
                      />
                      <IconButton
                          type="submit"
                          className="search-button"
                          aria-label={t("search")}
                      >
                          <SearchIcon aria-hidden="true" />
                      </IconButton>
                    </Box>  
                  </Box>

                  <Box className="mb40"></Box>

                  {hasValidSearch && (
                    <>
                      <Box className="category-tabs box-variant" role="navigation" aria-label={t("basicCategorySelection")}>
                        <Tabs
                        value={activeCategory} 
                        onChange={handleTabChange}
                        scrollButtons="auto"
                        selectionFollowsFocus
                        >
                        {TAB_LIST_KEYS.map((category) => {
                          const count = getListForCategory(current, category).length;
                          return (
                            <Tab
                              key={`type1-${category}`}
                              value={category}
                              label={categoryNaming[category]}
                              id={`tab-type1-${category}`}
                              aria-controls={`tabpanel-type1-${category}`}
                              disabled={count === 0}
                            />
                          );
                        })}
                        </Tabs>
                      </Box>

                      {TAB_LIST_KEYS.map((category) => {
                        const { pagedList, totalCount, totalPages, currentPage } = getPagedTabList(category);
                        return (
                          <Box
                            key={`panel-type1-${category}`}
                            role="tabpanel"
                            id={`tabpanel-type1-${category}`}
                            aria-labelledby={`tab-type1-${category}`}
                            hidden={activeCategory !== category}
                            className="tab-panel-container"
                          >
                            {activeCategory === category && (
                              <Box className="panel-content">
                                <Typography className="sr-only">{categoryNaming[category]} {t("tabContent")}</Typography>

                                <Box className="search-summary">
                                  <Box className="search-meta">
                                      <Box className="board-info board-keyword" aria-label={t("appliedSearchKeyword")}>
                                          <Typography className="board-count">
                                            {t("appliedSearchKeyword")} ‘<Typography component="span" className="count">{searchText || '-'}</Typography>’
                                          </Typography>
                                      </Box>
                                      <Box className="board-info board-result" aria-label={t("boardSearchResult")}>
                                          <Typography className="board-count">
                                            {t("searchResult")} <Typography component="span" className="count">{totalCount}</Typography>{t("results")}
                                          </Typography>
                                      </Box>
                                  </Box>
                                  <Box className="filter-control">
                                      <Typography className="sort-label">{t("sortCriteria")}</Typography>
                                      <ul className="sort-list">
                                          {sortOptions.map((option) => (
                                            <li key={option.value}>
                                                <button
                                                  type="button"
                                                  className={`sort-item ${sortBy === option.value ? "active" : ""}`}
                                                  onClick={() => handleSortClick(option.value)}
                                                >
                                                  {option.label}
                                                </button>
                                            </li>
                                          ))}
                                      </ul>
                                  </Box>
                                </Box>
          
                                <Box className="search-result-list">
                                  {pagedList.map((item: SearchItem, idx: number) => (
                                    <Box key={`${category}-item-${item.docSn ?? idx}-${idx}`} className="item">
                                      <Box className="item-meta">
                                        <span className="badge">{item.rootMenuNm ?? ''}</span>
                                      </Box>
                                      <Box className="item-body">
                                        <dl className="item-txt">
                                          <dt className="item-tit">{item.docTtl ?? ''}</dt>
                                          <dd className="item-desc">
                                            <div dangerouslySetInnerHTML={{ __html: highlightKeywordInHtml(item.docCn ?? '', searchText) }} />
                                          </dd>
                                        </dl>
                                      </Box>
                                      <Box className="item-action">
                                        <Box className="depth-path">
                                          <span>
                                            {(item.pathNm ?? '')
                                              .split('>')
                                              .map((s) => s.trim())
                                              .filter(Boolean)
                                              .slice(0, -1)
                                              .join(' > ')}
                                          </span>
                                          <Link href={item.menuUrlAddr ?? '#'} className="loc-link">
                                            {item.menuNm ?? ''}
                                          </Link>
                                        </Box>
                                        <Button
                                          className="btn-more"
                                          component={Link}
                                          href={item.menuUrlAddr ?? '#'}
                                          endIcon={<EastIcon />}
                                          size="small"
                                        >
                                          {t("viewDetails")}
                                        </Button>
                                      </Box>
                                    </Box>
                                  ))}
                                </Box>

                                {totalCount > PAGE_SIZE && (
                                  <Stack className="paging-wrap" sx={{ mt: 2 }}>
                                    <Pagination
                                      page={currentPage}
                                      count={totalPages}
                                      onChange={(_: React.ChangeEvent<unknown>, page: number) => setTabPage(category, page)}
                                      showFirstButton
                                      showLastButton
                                    />
                                  </Stack>
                                )}
                              </Box>
                            )}
                          </Box>
                        );
                      })}
                    </>
                  )}

                  {/* 검색어 2자 미만일 때만 표시 */}
                  {!hasValidSearch && (
                    <Box className="search-status-box status-empty">
                        <p className="status-title">
                            {searchText.trim().length > 0 && searchText.trim().length < 2
                                ? t("enterAtLeastTwoCharacters")
                                : t("enterSearchKeyword")}
                        </p>
                    </Box>
                  )}

                  {/* 검색어 2자 이상인데 결과 0건일 때만 표시 */}
                  {hasValidSearch && current !== null && totalResultCount === 0 && (
                    <Box className="search-status-box status-no-result">
                        <p className="status-title">{t("noSearchResult")}</p>
                        <p className="status-desc">
                        {t("noSearchResultDescription")}
                        </p>
                    </Box>
                  )}
                </section>
                {/* --- 본문 끝 --- */}

              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
