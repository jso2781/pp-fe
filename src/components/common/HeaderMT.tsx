import React, { useMemo, useState, useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography, Divider, Menu, MenuItem, Container, Drawer, Link as MuiLink } from '@mui/material';
import { Language, Menu as MenuIcon, ArrowDropDown, Search, Person, Login, Close, ChevronRight } from '@mui/icons-material'
import SkipNavigation from './SkipNavigation'
import { getLangFromPathname, langPath } from '@/routes/lang'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectMenuList } from '@/features/auth/MenuThunks'
import { clearMenuCache } from '@/features/auth/MenuSlice'
import { LOCALE_KEY } from '@/i18n/i18n'
import type { MenuRVO } from '@/features/auth/MenuTypes'
import { NavLink } from 'react-router-dom'

/**
 * 사이트맵 아이템 타입 정의
 */
type SitemapLinkItem = {
  key: string
  label: string
  href?: string
  internal?: boolean
  children?: SitemapLinkItem[]
}

type SitemapSection = {
  key: string
  title: string
  items: SitemapLinkItem[]
}

/**
 * 사이트맵 섹션 데이터 (기존 프로젝트 참조)
 */
const SITEMAP_SECTIONS: SitemapSection[] = [
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
  },
] as const

/**
 * 사이트맵 아이템 컴포넌트
 */
function SitemapItem({ item }: { item: SitemapLinkItem }) {
  const location = useLocation()
  const curLang = useMemo(() => getLangFromPathname(location.pathname), [location.pathname])
  const to = useMemo(() => (p: string) => langPath(curLang, p), [curLang])

  const hasChildren = Array.isArray(item.children) && item.children.length > 0
  const internal = item.internal || (typeof item.href === 'string' && item.href.startsWith('/'))

  return (
    <Box sx={{ marginBottom: 1 }}>
      <Box sx={{ fontWeight: 500 }}>
        {item.href && item.href !== '#' ? (
          internal ? (
            <MuiLink component={NavLink} to={to(item.href)} sx={{ color: 'inherit', textDecoration: 'none' }}>
              {item.label}
            </MuiLink>
          ) : (
            <MuiLink href={to(item.href)} target="_blank" rel="noopener noreferrer" sx={{ color: 'inherit' }}>
              {item.label}
            </MuiLink>
          )
        ) : (
          <Typography variant="body2">{item.label}</Typography>
        )}
      </Box>

      {hasChildren && (
        <Box sx={{ paddingLeft: 1.5, marginTop: 0.75 }}>
          <Stack direction="column" spacing={0.5}>
            {item.children?.map((child) => (
              <Box key={child.key} sx={{ lineHeight: 1.4 }}>
                <SitemapItem item={child} />
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  )
}

/**
 * 메뉴 목록을 트리 구조로 변환하여 상위 메뉴(주요 업무, 정보공개, 기관소식, 기관소개)를 찾는 함수
 * 기존 프로젝트의 buildAntdMenuItems 로직을 참조
 */
function buildMenuTree(list: MenuRVO[]) {
  const byParent = new Map<number | null, MenuRVO[]>()

  // 부모별로 그룹화
  for (const m of list) {
    const parent = m.upMenuSn ?? null
    if (!byParent.has(parent)) {
      byParent.set(parent, [])
    }
    byParent.get(parent)!.push(m)
  }

  // 각 그룹을 menuSeq로 정렬
  for (const [key, arr] of byParent.entries()) {
    arr.sort((a, b) => (a.menuSeq ?? 0) - (b.menuSeq ?? 0))
  }

  // 루트 메뉴들 (upMenuSn === null인 메뉴들, 기존 프로젝트와 동일한 로직)
  const rootMenus = (byParent.get(null) ?? []).sort((a, b) => (a.menuSeq ?? 0) - (b.menuSeq ?? 0))

  return { rootMenus, byParent }
}

export default function Header({ onOpenNav }: { onOpenNav: () => void }) {
  const { t, i18n: i18nInstance } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // Rest API 호출로 메뉴 가져오기
  const { list } = useAppSelector((s) => s.menu)

  const lang = getLangFromPathname(location.pathname) || 'ko'
  const to = (p: string) => {
    const raw = langPath(lang, p)
    // Normalize accidental double slashes (e.g. "//") which breaks react-router Link
    return raw.replace(/\/{2,}/g, '/')
  }

  // 드롭다운 메뉴 상태 관리
  const [anchorEls, setAnchorEls] = useState<{ [key: string]: HTMLElement | null }>({})
  // 사이트맵 Drawer 상태 관리
  const [sitemapOpen, setSitemapOpen] = useState(false)
  // 서브메뉴 닫기 타임아웃 관리
  const closeTimeoutsRef = useRef<{ [key: string]: NodeJS.Timeout }>({})

  /**
   * 목업 데이터 - 주석처리 (Rest API 사용 시)
   * menuItems1: menuData.json에서 추출한 메뉴 데이터
   * 화면에 메뉴로 표기할 때 필요한 속성값만 포함 (menuSn, menuNm, menuUrlAddr, upMenuSn, menuSeq, menuTypeCd, depLevel)
   */
  const menuItems1: MenuRVO[] = [
    { menuSn: 1000, menuNm: '주요 업무', upMenuSn: undefined, menuSeq: 1, menuTypeCd: 'MENU', depLevel: 1 },
    { menuSn: 1001, menuNm: '의약품 이상사례보고', upMenuSn: 1000, menuSeq: 1, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 1010, menuNm: '이상사례보고', upMenuSn: 1001, menuSeq: 1, menuTypeCd: 'MENU', depLevel: 3 },
    { menuSn: 1020, menuNm: '이상사례 보고란?', menuUrlAddr: '/safety/report1', upMenuSn: 1010, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1021, menuNm: 'KAERS란?', menuUrlAddr: '/safety/report2', upMenuSn: 1010, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1011, menuNm: '온라인 보고', upMenuSn: 1001, menuSeq: 2, menuTypeCd: 'MENU', depLevel: 3 },
    { menuSn: 1030, menuNm: '의약품이상사례', menuUrlAddr: 'https://nedrug.mfds.go.kr/CCCBA03F010/getReport', upMenuSn: 1011, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1031, menuNm: '의약외품(생리대 등)', menuUrlAddr: 'https://nedrug.mfds.go.kr/CCCBA03F010/getReportQuasiDrug', upMenuSn: 1011, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1012, menuNm: '오프라인 보고', menuUrlAddr: '/safety/report5', upMenuSn: 1001, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1013, menuNm: '이상사례보고자료실', menuUrlAddr: '/safety/report6', upMenuSn: 1001, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1014, menuNm: '온라인보고방법 안내', menuUrlAddr: '/safety/report7', upMenuSn: 1001, menuSeq: 5, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1002, menuNm: '의약품 부작용 보고 자료', upMenuSn: 1000, menuSeq: 2, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 1040, menuNm: '의약품 부작용 보고1', upMenuSn: 1002, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1041, menuNm: '의약품 부작용 보고2', upMenuSn: 1002, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1042, menuNm: '의약품 부작용 보고3', upMenuSn: 1002, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1003, menuNm: '의약품 안전관리', upMenuSn: 1000, menuSeq: 3, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 1050, menuNm: '약물감시용어', upMenuSn: 1003, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1051, menuNm: '부작용 인과관계규명', upMenuSn: 1003, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1052, menuNm: '유관기관', upMenuSn: 1003, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1004, menuNm: '의약품.의료정보.연계분석', upMenuSn: 1000, menuSeq: 4, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 1060, menuNm: '의약품.의료정보.연계분석1', upMenuSn: 1004, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1061, menuNm: '의약품.의료정보.연계분석2', upMenuSn: 1004, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1062, menuNm: '의약품.의료정보.연계분석3', upMenuSn: 1004, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1005, menuNm: 'DUR 정보', upMenuSn: 1000, menuSeq: 5, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 1070, menuNm: 'DUR 이해', upMenuSn: 1005, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1071, menuNm: 'DUR 정보검색방', upMenuSn: 1005, menuSeq: 2, menuTypeCd: 'MENU', depLevel: 3 },
    { menuSn: 1080, menuNm: 'DUR 통합검색', upMenuSn: 1071, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1081, menuNm: '병용금기', upMenuSn: 1071, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1082, menuNm: '특정연령대금기', upMenuSn: 1071, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1083, menuNm: '임부금기', upMenuSn: 1071, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1084, menuNm: '효능군중복주의', upMenuSn: 1071, menuSeq: 5, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1085, menuNm: '용량주의', upMenuSn: 1071, menuSeq: 6, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1086, menuNm: '투여기간주의', upMenuSn: 1071, menuSeq: 7, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1087, menuNm: '노인주의', upMenuSn: 1071, menuSeq: 8, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1088, menuNm: '수유부주의', upMenuSn: 1071, menuSeq: 9, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1072, menuNm: '의약품 적정사용 정보방', upMenuSn: 1005, menuSeq: 3, menuTypeCd: 'MENU', depLevel: 3 },
    { menuSn: 1090, menuNm: '노인 적정사용정보집', upMenuSn: 1072, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1091, menuNm: '소아 적정사용정보집', upMenuSn: 1072, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1092, menuNm: '임부 적정사용정보집', upMenuSn: 1072, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1093, menuNm: '간질환 적정사용정보집', upMenuSn: 1072, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1094, menuNm: '신질환 적정사용정보집', upMenuSn: 1072, menuSeq: 5, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1073, menuNm: 'DUR 게시판', menuUrlAddr: '/dur/notice', upMenuSn: 1005, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1074, menuNm: 'DUR 제안', menuUrlAddr: '/dur/proposal', upMenuSn: 1005, menuSeq: 5, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1006, menuNm: '부작용 피해구제', upMenuSn: 1000, menuSeq: 6, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 1110, menuNm: '제도소개', upMenuSn: 1006, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1111, menuNm: '피해구제 신청', upMenuSn: 1006, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1112, menuNm: '뉴스/소식', upMenuSn: 1006, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1113, menuNm: '자주하는 질문', menuUrlAddr: 'https://nedrug.mfds.go.kr', upMenuSn: 1006, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1007, menuNm: '임상시험안전지원', upMenuSn: 1000, menuSeq: 7, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 1120, menuNm: '임상시험안전지원기관', upMenuSn: 1007, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1121, menuNm: '협약 안내', upMenuSn: 1007, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1122, menuNm: '중앙IRB신청', upMenuSn: 1007, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1123, menuNm: '임상시험헬프데스크', upMenuSn: 1007, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1124, menuNm: '공지사항', upMenuSn: 1007, menuSeq: 5, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1125, menuNm: '자료실', upMenuSn: 1007, menuSeq: 6, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1100, menuNm: '정보공개', upMenuSn: undefined, menuSeq: 2, menuTypeCd: 'MENU', depLevel: 1 },
    { menuSn: 2000, menuNm: '정보공개', upMenuSn: 1100, menuSeq: 1, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 2010, menuNm: '업무처리절차', upMenuSn: 2000, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 2011, menuNm: '정보공개 청구', menuUrlAddr: 'https://open.go.kr', upMenuSn: 2000, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 2012, menuNm: '임직원국외출장', upMenuSn: 2000, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 2013, menuNm: '원장 업무추진비 집행내역', upMenuSn: 2000, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 2001, menuNm: '공공데이터 개방', upMenuSn: 1100, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 2002, menuNm: '경영공시', upMenuSn: 1100, menuSeq: 3, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 2020, menuNm: '부패행위 징계현황', upMenuSn: 2002, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 2021, menuNm: '징계기준', upMenuSn: 2002, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 2022, menuNm: '징계현황', upMenuSn: 2002, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 2003, menuNm: '사업실명제', upMenuSn: 1100, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 1200, menuNm: '기관소식', upMenuSn: undefined, menuSeq: 3, menuTypeCd: 'MENU', depLevel: 1 },
    { menuSn: 3000, menuNm: '공지사항', menuUrlAddr: '/notice', upMenuSn: 1200, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 3001, menuNm: '채용게시판', upMenuSn: 1200, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 3002, menuNm: 'FAQ', upMenuSn: 1200, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 3003, menuNm: '국민신문고', upMenuSn: 1200, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 3004, menuNm: '보도자료', upMenuSn: 1200, menuSeq: 5, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 3005, menuNm: '뉴스레터', upMenuSn: 1200, menuSeq: 6, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 3010, menuNm: '첨단바이오 포커스', menuUrlAddr: 'https://ltfu.mfds.go.kr', upMenuSn: 3005, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 3011, menuNm: '마약류 안전정보지', upMenuSn: 3005, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 3012, menuNm: '리플릿', upMenuSn: 3005, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 3006, menuNm: '카드뉴스', upMenuSn: 1200, menuSeq: 7, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 3007, menuNm: '동영상', upMenuSn: 1200, menuSeq: 8, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 3008, menuNm: '자료실', upMenuSn: 1200, menuSeq: 9, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 1300, menuNm: '기관소개', upMenuSn: undefined, menuSeq: 4, menuTypeCd: 'MENU', depLevel: 1 },
    { menuSn: 4000, menuNm: '기관장 인사말', upMenuSn: 1300, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4001, menuNm: '역대 기관장', upMenuSn: 1300, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4002, menuNm: '연혁', upMenuSn: 1300, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4003, menuNm: '비전 및 목표', upMenuSn: 1300, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4004, menuNm: '조직도', upMenuSn: 1300, menuSeq: 5, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4005, menuNm: '설립근거 및 관련법령', upMenuSn: 1300, menuSeq: 6, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4006, menuNm: '고객헌장', upMenuSn: 1300, menuSeq: 7, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4007, menuNm: '우리원동정', upMenuSn: 1300, menuSeq: 8, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4008, menuNm: 'CI소개', upMenuSn: 1300, menuSeq: 9, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4009, menuNm: '윤리경영', upMenuSn: 1300, menuSeq: 10, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 4012, menuNm: '클린신고센터', upMenuSn: 4009, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 4010, menuNm: '캐릭터소개', upMenuSn: 1300, menuSeq: 11, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4011, menuNm: '오시는 길', menuUrlAddr: 'https://www.drugsafe.or.kr/iwt/ds/ko/introduction/EgovLocation.do', upMenuSn: 1300, menuSeq: 12, menuTypeCd: 'PAGE', depLevel: 2 },
  ];

  /**
   * 목업 데이터 - 주석처리 (Rest API 사용 시)
   * expertMyWorkMenuItem을 MenuRVO 형식으로 변환
   */
  const expertMyWorkMenuItem: MenuRVO = {
    menuSn: 2001,
    menuNm: t('expertMyWork'),
    menuUrlAddr: '/expert/my-work',
    upMenuSn: undefined,
    menuSeq: 0,
    menuTypeCd: 'PAGE',
    depLevel: 1,
  };

  // 목업 데이터 - 주석처리 (Rest API 사용 시)
  // 권한별 분기 - 목업 데이터로 사용
  const menuItems2 = [
    // 필요하면 "전문가" 상위 그룹을 따로 두고 그 안에 넣어도 되고,
    // 지금은 최상위에 단일 메뉴로 추가하는 예시
    expertMyWorkMenuItem,

    ...menuItems1
  ];
  
  // const { rootMenus, byParent } = useMemo(() => buildMenuTree(menuItems1), [menuItems1]);

  // 메뉴 트리 구조 생성 - Rest API에서 가져온 list 사용
  const { rootMenus, byParent } = useMemo(() => buildMenuTree(list), [list])

  // Rest API 호출 - 언어 변경 시 메뉴 목록 재조회
  useEffect(() => {
    // 언어가 바뀔 때마다 해당 언어 메뉴 재조회
    dispatch(selectMenuList({ langSeCd: i18nInstance.language }))
  }, [dispatch, i18nInstance.language])

  const onToggleLang = () => {
    const nextLang = i18nInstance.language === 'ko' ? 'en' : 'ko'

    // 현재 경로에서 lang segment 교체
    const pathSegments = location.pathname.split('/')
    pathSegments[1] = nextLang
    const nextPath = pathSegments.join('/')

    // Rest API 호출 - 토글할 때마다 메뉴 목록을 무조건 다시 불러오게 캐시 초기화
    dispatch(clearMenuCache())

    console.log('Header toggleLang curLang=' + i18nInstance.language + ', next=' + nextLang)

    localStorage.setItem(LOCALE_KEY, nextLang) // ✅ APP_LOCALE 저장
    i18nInstance.changeLanguage(nextLang) // ✅ UI 즉시 반영
    navigate(nextPath) // ✅ 경로 이동
  }

  // 드롭다운 메뉴 열기
  const handleMenuOpen = (menuKey: string, event: React.MouseEvent<HTMLElement>) => {
    // 같은 부모의 다른 형제 메뉴들을 닫기
    const parentKey = menuKey.substring(0, menuKey.lastIndexOf('-'))
    
    // 형제 메뉴들의 타임아웃 즉시 취소
    if (parentKey) {
      // 서브메뉴인 경우: 같은 부모를 가진 다른 형제 메뉴들의 타임아웃 취소
      Object.keys(closeTimeoutsRef.current).forEach((key) => {
        if (key.startsWith(parentKey + '-') && key !== menuKey && !key.startsWith(menuKey + '-')) {
          clearTimeout(closeTimeoutsRef.current[key])
          delete closeTimeoutsRef.current[key]
          // 형제 메뉴의 하위 메뉴 타임아웃도 즉시 취소
          Object.keys(closeTimeoutsRef.current).forEach((childKey) => {
            if (childKey.startsWith(key + '-')) {
              clearTimeout(closeTimeoutsRef.current[childKey])
              delete closeTimeoutsRef.current[childKey]
            }
          })
        }
      })
    } else {
      // 루트 메뉴인 경우: 다른 모든 루트 메뉴들의 타임아웃 취소
      Object.keys(closeTimeoutsRef.current).forEach((key) => {
        if (key.startsWith('menu-') && key !== menuKey) {
          clearTimeout(closeTimeoutsRef.current[key])
          delete closeTimeoutsRef.current[key]
          // 다른 루트 메뉴의 하위 메뉴 타임아웃도 즉시 취소
          Object.keys(closeTimeoutsRef.current).forEach((childKey) => {
            if (childKey.startsWith(key + '-')) {
              clearTimeout(closeTimeoutsRef.current[childKey])
              delete closeTimeoutsRef.current[childKey]
            }
          })
        }
      })
    }
    
    // flushSync를 사용하여 즉시 DOM에 반영
    flushSync(() => {
      setAnchorEls((prev) => {
        const newState = { ...prev }
        
        if (parentKey) {
          // 서브메뉴인 경우: 같은 부모를 가진 다른 형제 메뉴들 닫기
          Object.keys(newState).forEach((key) => {
            if (key.startsWith(parentKey + '-') && key !== menuKey && !key.startsWith(menuKey + '-')) {
              // 형제 메뉴의 하위 메뉴들 먼저 닫기
              Object.keys(newState).forEach((childKey) => {
                if (childKey.startsWith(key + '-')) {
                  newState[childKey] = null
                }
              })
              // 형제 메뉴 닫기
              newState[key] = null
            }
          })
        } else {
          // 루트 메뉴인 경우: 다른 모든 루트 메뉴들 닫기
          Object.keys(newState).forEach((key) => {
            if (key.startsWith('menu-') && key !== menuKey) {
              // 다른 루트 메뉴의 하위 메뉴들 먼저 닫기
              Object.keys(newState).forEach((childKey) => {
                if (childKey.startsWith(key + '-')) {
                  newState[childKey] = null
                }
              })
              // 다른 루트 메뉴 닫기
              newState[key] = null
            }
          })
        }
        
        // 새 메뉴 열기
        newState[menuKey] = event.currentTarget
        return newState
      })
    })
  }

  // 드롭다운 메뉴 닫기
  const handleMenuClose = (menuKey: string, closeChildren: boolean = true) => {
    // 기존 타임아웃 취소
    if (closeTimeoutsRef.current[menuKey]) {
      clearTimeout(closeTimeoutsRef.current[menuKey])
      delete closeTimeoutsRef.current[menuKey]
    }
    
    setAnchorEls((prev) => {
      const newState = { ...prev, [menuKey]: null }
      // 하위 메뉴도 모두 닫기 (기본값은 true이지만, 서브메뉴 간 이동 시에는 false로 설정 가능)
      if (closeChildren) {
        Object.keys(newState).forEach((key) => {
          if (key.startsWith(menuKey + '-')) {
            // 하위 메뉴의 타임아웃도 취소
            if (closeTimeoutsRef.current[key]) {
              clearTimeout(closeTimeoutsRef.current[key])
              delete closeTimeoutsRef.current[key]
            }
            newState[key] = null
          }
        })
      }
      return newState
    })
  }

  // 서브메뉴 항목 클릭 처리
  const handleMenuItemClick = (menuUrlAddr?: string, menuKey?: string) => {
    if (menuUrlAddr) {
      const fullPath = menuUrlAddr.startsWith('/') ? to(menuUrlAddr) : to(`/${menuUrlAddr}`)
      navigate(fullPath)
    }
    if (menuKey) {
      handleMenuClose(menuKey)
    }
  }

  // 재귀적으로 메뉴 항목 렌더링 (다단계 드롭다운 지원)
  const renderMenuItem = (menu: MenuRVO, parentKey: string, level: number = 0): React.ReactNode => {
    const menuKey = `${parentKey}-${menu.menuSn}`
    const children = byParent.get(menu.menuSn ?? null) ?? []
    const hasChildren = children.length > 0
    const anchorEl = anchorEls[menuKey]
    const isSubmenu = level > 0 // 서브메뉴인지 여부 (첫 번째 레벨이 아닌 경우)

    // 자식이 없는 경우 일반 메뉴 항목
    if (!hasChildren) {
      return (
        <MenuItem
          key={menuKey}
          onClick={() => handleMenuItemClick(menu.menuUrlAddr, parentKey)}
        >
          <Typography variant="body2">{menu.menuNm}</Typography>
        </MenuItem>
      )
    }

    // 자식이 있는 경우 중첩 메뉴
    // 모든 레벨에서 마우스 오버로 하위 메뉴 열림
    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      // 자식이 있으면 마우스 오버 시 열림 (모든 레벨에서 작동)
      if (hasChildren) {
        e.stopPropagation() // 이벤트 전파 방지
        
        // 같은 부모의 형제 메뉴들의 타임아웃 즉시 취소
        const parentKeyForSibling = menuKey.substring(0, menuKey.lastIndexOf('-'))
        Object.keys(closeTimeoutsRef.current).forEach((key) => {
          if (key.startsWith(parentKeyForSibling + '-') && key !== menuKey && !key.startsWith(menuKey + '-')) {
            clearTimeout(closeTimeoutsRef.current[key])
            delete closeTimeoutsRef.current[key]
            // 형제 메뉴의 하위 메뉴 타임아웃도 즉시 취소
            Object.keys(closeTimeoutsRef.current).forEach((childKey) => {
              if (childKey.startsWith(key + '-')) {
                clearTimeout(closeTimeoutsRef.current[childKey])
                delete closeTimeoutsRef.current[childKey]
              }
            })
          }
        })
        
        // 이 메뉴와 관련된 모든 타임아웃 취소
        Object.keys(closeTimeoutsRef.current).forEach((key) => {
          if (key.startsWith(menuKey) || menuKey.startsWith(key)) {
            clearTimeout(closeTimeoutsRef.current[key])
            delete closeTimeoutsRef.current[key]
          }
        })
        
        // 형제 메뉴들을 즉시 닫기 (flushSync로 즉시 반영)
        flushSync(() => {
          setAnchorEls((prev) => {
            const newState = { ...prev }
            // 같은 부모의 형제 메뉴들 닫기
            Object.keys(newState).forEach((key) => {
              if (key.startsWith(parentKeyForSibling + '-') && key !== menuKey && !key.startsWith(menuKey + '-')) {
                // 형제 메뉴의 하위 메뉴들 먼저 닫기
                Object.keys(newState).forEach((childKey) => {
                  if (childKey.startsWith(key + '-')) {
                    newState[childKey] = null
                  }
                })
                // 형제 메뉴 닫기
                newState[key] = null
              }
            })
            // 새 메뉴 열기
            newState[menuKey] = e.currentTarget
            return newState
          })
        })
      }
    }

    const handleMouseLeave = (e?: React.MouseEvent, isFromMenu: boolean = false) => {
      // 자식이 있는 메뉴만 마우스 이벤트 처리 (모든 레벨에서 작동)
      if (hasChildren) {
        // 기존 타임아웃 취소
        if (closeTimeoutsRef.current[menuKey]) {
          clearTimeout(closeTimeoutsRef.current[menuKey])
          delete closeTimeoutsRef.current[menuKey]
        }
        
        // 메뉴가 열려있지 않으면 타임아웃 설정 불필요
        if (!anchorEl) {
          return
        }
        
        // Menu 영역에서 나가는 경우가 아니면 타임아웃 설정하지 않음
        if (isFromMenu) {
          // Menu 영역에서 나가는 경우에만 타임아웃 설정
          const relatedTarget = e?.relatedTarget as HTMLElement | null
          
          // 관련 요소가 메뉴 영역 내에 있는지 확인
          const isMovingToMenuItem = relatedTarget?.closest(`[data-menu-item-key="${menuKey}"]`) !== null
          const isMovingToChild = relatedTarget?.closest(`[data-menu-key]`)?.getAttribute('data-menu-key')?.startsWith(menuKey + '-') === true
          const isMovingToParent = relatedTarget?.closest(`[data-menu-key="${parentKey}"]`) !== null
          
          if (isMovingToMenuItem || isMovingToChild || isMovingToParent) {
            // MenuItem, 하위 메뉴, 또는 부모 메뉴로 이동하는 경우 타임아웃 설정하지 않음
            return
          }
        } else {
          // MenuItem에서 마우스가 떠나는 경우
          // 하위 메뉴로 이동하는 경우가 아니면 타임아웃 설정하지 않음
          // (이미 MenuItem의 onMouseLeave에서 확인했지만, 추가 확인)
          const relatedTarget = e?.relatedTarget as HTMLElement | null
          const isMovingToChild = relatedTarget?.closest(`[data-menu-key]`)?.getAttribute('data-menu-key')?.startsWith(menuKey + '-') === true
          const isMovingToParent = relatedTarget?.closest(`[data-menu-key="${parentKey}"]`) !== null
          
          if (isMovingToChild || isMovingToParent) {
            // 하위 메뉴나 부모 메뉴로 이동하는 경우 타임아웃 설정하지 않음
            return
          }
          
          // 현재 마우스 위치 확인
          const currentElement = document.elementFromPoint(
            e?.clientX ?? 0,
            e?.clientY ?? 0
          )
          const isInsideChild = currentElement?.closest(`[data-menu-key]`)?.getAttribute('data-menu-key')?.startsWith(menuKey + '-') === true
          
          if (isInsideChild) {
            // 하위 메뉴 영역에 마우스가 있으면 타임아웃 설정하지 않음
            return
          }
          
          // MenuItem에서 마우스가 떠나고 하위 메뉴로 이동하지 않는 경우
          // 메뉴가 열려있으면 타임아웃 설정하지 않음 (메뉴 영역 내에서 마우스를 가만히 두는 경우)
          // 실제로 메뉴 영역 밖으로 나가는 경우에만 타임아웃 설정
          return // MenuItem에서 마우스가 떠나는 경우는 타임아웃 설정하지 않음
        }
        
        // 마우스가 떠날 때 약간의 지연 후 닫기 (서브메뉴로 이동할 시간 확보)
        closeTimeoutsRef.current[menuKey] = setTimeout(() => {
          // 타임아웃이 여전히 유효한지 확인 (다른 이벤트로 취소되었을 수 있음)
          if (!closeTimeoutsRef.current[menuKey]) {
            return
          }
          
          // 메뉴가 여전히 열려있는지 확인
          if (!anchorEls[menuKey]) {
            delete closeTimeoutsRef.current[menuKey]
            return
          }
          
          const menuElement = document.querySelector(`[data-menu-key="${menuKey}"]`)
          const menuItemElement = document.querySelector(`[data-menu-item-key="${menuKey}"]`)
          
          // 마우스가 메뉴 영역이나 MenuItem 영역에 있는지 확인
          const currentElement = document.elementFromPoint(
            e?.clientX ?? 0,
            e?.clientY ?? 0
          )
          
          const isInsideMenu = currentElement?.closest(`[data-menu-key="${menuKey}"]`) !== null
          const isInsideMenuItem = currentElement?.closest(`[data-menu-item-key="${menuKey}"]`) !== null
          const isInsideChild = currentElement?.closest(`[data-menu-key]`)?.getAttribute('data-menu-key')?.startsWith(menuKey + '-') === true
          const isInsideParent = currentElement?.closest(`[data-menu-key="${parentKey}"]`) !== null
          
          // 메뉴 영역, MenuItem 영역, 하위 메뉴 영역, 또는 부모 메뉴 영역에 마우스가 있으면 닫지 않음
          if (!isInsideMenu && !isInsideMenuItem && !isInsideChild && !isInsideParent) {
            handleMenuClose(menuKey)
          }
          
          delete closeTimeoutsRef.current[menuKey]
        }, 100) // 타임아웃을 100ms로 설정 (빠른 반응 속도)
      }
    }
    
    const handleSubmenuMouseEnter = (e: React.MouseEvent) => {
      // 서브메뉴 영역에 마우스가 들어오면 타임아웃 취소
      // 이 메뉴와 관련된 모든 타임아웃 취소
      Object.keys(closeTimeoutsRef.current).forEach((key) => {
        if (key.startsWith(menuKey) || menuKey.startsWith(key)) {
          clearTimeout(closeTimeoutsRef.current[key])
          delete closeTimeoutsRef.current[key]
        }
      })
    }
    
    const handleMouseEnterSubmenu = () => {
      // 서브메뉴 영역에 마우스가 들어오면 타임아웃 취소
      // 이 메뉴와 관련된 모든 타임아웃 취소
      Object.keys(closeTimeoutsRef.current).forEach((key) => {
        if (key.startsWith(menuKey) || menuKey.startsWith(key)) {
          clearTimeout(closeTimeoutsRef.current[key])
          delete closeTimeoutsRef.current[key]
        }
      })
    }

    return (
      <Box 
        key={menuKey}
        sx={{ position: 'relative' }}
      >
        <MenuItem
          data-menu-item-key={menuKey}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={(e) => {
            // MenuItem에서 마우스가 떠날 때 하위 메뉴로 이동하는 경우 확인
            const relatedTarget = e.relatedTarget as HTMLElement | null
            const isMovingToChild = relatedTarget?.closest(`[data-menu-key]`)?.getAttribute('data-menu-key')?.startsWith(menuKey + '-') === true
            const isMovingToParent = relatedTarget?.closest(`[data-menu-key="${parentKey}"]`) !== null
            
            // 하위 메뉴나 부모 메뉴로 이동하는 경우 타임아웃 설정하지 않음
            if (isMovingToChild || isMovingToParent) {
              // 타임아웃 취소
              if (closeTimeoutsRef.current[menuKey]) {
                clearTimeout(closeTimeoutsRef.current[menuKey])
                delete closeTimeoutsRef.current[menuKey]
              }
              return
            }
            
            // 하위 메뉴로 이동하지 않는 경우에만 타임아웃 설정
            // 하지만 메뉴가 열려있고 하위 메뉴 영역에 마우스가 있는 경우는 타임아웃 설정하지 않음
            if (anchorEl) {
              // 현재 마우스 위치 확인
              const currentElement = document.elementFromPoint(e.clientX, e.clientY)
              const isInsideChild = currentElement?.closest(`[data-menu-key]`)?.getAttribute('data-menu-key')?.startsWith(menuKey + '-') === true
              
              if (isInsideChild) {
                // 하위 메뉴 영역에 마우스가 있으면 타임아웃 설정하지 않음
                return
              }
            }
            
            handleMouseLeave(e, false)
          }}
          onClick={(e) => {
            // URL이 있으면 이동
            if (menu.menuUrlAddr) {
              handleMenuItemClick(menu.menuUrlAddr, parentKey)
            } else if (hasChildren) {
              // 자식이 있으면 클릭으로도 열 수 있도록 (모든 레벨에서 작동)
              e.stopPropagation()
              e.preventDefault()
              
              // 클릭 시 같은 부모의 다른 형제 메뉴들을 닫고, 클릭한 메뉴만 열기
              // 같은 부모의 형제 메뉴들의 타임아웃 취소 (즉시 실행)
              const parentKeyForSibling = menuKey.substring(0, menuKey.lastIndexOf('-'))
              Object.keys(closeTimeoutsRef.current).forEach((key) => {
                if (key.startsWith(parentKeyForSibling + '-') && key !== menuKey && !key.startsWith(menuKey + '-')) {
                  clearTimeout(closeTimeoutsRef.current[key])
                  delete closeTimeoutsRef.current[key]
                }
              })
              
              // 형제 메뉴의 하위 메뉴들의 타임아웃도 즉시 취소
              Object.keys(closeTimeoutsRef.current).forEach((key) => {
                if (key.startsWith(parentKeyForSibling + '-') && key !== menuKey && !key.startsWith(menuKey + '-')) {
                  Object.keys(closeTimeoutsRef.current).forEach((childKey) => {
                    if (childKey.startsWith(key + '-')) {
                      clearTimeout(closeTimeoutsRef.current[childKey])
                      delete closeTimeoutsRef.current[childKey]
                    }
                  })
                }
              })
              
              // 같은 부모의 형제 메뉴들 즉시 닫기 (flushSync로 즉시 반영)
              flushSync(() => {
                setAnchorEls((prev) => {
                  const newState = { ...prev }
                  // 형제 메뉴와 그 하위 메뉴들을 먼저 닫기
                  Object.keys(newState).forEach((key) => {
                    if (key.startsWith(parentKeyForSibling + '-') && key !== menuKey && !key.startsWith(menuKey + '-')) {
                      // 형제 메뉴의 하위 메뉴들 먼저 닫기
                      Object.keys(newState).forEach((childKey) => {
                        if (childKey.startsWith(key + '-')) {
                          newState[childKey] = null
                        }
                      })
                      // 형제 메뉴 닫기
                      newState[key] = null
                    }
                  })
                  
                  // 클릭한 메뉴 열기/토글
                  if (!anchorEl) {
                    newState[menuKey] = e.currentTarget
                    // 클릭한 메뉴의 하위 메뉴들은 유지 (이미 열려있을 수 있음)
                  } else {
                    // 이미 열려있으면 닫기
                    newState[menuKey] = null
                    // 하위 메뉴들도 닫기
                    Object.keys(newState).forEach((childKey) => {
                      if (childKey.startsWith(menuKey + '-')) {
                        newState[childKey] = null
                      }
                    })
                  }
                  return newState
                })
              })
            }
          }}
          // MenuItem이 클릭되어도 부모 Menu가 닫히지 않도록 처리
          onMouseDown={(e) => {
            if (hasChildren && !menu.menuUrlAddr) {
              e.preventDefault() // 기본 동작 방지
            }
          }}
          sx={{
            position: 'relative',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Typography variant="body2" sx={{ flex: 1 }}>
            {menu.menuNm}
          </Typography>
          {hasChildren && <ChevronRight fontSize="small" sx={{ ml: 1 }} />}
        </MenuItem>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={(event, reason) => {
            // 하위 메뉴가 열려있으면 부모 메뉴를 닫지 않음
            const hasOpenChild = Object.keys(anchorEls).some((key) => 
              key.startsWith(menuKey + '-') && anchorEls[key] !== null
            )
            if (!hasOpenChild) {
              handleMenuClose(menuKey)
            }
          }}
          MenuListProps={{
            'aria-labelledby': menuKey,
            onMouseEnter: handleSubmenuMouseEnter,
            onMouseLeave: (e: React.MouseEvent) => {
              // Menu 영역에서 나갈 때만 타임아웃 설정
              const relatedTarget = e.relatedTarget as HTMLElement | null
              const isMovingToMenuItem = relatedTarget?.closest(`[data-menu-item-key="${menuKey}"]`) !== null
              const isMovingToChild = relatedTarget?.closest(`[data-menu-key]`)?.getAttribute('data-menu-key')?.startsWith(menuKey + '-') === true
              const isMovingToParent = relatedTarget?.closest(`[data-menu-key="${parentKey}"]`) !== null
              
              // MenuItem, 하위 메뉴, 또는 부모 메뉴로 이동하는 경우 타임아웃 설정하지 않음
              if (isMovingToMenuItem || isMovingToChild || isMovingToParent) {
                // 타임아웃 취소
                if (closeTimeoutsRef.current[menuKey]) {
                  clearTimeout(closeTimeoutsRef.current[menuKey])
                  delete closeTimeoutsRef.current[menuKey]
                }
                return
              }
              
              handleMouseLeave(e, true)
            },
            // 서브메뉴가 제대로 작동하도록 포인터 이벤트 활성화
            sx: {
              pointerEvents: 'auto',
            },
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: isSubmenu ? 'right' : 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: isSubmenu ? 'left' : 'left',
          }}
          PaperProps={{
            'data-menu-key': menuKey,
            onMouseEnter: handleSubmenuMouseEnter,
            onMouseLeave: (e: React.MouseEvent) => {
              // Paper 영역에서 나갈 때만 타임아웃 설정
              const relatedTarget = e.relatedTarget as HTMLElement | null
              const isMovingToMenuItem = relatedTarget?.closest(`[data-menu-item-key="${menuKey}"]`) !== null
              const isMovingToChild = relatedTarget?.closest(`[data-menu-key]`)?.getAttribute('data-menu-key')?.startsWith(menuKey + '-') === true
              const isMovingToParent = relatedTarget?.closest(`[data-menu-key="${parentKey}"]`) !== null
              
              // MenuItem, 하위 메뉴, 또는 부모 메뉴로 이동하는 경우 타임아웃 설정하지 않음
              if (isMovingToMenuItem || isMovingToChild || isMovingToParent) {
                // 타임아웃 취소
                if (closeTimeoutsRef.current[menuKey]) {
                  clearTimeout(closeTimeoutsRef.current[menuKey])
                  delete closeTimeoutsRef.current[menuKey]
                }
                return
              }
              
              handleMouseLeave(e, true)
            },
            sx: {
              pointerEvents: 'auto', // 포인터 이벤트 활성화
            },
          }}
          // disableAutoFocusItem을 true로 설정하여 포커스 문제 방지
          disableAutoFocusItem
          // disableEnforceFocus를 true로 설정하여 포커스 강제 방지
          disableEnforceFocus
          // keepMounted를 true로 설정하여 메뉴가 DOM에 유지되도록 함 (중첩 메뉴 지원)
          keepMounted={true}
          sx={{
            '& .MuiPaper-root': {
              minWidth: '200px',
              pointerEvents: 'auto', // Paper는 포인터 이벤트 활성화
              // z-index를 레벨에 따라 증가시켜 중첩 메뉴가 위에 표시되도록
              zIndex: 1300 + level * 10,
              // 서브메뉴는 우측으로 계단식 배치 (레벨에 따라 오프셋 증가)
              // 레벨 1 (2단계): 0px, 레벨 2 (3단계): 8px, 레벨 3 (4단계): 16px 등으로 증가하여 겹치지 않도록 함
              ...(isSubmenu && {
                // marginLeft를 사용하여 위치 조정 (더 큰 값으로 설정하여 겹치지 않도록)
                marginLeft: `${(level - 1) * 8}px !important`,
              }),
            },
          }}
          // disablePortal을 false로 유지 (포털 사용)
          disablePortal={false}
        >
          {children.length > 0 && children.map((child) => renderMenuItem(child, menuKey, level + 1))}
        </Menu>
      </Box>
    )
  }

  // 서브메뉴 렌더링 (재귀적 다단계 지원)
  const renderSubMenu = (parentMenuSn: number, menuKey: string): React.ReactNode[] => {
    const children = byParent.get(parentMenuSn) ?? []
    // 첫 번째 서브메뉴는 level 1로 시작 (2단계 메뉴)
    return children.map((child) => renderMenuItem(child, menuKey, 1))
  }

  return (
    <>
      <SkipNavigation />
      <Box component="header" className="header">
        {/* 상단 바 */}
        <Box className="header-topbar">
          <Box className="container">
            <Box className="top-link">
              <Box className="timer_box">
                <span className="time_text">12:00</span>
                <Button 
                  size="small" 
                  className="btn_extend"
                  //onClick={handleExtendSession} // 세션 연장 함수
                >
                  시간연장
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* 로고, 유틸메뉴 */}
        <Box className="header_menu">
          <Box className="container">
            <h1>
              <Link
                to={to('/')}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img
                  src={i18nInstance.language === 'ko' ? '/img/logo.png' : '/img/logo_eng02.png'}
                  alt={`KIDS ${t('kidsName')}`}
                  style={{
                    height: 'auto',
                    maxHeight: '40px',
                    cursor: 'pointer',
                  }}
                />
              </Link>
            </h1>
            <Box className="util-menu">
              {i18nInstance.language === 'ko' && (
                <Stack direction="row" spacing={1} alignItems="center">
                  {/* <Button
                    size="small"
                    onClick={() => navigate(to('/signup'))}
                    className="btn-util signup" 
                  >
                    {t('signup')}
                  </Button> */}
                  <Button
                    size="small"
                    onClick={() => navigate(to('/signup'))}
                    className="btn-util edit-profile" 
                  >
                    {t('editProfile')}
                  </Button>
                  {/* <Button
                    size="small"
                    onClick={() => navigate(to('/expert/convert/apply'))}
                    className="btn-util user-reg"
                  >
                    {t('usrSwtReg')}
                  </Button> */}
                  {/* <Button
                    size="small"
                    onClick={() => {
                      const path = to('/login/method')
                      console.log('Header login button clicked, current lang:', lang, 'navigating to:', path)
                      navigate(path, { replace: false })
                    }}
                    className="btn-util login"
                  >
                    {t('login')}
                  </Button> */}
                  <Button
                    size="small"
                    onClick={() => {
                      const path = to('/login/method')
                      navigate(path, { replace: false })
                    }}
                    className="btn-util logout"
                  >
                    {t('logout')}
                  </Button>
                </Stack>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
        
    </>
  )
}
