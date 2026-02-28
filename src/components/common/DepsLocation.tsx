import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { BreadcrumbNav } from '@/components/mui';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { getLnbInfoByPath } from '@/features/auth/MenuUtils';
import { HeadTitle } from './HeadTitle';

export default function DepsLocation() {
  /**************************** SubMenu 상단 Top-Navigation 설정 시작(한국어/영어 사이트 변환 포함) *********************/
  const { t } = useTranslation();

  /**
   * 1. 경로 매핑 설정
   * - pattern: 정규표현식. 
   * (\/.*)? 또는 (\/\d+)? 를 붙여서 뒤에 숫자가 오든 안 오든 매칭되게 설정합니다.
   */
  const pathConfig = useMemo(() => [

    // 맨 위에 홈 경로 패턴 추가 (ko, en 모두 대응)
    {
      pattern: /^\/pp\/([A-Za-z]{2})?(\/)?$/, 
      labels: ["home"] // i18n에 등록된 'home' 키 사용
    },
    {
      // 통합검색
      pattern: /^\/pp\/[A-Za-z]{2}\/search\/IntegratedSearch(\/\d+)?$/, 
      labels: ["integratedSearch"]
    },
    {
      // /notice 혹은 /notice/123 모두 매칭
      pattern: /^\/[A-Za-z]{2}\/notice(\/\d+)?$/, 
      labels: ["announcement", "noticeList"]
    },
    {
      // /board/write (글쓰기 전용)
      pattern: /^\/[A-Za-z]{2}\/board\/write$/,
      labels: ["community", "writing"]
    },
    {
      // /board 혹은 /board/123 모두 매칭
      pattern: /^\/[A-Za-z]{2}\/board(\/\d+)?$/,
      labels: ["community", "board"]
    },
    {
      pattern: /^\/pp\/[A-Za-z]{2}\/safety\/report\/online$/,
      labels: ["drugSafetyMgmt", "drugSafetyReport", "drugSafetyReportOnline"]
    }
    ,
    {
      // 로그인 > 로그인 방법 선택
      pattern: /^\/pp\/[A-Za-z]{2}\/auth\/LoginMethod(\/)?$/,
      labels: ["login", "loginMethod"]
    },
    {
      // 로그인 > 아이디 로그인
      pattern: /^\/pp\/[A-Za-z]{2}\/auth\/Login(\/)?$/,
      labels: ["login", "idLogin"]
    },
    {
      // 회원정보수정 > 비밀번호 확인
      pattern: /^\/pp\/[A-Za-z]{2}\/auth\/PasswordConfirm(\/)?$/,
      labels: ["editProfile", "passwordConfirm"]
    },
    {
      // 회원정보수정 > > 비밀번호 확인 > 회원정보수정
      pattern: /^\/pp\/[A-Za-z]{2}\/auth\/EditProfile(\/)?$/,
      labels: ["editProfile"]
    },
    {
      // 회원탈퇴
      pattern: /^\/pp\/[A-Za-z]{2}\/auth\/WithDrawal(\/)?$/,
      labels: ["withdrawal"]
    },
    {
      // 회원가입 > 회원가입 선택
      pattern: /^\/pp\/[A-Za-z]{2}\/auth\/SignUpSel(\/)?$/,
      labels: ["signUp"]
    },
    {
      // 회원가입 > 일반 회원 가입 약관 동의
      pattern: /^\/pp\/[A-Za-z]{2}\/auth\/GeneralSignUpAgrTrms(\/)?$/,
      labels: ["signUp"]
    },
    {
      // 회원가입 > 만 14세 미만 회원 가입 약관 동의
      pattern: /^\/pp\/[A-Za-z]{2}\/auth\/JuniorSignUpAgrTrms(\/)?$/,
      labels: ["signUp"]
    },
    {
      // 회원가입 > 만 14세 미만 회원 가입 약관 동의 > 법정대리인 동의
      pattern: /^\/pp\/[A-Za-z]{2}\/auth\/LegalGuardAgr(\/)?$/,
      labels: ["signUp"]
    },
    {
      // 회원가입 > 본인인증
      pattern: /^\/pp\/[A-Za-z]{2}\/auth\/CertifySelf(\/)?$/,
      labels: ["signUp"]
    },
    {
      // 회원가입 > 회원 정보 입력
      pattern: /^\/pp\/[A-Za-z]{2}\/auth\/SignUpMbrInfo(\/)?$/,
      labels: ["signUp"]
    },
    {
      // 회원가입 > 가입 신청 완료
      pattern: /^\/pp\/[A-Za-z]{2}\/auth\/SignUpComplete(\/)?$/,
      labels: ["signUp"]
    },
    {
      // 로그인 > 아이디 로그인 > 아이디 찾기
      pattern: /^\/pp\/[A-Za-z]{2}\/auth\/FindId(\/)?$/,
      labels: ["login", "idLogin", "findId"]
    },
    {
      // 로그인 > 아이디 로그인 > 아이디 찾기 > 아이디 찾기 결과
      pattern: /^\/pp\/[A-Za-z]{2}\/auth\/FindIdAuthSuccess(\/)?$/,
      labels: ["login", "idLogin", "findId"]
    },
    {
      // 로그인 > 아이디 로그인 > 비밀번호 찾기
      pattern: /^\/pp\/[A-Za-z]{2}\/auth\/FindPw(\/)?$/,
      labels: ["login", "idLogin", "findPassword"]
    },
    {
      // 로그인 > 아이디 로그인 > 비밀번호 찾기 > 비밀번호 변경
      pattern: /^\/pp\/[A-Za-z]{2}\/auth\/FindPwModify(\/)?$/,
      labels: ["login", "idLogin", "findPassword", "passwordChange"]
    },
    {
      // 기관소식 > FAQ
      pattern: /^\/pp\/[A-Za-z]{2}\/news\/FaqNotice(\/)?(\d+)?$/,
      labels: ["news", "menuNoticeFaq"]
    },
    {
      // 전문가 회원 전환 신청
      pattern: /^\/pp\/[A-Za-z]{2}\/expert\/ExpertMemberApply(\/)?(\d+)?$/,
      labels: ["usrSwtReg"]
    },
    {
      // 고객센터 > 이용약관
      pattern: /^\/pp\/[A-Za-z]{2}\/etc\/Terms(\/)?(\d+)?$/,
      labels: ["customerCenter", "termsOfUse"]
    },
    {
      // 고객센터 > 개인정보처리방침
      pattern: /^\/pp\/[A-Za-z]{2}\/etc\/PrivacyPolicy(\/)?(\d+)?$/,
      labels: ["customerCenter", "privacyPolicy"]
    },
    {
      // 고객센터 > 고정형 영상정보처리기기 운영관리방침
      pattern: /^\/pp\/[A-Za-z]{2}\/etc\/CctvPolicy(\/)?(\d+)?$/,
      labels: ["customerCenter", "cctvPolicy"]
    },
    {
      // 고객센터 > 이메일 무단수집 거부
      pattern: /^\/pp\/[A-Za-z]{2}\/etc\/EmailDeny(\/)?(\d+)?$/,
      labels: ["customerCenter", "rejectUnAuthorizedEmail"]
    },
    {
      // DUR 정보 > dur 이해
      pattern: /^\/pp\/[A-Za-z]{2}\/maintask\/dur\/DurUnderstand(\/)?(\d+)?$/,
      labels: ["menuDur", "menuDurUnderstand"]
    },
    {
      // DUR 정보 > 알림 게시판
      pattern: /^\/pp\/[A-Za-z]{2}\/maintask\/dur\/DurNoticeList(\/[A-Za-z0-9_]+(\/\d+)?)?\/?$/,
      labels: ["menuDur", "menuDurNotice"]
    },
    {
      // DUR 정보 > 의견 제안
      pattern: /^\/pp\/[A-Za-z]{2}\/maintask\/dur\/Proposal(\/)?(\d+)?$/,
      labels: ["menuDur", "menuDurSuggest"]
    },
    {
      // 내 업무
      pattern: /^\/pp\/[A-Za-z]{2}\/expert\/ExpertMyWork(\/)?$/,
      labels: ["expertMyWork"]
    },
    {
      // 업무 신청 관리
      pattern: /^\/pp\/[A-Za-z]{2}\/expert\/ExpertApproval(\/\d+)?$/, 
      labels: ["expertMyWork", "expertApproval"]
    },
    {
      // 업무 신청 관리 > 업무 신청 수정
      pattern: /^\/pp\/[A-Za-z]{2}\/expert\/ExpertApprovalUpdate(\/\d+)?$/, 
      labels: ["expertMyWork", "expertApproval"]
    }
  ], []);

  // 1. 사용자 링크 의한 React Router상 내부 경로 가져오기
  const { pathname } = useLocation();
  const { lnbStructor } = useAppSelector((s) => s.menu);
  const lnbResult = useMemo(() => getLnbInfoByPath(lnbStructor, pathname), [lnbStructor, pathname]);

  // pathname 변경 시에만 로그 출력 (StrictMode로 인한 중복 호출 방지)
  useEffect(() => {
    console.log("DepsLocation.tsx pathname="+pathname);
  }, [pathname]);

  // 2. 현재 경로에 일치하는 설정 찾기 (lnbStructor 우선, 없으면 pathConfig)
  const matched = pathConfig.find(item => item.pattern.test(pathname));

  // 3. 라벨 설정: lnbStructor에서 경로로 찾은 breadcrumb이 있으면 사용, 없으면 pathConfig
  const currentLabels = useMemo(() => {
    if (lnbResult.breadcrumb.length > 0) {
      return lnbResult.breadcrumb.map((b) => b.label);
    }
    return matched ? matched.labels.map((labelKey) => t(labelKey)) : [t("page"), t("notFound")];
  }, [lnbResult.breadcrumb, matched, t]);

  // 4. 마지막 요소가 페이지의 큰 제목 (h2)
  // 이제 /notice/854로 접속해도 labels의 마지막인 "공지사항"이 타이틀이 됩니다.
  const pageTitle = currentLabels[currentLabels.length - 1];

  // 5. Breadcrumb 아이템 생성
  const breadcrumbItems = [
    // { label: t("home"), href: '/', className: 'home' },
    { 
      label: <span className="home">{t("home")}</span>, 
      href: '/' 
    },
    ...currentLabels.map((label, index) => ({
      label: label,
      className: index === currentLabels.length - 1 ? 'current' : 'route'
    }))
  ];

  /* =========================================================
   웹 접근성을 위한 <title> 경로 생성 로직 
  ========================================================= */
  const hasMatch = lnbResult.breadcrumb.length > 0 || !!matched;
  const finalBrowserTitle = useMemo(() => {

    // 홈일 때 처리
    const isHome = pathname === '/pp' || pathname === '/pp/ko' || pathname === '/pp/ko/' || pathname === '/pp/en' || pathname === '/pp/en/';
    if (isHome) {
      return t('kidsName');
    }
    // 매칭되는 게 없을 때 (lnbStructor·pathConfig 모두 없음)
    if (!hasMatch) {
      return t('kidsName');
    }
    
    // 외부 변수 currentLabels 대신 여기서 직접 최신 라벨을 생성하거나 
    // 의존성 배열에 currentLabels를 확실히 넣어야 합니다.
    let titleLabels = [...currentLabels]; 
    const pathParts = pathname.split('/').filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];
    const isDetail = /^\d+$/.test(lastPart);
    const isWrite = pathname.toLowerCase().endsWith('/write');

    if (isDetail) {
      titleLabels[titleLabels.length - 1] += ` ${t('detail', '상세')}`;
    } else if (!isWrite && hasMatch) {
      if (/news|board|notice|list|dur/i.test(pathname)) {
        titleLabels[titleLabels.length - 1] += ` ${t('list', '목록')}`;
      }
    }

    const accessibilityPath = [...titleLabels].reverse();
    accessibilityPath.push(t("home")); 

    const titleStr = `${accessibilityPath.join(' < ')} | ${t('siteName', 'KIDS')}`;

    console.log('HeadTitle pageTitle='+pageTitle+', finalBrowserTitle=', titleStr);
    return titleStr;
  }, [pathname, t, currentLabels, hasMatch]);

  useEffect(() => {
    document.title = finalBrowserTitle;
  }, [finalBrowserTitle]);
  
  /**************************** SubMenu 상단 Top-Navigation 설정 시작(한국어/영어 사이트 변환 포함) *********************/

  return (
    <>
      <HeadTitle title={finalBrowserTitle}>
        <meta name="description" content={pageTitle} />
      </HeadTitle>
      <div className="location">
        <div className="local">
          <BreadcrumbNav
            className="breadcrumb"
            separator=">"
            items={breadcrumbItems}
          />
        </div>
        <div className="page_path">
          <h2 className="tit">{pageTitle}</h2>
        </div>
      </div>
    </>
  );
}