import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectFaqList } from "@/features/faq/FaqThunks";
import { useEffect, useState } from "react";
import FaqRow from "./components/FaqRow";
import { selectViewFaqList, selectFaqCategoryList } from "@/features/faq/FaqSelector";
import { FaqSearchParam } from '@/features/faq/FaqTypes';

interface categoryNaming {
  all: string
  tempClsf1: string
  tempClsf2: string
}
const categoryNaming = {
  all: "전체",
  tempClsf1: "의약품부작용 정의",
  tempClsf2: "부작용 신고방법"
}

export default function NewsFaqNotice () {
  

  const [search, setSearch] = useState<FaqSearchParam>(() => ({category: '', search: ''}));
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(s => s.faq);
  const categoryList = useAppSelector(selectFaqCategoryList);
  const faqList = useAppSelector(s => selectViewFaqList(s, search));
  
  console.log(faqList)
  useEffect(() =>{
    dispatch(selectFaqList({langSeCd: 'ko'}));
  }, [dispatch]);

  if(error) return <>500에러 페이지 처리?</>

  return(
    <>
      FAQ
      {/* 검색박스 */}
      {
        loading ? <>로딩중</> : 
        <>
        {categoryList.map(category => (<>{categoryNaming[category]}&nbsp;&nbsp;&nbsp;&nbsp;</>))}
        {/* { list.map(data => <div>{data.category}</div>)}
        <div>검색 결과 {list.length} 건</div>
        { list.map(data => <FaqRow {...data} />) } */}
        {/* { faqList.map(data =>  <>{JSON.stringify(data)}</>) }  */}
        </>
      }
    </>
  );
}