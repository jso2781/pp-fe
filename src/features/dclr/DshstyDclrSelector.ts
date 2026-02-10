import type { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';
import { DshstyDclrRVO } from './DshstyDclrTypes';

const dclrList = (state: RootState) => state.dclr.list;

export const paginationDshstyDclrList = createSelector(
  [dclrList, (_: RootState, page: number) => page],
  (dclrList, page = 1) => dclrList.slice((page-1)*10, page*10)
)
