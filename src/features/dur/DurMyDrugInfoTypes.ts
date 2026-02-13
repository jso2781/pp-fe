import { AgeItem, ConcItem, CpctItem, DosageItem, EftgrpItem, NurswItem, PrgntItem, SnctzItem } from './DurSearchRoomTypes'

export interface DurMyDrugInfoItemPVO {
  prdctNm?: string
  igrdNm?: string
}

export interface DurMyDrugInfoPVO {
  pageNum?: number
  pageSize?: number
  searchType?: string
  durMyDrugInfoPVOs?: DurMyDrugInfoItemPVO[]
}

export interface DurMyDrugInfoRVO {
  igrdNm?: string
  prdctNm?: string
  concList: ConcItem[]
  ageList: AgeItem[]
  prgntList: PrgntItem[]
  cpctList: CpctItem[]
  dosageList: DosageItem[]
  eftgrpList: EftgrpItem[]
  snctzList: SnctzItem[]
  nurswList: NurswItem[]
}

export interface DurMyDrugInfoListRVO {
  list: DurMyDrugInfoRVO[]
  totalCount: number
  totalPages: number
}
