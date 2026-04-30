/**
 * One-off: LoginMethod SSO(bypass=0) loading process → Word .docx
 * Run: node scripts/generate-loginmethod-sso-doc.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
} from 'docx'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.join(__dirname, '..', 'docs', 'LoginMethod_SSO_bypass0_로딩프로세스.docx')

const cellBorders = {
  top: { style: BorderStyle.SINGLE, size: 1 },
  bottom: { style: BorderStyle.SINGLE, size: 1 },
  left: { style: BorderStyle.SINGLE, size: 1 },
  right: { style: BorderStyle.SINGLE, size: 1 },
}

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    ...opts,
    children: [new TextRun({ text, size: 22 })],
  })
}

function bullet(text) {
  return new Paragraph({
    spacing: { after: 80 },
    indent: { left: 360, hanging: 360 },
    children: [new TextRun({ text: `• ${text}`, size: 22 })],
  })
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true, size: 28 })],
  })
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 180, after: 100 },
    children: [new TextRun({ text, bold: true, size: 24 })],
  })
}

function codeRun(text) {
  return new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({ text, font: 'Consolas', size: 20 })],
  })
}

const rows = [
  ['단계', 'phase 값', '화면/동작'],
  [
    '1. 진입 조건',
    'preparing (초기)',
    'production + URL에 tx 쿼리 존재 + shouldLoadAnyIdSdk() true. 개발 시 VITE_SHOW_ANYID_AREA 등으로 Any-ID 영역 표시.',
  ],
  [
    '2. OIDC 선행 (production만)',
    'redirecting → (재진입 후 preparing)',
    'production에서 tx가 없으면 /oidc/auth?end_point=… 로 이동. KMS 등 인증 후 LoginMethod로 돌아오며 tx 부여.',
  ],
  [
    '3. Any-ID init API',
    'preparing',
    'getAnyIdInit({ tx }) — 동일 tx는 Promise 캐시. 실패 시 phase=error.',
  ],
  [
    '4. SDK 스크립트 로드',
    'preparing 유지',
    'useAnyIdSdkReady: manifest → vendor → app 로드 후 waitForAnyidC로 window.AnyidC.LOAD_MODULE 사용 가능까지 대기.',
  ],
  [
    '5. 준비 완료',
    'ready',
    'anyIdSdkReady && (anyidInit.txId === tx) 후 DOM에 #anyidc 컨테이너 렌더.',
  ],
  [
    '6. LOAD_MODULE (SSO)',
    'ready',
    'AnyidC.LOAD_MODULE({ … bypass: anyidInit.bypass ?? 0 … }). SSO 모드에서는 bypass=0(백엔드 init 응답 기준).',
  ],
  [
    '7. 인증 성공 콜백',
    '-',
    'success에서 step이 있으면 authComplete일 때만 처리. postAnyIdLogin(ssob, tag, ci) → LoggedIn 시 /pp/ko, SignUpSel 시 회원선택 화면.',
  ],
  [
    '8. 실패',
    'error',
    'fail 콜백 또는 init 실패 시. 사용자에게 새로고침 안내.',
  ],
]

const table = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  rows: rows.map(
    (cells, ri) =>
      new TableRow({
        children: cells.map(
          (c) =>
            new TableCell({
              borders: cellBorders,
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: c,
                      bold: ri === 0,
                      size: 20,
                    }),
                  ],
                }),
              ],
            })
        ),
      })
  ),
})

const doc = new Document({
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: 'LoginMethod — SSO 모드 (LOAD_MODULE, bypass=0) 로그인 화면 로딩 프로세스',
              bold: true,
              size: 32,
            }),
          ],
        }),
        p('문서 대상: src/pages/ko/auth/LoginMethod.tsx'),
        p('SSO 모드 정의: production에서 URL에 tx가 있는 경우(또는 OIDC 처리 후 재진입). devEmbedLogin( tx 없음 + 개발 )은 bypass=1 경로로 본 문서 범위外.'),
        p('핵심: bypass 값은 서버 getAnyIdInit(anyidInit) 응답의 bypass를 사용하며, 기본값은 0. 즉 SSO 연동 시 LOAD_MODULE에 bypass: 0이 전달되는 것이 일반적입니다.'),

        h2('1. 전제 조건'),
        bullet('shouldLoadAnyIdSdk() === true (Any-ID 영역 노출)'),
        bullet('sdkEnabled = showAnyIdArea && (!isProd || hasUrlTx) — production에서는 반드시 tx 필요'),
        bullet('hasUrlTx === true 일 때 SSO 분기: devEmbedLogin === false'),

        h2('2. phase 상태 머신'),
        bullet('local: Any-ID 영역 비표시 환경'),
        bullet('redirecting: production에서 tx 없음 → /oidc/auth 리다이렉트 중'),
        bullet('preparing: init 진행 또는 SDK 로딩 대기(스켈레톤 UI)'),
        bullet('ready: LOAD_MODULE 호출 직전, #anyidc 마운트'),
        bullet('error: init 실패 또는 LOAD_MODULE fail'),

        h2('3. 단계별 처리 순서'),
        table,

        h2('4. LOAD_MODULE 인자 요약 (SSO / bypass=0 경로)'),
        codeRun(
          'Object.assign({ contextRoot, success, fail, log, redirect_uri, cfg, txId, tag, lvl, bypass: 0, toggle, theme }, anyidInit, { success, fail, log })'
        ),
        p(
          'txId·tag·lvl·cfg·toggle·theme·bypass 등은 anyidInit(백엔드) 우선. 콜백 success/fail/log는 클라이언트가 최종 덮어씀.',
        ),

        h2('5. window.anyidAdaptor 역할'),
        p(
          'LOAD_MODULE 호출 전 adaptor 객체를 설정: sso(ssoInfo), success(내부적으로 authComplete 및 postAnyIdLogin 1회 가드).',
        ),

        h2('6. LOAD_MODULE 1회 호출 보장'),
        p(
          'loadModuleCalledRef: 동일 세션에서 중복 호출 방지. tx 또는 devLoginTag 변경 시 loadModuleCalledRef·anyIdLoginOnceRef 리셋(StrictMode 이중 마운트 대비).',
        ),

        h2('7. 화면(UI) 매핑'),
        bullet('redirecting: "인증 페이지로 이동 중…" 전체 화면'),
        bullet('preparing: #anyidc 영역에 스켈레톤 + "로그인 준비 중…"'),
        bullet('ready: 빈 div#anyidc — SDK가 위젯 마운트'),
        bullet('error: 오류 문구'),
        bullet('우측: 아이디 로그인(내부 /pp/ko/auth/Login) 카드는 병행 표시'),

        h3('참고 파일'),
        p('• useAnyIdSdkReady.ts — SDK 준비'),
        p('• AnyIdThunks.ts — getAnyIdInit, postAnyIdLogin'),
        p('• ensureAnyIdAssets.ts / waitForAnyidC — AnyidC.LOAD_MODULE 가용성'),

        new Paragraph({
          spacing: { before: 300 },
          children: [
            new TextRun({
              text: `생성일: ${new Date().toISOString().slice(0, 10)}  (자동 생성 스크립트: scripts/generate-loginmethod-sso-doc.mjs)`,
              italics: true,
              size: 18,
              color: '666666',
            }),
          ],
        }),
      ],
    },
  ],
})

const buf = await Packer.toBuffer(doc)
fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, buf)
console.log('Wrote:', outPath)
