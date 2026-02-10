/**
 * 화면ID: KIDS-PP-US-IN-18
 * 화면명: 클린신고센터 등록
 * 화면경로: /ko/about/ethics/AboutCleanCenter
 * 화면설명: 클린신고센터 등록
 */
import DepsLocation from "@/components/common/DepsLocation";
import Lnb from "@/components/common/Lnb";
import { insertDshstyDclr } from "@/features/dclr/DshstyDclrThunks";
import { useAppDispatch } from "@/store/hooks";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import type { DshstyDclrPVO } from "@/features/dclr/DshstyDclrTypes";
import * as z from 'zod';
import { ZodFormProvider } from "@/components/rhf/ZodFormProvider";
import { useZodForm } from "@/components/rhf/useZodForm";
import RHFTextField from "@/components/rhf/RHFTextField";
import { useDialog } from '@/contexts/DialogContext';

export default function AboutCleanForm () {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showAlert } = useDialog();

  const currentUrl = location.pathname;

  if(false) {
    //TODO Any-Id 인증이 안되있다면 본인인증 페이지로 이동
    return <Navigate to="/" replace />;
  }

  const schema = z.object({
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
    encptMbrFlnm: '고정',
    encptMbrTelno: '고정',
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
    mode: 'onBlur',
    defaultValues,
  });

  const onSubmit = async (valuse: FormValues) => {
    try {
      await dispatch(insertDshstyDclr(valuse as DshstyDclrPVO)).unwrap();
      showAlert('클린신고서 신청서 제출이 완료되었습니다.', '알림', () => {
        navigate('/ko/about/ethics/AboutCleanCenter');
      });
    } catch(e) {

    } finally {
      form.reset(defaultValues);
    }
  }

  const handleCancle = () => {
    navigate('/ko/about/ethics/AboutCleanCenter');
  }

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">

          {/* Lnb 영역 */}
          <Box className="lnb-wrap">
            <Box className="lnb-menu">
              <Typography component="h2" className="lnb-tit">
                <span>윤리경영</span>
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
                            <RHFTextField id="encptMbrFlnm" name="encptMbrFlnm" placeholder="이름을 입력하세요." size="large" fullWidth 
                              slotProps={{
                                htmlInput: { 'aria-required': 'true', 'aria-describedby': 'encptMbrFlnm-alert' },
                                formHelperText: { id: 'encptMbrFlnm-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite' }
                            }}/>
                          </Box>

                          {/* 휴대전화번호 (필수) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="encptMbrTelno" className="label">
                              휴대전화번호 <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                            </Typography>
                            <RHFTextField type="tel" id="encptMbrTelno" name="encptMbrTelno" placeholder="010-1234-5678" size="large" fullWidth 
                              slotProps={{
                                htmlInput: { 'aria-required': 'true', 'aria-describedby': 'encptMbrTelno-alert' },
                                formHelperText: { id: 'encptMbrTelno-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite' },
                            }}/>
                          </Box>

                          {/* 이메일 (선택) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="encptMbrEmlNm" className="label">
                              이메일 <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                            </Typography>
                            <RHFTextField type="email" id="encptMbrEmlNm" name="encptMbrEmlNm" placeholder="gidong_hong99@gmail.com" size="large" fullWidth 
                              slotProps={{
                                htmlInput: { 'aria-describedby': 'encptMbrEmlNm-alert' },
                                formHelperText: { id: 'encptMbrEmlNm-alert', className: 'error-alert' },
                            }}/>
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
                            }}/>
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
                            }}/>
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
                            }}/>
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
                            }}/>
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
                            }}/>
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
                            }}/>
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
                            }}/>
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
                            }}/>
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
                            }}/>
                          </Box>
                        </Box>
                      </Box>
                      <Box className="btn-group between">
                        <Button variant="outlined02" size="large" onClick={handleCancle}>취소하기</Button>
                        {/* <Button variant="contained" size="large" onClick={handleSubmit}>제줄하기</Button> */}
                        <Button variant="contained" size="large" type="submit">제줄하기</Button>
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