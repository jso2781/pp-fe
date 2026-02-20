import { AgeItem, ConcItem, CpctItem, DosageItem, EftgrpItem, NurswItem, PrgntItem, SnctzItem } from './DurSearchRoomTypes'

export interface DurMyDrugSearchPVO {
  searchType?: string
  searchValue?: string
  itemYn?: string
}

export interface DurMyDrugSearchRVO {
  itemSeq?: string
  stdCd?: string
  itemName?: string
  entpName?: string
  ingrEngName?: string
  ingrCode?: string
}

export interface DurMyDrugSearchListRVO {
  list: DurMyDrugSearchRVO[]
}

export interface DurMyDrugInfoPVO {
  prdctCd?: string
  igrdCd?: string
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
