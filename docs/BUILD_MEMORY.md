# 빌드 메모리 부족 대응

## 원인 요약

개발계 서버에서 `npm run build` 시 메모리 부족으로 빌드가 중단되는 원인은 다음과 같습니다.

### 1. **폰트 파일 용량 (주요 원인)**

- **위치**: `src/styles/ko/font`, `src/styles/en/font` (→ 공용 `src/styles/font`로 통합됨)
- **규모**: Pretendard GOV 9개 굵기 × (woff2 + woff) = **18개 파일**, 파일당 약 **1.9~2.7MB**
- **총 약 40MB+** 폰트가 SCSS를 통해 번들 그래프에 포함됨
- ko/en 각각 동적 로드(`main.ko.scss`, `main.en.scss`)로 **두 CSS 트리**가 빌드에 포함되어, 동일 폰트가 이중으로 참조될 수 있음
- 빌드 시 에셋 해시/복사 처리로 **순간 메모리 사용이 커짐**

### 2. **Node.js 기본 힙 한도**

- 기본 힙 약 **1.5~2GB**. 로컬 PC는 메모리 여유가 있어 통과하지만, 개발계 서버(컨테이너/VM)는 메모리 제한이 낮을 수 있음.

### 3. **대형 의존성**

- **AG-Grid**, **MUI**, **React**, **Redux** 등이 `manualChunks`로 분리되어 있으나, 압축·청크 생성 시 메모리 사용이 큼.

---

## 적용한 조치

### 1. 빌드 스크립트에 힙 증가 (즉시 효과)

- **파일**: `package.json`
- **변경**: `build` 스크립트를  
  `node --max-old-space-size=4096 node_modules/vite/bin/vite.js build --mode production`  
  로 변경해 **힙 상한 4GB**로 빌드 실행.
- 개발계 서버에서도 동일 스크립트(`npm run build`)를 쓰면 **별도 환경 변수 없이** 4GB 힙이 적용됨.

### 2. 폰트 중복 제거

- **공용 폰트 경로**: `src/styles/font` 한 곳만 사용.
- **수정 파일**: `src/styles/ko/base/_reset.scss`, `src/styles/en/base/_reset.scss`  
  - `url(../font/...)` → `url(../../font/...)` 로 변경해 공용 `src/styles/font` 참조.
- ko/en에 있던 **중복 폰트 파일 제거** → 디스크 용량 및 빌드 시 참조 중복 감소.

---

## 서버/CI에서 추가로 할 수 있는 설정

- 스크립트를 바꾸지 않고 환경 변수만 쓰고 싶다면:
  - **Linux/macOS**: `export NODE_OPTIONS=--max-old-space-size=4096`
  - **Windows (PowerShell)**: `$env:NODE_OPTIONS="--max-old-space-size=4096"`
- 필요 시 `4096`을 `8192`(8GB)로 올려 사용.

---

## 추가 최적화 (선택)

- **폰트**: 실제 사용 굵기만 남기기 (예: Regular, Medium, Bold만 사용 시 나머지 제거).
- **Variable Font**: Pretendard GOV Variable 단일 woff2 사용 시 파일 수·용량 감소.
- **폰트를 번들 밖으로**: `public/fonts`에 두고 HTML/링크로 로드하면 빌드 시 메모리 부담 감소.
