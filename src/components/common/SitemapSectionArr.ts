import type { GnbDepth1Item } from '@/features/auth/MenuTypes'

/**
 * 사이트맵 아이템 타입 정의
 */
export type SitemapLinkItem = {
  key: string
  label: string
  href?: string
  internal?: boolean
  children?: SitemapLinkItem[]
}

export type SitemapSection = {
  key: string
  title: string
  items: SitemapLinkItem[]
}

/**
 * gnbList(GNB 메뉴 구조)를 사이트맵 섹션 구조로 변환.
 * gnbList가 변경될 때마다 이 함수를 호출하면 SITEMAP_SECTIONS와 동일한 형태로 사용 가능.
 */
export function gnbListToSitemapSections(gnbList: GnbDepth1Item[]): SitemapSection[] {
  if (!Array.isArray(gnbList) || gnbList.length === 0) return []

  return gnbList.map((d1, i1) => ({
    key: `section-${d1.title}-${i1}`.replace(/\s+/g, '-'),
    title: d1.title,
    items: (d1.depth2 ?? []).map((d2, i2) => {
      const itemKey = `item-${i1}-${i2}-${(d2.title ?? '').replace(/\s+/g, '-')}`
      const hasChildren = Array.isArray(d2.depth3) && d2.depth3.length > 0
      if (hasChildren) {
        return {
          key: itemKey,
          label: d2.title,
          children: d2.depth3!.map((d3) => ({
            key: `sn-${d3.menuSn}`,
            label: d3.name,
            href: d3.url,
            internal: !d3.isNewWindow,
          })),
        }
      }
      return {
        key: itemKey,
        label: d2.title,
        ...(d2.url && {
          href: d2.url,
          internal: !d2.url.startsWith('http://') && !d2.url.startsWith('https://'),
        }),
      }
    }),
  }))
}

/**
 * 사이트맵 섹션 데이터 (gnbList 미로드 시 폴백용)
 */
export const SITEMAP_SECTIONS: SitemapSection[] = [
    {
      key: 'main-tasks',
      title: '주요 업무',
      items: [
        {
          key: 'safety-report',
          label: '의약품 이상사례보고',
          children: [
            {
              key: 'safety-report-online1',
              label: '이상사례보고',
              children: [
                {
                  key: 'safety-report-online11',
                  label: '이상사례 보고란?',
                  href: '/safety/report1',
                  internal: true,
                },
                {
                  key: 'safety-report-online12',
                  label: 'KAERS란?',
                  href: '/safety/report2',
                  internal: true,
                },
              ],
            },
            {
              key: 'safety-report-online2',
              label: '온라인 보고',
              children: [
                {
                  key: 'safety-report-online21',
                  label: '의약품이상사례',
                  href: 'https://nedrug.mfds.go.kr/CCCBA03F010/getReport',
                },
                {
                  key: 'safety-report-online22',
                  label: '의약외품(생리대 등)',
                  href: 'https://nedrug.mfds.go.kr/CCCBA03F010/getReportQuasiDrug',
                },
              ],
            },
            {
              key: 'safety-report-offline',
              label: '오프라인 보고',
              href: '/safety/report5',
              internal: true,
            },
            {
              key: 'safety-report-archive',
              label: '이상사례보고자료실',
              href: '/safety/report6',
              internal: true,
            },
            {
              key: 'safety-report-guide',
              label: '온라인보고방법 안내',
              href: '/safety/report7',
              internal: true,
            },
          ],
        },
        {
          key: 'side-effects-report',
          label: '의약품 부작용 보고 자료',
          children: [
            { key: 'side-effects-report1', label: '의약품 부작용 보고1', href: '#' },
            { key: 'side-effects-report2', label: '의약품 부작용 보고2', href: '#' },
            { key: 'side-effects-report3', label: '의약품 부작용 보고3', href: '#' },
          ],
        },
        {
          key: 'safety-mgmt',
          label: '의약품 안전관리',
          children: [
            { key: 'safety-terms', label: '약물감시용어', href: '#' },
            { key: 'safety-causality', label: '부작용 인과관계규명', href: '#' },
            { key: 'safety-related', label: '유관기관', href: '#' },
          ],
        },
        {
          key: 'pharma-linkage-analysis',
          label: '의약품.의료정보.연계분석',
          children: [
            { key: 'pharma-linkage-analysis1', label: '의약품.의료정보.연계분석1', href: '#' },
            { key: 'pharma-linkage-analysis2', label: '의약품.의료정보.연계분석2', href: '#' },
            { key: 'pharma-linkage-analysis3', label: '의약품.의료정보.연계분석3', href: '#' },
          ],
        },
        {
          key: 'dur',
          label: 'DUR 정보',
          children: [
            { key: 'dur-understand', label: 'DUR 이해', href: '#' },
            {
              key: 'dur-search-room',
              label: 'DUR 정보검색방',
              children: [
                { key: 'dur-search-room1', label: 'DUR 통합검색', href: '#' },
                { key: 'dur-search-room2', label: '병용금기', href: '#' },
                { key: 'dur-search-room3', label: '특정연령대금기', href: '#' },
                { key: 'dur-search-room4', label: '임부금기', href: '#' },
                { key: 'dur-search-room5', label: '효능군중복주의', href: '#' },
                { key: 'dur-search-room6', label: '용량주의', href: '#' },
                { key: 'dur-search-room7', label: '투여기간주의', href: '#' },
                { key: 'dur-search-room8', label: '노인주의', href: '#' },
              ],
            },
            {
              key: 'dur-appropriate-use',
              label: '의약품 적정사용 정보방',
              children: [
                { key: 'dur-appropriate-use1', label: '노인 적정사용정보집', href: '#' },
                { key: 'dur-appropriate-use2', label: '소아 적정사용정보집', href: '#' },
                { key: 'dur-appropriate-use3', label: '임부 적정사용정보집', href: '#' },
                { key: 'dur-appropriate-use4', label: '간질환 적정사용정보집', href: '#' },
                { key: 'dur-appropriate-use5', label: '신질환 적정사용정보집', href: '#' },
              ],
            },
            { key: 'dur-notice', label: 'DUR 게시판', href: '/dur/notice', internal: true },
            { key: 'dur-proposal', label: 'DUR 제안', href: '/dur/proposal', internal: true },
          ],
        },
        {
          key: 'relief',
          label: '부작용 피해구제',
          children: [
            { key: 'relief-system', label: '제도소개', href: '#' },
            { key: 'relief-apply', label: '피해구제 신청', href: '#' },
            { key: 'relief-news', label: '뉴스/소식', href: '#' },
            { key: 'relief-faq', label: '자주하는 질문', href: 'https://nedrug.mfds.go.kr' },
          ],
        },
        {
          key: 'clinical-trial',
          label: '임상시험안전지원',
          children: [
            { key: 'clinical-trial1', label: '임상시험안전지원기관', href: '#' },
            { key: 'clinical-trial2', label: '협약 안내', href: '#' },
            { key: 'clinical-trial3', label: '중앙IRB신청', href: '#' },
            { key: 'clinical-trial4', label: '임상시험헬프데스크', href: '#' },
            { key: 'clinical-trial5', label: '공지사항', href: '#' },
            { key: 'clinical-trial6', label: '자료실', href: '#' },
          ],
        },
      ],
    },
    {
      key: 'open',
      title: '정보공개',
      items: [
        {
          key: 'open-info',
          label: '정보공개',
          children: [
            { key: 'open-info1', label: '업무처리절차', href: '#' },
            { key: 'open-info2', label: '정보공개 청구', href: 'https://open.go.kr' },
            { key: 'open-info3', label: '임직원국외출장', href: '#' },
            { key: 'open-info4', label: '원장 업무추진비 집행내역', href: '#' },
          ],
        },
        { key: 'open-data', label: '공공데이터 개방', href: '#' },
        {
          key: 'open-mgmt',
          label: '경영공시',
          children: [
            { key: 'open-mgmt1', label: '부패행위 징계현황', href: '#' },
            { key: 'open-mgmt2', label: '징계기준', href: '#' },
            { key: 'open-mgmt3', label: '징계현황', href: '#' },
          ],
        },
        { key: 'open-bizname', label: '사업실명제', href: '#' },
      ],
    },
    {
      key: 'notice',
      title: '기관소식',
      items: [
        { key: 'notice-list', label: '공지사항', href: '/notice', internal: true },
        { key: 'notice-jobs', label: '채용게시판', href: '#' },
        { key: 'notice-faq', label: 'FAQ', href: '#' },
        { key: 'notice-petition', label: '국민신문고', href: '#' },
        { key: 'notice-press', label: '보도자료', href: '#' },
        {
          key: 'notice-newsletter',
          label: '뉴스레터',
          children: [
            { key: 'notice-bio-focus', label: '첨단바이오 포커스', href: 'https://ltfu.mfds.go.kr' },
            { key: 'notice-safe-info', label: '마약류 안전정보지', href: '#' },
            { key: 'notice-leaflet', label: '리플릿', href: '#' },
          ],
        },
        { key: 'notice-card', label: '카드뉴스', href: '#' },
        { key: 'notice-video', label: '동영상', href: '#' },
        { key: 'notice-archive', label: '자료실', href: '#' },
      ],
    },
    {
      key: 'about',
      title: '기관소개',
      items: [
        { key: 'about-greeting', label: '기관장 인사말', href: '#' },
        { key: 'about-former', label: '역대 기관장', href: '#' },
        { key: 'about-history', label: '연혁', href: '#' },
        { key: 'about-vision', label: '비전 및 목표', href: '#' },
        { key: 'about-org', label: '조직도', href: '#' },
        { key: 'about-law', label: '설립근거 및 관련법령', href: '#' },
        { key: 'about-charter', label: '고객헌장', href: '#' },
        { key: 'about-news', label: '우리원동정', href: '#' },
        { key: 'about-ci', label: 'CI소개', href: '#' },
        {
          key: 'about-ethics',
          label: '윤리경영',
          children: [{ key: 'about-ethics-clean', label: '클린신고센터', href: '#' }],
        },
        { key: 'about-character', label: '캐릭터소개', href: '#' },
        {
          key: 'about-map',
          label: '오시는 길',
          href: 'https://www.drugsafe.or.kr/iwt/ds/ko/introduction/EgovLocation.do',
        },
      ],
    }
  ]