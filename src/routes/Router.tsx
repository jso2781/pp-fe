import i18n from '@/i18n/i18n'
import { JSX, useEffect, useMemo, lazy, useRef } from "react";
import { Navigate, BrowserRouter, Routes, Route, useLocation, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectMenuList } from '@/features/auth/MenuThunks'
import { getSsoInfo } from '@/features/auth/AnyIdThunks'
import { redirectToSsoLoginPage } from '@/features/auth/SsoLoginPage'
import { getLangFromPathname } from './lang'
import { insertWorkAccessLog } from '@/features/log/AccessLogThunks'
import Layout from './Layout'
import BlankLayout from './BlankLayout'
import ProtectedRoute from './ProtectedRoute'
import AnyIdRoute from './AnyIdRoute'
import GlobalErrorHandler from './GlobalErrorHandler';

// ko 페이지들 (라우트 방문 시에만 로드 → 초기 번들 크기 감소)
const HomeKo = lazy(() => import('@/pages/ko/Home'))
const NotFoundKo = lazy(() => import('@/pages/ko/NotFound'))
const InternalServerErrorKo = lazy(() => import('@/pages/ko/InternalServerError'))

const CmsPageKo = lazy(() => import('@/pages/ko/cms/CmsPage'))
const CmsPageEn = lazy(() => import('@/pages/en/cms/CmsPage'))

const DurSearchRoomKo = lazy(() => import('@/pages/ko/maintask/dur/DurSearchRoom'))
const DurEftgrpDetailPopKo = lazy(() => import('@/pages/ko/maintask/dur/DurEftgrpDetailPop'))
const DurPrdctDetailPopKo = lazy(() => import('@/pages/ko/maintask/dur/DurPrdctDetailPop'))
const DurNoticeListKo = lazy(() => import('@/pages/ko/maintask/dur/DurNoticeList'))
const DurNoticeDetailKo = lazy(() => import('@/pages/ko/maintask/dur/DurNoticeDetail'))
const DurProposalKo = lazy(() => import('@/pages/ko/maintask/dur/DurProposal'))
const MyDrugInfoKo = lazy(() => import('@/pages/ko/maintask/dur/MyDrugInfo'))

const FaqNoticeKo = lazy(() => import('@/pages/ko/news/FaqNotice'))

const GeneralBoardListKo = lazy(() => import('@/pages/ko/board/GeneralBoardList'))
const GeneralBoardDetailKo = lazy(() => import('@/pages/ko/board/GeneralBoardDetail'))
const GeneralBoardListEn = lazy(() => import('@/pages/en/board/GeneralBoardList'))
const GeneralBoardDetailEn = lazy(() => import('@/pages/en/board/GeneralBoardDetail'))

const GalleryBoardListKo = lazy(() => import('@/pages/ko/board/GalleryBoardList'))
const GalleryBoardListEn = lazy(() => import('@/pages/ko/board/GalleryBoardList'))
const GalleryBoardDetailKo = lazy(() => import('@/pages/ko/board/GalleryBoardDetail'))
const GalleryBoardDetailEn = lazy(() => import('@/pages/ko/board/GalleryBoardDetail'))
const VideoBoardListKo = lazy(() => import('@/pages/ko/board/VideoBoardList'))
const VideoBoardListEn = lazy(() => import('@/pages/ko/board/VideoBoardList'))
const VideoBoardDetailKo = lazy(() => import('@/pages/ko/board/VideoBoardDetail'))
const VideoBoardDetailEn = lazy(() => import('@/pages/ko/board/VideoBoardDetail'))

const CleanCenterKo = lazy(() => import('@/pages/ko/about/ethics/CleanCenter'))
const CleanFormKo = lazy(() => import('@/pages/ko/about/ethics/CleanForm'))
const CleanDetailKo = lazy(() => import('@/pages/ko/about/ethics/CleanDetail'))
const AboutOrgKo = lazy(() => import('@/pages/ko/about/AboutOrg'))
const AboutOrgEn = lazy(() => import('@/pages/en/about/AboutOrg'))

const SignUpSelKo = lazy(() => import('@/pages/ko/auth/SignUpSel'))
const SignUpAgrTrmsKo = lazy(() => import('@/pages/ko/auth/SignUpAgrTrms'))
const LegalGuardAgrKo = lazy(() => import('@/pages/ko/auth/LegalGuardAgr'))
const CertifySelfKo = lazy(() => import('@/pages/ko/auth/CertifySelf'))
const SignUpMbrInfoKo = lazy(() => import('@/pages/ko/auth/SignUpMbrInfo'))
const SignUpCompleteKo = lazy(() => import('@/pages/ko/auth/SignUpComplete'))
const EditProfileKo = lazy(() => import('@/pages/ko/auth/EditProfile'))
const WithDrawalKo = lazy(() => import('@/pages/ko/auth/WithDrawal'))
const LoginKo = lazy(() => import('@/pages/ko/auth/Login'))
const LoginMethodKo = lazy(() => import('@/pages/ko/auth/LoginMethod'))
const PasswordConfirmKo = lazy(() => import('@/pages/ko/auth/PasswordConfirm'))
const FindIdKo = lazy(() => import('@/pages/ko/auth/FindId'))
const FindIdAuthSuccessKo = lazy(() => import('@/pages/ko/auth/FindIdAuthSuccess'))
const FindPwKo = lazy(() => import('@/pages/ko/auth/FindPw'))
const FindPwModifyKo = lazy(() => import('@/pages/ko/auth/FindPwModify'))
const ExpertCertKo = lazy(() => import('@/pages/ko/auth/ExpertCert'))
const CleanCenterCertKo = lazy(() => import('@/pages/ko/auth/CleanCenterCert'))

const IntegratedSearchKo = lazy(() => import('@/pages/ko/search/IntegratedSearch'))
const ExpertMemberApplyKo = lazy(() => import('@/pages/ko/expert/ExpertMemberApply'))
const ExpertMyWorkKo = lazy(() => import('@/pages/ko/expert/ExpertMyWork'))
const ExpertApprovalKo = lazy(() => import('@/pages/ko/expert/ExpertApproval'))
const ExpertApprovalDetailKo = lazy(() => import('@/pages/ko/expert/ExpertApprovalDetail'))
const ExpertApprovalUpdateKo = lazy(() => import('@/pages/ko/expert/ExpertApprovalUpdate'))

const MbcmtApplyKo = lazy(() => import('@/pages/ko/advice/MbcmtApply'))
const StatisticsListKo = lazy(() => import('@/pages/ko/maintask/adverse/statistics/StatisticsList'))
const StatisticsDetailKo = lazy(() => import('@/pages/ko/maintask/adverse/statistics/StatisticsDetail'))
const StatisticsCreateKo = lazy(() => import('@/pages/ko/maintask/adverse/statistics/StatisticsCreate'))

const PrivacyPolicyKo = lazy(() => import('@/pages/ko/etc/PrivacyPolicy'))
const TermsKo = lazy(() => import('@/pages/ko/etc/Terms'))
const CctvPolicyKo = lazy(() => import('@/pages/ko/etc/CctvPolicy'))
const EmailDenyKo = lazy(() => import('@/pages/ko/etc/EmailDeny'))

const HomeEn = lazy(() => import('@/pages/en/Home'))
const LoginEn = lazy(() => import('@/pages/en/auth/Login'))

const ScreensKo = lazy(() => import('@/pages/screens/ko/Screens'))
const ScreenViewerKo = lazy(() => import('@/pages/screens/ko/ScreenViewer'))

const ScreensEn = lazy(() => import('@/pages/screens/en/Screens'))
const ScreenViewerEn = lazy(() => import('@/pages/screens/en/ScreenViewer'))

const BoardListKo = lazy(() => import('@/pages/ko/cdm/board/BoardList'))
const BoardDetailKo = lazy(() => import('@/pages/ko/cdm/board/BoardDetail'))
const CdmFaqListKo = lazy(() => import('@/pages/ko/cdm/faq/FaqList'))
const CdmQnaListKo = lazy(() => import('@/pages/ko/cdm/qna/QnaList'))
const CdmQnaDetailKo = lazy(() => import('@/pages/ko/cdm/qna/QnaDetail'))
const CdmQnaWriteKo = lazy(() => import('@/pages/ko/cdm/qna/QnaWrite'))
const CdmTaskproposalListKo = lazy(() => import('@/pages/ko/cdm/taskproposal/TaskproposalList'))
const CdmTaskproposalDetailKo = lazy(() => import('@/pages/ko/cdm/taskproposal/TaskproposalDetail'))
const CdmTaskproposalWriteKo = lazy(() => import('@/pages/ko/cdm/taskproposal/TaskproposalWrite'))

import { normalizeLang, FALLBACK_LANG, detectBrowserLang } from "./lang";
import { AuthProvider } from '@/contexts/AuthContext';
import { DialogProvider } from '@/contexts/DialogContext';
import ExpertLayout from './ExpertLayout';
import EngLayout from './EngLayout';
import FallbackRoute from './FallbackRoute';
import { MenuListPVO, MenuRVO } from '@/features/auth/MenuTypes';
import { setLastViewedMenuSn } from '@/features/ui/uiSlice';

type LangElementProps = {
  byLang: Record<string, JSX.Element>;
};

function LangElement({ byLang }: LangElementProps) {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const normalized = normalizeLang(lang) ?? FALLBACK_LANG;

  // 디버깅: 어떤 컴포넌트가 렌더링되는지 확인
  if (location.pathname.includes('/auth/Login')) {
    console.log('LangElement - pathname:', location.pathname, 'lang:', normalized, 'byLang keys:', Object.keys(byLang));
  }

  return byLang[normalized] ?? byLang[FALLBACK_LANG];
}

/**
 * 브라우져 주소창에 표시된 URL pathname이 바뀔 때마다 i18n 언어를 동기화한다.
 *
 * BrowserRouter 내부에 배치해야 브라우져 주소창에 표시된 URL pathname이 바뀔 때마다
 * i18n 언어를 동기화할 수 있다. 동기화하지 않으면 브라우져 이전, 다음 버튼 클릭할 때마다 언어가 변경되지 않는다.
 * 그래서, 영문 메뉴 화면인데 한국어로 표기되는 문제가 발생함.
 *
 */
function LangSync() {
  const location = useLocation();

  useEffect(() => {
    const lang = getLangFromPathname(location.pathname);
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [location.pathname]);

  return null;
}

/** pathname이 /pp/ko 또는 /pp/en 일 때 getSsoInfo 1회 호출 (LangGuard는 라우트에 미사용이므로 여기서 처리) */
function SsoInfoSync() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const first = location.pathname.split('/')[1];
    const lang = normalizeLang(first);
    if (lang === 'ko' || lang === 'en') {
      dispatch(getSsoInfo());
    }
  }, [location.pathname, dispatch]);
  return null;
}

/** 현재 pathname이 메뉴 URL에 속하는지(동일 또는 / 하위). Login vs LoginMethod 혼동 방지 */
function isPathUnderMenuUrl(pathname: string, menuUrlAddr: string): boolean {
  const addr = menuUrlAddr.trim()
  if (!addr) return false
  if (pathname === addr) return true
  return pathname.startsWith(`${addr}/`)
}

/** 일치하는 메뉴가 여러 개면 menuUrlAddr가 가장 긴(가장 구체적인) 항목 선택 */
function findMenuRowForPath(rows: MenuRVO[], pathname: string): MenuRVO | undefined {
  const candidates = rows.filter(
    (m) => m.menuUrlAddr && isPathUnderMenuUrl(pathname, m.menuUrlAddr),
  );
  if (candidates.length === 0) return undefined;

  // 같은 pathname에 여러 행이 맞을 수 있으면(예: 상위 /foo와 하위 /foo/bar), menuUrlAddr 길이가 긴 것(더 구체적인 것)을 선택
  return candidates.reduce((best, m) =>
    (m.menuUrlAddr ?? '').length > (best.menuUrlAddr ?? '').length ? m : best,
  );
}

/** 업무별 접속 이력 적재 */
function RouteWorkAccessLogger() {
  const location = useLocation()
  const dispatch = useAppDispatch()
  /** 동일 URL( pathname + search )에 대해 insertWorkAccessLog를 이미 1회 호출했으면 재호출하지 않음 */
  const lastInsertedUrlRef = useRef<string>('')

  const auth = useAppSelector((s) => s.auth);

  // 사용자기본메뉴, 관리자기본메뉴도 포함(menuTypeCd=Z)
  const oriMenuList = useAppSelector((s) => s.menu.oriList);

  // 직전에 진입했던 화면의 메뉴 일련번호. 현재 진입한 화면의 메뉴 일련번호가 없으면 이 값을 재사용한다.
  const lastViewedMenuSn = useAppSelector((s) => s.ui.lastViewedMenuSn);

  const menuUrl = location.pathname;

  const currentMenu = useMemo(() => {
    const rows = oriMenuList ?? []
    return findMenuRowForPath(rows, menuUrl)
  }, [oriMenuList, menuUrl])

  const prvcInclYn = currentMenu?.prvcInclYn ?? '';

  useEffect(() => {
    const url = `${location.pathname}${location.search}`
    // 현재 URL에 매칭된 메뉴 SN 우선, 없으면 직전 화면에서 저장한 SN으로 menuId 확보
    const fromMenu = currentMenu?.menuSn
    const fromLast = lastViewedMenuSn
    const resolvedMenuSn = fromMenu != null && !Number.isNaN(Number(fromMenu)) ? Number(fromMenu) : (fromLast != null && !Number.isNaN(Number(fromLast)) ? Number(fromLast) : null);

    if(resolvedMenuSn == null || Number.isNaN(resolvedMenuSn)){
      return;
    }

    // 동일 URL에 대해 insertWorkAccessLog는 1회만 (oriMenuList 지연 로딩으로 effect가 다시 돌 때는 아직 미기록이면 기록)
    if(lastInsertedUrlRef.current === url){
      return;
    }

    lastInsertedUrlRef.current = url;

    dispatch(insertWorkAccessLog({
      menuId: String(resolvedMenuSn),
      urlAddr: location.pathname,
      taskSeCdNo: 'PP',
      taskSeCd: 'PP',
      acsrNm: '',
      rqstrId: auth?.userInfo?.mbrNo ?? '',
      etcMemoCn: '',
      prvcInclYn: prvcInclYn,
      flfmtTaskCd: '1',
      rgtrId: auth?.userInfo?.mbrNo ?? '',
      mdfrId: auth?.userInfo?.mbrNo ?? '',
      lgnSeCd: auth?.lgnSeCd ?? '',
      sessLogSn: auth?.sessLogSn ?? 0
    }));

    /*
     * 현재 진입한 메뉴 일련번호와 직전에 진입했던 메뉴 일련번호가 서로 다르면 직전에 진입했던 메뉴 일련번호를 기록해서
     * 다음 번 매뉴화면 진입 시 메뉴 일련번호가 없는 화면에 진입하더라도,
     * 직전에 진입했던 메뉴 일련번호를 재사용하여 업무별 접속 이력을 적재할 수 있도록 한다.
     */
    if(currentMenu?.menuSn != null && Number(currentMenu.menuSn) !== Number(lastViewedMenuSn)){
      dispatch(setLastViewedMenuSn(currentMenu.menuSn));
    }
  }, [
    location.pathname,
    location.search,
    dispatch,
    lastViewedMenuSn,
    currentMenu,
    oriMenuList,
    auth?.userInfo?.encptMbrFlnm,
    auth?.userInfo?.mbrNo,
    auth?.lgnSeCd,
    prvcInclYn,
  ]);

  return null;
}

/** 이 경로로 진입 시 SSO 로그인 페이지로 리다이렉트 */
const SSO_REDIRECT_AUTH_PATHS = ['/auth/LoginMethod', '/auth/CertifySelf', '/auth/FindId', '/auth/FindPw', '/advice/MbcmtApply'];

const LangGuard = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const params = useParams<{ lang?: string }>();
  const dispatch = useAppDispatch();
  const ssoInfo = useAppSelector((s) => s.anyId.ssoInfo);
  const prevUrlLangRef = useRef<string | null>(null);

  // 1) URL에 lang가 “있는지” (/:lang/* 라우트로 들어온 경우)
  const urlLang = useMemo(() => normalizeLang(params.lang), [params.lang]);

  // 2) URL에 lang가 없는 경우를 감지하기 위해 pathname 직접 파싱
  const { needsRedirect, redirectTo } = useMemo(() => {
    const pathname = location.pathname; // 예: "/home", "/pp/en/home", "/xx/home"
    const segs = pathname.split("/");   // ["", "home"] or ["", "en", "home"]

    const first = segs[1]; // 첫 segment
    const firstAsLang = normalizeLang(first);

    // (A) 루트("/" 또는 "")는 리다이렉트하지 않고 URL 유지
    const isRoot = pathname === "/" || pathname === "";
    if (isRoot) {
      return { needsRedirect: false, redirectTo: "" };
    }

    // (A') lang이 아예 없다 (루트 제외): "/home" "/settings" 등
    if (!first || firstAsLang === null) {
      const targetLang = detectBrowserLang();
      const rest = pathname.startsWith("/") ? pathname : `/${pathname}`;
      return { needsRedirect: true, redirectTo: `/${targetLang}${rest}` };
    }

    // (B) 첫 segment가 지원하지 않는 lang처럼 생김: "/xx/home"
    // - 이 경우를 "lang이 잘못됨"으로 보고 브라우저/폴백으로 교체
    // - 단, "xx"가 실제 페이지 세그먼트일 수도 있잖아? 라고 걱정되면
    //   '지원 언어 패턴(2글자)' 같은 조건을 더 붙여도 됨.
    if (first && normalizeLang(first) === null && /^[a-zA-Z]{2}(-[a-zA-Z]{2})?$/.test(first)) {
      const targetLang = detectBrowserLang();
      segs[1] = targetLang;
      return { needsRedirect: true, redirectTo: segs.join("/") };
    }

    return { needsRedirect: false, redirectTo: "" };
  }, [location.pathname]);

  // 3) URL에 유효한 lang가 있으면 i18n과 동기화, 언어 변경 시 메뉴 재조회
  useEffect(() => {
    // pathname에서 직접 언어 추출 (params.lang보다 확실함)
    const pathnameLang = normalizeLang(location.pathname.split('/')[1]);
    const currentLang = pathnameLang || urlLang;

    if (!currentLang) return;

    const prevLang = prevUrlLangRef.current;

    // i18n과 동기화
    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }

    // 첫 main 진입 또는 한국어/English 전환 시 SSO 정보 조회 (reducer에서 sessionStorage 'sso' 저장)
    if (currentLang === 'ko' || currentLang === 'en') {
      dispatch(getSsoInfo());
    }
    // 이전 언어가 ko 또는 en이고, 언어가 변경되면 메뉴 재조회
    if (prevLang && (prevLang === 'ko' || prevLang === 'en') && prevLang !== currentLang) {
      console.log(`LangGuard: 언어 변경 감지 - ${prevLang} → ${currentLang}, 메뉴 재조회`);
      dispatch(selectMenuList({ langSeCd: currentLang === 'ko' ? 'KOR' : 'ENG' } as MenuListPVO));
    }

    // 현재 언어를 이전 값으로 저장
    prevUrlLangRef.current = currentLang;
  }, [urlLang, location.pathname, dispatch]);

  // /pp/:lang/auth/LoginMethod, CertifySelf, FindId, FindPw 진입 시 SSO 로그인 페이지로 리다이렉트
  useEffect(() => {
    const pathname = location.pathname;
    const shouldRedirect = SSO_REDIRECT_AUTH_PATHS.some((p) => pathname.includes(p));
    if (shouldRedirect) {
      const agencyContextPath = ssoInfo?.agencyContextPath ?? '';
      redirectToSsoLoginPage(agencyContextPath);
    }
  }, [location.pathname, ssoInfo?.agencyContextPath]);

  if (needsRedirect) {
    // querystring, hash 유지
    return <Navigate to={`${redirectTo}${location.search}${location.hash}`} replace />;
  }

  // 개선: params.lang가 있는데 지원 lang가 아니면
  // 1) "dur" 같은 일반 세그먼트를 lang로 오해한 경우 => lang를 "앞에 붙여서" 보정
  // 2) 진짜 "xx" 같은 잘못된 lang(2글자 패턴) => 기존처럼 교체
  if (params.lang && !urlLang) {
    const first = params.lang;

    // 진짜 lang처럼 보이는(2글자) 잘못된 값이면 교체
    if (/^[a-zA-Z]{2}(-[a-zA-Z]{2})?$/.test(first)) {
      const segs = location.pathname.split("/");
      segs[1] = FALLBACK_LANG;
      const fixed = segs.join("/");
      return <Navigate to={`${fixed}${location.search}${location.hash}`} replace />;
    }

    // 그 외는 "lang 누락"으로 보고 앞에 추가 - ex) /dur/proposal → /{targetLang}/dur/proposal 로 정확히 보정
    const targetLang = detectBrowserLang();
    const fixed = `/${targetLang}${location.pathname}`;
    const segs = location.pathname.split("/");
    return <Navigate to={`${fixed}${location.search}${location.hash}`} replace />;
  }

  return children;
};

export default function Router() {
  return (
    <AuthProvider>
      <DialogProvider>
        <BrowserRouter>
          <GlobalErrorHandler>
            <LangSync />
            <SsoInfoSync />
            <RouteWorkAccessLogger />
            <Routes>

              {/* 팝업 전용: Header/Footer 없이 본문만 표시 */}
              <Route element={<BlankLayout />}>
                <Route path="/pp/:lang/maintask/dur/DurEftgrpDetailPop" element={<LangElement byLang={{ ko: <DurEftgrpDetailPopKo />, en: <DurEftgrpDetailPopKo /> }} />} />
                <Route path="/pp/:lang/maintask/dur/DurPrdctDetailPop" element={<LangElement byLang={{ ko: <DurPrdctDetailPopKo />, en: <DurPrdctDetailPopKo /> }} />} />
              </Route>

              {/* 국문 사용자 메뉴에서 사용할 화면 레이아웃 */}
              <Route element={<Layout />}>
                <Route path="/" element={<HomeKo />} />
                {/* 루트(/, '') URL 유지, 한국어 홈 콘텐츠 표시 (자동 리다이렉트 없음) */}
                <Route path="/pp" element={<HomeKo />} />

                <Route path="/pp/ko" element={<HomeKo />} />
                <Route path="/pp/ko/" element={<HomeKo />} />

                {/* 국문 cms 화면 공용 템플릿 경로(콘텐츠 내용 표기) */}
                <Route path="/pp/ko/cms/CmsPage/:contsSn" element={<CmsPageKo />} />

                {/* maintask(주요업무) */}
                <Route path="/pp/:lang/maintask/dur/DurSearchRoom" element={<LangElement byLang={{ ko: <DurSearchRoomKo />, en: <DurSearchRoomKo /> }} />} />
                <Route path="/pp/:lang/maintask/dur/DurNoticeList/:bbsId" element={<LangElement byLang={{ ko: <DurNoticeListKo />, en: <DurNoticeListKo /> }} />} />
                <Route path="/pp/:lang/maintask/dur/DurNoticeList/:bbsId/:pstSn" element={<LangElement byLang={{ ko: <DurNoticeDetailKo />, en: <DurNoticeDetailKo /> }} />} />
                <Route path="/pp/:lang/maintask/dur/DurProposal" element={<LangElement byLang={{ ko: <DurProposalKo />, en: <DurProposalKo /> }} />} />
                <Route path="/pp/:lang/maintask/dur/MyDrugInfo" element={<LangElement byLang={{ ko: <MyDrugInfoKo />, en: <MyDrugInfoKo /> }} />} />

                {/* open(정보공개) */}

                {/* news(기관소식) */}
                <Route path="/pp/:lang/news/FaqNotice" element={<LangElement byLang={{ ko: <FaqNoticeKo />, en: <FaqNoticeKo /> }} />} />

                {/* 유형별 게시판 (공통) */}
                <Route path="/pp/ko/board/general/:bbsId" element={<GeneralBoardListKo /> } />
                <Route path="/pp/ko/board/general/:bbsId/:pstSn" element={<GeneralBoardDetailKo /> } />
                <Route path="/pp/ko/board/gallery/:bbsId" element={<GalleryBoardListKo /> } />
                <Route path="/pp/ko/board/gallery/:bbsId/:pstSn" element={<GalleryBoardDetailKo /> } />
                <Route path="/pp/ko/board/video/:bbsId" element={<VideoBoardListKo /> } />
                <Route path="/pp/ko/board/video/:bbsId/:pstSn" element={<VideoBoardDetailKo /> } />

                {/* about(기관소개) */}
                <Route path="/pp/:lang/about/AboutOrg" element={<LangElement byLang={{ ko: <AboutOrgKo />, en: <AboutOrgEn /> }} />} />
                <Route path="/pp/:lang/about/ethics/CleanCenter" element={<LangElement byLang={{ ko: <CleanCenterKo />, en: <CleanCenterKo /> }} />} />
                <Route path="/pp/:lang/about/ethics/CleanForm" element={<LangElement byLang={{ ko: <ProtectedRoute><CleanFormKo /></ProtectedRoute>, en: <ProtectedRoute><CleanFormKo /></ProtectedRoute> }} />} />
                <Route path="/pp/:lang/about/ethics/CleanCenter/:dclrSn" element={<LangElement byLang={{ ko: <CleanDetailKo />, en: <CleanDetailKo /> }} />} />

                {/* auth */}
                <Route path="/pp/:lang/auth/LoginMethod" element={<LangElement byLang={{ ko: <LoginMethodKo />, en: <LoginMethodKo /> }} />} />
                <Route path="/pp/:lang/auth/Login" element={<LangElement byLang={{ ko: <LoginKo />, en: <LoginEn /> }} />} />
                <Route path="/pp/:lang/auth/SignUpSel" element={<LangElement byLang={{ ko: <SignUpSelKo />, en: <SignUpSelKo /> }} />} />
                <Route path="/pp/:lang/auth/GeneralSignUpAgrTrms" element={<LangElement byLang={{ ko: <SignUpAgrTrmsKo />, en: <SignUpAgrTrmsKo /> }} />} />
                <Route path="/pp/:lang/auth/JuniorSignUpAgrTrms" element={<LangElement byLang={{ ko: <SignUpAgrTrmsKo />, en: <SignUpAgrTrmsKo /> }} />} />
                <Route path="/pp/:lang/auth/LegalGuardAgr" element={<LangElement byLang={{ ko: <LegalGuardAgrKo />, en: <LegalGuardAgrKo /> }} />} />
                <Route path="/pp/:lang/auth/CertifySelf" element={<LangElement byLang={{ ko: <CertifySelfKo />, en: <CertifySelfKo /> }} />} />
                <Route path="/pp/:lang/auth/SignUpMbrInfo" element={<LangElement byLang={{ ko: <SignUpMbrInfoKo />, en: <SignUpMbrInfoKo /> }} />} />
                <Route path="/pp/:lang/auth/SignUpComplete" element={<LangElement byLang={{ ko: <SignUpCompleteKo />, en: <SignUpCompleteKo /> }} />} />
                <Route path="/pp/:lang/auth/PasswordConfirm" element={<LangElement byLang={{ ko: <ProtectedRoute><PasswordConfirmKo /></ProtectedRoute>, en: <ProtectedRoute><PasswordConfirmKo /></ProtectedRoute> }} />} />
                <Route path="/pp/:lang/auth/EditProfile" element={<LangElement byLang={{ ko: <ProtectedRoute><EditProfileKo /></ProtectedRoute>, en: <ProtectedRoute><EditProfileKo /></ProtectedRoute> }} />} />
                <Route path="/pp/:lang/auth/WithDrawal" element={<LangElement byLang={{ ko: <ProtectedRoute><WithDrawalKo /></ProtectedRoute>, en: <ProtectedRoute><WithDrawalKo /></ProtectedRoute> }} />} />
                <Route path="/pp/:lang/auth/FindId" element={<LangElement byLang={{ ko: <FindIdKo />, en: <FindIdKo /> }} />} />
                <Route path="/pp/:lang/auth/FindIdAuthSuccess" element={<LangElement byLang={{ ko: <FindIdAuthSuccessKo />, en: <FindIdAuthSuccessKo /> }} />} />
                <Route path="/pp/:lang/auth/FindPw" element={<LangElement byLang={{ ko: <FindPwKo />, en: <FindPwKo /> }} />} />
                <Route path="/pp/:lang/auth/FindPwModify" element={<LangElement byLang={{ ko: <FindPwModifyKo />, en: <FindPwModifyKo /> }} />} />
                <Route path="/pp/:lang/auth/ExpertCert" element={<LangElement byLang={{ ko: <ExpertCertKo />, en: <ExpertCertKo /> }} />} />
                <Route path="/pp/:lang/auth/CleanCenterCert" element={<LangElement byLang={{ ko: <CleanCenterCertKo />, en: <CleanCenterCertKo /> }} />} />

                {/* IntegratedSearch(통합검색) */}
                <Route path="/pp/:lang/search/IntegratedSearch" element={<LangElement byLang={{ ko: <IntegratedSearchKo />, en: <IntegratedSearchKo /> }} />} />

                {/* expert */}
                <Route path="/pp/:lang/expert/ExpertMemberApply" element={<LangElement byLang={{ ko: <ProtectedRoute><ExpertMemberApplyKo /></ProtectedRoute>, en: <ProtectedRoute><ExpertMemberApplyKo /></ProtectedRoute> }} />} />

                {/* etc */}
                <Route path="/pp/:lang/etc/Terms" element={<LangElement byLang={{ ko: <TermsKo />, en: <TermsKo /> }} />} />
                <Route path="/pp/:lang/etc/PrivacyPolicy" element={<LangElement byLang={{ ko: <PrivacyPolicyKo />, en: <PrivacyPolicyKo /> }} />} />
                <Route path="/pp/:lang/etc/CctvPolicy" element={<LangElement byLang={{ ko: <CctvPolicyKo />, en: <CctvPolicyKo /> }} />} />
                <Route path="/pp/:lang/etc/EmailDeny" element={<LangElement byLang={{ ko: <EmailDenyKo />, en: <EmailDenyKo /> }} />} />

                {/* 자문위원 관련 화면advice */}
                <Route path="/pp/:lang/advice/MbcmtApply" element={<LangElement byLang={{ ko: <ProtectedRoute><MbcmtApplyKo /></ProtectedRoute>, en: <ProtectedRoute><MbcmtApplyKo /></ProtectedRoute> }} />} />
                {/* 이상사례통계 관련 화면advice */}
                <Route path="/pp/:lang/adverse/statistics/StatisticsList" element={<LangElement byLang={{ ko: <StatisticsListKo />, en: <StatisticsListKo /> }} />} />
                <Route path="/pp/:lang/adverse/statistics/StatisticsDetail/:id" element={<LangElement byLang={{ ko: <StatisticsDetailKo />, en: <StatisticsDetailKo /> }} />} />
                <Route path="/pp/:lang/adverse/statistics/StatisticsCreate" element={<LangElement byLang={{ ko: <StatisticsCreateKo />, en: <StatisticsCreateKo /> }} />} />

                {/* 국문 퍼블리싱 템플릿 화면들 */}
                {/* <Route path="/pp/ko/screens" element={<ScreensKo />} />
                <Route path="/pp/ko/screens/:screenId" element={<ScreenViewerKo />} /> */}

                {/* lang 포함 NotFound - 반드시 가장 마지막에 배치 (와일드카드는 모든 경로를 매칭하므로) */}
                <Route path="/pp/:lang/InternalServerError" element={<LangElement byLang={{ ko: <InternalServerErrorKo />, en: <InternalServerErrorKo /> }} />} />
                <Route path="/pp/:lang/NotFound" element={<LangElement byLang={{ ko: <NotFoundKo />, en: <NotFoundKo /> }} />} />
                
                {/* cdm(CDM 정보) */}
                <Route path="/pp/:lang/cdm/board/:boardType" element={<LangElement byLang={{ ko: <BoardListKo />, en: <BoardListKo /> }} />} />
                <Route path="/pp/:lang/cdm/board/:boardType/detail/:pstSn" element={<LangElement byLang={{ ko: <BoardDetailKo />, en: <BoardDetailKo /> }} />} />
                <Route path="/pp/:lang/cdm/faq" element={<LangElement byLang={{ ko: <CdmFaqListKo />, en: <CdmFaqListKo /> }} />} />
                <Route path="/pp/:lang/cdm/qna" element={<LangElement byLang={{ ko: <CdmQnaListKo />, en: <CdmQnaListKo /> }} />} />
                <Route path="/pp/:lang/cdm/qna/member/qnaDetail/:qstnSn" element={<LangElement byLang={{ ko: <CdmQnaDetailKo />, en: <CdmQnaDetailKo /> }} />} />
                <Route path="/pp/:lang/cdm/qna/member/qnaWrite" element={<LangElement byLang={{ ko: <CdmQnaWriteKo />, en: <CdmQnaWriteKo /> }} />} />
                <Route path="/pp/:lang/cdm/qna/member/qnaWrite/:qstnSn" element={<LangElement byLang={{ ko: <CdmQnaWriteKo />, en: <CdmQnaWriteKo /> }} />} />
                <Route path="/pp/:lang/cdm/taskproposal" element={<LangElement byLang={{ ko: <CdmTaskproposalListKo />, en: <CdmTaskproposalListKo /> }} />} />
                <Route path="/pp/:lang/cdm/taskproposal/member/taskproposalDetail/:asmtPrpSn" element={<LangElement byLang={{ ko: <CdmTaskproposalDetailKo />, en: <CdmTaskproposalDetailKo /> }} />} />
                <Route path="/pp/:lang/cdm/taskproposal/member/taskproposalWrite" element={<LangElement byLang={{ ko: <CdmTaskproposalWriteKo />, en: <CdmTaskproposalWriteKo /> }} />} />
                <Route path="/pp/:lang/cdm/taskproposal/member/taskproposalWrite/:asmtPrpSn" element={<LangElement byLang={{ ko: <CdmTaskproposalWriteKo />, en: <CdmTaskproposalWriteKo /> }} />} />

              </Route>

              {/* 전문가 메뉴에서 사용할 화면 레이아웃 */}
              <Route element={<ExpertLayout />}>
                {/* 전문가 메뉴- 내 업무 */}
                <Route path="/pp/:lang/expert/ExpertMyWork" element={<LangElement byLang={{ ko: <AnyIdRoute><ExpertMyWorkKo /></AnyIdRoute>, en: <AnyIdRoute><ExpertMyWorkKo /></AnyIdRoute> }} />} />
                <Route path="/pp/:lang/expert/ExpertApproval" element={<LangElement byLang={{ ko: <AnyIdRoute><ExpertApprovalKo /></AnyIdRoute>, en: <AnyIdRoute><ExpertApprovalKo /></AnyIdRoute> }} />} />
                <Route path="/pp/:lang/expert/ExpertApproval/:exprtTaskSn" element={<LangElement byLang={{ ko: <AnyIdRoute><ExpertApprovalDetailKo /></AnyIdRoute>, en: <AnyIdRoute><ExpertApprovalDetailKo /></AnyIdRoute> }} />} />
                <Route path="/pp/:lang/expert/ExpertApprovalUpdate/:exprtTaskSn" element={<LangElement byLang={{ ko: <AnyIdRoute><ExpertApprovalUpdateKo /></AnyIdRoute>, en: <AnyIdRoute><ExpertApprovalUpdateKo /></AnyIdRoute> }} />} />
              </Route>

              {/* 영문 사용자 메뉴에서 사용할 화면 레이아웃 */}
              <Route element={<EngLayout />}>
                {/* 영문 퍼블리싱 템플릿 화면들 */}
                <Route path="/pp/en/screens" element={<ScreensEn />} />
                <Route path="/pp/en/screens/:screenId" element={<ScreenViewerEn />} />

                {/* 유형별 게시판 (공통) */}
                <Route path="/pp/en/board/general/:bbsId" element={<GeneralBoardListEn />} />
                <Route path="/pp/en/board/general/:bbsId/:pstSn" element={<GeneralBoardDetailEn /> } />
                <Route path="/pp/en/board/gallery/:bbsId" element={<GalleryBoardListEn /> } />
                <Route path="/pp/en/board/gallery/:bbsId/:pstSn" element={<GalleryBoardDetailEn /> } />
                <Route path="/pp/en/board/video/:bbsId" element={<VideoBoardListEn /> } />
                <Route path="/pp/en/board/video/:bbsId/:pstSn" element={<VideoBoardDetailEn /> } />

                {/* 영문 cms 화면 공용 템플릿 경로(콘텐츠 내용 표기) */}
                <Route path="/pp/en/cms/CmsPage/:contsSn" element={<CmsPageEn />} />

                <Route path="/pp/en" element={<HomeEn />} />
              </Route>

              <Route path="*" element={<FallbackRoute />} />
            </Routes>
          </GlobalErrorHandler>
        </BrowserRouter>
      </DialogProvider>
    </AuthProvider>
  )
}

