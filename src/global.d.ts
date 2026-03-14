export {}

declare global {
  interface Window {
    // Any-ID SDK에서 주입하는 전역
    AnyidC?: {
      LOAD_MODULE?: (opts: {
        cfg: string
        txId: string
        tag: string
        lvl: number
        bypass?: number
        toggle?: boolean
        theme?: string
        redirect_uri?: string
        success?: (data: any) => void
        fail?: (err: any) => void
        log?: (data: any) => void
        // 필요하면 옵션 추가
        [key: string]: any
      }) => void
      [key: string]: any
    }

    anyidAdaptor?: {
      sso?: Record<string, unknown>
      success: (data: { ssob?: string } | null | undefined) => void | Promise<void>
    }
    
    //리액트 dom으로 관리되지않는 innerHTML 내부 이벤트 처리를 위한 전역함수.
    goToScroll: (className: string) => void;
  }
}