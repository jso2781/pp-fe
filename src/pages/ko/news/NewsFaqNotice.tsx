import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectFaqList } from "@/features/faq/FaqThunks";
import { useEffect, useRef, useState } from "react";
import { selectViewFaqList, selectFaqCategoryList } from "@/features/faq/FaqSelector";
import { CategoryCode, FaqParam } from '@/features/faq/FaqTypes';
import { Pagination, Stack } from "@mui/material";

const categoryNaming: Record<CategoryCode, string> = {
  all: "전체",
  tempClsf1: "의약품부작용 정의",
  tempClsf2: "부작용 신고방법"
}

export default function NewsFaqNotice () {
  
  const dispatch = useAppDispatch();
  const [param, setParam] = useState<FaqParam>(() => ({activeCategory: 'all', searchWord: '', page: 1}));
  const inputValue = useRef<HTMLInputElement>(null);
  const { loading, error } = useAppSelector(s => s.faq);
  const categoryList = useAppSelector(selectFaqCategoryList);
  const { faqList, totalCount } = useAppSelector(s => selectViewFaqList(s, param));
  
  useEffect(() =>{
    dispatch(selectFaqList({langSeCd: 'ko'}));
  }, [dispatch]);

  const handleUI = ({ activeCategory, searchWord, page }: FaqParam) => {
    setParam({ activeCategory, searchWord, page });
  }

  const totalPages = Math.max(1, Math.ceil((totalCount || 1) / 10));

  if(error) return <>500에러 페이지 처리?</>

  return(
    <>
      {
        loading ? <>로딩중</> : 
        <>
          FAQ <br/>
          <input type="" ref={inputValue}/><button onClick={e => handleUI({...param, page: 1, searchWord: inputValue.current?.value ? inputValue.current?.value : ''})}>검색</button>
          <br/>
          { categoryList.map(category => (<span onClick={e => handleUI({...param, page: 1, activeCategory: category})}>{categoryNaming[category]}&nbsp;&nbsp;&nbsp;&nbsp;</span>)) }
          <br/>
          검색 결과 {totalCount}건
          <br/>
          {/* { faqList.map(data => <FaqRow {...data} />) }  */}
          <Stack className="paging-wrap">
            <Pagination count={totalPages} page={param.page} onChange={(_, p) => {
              handleUI({...param, page: p})
            }} />
          </Stack>
        </>
      }
    </>
  );
}