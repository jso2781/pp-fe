export type DurNoticeDetail = {
  heading: string
  body: string
  attachments: { name: string; size: string }[]
}

export type DurNoticeListItem = {
  id: string
  no: number
  title: string
  writer: string
  date: string
  views: number
}

// Mock data for DUR 정보 > 알림 게시판
// 화면/필드 구성은 한국의약품안전관리원 DUR 알림 게시판을 참고해 형태만 맞춘 샘플입니다.
export const durNoticeListMock: DurNoticeListItem[] = [
  {
    id: '113',
    no: 113,
    title: '[공지] 공공저작물 자유이용 허락 기준 안내',
    writer: '공지현',
    date: '2023-04-25',
    views: 11875,
  },
  {
    // 상세 참고 URL의 nttId=5154 스타일을 본떠서 샘플 콘텐츠를 구성
    id: '5154',
    no: 112,
    title: '의약품 적정사용을 위한 주의 정보의 공고(식품의약품안전처공고 제2025-481호, 2025.11.27.)',
    writer: '장유진',
    date: '2025-11-27',
    views: 22,
  },
  {
    id: '111',
    no: 111,
    title: '감기약 안전사용 카드뉴스-「감기약, [안전]체크!」',
    writer: '오수지',
    date: '2025-10-31',
    views: 719,
  },
  {
    id: '110',
    no: 110,
    title: '감기약 안전사용 안내문-「감기약, [안전]체크!」',
    writer: '오수지',
    date: '2025-10-31',
    views: 669,
  },
  {
    id: '109',
    no: 109,
    title: '임부에 대한 의약품 적정사용 정보집(2025.10)',
    writer: '전윤지',
    date: '2025-10-10',
    views: 897,
  },
  {
    id: '108',
    no: 108,
    title: '소아에 대한 의약품 적정사용 정보집(2022.12)',
    writer: '장유진',
    date: '2025-10-10',
    views: 858,
  },
  {
    id: '107',
    no: 107,
    title: '「의약품 병용금기 성분 등의 지정에 관한 규정」 일부개정고시(식품의약품안전관리원 고시 제2025-46호, 2025.7.14.)',
    writer: '장유진',
    date: '2025-07-15',
    views: 1579,
  },
  {
    id: '106',
    no: 106,
    title: '의약품 적정사용을 위한 주의 정보의 공고(식품의약품안전처공고 제2025-246호, 2025.05.30.)',
    writer: '장유진',
    date: '2025-06-02',
    views: 1780,
  },
]

// ✅ 핵심: string 인덱싱 가능하게
export const durNoticeDetailMockById: Record<string, DurNoticeDetail> = {
  '5154': {
    heading: '게시글 보기',
    // 상세 화면 본문 형식(공고번호/제목/설명/일자)을 참고한 샘플
    body: [
      '식품의약품안전처공고 제2025-481호',
      '',
      '의약품 적정사용을 위한 주의 정보의 공고',
      '',
      '「약사법」 제23조의2제1항제2호, 제26조제2항제3호 및 ‘의약품 병용금기 성분 등의 지정에 관한 규정’(식품의약품안전처 고시) 제8조에 따라',
      '의약품 적정사용을 위해 아래의 용량주의 성분 2개, 수유부주의 7개를 추가·변경하여 붙임과 같이 “의약품 적정사용을 위한 주의 정보”를 공고합니다.',
      '',
      '2025 년 11 월 27 일',
    ].join('\n'),
    attachments: [
      { name: '의약품 적정사용을 위한 주의 정보(총괄).xlsx', size: '292,947 byte' },
      { name: '의약품 적정사용을 위한 주의정보 공고문(제2025-481호).hwpx', size: '50,903 byte' },
    ],
  },
}
