/**
 * 대국민포털_의견제안 조회 목업 정보 
 */
export const mockOpnnList = [
  {
    /** 순번 */
    no: 1,

    /** 작성자암호화성명 */
    encptWrtrFlnm: 'XXX',

    /** 작성자암호화전화번호 */
    encptWrtrTelno: 'XXX',

    /** 작성자암호화이메일 */
    encptMbrEmlNm: 'XXX',

    /** 작성구분코드 */
    wrtSeCd: 'XXX',

    /** 문제점내용 */
    pbptCn: 'XXX',

    /** 요청사항 */
    dmndMttrCn: 'XXX',

    /** 요청사항상세내용 */
    dmndMttrDtlCn: 'XXX',

    /** 참고사항 */
    refMttrCn: 'XXX',

    /** 내부참고사항내용 */
    insdRefMttrCn: 'XXX',

    /** 첨부파일그룹아이디 */
    atchFileGroupId: 'XXX',

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
 * 대국민포털_의견제안 조회/입력/수정/저장 파라메터 정보 
 */
export interface OpnnPVO {
  /** 작성자암호화성명 */
  encptWrtrFlnm?: string

  /** 작성자암호화전화번호 */
  encptWrtrTelno?: string

  /** 작성자암호화이메일 */
  encptMbrEmlNm?: string

  /** 작성구분코드 */
  wrtSeCd?: string

  /** 문제점내용 */
  pbptCn?: string

  /** 요청사항 */
  dmndMttrCn?: string

  /** 요청사항상세내용 */
  dmndMttrDtlCn?: string

  /** 참고사항 */
  refMttrCn?: string

  /** 내부참고사항내용 */
  insdRefMttrCn?: string

  /** 첨부파일그룹아이디 */
  atchFileGroupId?: string

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
 * 대국민포털_의견제안 정보 
 */
export interface OpnnRVO {
  /** 순번 */
  no?: 1

  /** 작성자암호화성명 */
  encptWrtrFlnm?: string

  /** 작성자암호화전화번호 */
  encptWrtrTelno?: string

  /** 작성구분코드 */
  wrtSeCd?: string

  /** 문제점내용 */
  pbptCn?: string

  /** 요청사항 */
  dmndMttrCn?: string

  /** 요청사항상세내용 */
  dmndMttrDtlCn?: string

  /** 참고사항 */
  refMttrCn?: string

  /** 내부참고사항내용 */
  insdRefMttrCn?: string

  /** 첨부파일그룹아이디 */
  atchFileGroupId?: string

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
 * 대국민포털_의견제안 목록 조회용 파라메터 정보 
 */
export interface OpnnListPVO {
  /** 작성자암호화성명 */
  encptWrtrFlnm?: string

  /** 작성자암호화전화번호 */
  encptWrtrTelno?: string

  /** 작성구분코드 */
  wrtSeCd?: string

  /** 문제점내용 */
  pbptCn?: string

  /** 요청사항 */
  dmndMttrCn?: string

  /** 요청사항상세내용 */
  dmndMttrDtlCn?: string

  /** 참고사항 */
  refMttrCn?: string

  /** 내부참고사항내용 */
  insdRefMttrCn?: string

  /** 첨부파일그룹아이디 */
  atchFileGroupId?: string

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
 * 대국민포털_의견제안 정보 목록 
 */
export interface OpnnListRVO {
  list: OpnnRVO[]
  totalCount: number
}

/**
 * 대국민포털_의견제안 삭제 파라메터 정보 
 */
export interface OpnnDVO {
}

