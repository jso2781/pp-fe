/**
 * 대국민포털_업무별 접속이력 적재 파라미터 VO
 */
export interface AccessLogPVO {
  /** 메뉴ID */
  menuId?: string;

  /** URL 주소 */
  urlAddr?: string;

  /** 업무구분코드 */
  taskSeCdNo?: string;

  /** 업무구분코드 */
  taskSeCd?: string;

  /** 접속자명 */
  acsrNm?: string;

  /** 기타메모내용 */
  etcMemoCn?: string;

  /** 등록자ID */
  rgtrId?: string;

  /** 수정자ID */
  mdfrId?: string;

  /** 개인정보포함여부 */
  prvcInclYn?: string;

  /** 수행업무코드 */
  flfmtTaskCd?: string;

  /** 로그인구분코드 */
  lgnSeCd?: string;
}