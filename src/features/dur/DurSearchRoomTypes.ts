/**
 * DUR 정보 검색 조회 파라메터 정보
 */
export interface DurSearchRoomPVO {
  /** 성분명 */
  igrdNm?: string

  /** 제품명 */
  prdctNm?: string
}

export interface DurSearchRoomListPVO {
  /** 현재 페이지 인덱스 */
  pageNum?: number

  /** 한 페이지에 보여줄 아이템의 개수 */
  pageSize?: number

  /** 성분명 */
  igrdNm?: string

  /** 제품명 */
  prdctNm?: string
}

/**
 * DUR 병용금기기본 조회 결과
 */
export interface ConcItem {
    /**
     * 검색한 제품의 성분
     */
    prdctNm: string

    /**
     * 검색한 제품의 성분
     */
    igrdNm: string

    /**
     * 병용금기 성분
     */
    prohibitIgrdNm: string

    /**
     * 상세정보
     */
    dtlInfoCn: string

    /**
     * 비고
     */
    rmrkCn: string
}

/**
 * DUR 연령금기기본 조회 결과
 */
export interface AgeItem {
    /**
     * 검색한 제품의 성분
     */
    prdctNm: string

    /**
     * 검색한 제품의 성분
     */
    igrdNm: string

    /**
     * 해당 연령
     * 18, 16, 60
     */
    rlvtAge: string

    /**
     * 해당 연령 단위명
     * ex) 세
     */
    rlvtAgeUnitNm: string

    /**
     * 연령처리조건명( 18세 이상, 6세 이하 )
     * ex) 미만, 이상, 이하
     */
    agePrcsCndNm: string

    /**
     * 상세정보
     */
    dtlInfoCn: string
}

/**
 * DUR 임부금기기본 조회 결과
 */
export interface PrgntItem {
    /**
     * 검색한 제품의 성분
     */
    prdctNm: string

    /**
     * 검색한 제품의 성분
     */
    igrdNm: string

    /**
     * 금기등급코드(임산부금기등급)
     * ex) 1,2,3,4 등급
     */
    condiGrdCd: string

    /**
     * 상세정보
     */
    dtlInfoCn: string
}

/**
 * DUR 용량주의기본 조회 결과
 */
export interface CpctItem {
    /**
     * 검색한 제품의 성분
     */
    prdctNm: string

    /**
     * 검색한 제품의 성분
     */
    igrdNm: string

    /**
     * 1일 최대용량
     * ex) 갈란타민 24mg, 나프록센 1,250mg 또는 나프록센나트륨 1,350mg
     */
    dayMaxAdminCpct: string

    /**
     * 상세정보
     */
    dtlInfoCn: string
}

/**
 * DUR 투여기간주의기본 조회 결과
 */
export interface DosageItem {
    /**
     * 검색한 제품의 성분
     */
    prdctNm: string

    /**
     * 검색한 제품의 성분
     */
    igrdNm: string

    /**
     * 최대투여기간(일)
     * 1일
     */
    maxAdminPrdDayCnt: string

    /**
     * 비고
     */
    rmrkCn: string
}

/**
 * DUR 효능군중복기본 조회 결과
 */
export interface EftgrpItem {
    /**
     * 검색한 제품의 성분
     */
    prdctNm: string

    /**
     * 검색한 제품의 성분
     */
    igrdNm: string

    /**
     * 효능그룹명
     * ex) 해열진통소염제, 최면진정제
     */
    effGroupNm: string

    /**
     * 품목명(계열)
     */
    itemNm: string
}

/**
 * DUR 노인주의기본 조회 결과
 */
export interface SnctzItem {
    /**
     * 검색한 제품의 성분
     */
    prdctNm: string

    /**
     * 검색한 제품의 성분
     */
    igrdNm: string

    /**
     * 비고
     */
    rmrkCn: string
}

/**
 * DUR 수유부주의기본 조회 결과
 */
export interface NurswItem {
    /**
     * 검색한 제품의 성분
     */
    prdctNm: string

    /**
     * 검색한 제품의 성분
     */
    igrdNm: string

    /**
     * 비고
     */
    rmrkCn: string
}

/**
 * DUR 정보 검색 결과 정보 
 */
export interface DurSearchRoomRVO {
  /** 성분명 */
  igrdNm?: string

  /** 제품명 */
  prdctNm?: string

  /** DUR 병용금기기본 조회 결과(특정 성분/제품의 병용금기 성분 목록) */
  concList: ConcItem[]

  /** DUR 연령금기기본 조회 결과(특정 성분/제품의 연령금기 성분 목록) */
  ageList: AgeItem[]

  /** DUR 임부금기기본 조회 결과(특정 성분/제품의 임부금기 성분 목록) */
  prgntList: PrgntItem[]

  /** DUR 용량주의기본 조회 결과(특정 성분/제품의 용량주의 성분 목록) */
  cpctList: CpctItem[]

  /** DUR 투여기간주의기본 조회 결과(특정 성분/제품의 투여기간주의 성분 목록) */
  dosageList: DosageItem[]

  /** DUR 효능군중복기본 조회 결과(특정 성분/제품의 효능군중복 성분 목록) */
  eftgrpList: EftgrpItem[]

  /** DUR 노인주의기본 조회 결과(특정 성분/제품의 노인주의 성분 목록) */
  snctzList: SnctzItem[]

  /** DUR 수유부주의기본 조회 결과(특정 성분/제품의 수유부주의 성분 목록) */
  nurswList: NurswItem[]
}

/**
 * DUR 정보 검색 결과 목록 정보 
 */
export interface DurSearchRoomListRVO {
  list: DurSearchRoomRVO[]
  totalCount: number
  totalPages: number
}

/**
 * DUR 정보 검색 결과 목업 샘플 (예제1~3 테이블 구조 기준, DurSearchRoomRVO)
 */
export const mockDurSearchRoomList: DurSearchRoomRVO[] = [
  // 예제1-1: Aceclofenac / 아세클로페낙 (eftgrp만 존재)
  {
    igrdNm: 'Aceclofenac',
    prdctNm: '아세클로페낙',
    concList: [],
    ageList: [],
    prgntList: [],
    cpctList: [],
    dosageList: [],
    eftgrpList: [
      { igrdNm: 'Aceclofenac', itemNm: '아세클로페낙', prdctNm: '아세클로페낙', effGroupNm: '해열진통소염제' },
    ],
    snctzList: [],
    nurswList: [],
  },
  // 예제1-2: 아세클로페낙 / P_아세클로페낙 (snctz만 존재)
  {
    igrdNm: '아세클로페낙',
    prdctNm: 'P_아세클로페낙',
    concList: [],
    ageList: [],
    prgntList: [],
    cpctList: [],
    dosageList: [],
    eftgrpList: [],
    snctzList: [
      { igrdNm: '아세클로페낙', rmrkCn: '', prdctNm: 'P_아세클로페낙' },
    ],
    nurswList: [],
  },
  // 예제2: Acemetacin / P_Acemetacin (prgnt만 존재)
  {
    igrdNm: 'Acemetacin',
    prdctNm: 'P_Acemetacin',
    concList: [],
    ageList: [],
    prgntList: [
      {
        igrdNm: 'Acemetacin',
        prdctNm: 'P_Acemetacin',
        dtlInfoCn: '동물실험에서 최기형성 보고. 태아 순환지속증, 동맥관수축, 동매관개존증, 신생아 신부전, 태아 장천공, 양수과소증 발생 보고.  동물실험에서 비스테로이드성 소염진통제는 난산발생빈도 증가, 분만지연, 태아 생존율 감소 보고.',
        condiGrdCd: '2',
      },
    ],
    cpctList: [],
    dosageList: [],
    eftgrpList: [],
    snctzList: [],
    nurswList: [],
  },
  // 예제3-1: Abacavir / P_Abacavir (prgnt만 존재)
  {
    igrdNm: 'Abacavir',
    prdctNm: 'P_Abacavir',
    concList: [],
    ageList: [],
    prgntList: [
      {
        igrdNm: 'Abacavir',
        prdctNm: 'P_Abacavir',
        dtlInfoCn: '임부에 대한 안전성 미확립. 동물실험에서 태반이행 보고. 랫드에서 태자 체중감소, 부종, 골격변화, 기형, 조기 자궁내 사망, 출생지연 등 나타남.',
        condiGrdCd: '2',
      },
    ],
    cpctList: [],
    dosageList: [],
    eftgrpList: [],
    snctzList: [],
    nurswList: [],
  },
  // 예제3-2: Lamivudine + Abacavir / P_Lamivudine + Abacavir (conc만 존재)
  {
    igrdNm: 'Lamivudine + Abacavir',
    prdctNm: 'P_Lamivudine + Abacavir',
    concList: [
      {
        igrdNm: 'Lamivudine + Abacavir',
        prdctNm: 'P_Lamivudine + Abacavir',
        prohibitIgrdNm: 'Bictegravir + Emtricitabine + Tenofovir alafenamide',
        dtlInfoCn: '라미부딘이 엠트리시타빈의 세포내 인산화를 저해할 수도 있음. 동일한 역전사효소 유전자(M184V) 변이를 통해 바이러스 내성 기전이 일어나므로, 병용 시 치료 효과가 제한적일 수 있음',
        rmrkCn: '',
      },
    ],
    ageList: [],
    prgntList: [],
    cpctList: [],
    dosageList: [],
    eftgrpList: [],
    snctzList: [],
    nurswList: [],
  },
  // 예제3-3: Lamivudine + Abacavir + Dolutegravir / P_Lamivudine + Abacavir + Dolutegravir (conc만 존재, 동일 conc)
  {
    igrdNm: 'Lamivudine + Abacavir + Dolutegravir',
    prdctNm: 'P_Lamivudine + Abacavir + Dolutegravir',
    concList: [
      {
        igrdNm: 'Lamivudine + Abacavir + Dolutegravir',
        prdctNm: 'P_Lamivudine + Abacavir + Dolutegravir',
        prohibitIgrdNm: 'Bictegravir + Emtricitabine + Tenofovir alafenamide',
        dtlInfoCn: '라미부딘이 엠트리시타빈의 세포내 인산화를 저해할 수도 있음. 동일한 역전사효소 유전자(M184V) 변이를 통해 바이러스 내성 기전이 일어나므로, 병용 시 치료 효과가 제한적일 수 있음',
        rmrkCn: '',
      },
    ],
    ageList: [],
    prgntList: [],
    cpctList: [],
    dosageList: [],
    eftgrpList: [],
    snctzList: [],
    nurswList: [],
  },
]

