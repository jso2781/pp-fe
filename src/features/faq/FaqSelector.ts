import type { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';
import { FaqParam, FaqItem, FaqRVO, CategoryCode } from './FaqTypes';

const faqList = (state: RootState) => state.faq.list;

const typeGuard = (vo: FaqRVO) => typeof vo.faqSeq === 'number' && typeof vo.faqTtl === 'string' && typeof vo.faqAns === 'string' && typeof vo.faqClsf === 'string'

const selectNormalizedFaqList = createSelector(
  [faqList],
  (list): FaqItem[] => [...list]
  .filter((vo): vo is FaqRVO & { faqSeq: number; faqTtl: string; faqAns: string; faqClsf: CategoryCode } => (typeGuard(vo)))
  .sort((a, b) => a.faqSeq - b.faqSeq)
  .map(vo => ({title: vo.faqTtl, content: vo.faqAns, category: vo.faqClsf})).concat(dummy)
);

export const selectFaqCategoryList = createSelector(
  [selectNormalizedFaqList],
  (list) => {
    const category = list.map(faqItem => faqItem.category);
    const set = new Set(category);
    const categoryList: CategoryCode[] = ['all', ...set];
    return categoryList;
  }
);

export const selectViewFaqList = createSelector(
  [selectNormalizedFaqList, (_: RootState, param: FaqParam) => param],
  (selectNormalizedFaqList, { activeCategory = 'all', searchWord = '', page = 1 }) => {
    const filteredCategoryFaqList = selectNormalizedFaqList.filter(faqItem => activeCategory === 'all' || faqItem.category === activeCategory);
    const filteredSearchFaqList = filteredCategoryFaqList.filter(faqItem => faqItem.title.indexOf(searchWord) !== -1 || faqItem.content.indexOf(searchWord) !== -1);
    return { faqList: filteredSearchFaqList.slice((page-1)*10, page*10), totalCount: filteredSearchFaqList.length }
  }
);

const dummy: FaqItem[] = [
  {category: 'tempClsf1', content: 'content', title: '1'},
  {category: 'tempClsf1', content: 'content', title: '2'},
  {category: 'tempClsf1', content: 'content', title: '3'},
  {category: 'tempClsf1', content: 'content', title: '4'},
  {category: 'tempClsf1', content: 'content', title: '5'},
  {category: 'tempClsf1', content: 'content', title: '6'},
  {category: 'tempClsf1', content: 'content', title: '7'},
  {category: 'tempClsf1', content: 'content', title: '8'},
  {category: 'tempClsf1', content: 'content', title: '9'},
  {category: 'tempClsf1', content: 'content', title: '10'},
  {category: 'tempClsf1', content: 'content', title: '11'},
  {category: 'tempClsf1', content: 'content', title: '12'},
  {category: 'tempClsf1', content: 'content', title: '13'},
  {category: 'tempClsf1', content: 'content', title: '14'},
  {category: 'tempClsf1', content: 'content', title: '15'},
  {category: 'tempClsf1', content: 'content', title: '16'},
  {category: 'tempClsf1', content: 'content', title: '17'},
  {category: 'tempClsf1', content: 'content', title: '18'},
  {category: 'tempClsf1', content: 'content', title: '19'},
  {category: 'tempClsf1', content: 'content', title: '20'},
  {category: 'tempClsf1', content: 'content', title: '21'},
  {category: 'tempClsf1', content: 'content', title: '22'},
  {category: 'tempClsf1', content: 'content', title: '23'},
  {category: 'tempClsf1', content: 'content', title: '24'},
  {category: 'tempClsf1', content: 'content', title: '25'},
  {category: 'tempClsf1', content: 'content', title: '26'},
  {category: 'tempClsf1', content: 'content', title: '27'},
  {category: 'tempClsf1', content: 'content', title: '28'},
  {category: 'tempClsf1', content: 'content', title: '29'},
  {category: 'tempClsf1', content: 'content', title: '30'},
  {category: 'tempClsf1', content: 'content', title: '31'},
  {category: 'tempClsf1', content: 'content', title: '32'},
  {category: 'tempClsf1', content: 'content', title: '33'},
]

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

