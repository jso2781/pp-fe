import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectFaqList } from "@/features/faq/FaqThunks";
import { useEffect, useState } from "react";
import FaqRow from "./components/FaqRow";

export default function FaqNotice () {

  const dispatch = useAppDispatch();
  const { loading, list, error } = useAppSelector(s => s.faq); 

  useEffect(() =>{
    dispatch(selectFaqList());
  }, [dispatch]);

  if(error) return <>500에러 페이지 처리?</>

  return(
    <>
      FAQ
      {/* 검색박스 */}
      {
        loading ? <>로딩중</> : 
        <>
        { list.map(data => <div>{data.category}</div>)}
        <div>검색 결과 {list.length} 건</div>
        { list.map(data => <FaqRow {...data} />) }
        </>
      }
    </>
  );
}

// const filteredList = useMemo(() => {
//   if (category === 'ALL') return allList;
//   return allList.filter(item => item.category === category);
// }, [allList, category]);


/**
 * faqClsf FAQ분류
 * faqTtl FAQ제목
 * faqSeq FAQ순서
 * langSeCd 언어구분코드
 * faqAns FAQ답변
 */
