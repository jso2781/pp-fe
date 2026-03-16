/**
 * CDM FAQ 목록
 */
import { useEffect, useState } from 'react';
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
import { useLocation, useParams } from 'react-router-dom';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import type { FaqItem } from '@/api/cdm/communityInterface.ts';
import { fetchFaqList, increaseFaqViewCount } from '@/api/cdm/communityApi';

const FAQ_CATEGORY_MAP: Record<string, string> = {
  '01': 'CDM의 이해',
  '02': 'CDM의 구축',
  '03': '협력기관의 역할',
  '04': '의약품 안전정보 분석',
  '05': '사이트 이용 문의사항',
  '06': '기타',
};

const categories = Object.entries(FAQ_CATEGORY_MAP).map(([code, name]) => ({ code, name }));

/** 검색어 하이라이트 컴포넌트 */
const SearchRow = ({ text, word }: { text: string; word: string }) => {
  if (!word) return <>{text}</>;
  const parts = text.split(new RegExp(`(${word})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === word.toLowerCase() ? (
          <span key={i} style={{ color: '#087c80', fontWeight: 'bold' }}>
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
  const { lang } = useParams<{ lang: string }>();

  const currentUrl = location.pathname;

  // FAQ 목록 데이터
  const [faqList, setFaqList] = useState<FaqItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // 페이징
  const [pageNum, setPageNum] = useState(1);
  const pageSize = 10;

  // 카테고리 탭
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].code);

  // 아코디언 열림 상태 (faqSn)
  const [expandedSn, setExpandedSn] = useState<string | null>(null);

  // 검색
  const [searchType, setSearchType] = useState('title');
  const [searchWrd, setSearchWrd] = useState('');
  const [appliedType, setAppliedType] = useState('title');
  const [appliedWrd, setAppliedWrd] = useState('');

  // 스크롤 상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNum]);

  // FAQ 서버사이드 조회
  useEffect(() => {
    setLoading(true);
    fetchFaqList({
      page: pageNum,
      pageSize: String(pageSize),
      faqClsfNm: activeCategory,
      searchType: appliedType,
      searchKeyword: appliedWrd || undefined,
    })
      .then((res) => {
        setFaqList(res.list ?? []);
        setTotalCount(res.totalCount ?? 0);
      })
      .finally(() => setLoading(false));
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
        increaseFaqViewCount(faqSn)
          .then(() => sessionStorage.setItem(key, 'Y'))
          .catch(() => {});
      }
    }
  };

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
                    sx={{ marginLeft: '-35px' }}
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
                  {loading ? (
                    <Box sx={{ py: 3 }}>
                      <Typography sx={{ py: 6, textAlign: 'center', color: 'text.secondary' }}>
                        데이터를 불러오는 중입니다...
                      </Typography>
                    </Box>
                  ) : faqList.length === 0 ? (
                    <Box sx={{ py: 3 }}>
                      <Typography align="center" color="text.secondary">
                        데이터가 없습니다.
                      </Typography>
                    </Box>
                  ) : (
                    faqList.map((faq) => (
                      <FaqRow
                        key={faq.faqSn}
                        faq={faq}
                        expanded={expandedSn === faq.faqSn}
                        onToggle={() => handleAccordionToggle(faq.faqSn)}
                        searchType={appliedType}
                        searchWord={appliedWrd}
                      />
                    ))
                  )}
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
