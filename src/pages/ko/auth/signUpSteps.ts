import { TFunction } from 'i18next';

export interface StepItem {
  label: string;
  description: string;
}

/**
 * 회원 가입 단계(steps) 배열을 생성하는 유틸리티 함수.
 * 일반(14세 이상) / 만 14세 미만 모두 동일한 5단계 UI를 쓰므로 배열은 하나이며,
 * 유형 구분은 `SignUpFlowUserInfoState.signUpIsJunior` 로 한다.
 */
export function getSignUpSteps(t: TFunction): StepItem[] {
  return [
    { label: t('step1'), description: t('signUpSelect') },
    { label: t('step2'), description: t('signUpAgree') },
    { label: t('step3'), description: t('certifySelf') },
    { label: t('step4'), description: t('inputMbrInfo') },
    { label: t('step5'), description: t('signUpComplete') },
  ];
}
