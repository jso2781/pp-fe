/**
 * 대국민포털_회원정보기본 조회 목업 정보 
 */
export const mockMbrInfoList = [
  {
    /** 순번 */
    no: 1,

    /** 회원번호 */
    mbrNo: 'XXX',

    /** 회원아이디 */
    mbrId: 'XXX',

    /** 회원암호화성명 */
    encptMbrFlnm: 'XXX',

    /** 회원암호화이메일 */
    encptMbrEmlNm: 'XXX',

    /** 회원암호화비밀번호 */
    encptMbrPswd: 'XXX',

    /** 회원암호화전화번호 */
    encptMbrTelno: 'XXX',

    /** 회원유형코드 */
    mbrTypeCd: 'XXX',

    /** 회원가입상태 */
    mbrJoinSttsCd: 'XXX',

    /** 회원가입일시 */
    mbrJoinDt: '2026-01-23',

    /** 회원탈퇴사유 */
    mbrWhdwlRsn: 'XXX',

    /** 회원탈퇴일시 */
    mbrWhdwlDt: '2026-01-23',

	/** 자문위원여부 */
    cnstnMbcmtYn: 'Y',

    /** 이전암호화비밀번호 */
    bfrEnpswd: 'XXX',

    /** 비밀번호변경일시 */
    pswdChgDt: '2026-01-23',

    /** 비밀번호오류횟수 */
    pswdErrNmtm: -1,

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
 * 대국민포털_회원정보기본 존재여부 조회 파라메터 정보 
 */
export interface ExistMbrInfoPVO {
  /** 회원아이디 */
  mbrId?: string
  /** 회원암호화이메일 */
  encptMbrEmlNm?: string
}

/**
 * 대국민포털_회원정보기본 존재여부 조회 응답 정보 
 */
export interface ExistMbrInfoRVO {
  /** 회원정보 존재여부 */
  existYn?: string
}

/**
 * 대국민포털_회원정보기본 조회/입력/수정/저장 파라메터 정보 
 */
export interface MbrInfoPVO {
  /** 회원번호 */
  mbrNo?: string

  /** 회원아이디 */
  mbrId?: string

  /** 회원암호화성명 */
  encptMbrFlnm?: string

  /** 회원암호화이메일 */
  encptMbrEmlNm?: string

  /** 회원암호화비밀번호 */
  encptMbrPswd?: string

  /** 회원암호화전화번호 */
  encptMbrTelno?: string

  /** 회원유형코드 */
  mbrTypeCd?: string

  /** 회원가입상태 */
  mbrJoinSttsCd?: string

  /** 회원가입일시 */
  mbrJoinDt?: string

  /** 회원탈퇴사유 */
  mbrWhdwlRsn?: string | null

  /** 회원탈퇴일시 */
  mbrWhdwlDt?: string | null

  /** 자문위원여부 */
  cnstnMbcmtYn?: string | null

  /** 이전암호화비밀번호 */
  bfrEnpswd?: string | null

  /** 비밀번호변경일시 */
  pswdChgDt?: string | null

  /** 비밀번호오류횟수 */
  pswdErrNmtm?: number

  /** 연계정보식별아이디 */
  linkInfoIdntfId?: string | null

  /** 인증토큰 */
  certTokenVl?: string | null

  /** 등록자아이디 */
  rgtrId?: string

  /** 등록일시 */
  regDt?: string | null

  /** 등록프로그램아이디 */
  regPrgrmId?: string

  /** 수정자아이디 */
  mdfrId?: string

  /** 수정일시 */
  mdfcnDt?: string | null

  /** 수정프로그램아이디 */
  mdfcnPrgrmId?: string

}

/**
 * 대국민포털_회원정보기본 정보 
 */
export interface MbrInfoRVO {
  /** 순번 */
  no?: 1

  /** 회원번호 */
  mbrNo?: string

  /** 회원아이디 */
  mbrId?: string

  /** 회원암호화성명 */
  encptMbrFlnm?: string

  /** 회원암호화이메일 */
  encptMbrEmlNm?: string

  /** 회원암호화비밀번호 */
  encptMbrPswd?: string

  /** 회원암호화전화번호 */
  encptMbrTelno?: string

  /** 회원유형코드 */
  mbrTypeCd?: string

  /** 회원가입상태 */
  mbrJoinSttsCd?: string

  /** 회원가입일시 */
  mbrJoinDt?: string

  /** 회원탈퇴사유 */
  mbrWhdwlRsn?: string

  /** 회원탈퇴일시 */
  mbrWhdwlDt?: string

  /** 자문위원여부 */
  cnstnMbcmtYn?: string

  /** 이전암호화비밀번호 */
  bfrEnpswd?: string

  /** 비밀번호변경일시 */
  pswdChgDt?: string

  /** 비밀번호오류횟수 */
  pswdErrNmtm?: number

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
 * 대국민포털_회원정보기본 목록 조회용 파라메터 정보 
 */
export interface MbrInfoListPVO {
  /** 회원번호 */
  mbrNo?: string

  /** 회원아이디 */
  mbrId?: string

  /** 회원암호화성명 */
  encptMbrFlnm?: string

  /** 회원암호화이메일 */
  encptMbrEmlNm?: string

  /** 회원암호화비밀번호 */
  encptMbrPswd?: string

  /** 회원암호화전화번호 */
  encptMbrTelno?: string

  /** 회원유형코드 */
  mbrTypeCd?: string

  /** 회원가입상태 */
  mbrJoinSttsCd?: string

  /** 회원가입일시 */
  mbrJoinDt?: string

  /** 회원탈퇴사유 */
  mbrWhdwlRsn?: string

  /** 회원탈퇴일시 */
  mbrWhdwlDt?: string

  /** 자문위원여부 */
  cnstnMbcmtYn?: string

  /** 이전암호화비밀번호 */
  bfrEnpswd?: string

  /** 비밀번호변경일시 */
  pswdChgDt?: string

  /** 비밀번호오류횟수 */
  pswdErrNmtm?: number

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
 * 대국민포털_회원정보기본 정보 목록 
 */
export interface MbrInfoListRVO {
  list: MbrInfoRVO[]
  totalCount: number
}

/**
 * 대국민포털_회원정보기본 삭제 파라메터 정보 
 */
export interface MbrInfoDVO {
  /** 회원번호 */
  mbrNo: string

}

/**
 * 대국민포털_회원정보기본 기존 아이디, 이메일 존재여부 조회
 */
export interface CheckMbrInfoRVO {
  checkCnt: number
}

/**
 * 대국민포털_회원정보기본 기존 아이디, 패스워드 기준으로 데이터 존재 여부 조회 파라메터 정보보
 */
export interface VerifyPasswordPVO {
  /** 회원아이디 */
  mbrId: string

  /** 회원암호화비밀번호 */
  encptMbrPswd: string
}

/**
 * 대국민포털_회원정보기본 기존 아이디, 패스워드 기준으로 데이터 존재여부 조회 결과 정보 
 */
export interface VerifyPasswordRVO {
  /** 회원정보 존재여부 */
  existYn: string  
}

/**
 * 대국민포털_회원정보기본 비밀번호 변경 파라메터 정보 
 */
export interface UpdateMbrInfoRVO {
  /** 회원아이디 */
  updateCnt: number

  /** 대국민포털_회원정보기본 정보 */
  userInfo: MbrInfoRVO
}
