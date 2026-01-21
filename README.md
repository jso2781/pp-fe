# DrugSafe Portal User UI (React Scaffold)

요구사항 반영:
- React (Vite)
- Redux Toolkit + `combineReducers`로 root reducer 구성
- REST API: axios (`VITE_API_BASE_URL` 사용)
- 목록 화면: AG Grid
- 게시판: 본문 입력 → 실시간 미리보기
- 스타일: SCSS(Sass)

## 실행

```bash
npm install
npm run dev
```

## 환경 변수 (`.env`)

`.env`, `.env.development`, `.env.production` 등은 **보안상 Git에 포함되지 않습니다** (`.gitignore`의 `.env`, `.env.*`).  
레포에는 **예제만** 들어 있습니다.

| 파일 | 용도 |
|------|------|
| `.env.example` | 공통 템플릿 |
| `.env.development.example` | `npm run dev` (개발) |
| `.env.production.example` | `npm run build` (프로덕션) |

**로컬 셋업 (최초 1회):**
```bash
cp .env.development.example .env.development
cp .env.production.example  .env.production
# 필요 시 .env.development, .env.production 안의 값 수정
```

> `vite build --mode product` 처럼 `product` 모드를 쓰면 `.env.product`가 필요합니다. 이때는 `.env.production.example`을 복사해 `.env.product`로 쓰면 됩니다.

**주요 변수:**
- `VITE_API_BASE_URL` — API 베이스 (없으면 `/api`)
- `VITE_APP_BASE` — UI base path (예: `/`, `/pp/`)
- `VITE_APP_ID` — 앱 ID (로그인 등)
- `PROXY_TARGET`, `PROXY_PREFIX` — dev 서버 프록시용 (`vite.config.ts`)

## 데모용 API 응답 형태(예시)

### GET /notice
```json
[{ "id": 1, "title": "공지 제목", "createdAt": "2025-12-16" }]
```

### GET /board
```json
[{ "id": 1, "title": "게시글 제목", "writer": "관리자", "createdAt": "2025-12-16" }]
```
     