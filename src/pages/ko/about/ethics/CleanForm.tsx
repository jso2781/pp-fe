/**
 * 화면ID: KIDS-PP-US-IN-18
 * 화면명: 클린신고센터 등록
 * 화면경로: /ko/about/ethics/CleanForm
 * 화면설명: 클린신고센터 등록
 */
import DepsLocation from "@/components/common/DepsLocation";
import Lnb from "@/components/common/Lnb";
import LnbSectionTitle from '@/components/common/LnbSectionTitle'
import { insertDshstyDclr } from "@/features/dclr/DshstyDclrThunks";
import type { DshstyDclrPVO } from "@/features/dclr/DshstyDclrTypes";
import { useAppDispatch } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import * as z from 'zod';
import { ZodFormProvider } from "@/components/rhf/ZodFormProvider";
import { useZodForm } from "@/components/rhf/useZodForm";
import RHFTextField from "@/components/rhf/RHFTextField";
import { useDialog } from '@/contexts/DialogContext';
import RHFRadioGroup from "@/components/rhf/RHFRadioGroup";
import { useEffect, useState } from "react";
import i18n from "@/i18n/i18n";
import { getTrmsSttLatest } from "@/features/stt/TrmsSttThunks";
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from "react-i18next";
import { getMbrInfo } from "@/features/mbr/MbrInfoThunks";
import { decrypto } from "@/features/crypto/CryptoThunks";

export default function CleanForm () {
  const [agreeEs, setAgreeEs] = useState<string | null>(null);
  const [agreeCh, setAgreeCh] = useState<string | null>(null);
  const [encptMbrFlnm, setEncptMbrFlnm] = useState<string>('');
  const [encptMbrTelno, setEncptMbrTelno] = useState<string>('');
  const [encptMbrEmlNm, setEncptMbrEmlNm] = useState<string>('');
  const [isProfileDecrypting, setIsProfileDecrypting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showAlert } = useDialog();
  const { t } = useTranslation();
  const { user } = useAuth();

  const currentUrl = location.pathname;

  useEffect(() => {scrollTo(0, 0);}, []);

  useEffect(() => {
    Promise.all([
      dispatch(getTrmsSttLatest({ trmsSttCd: 'CLCT_AGRE_ES_2' })).unwrap(),
      dispatch(getTrmsSttLatest({ trmsSttCd: 'CLCT_AGRE_CH_2' })).unwrap(),
      dispatch(getMbrInfo({ linkInfoIdntfId: getLinkInfoIdntfId() })).unwrap()
    ])
      .then(async ([es, ch, mbrInfo]) => {
        // 일부 환경에서 약관 API가 null을 반환하는 케이스가 있어 방어적으로 처리
        setAgreeEs(es?.trmsSttCn || null);
        setAgreeCh(ch?.trmsSttCn || null);

        // 서버에서 내려온 회원정보는 encpt* (암호문) 이므로, 화면 표시 전에 복호화하여 평문으로 반영
        const encptMbrFlnmRaw = (mbrInfo?.encptMbrFlnm ?? '').trim();
        const encptMbrTelnoRaw = (mbrInfo?.encptMbrTelno ?? '').trim();
        const encptMbrEmlNmRaw = (mbrInfo?.encptMbrEmlNm ?? '').trim();

        if (encptMbrFlnmRaw || encptMbrTelnoRaw || encptMbrEmlNmRaw) {
          setIsProfileDecrypting(true);
          try {
            const r = await dispatch(decrypto({
              ...(encptMbrFlnmRaw ? { encptMbrFlnm: mbrInfo?.encptMbrFlnm } : {}),
              ...(encptMbrTelnoRaw ? { encptMbrTelno: mbrInfo?.encptMbrTelno } : {}),
              ...(encptMbrEmlNmRaw ? { encptMbrEmlNm: mbrInfo?.encptMbrEmlNm } : {}),
            })).unwrap();

            // CleanForm에서는 encpt* 이름을 쓰지만, 화면 표시/입력 값으로는 평문을 사용한다.
            setEncptMbrFlnm(r?.decptMbrFlnm ?? '');
            setEncptMbrTelno(r?.decptMbrTelno ?? '');
            setEncptMbrEmlNm(r?.decptMbrEmlNm ?? '');
          } catch (e) {
            console.error('[CleanForm] failed to decrypto memberInfo', e);
            // 복호화 실패 시 암호문을 화면에 노출하지 않도록 빈 값 처리
            setEncptMbrFlnm('');
            setEncptMbrTelno('');
            setEncptMbrEmlNm('');
          } finally {
            setIsProfileDecrypting(false);
          }
        } else {
          setEncptMbrFlnm('');
          setEncptMbrTelno('');
          setEncptMbrEmlNm('');
        }
      })
      .catch((e) => {
        console.error('[CleanForm] failed to bootstrap terms/memberInfo', e)
        showAlert('화면 초기화 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      });
  }, []);

  const schema = z.object({
    // 초기엔 미선택(undefined)을 허용하되, 제출/검증 시에는 반드시 'Y'만 통과
    agreeRequired: z.enum(['Y', 'N']).optional().superRefine((v, ctx) => {
      if (v == null) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: '동의 여부를 선택해 주세요.' })
        return
      }
      if (v !== 'Y') {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: '동의가 필요합니다.' })
      }
    }),
    // 선택 동의는 미선택(=undefined) 허용. 제출 시 undefined는 'N'으로 간주하여 전송한다.
    agreeOptional: z.enum(['Y', 'N']).optional(),
    encptMbrFlnm: z.string(),
    encptMbrTelno: z.string(),
    encptMbrEmlNm: z.string().trim().email({ message: '이메일 형식이 올바르지 않습니다.' }).or(z.literal('')),
    dclrTtlNm: z.string().trim().min(1, { message: '신고사항 제목을 입력해주세요.' }).max(100, { message: '100자 이내로 입력해주세요.'}),
    dshstyActrFlnm: z.string().trim().min(1, { message: '부정행위자 이름을 입력해주세요.' }).max(100, { message: '100자 이내로 입력해주세요.'}),
    dshstyActPipCn: z.string().trim().min(1, { message: '시기를 구체적을 일시 또는 기간을 입력해주세요.' }).max(100, { message: '100자 이내로 입력해주세요.'}),
    dshstyActPlcCn: z.string().trim().min(1, { message: '부정행위 장소를 입력해주세요.' }).max(100, { message: '100자 이내로 입력해주세요.'}),
    dshstyActCn: z.string().trim().min(1, { message: '부정행위 내용을 입력해주세요.' }).max(3000, { message: '3000자 이내로 입력해주세요.'}),
    addIdntfIdfrNm: z.string().trim().max(100, { message: '100자 이내로 입력해주세요.'}),
    dclrCnIdntyMthdCn: z.string().trim().max(100, { message: '100자 이내로 입력해주세요.'}),
    dshstyActIdntfRsnCn: z.string().trim().max(100, { message: '100자 이내로 입력해주세요.'}),
    dshstyActPrdCn: z.string().trim().max(100, { message: '100자 이내로 입력해주세요.'}),
  });

  type FormValues = z.infer<typeof schema>

  const defaultValues: FormValues = {
    agreeRequired: undefined,
    agreeOptional: undefined,
    encptMbrFlnm: '',
    encptMbrTelno: '',
    encptMbrEmlNm: '',
    dclrTtlNm: '',
    dshstyActrFlnm: '',
    dshstyActPipCn: '',
    dshstyActPlcCn: '',
    dshstyActCn: '',
    addIdntfIdfrNm: '',
    dclrCnIdntyMthdCn: '',
    dshstyActIdntfRsnCn: '',
    dshstyActPrdCn: ''
  }
  
  const form = useZodForm<FormValues>(schema, {
    mode: 'onChange',
    defaultValues,
  });

  // 서버에서 내려온 회원정보(state)가 바뀌면 폼 입력값도 자동 반영
  useEffect(() => {
    form.setValue('encptMbrFlnm', encptMbrFlnm ?? '', { shouldDirty: false, shouldTouch: false, shouldValidate: false })
    form.setValue('encptMbrTelno', encptMbrTelno ?? '', { shouldDirty: false, shouldTouch: false, shouldValidate: false })
    form.setValue('encptMbrEmlNm', encptMbrEmlNm ?? '', { shouldDirty: false, shouldTouch: false, shouldValidate: false })
  }, [encptMbrFlnm, encptMbrTelno, encptMbrEmlNm, form])


  const getLinkInfoIdntfId = (): string => {
    // 클린신고센터 본인인증(/ko/auth/CleanCenterCert)으로부터 전달받은 CI(linkInfoIdntfId)
    const fromState = (location.state as { linkInfoIdntfId?: string } | null)?.linkInfoIdntfId;

    console.log("CleanForm.tsx getLinkInfoIdntfId fromState=", fromState);

    // Any-ID 로그인(lgnSeCd=2)인 경우 auth redux state의 CI(userInfo.linkInfoIdntfId) 반환
    const fromAuth = user?.userInfo?.linkInfoIdntfId;

    return (fromState || fromAuth || '').trim()
  };

  const onSubmit = async (values: FormValues) => {
    // 이메일을 입력한 경우(선택 수집), 선택 동의는 반드시 'Y'여야 함. 미선택(undefined)은 'N'으로 취급.
    if (values.encptMbrEmlNm && values.agreeOptional !== 'Y') {
      form.setError('agreeOptional', { type: 'validate', message: '이메일 수집·동의에 동의가 필요합니다.' }, { shouldFocus: true });
      return;
    }
    const linkInfoIdntfId = getLinkInfoIdntfId()
    if (!linkInfoIdntfId) {
      showAlert('본인확인 정보가 없습니다. 다시 로그인 후 이용해주세요.', '알림', () => {
        navigate(`/pp/${i18n.language}/auth/LoginMethod`);
      })
      return;
    }
    const payload: DshstyDclrPVO = {
      ...values,
      // "개인정보 수집·이용 동의(선택)" 미선택 시에는 'N'으로 전송
      prvcChcAgreYn: values.agreeOptional ?? 'N',
      linkInfoIdntfId
    };
    try {
      await dispatch(insertDshstyDclr(payload)).unwrap();
      showAlert('클린신고서 신청서 제출이 완료되었습니다.', '알림', () => {
        navigate('/pp/ko/about/ethics/CleanCenter');
      });
    } catch(e) {

    } finally {
      form.reset(defaultValues);
    }
  }


  const handleCancle = () => {
    navigate('/pp/ko/about/ethics/CleanCenter');
  }

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">

          {/* Lnb 영역 */}
          <Box className="lnb-wrap">
            <Box className="lnb-menu">
              <Typography component="h2" className="lnb-tit">
                <LnbSectionTitle />
              </Typography>
              <Box className="lnb-list">
                <Lnb currentUrl={currentUrl} />
              </Box>
            </Box>
          </Box>

          {/* 컨텐츠 본문 영역 */}
          <Box className="sub-content">
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
              {/* --- 본문 시작 --- */}
                <section className="pageCont-dur-DurProposal">
                  <p className="fs-18 fw-700">한국의약품안전관리원은 클린신고센터와 관련하여 아래와 같이 개인정보를 수집·이용하고자 합니다.<br/>하단의 내용을 자세히 읽으신 후 동의 여부를 결정하여 주십시오.</p>
                  <ZodFormProvider schema={schema} methods={form}>
                    <Box component="form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                      <Box className="privacy-policy-section">
                        {/* --- 개인정보 수집·동의 (필수) --- */}
                        <Box className="privacy-consent-box" role="group" aria-labelledby="consent-title-required">
                          <Typography id="consent-title-required" className="privacy-consent-box__title">
                            개인정보 수집·이용 동의
                            <Box component="span" className="required" aria-label="필수 입력">(필수)</Box>
                          </Typography>

                          <div dangerouslySetInnerHTML={{ __html: agreeEs || '' }} />

                          <Box className="privacy-consent-box__action">
                            <Typography id="consent-question-required" className="question-text">
                              [필수] 위와 같이 개인정보 수집·동의에 동의하십니까?
                            </Typography>
                            <RHFRadioGroup
                              name="agreeRequired"
                              aria-labelledby="consent-question-required"
                              row
                              options={[
                                { value: 'Y', label: '동의함' },
                                { value: 'N', label: '동의하지 않음' },
                              ]}  
                            />
                          </Box>
                        </Box>

                        {/* --- 개인정보 수집·동의 (선택) --- */}
                        <Box className="privacy-consent-box" role="group" aria-labelledby="consent-title-optional">
                          <Typography id="consent-title-optional" className="privacy-consent-box__title">
                            개인정보 수집·이용 동의
                            <Box component="span" className="optional" aria-label="선택 입력">(선택)</Box>
                          </Typography>

                          <div dangerouslySetInnerHTML={{ __html: agreeCh || '' }} />

                          <Box className="privacy-consent-box__action">
                            <Typography id="consent-question-optional" className="question-text">
                              [선택] 위와 같이 개인정보 수집·동의에 동의하십니까?
                            </Typography>
                            <RHFRadioGroup
                              name="agreeOptional"
                              aria-labelledby="consent-question-optional"
                              row
                              options={[
                                { value: 'Y', label: '동의함' },
                                { value: 'N', label: '동의하지 않음' },
                              ]}  
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </ZodFormProvider>
                </section>

                <section className="pageCont-cleanCenter">
                  <h3 className="section-title">클린신고서 작성</h3>
                  <ZodFormProvider schema={schema} methods={form}>
                    <Box component="form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                      <Box className="bordered-box">
                        <Box className="form-group-wrap">
                          {/* 이름 (필수) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="encptMbrFlnm" className="label">
                              이름 <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                            </Typography>
                            <RHFTextField disabled id="encptMbrFlnm" name="encptMbrFlnm" placeholder="이름을 입력하세요." size="large" fullWidth 
                              slotProps={{
                                htmlInput: { 'aria-required': 'true', 'aria-describedby': 'encptMbrFlnm-alert' },
                                formHelperText: { id: 'encptMbrFlnm-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite' }
                              }}
                            />
                          </Box>

                          {/* 휴대전화번호 (필수) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="encptMbrTelno" className="label">
                              휴대전화번호 <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                            </Typography>
                            <RHFTextField disabled type="tel" id="encptMbrTelno" name="encptMbrTelno" placeholder="010-1234-5678" size="large" fullWidth 
                              slotProps={{
                                htmlInput: { 'aria-required': 'true', 'aria-describedby': 'encptMbrTelno-alert' },
                                formHelperText: { id: 'encptMbrTelno-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite' },
                              }}
                            />
                          </Box>

                          {/* 이메일 (선택) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="encptMbrEmlNm" className="label">
                              이메일 <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                            </Typography>
                            <RHFTextField disabled={isProfileDecrypting} type="email" id="encptMbrEmlNm" name="encptMbrEmlNm" placeholder="gidong_hong99@gmail.com" size="large" fullWidth 
                              slotProps={{
                                htmlInput: { 'aria-describedby': 'encptMbrEmlNm-alert' },
                                formHelperText: { id: 'encptMbrEmlNm-alert', className: 'error-alert' },
                              }}
                            />
                          </Box>

                          {/* 신고사항 제목 (필수) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="dclrTtlNm" className="label">
                              신고사항 제목 <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                            </Typography>
                            <RHFTextField id="dclrTtlNm" name="dclrTtlNm" placeholder="(예시: 부정청탁, 금품수수 등)" size="large" fullWidth 
                              slotProps={{
                                htmlInput: { 'aria-required': 'true', 'aria-describedby': 'dclrTtlNm-alert' },
                                formHelperText: { id: 'dclrTtlNm-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite' },
                              }}
                            />
                          </Box>

                          {/* 부정행위자 이름 (필수) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="dshstyActrFlnm" className="label">
                              부정행위자 이름 <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                            </Typography>
                            <RHFTextField id="dshstyActrFlnm" name="dshstyActrFlnm" placeholder="(예시: 관련있는 모든 사람의 이름을 모두 기재)" size="large" fullWidth 
                              slotProps={{
                                htmlInput: { 'aria-required': 'true', 'aria-describedby': 'dshstyActrFlnm-alert' },
                                formHelperText: { id: 'dshstyActrFlnm-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite' },
                              }}
                            />
                          </Box>

                          {/* 부정행위 시기 (필수) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="dshstyActPipCn" className="label">
                              부정행위 시기 <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                            </Typography>
                            <RHFTextField id="dshstyActPipCn" name="dshstyActPipCn" placeholder="시기를 구체적으로 일시 또는 기간을 입력해주세요." size="large" fullWidth 
                              slotProps={{
                                htmlInput: { 'aria-required': 'true', 'aria-describedby': 'dshstyActPipCn-alert' },
                                formHelperText: { id: 'dshstyActPipCn-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite' },
                              }}
                            />
                          </Box>

                          {/* 부정행위 장소 (필수) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="dshstyActPlcCn" className="label">
                              부정행위 장소 <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                            </Typography>
                            <RHFTextField id="dshstyActPlcCn" name="dshstyActPlcCn" placeholder="(예시: O층 사무실, O층 회의실 등)" size="large" fullWidth 
                              slotProps={{
                                htmlInput: { 'aria-required': 'true', 'aria-describedby': 'dshstyActPlcCn-alert' },
                                formHelperText: { id: 'dshstyActPlcCn-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite' },
                              }}
                            />
                          </Box>

                          {/* 부정행위 내용 (필수) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="dshstyActCn" className="label">
                              부정행위 내용 <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                            </Typography>
                            <RHFTextField id="dshstyActCn" name="dshstyActCn" placeholder="구체적이고 상세하게 3,000자 이내로 입력해주세요." size="large" fullWidth multiline rows={4}
                              slotProps={{
                                htmlInput: { 'aria-required': 'true', 'aria-describedby': 'dshstyActCn-alert' },
                                formHelperText: { id: 'dshstyActCn-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite' },
                              }}
                            />
                          </Box>

                          {/* 신고인 외 알고 있는 사람 (선택) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="addIdntfIdfrNm" className="label">
                              신고인 외 알고 있는 사람: 목격자 포함 <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                            </Typography>
                            <RHFTextField id="addIdntfIdfrNm" name="addIdntfIdfrNm" placeholder="(예시: OOO도 같이 있었음)" size="large" fullWidth 
                              slotProps={{
                                htmlInput: { 'aria-describedby': 'addIdntfIdfrNm-alert' },
                                formHelperText: { id: 'addIdntfIdfrNm-alert', className: 'error-alert' },
                              }}
                            />
                          </Box>

                          {/* 신고내용을 확인할 수 있는 방법 (선택) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="dclrCnIdntyMthdCn" className="label">
                              신고내용을 확인할 수 있는 방법 <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                            </Typography>
                            <RHFTextField id="dclrCnIdntyMthdCn" name="dclrCnIdntyMthdCn" placeholder="(예시: NNNN년 NN월 NN일자 문서에서 확인 가능함)" size="large" fullWidth 
                              slotProps={{
                                htmlInput: { 'aria-describedby': 'dclrCnIdntyMthdCn-alert' },
                                formHelperText: { id: 'dclrCnIdntyMthdCn-alert', className: 'error-alert' },
                              }}
                            />
                          </Box>

                          {/* 부정행위를 알게 된 계기 (선택) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="dshstyActIdntfRsnCn" className="label">
                              부정행위를 알게 된 계기 <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                            </Typography>
                            <RHFTextField id="dshstyActIdntfRsnCn" name="dshstyActIdntfRsnCn" placeholder="(예시: 신고인지 직접 겪음, 타인에게서 들었고 녹취본이 있음)" size="large" fullWidth 
                              slotProps={{
                                htmlInput: { 'aria-describedby': 'dshstyActIdntfRsnCn-alert' },
                                formHelperText: { id: 'dshstyActIdntfRsnCn-alert', className: 'error-alert' },
                              }}
                            />
                          </Box>

                          {/* 부정행위의 횟수 및 기간 (선택) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="dshstyActPrdCn" className="label">
                              부정행위의 횟수 및 기간 <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                            </Typography>
                            <RHFTextField id="dshstyActPrdCn" name="dshstyActPrdCn" placeholder="(예시: 한달에 한번, 분기별 진행함)" size="large" fullWidth 
                              slotProps={{
                                htmlInput: { 'aria-describedby': 'dshstyActPrdCn-alert' },
                                formHelperText: { id: 'dshstyActPrdCn-alert', className: 'error-alert' },
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box className="btn-group between">
                        <Button variant="outlined02" size="large" onClick={handleCancle}>취소하기</Button>
                        <Button variant="contained" size="large" type="submit" disabled={!form.formState.isValid}>제출하기</Button>
                      </Box>
                    </Box>
                  </ZodFormProvider>
                </section> 
              {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
