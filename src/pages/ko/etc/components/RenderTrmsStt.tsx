import { getTrmsStt, getTrmsSttLatest, selectTrmsSttList } from "@/features/stt/TrmsSttThunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import type { TrmsSttRVO } from "@/features/stt/TrmsSttTypes";
import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export default function RenderStt({ trmsSttCd, isList }: { trmsSttCd: string, isList: boolean }) {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { current, loading, error, list } = useAppSelector(s => s.stt);

  useEffect(() => {
    scrollTo(0, 0);

    if(isList) {
      dispatch(selectTrmsSttList({ trmsSttCd })).unwrap()
        .then((res) => {
          const trmsSttAplcnYmd = res.list[0].trmsSttAplcnYmd;
          dispatch(getTrmsStt({ trmsSttCd, trmsSttAplcnYmd }));
        });
    } else {
      dispatch(getTrmsSttLatest({ trmsSttCd }));
    }
  }, [dispatch, isList]);

  useEffect(() => {
    if(isList){
      const trmsSttAplcnYmd = searchParams.get('d') || list[0]?.trmsSttAplcnYmd;
      dispatch(getTrmsStt({ trmsSttCd, trmsSttAplcnYmd }));
      window.scrollTo({
        top: 0,
        left: 0,
        // behavior: "smooth",
      });
    }
  }, [searchParams])

  
  if(loading) return <>loading...</>;

  if(error) return <>{error}</>

  if(!current?.trmsSttCn) return <>컨텐츠 없음</>

  const handleSetCurrentClick = (trmsSttRVO: TrmsSttRVO) => () => {
    const trmsSttAplcnYmd = trmsSttRVO.trmsSttAplcnYmd || '';
    // navigate(`?${trmsSttAplcnYmd}`);
    setSearchParams({ d: trmsSttAplcnYmd });
  }
  
  return (
    <>
      {
        /<[^>]+>/.test(current.trmsSttCn)
          ? <Box dangerouslySetInnerHTML={{ __html: current.trmsSttCn }} />
          : <Box><pre>{current.trmsSttCn}</pre></Box>
      }
      {list.length > 0 && list.map((trmsSttRVO, i) => {
        if(current.trmsSttAplcnYmd === trmsSttRVO.trmsSttAplcnYmd) {
          return <Box key={`faq-${i}`} style={{fontWeight: "bold", color: "#087c80"}}>{formatter(trmsSttRVO.trmsSttAplcnYmd)} ~ {formatter(trmsSttRVO.trmsSttEndYmd)}</Box>;
        }
        return <Box key={`faq-${i}`} onClick={handleSetCurrentClick(trmsSttRVO)}>{formatter(trmsSttRVO.trmsSttAplcnYmd)} ~ {formatter(trmsSttRVO.trmsSttEndYmd)}</Box>
      })}
    </>
  );
}

const formatter = (str: string | undefined): string => {
  if(!str || !str.trim()) return '';
  if(str === '99991231') return '현재';
  return `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`
}
