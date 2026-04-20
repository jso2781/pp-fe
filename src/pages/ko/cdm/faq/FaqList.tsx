/**
 * CDM FAQ 목록
 */
import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation } from 'react-router-dom';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import type { FaqItem } from '@/features/cdm/faq/FaqCdmTypes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFaqList, increaseFaqViewCount, selectFaqCategories } from '@/features/cdm/faq/FaqCdmThunks';

/** 검색어 하이라이트 컴포넌트 */
const SearchRow = ({ text, word }: { text: string; word: string }) => {
  if (!word) return <>{text}</>;
  const escaped = word.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === word.toLowerCase() ? (
          <span key={`${i}-${part}`} style={{ color: '#087c80', fontWeight: 'bold' }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

/** FAQ 아코디언 행 컴포넌트 */
interface FaqRowProps {
  faq: FaqItem;
  expanded: boolean;
  onToggle: () => void;
  searchType: string;
  searchWord: string;
}

const FaqRow = ({ faq, expanded, onToggle, searchType, searchWord }: FaqRowProps) => {
  const titleText = faq.faqTtl ?? '';
  const answerText = faq.faqAnsCn ?? '';

  return (
    <Accordion
      className="faq-item"
      expanded={expanded}
      onChange={onToggle}
      disableGutters
      elevation={0}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box className="faq-question">
          <span className="label-q">Q.</span>
          <Typography className="question-text">
            {(searchType === 'title' || searchType === 'all') && searchWord ? (
              <SearchRow text={titleText} word={searchWord} />
            ) : (
              titleText
            )}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box className="faq-answer">
          <span className="label-a">A.</span>
          <Box
            className="answer-text"
            dangerouslySetInnerHTML={{ __html: answerText }}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default function FaqList() {
  const location = useLocation();

  const currentUrl = location.pathname;

  const dispatch = useAppDispatch();
  const { list: faqList, totalCount, loading, categories } = useAppSelector((s) => s.cdmFaq);

  // 페이징
  const [pageNum, setPageNum] = useState(1);
  const pageSize = 10;

  // 카테고리 탭
  const [activeCategory, setActiveCategory] = useState<string>('');

  // 아코디언 열림 상태 (faqSn)
  const [expandedSn, setExpandedSn] = useState<string | null>(null);

  // 검색
  const [searchType, setSearchType] = useState('title');
  const [searchWrd, setSearchWrd] = useState('');
  const [appliedType, setAppliedType] = useState('title');
  const [appliedWrd, setAppliedWrd] = useState('');

  // 공통코드 조회 (CMCMM00005) - 최초 1회
  useEffect(() => {
    dispatch(selectFaqCategories());
  }, []);

  // categories 로드 후 activeCategory 초기화
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].code);
    }
  }, [categories]);

  // 스크롤 상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNum]);

  // FAQ 서버사이드 조회 (activeCategory가 초기화된 이후에만 실행)
  useEffect(() => {
    if (!activeCategory) return;
    dispatch(selectFaqList({
      page: pageNum,
      pageSize: String(pageSize),
      bbsId: '',
      faqSeCd: activeCategory,
      searchType: appliedType,
      searchKeyword: appliedWrd || undefined,
    }));
  }, [pageNum, activeCategory, appliedType, appliedWrd]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const onSearch = () => {
    setAppliedType(searchType);
    setAppliedWrd(searchWrd);
    setPageNum(1);
    setExpandedSn(null);
  };

  const handleCategoryChange = (_: React.SyntheticEvent, val: string) => {
    setActiveCategory(val);
    setPageNum(1);
    setExpandedSn(null);
  };

  const handleAccordionToggle = (faqSn: string) => {
    const willOpen = expandedSn !== faqSn;
    setExpandedSn(willOpen ? faqSn : null);
    if (willOpen) {
      const key = `FAQ_VIEWED_${faqSn}`;
      if (!sessionStorage.getItem(key)) {
        dispatch(increaseFaqViewCount({ faqSn }))
          .then(() => sessionStorage.setItem(key, 'Y'))
          .catch(() => {});
      }
    }
  };

  let faqContent: React.ReactNode;
  if (loading) {
    faqContent = (
      <Box sx={{ py: 3 }}>
        <Typography sx={{ py: 6, textAlign: 'center', color: 'text.secondary' }}>
          데이터를 불러오는 중입니다...
        </Typography>
      </Box>
    );
  } else if (faqList.length === 0) {
    faqContent = (
      <Box sx={{ py: 3 }}>
        <Typography align="center" color="text.secondary">
          데이터가 없습니다.
        </Typography>
      </Box>
    );
  } else {
    faqContent = faqList.map((faq) => (
      <FaqRow
        key={faq.faqSn}
        faq={faq}
        expanded={expandedSn === faq.faqSn}
        onToggle={() => handleAccordionToggle(faq.faqSn)}
        searchType={appliedType}
        searchWord={appliedWrd}
      />
    ));
  }

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">

          {/* Lnb 영역 */}
          <Box className="lnb-wrap">
            <Box className="lnb-menu">
              <Typography component="h2" className="lnb-tit">
                <span>CDM</span>
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

                {/* 검색 영역 */}
                <Box component="form" className="board-search">
                  <FormControl size="large" className="search-condition">
                    <InputLabel id="search-condition-label" className="sr-only">검색조건</InputLabel>
                    <Select
                      size="large"
                      value={searchType}
                      labelId="search-condition-label"
                      onChange={(e) => setSearchType(String(e.target.value))}
                    >
                      <MenuItem value="title">제목</MenuItem>
                      <MenuItem value="content">내용</MenuItem>
                    </Select>
                  </FormControl>
                  <Box className="search-input-group">
                    <TextField
                      size="large"
                      placeholder="궁금하신 내용을 입력해주세요."
                      value={searchWrd}
                      onChange={(e) => setSearchWrd(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onSearch(); } }}
                      sx={{ flexGrow: 1 }}
                      slotProps={{
                        htmlInput: { 'aria-label': '검색어 입력' }
                      }}
                    />
                    <Button variant="contained" size="large" className="btn-search" onClick={onSearch}>
                      검색
                    </Button>
                  </Box>
                </Box>

                {/* 카테고리 탭 */}
                <Box className="category-tabs" role="navigation" aria-label="카테고리 선택">
                  <Tabs
                    value={activeCategory}
                    onChange={handleCategoryChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                  >
                    {categories.map(({ code, name }) => (
                      <Tab
                        key={code}
                        label={name}
                        value={code}
                        id={`tab-${code}`}
                        aria-controls={`tabpanel-${code}`}
                      />
                    ))}
                  </Tabs>
                </Box>

                {/* 검색결과 건수 */}
                <Box className="board-search-info" aria-label="게시판 검색결과 정보">
                  <Typography className="board-count">
                    검색결과&nbsp;
                    <Box component="span" className="count">
                      {loading ? '-' : totalCount}
                    </Box>
                    건
                  </Typography>
                </Box>

                {/* FAQ 아코디언 목록 */}
                <Box className="faq-list-area">
                  {faqContent}
                </Box>

                {/* 페이징 */}
                <Stack className="paging-wrap">
                  <Pagination
                    page={pageNum}
                    count={totalPages}
                    onChange={(_: React.ChangeEvent<unknown>, page: number) => {
                      setPageNum(page);
                      setExpandedSn(null);
                    }}
                    showFirstButton
                    showLastButton
                  />
                </Stack>

              {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
