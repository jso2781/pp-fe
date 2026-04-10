/**
 * 대국민포털_부정신고 조회/입력/수정/저장 파라메터 정보 
 */
export interface DshstyDclrPVO {
  /** 암호화회원성명 */
  encptMbrFlnm?: string;

  /** 연계정보식별아이디 */
  linkInfoIdntfId?: string;

  /** 암호화회원전화번호 */
  encptMbrTelno?: string;

  /** 암호화회원이메일명 */
  encptMbrEmlNm?: string;

  /** 신고제목명 */
  dclrTtlNm?: string;

  /** 부정행위자성명 */
  dshstyActrFlnm?: string;

  /** 부정행위시점내용 */
  dshstyActPipCn?: string;

  /** 부정행위장소내용 */
  dshstyActPlcCn?: string;

  /** 부정행위내용 */
  dshstyActCn?: string;
  
  /** 추가식별확인자명 */
  addIdntfIdfrNm?: string;
  
  /** 신고내용확인방법내용 */
  dclrCnIdntyMthdCn?: string;
  
  /** 부정행위식별사유내용 */
  dshstyActIdntfRsnCn?: string;
  
  /** 부정행위기간내용 */
  dshstyActPrdCn?: string;

  /** 개인정보선택동의여부 (CleanForm: "개인정보 수집·이용 동의(선택)" 값) */
  prvcChcAgreYn?: 'Y' | 'N' | string;
  
  /** 등록자아이디 */
  rgtrId?: string;
  
  /** 등록일시 */
  regDt?: string;
  
  /** 수정자아이디 */
  mdfrId?: string;
  
  /** 수정일시 */
  mdfcnDt?: string;
}

/**
 * 대국민포털_부정신고 정보 
 */
export interface DshstyDclrRVO {

  /** 신고일련번호 */
  dclrSn?: number;

  /** 연계정보식별아이디 */
  linkInfoIdntfId?: string;

  /** 암호화회원성명 */
  encptMbrFlnm?: string;

  /** 암호화회원전화번호 */
  encptMbrTelno?: string;

  /** 암호화회원이메일명 */
  encptMbrEmlNm?: string;

  /** 신고제목명 */
  dclrTtlNm?: string;

  /** 부정행위자성명 */
  dshstyActrFlnm?: string;

  /** 부정행위시점내용 */
  dshstyActPipCn?: string;

  /** 부정행위장소내용 */
  dshstyActPlcCn?: string;

  /** 부정행위내용 */
  dshstyActCn?: string;
  
  /** 추가식별확인자명 */
  addIdntfIdfrNm?: string;
  
  /** 신고내용확인방법내용 */
  dclrCnIdntyMthdCn?: string;
  
  /** 부정행위식별사유내용 */
  dshstyActIdntfRsnCn?: string;
  
  /** 부정행위기간내용 */
  dshstyActPrdCn?: string;
  
  /** 등록자아이디 */
  rgtrId?: string;
  
  /** 등록일시 */
  regDt?: string;
  
  /** 수정자아이디 */
  mdfrId?: string;
  
  /** 수정일시 */
  mdfcnDt?: string;
}

/**
 * 대국민포털_의견제안 목록 조회용 파라메터 정보 
 */
export interface DshstyDclrListPVO {
  /** 암호화회원성명 */
  encptMbrFlnm?: string;

  /** 연계정보식별아이디 */
  linkInfoIdntfId?: string;

  /** 암호화회원전화번호 */
  encptMbrTelno?: string;

  /** 암호화회원이메일명 */
  encptMbrEmlNm?: string;

  /** 신고제목명 */
  dclrTtlNm?: string;

  /** 부정행위자성명 */
  dshstyActrFlnm?: string;

  /** 부정행위시점내용 */
  dshstyActPipCn?: string;

  /** 부정행위장소내용 */
  dshstyActPlcCn?: string;

  /** 부정행위내용 */
  dshstyActCn?: string;
  
  /** 추가식별확인자명 */
  addIdntfIdfrNm?: string;
  
  /** 신고내용확인방법내용 */
  dclrCnIdntyMthdCn?: string;
  
  /** 부정행위식별사유내용 */
  dshstyActIdntfRsnCn?: string;
  
  /** 부정행위기간내용 */
  dshstyActPrdCn?: string;
  
  /** 등록자아이디 */
  rgtrId?: string;
  
  /** 등록일시 */
  regDt?: string;
  
  /** 수정자아이디 */
  mdfrId?: string;
  
  /** 수정일시 */
  mdfcnDt?: string;
}

/**
 * 대국민포털_부정신고 정보 목록 
 */
export interface DshstyDclrListRVO {
  list: DshstyDclrRVO[]
  totalCount: number
}
