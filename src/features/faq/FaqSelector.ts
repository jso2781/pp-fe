import type { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';
import { FaqSearchParam, FaqItem, FaqRVO } from './FaqTypes';

const faqList = (state: RootState) => state.faq.list;

const typeGuard = (vo: FaqRVO) => typeof vo.faqSeq === 'number' && typeof vo.faqTtl === 'string' && typeof vo.faqAns === 'string' && typeof vo.faqClsf === 'string'

const selectNormalizedFaqList = createSelector(
  [faqList],
  (list): FaqItem[] => [...list]
  .filter((vo): vo is FaqRVO & { faqSeq: number; faqTtl: string; faqAns: string; faqClsf: string } => (typeGuard(vo)))
  .sort((a, b) => a.faqSeq - b.faqSeq)
  .map(vo => ({title: vo.faqTtl, content: vo.faqAns, category: vo.faqClsf}))
);

export const selectFaqCategoryList = createSelector(
  [selectNormalizedFaqList],
  (list) => {
    const category: string[] = list.map(faqItem => faqItem.category);
    const set = new Set(category);
    const categoryList = ['all', ...set];
    return categoryList;
  }
)

export const selectViewFaqList = createSelector(
  [selectNormalizedFaqList, (state: RootState, param: FaqSearchParam) => param],
  (selectNormalizedFaqList, { category = '', search= '' }) => {
    return selectNormalizedFaqList
  }
)


// export const sortedFaqAllListSelector = createSelector(
//   [sortedFaqListSelector],
//   (list: FaqRVO[]): FaqItem[] => list
//     .filter((vo): vo is FaqRVO & { faqTtl: string; faqAns: string; faqClsf: string } =>
//       typeof vo.faqTtl === 'string' && typeof vo.faqAns === 'string' && typeof vo.faqClsf === 'string')
//     .map(vo => ({
//       title: vo.faqTtl,
//       content: vo.faqAns,
//       category: vo.faqClsf
//     }))
// );

// export const sortedFaqCategoriListSelector = createSelector(
//   [sortedFaqAllListSelector],
//   (list) => list.reduce((acc: FaqCategory[], cur: FaqItem) => {
//     if(!cur.category) return acc;
//     const idx = acc.findIndex(v => v.category === cur.category);
//     if(idx !== -1) {
//         acc[idx].item.push({title: cur.title, content: cur.content, category: cur.category})
//         return acc;
//     } else {
//         acc.push({
//             category: cur.category,
//             item: [{title: cur.title, content: cur.content, category: cur.category}]
//         })
//         return acc;
//     }
//   }, [])
// );

