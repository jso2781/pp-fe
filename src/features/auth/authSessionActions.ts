import { createAction } from '@reduxjs/toolkit'

/**
 * axios 인터셉터 등에서 Any-ID 로그아웃 직후 클라이언트만 정리할 때 사용.
 * (https → AuthSlice 직접 import 시 AuthSlice→AnyIdThunks→https 순환 참조 방지)
 */
export const clearAuthSessionAction = createAction('auth/clearAuthSession')
