import type { AnyIdUserInfoFromSsobRVO } from '@/features/auth/AnyIdTypes'

/** 회원가입 플로우에서 라우터 state로 전달하는 Any-ID SSOB 복호화 사용자 정보 */
export type SignUpFlowUserInfoState = {
  userInfoFromSsob?: AnyIdUserInfoFromSsobRVO
  /**
   * 만 14세 미만 회원가입 여부. `getSignUpSteps()` 결과는 일반/미성년이 동일해졌으므로
   * 플로우 구분은 반드시 이 플래그(또는 URL의 Junior/General 경로)로 한다.
   */
  signUpIsJunior?: boolean
}

/** 라우터 state 기준 만 14세 미만 회원가입 플로우 여부 */
export function isJuniorSignUpFlowState(
  state: SignUpFlowUserInfoState | null | undefined
): boolean {
  return state?.signUpIsJunior === true
}

/** CI는 `userInfoFromSsob.ci`만 사용 */
export function resolveCiFromSignUpFlowState(
  state: SignUpFlowUserInfoState | null | undefined
): string | undefined {
  const raw = state?.userInfoFromSsob?.ci
  return typeof raw === 'string' && raw.trim() !== '' ? raw : undefined
}
