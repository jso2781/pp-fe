# 대국민포털(PP) FE 프로그램 명세서 — REST API (메뉴·화면 기준)

> **범위**: `src/pages`, `src/components`, `src/features`에서 호출하는 HTTP API를 기준으로 작성.  
> **백엔드 루트**: `C:\drugsafe\sources\to_be\pp-be` (Spring `@RequestMapping` 기준 매핑 참고).  
> **메뉴 데이터**: 운영/스테이징 `POST /api/pp/auth/selectMenuList` — 요청 `{ "langSeCd": "KOR" | "ENG" }`.

---

## 1. API 베이스 URL 및 연계 시스템

| 구분 | base URL (예) | 비고 |
|------|----------------|------|
| PP 사용자 API | **`/api/pp`** + 상대 경로 | 운영·STG 빌드 (`shared/utils/https.ts`). 개발 시 Vite 프록시로 `/api` 등에 연결 가능. |
| 인증 전용 (CA) | `VITE_AUTH_API_BASE_URL` (기본 `http://localhost:8088/api/ca/auth`) | **`/login`**, **`/refresh`**, **`/logout`**, **`/extend`**, **`/workAccessLog/insert`** |
| 메일 (CA) | `VITE_CA_API_BASE_URL` | **`/mail/send`**, **`/mail/list`** |
| 자문위원 (UEX) | `VITE_ADVICE_API_BASE_URL` | **`/exprt/exprtAplyChk`**, **`/exprt/updateExprtAprvStts`** |
| CDM 커뮤니티 | `VITE_CDM_API_BASE_URL` (기본 `http://localhost:8090/api/cm`) | 경로에 **`/community`** 포함 시 해당 base로 전송 |
| Any-ID 로그아웃 등 | PP 절대 경로 | 예: **`POST /api/pp/auth/anyid/logout`** (인터셉터·직접 호출) |
| 썸네일·첨부 URL | 화면에서 문자열 조합 | 예: **`/api/pp/atch/thumb/{파일명}`** (`VITE_THUMBNAIL_API_BASE_URL`로 대체 가능) |
| CDM 파일 다운로드 링크 | `VITE_CDM_API_BASE_URL` | 예: **`/api/cm/common/file/download/{atchFileId}`** |

이하 표의 **REST 경로**는 PP 기준일 때 앞에 **`/api/pp`** 를 붙인 최종 URL로 이해하면 됩니다 (CA/UEX/CDM은 예외).

---

## 2. pp-be 컨트롤러와 PP API 프리픽스 (참조)

| 프리픽스 | pp-be 패키지 예시 |
|----------|-------------------|
| `/api/pp/auth` | `auth`, `anyid` (AnyIdAuthController, MenuController, …) |
| `/api/pp/auth/esign/*`, `pid/*`, `vrs/*` | AnyIdRelayController (간편인증·VRS 릴레이) |
| `/api/pp/mbr` | MbrInfoController, SttyAgtInfoController |
| `/api/pp/crypto` | CryptoController |
| `/api/pp/cms` | CmsController |
| `/api/pp/pst` | PstController |
| `/api/pp/notice` | BbsController, CmntController |
| `/api/pp/board` | (FE `boardApi.ts` — 게시판 일부 시나리오) |
| `/api/pp/dur` | Dur*Controller 다수 |
| `/api/pp/faq` | FaqController |
| `/api/pp/main` | 메인 콘텐츠 |
| `/api/pp/popup` | 팝업 |
| `/api/pp/search` | IntegratedSearchController |
| `/api/pp/workAccessLog` | WorkAccessLogController |
| `/api/pp/atch` | AtchController |
| `/api/pp/dshstyDclr` | 부정신고 |
| `/api/pp/opnn` | OpnnController |
| `/api/pp/dgstfn` | DgstfnExmnController |
| `/api/pp/stt` | TrmsSttController |
| `/api/pp/dep` | 조직도 등 |
| `/api/pp/form` | FormController |
| `/api/pp/com` | ComCdController |
| `/api/pp/exprt` | 전문가 과제·승인 등 |
| `/api/pp/inst` | 기관·기관과제 |
| `/api/pp/hstry` | PrvcAcsHstryController |
| 기타 | `task`, `emp`, `dmn`, `trm`, `word` 등 (관리·확장 기능) |

---

## 3. 전역·공통 (한·영 공통)

앱 최초 진입 및 레이아웃에서 공통으로 사용됩니다.

| HTTP | 경로 (PP 상대) | 용도 | 주요 호출 위치 |
|------|----------------|------|----------------|
| POST | `/auth/selectMenuList` | GNB/LNB 메뉴 트리 | `MenuGate`, `Router` LangGuard |
| GET | `/auth/anyid/ssoInfo` | SSO/Any-ID 컨텍스트 | `MenuGate`, `Router` SsoInfoSync / LangGuard |
| POST | `/main` | 메인 영역 콘텐츠 | `Home` |
| POST | `/popup/selectPopupList` | 팝업 | 레이아웃/홈 등 |
| GET/POST | `/notice` | 공지 영역 | `noticeApi` 사용 화면 |
| POST | `/pst/selectPstList` | 메인 게시 요약 등 | `Home` 등 |
| POST | `/workAccessLog/insert` | 업무 접속 이력 | `Router` RouteWorkAccessLogger |
| POST | `/search/getIntegratedSearchJson` | 통합검색 | `/pp/:lang/search/IntegratedSearch` |

---

## 4. 한국어 메뉴 기준 (`langSeCd: KOR`)

메뉴 명은 관리 시스템의 **`menuNm`**, 화면은 **`menuUrlAddr`** 기준으로 매핑합니다.  
**외부 URL**(`https://...`)만 있는 메뉴는 **본 PP FE REST를 호출하지 않습니다.**

### 4.1 CMS 콘텐츠 화면 (`/pp/ko/cms/CmsPage/:contsSn`)

메뉴 예: 이상사례 보고란?, KAERS란?, DUR 이해, 각종 안내 CMS 페이지, 시연메뉴 하위 `cms0148`~`cms0155` 등.

| HTTP | 경로 | 용도 |
|------|------|------|
| POST | `/cms/getCms` | `contsSn` 등으로 본문 조회 (`CmsPage`) |

### 4.2 게시판 — 일반·갤러리·동영상 (`/pp/ko/board/general|gallery|video/:bbsId`)

메뉴 예: 이상사례 보고 자료실, 알림 게시판, 공지·보도·자료실·홍보물 관련 다수.

| HTTP | 경로 | 용도 |
|------|------|------|
| POST | `/pst/selectPstList` | 목록 |
| POST | `/pst/getPst` | 상세 |
| GET | `/api/pp/atch/thumb/...` (화면 URL 조합) | 썸네일·이미지 |

게시 상세·목록에서 **만족도 조사** 등이 붙는 경우 (`DgstfnExnm` 등):

| HTTP | 경로 | 용도 |
|------|------|------|
| POST | `/dgstfn/selectDgstfnExmnList`, `/dgstfn/getDgstfnExmn`, `/dgstfn/insertDgstfnExmn` 등 | 만족도 조사 응답 저장·조회 (`DgstfnExmnApiPaths`) |

### 4.3 DUR 정보 (`/pp/ko/maintask/dur/...`)

| 메뉴 URL 예 | 화면 | HTTP | 경로 |
|-------------|------|------|------|
| `.../DurSearchRoom` | DUR 정보 검색 | POST | `/dur/selectDurSearchRoomList` |
| `.../MyDrugInfo` | 내가 먹는 약 | POST | `/dur/mydrug/select/item`, `/dur/mydrug/select/result` |
| `.../DurProposal` | 의견 제안 | POST | **`/opnn/insertOpnn`** (multipart) |

DUR 공지형 목록·상세 (`DurNoticeList`, `DurNoticeDetail`): 게시판과 동일하게 **`/pst/selectPstList`**, **`/pst/getPst`**.

팝업 라우트: `DurEftgrpDetailPop`, `DurPrdctDetailPop` — DUR 상세 API (`/dur/selectDurEftgrpDetailList` 등, 해당 팝업 컴포넌트·thunks 참조).

### 4.4 FAQ (`/pp/ko/news/FaqNotice`)

| HTTP | 경로 |
|------|------|
| POST | `/faq/selectFaqList` |

### 4.5 조직도 (`/pp/ko/about/AboutOrg`)

| HTTP | 경로 |
|------|------|
| POST | `/dep/selectOrgchtTree` (및 직원 목록 API — `OrgchtThunks`) |

### 4.6 윤리경영 — 클린신고센터

| 메뉴·경로 | HTTP | 경로 |
|-----------|------|------|
| `CleanCenter` (목록) | POST | `/dshstyDclr/selectDshstyDclrList` |
| `CleanForm` (신고 작성, 로그인 필요) | POST | `/dshstyDclr/insertDshstyDclr`, `/stt/...` (약관 최신), `/mbr/getMbrInfo`, `/crypto/decrypto` |
| `CleanCenter/:dclrSn` (상세) | (목록·상세 조회 thunk 경로 — 화면 구현 기준) | `dshstyDclr` 계열 |

### 4.7 시연메뉴 — CDM (`/pp/ko/cdm/...`)

base URL이 **`/api/cm`** 쪽으로 붙는 **`/community/*`** 경로입니다.

| 화면 | HTTP | 경로 (CDM community 상대) |
|------|------|----------------------------|
| 공지·보도·통합정보 보드 | POST | `/community/board/selectList`, `selectDetail`, `increaseViewCount` |
| FAQ | POST | `/community/faq/selectList`, `selectDetail`, `increaseViewCount` |
| Q&A | POST | `/community/qna/selectList`, `selectDetail`, `insertQna`, `updateQna`, `deleteQna`, `selectAnswer`, `increaseViewCount` |
| 과제제안 | POST | `/community/asmtprp/selectList`, `selectDetail`, `insertAsmtPrp`, `updateAsmtPrp`, `deleteAsmtPrp`, `selectAnswer`, `increaseViewCount` |
| 첨부 다운로드 (링크) | GET | `{CDM base}/common/file/download/{atchFileId}` |

### 4.8 이상사례 통계 (`/pp/ko/adverse/statistics/...`)

(메뉴 JSON에 별도 leaf가 없을 수 있으나 라우트 존재)

| HTTP | 경로 |
|------|------|
| POST | `/pst/selectPstList`, `/pst/getPst` |

### 4.9 외부 링크만 있는 한국어 메뉴

예: 식약처 `nedrug`, `open.drugsafe`, `open.go.kr`, `ltfu.mfds` 등 — **PP FE REST 미사용**.

---

## 5. 영문 메뉴 기준 (`langSeCd: ENG`)

영문 라우트는 주로 **`/pp/en/...`** 이며, **동일 PP API**를 사용하는 경우가 많습니다.

| 메뉴 유형 | menuUrlAddr 예 | 사용 API (한국어 절과 동일 패턴) |
|-----------|----------------|----------------------------------|
| Introduction of KIDS / Pharmacovigilance 등 CMS | `/pp/en/cms/CmsPage/cms0029` 등 | `POST /cms/getCms` |
| About Us | `/pp/en/about/AboutOrg` | `POST /dep/selectOrgchtTree` 등 |
| 게시판 | `/pp/en/board/general/BBS0000026` 등 | `POST /pst/selectPstList`, `/pst/getPst` |
| Center for Narcotics — News | `/pp/en/board/general/...` | 동일 |
| 기타 CMS 소개 페이지 | `/pp/en/cms/CmsPage/...` | `POST /cms/getCms` |

영문 전용 레이아웃(`EngLayout`)에서도 **메뉴 조회·SSO**는 동일하게 **`/auth/selectMenuList`**, **`/auth/anyid/ssoInfo`** 가 사용됩니다.

---

## 6. 메뉴 JSON에 없거나 보조인 화면 (한·영)

인증·회원·전문가 업무 등은 메뉴 API와 별도로 라우팅됩니다.

### 6.1 인증·회원 (`/pp/:lang/auth/...`)

| 기능 | HTTP | 경로 (요약) |
|------|------|-------------|
| 자체 로그인 | POST | CA **`/login`** (PP 아님) |
| 토큰 갱신 | POST | CA **`/refresh`** |
| 로그아웃 | POST | CA **`/logout`** |
| 연장 | POST | CA **`/extend`** |
| Any-ID 초기화·로그인·사용자정보 | POST | `/auth/anyid/init`, `/auth/anyid/login`, `/auth/anyid/userInfo`, `/auth/anyid/getUserInfoFromSsob`, `/auth/anyid/getCiFromSsob` |
| Any-ID 로그아웃 | POST | `/auth/anyid/logout` |
| 간편인증 릴레이 | POST | `/auth/esign/accessInfo`, `/auth/esign/extractInfo` (SDK·설정 경유) |
| 회원·비밀번호·중복확인 | POST | `/mbr/getMbrInfo`, `/mbr/findMbrInfoId`, `/mbr/updateMbrInfoPw`, `/mbr/existMbrInfo`, `/mbr/insertMbrInfo`, `/mbr/insertMbrInfoWithSttyAgtInfo`, `/mbr/updateMbrInfo` 등 |
| 암·복호화 | POST | `/crypto/decrypto` |
| 약관 | POST | `/stt/selectTrmsListForSignUp`, `/stt/selectTrmsSttList` 등 |

### 6.2 전문가 (`/pp/:lang/expert/...`)

| HTTP | 경로 (예) |
|------|-----------|
| POST | `/exprt/task/selectExprtInfo`, `withdrawExprt`, `applyExprtTask`, `selectExprtMenus` 등 (`ExprtTaskThunks`, `ExprtApprovalThunks` 참조) |
| POST | `/exprt/apply`, `existbybrno`, `existbyemail` (자문 신청) |

### 6.3 자문위원 신청 (`/pp/:lang/advice/MbcmtApply`)

| HTTP | 경로 | 서버 |
|------|------|------|
| POST | `/exprt/exprtAplyChk` | UEX base |
| POST | `/exprt/updateExprtAprvStts` | UEX base |

### 6.4 기타

| 화면 | API |
|------|-----|
| `etc/Terms`, `PrivacyPolicy` 등 | `/stt/...`, 필요 시 `/crypto/decrypto` |
| `ExpertMemberApply` | `/exprt/apply/*`, 기관 `/inst/...` 등 (화면 코드 참조) |

---

## 7. `src/api`에 정의된 CRUD성 API에 대하여

`MenuApiPaths`, `Authrt*`, `BbsAuthrt`, `Word`, `TaskCd`, `Emp` 등 **다수의 경로**는 백엔드 관리 기능과 대응하나, **현재 대국민 메뉴용 `pages`에서 직접 쓰이지 않을 수 있습니다.**  
메뉴별 실사용 여부는 `src/features/*/Thunks.ts` 가 해당 `pages`·`components`에서 import 되는지로 확인하는 것이 정확합니다.

---

## 8. 문서 유지보수 방법

1. 새 화면 추가 시 `src/routes/Router.tsx` 경로와 `menuUrlAddr` 매칭을 확인합니다.  
2. `src/api/**/*ApiPaths.ts` 에 경로가 추가되면 본 문서 해당 절에 한 줄 추가합니다.  
3. CDM·CA·UEX는 `shared/utils/https.ts` 의 분기(`AUTH_PATHS`, `CDM_PATHS` 등)를 함께 갱신합니다.

---

**작성 기준**: FE 소스 트리(`pp-fe`) 및 인접 `pp-be` 컨트롤러 매핑 스캔.  
메뉴 JSON 전량을 leaf 단위로 나열하지 않고, **URL 패턴별로 동일 API를 묶어** 기술했습니다. leaf 단위 산출물이 필요하면 `selectMenuList` 응답의 `menuUrlAddr` 별로 본 절의 표를 복제·세분화하면 됩니다.
