import type { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';
import { FaqParam, FaqItem, FaqRVO, CategoryCode } from './FaqTypes';

const faqList = (state: RootState) => state.faq.list;

const typeGuard = (vo: FaqRVO) => typeof vo.faqSeq === 'number' && typeof vo.faqTtl === 'string' && typeof vo.faqAnsCn === 'string' && typeof vo.faqClsfNm === 'string'

const selectNormalizedFaqList = createSelector(
  [faqList],
  (list): FaqItem[] => [...list]
  .filter((vo): vo is FaqRVO & { faqSeq: number; faqTtl: string; faqAnsCn: string; faqClsfNm: CategoryCode } => (typeGuard(vo)))
  .sort((a, b) => a.faqSeq - b.faqSeq)
  .map(vo => ({title: vo.faqTtl, content: vo.faqAnsCn, category: vo.faqClsfNm})).concat(dummy)
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
  (selectNormalizedFaqList, { activeCategory = 'all', searchWord = '', searchType = 'all',  page = 1 }) => {
    const filteredCategoryFaqList = selectNormalizedFaqList.filter(faqItem => activeCategory === 'all' || faqItem.category === activeCategory);
    const filteredSearchFaqList = filteredCategoryFaqList.filter(faqItem => {
      const title = faqItem.title.indexOf(searchWord) !== -1;
      const content = faqItem.content.indexOf(searchWord) !== -1
      if(searchType === 'title') return title;
      if(searchType === 'content') return content;
      return title || content;
    });
    return { faqList: filteredSearchFaqList.slice((page-1)*10, page*10), totalCount: filteredSearchFaqList.length }
  }
);

const dummy: FaqItem[] = [
  {category: 'ADEF_DCLR', content: 'content', title: '1'},
  {category: 'ADEF_DCLR', content: 'content', title: '2'},
  {category: 'ADEF_DCLR', content: 'content', title: '3'},
  {category: 'ADEF_DCLR', content: 'content', title: '4'},
  {category: 'ADEF_DCLR', content: 'content', title: '5'},
  {category: 'ADEF_DCLR', content: 'content', title: '6'},
  {category: 'ADEF_DCLR', content: 'content', title: '7'},
  {category: 'ADEF_DCLR', content: 'content', title: '8'},
  {category: 'ADEF_DCLR', content: 'content', title: '9'},
  {category: 'ADEF_DCLR', content: 'content', title: '10'},
  {category: 'ADEF_DCLR', content: 'content', title: '11'},
  {category: 'ADEF_DCLR', content: 'content', title: '12'},
  {category: 'ADEF_DCLR', content: 'content', title: '13'},
  {category: 'ADEF_DCLR', content: 'content', title: '14'},
  {category: 'ADEF_DCLR', content: 'content', title: '15'},
  {category: 'ADEF_DCLR', content: 'content', title: '16'},
  {category: 'ADEF_DCLR', content: 'content', title: '17'},
  {category: 'ADEF_DCLR', content: 'content', title: '18'},
  {category: 'ADEF_DCLR', content: 'content', title: '19'},
  {category: 'ADEF_DCLR', content: 'content', title: '20'},
  {category: 'ADEF_DEFN', content: 'content', title: '21'},
  {category: 'ADEF_DEFN', content: 'content', title: '22'},
  {category: 'ADEF_DEFN', content: 'content', title: '23'},
  {category: 'ADEF_DEFN', content: 'content', title: '24'},
  {category: 'ADEF_DEFN', content: 'content', title: '25'},
  {category: 'ADEF_DEFN', content: 'content', title: '26'},
  {category: 'ADEF_DEFN', content: 'content', title: '27'},
  {category: 'ADEF_DEFN', content: 'content', title: '28'},
  {category: 'ADEF_DEFN', content: 'content', title: '29'},
  {category: 'ADEF_DEFN', content: 'content', title: '30'},
  {category: 'ADEF_DEFN', content: 'content', title: '31'},
  {category: 'ADEF_DEFN', content: 'content', title: '32'},
  {category: 'ADEF_DEFN', content: 'content', title: '33'},
]