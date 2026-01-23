/**
 * 대국민포털_법정대리인정보기본 조회 목업 정보 
 */
export const mockSttyAgtInfoList = [
  {
    /** 순번 */
    no: 1,

    /** 회원번호 */
    mbrNo: 'XXX',

    /** 법정대리인명 */
    sttyAgtNm: 'XXX',

    /** 법정대리인암호화전화번호 */
    sttyAgtEncptTelno: 'XXX',

    /** 법정대리인관계 */
    sttyAgtRel: 'XXX',

    /** 연계정보식별아이디 */
    linkInfoIdntfId: 'XXX',

    /** 인증토큰 */
    certTokenVl: 'XXX',

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
 * 대국민포털_법정대리인정보기본 조회/입력/수정/저장 파라메터 정보 
 */
export interface SttyAgtInfoPVO {
  /** 회원번호 */
  mbrNo?: string

  /** 법정대리인명 */
  sttyAgtNm?: string

  /** 법정대리인암호화전화번호 */
  sttyAgtEncptTelno?: string

  /** 법정대리인관계 */
  sttyAgtRel?: string

  /** 연계정보식별아이디 */
  linkInfoIdntfId?: string

  /** 인증토큰 */
  certTokenVl?: string

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
 * 대국민포털_법정대리인정보기본 정보 
 */
export interface SttyAgtInfoRVO {
  /** 순번 */
  no?: 1

  /** 회원번호 */
  mbrNo?: string

  /** 법정대리인명 */
  sttyAgtNm?: string

  /** 법정대리인암호화전화번호 */
  sttyAgtEncptTelno?: string

  /** 법정대리인관계 */
  sttyAgtRel?: string

  /** 연계정보식별아이디 */
  linkInfoIdntfId?: string

  /** 인증토큰 */
  certTokenVl?: string

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
 * 대국민포털_법정대리인정보기본 목록 조회용 파라메터 정보 
 */
export interface SttyAgtInfoListPVO {
  /** 회원번호 */
  mbrNo?: string

  /** 법정대리인명 */
  sttyAgtNm?: string

  /** 법정대리인암호화전화번호 */
  sttyAgtEncptTelno?: string

  /** 법정대리인관계 */
  sttyAgtRel?: string

  /** 연계정보식별아이디 */
  linkInfoIdntfId?: string

  /** 인증토큰 */
  certTokenVl?: string

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
 * 대국민포털_법정대리인정보기본 정보 목록 
 */
export interface SttyAgtInfoListRVO {
  list: SttyAgtInfoRVO[]
  totalCount: number
}

/**
 * 대국민포털_법정대리인정보기본 삭제 파라메터 정보 
 */
export interface SttyAgtInfoDVO {
  /** 회원번호 */
  mbrNo: string

}

