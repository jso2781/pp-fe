import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectFaqList } from "@/features/faq/FaqThunks";
import { useEffect, useRef, useState } from "react";
import { selectViewFaqList, selectFaqCategoryList } from "@/features/faq/FaqSelector";
import { CategoryCode, FaqItem, FaqParam } from '@/features/faq/FaqTypes';
import { Pagination, Stack, Box, Typography, TextField, FormControl, Select, MenuItem, Button, Tabs, Tab, Accordion, AccordionSummary, AccordionDetails, InputLabel } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Lnb from '@/components/common/Lnb';
import DepsLocation from '@/components/common/DepsLocation';

const categoryNaming: Record<CategoryCode, string> = {
  all: "전체",
  ADEF_DEFN: "의약품부작용 정의",
  ADEF_DCLR: "부작용 신고방법"
}

const FaqRow = (props: FaqItem) => {
  return (
    <Accordion disableElevation className="faq-item">
      {/* 질문 영역 (Q) */}
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className="faq-question">
          <span className="label-q">Q.</span>
          <Typography className="question-text">
            {props.title}
          </Typography>
        </Typography>
      </AccordionSummary>

      {/* 답변 영역 (A) */}
      <AccordionDetails>
        <Box className="faq-answer">
          <span className="label-a">A.</span>
          <Typography className="answer-text">
            {props.content}
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default function NewsFaqNotice() {
  const dispatch = useAppDispatch();
  const [param, setParam] = useState<FaqParam>(() => ({ activeCategory: 'all', searchWord: '', page: 1 }));
  const inputValue = useRef<HTMLInputElement>(null);
  const { loading, error } = useAppSelector(s => s.faq);
  const categoryList = useAppSelector(selectFaqCategoryList);
  const { faqList, totalCount } = useAppSelector(s => selectViewFaqList(s, param));

  useEffect(() => {
    dispatch(selectFaqList({ langSeCd: 'ko' }));
  }, [dispatch]);

  const handleUI = ({ activeCategory, searchWord, page }: FaqParam) => {
    setParam({ activeCategory, searchWord, page });
  }

  const totalPages = Math.max(1, Math.ceil((totalCount || 1) / 10));

  if (error) return <Box>500에러 페이지 처리?</Box>

  const currentUrl = location.pathname;

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">

          {/* Lnb 영역 */}
          <Box className="lnb-wrap">
            <Box className="lnb-menu">
              <Typography component="h2" className="lnb-tit">
                <span>기관소식</span>
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
                
                <Box component="form" className="board-search">
                  <InputLabel id="search-condition-label" className="sr-only">검색조건</InputLabel>
                  <FormControl size="large" className="search-condition">
                    <InputLabel id="search-condition-label" className="sr-only">검색조건</InputLabel>
                    <Select 
                      size="large" 
                      //value={searchCnd} 
                      labelId="search-condition-label" 
                      onChange={(e) => setSearchCnd(String(e.target.value))}
                    >
                      <MenuItem value="title">제목</MenuItem>
                      <MenuItem value="content">내용</MenuItem>
                    </Select>
                  </FormControl>
                  <Box className="search-input-group">
                    <TextField
                      inputRef={inputValue}
                      size="large" 
                      fullWidth
                      placeholder="궁금하신 내용을 입력해주세요."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleUI({ ...param, page: 1, searchWord: inputValue.current?.value || '' });
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => handleUI({ ...param, page: 1, searchWord: inputValue.current?.value || '' })}
                    >
                      검색
                    </Button>
                  </Box>
                </Box>

                <Box className="category-tabs">
                  <Tabs
                    value={param.activeCategory}
                    onChange={(_, v) => handleUI({ ...param, page: 1, activeCategory: v })}
                  >
                    {categoryList.map((category) => (
                      <Tab 
                        key={category} 
                        value={category} 
                        label={categoryNaming[category]} 
                      />
                    ))}
                  </Tabs>
                </Box>

                <Box className="board-search-info" aria-label="게시판 검색결과 정보">
                  <Typography className="board-count">
                    검색결과 
                    <Box component="span" className="count">
                      {totalCount}
                    </Box>
                    건
                  </Typography>
                </Box>

                <Box className="faq-list-area">
                  {loading ? (
                    <Typography>데이터를 불러오는 중입니다...</Typography>
                  ) : (
                    faqList.map(faqItem => <FaqRow key={faqItem.id} {...faqItem} />)
                  )}
                </Box>

                <Stack className="paging-wrap">
                  <Pagination
                    count={totalPages}
                    page={param.page}
                    onChange={(_, p) => handleUI({ ...param, page: p })}
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