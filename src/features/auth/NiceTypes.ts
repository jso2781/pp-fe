/**
 * 나이스 본인인증(PASS) 기본설정 조회 파라메터 정보
 */
export interface GetTransctionIdPVO {
  /** 요청 ID */
  requestId?: string
}

/**
 * 나이스 본인인증(PASS) 기본설정 조회 결과
 */
export interface GetTransctionIdRVO {
  /** 요청 ID */
  requestNo: string
  /** 거래 ID */
  transactionId: string
  /** 반환 코드 */
  returnCode: string
  /** 인증 URL */
  uthUrl: string
}

/**
 * 나이스 본인인증(PASS) 기본설정 조회 결과 목업 샘플
 */
export const mockGetTransctionId: GetTransctionIdRVO = {
  requestNo: '1234567890',
  transactionId: '1234567890',
  returnCode: '0000',
  uthUrl: 'https://stg.drugsafe.or.kr/api/pp/niceid/return',
}


/** 
 *  나이스 본인인증(PASS)창에서 인증완료 후 응답값(JSON) 추출
 */
export interface UserInfoFromNiceRVO {
  /**
   * 전화번호(01037898540 형식)
   */
  phone?: string

  /**
   * 인증 토큰(BSE8/HaCwUt6jOXI5sicOQf4QF5a5eOxZKyOZVhHoNa603/laU7SLBkK8OnDmBLEE1Cb6cT2myEL5S4zC4oLow== 형식)
   */
  ci?: string

  /**
   * 이름(박성주)
   */
  name?: string

  /**
   * 생년월일(19770728 형식)
   */
  brdt?: string

  /**
   * 회원정보 존재 여부(Y/N)
   */
  existMbrInfo?: string
}