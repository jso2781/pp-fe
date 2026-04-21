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
