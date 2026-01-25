/**
 * 대국민포털_권한변경이력기본 조회 목업 정보 
 */
export const mockAuthrtChgHstryList = [
  {
    /** 순번 */
    no: 1,

    /** 권한코드 */
    authrtCd: 'XXX',

    /** 메뉴일련번호 */
    menuSn: 'XXX',

    /** 적용대상유형 */
    aplcnTrgtTypeCd: 'XXX',

    /** 변경역할목록 */
    chgRoleListCn: 'XXX',

    /** 적용대상 */
    aplcnTrgtNm: 'XXX',

    /** 변경유형 */
    chgTypeCd: 'XXX',

    /** 비고 */
    authrtChgRmrkCn: 'XXX',

    /** 등록자아이디 */
    rgtrId: 'XXX',

    /** 등록일시 */
    regDt: '2026-01-23',
    /** 수정자아이디 */
    mdfrId: 'XXX',

    /** 수정일시 */
    mdfcnDt: '2026-01-23'
  }
]

/**
 * 대국민포털_권한변경이력기본 조회/입력/수정/저장 파라메터 정보 
 */
export interface AuthrtChgHstryPVO {
  /** 권한코드 */
  authrtCd?: string

  /** 메뉴일련번호 */
  menuSn?: string

  /** 적용대상유형 */
  aplcnTrgtTypeCd?: string

  /** 변경역할목록 */
  chgRoleListCn?: string

  /** 적용대상 */
  aplcnTrgtNm?: string

  /** 변경유형 */
  chgTypeCd?: string

  /** 비고 */
  authrtChgRmrkCn?: string

  /** 등록자아이디 */
  rgtrId?: string

  /** 등록일시 */
  regDt?: string
  /** 수정자아이디 */
  mdfrId?: string

  /** 수정일시 */
  mdfcnDt?: string
}

/**
 * 대국민포털_권한변경이력기본 정보 
 */
export interface AuthrtChgHstryRVO {
  /** 순번 */
  no?: 1

  /** 권한코드 */
  authrtCd?: string

  /** 메뉴일련번호 */
  menuSn?: string

  /** 적용대상유형 */
  aplcnTrgtTypeCd?: string

  /** 변경역할목록 */
  chgRoleListCn?: string

  /** 적용대상 */
  aplcnTrgtNm?: string

  /** 변경유형 */
  chgTypeCd?: string

  /** 비고 */
  authrtChgRmrkCn?: string

  /** 등록자아이디 */
  rgtrId?: string

  /** 등록일시 */
  regDt?: string
  /** 수정자아이디 */
  mdfrId?: string

  /** 수정일시 */
  mdfcnDt?: string
}

/**
 * 대국민포털_권한변경이력기본 목록 조회용 파라메터 정보 
 */
export interface AuthrtChgHstryListPVO {
  /** 권한코드 */
  authrtCd?: string

  /** 메뉴일련번호 */
  menuSn?: string

  /** 적용대상유형 */
  aplcnTrgtTypeCd?: string

  /** 변경역할목록 */
  chgRoleListCn?: string

  /** 적용대상 */
  aplcnTrgtNm?: string

  /** 변경유형 */
  chgTypeCd?: string

  /** 비고 */
  authrtChgRmrkCn?: string

  /** 등록자아이디 */
  rgtrId?: string

  /** 등록일시 */
  regDt?: string
  /** 수정자아이디 */
  mdfrId?: string

  /** 수정일시 */
  mdfcnDt?: string
}

/**
 * 대국민포털_권한변경이력기본 정보 목록 
 */
export interface AuthrtChgHstryListRVO {
  list: AuthrtChgHstryRVO[]
  totalCount: number
}

/**
 * 대국민포털_권한변경이력기본 삭제 파라메터 정보 
 */
export interface AuthrtChgHstryDVO {
}

