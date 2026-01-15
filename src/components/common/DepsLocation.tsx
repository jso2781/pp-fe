import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BreadcrumbNav } from '@/components/mui';
import { useLocation } from 'react-router-dom';
import { disabled } from 'node_modules/@base-ui/react/esm/utils/reason-parts';

// 1. 경로별 한글 명칭 매핑 (데이터가 많아지면 별도 파일로 분리 추천)
const pathLabels: Record<string, string[]> = {
  "/ko/notice": ["알림마당", "공지사항"],
  "/ko/board": ["커뮤니티", "게시판"],
  "/ko/board/write": ["커뮤니티", "글쓰기"],
  "/ko/dur/notice": ["DUR 정보", "알림 게시판"],
  "/ko/dur/notice/5": ["DUR 정보", "알림 게시판"],
  "/ko/dur/proposal": ["DUR 정보", "의견 제안"],
  "/ko/safety/report/online": ["의약품 안전관리", "의약품 이상사례 보고", "이상사례 보고"],
  "/ko/login/method": ["로그인", "로그인 방식 선택"],
  "/ko/login": ["로그인", "아이디 로그인"],

  "/ko/news/NewsNoticeList": ["기관소식", "공지사항"],
  "/ko/news/NewsJobNoticeList": ["기관소식", "채용 게시판"],
  "/ko/news/NewsDataRoomList": ["기관소식", "자료실"],

  "/en/notice": ["알림마당11", "공지사항11"],
  "/en/board": ["커뮤니티11", "게시판11"],
  "/en/board/write": ["커뮤니티11", "글쓰기11"],
  "/en/dur/notice": ["DUR 정보11", "알림 게시판11"],
  "/en/dur/proposal": ["DUR 정보11", "의견 제안11"],
  "/en/safety/report/online": ["의약품 안전관리11", "의약품 이상사례 보고11", "이상사례 보고11"]

};

export default function DepsLocation() {
  /**************************** SubMenu 상단 Top-Navigation 설정 시작(한국어/영어 사이트 변환 포함) *********************/
  const { t } = useTranslation();

  /**
   * 1. 경로 매핑 설정
   * - pattern: 정규표현식. 
   * (\/.*)? 또는 (\/\d+)? 를 붙여서 뒤에 숫자가 오든 안 오든 매칭되게 설정합니다.
   */
  const pathConfig = [
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
      pattern: /^\/[A-Za-z]{2}\/dur\/notice(\/\d+)?$/,
      labels: ["durInfo", "durNotice"]
    },
    {
      pattern: /^\/[A-Za-z]{2}\/dur\/proposal$/,
      labels: ["durInfo", "durSuggest"]
    },
    {
      pattern: /^\/[A-Za-z]{2}\/safety\/report\/online$/,
      labels: ["drugSafetyMgmt", "drugSafetyReport", "drugSafetyReportOnline"]
    }
    ,
    {
      pattern: /^\/[A-Za-z]{2}\/login\/method$/,
      labels: ["login", "loginMethod"]
    },
    {
      pattern: /^\/[A-Za-z]{2}\/login$/,
      labels: ["login", "idLogin"]
    },
    {
      pattern: /^\/[A-Za-z]{2}\/news\/NewsNoticeList(\/)?(\d+)?$/,
      labels: ["news", "noticeList"] // 기관소식 > 공지사항
    },
    {
      pattern: /^\/[A-Za-z]{2}\/news\/NewsJobNoticeList(\/)?(\d+)?$/,
      labels: ["news", "employmentBoard"] // 기관소식 > 채용게시판
    },    
    {
      pattern: /^\/[A-Za-z]{2}\/news\/NewsDataRoomList(\/)?(\d+)?$/,
      labels: ["news", "menuEduArchive"] // 기관소식 > 자료실
    },      
    {
      pattern: /^\/[A-Za-z]{2}\/news\/NewsCardNewsList(\/)?(\d+)?$/,
      labels: ["news", "menuEduCard"] // 기관소식 > 카드뉴스
    },      
  ];

  // 1. 사용자 링크 의한 React Router상 내부 경로 가져오기
  const { pathname } = useLocation();

  // pathname 변경 시에만 로그 출력 (StrictMode로 인한 중복 호출 방지)
  useEffect(() => {
    console.log("DepsLocation.tsx pathname="+pathname);
  }, [pathname]);
  // 2. 현재 경로에 일치하는 설정 찾기
  const matched = pathConfig.find(item => item.pattern.test(pathname));
  
  // 3. 라벨 설정 (매칭되는 게 없으면 기본값)
  const currentLabels = matched ? matched.labels.map(labelKey => t(labelKey)) : [t("page"), t("notFound")];
  // const currentLabels = pathLabels[pathname] || ["페이지", "찾을 수 없음"];

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
  /**************************** SubMenu 상단 Top-Navigation 설정 시작(한국어/영어 사이트 변환 포함) *********************/

  return (
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
  );
}