import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectFaqList } from "@/features/faq/FaqThunks";
import { useEffect, useRef, useState } from "react";
import FaqRow from "./components/FaqRow";
import { selectViewFaqList, selectFaqCategoryList } from "@/features/faq/FaqSelector";
import { CategoryCode, FaqParam } from '@/features/faq/FaqTypes';

const categoryNaming: Record<CategoryCode, string> = {
  all: "전체",
  tempClsf1: "의약품부작용 정의",
  tempClsf2: "부작용 신고방법"
}

export default function NewsFaqNotice () {
  
  const [param, setParam] = useState<FaqParam>(() => ({activeCategory: 'all', searchWord: ''}));
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(s => s.faq);
  const categoryList = useAppSelector(selectFaqCategoryList);
  const faqList = useAppSelector(s => selectViewFaqList(s, param));
  const inputValue = useRef<HTMLInputElement>(null);
  
  useEffect(() =>{
    dispatch(selectFaqList({langSeCd: 'ko'}));
  }, [dispatch]);

  if(error) return <>500에러 페이지 처리?</>

  return(
    <>
      {
        loading ? <>로딩중</> : 
        <>
          FAQ <br/>
          <input type="" ref={inputValue}/><button onClick={() => {setParam({...param, searchWord: inputValue.current?.value ? inputValue.current?.value : ''})}}>검색</button>
          <br/>
          { categoryList.map(category => (<span onClick={()=>{setParam({...param, activeCategory: category})}}>{categoryNaming[category]}&nbsp;&nbsp;&nbsp;&nbsp;</span>)) }
          <br/>
          검색 결과 {faqList.length}건
          <br/>
          { faqList.map(data => <FaqRow {...data} />) } 
        </>
      }
    </>
  );
}