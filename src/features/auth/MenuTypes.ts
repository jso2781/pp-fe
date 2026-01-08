/**
 * 대국민포털_메뉴기본 조회 목업 정보 
 */
export const mockMenuList = [
  {
    /** 순번 */
    no: 1,

    /** 메뉴명 */
    menuNm: 'XXX',

    /** 업무구분코드 */
    taskSeCd: 'XXX',

    /** 메뉴유형코드 */
    menuTypeCd: 'XXX',

    /** 메뉴순서 */
    menuSeq: -1,

    /** 메뉴설명 */
    menuExpln: 'XXX',

    /** 언어구분코드 */
    langSeCd: 'XXX',

    /** 담당자부서명 */
    picDeptNm: 'XXX',

    /** 담당자성명 */
    picFlnm: 'XXX',

    /** 사용여부 */
    useYn: 'XXX',

    /** 등록자아이디 */
    rgtrId: 'XXX',

    /** 등록일시 */
    regDt: '2026-01-23',

    /** 등록프로그램아이디 */
    regPrgrmId: 'XXX',

    /** 수정자아이디 */
    mdfrId: 'XXX',

    /** 수정일시 */
    mdfcnDt: '2026-01-23',

    /** 수정프로그램아이디 */
    mdfcnPrgrmId: 'XXX',

  }
]

/**
 * 대국민포털_메뉴기본 조회/입력/수정/저장 파라메터 정보 
 */
export interface MenuPVO {
  /** 메뉴명 */
  menuNm?: string

  /** 업무구분코드 */
  taskSeCd?: string

  /** 메뉴유형코드 */
  menuTypeCd?: string

  /** 메뉴순서 */
  menuSeq?: number

  /** 메뉴설명 */
  menuExpln?: string

  /** 언어구분코드 */
  langSeCd?: string

  /** 담당자부서명 */
  picDeptNm?: string

  /** 담당자성명 */
  picFlnm?: string

  /** 사용여부 */
  useYn?: string

  /** 등록자아이디 */
  rgtrId?: string

  /** 등록일시 */
  regDt?: string

  /** 등록프로그램아이디 */
  regPrgrmId?: string

  /** 수정자아이디 */
  mdfrId?: string

  /** 수정일시 */
  mdfcnDt?: string

  /** 수정프로그램아이디 */
  mdfcnPrgrmId?: string
}

/**
 * 대국민포털_메뉴기본 정보 
 */
export interface MenuRVO {
  /** 순번 */
  no?: 1

  /** 메뉴일련번호 */
  menuSn?: number

  /** 메뉴명 */
  menuNm?: string

  /** 업무구분코드 */
  taskSeCd?: string

  /** 언어구분코드 */
  langSeCd?: string

  /**  메뉴URL주소(UI의 Router에서의 메뉴경로 ex) /dur/proposal ) */
  menuUrlAddr?: string

  /** 상위메뉴일련번호 */
  upMenuSn?: number

  /** 메뉴레벨(1 - root menu, 2 - second menu, 3 - third menu) */
  depLevel?: number

  /** Root 메뉴일련번호 */
  rootSn?: number

  /** 메뉴유형코드(MENU - 메뉴, PAGE - 화면(LEAF MENU)) */
  menuTypeCd?: string

  /** 메뉴 경로( '>' 구분 ex)4 > 12, 4 > 12 > 14 ) */
  path?: string

  /** 메뉴순서 */
  menuSeq?: number

  /** 메뉴설명 */
  menuExpln?: string

  /** 담당자부서명 */
  picDeptNm?: string

  /** 담당자성명 */
  picFlnm?: string

  /** 사용여부 */
  useYn?: string

  /** 등록자아이디 */
  rgtrId?: string

  /** 등록일시 */
  regDt?: string

  /** 등록프로그램아이디 */
  regPrgrmId?: string

  /** 수정자아이디 */
  mdfrId?: string

  /** 수정일시 */
  mdfcnDt?: string

  /** 수정프로그램아이디 */
  mdfcnPrgrmId?: string

}

/**
 * 대국민포털_메뉴기본 목록 조회용 파라메터 정보 
 */
export interface MenuListPVO {
  /** 언어구분코드 */
  langSeCd?: string

  /**  메뉴URL주소(UI의 Router에서의 메뉴경로 ex) /dur/proposal ) */
  menuUrlAddr?: string
}

/**
 * 대국민포털_메뉴기본 정보 목록 
 */
export interface MenuListRVO {
  list: MenuRVO[]
  totalCount: number
}

/**
 * 대국민포털_메뉴기본 삭제 파라메터 정보 
 */
export interface MenuDVO {
}

