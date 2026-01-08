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

## API 설정

기본 axios baseURL:
- `.env`의 `VITE_API_BASE_URL` 값이 있으면 그 값을 사용
- 없으면 `/api` 사용

예시:
```
VITE_API_BASE_URL=https://example.com/api
```

## 데모용 API 응답 형태(예시)

### GET /notice
```json
[{ "id": 1, "title": "공지 제목", "createdAt": "2025-12-16" }]
```

### GET /board
```json
[{ "id": 1, "title": "게시글 제목", "writer": "관리자", "createdAt": "2025-12-16" }]
```
     