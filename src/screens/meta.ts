export type ScreenMeta = {
  id: string
  title?: string
  uiType: string
}

export const screens: ScreenMeta[] = [
  /* {
    "id": "KIDS-PP-US-CS-01_KO",
    "title": "고객센터 이용약관",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-CS-01_EN",
    "title": "Custom Center Term Of Use",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-CS-02_KO",
    "title": "고객센터 개인정보취급방침",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-CS-02_EN",
    "title": "Custom Center privacyPolicy",
    "uiType": "page"
  }, */
  {
    "id": "KIDS-PP-US-CS-03",
    "title": "고객센터 고정형 영상정보처리기기 운영·관리 방침",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-CS-04",
    "title": "고객센터 이메일무단수집거부",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-CS-05",
    "title": "고객센터 저작권보호정책",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-DI-01",
    "title": "DUR 이해",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-DI-02",
    "title": "DUR 정보검색",
    "uiType": "list"
  },
  {
    "id": "KIDS-PP-US-DI-03",
    "title": "DUR 정보검색 병용금기 탭",
    "uiType": "list"
  },
  {
    "id": "KIDS-PP-US-DI-04",
    "title": "DUR 정보검색 특정연령대금기 탭",
    "uiType": "list"
  },
  {
    "id": "KIDS-PP-US-DI-05",
    "title": "DUR 정보검색 임부금기 탭",
    "uiType": "list"
  },
  {
    "id": "KIDS-PP-US-DI-06",
    "title": "DUR 정보검색 용량주의 탭",
    "uiType": "list"
  },
  {
    "id": "KIDS-PP-US-DI-07",
    "title": "DUR 정보검색 효능군중복주의 탭",
    "uiType": "list"
  },
  {
    "id": "KIDS-PP-US-DI-08",
    "title": "DUR 정보검색 투여기간주의 탭",
    "uiType": "list"
  },
  {
    "id": "KIDS-PP-US-DI-09",
    "title": "DUR 정보검색 노인주의 탭",
    "uiType": "list"
  },
  {
    "id": "KIDS-PP-US-DI-10",
    "title": "DUR 정보검색 수유부주의 탭",
    "uiType": "list"
  },
  {
    "id": "KIDS-PP-US-DI-11",
    "title": "DUR 정보검색 분할주의 탭",
    "uiType": "list"
  },
  {
    "id": "KIDS-PP-US-DI-12",
    "title": "DUR 정보검색 제품 검색 시스템 팝업",
    "uiType": "popup"
  },
  {
    "id": "KIDS-PP-US-DI-13",
    "title": "의약품 적정사용 정보집",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-DI-14",
    "title": "내가 먹는 약의 DUR 정보",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-DI-16",
    "title": "의견 제안",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-EC-01",
    "title": "전문가 회원 전환 신청 소속선택",
    "uiType": "form"
  },
  {
    "id": "KIDS-PP-US-EC-02",
    "title": "전문가회원 전환신청 추가정보입력",
    "uiType": "form"
  },
  {
    "id": "KIDS-PP-US-EC-03",
    "title": "전문가회원 전환신청 신청 완료",
    "uiType": "form"
  },
  {
    "id": "KIDS-PP-US-EP-01",
    "title": "오류안내 404 에러안내",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-EP-02",
    "title": "오류안내 500 에러안내",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-EX-02",
    "title": "전문가회원 전환신청 추가정보입력",
    "uiType": "form"
  },
  {
    "id": "KIDS-PP-US-IS-01",
    "title": "통합검색 결과",
    "uiType": "list"
  },
  {
    "id": "KIDS-PP-US-JM-01",
    "title": "회원가입 회원 유형 선택",
    "uiType": "form"
  },
  {
    "id": "KIDS-PP-US-JM-02",
    "title": "약관동의",
    "uiType": "form"
  },
  {
    "id": "KIDS-PP-US-JM-03",
    "title": "회원가입 약관동의 약관보기 팝업",
    "uiType": "popup"
  },
  {
    "id": "KIDS-PP-US-JM-04",
    "title": "본인 인증(14세 이상인 경우 3단계)",
    "uiType": "form"
  },
  {
    "id": "KIDS-PP-US-JM-05",
    "title": "만14세미만가입 회원정보입력",
    "uiType": "form"
  },
  {
    "id": "KIDS-PP-US-JM-06",
    "title": "일반회원가입 가입신청완료",
    "uiType": "form"
  },
  {
    "id": "KIDS-PP-US-JM-07",
    "title": "만14세미만가입 법정대리인동의",
    "uiType": "form"
  },
  {
    "id": "KIDS-PP-US-JM-08",
    "title": "비밀번호 확인",
    "uiType": "form"
  },
  {
    "id": "KIDS-PP-US-JM-09",
    "title": "회원정보 수정",
    "uiType": "form"
  },
  {
    "id": "KIDS-PP-US-JM-10",
    "title": "회원탈퇴",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-LG-01",
    "title": "로그인 로그인 방식 선택",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-LG-02",
    "title": "로그인 실패",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-LG-03",
    "title": "로그인 전문가 회원 계정 선택 팝업",
    "uiType": "popup"
  },
  {
    "id": "KIDS-PP-US-LG-04",
    "title": "로그인 연장 팝업",
    "uiType": "popup"
  },
  {
    "id": "KIDS-PP-US-LG-05",
    "title": "로그인 시 비밀번호 5회 오류 팝업",
    "uiType": "popup"
  },
  {
    "id": "KIDS-PP-US-LG-06",
    "title": "아이디 찾기",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-LG-07",
    "title": "아이디 찾기 결과",
    "uiType": "detail"
  },
  {
    "id": "KIDS-PP-US-LG-08",
    "title": "비밀번호 찾기",
    "uiType": "form"
  },
  {
    "id": "KIDS-PP-US-LG-09",
    "title": "비밀번호 변경",
    "uiType": "form"
  },
  {
    "id": "KIDS-PP-US-LG-10",
    "title": "비밀번호 변경 완료",
    "uiType": "popup"
  },
  {
    "id": "KIDS-PP-US-LG-11",
    "title": "본인 인증 Any-ID 간편인증",
    "uiType": "form"
  },
  {
    "id": "KIDS-PP-US-LG-12",
    "title": "본인 인증 Any-ID 휴대폰본인인증",
    "uiType": "form"
  },
  {
    "id": "KIDS-PP-US-LG-13",
    "title": "본인 인증 Any-ID 모바일신분증인증",
    "uiType": "form"
  },
  {
    "id": "KIDS-PP-US-LG-15",
    "title": "로그인 아이디 로그인",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-MA-01",
    "title": "메인",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-MT-01",
    "title": "내 업무 전문가회원",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-MT-02",
    "title": "내 업무 업무 신청 관리 목록",
    "uiType": "list"
  },
  {
    "id": "KIDS-PP-US-MT-03",
    "title": "내 업무 업무 신청 관리 상세",
    "uiType": "form"
  },
  {
    "id": "KIDS-PP-US-MT-04",
    "title": "내 업무 업무 신청 관리 승인",
    "uiType": "form"
  },
  {
    "id": "KIDS-PP-US-MT-06",
    "title": "내 업무 전문가회원 전문가회원 업무시스템 사용 승인 신청 팝업",
    "uiType": "popup"
  },
  {
    "id": "KIDS-PP-US-MT-07",
    "title": "내 업무 전문가회원 전문가회원 전환신청 취소 팝업",
    "uiType": "popup"
  },
  {
    "id": "KIDS-PP-US-MT-08",
    "title": "내 업무 전문가회원 반려 사유 보기 팝업",
    "uiType": "popup"
  },
  {
    "id": "KIDS-PP-US-NO-01",
    "title": "일반 게시판 목록 공지사항",
    "uiType": "list"
  },
  {
    "id": "KIDS-PP-US-NO-02",
    "title": "일반 게시판 상세 공지사항",
    "uiType": "detail"
  },
  {
    "id": "KIDS-PP-US-NO-05",
    "title": "기관소식 FAQ",
    "uiType": "page"
  },
  {
    "id": "KIDS-PP-US-NO-08",
    "title": "갤러리 게시판 목록 카드뉴스",
    "uiType": "list"
  },
  {
    "id": "KIDS-PP-US-NO-09",
    "title": "갤러리 게시판 상세 카드뉴스",
    "uiType": "detail"
  },
  {
    "id": "KIDS-PP-US-NO-10",
    "title": "동영상 게시판 목록 동영상",
    "uiType": "list"
  },
  {
    "id": "KIDS-PP-US-NO-11",
    "title": "동영상 게시판 상세 동영상",
    "uiType": "detail"
  },
  {
    "id": "KIDS-PP-US-PI-01",
    "title": "이상사례 보고란",
    "uiType": "page"
  },

  //내업무 템플릿 예시
  {
    "id": "KIDS-PP-US-MT-01-LAYOUT",
    "title": "내업무 레이아웃",
    "uiType": "detail"
  },

  {
    "id": "KIDS-PP-US-MT-01_List",
    "title": "내업무 리스트",
    "uiType": "detail"
  },
  {
    "id": "KIDS-PP-US-MT-01_Write",
    "title": "내업무 등록",
    "uiType": "detail"
  },

  //PUB
  {
    "id": "PUB",
    "title": "PUB",
    "uiType": "page"
  },
]
