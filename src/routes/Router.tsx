import i18n from '@/i18n/i18n'
import { JSX, useEffect, useMemo } from "react";
import { Navigate, BrowserRouter, Routes, Route, useLocation, useParams } from 'react-router-dom'
import Layout from './Layout'
import BlankLayout from './BlankLayout'
import ProtectedRoute from './ProtectedRoute'

// ko 페이지들
import HomeKo from '@/pages/ko/Home';
import NotFoundKo from '@/pages/ko/NotFound';
import InternalServerErrorKo from '@/pages/ko/InternalServerError';

//maintask(주요업무)
import DurProposalKo from '@/pages/ko/maintask/dur/DurProposal'
import DurUnderstandKo from '@/pages/ko/maintask/dur/DurUnderstand';

//open(정보공개)

//news(기관소식)
import NewsFaqNoticeKo from '@/pages/ko/news/NewsFaqNotice';
// 게시판 페이지 작업중
import NewsNoticeListKo from '@/pages/ko/news/NewsNoticeList';
import NewsNoticeDetailKo from '@/pages/ko/news/NewsNoticeDetail';
import NewsJobNoticeListKo from '@/pages/ko/news/NewsJobNoticeList';
import NewsJobNoticeDetailKo from '@/pages/ko/news/NewsJobNoticeDetail';
import NewsDataRoomListKo from '@/pages/ko/news/NewsDataRoomList';
import NewsDataRoomDetailKo from '@/pages/ko/news/NewsDataRoomDetail';
import NewsCardNewsListKo from '@/pages/ko/news/NewsCardNewsList';
import NewsCardNewsDetailKo from '@/pages/ko/news/NewsCardNewsDetail';
import NewsVidioListKo from '@/pages/ko/news/NewsVidioList';
import NewsVidioDetailKo from '@/pages/ko/news/NewsVidioDetail';

//about(기관소개)

//auth
import DurNoticeListKo from '@/pages/ko/dur/DurNoticeList';
import DurNoticeDetailKo from '@/pages/ko/dur/DurNoticeDetail';
import SignUpSelKo from '@/pages/ko/auth/SignUpSel';
import SignUpAgrTrmsKo from '@/pages/ko/auth/SignUpAgrTrms';
import LegalGuardAgrKo from '@/pages/ko/auth/LegalGuardAgr';
import CertifySelfKo from '@/pages/ko/auth/CertifySelf';
import SignUpMbrInfoKo from '@/pages/ko/auth/SignUpMbrInfo';
import SignUpCompleteKo from '@/pages/ko/auth/SignUpComplete';
import EditProfileKo from '@/pages/ko/auth/EditProfile';
import WithDrawalKo from '@/pages/ko/auth/WithDrawal';
import LoginKo from '@/pages/ko/auth/Login';
import LoginMethodKo from '@/pages/ko/auth/LoginMethod';
import PasswordConfirmKo from '@/pages/ko/auth/PasswordConfirm';
import FindIdKo from '@/pages/ko/auth/FindId';
import FindIdAuthSuccessKo from '@/pages/ko/auth/FindIdAuthSuccess';
import FindPwKo from '@/pages/ko/auth/FindPw';
import FindPwModifyKo from '@/pages/ko/auth/FindPwModify';

//expert
import ExpertMemberApplyKo from '@/pages/ko/expert/ExpertMemberApply';

//etc
import PrivacyPolicyKo from '@/pages/ko/etc/PrivacyPolicy';
import TermsKo from '@/pages/ko/etc/Terms';
import CctvPolicyKo from '@/pages/ko/etc/CctvPolicy';
import EmailDenyKo from '@/pages/ko/etc/EmailDeny';


// en 페이지들 (프로젝트에 실제 존재한다고 가정)
import HomeEn from "@/pages/en/Home";
import DurNoticeListEn from "@/pages/en/dur/DurNoticeList";
import DurNoticeDetailEn from "@/pages/en/dur/DurNoticeDetail";
import DurProposalEn from "@/pages/en/dur/DurProposal";
import NotFoundEn from "@/pages/en/NotFound";
import LoginEn from "@/pages/en/auth/Login";

// 언어 무관 화면
import Screens from '@/pages/screens/Screens'
import ScreenViewer from '@/pages/screens/ScreenViewer'

import { normalizeLang, FALLBACK_LANG, detectBrowserLang } from "./lang";
import { AuthProvider } from '@/contexts/AuthContext';
import { DialogProvider } from '@/contexts/DialogContext';

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

  // 1) URL에 lang가 “있는지” (/:lang/* 라우트로 들어온 경우)
  const urlLang = useMemo(() => normalizeLang(params.lang), [params.lang]);

  // 2) URL에 lang가 없는 경우를 감지하기 위해 pathname 직접 파싱
  const { needsRedirect, redirectTo } = useMemo(() => {
    const pathname = location.pathname; // 예: "/home", "/en/home", "/xx/home"
    const segs = pathname.split("/");   // ["", "home"] or ["", "en", "home"]

    const first = segs[1]; // 첫 segment
    const firstAsLang = normalizeLang(first);

    // (A) lang이 아예 없다: "/home" "/settings" "/"
    if (!first || firstAsLang === null && first === "" /* 루트 */) {
      const targetLang = detectBrowserLang(); // 브라우저 기반 (또는 fallback)
      const rest = pathname === "/" ? "" : pathname; // "/"면 뒤에 아무 것도 없음
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

  // 3) URL에 유효한 lang가 있으면 i18n과 동기화
  useEffect(() => {
    if (urlLang && i18n.language !== urlLang) {
      i18n.changeLanguage(urlLang);
    }
  }, [urlLang]);

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
          <Routes>
            {/* 공통 레이아웃 */}
            <Route element={<LangGuard><Layout /></LangGuard>}>
              {/* ✅ 루트(/)로 들어오면 브라우저 언어 기반으로 /ko 또는 /en로 보내기 */}
              <Route path="/" element={<Navigate to={`/${detectBrowserLang()}`} replace />} />

              <Route path="/:lang" element={<LangElement byLang={{ ko: <HomeKo />, en: <HomeEn /> }} />} />
              <Route path="/:lang/dur/notice" element={<LangElement byLang={{ ko: <DurNoticeListKo />, en: <DurNoticeListEn /> }} />} />
              <Route path="/:lang/dur/notice/:id" element={<LangElement byLang={{ ko: <DurNoticeDetailKo />, en: <DurNoticeDetailEn /> }} />} />

              {/* maintask(주요업무) */}
              <Route path="/:lang/maintask/dur/DurProposal" element={<LangElement byLang={{ ko: <DurProposalKo />, en: <DurProposalEn /> }} />} />
              <Route path="/:lang/maintask/dur/DurUnderstand" element={<LangElement byLang={{ ko: <DurUnderstandKo />, en: <DurUnderstandKo /> }} />} />

              {/* open(정보공개) */}

              {/* news(기관소식) */}
              <Route path="/:lang/news/NewsFaqNotice" element={<LangElement byLang={{ ko: <NewsFaqNoticeKo />, en: <NewsFaqNoticeKo /> }} />} />
              {/* 게시판 페이지 작업중 */}          
              <Route path="/:lang/news/NewsNoticeList" element={<LangElement byLang={{ ko: <NewsNoticeListKo />, en: <NewsNoticeListKo /> }} />} />
              <Route path="/:lang/news/NewsNoticeList/:pstSn" element={<LangElement byLang={{ ko: <NewsNoticeDetailKo />, en: <NewsNoticeDetailKo /> }} />} />            
              <Route path="/:lang/news/NewsJobNoticeList" element={<LangElement byLang={{ ko: <NewsJobNoticeListKo />, en: <NewsJobNoticeListKo /> }} />} />
              <Route path="/:lang/news/NewsJobNoticeList/:pstSn" element={<LangElement byLang={{ ko: <NewsJobNoticeDetailKo />, en: <NewsJobNoticeDetailKo /> }} />} />            
              <Route path="/:lang/news/NewsDataRoomList" element={<LangElement byLang={{ ko: <NewsDataRoomListKo />, en: <NewsDataRoomListKo /> }} />} />
              <Route path="/:lang/news/NewsDataRoomList/:pstSn" element={<LangElement byLang={{ ko: <NewsDataRoomDetailKo />, en: <NewsDataRoomDetailKo /> }} />} />
              <Route path="/:lang/news/NewsCardNewsList" element={<LangElement byLang={{ ko: <NewsCardNewsListKo />, en: <NewsCardNewsListKo /> }} />} />
              <Route path="/:lang/news/NewsCardNewsList/:pstSn" element={<LangElement byLang={{ ko: <NewsCardNewsDetailKo />, en: <NewsCardNewsDetailKo /> }} />} />         
              <Route path="/:lang/news/NewsVidioList" element={<LangElement byLang={{ ko: <NewsVidioListKo />, en: <NewsVidioListKo /> }} />} />
              <Route path="/:lang/news/NewsVidioList/:pstSn" element={<LangElement byLang={{ ko: <NewsVidioDetailKo />, en: <NewsVidioDetailKo /> }} />} />                        

              {/* about(기관소개) */}

              {/* auth */}
              <Route path="/:lang/auth/LoginMethod" element={<LangElement byLang={{ ko: <LoginMethodKo />, en: <LoginMethodKo /> }} />} />
              <Route path="/:lang/auth/Login" element={<LangElement byLang={{ ko: <LoginKo />, en: <LoginEn /> }} />} />
              <Route path="/:lang/auth/SignUpSel" element={<LangElement byLang={{ ko: <SignUpSelKo />, en: <SignUpSelKo /> }} />} />
              <Route path="/:lang/auth/GeneralSignUpAgrTrms" element={<LangElement byLang={{ ko: <SignUpAgrTrmsKo />, en: <SignUpAgrTrmsKo /> }} />} />
              <Route path="/:lang/auth/JuniorSignUpAgrTrms" element={<LangElement byLang={{ ko: <SignUpAgrTrmsKo />, en: <SignUpAgrTrmsKo /> }} />} />
              <Route path="/:lang/auth/LegalGuardAgr" element={<LangElement byLang={{ ko: <LegalGuardAgrKo />, en: <LegalGuardAgrKo /> }} />} />
              <Route path="/:lang/auth/CertifySelf" element={<LangElement byLang={{ ko: <CertifySelfKo />, en: <CertifySelfKo /> }} />} />
              <Route path="/:lang/auth/SignUpMbrInfo" element={<LangElement byLang={{ ko: <SignUpMbrInfoKo />, en: <SignUpMbrInfoKo /> }} />} />
              <Route path="/:lang/auth/SignUpComplete" element={<LangElement byLang={{ ko: <SignUpCompleteKo />, en: <SignUpCompleteKo /> }} />} />
              <Route path="/:lang/auth/PasswordConfirm" element={<LangElement byLang={{ ko: <ProtectedRoute><PasswordConfirmKo /></ProtectedRoute>, en: <ProtectedRoute><PasswordConfirmKo /></ProtectedRoute> }} />} />
              <Route path="/:lang/auth/EditProfile" element={<LangElement byLang={{ ko: <ProtectedRoute><EditProfileKo /></ProtectedRoute>, en: <ProtectedRoute><EditProfileKo /></ProtectedRoute> }} />} />
              <Route path="/:lang/auth/WithDrawal" element={<LangElement byLang={{ ko: <ProtectedRoute><WithDrawalKo /></ProtectedRoute>, en: <ProtectedRoute><WithDrawalKo /></ProtectedRoute> }} />} />
              <Route path="/:lang/auth/FindId" element={<LangElement byLang={{ ko: <FindIdKo />, en: <FindIdKo /> }} />} />
              <Route path="/:lang/auth/FindIdAuthSuccess" element={<LangElement byLang={{ ko: <FindIdAuthSuccessKo />, en: <FindIdAuthSuccessKo /> }} />} />
              <Route path="/:lang/auth/FindPw" element={<LangElement byLang={{ ko: <FindPwKo />, en: <FindPwKo /> }} />} />
              <Route path="/:lang/auth/FindPwModify" element={<LangElement byLang={{ ko: <FindPwModifyKo />, en: <FindPwModifyKo /> }} />} />

              {/* expert */}
              <Route path="/:lang/expert/ExpertMemberApply" element={<LangElement byLang={{ ko: <ExpertMemberApplyKo />, en: <ExpertMemberApplyKo /> }} />} />                                  

              {/* etc */}
              <Route path="/:lang/etc/Terms" element={<LangElement byLang={{ ko: <TermsKo />, en: <TermsKo /> }} />} />
              <Route path="/:lang/etc/PrivacyPolicy" element={<LangElement byLang={{ ko: <PrivacyPolicyKo />, en: <PrivacyPolicyKo /> }} />} />
              <Route path="/:lang/etc/CctvPolicy" element={<LangElement byLang={{ ko: <CctvPolicyKo />, en: <CctvPolicyKo /> }} />} />
              <Route path="/:lang/etc/EmailDeny" element={<LangElement byLang={{ ko: <EmailDenyKo />, en: <EmailDenyKo /> }} />} />

              {/* 언어 무관 퍼블리싱 템플릿 화면들 */}
              <Route path="/screens" element={<Screens />} />
              <Route path="/screens/:screenId" element={<ScreenViewer />} />

              {/* lang 포함 NotFound - 반드시 가장 마지막에 배치 (와일드카드는 모든 경로를 매칭하므로) */}
              <Route path="/:lang/InternalServerError" element={<LangElement byLang={{ ko: <InternalServerErrorKo />, en: <InternalServerErrorKo /> }} />} />
              <Route path="/:lang/*" element={<LangElement byLang={{ ko: <NotFoundKo />, en: <NotFoundKo /> }} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DialogProvider>
    </AuthProvider>
  )
}