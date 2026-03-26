import { TFunction } from 'i18next';

export interface StepItem {
  label: string;
  description: string;
}

/**
 * 회원 가입 단계(steps) 배열을 생성하는 유틸리티 함수
 * @param t - i18n 번역 함수
 * @param isJunior - 만 14세 미만 가입 여부
 * @returns StepItem[] - 단계 배열
 */
export function getSignUpSteps(t: TFunction, isJunior: boolean = false): StepItem[] {
  // const { t } = useTranslation();
  if (isJunior) {
    // 만 14세 미만 가입: 5단계 (법정대리인 동의 후 본인인증 CertifySelf 단계 없이 회원정보 입력으로 진행)
    // step3 인 이전 t('legalGuardAgree') 였지만, t('certifySelf') 로 변경
    return [
      { label: t('step1'), description: t('signUpSelect') },
      { label: t('step2'), description: t('signUpAgree') },
      { label: t('step3'), description: t('certifySelf') },
      { label: t('step4'), description: t('inputMbrInfo') },
      { label: t('step5'), description: t('signUpComplete') },
    ];
  } else {
    // 일반 가입: 5단계
    return [
      { label: t('step1'), description: t('signUpSelect') },
      { label: t('step2'), description: t('signUpAgree') },
      { label: t('step3'), description: t('certifySelf') },
      { label: t('step4'), description: t('inputMbrInfo') },
      { label: t('step5'), description: t('signUpComplete') },
    ];
  }
}
