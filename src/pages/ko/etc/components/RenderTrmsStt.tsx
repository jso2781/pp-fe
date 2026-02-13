import { getTrmsSttLatest, selectTrmsSttList } from "@/features/stt/TrmsSttThunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { setCurrent, setLoading } from "@/features/stt/TrmsSttSlice";
import type { TrmsSttRVO } from "@/features/stt/TrmsSttTypes";
import { Box } from "@mui/material";

export default function RenderStt({ trmsSttCd, isList }: { trmsSttCd: string, isList: boolean }) {
  const dispatch = useAppDispatch();
  const { current, loading, error, list } = useAppSelector(s => s.stt);

  useEffect(() => {
    scrollTo(0, 0);
    
    isList
      ? dispatch(selectTrmsSttList({ trmsSttCd: trmsSttCd }))
      : dispatch(getTrmsSttLatest({ trmsSttCd: trmsSttCd }));
  }, [dispatch, isList]);

  
  if(loading) return <>loading...</>;

  if(error) return <>{error}</>

  if(!current?.trmsSttCn) return <>컨텐츠 없음</>

  const handleSetCurrentClick = (trmsSttRVO: TrmsSttRVO) => () => {
    // dispatch(setCurrent(trmsSttRVO));
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: "smooth", 
    // });

    //의도적인 로딩처리.
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setCurrent(trmsSttRVO));
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth", 
      });
      dispatch(setLoading(false));
    }, 200);
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
          return <Box key={`faq-${i}`} style={{fontWeight: "bold", color: "#087c80"}} onClick={handleSetCurrentClick(trmsSttRVO)}>{trmsSttRVO.trmsSttAplcnYmd} - {trmsSttRVO.trmsSttEndYmd}(선택중)</Box>;
        }
        return <Box key={`faq-${i}`} onClick={handleSetCurrentClick(trmsSttRVO)}>{trmsSttRVO.trmsSttAplcnYmd} - {trmsSttRVO.trmsSttEndYmd}</Box>
      })}
    </>
  );
}