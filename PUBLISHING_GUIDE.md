# 퍼블리싱 가이드 문서

## 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [디렉토리 구조](#디렉토리-구조)
3. [레이아웃 구조](#레이아웃-구조)
4. [라우팅 구조](#라우팅-구조)
5. [스타일링 시스템](#스타일링-시스템)
6. [색상 시스템](#색상-시스템)
7. [타이포그래피](#타이포그래피)
8. [컴포넌트 구조](#컴포넌트-구조)
9. [이미지 경로](#이미지-경로)
10. [다국어 처리](#다국어-처리)
11. [반응형 디자인](#반응형-디자인)
12. [공통 컴포넌트](#공통-컴포넌트)
13. [페이지 구조](#페이지-구조)
14. [퍼블리싱 작업 시 주의사항](#퍼블리싱-작업-시-주의사항)

---

## 프로젝트 개요

### 기술 스택
- **프레임워크**: React 19.1.1
- **UI 라이브러리**: Material-UI (MUI) 7.3.6
- **라우팅**: React Router DOM 7.9.4
- **상태 관리**: Redux Toolkit + Redux Persist
- **다국어**: i18next + react-i18next
- **스타일링**: SCSS + MUI Theme
- **폰트**: Pretendard (PretendardGOV)
- **빌드 도구**: Vite 7.3.0

### 지원 언어
- 한국어 (ko) - 기본 언어
- 영어 (en)

---

## 디렉토리 구조

```
src/
├── app/                    # Redux store 설정
├── components/             # 공통 컴포넌트
│   ├── common/            # 공통 컴포넌트 (Header, Footer 등)
│   ├── form/              # 폼 관련 컴포넌트
│   ├── gate/              # 게이트 컴포넌트 (MenuGate 등)
│   └── navigation/        # 네비게이션 컴포넌트
├── features/              # 기능별 모듈 (auth 등)
├── i18n/                  # 다국어 설정
├── pages/                 # 페이지 컴포넌트
│   ├── ko/               # 한국어 페이지
│   ├── en/               # 영어 페이지
│   └── screens/          # 퍼블리싱 템플릿 화면
├── routes/                # 라우팅 설정
│   ├── Router.tsx        # 메인 라우터
│   ├── Layout.tsx        # 공통 레이아웃
│   ├── BlankLayout.tsx   # 빈 레이아웃 (Header/Footer 없음)
│   └── muiTheme.ts       # MUI 테마 설정
└── styles/                # 스타일 파일
    ├── ko/               # 한국어 스타일
    └── en/               # 영어 스타일
```

---

## 레이아웃 구조

### 전체 레이아웃 구조

```
┌─────────────────────────────────────────┐
│ Header (고정)                           │
│ ├─ 첫 번째 줄: Screens, 언어 선택       │
│ ├─ 두 번째 줄: 로고, 유틸리티 메뉴      │
│ └─ 세 번째 줄: 메인 메뉴                │
├─────────────────────────────────────────┤
│                                         │
│ Main Content (Outlet)                   │
│                                         │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

### Layout.tsx 구조

```tsx
<ThemeProvider theme={muiTheme}>
  <CssBaseline />
  <Header />
  <Box sx={{ display: 'flex', minHeight: '100vh' }}>
    <Box component="main" sx={{ flex: 1 }}>
      <Toolbar sx={{ display: 'none' }} />
      <Box className="app-main" sx={{ flex: 1 }}>
        <Outlet /> {/* 페이지 컨텐츠 */}
      </Box>
      <Footer />
    </Box>
  </Box>
</ThemeProvider>
```

### 레이아웃 종류

1. **Layout** (`src/routes/Layout.tsx`)
   - Header + Footer 포함
   - 대부분의 페이지에서 사용
   - Container maxWidth: "xl"

2. **BlankLayout** (`src/routes/BlankLayout.tsx`)
   - Header/Footer 없음
   - 로그인 페이지, 프리뷰 페이지 등에서 사용

---

## 라우팅 구조

### URL 구조
- **기본 형식**: `/{lang}/{path}`
- **예시**: 
  - `/ko/notice` - 한국어 공지사항 목록
  - `/en/notice` - 영어 공지사항 목록
  - `/ko/dur/proposal` - 한국어 DUR 제안

### 주요 라우트

| 경로 | 설명 | 레이아웃 |
|------|------|----------|
| `/` | 루트 (자동 리다이렉트) | Layout |
| `/:lang` | 홈 | Layout |
| `/:lang/notice` | 공지사항 목록 | Layout |
| `/:lang/notice/:id` | 공지사항 상세 | Layout |
| `/:lang/board` | 게시판 목록 | Layout |
| `/:lang/board/write` | 게시판 작성 | Layout |
| `/:lang/dur/notice` | DUR 게시판 목록 | Layout |
| `/:lang/dur/notice/:id` | DUR 게시판 상세 | Layout |
| `/:lang/dur/proposal` | DUR 제안 | Layout |
| `/:lang/login` | 로그인 | BlankLayout |
| `/screens` | 퍼블리싱 템플릿 목록 | Layout |
| `/screens/:screenId` | 퍼블리싱 템플릿 뷰어 | Layout |

### 라우팅 파일 위치
- `src/routes/Router.tsx` - 메인 라우터 설정

---

## 스타일링 시스템

### 1. MUI Theme (Material-UI)

**파일 위치**: `src/routes/muiTheme.ts`

#### 주요 설정
```typescript
{
  palette: {
    primary: { main: '#087C80' },    // 메인 컬러
    error: { main: '#BD2C0F' },       // 에러 컬러
  },
  typography: {
    fontFamily: "'Pretendard', sans-serif",
  },
  shape: {
    borderRadius: 6,                  // 기본 border-radius
  }
}
```

#### 컴포넌트 기본값
- **TextField**: `fullWidth`, `margin: 'dense'`, `size: 'small'`, `variant: 'outlined'`
- **FormControl**: `margin: 'dense'`, `size: 'small'`
- **Select**: `size: 'small'`
- **InputLabel**: `shrink: true`
- **Button**: `disableElevation: true`

### 2. SCSS 스타일

**파일 구조**:
```
src/styles/
├── main.ko.scss          # 한국어 메인 스타일
├── main.en.scss          # 영어 메인 스타일
├── ko/
│   ├── base/
│   │   ├── _variables.scss    # CSS 변수
│   │   ├── _reset.scss        # 리셋 스타일
│   │   └── _mixins.scss       # 믹스인
│   ├── layout/
│   │   ├── _header.scss
│   │   ├── _footer.scss
│   │   └── _common.scss
│   └── pages/
│       ├── _home.scss
│       ├── _board.scss
│       └── _dur.scss
└── en/
    └── (동일한 구조)
```

---

## 색상 시스템

### MUI Theme 색상

| 색상 | 값 | 용도 |
|------|-----|------|
| Primary | `#087C80` | 메인 컬러, 버튼, 링크 |
| Error | `#BD2C0F` | 에러 메시지, 필수 표시 |

### SCSS CSS 변수 (한국어)

#### 기본 색상
```scss
--bg: #ffffff;                    // 배경색
--primary: #2563eb;               // 기본 컬러
--danger: #BD2C0F;                // 위험/에러 컬러
--border: #e5e7eb;                // 기본 보더
--muted: #6b7280;                 // 비활성 텍스트
```

#### 버튼 색상
```scss
--btn-bg-1: #087C80;              // 메인 버튼
--btn-bg-1-hover: #0A6C70;       // 메인 버튼 호버
--btn-bg-2: #414343;              // 보조 버튼
--btn-bg-2-hover: #363A3A;        // 보조 버튼 호버
--btn-bg-3: #ffffff;              // 아웃라인 버튼
--btn-bg-3-hover: #EDF8F8;        // 아웃라인 버튼 호버
--btn-bg-4: #1E2124;              // 다크 버튼
--btn-bg-4-hover: #CDD1D5;        // 다크 버튼 호버
```

#### 텍스트 색상
```scss
--color-text-1: #1E2124;          // 기본 텍스트
--color-text-2: #087C80;          // 강조 텍스트
--color-text-3: #464C53;          // 보조 텍스트
```

#### 보더 색상
```scss
--border-1: #8A949E;               // 강한 보더
--border-2: #CDD1D5;               // 중간 보더
--border-3: #087C80;               // 강조 보더
--input-border: #D8D8D8;           // 입력 필드 보더
```

#### 폼 요소 색상
```scss
--chk-active-bg: #087C80;         // 체크박스 활성
--radio-active-bg: #087C80;       // 라디오 활성
--switch-active-bg: #087C80;      // 스위치 활성
--placeholder: #8A949E;            // 플레이스홀더
```

### MUI sx prop 사용 예시

```tsx
// 색상 사용
<Box sx={{ color: 'primary.main' }}>텍스트</Box>
<Box sx={{ bgcolor: 'background.paper' }}>배경</Box>
<Box sx={{ borderColor: 'divider' }}>보더</Box>

// 간격 사용 (MUI spacing system: 1 = 8px)
<Box sx={{ p: 2 }}>padding: 16px</Box>
<Box sx={{ m: 1 }}>margin: 8px</Box>
<Box sx={{ gap: 1.5 }}>gap: 12px</Box>
```

---

## 타이포그래피

### 폰트
- **폰트 패밀리**: `'Pretendard', sans-serif`
- **폰트 파일 위치**: `src/styles/ko/font/`, `src/styles/en/font/`
- **포함된 웨이트**: Thin, ExtraLight, Light, Regular, Medium, SemiBold, Bold, ExtraBold, Black

### 폰트 크기 (CSS 변수)

```scss
--fs-13: 13px;
--fs-14: 14px;
--fs-15: 15px;
--fs-16: 16px;
--fs-17: 17px;
--fs-18: 18px;
--fs-20: 20px;
--fs-24: 24px;
--fs-28: 28px;
--fs-32: 32px;
```

### 폰트 웨이트

```scss
--fw-400: 400;  // Regular
--fw-500: 500;  // Medium
--fw-600: 600;  // SemiBold
--fw-700: 700;  // Bold
```

### 반응형 폰트 크기 (모바일)

모바일(768px 이하)에서는 폰트 크기가 자동으로 조정됩니다:
- `--fs-14` → `13px`
- `--fs-16` → `14px`
- `--fs-20` → `17px`
- `--fs-24` → `18px`
- 등등...

### MUI Typography 사용

```tsx
<Typography variant="h1">제목 1</Typography>
<Typography variant="h2">제목 2</Typography>
<Typography variant="body1">본문 1</Typography>
<Typography variant="body2">본문 2</Typography>
<Typography variant="caption">캡션</Typography>
```

---

## 컴포넌트 구조

### 공통 컴포넌트 위치
- `src/components/common/` - Header, Footer, SkipNavigation 등
- `src/components/form/` - FormLayout, FormSection 등
- `src/components/navigation/` - AppNavDrawer, SectionSideNav 등

### 주요 공통 컴포넌트

#### Header (`src/components/common/Header.tsx`)
- **구조**: 3줄 구성
  1. 첫 번째 줄: Screens 버튼, 언어 선택
  2. 두 번째 줄: 로고, 통합검색, 회원가입, 로그인
  3. 세 번째 줄: 메인 메뉴 (주요 업무, 정보공개, 기관소식, 기관소개)
- **로고 이미지**:
  - 한국어: `/img/logo.png`
  - 영어: `/img/logo_eng02.png`
- **메뉴**: Rest API에서 동적으로 가져옴

#### Footer (`src/components/common/Footer.tsx`)
- **구성 요소**:
  - 로고
  - 기관 정보 (주소, 사업자등록번호, 전화번호, 팩스)
  - 정보 링크 (CCTV 정책, 이메일 수집 거부, 오시는 길)
  - 법적 링크 (개인정보처리방침, 이용약관)
  - SNS 링크 (YouTube, Instagram, Blog)
  - 저작권 정보
- **로고 이미지**: `/img/footer_logo.png`

#### FormLayout (`src/components/form/FormLayout.tsx`)
- **FormPage**: 페이지 레이아웃 (제목, 설명, 액션 버튼)
- **FormSection**: 섹션 레이아웃 (제목, 설명)

---

## 이미지 경로

### 정적 이미지 경로
모든 이미지는 `public/img/` 디렉토리에 위치합니다.

### 주요 이미지

| 이미지 | 경로 | 용도 |
|--------|------|------|
| 로고 (한국어) | `/img/logo.png` | Header 로고 |
| 로고 (영어) | `/img/logo_eng02.png` | Header 로고 (영어) |
| 푸터 로고 | `/img/footer_logo.png` | Footer 로고 |

### 이미지 사용 예시

```tsx
// Header 로고
<img
  src={i18nInstance.language === 'ko' ? '/img/logo.png' : '/img/logo_eng02.png'}
  alt={`KIDS ${t('kidsName')}`}
  style={{ height: 'auto', maxHeight: '40px' }}
/>

// Footer 로고
<img
  src="/img/footer_logo.png"
  alt={`KIDS ${t('kidsName')}`}
/>
```

---

## 다국어 처리

### i18next 설정
- **설정 파일**: `src/i18n/i18n.ts`
- **번역 파일**: `src/i18n/locales/ko/`, `src/i18n/locales/en/`

### 사용 방법

```tsx
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation()
  
  return <div>{t('keyName')}</div>
}
```

### 언어 감지 및 라우팅
- URL의 첫 번째 세그먼트로 언어 구분: `/ko/...`, `/en/...`
- 브라우저 언어 자동 감지
- 언어 변경 시 URL 자동 업데이트

### 언어별 스타일
- 한국어: `src/styles/ko/`
- 영어: `src/styles/en/`
- 각 언어별로 독립적인 SCSS 파일 사용

---

## 반응형 디자인

### MUI Breakpoints

| Breakpoint | 값 | 용도 |
|------------|-----|------|
| xs | 0px | 모바일 |
| sm | 600px | 태블릿 |
| md | 900px | 데스크톱 |
| lg | 1200px | 큰 데스크톱 |
| xl | 1536px | 매우 큰 데스크톱 |

### 사용 예시

```tsx
// MUI sx prop
<Box sx={{
  display: { xs: 'none', md: 'flex' },  // 모바일: 숨김, 데스크톱: 표시
  width: { xs: '100%', md: '50%' },     // 모바일: 100%, 데스크톱: 50%
}}>

// Container
<Container maxWidth="xl">  // 최대 너비: 1536px
```

### SCSS 미디어 쿼리

```scss
@media (max-width: 768px) {
  // 모바일 스타일
  // 폰트 크기 자동 조정됨
}
```

### Container 설정

#### MUI Container
- **maxWidth**: `"xl"` (1536px)
- **기본 padding**: `px: 2` (16px)
- **사용 예시**:
```tsx
<Container maxWidth="xl" sx={{ py: 4 }}>
  {/* 컨텐츠 */}
</Container>
```

#### SCSS Container 믹스인
```scss
// 기본 컨테이너 (1200px)
@include mixins.container;

// 커스텀 너비
@include mixins.container(1400px);
```

**CSS 변수**:
- `--container: 1200px` (한국어)
- `--container-full: 100%` (영어)

### 주요 반응형 요소

1. **Header**
   - 모바일: 햄버거 메뉴 표시
   - 데스크톱: 전체 메뉴 표시

2. **Container**
   - 기본: `maxWidth="xl"` (1536px)
   - 내부 padding: `px: 2` (16px)

3. **Grid 시스템**
   - MUI Grid2 사용
   - `size={{ xs: 12, md: 6 }}` 형식으로 반응형 설정

---

## 공통 컴포넌트

### MUI 컴포넌트 기본 사용법

#### Container
```tsx
<Container maxWidth="xl" sx={{ px: 2 }}>
  {/* 컨텐츠 */}
</Container>
```

#### Box
```tsx
<Box sx={{ p: 2, bgcolor: 'background.paper' }}>
  {/* 컨텐츠 */}
</Box>
```

#### Stack
```tsx
<Stack direction="row" spacing={2} alignItems="center">
  {/* 아이템들 */}
</Stack>
```

#### Button
```tsx
<Button
  variant="contained"  // 또는 "outlined", "text"
  size="small"         // 또는 "medium", "large"
  startIcon={<Icon />}
>
  버튼 텍스트
</Button>
```

#### Typography
```tsx
<Typography variant="h6" sx={{ fontWeight: 600 }}>
  제목
</Typography>
```

### 커스텀 컴포넌트

#### FormPage
```tsx
import { FormPage } from '@/components/form/FormLayout'

<FormPage
  title="페이지 제목"
  description="페이지 설명"
  actions={<Button>저장</Button>}
>
  {/* 폼 컨텐츠 */}
</FormPage>
```

**특징**:
- 제목, 설명, 액션 버튼을 상단에 배치
- 반응형: 모바일에서는 세로 배치, 데스크톱에서는 가로 배치

#### FormSection
```tsx
import { FormSection } from '@/components/form/FormLayout'

<FormSection
  title="섹션 제목"
  description="섹션 설명"
>
  {/* 섹션 컨텐츠 */}
</FormSection>
```

**특징**:
- Card 컴포넌트로 감싸짐
- 제목과 설명이 상단에 표시
- Divider로 구분

#### FieldGroup
```tsx
import { FieldGroup } from '@/components/form/FormLayout'

<FieldGroup title="필드 그룹 제목">
  {/* 필드들 */}
</FieldGroup>
```

**특징**:
- 필드들을 그룹화
- 작은 제목(caption) 스타일
- 간격 자동 조정

#### PageTitle
```tsx
import PageTitle from '@/components/common/PageTitle'

<PageTitle 
  title={t('pageTitle')} 
  subtitle={t('pageDescription')} 
/>
```

**특징**:
- 페이지 상단 제목과 설명 표시
- `.page-title` 클래스 자동 적용
- `h1` 태그와 `p` 태그로 구성

### SCSS 믹스인

#### container
```scss
@include mixins.container;  // 기본 1200px
@include mixins.container(1400px);  // 커스텀 너비
```

#### sr_only (스크린 리더 전용)
```scss
@include mixins.sr_only;
```
접근성을 위한 스크린 리더 전용 텍스트 숨김

#### btn_type_01
```scss
@include mixins.btn_type_01;
```
기본 버튼 스타일 (높이 64px, 폰트 19px, 폰트 웨이트 700)

#### bullet_list
```scss
@include mixins.bullet_list;
```
불릿 리스트 스타일 (원형 불릿, 왼쪽 패딩 24px)

### 공통 CSS 클래스

#### .page-title
```scss
.page-title h1 {
  margin: 0 0 6px;
  font-size: 24px;
}
.page-title p {
  margin: 0 0 14px;
  color: var(--muted);
}
```

#### .card
```scss
.card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
}
```

#### .alert
```scss
.alert {
  padding: 10px 12px;
  border-radius: 10px;
  margin: 10px 0;
  background: #fff1f2;
  border: 1px solid #fecdd3;
}
.alert--error {
  color: var(--danger);
}
```

#### .ds-container
```scss
.ds-container {
  @include mixins.container;  // 1200px 컨테이너
}
```

---

## 페이지 구조

### 페이지 파일 위치
- 한국어: `src/pages/ko/`
- 영어: `src/pages/en/`

### 페이지 구조 예시

#### 기본 페이지 구조
```tsx
import { Container, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function MyPage() {
  const { t } = useTranslation()
  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box>
        {/* 페이지 컨텐츠 */}
      </Box>
    </Container>
  )
}
```

#### FormPage를 사용한 페이지
```tsx
import { Container } from '@mui/material'
import { FormPage, FormSection } from '@/components/form/FormLayout'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function MyFormPage() {
  const { t } = useTranslation()
  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <FormPage
        title={t('pageTitle')}
        description={t('pageDescription')}
        actions={
          <Button variant="contained" onClick={handleSave}>
            {t('save')}
          </Button>
        }
      >
        <FormSection
          title={t('sectionTitle')}
          description={t('sectionDescription')}
        >
          {/* 폼 필드들 */}
        </FormSection>
      </FormPage>
    </Container>
  )
}
```

#### 페이지 제목 사용 예시
```tsx
<div className="page-title">
  <h1>{t('pageTitle')}</h1>
  <p>{t('pageDescription')}</p>
</div>
```

### 주요 페이지 목록

#### 한국어 (ko)
- `Home.tsx` - 홈
- `notice/NoticeList.tsx` - 공지사항 목록
- `notice/NoticeDetail.tsx` - 공지사항 상세
- `board/BoardList.tsx` - 게시판 목록
- `board/BoardWrite.tsx` - 게시판 작성
- `dur/DurNoticeList.tsx` - DUR 게시판 목록
- `dur/DurNoticeDetail.tsx` - DUR 게시판 상세
- `dur/DurProposal.tsx` - DUR 제안
- `Login.tsx` - 로그인
- `NotFound.tsx` - 404 페이지

#### 영어 (en)
- 동일한 구조의 영어 버전 페이지들

---

## 퍼블리싱 작업 시 주의사항

### 1. 레이아웃 사용
- 대부분의 페이지는 `Layout` 사용 (Header + Footer 자동 포함)
- 로그인, 프리뷰 등 특수 페이지는 `BlankLayout` 사용

### 2. 언어 처리
- 모든 텍스트는 `t('key')` 함수 사용
- 하드코딩된 텍스트 금지
- 언어별로 다른 이미지 사용 시 조건부 렌더링

### 3. 스타일링 우선순위
1. **MUI sx prop** - 인라인 스타일 (가장 우선)
2. **MUI Theme** - 전역 테마 설정
3. **SCSS 파일** - 언어별 스타일 파일
4. **CSS 변수** - `--variable-name` 형식

### 4. 반응형 디자인
- 모바일 우선 설계
- MUI breakpoints 활용
- `display: { xs: '...', md: '...' }` 패턴 사용

### 5. 색상 사용
- MUI Theme 색상 우선 사용: `color: 'primary.main'`
- SCSS 변수 사용: `color: var(--color-text-1)`
- 하드코딩된 색상 값 지양

### 6. 간격 시스템
- MUI spacing system 사용: `1 = 8px`
- 예: `p: 2` = 16px, `gap: 1.5` = 12px
- 일관성 유지

### 7. 폰트 사용
- Pretendard 폰트 사용
- CSS 변수로 폰트 크기 관리: `font-size: var(--fs-16)`
- 폰트 웨이트: `font-weight: var(--fw-600)`

### 8. 이미지 경로
- 모든 이미지는 `/img/` 경로 사용
- `public/img/` 디렉토리에 실제 파일 위치
- 언어별 다른 이미지 사용 시 조건부 처리

### 9. 라우팅
- 모든 라우트는 `/:lang/...` 형식
- `to()` 함수로 언어 경로 생성
- 예: `to('/notice')` → `/ko/notice` 또는 `/en/notice`

### 10. 컴포넌트 import
- 절대 경로 사용: `@/components/...`
- 상대 경로 지양

### 11. 타입 안정성
- TypeScript 사용
- 모든 props에 타입 정의
- `MenuRVO` 등 타입 import하여 사용

### 12. 접근성
- `alt` 속성 필수 (이미지)
- `aria-label` 사용 (아이콘 버튼)
- 시맨틱 HTML 사용

---

## 체크리스트

퍼블리싱 작업 시 확인사항:

- [ ] 레이아웃이 올바르게 적용되었는가? (Layout vs BlankLayout)
- [ ] 모든 텍스트가 `t('key')` 함수로 번역 처리되었는가?
- [ ] 반응형 디자인이 적용되었는가? (모바일/태블릿/데스크톱)
- [ ] 색상이 MUI Theme 또는 CSS 변수로 사용되었는가?
- [ ] 간격이 MUI spacing system을 사용하는가?
- [ ] 폰트가 Pretendard로 설정되었는가?
- [ ] 이미지 경로가 `/img/...` 형식인가?
- [ ] 라우팅이 `/:lang/...` 형식인가?
- [ ] 언어별로 다른 이미지가 올바르게 처리되었는가?
- [ ] 접근성 속성(alt, aria-label)이 포함되었는가?
- [ ] TypeScript 타입 오류가 없는가?

---

## 참고 자료

### 주요 파일 위치
- **라우팅**: `src/routes/Router.tsx`
- **레이아웃**: `src/routes/Layout.tsx`
- **테마**: `src/routes/muiTheme.ts`
- **헤더**: `src/components/common/Header.tsx`
- **푸터**: `src/components/common/Footer.tsx`
- **스타일 변수**: `src/styles/ko/base/_variables.scss`

### 외부 링크
- [Material-UI 공식 문서](https://mui.com/)
- [React Router 공식 문서](https://reactrouter.com/)
- [i18next 공식 문서](https://www.i18next.com/)

---

## 실제 페이지 예시

### 홈 페이지 구조
```tsx
// src/pages/ko/Home.tsx
import { Container, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()
  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box>
        {/* 홈 페이지 컨텐츠 */}
      </Box>
    </Container>
  )
}
```

### 공지사항 목록 페이지 구조
```tsx
// src/pages/ko/notice/NoticeList.tsx
import { Container } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function NoticeList() {
  const { t } = useTranslation()
  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <div className="page-title">
        <h1>{t('notice')}</h1>
        <p>{t('noticeDescription')}</p>
      </div>
      {/* 목록 컨텐츠 */}
    </Container>
  )
}
```

---

## 빠른 참조

### 자주 사용하는 패턴

#### 1. 페이지 래퍼
```tsx
<Container maxWidth="xl" sx={{ py: 4 }}>
  {/* 컨텐츠 */}
</Container>
```

#### 2. 페이지 제목
```tsx
<div className="page-title">
  <h1>{t('title')}</h1>
  <p>{t('description')}</p>
</div>
```

#### 3. 카드 레이아웃
```tsx
<div className="card">
  {/* 카드 컨텐츠 */}
</div>
```

#### 4. 알림 메시지
```tsx
<div className="alert alert--error">
  {t('errorMessage')}
</div>
```

#### 5. 버튼 그룹
```tsx
<Stack direction="row" spacing={2}>
  <Button variant="contained">{t('save')}</Button>
  <Button variant="outlined">{t('cancel')}</Button>
</Stack>
```

#### 6. 반응형 그리드
```tsx
<Grid container spacing={2}>
  <Grid size={{ xs: 12, md: 6 }}>
    {/* 컨텐츠 */}
  </Grid>
</Grid>
```

---

**문서 작성일**: 2024년
**프로젝트**: pp-fe
**버전**: 0.1.0
