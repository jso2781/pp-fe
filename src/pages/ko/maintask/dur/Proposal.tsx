/**
 * 화면ID: KIDS-PP-US-DI-18
 * 화면명: 의견 제안
 * 화면경로: /maintask/dur/Proposal
 * 화면설명: 의견 제안
 */
import { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { ZodFormProvider } from '@/components/rhf/ZodFormProvider';
import * as z from 'zod'
import { useZodForm } from '@/components/rhf/useZodForm';
import RHFTextField from '@/components/rhf/RHFTextField';
import RHFRadioGroup from '@/components/rhf/RHFRadioGroup';
import { validateFiles } from '@/lib/validation/files';
import { useAppDispatch } from '@/store/hooks';
import { insertOpnn } from '@/features/opnn/OpnnThunks';
import DepsLocation from '@/components/common/DepsLocation';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Lnb from '@/components/common/Lnb';
import { useAuth } from '@/contexts/AuthContext';
import KoglLicense from '@/components/common/KoglLicense';
import DgstfnExnm from '@/components/common/DgstfnExnm';
import ContactArea from '@/components/common/ContactArea';
import FileUploadField from '@/components/form/FileUploadField';
import { useDialog } from '@/contexts/DialogContext';

const allowedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'zip']
const accept = allowedExtensions.map((e) => `.${e}`).join(',')

export default function Proposal() {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { getMenuInfo } = useAuth();
  const { showAlert } = useDialog();
  const menuInfo = getMenuInfo(location.pathname);
  const menuSn = menuInfo?.menuSn ?? 0;
  const menuKoglCprgtTypeCd = menuInfo?.menuKoglCprgtTypeCd ?? '4';
  const contactDepNm = menuInfo?.menuTkcgDeptNm ?? null;
  const contactPersonNm = menuInfo?.menuPicFlnm ?? null;
  const contactPhoneNum = menuInfo?.encptPicTelno ?? null;

  // Lnb 랜더링용
  const currentUrl = location.pathname;

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
    agreeOptional: z.enum(['Y', 'N']).optional().superRefine((v, ctx) => v == null && ctx.addIssue({ code: z.ZodIssueCode.custom, message: '동의 여부를 선택해 주세요.' })),
    role: z.string().trim().min(1, { message: '구분을 선택해주세요.' }),
    name: z.string().trim().min(1, { message: '이름을 입력해주세요.' }),
    contact: z.string(),
    email: z.string().trim().min(1, { message: '이메일을 입력해주세요.' }).email({ message: '이메일 형식이 올바르지 않습니다.' }),
    problem: z.string().trim().min(1, { message: '현황 및 문제점을 입력해주세요.' }),
    summary: z.string().trim().optional().default(''),
    detail: z.string().trim().min(1, { message: '의견 및 요청사항 상세기재를 입력해주세요.' }),
    etc: z.string().trim().optional().default(''),
    files: z
      .array(z.instanceof(File))
      .default([])
      .superRefine((files, ctx) => {
        const msg = validateFiles(files, { maxTotalSizeMB: 10, allowedExtensions })
        if (msg) ctx.addIssue({ code: z.ZodIssueCode.custom, message: msg })
      }),
  })
  
  type FormValues = z.infer<typeof schema>
  
  const defaultValues: FormValues = {
    agreeRequired: undefined,
    agreeOptional: undefined,
    name: '',
    role: '',
    contact: '',
    email: '',
    problem: '',
    summary: '',
    detail: '',
    etc: '',
    files: [],
  }

  const form = useZodForm<FormValues>(schema, {
    mode: 'onChange',
    defaultValues,
  });

  const onSubmit = async (values: FormValues) => {
    if (values.contact && values.agreeOptional === 'N') {
      form.setError('agreeOptional', { type: 'validate', message: '휴대폰번호 수집·동의에 동의가 필요합니다.' }, { shouldFocus: true });
      return;
    }
    try {
      await dispatch(insertOpnn(transfromDataType(values))).unwrap();
      showAlert('의견제안 제출이 완료되었습니다.');
    } catch(e) {

    } finally {
      form.reset(defaultValues);
    }
  }

  const transfromDataType = (values: FormValues): FormData => {
    const formData = new FormData();
    formData.append('encptWrtrFlnm', values.name);         // 성명
    formData.append('encptWrtrTelno', values.contact);     // 번호(선택)
    formData.append('encptMbrEmlNm', values.email);        // 이메일
    formData.append('wrtSeCd', values.role);               // 구분코드
    formData.append('pbptCn', values.problem);             // 문제점내용
    formData.append('dmndMttrCn', values.summary ?? '');   // 요청사항(간략)
    formData.append('dmndMttrDtlCn', values.detail ?? ''); // 요청사항(상세)
    formData.append('refMttrCn', values.etc ?? '');        // 참고사항내용
    formData.append('insdRefMttrCn', '');                  // 내부참고사항내용
    formData.append('atchFileSn', '');                     // 첨부파일
    values.files?.forEach((file) => {
      formData.append('attachFiles', file)
    })
    return formData;
  }

  //파일첨부
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const formatFileSize = (size: number) => (size / 1024 / 1024).toFixed(2) + 'MB';
  const handleDeleteFile = (index: number) => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  const handleDeleteAllFiles = () => setUploadedFiles([]);

  const handleFilesChange = (files: File[]) => {
    setUploadedFiles(files)
    form.setValue('files', files, { shouldValidate: true, shouldDirty: true })
  }

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">
        
          {/* Lnb 영역 */}
          <Box className="lnb-wrap">
            <Box className="lnb-menu">
              <Typography component="h2" className="lnb-tit">
                <span>{t('menuDur')}</span>
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
                  <Box className="info-drug-box">
                    <p>한국의약품관리원에서는 DUR정보의 추가 또는 변경이 필요한 부분에 대해서 수시평가를 실시하고 있습니다.</p>
                    <p>보건의료 전문가들로부터 제안된 의견들을 검토함으로써 현장의 의견을 반영하고자 합니다.</p>
                    <p>의견제안과 관련하여 궁금한 점이 있으시면 <span className="fw-700">DUR정보팀(T.02-2172-6824, kids_dur@drugsafe.or.kr)</span>
                    으로 연락주시기 바랍니다.</p>
                    <p>의견 접수 후 남겨주신 연락처로 연락 드리겠습니다.</p>
                    <p>건강보험심사평가원 DUR 전산시스템(의약품안전사용서비스) 관련 문의는 답변이 제한될 수 있습니다.</p>
                  </Box>
                  <p className="fs-18 fw-700">한국의약품안전관리원은 DUR 의견 제안과 관련하여 아래와 같이 개인정보를 수집·이용하고자 합니다.<br/> 내용을 자세히 읽으신 후 동의 여부를 결정하여 주십시오.</p>
                  <ZodFormProvider schema={schema} methods={form}>
                    <Box component="form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                      <Box className="privacy-policy-section">
                        {/* --- 개인정보 수집·동의 (필수) --- */}
                        <Box className="privacy-consent-box" role="group" aria-labelledby="consent-title-required">
                          <Typography id="consent-title-required" className="privacy-consent-box__title">
                            개인정보 수집·이용 동의
                            <Box component="span" className="required" aria-label="필수 입력">(필수)</Box>
                          </Typography>

                          {/* 접근성: 스크롤 영역에 tabIndex와 role 추가 */}
                          <Box className="privacy-consent-box__viewer" tabIndex={0} role="region" aria-label="개인정보 수집 이용 동의 필수항목 상세내용">
                            <p>1. 수집항목: 성명, 구분(직업), 이메일</p>
                            <p>2. 수집·이용 목적: DUR 정보의 추가 또는 변경 의견 수집</p>
                            <p>3. 보유기간: <span className="fw-700">10년</span></p>
                            <p>4. 동의 거부권리 안내: 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 DUR 의견 제안 이용이 제한됩니다.</p>
                          </Box>

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

                          <Box className="privacy-consent-box__viewer" tabIndex={0} role="region" aria-label="개인정보 수집 이용 동의 선택항목 상세내용">
                            <p>1. 수집항목: 휴대폰번호</p>
                            <p>2. 수집·이용 목적: DUR 정보의 추가 또는 변경 의견 수집</p>
                            <p>3. 보유기간: <span className="fw-700">10년</span></p>
                            <p>4. 동의 거부권리 안내: 개인정보 수집 ∙ 이용에 대한 동의 거부 시 DUR의견제안 제출에는 제한이 없습니다.
                            그러나, 동의 거부 시 제출한 DUR의견에 대한 통보를 휴대폰으로 연락받는 서비스 이용에는 제한됨을 알려 드립니다.</p>
                          </Box>

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

                  <h3 className="section-title">의견 제안 처리 절차</h3>
                  <ul className="opinion-process-step">
                    <li>홈페이지 <br/>의견제안 접수</li>
                    <li>의견정리 및 검토</li>
                    <li>전문가 자문회의</li>
                    <li>검토결과 회신</li>
                  </ul>
                </section>

                <h3 className="section-title">의견 제안 입력</h3>
                <ZodFormProvider schema={schema} methods={form}>
                  <Box component="form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                    <Box className="bordered-box">
                      <Box className="form-group-wrap">
                        <Box className="form-item-row-vertical">
                          <Typography className="label">
                            구분
                            <Box component="span" className="required">(필수)</Box>
                          </Typography>
                          <Box className="radio-group-container">
                            <RHFRadioGroup
                              name="role"
                              row
                              options={[
                                { value: '1', label: '의사' },
                                { value: '2', label: '약사' },
                                { value: '3', label: '간호사' },
                                { value: '4', label: '소비자' },
                                { value: '5', label: '기타' },
                              ]}
                            />
                          </Box>
                        </Box>
                        {/* 이름 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="name" className="label">
                            이름
                            <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                          </Typography>
                          <RHFTextField name="name" id="name" placeholder="이름을 입력하세요." size="large" fullWidth
                            slotProps={{
                              htmlInput: { 'aria-required': 'true', 'aria-describedby': 'name-alert' },
                              formHelperText: { id: 'name-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite' }
                            }}
                          />
                        </Box>

                        {/* 휴대전화번호 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="contact" className="label">
                            휴대전화번호
                            <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                          </Typography>
                          <RHFTextField type="tel" name="contact" id="contact" placeholder="010-1234-5678" size="large" fullWidth
                            slotProps={{
                              htmlInput: { 'aria-describedby': 'contact-alert' },
                              formHelperText: { id: 'contact-alert', className: 'error-alert' },
                            }}
                          />
                        </Box>

                        {/* 이메일 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="email" className="label">
                            이메일
                            <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                          </Typography>
                          <RHFTextField type="email" name="email" id="email" placeholder="gidong_hong99@gmail.com" size="large" fullWidth
                            slotProps={{
                              htmlInput: { 'aria-required': 'true', 'aria-describedby': 'email-alert' },
                              formHelperText: { id: 'email-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite'  },
                            }}
                          />
                        </Box>

                        {/* 현황 및 문제점 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="problem" className="label">
                            현황 및 문제점
                            <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                          </Typography>
                          <RHFTextField name="problem" id="problem" placeholder="현황 및 문제점을 100자 이내로 입력해주세요." size="large" fullWidth multiline minRows={3}
                            slotProps={{
                              htmlInput: { 'aria-required': 'true', 'aria-describedby': 'problem-alert' },
                              formHelperText: { id: 'problem-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite' },
                            }}
                          />
                        </Box>

                        {/* 의견 및 요청사항 간략기재 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="summary" className="label">
                            의견 및 요청사항 간략기재
                            <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                          </Typography>
                          <RHFTextField name="summary" id="summary" placeholder="의견 및 요청사항을 100자 이내로 입력해주세요." size="large" fullWidth multiline minRows={3}
                            slotProps={{
                              htmlInput: { 'aria-describedby': 'summary-alert' },
                              formHelperText: { id: 'summary-alert', className: 'error-alert' },
                            }}
                          />
                        </Box>

                        {/* 의견 및 요청사항 상세기재 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="detail" className="label">
                            의견 및 요청사항 상세기재
                            <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                          </Typography>
                          <RHFTextField name="detail" id="detail" placeholder="의견 및 요청사항을 1,000자 이내로 입력해주세요." size="large" fullWidth multiline minRows={5}
                            slotProps={{
                              htmlInput: { 'aria-required': 'true', 'aria-describedby': 'detail-alert' },
                              formHelperText: { id: 'detail-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite' },
                            }}
                          />
                        </Box>

                        {/* 참고사항 및 기타 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="etc" className="label">
                            참고사항 및 기타
                            <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                          </Typography>
                          <RHFTextField name="etc" id="etc" placeholder="참고사항 및 기타 사항을 1,000자 이내로 입력해주세요." size="large" fullWidth multiline minRows={2}
                            slotProps={{
                              htmlInput: { 'aria-describedby': 'etc-alert' },
                              formHelperText: { id: 'etc-alert', className: 'error-alert' },
                            }}
                          />
                        </Box>

                        {/* 첨부파일 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="" className="label">
                          첨부파일
                            <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                          </Typography>
                          <Box className="attach-file-box">
                            <FileUploadField
                              value={uploadedFiles}
                              onChange={handleFilesChange} 
                              accept=".pdf,.png,.jpg,.jpeg"
                              multiple={false}
                              maxFiles={3}
                              maxFileSizeMB={10}
                              maxTotalSizeMB={30}
                              helperText="허용: pdf, doc, docx, xls, xlsx, ppt, pptx, jpg, jpeg, png, zip · 총 10MB"
                            />
                            
                            {uploadedFiles.length > 0 && (
                              <Box className="file-viewer">
                                <Stack direction="row" className="uploader-info">
                                  <Typography component="p" className="file-count">
                                    <Box component="span">{uploadedFiles.length}개</Box>
                                  </Typography>
                                  <Button
                                    size="xsmall"
                                    variant="outlined02"
                                    onClick={handleDeleteAllFiles}
                                    sx={{ textTransform: 'none' }}
                                  >
                                    전체 파일 삭제
                                  </Button>
                                </Stack>
                                <Box className="file-list">
                                  {uploadedFiles.map((file, index) => (
                                    <Box key={index} className="file-item">
                                      <Typography>
                                        {file.name} [
                                        {file.name.split('.').pop()?.toLowerCase()}, {formatFileSize(file.size)}]
                                      </Typography>
                                      <Button 
                                        className="btn-delete-circle" 
                                        size="small"
                                        onClick={() => handleDeleteFile(index)}
                                        title="삭제" 
                                      >
                                        <span aria-hidden="true">×</span>
                                      </Button>
                                    </Box>
                                  ))}
                                </Box>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box className="btn-group right">
                      <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        disabled={!form.formState.isValid}
                      >
                        제안등록
                      </Button>
                    </Box>
                  </Box>
                </ZodFormProvider>

                {/* 공공(KOGL) 저작물 */}
                <KoglLicense menuKoglCprgtTypeCd={menuKoglCprgtTypeCd} />
                {/* 만족도 조사 */}
                <DgstfnExnm menuSn={menuSn} />
                {/* 업무 담당 부서 및 연락처 */}
                <ContactArea
                  contactDepNm={contactDepNm}
                  contactPersonNm={contactPersonNm}
                  contactPhoneNum={contactPhoneNum}
                />
                {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
