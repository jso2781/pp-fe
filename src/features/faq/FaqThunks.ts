import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectFaqListApiPath, getFaqApiPath, insertFaqApiPath, updateFaqApiPath, saveFaqApiPath, deleteFaqApiPath } from '@/api/faq/FaqApiPaths'
import { mockFaqList, FaqPVO, FaqRVO, FaqListPVO, FaqListRVO, FaqDVO, FaqResult  } from './FaqTypes'

export const sideEffectThunk = createAsyncThunk(
  '/faq/test',
  async () => {
    const func = () => {
      return new Promise((res, rej) => {
        setTimeout(() => {
          throw new Error('비동기 작업중 에러');
          rej('무조건실패');
        }, 3000);
      });
    }
    try {
      await func();

    } catch (err){
      console.error(err);
    }
  });

/**
 * 대국민포털_FAQ기본 정보 목록 조회 
 */
export const selectFaqList = createAsyncThunk<FaqListRVO, FaqListPVO | undefined>(
  '/faq/selectFaqList',
  async (params: FaqListPVO = {}) => {
    try {
      const res = await https.post(selectFaqListApiPath(), params);

      // 관리자에서 몇개의 카테고리가 넘어올지 알수 없으므로 동적으로 카테고리별로 분리
      const payload = res.data?.data?.list?.reduce((acc: FaqResult[], cur: FaqRVO) => {
        if(!cur.faqClsf) return acc;
        const idx = acc.findIndex(v => v.category === cur.faqClsf);
        if(idx !== -1) {
            acc[idx].item.push({title: cur.faqTtl, content: cur.faqAns, seq: cur.faqSeq, langSeCd: cur.langSeCd})
            return acc;
        } else {
            acc.push({
                category: cur.faqClsf,
                item: [{title: cur.faqTtl}]
            })
            return acc;
        }
      }, []);

      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as FaqListRVO;
    }
    catch (e) {
      console.log("FaqThunks selectFaqList mockFaqList=",mockFaqList);
      const filtered = mockFaqList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: FaqListRVO = { list: filtered as FaqRVO[], totalCount: filtered.length }
      return result;
    }
  }
)


