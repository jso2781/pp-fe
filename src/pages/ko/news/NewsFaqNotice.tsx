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

// Props 인터페이스 정의
interface FaqRowProps extends FaqItem {
  expanded: boolean;
  onToggle: (isExpanded: boolean) => void;
}

const FaqRow = (props: FaqRowProps) => {
  return (
    <Accordion 
      className="faq-item"
      expanded={props.expanded}
      onChange={(_, isExpanded) => props.onToggle(isExpanded)}
    >
      {/* 질문 영역 */}
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box className="faq-question">
          <span className="label-q">Q.</span>
          <Typography className="question-text">
            {props.title}
          </Typography>
        </Box>
      </AccordionSummary>

      {/* 답변 영역 */}
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
  
  // 현재 열려있는 패널의 고유 ID 하나만 저장
  const [expandedPanel, setExpandedPanel] = useState<string | number | null>(null);

  const inputValue = useRef<HTMLInputElement>(null);
  const { loading, error } = useAppSelector(s => s.faq);
  const categoryList = useAppSelector(selectFaqCategoryList);
  const { faqList, totalCount } = useAppSelector(s => selectViewFaqList(s, param));

  useEffect(() => {
    dispatch(selectFaqList({ langSeCd: 'ko' }));
  }, [dispatch]);

  const handleUI = ({ activeCategory, searchWord, page }: FaqParam) => {
    setParam({ activeCategory, searchWord, page });
    setExpandedPanel(null); // 검색/카테고리 이동 시 열린 것 닫기
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
                      defaultValue="title"
                      labelId="search-condition-label" 
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
                      size="large" 
                      variant="contained"
                      onClick={() => handleUI({ ...param, page: 1, searchWord: inputValue.current?.value || '' })}
                    >
                      검색
                    </Button>
                  </Box>
                </Box>

                <Box className="category-tabs" role="navigation" aria-label="카테고리 선택">
                  <Tabs
                    value={param.activeCategory}
                    onChange={(_, v) => handleUI({ ...param, page: 1, activeCategory: v })}
                    aria-label="상품 카테고리 탭"
                    selectionFollowsFocus 
                    // 모바일 가로 스크롤 설정
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                  >
                    {categoryList.map((category) => (
                      <Tab 
                        key={category} 
                        value={category} 
                        label={categoryNaming[category]} 
                        id={`tab-${category}`}
                        aria-controls={`tabpanel-${category}`}
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
                    faqList.map((faqItem, index) => {
                      // 데이터에 id가 없으면 index라도 고유하게 사용
                      const rowId = faqItem.id || `faq-${index}`;
                      
                      return (
                        <FaqRow 
                          key={rowId} 
                          {...faqItem} 
                          // 현재 행의 ID가 상태에 저장된 ID와 같을 때만 expanded=true
                          expanded={expandedPanel === rowId}
                          onToggle={(isExpanded) => {
                            // 열리면 내 ID 저장, 닫히면 null
                            setExpandedPanel(isExpanded ? rowId : null);
                          }}
                        />
                      );
                    })
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