/**
 * 대국민포털_콘텐츠기본 조회 목업 정보 
 */
export const mockCmsList = [
  {
    /** 콘텐츠일련번호 */
    contsSn: 'cms001',

    /** 콘텐츠버전일련번호 */
    contsVerNo: 1,

    /** 콘텐츠제목 */
    contsTtl: 'CMS_TEST1',

    /** 콘텐츠내용 */
    contsCn: 'XXX',

    /** 콘텐츠사용여부 */
    contsUseYn: 'Y',

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
 * 대국민포털_콘텐츠기본 조회용 파라메터
 */
export interface CmsPVO {
    /** 콘텐츠일련번호 */
    contsSn: string
}

/**
 * 대국민포털_콘텐츠기본 정보 
 */
export interface CmsRVO {
    /** 콘텐츠일련번호 */
    contsSn: string,

    /** 콘텐츠버전일련번호 */
    contsVerNo?: number,

    /** 콘텐츠제목 */
    contsTtl: string,

    /** 콘텐츠내용 */
    contsCn: string,

    /** 콘텐츠사용여부 */
    contsUseYn: string,

    /** 등록자아이디 */
    rgtrId?: string,

    /** 등록일시 */
    regDt?: string,

    /** 수정자아이디 */
    mdfrId?: string,
    
    /** 수정일시 */
    mdfcnDt?: string
}


