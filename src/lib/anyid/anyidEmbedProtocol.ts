/**
 * LegalGuardAgr 전용: 자식(public/anyid-embed.html) ↔ 부모(LegalGuardAgr.tsx) 페이지간 postMessage 프로토콜 정의.
 * - 동일 출처( Same-Origin ) iframe만 사용한다고 가정한다.
 */

/** 프로토콜 버전 */
export const ANYID_EMBED_PROTOCOL_V = 1 as const

/** 부모(LegalGuardAgr.tsx) → 자식(anyid-embed.html) */
export const ANYID_EMBED_PARENT_SOURCE = 'pp-anyid-embed-parent' as const

/** 자식(anyid-embed.html) → 부모(LegalGuardAgr.tsx) */
export const ANYID_EMBED_CHILD_SOURCE = 'pp-anyid-embed' as const

/** iframe 두 개(신청인 / 법정대리인)를 구분해 부모(LegalGuardAgr.tsx)가 메시지 라우팅·로그에 사용 */
export type LegalGuardAnyIdEmbedRole = 'applicant' | 'guardian'

/**
 * 부모(LegalGuardAgr.tsx)가 자식에게 보내는 `INIT` 본문 — `window.AnyidC.LOAD_MODULE(...)` 에 그대로 전달되는 옵션.
 * (Any-ID SDK가 요구하는 필드명과 동일하게 유지)
 */
export type AnyidEmbedInitParams = {
  /** Any-ID 설정 JSON URL (`cfg` 인자) */
  cfg: string
  /** 거래·세션 식별자, 보통 `tag` 와 동일 값 */
  txId: string
  /** 성공 콜백 payload 와 매칭·서버 연동용 식별자 */
  tag: string
  /** 인증 수준 등 SDK 옵션 */
  lvl: number
  /**
   * 0: 통합로그인 토글·사용자 등록/관리(#anyidtoggle/#anyidinfo) 마운트(테마 4.1.x)
   * 1: 위 블록 미마운트 — 본인인증(모바일신분증·간편인증) 위주 UI
   */
  bypass: number
  /** 정부 통합로그인 스위치 초기 on/off (`toggle: false` → 미사용) */
  toggle: boolean
  /** 토글 행 자체 표시 여부(SDK `toggleSwitch.show`). `bypass:0` 일 때 기본 true 이므로 숨기려면 false */
  show?: boolean
  /** 위젯 테마 버전 문자열 */
  theme: string
  /** 인증 완료 후 리다이렉트 기준이 되는 부모 페이지 URL */
  redirect_uri: string
}

/**
 * 부모(LegalGuardAgr.tsx) → 자식(anyid-embed.html) 로만 보내는 메시지 형태.
 * 현재는 스크립트 준비 후 `LOAD_MODULE` 을 걸기 위한 `INIT` 한 종류.
 */
export type AnyidEmbedParentToChild =
  | {
      source: typeof ANYID_EMBED_PARENT_SOURCE
      v: typeof ANYID_EMBED_PROTOCOL_V
      /** 부모 페이지에서 전달한 Any-ID 인증영역 초기화 파라메터(`AnyidEmbedInitParams`)로 Any-ID 인증영역의 SDK 초기화 */
      type: 'INIT'
      payload: AnyidEmbedInitParams
    }

/**
 * 자식(anyid-embed.html) → 부모(LegalGuardAgr.tsx) 로 보내는 메시지 형태.
 * `source` / `v` / `role` 으로 프로토콜·어느 iframe 인지 구분하고, `type` 별로 처리 분기.
 */
export type AnyidEmbedChildToParent =
  | {
      source: typeof ANYID_EMBED_CHILD_SOURCE
      v: typeof ANYID_EMBED_PROTOCOL_V
      role: LegalGuardAnyIdEmbedRole
      /** manifest·vendor·app 로드 후 `AnyidC.LOAD_MODULE` 사용 가능 — 이후 부모가 `INIT` 송신 */
      type: 'READY'
    }
  | {
      source: typeof ANYID_EMBED_CHILD_SOURCE
      v: typeof ANYID_EMBED_PROTOCOL_V
      role: LegalGuardAnyIdEmbedRole
      /** 본인인증 성공 시 Any-ID 가 넘긴 결과(예: ssob), 부모에서 `getAnyIdUserInfoFromSsob` 등에 사용 */
      type: 'SUCCESS'
      tag: string
      payload: unknown
    }
  | {
      source: typeof ANYID_EMBED_CHILD_SOURCE
      v: typeof ANYID_EMBED_PROTOCOL_V
      role: LegalGuardAnyIdEmbedRole
      /** `LOAD_MODULE` 의 `fail` 콜백과 동일 */
      type: 'FAIL'
      tag: string
      payload: unknown
    }
  | {
      source: typeof ANYID_EMBED_CHILD_SOURCE
      v: typeof ANYID_EMBED_PROTOCOL_V
      role: LegalGuardAnyIdEmbedRole
      /** SDK 내부 단계 로그(디버그), 과다 출력은 부모에서 디듀프 가능 */
      type: 'LOG'
      tag: string
      payload: unknown
    }
  | {
      source: typeof ANYID_EMBED_CHILD_SOURCE
      v: typeof ANYID_EMBED_PROTOCOL_V
      role: LegalGuardAnyIdEmbedRole
      /** 스크립트 로드 실패·`AnyidC` 준비 타임아웃 등 임베드 페이지 측 치명 오류 */
      type: 'ERROR'
      message: string
    }

/** 부모: 자식 메시지 origin 검사 — 동일 출처 임베드만 허용 */
export function isTrustedEmbedOrigin(eventOrigin: string, appOrigin: string): boolean {
  return eventOrigin === appOrigin
}
