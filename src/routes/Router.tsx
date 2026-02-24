import i18n from '@/i18n/i18n'
import { JSX, useEffect, useMemo, lazy, useRef } from "react";
import { Navigate, BrowserRouter, Routes, Route, useLocation, useParams } from 'react-router-dom'
import { useAppDispatch } from '@/store/hooks'
import { selectMenuList } from '@/features/auth/MenuThunks'
import Layout from './Layout'
import BlankLayout from './BlankLayout'
import ProtectedRoute from './ProtectedRoute'
import GlobalErrorHandler from './GlobalErrorHandler';

// ko 페이지들 (라우트 방문 시에만 로드 → 초기 번들 크기 감소)
const HomeKo = lazy(() => import('@/pages/ko/Home'))
const NotFoundKo = lazy(() => import('@/pages/ko/NotFound'))
const InternalServerErrorKo = lazy(() => import('@/pages/ko/InternalServerError'))

const CmsPageKo = lazy(() => import('@/pages/ko/cms/CmsPage'))

const DurSearchRoomKo = lazy(() => import('@/pages/ko/maintask/dur/DurSearchRoom'))
const DurEftgrpDetailPopKo = lazy(() => import('@/pages/ko/maintask/dur/DurEftgrpDetailPop'))
const DurPrdctDetailPopKo = lazy(() => import('@/pages/ko/maintask/dur/DurPrdctDetailPop'))
const DurNoticeListKo = lazy(() => import('@/pages/ko/maintask/dur/DurNoticeList'))
const DurNoticeDetailKo = lazy(() => import('@/pages/ko/maintask/dur/DurNoticeDetail'))
const ProposalKo = lazy(() => import('@/pages/ko/maintask/dur/Proposal'))
const MyDrugInfoKo = lazy(() => import('@/pages/ko/maintask/dur/MyDrugInfo'))

const FaqNoticeKo = lazy(() => import('@/pages/ko/news/FaqNotice'))

const GeneralBoardListKo = lazy(() => import('@/pages/ko/board/GeneralBoardList'))
const GeneralBoardDetailKo = lazy(() => import('@/pages/ko/board/GeneralBoardDetail'))
const GalleryBoardListKo = lazy(() => import('@/pages/ko/board/GalleryBoardList'))
const GalleryBoardDetailKo = lazy(() => import('@/pages/ko/board/GalleryBoardDetail'))
const VideoBoardListKo = lazy(() => import('@/pages/ko/board/VideoBoardList'))
const VideoBoardDetailKo = lazy(() => import('@/pages/ko/board/VideoBoardDetail'))

const CleanCenterKo = lazy(() => import('@/pages/ko/about/ethics/CleanCenter'))
const CleanFormKo = lazy(() => import('@/pages/ko/about/ethics/CleanForm'))
const CleanDetailKo = lazy(() => import('@/pages/ko/about/ethics/CleanDetail'))

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

const IntegratedSearchKo = lazy(() => import('@/pages/ko/search/IntegratedSearch'))
const ExpertMemberApplyKo = lazy(() => import('@/pages/ko/expert/ExpertMemberApply'))
const ExpertMyWorkKo = lazy(() => import('@/pages/ko/expert/ExpertMyWork'))
const ExpertApprovalKo = lazy(() => import('@/pages/ko/expert/ExpertApproval'))
const ExpertApprovalDetailKo = lazy(() => import('@/pages/ko/expert/ExpertApprovalDetail'))
const ExpertApprovalUpdateKo = lazy(() => import('@/pages/ko/expert/ExpertApprovalUpdate'))

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

import { normalizeLang, FALLBACK_LANG, detectBrowserLang } from "./lang";
import { AuthProvider } from '@/contexts/AuthContext';
import { DialogProvider } from '@/contexts/DialogContext';
import ExpertLayout from './ExpertLayout';
import EngLayout from './EngLayout';

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

const LangGuard = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const params = useParams<{ lang?: string }>();
  const dispatch = useAppDispatch();
  const prevUrlLangRef = useRef<string | null>(null);

  // 1) URL에 lang가 “있는지” (/:lang/* 라우트로 들어온 경우)
  const urlLang = useMemo(() => normalizeLang(params.lang), [params.lang]);

  // 2) URL에 lang가 없는 경우를 감지하기 위해 pathname 직접 파싱
  const { needsRedirect, redirectTo } = useMemo(() => {
    const pathname = location.pathname; // 예: "/home", "/en/home", "/xx/home"
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
    
    // 이전 언어가 ko 또는 en이고, 언어가 변경되면 메뉴 재조회
    if (prevLang && (prevLang === 'ko' || prevLang === 'en') && prevLang !== currentLang) {
      console.log(`LangGuard: 언어 변경 감지 - ${prevLang} → ${currentLang}, 메뉴 재조회`);
      dispatch(selectMenuList({ langSeCd: currentLang }));
    }
    
    // 현재 언어를 이전 값으로 저장
    prevUrlLangRef.current = currentLang;
  }, [urlLang, location.pathname, dispatch]);

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
            <Routes>

              {/* 팝업 전용: Header/Footer 없이 본문만 표시 */}
              <Route element={<BlankLayout />}>
                <Route path="/pp/:lang/maintask/dur/DurEftgrpDetailPop" element={<LangElement byLang={{ ko: <DurEftgrpDetailPopKo />, en: <DurEftgrpDetailPopKo /> }} />} />
                <Route path="/pp/:lang/maintask/dur/DurPrdctDetailPop" element={<LangElement byLang={{ ko: <DurPrdctDetailPopKo />, en: <DurPrdctDetailPopKo /> }} />} />
              </Route>

              {/* 일반사용자 메뉴에서 사용할 화면 레이아웃 */}
              <Route element={<Layout />}>
                <Route path="/" element={<HomeKo />} />
                {/* 루트(/, '') URL 유지, 한국어 홈 콘텐츠 표시 (자동 리다이렉트 없음) */}
                <Route path="/pp" element={<HomeKo />} />

                <Route path="/pp/ko" element={<HomeKo />} />
                <Route path="/pp/ko/" element={<HomeKo />} />

                {/* cms 화면 공용 템플릿 경로(콘텐츠 내용 표기) */}
                <Route path="/pp/:lang/cms/CmsPage/:contsSn" element={<LangElement byLang={{ ko: <CmsPageKo />, en: <CmsPageKo /> }} />} />

                {/* maintask(주요업무) */}
                <Route path="/pp/:lang/maintask/dur/DurSearchRoom" element={<LangElement byLang={{ ko: <DurSearchRoomKo />, en: <DurSearchRoomKo /> }} />} />
                <Route path="/pp/:lang/maintask/dur/DurNoticeList/:bbsId" element={<LangElement byLang={{ ko: <DurNoticeListKo />, en: <DurNoticeListKo /> }} />} />
                <Route path="/pp/:lang/maintask/dur/DurNoticeList/:bbsId/:pstSn" element={<LangElement byLang={{ ko: <DurNoticeDetailKo />, en: <DurNoticeDetailKo /> }} />} />
                <Route path="/pp/:lang/maintask/dur/Proposal" element={<LangElement byLang={{ ko: <ProposalKo />, en: <ProposalKo /> }} />} />
                <Route path="/pp/:lang/maintask/dur/MyDrugInfo" element={<LangElement byLang={{ ko: <MyDrugInfoKo />, en: <MyDrugInfoKo /> }} />} />


                {/* open(정보공개) */}

                {/* news(기관소식) */}
                <Route path="/pp/:lang/news/FaqNotice" element={<LangElement byLang={{ ko: <FaqNoticeKo />, en: <FaqNoticeKo /> }} />} />
                                                
                {/* 유형별 게시판 (공통) */}
                <Route path="/pp/:lang/board/general/:bbsId" element={<LangElement byLang={{ ko: <GeneralBoardListKo />, en: <GeneralBoardListKo /> }} />} />
                <Route path="/pp/:lang/board/general/:bbsId/:pstSn" element={<LangElement byLang={{ ko: <GeneralBoardDetailKo />, en: <GeneralBoardDetailKo /> }} />} />                                                        

                <Route path="/pp/:lang/board/gallery/:bbsId" element={<LangElement byLang={{ ko: <GalleryBoardListKo />, en: <GalleryBoardListKo /> }} />} />
                <Route path="/pp/:lang/board/gallery/:bbsId/:pstSn" element={<LangElement byLang={{ ko: <GalleryBoardDetailKo />, en: <GalleryBoardDetailKo /> }} />} />       
                <Route path="/pp/:lang/board/video/:bbsId" element={<LangElement byLang={{ ko: <VideoBoardListKo />, en: <VideoBoardListKo /> }} />} />
                <Route path="/pp/:lang/board/video/:bbsId/:pstSn" element={<LangElement byLang={{ ko: <VideoBoardDetailKo />, en: <VideoBoardDetailKo /> }} />} />                       

                {/* about(기관소개) */}
                <Route path="/pp/:lang/about/ethics/CleanCenter" element={<LangElement byLang={{ ko: <CleanCenterKo />, en: <CleanCenterKo /> }} />} />
                <Route path="/pp/:lang/about/ethics/CleanForm" element={<LangElement byLang={{ ko: <CleanFormKo />, en: <CleanFormKo /> }} />} />
                <Route path="/pp/:lang/about/ethics/CleanDetail" element={<LangElement byLang={{ ko: <CleanDetailKo />, en: <CleanDetailKo /> }} />} />

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

                {/* IntegratedSearch(통합검색) */}
                <Route path="/pp/:lang/search/IntegratedSearch" element={<LangElement byLang={{ ko: <IntegratedSearchKo />, en: <IntegratedSearchKo /> }} />} />

                {/* expert */}
                <Route path="/pp/:lang/expert/ExpertMemberApply" element={<LangElement byLang={{ ko: <ProtectedRoute><ExpertMemberApplyKo /></ProtectedRoute>, en: <ProtectedRoute><ExpertMemberApplyKo /></ProtectedRoute> }} />} />                                  

                {/* etc */}
                <Route path="/pp/:lang/etc/Terms" element={<LangElement byLang={{ ko: <TermsKo />, en: <TermsKo /> }} />} />
                <Route path="/pp/:lang/etc/PrivacyPolicy" element={<LangElement byLang={{ ko: <PrivacyPolicyKo />, en: <PrivacyPolicyKo /> }} />} />
                <Route path="/pp/:lang/etc/CctvPolicy" element={<LangElement byLang={{ ko: <CctvPolicyKo />, en: <CctvPolicyKo /> }} />} />
                <Route path="/pp/:lang/etc/EmailDeny" element={<LangElement byLang={{ ko: <EmailDenyKo />, en: <EmailDenyKo /> }} />} />

                {/* lang 포함 NotFound - 반드시 가장 마지막에 배치 (와일드카드는 모든 경로를 매칭하므로) */}
                <Route path="/pp/:lang/InternalServerError" element={<LangElement byLang={{ ko: <InternalServerErrorKo />, en: <InternalServerErrorKo /> }} />} />
                <Route path="/pp/:lang/*" element={<LangElement byLang={{ ko: <NotFoundKo />, en: <NotFoundKo /> }} />} />
              </Route>

              {/* 전문가 메뉴에서 사용할 화면 레이아웃 */}
              <Route element={<ExpertLayout />}>
                {/* 전문가 메뉴- 내 업무 */}
                <Route path="/pp/:lang/expert/ExpertMyWork" element={<LangElement byLang={{ ko: <ProtectedRoute><ExpertMyWorkKo /></ProtectedRoute>, en: <ProtectedRoute><ExpertMyWorkKo /></ProtectedRoute> }} />} />
                <Route path="/pp/:lang/expert/ExpertApproval" element={<LangElement byLang={{ ko: <ProtectedRoute><ExpertApprovalKo /></ProtectedRoute>, en: <ProtectedRoute><ExpertApprovalKo /></ProtectedRoute> }} />} />
                <Route path="/pp/:lang/expert/ExpertApproval/:exprtTaskSn" element={<LangElement byLang={{ ko: <ProtectedRoute><ExpertApprovalDetailKo /></ProtectedRoute>, en: <ProtectedRoute><ExpertApprovalDetailKo /></ProtectedRoute> }} />} />
                <Route path="/pp/:lang/expert/ExpertApprovalUpdate/:exprtTaskSn" element={<LangElement byLang={{ ko: <ProtectedRoute><ExpertApprovalUpdateKo /></ProtectedRoute>, en: <ProtectedRoute><ExpertApprovalUpdateKo /></ProtectedRoute> }} />} />                
              </Route>

              {/* 국문 퍼블리싱 템플릿 화면들 */}
              <Route element={<Layout />}>
                <Route path="/pp/ko/screens" element={<ScreensKo />} />
                <Route path="/pp/ko/screens/:screenId" element={<ScreenViewerKo />} />
              </Route>

              {/* 영문 퍼블리싱 템플릿 화면들 */}
              <Route element={<EngLayout />}>
                <Route path="/pp/en/screens" element={<ScreensEn />} />
                <Route path="/pp/en/screens/:screenId" element={<ScreenViewerEn />} />
              </Route>

              {/* 일반사용자 메뉴에서 사용할 화면 레이아웃 */}
              <Route element={<EngLayout />}>
                <Route path="/pp/en" element={<HomeEn />} />
              </Route>
            </Routes>
          </GlobalErrorHandler>
        </BrowserRouter>
      </DialogProvider>
    </AuthProvider>
  )
}

