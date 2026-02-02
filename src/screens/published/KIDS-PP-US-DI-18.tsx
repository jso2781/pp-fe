import { useMemo, useState } from 'react'
import { Alert, Box, Button, Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { FormPage, FormSection, FieldGroup } from '@/components/form/FormLayout'
import { ZodFormProvider } from '@/components/rhf/ZodFormProvider'
import * as z from 'zod'
import { useZodForm } from '@/components/rhf/useZodForm'
import RHFTextField from '@/components/rhf/RHFTextField'
import RHFCheckbox from '@/components/rhf/RHFCheckbox'
import RHFRadioGroup from '@/components/rhf/RHFRadioGroup'
import RHFFileUploadField from '@/components/rhf/RHFFileUploadField'
import FileUploadField from '@/components/form/FileUploadField';
import { validateFiles } from '@/lib/validation/files'
import { useAppDispatch } from '@/store/hooks';
import { insertOpnn } from '@/features/opnn/OpnnThunks';
import DepsLocation from '@/components/common/DepsLocation';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../ScreenShell';

const allowedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'zip']
const accept = allowedExtensions.map((e) => `.${e}`).join(',')

const schema = z.object({
  agree: z.enum(['Y', 'N'], { required_error: '동의 여부를 선택해 주세요.' }).refine((v) => v === 'Y', {
    message: '동의가 필요합니다.',
  }),
  age14: z.boolean().refine((v) => v === true, { message: '만 14세 이상만 이용 가능합니다.' }),
  name: z.string().trim().min(1, { message: '성명을 입력해 주세요.' }),
  role: z.string().trim().min(1, { message: '구분(직업)을 입력해 주세요.' }),
  contact: z.string().trim().min(1, { message: '연락처(전화 또는 이메일)를 입력해 주세요.' }),
  problem: z.string().trim().min(1, { message: '현황 및 문제점을 입력해 주세요.' }),
  detail: z.string().trim().min(1, { message: '상세 내용을 입력해 주세요.' }),
  etc: z.string().optional().default(''),
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
  agree: 'Y',
  age14: false,
  name: '',
  role: '',
  contact: '',
  problem: '',
  detail: '',
  etc: '',
  files: [],
}

export default function DurProposal() {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // Lnb 랜더링용
  const currentUrl = location.pathname;

  const procedureItems = useMemo(
    () => [
      { title: '홈페이지', description: '의견제안 접수' },
      { title: '의견정리 및 검토' },
      { title: '전문가 자문회의' },
      { title: '검토결과 회신' },
    ],
    [],
  )

  const form = useZodForm<FormValues>(schema, {
    mode: 'onBlur',
    defaultValues,
  })

  const onSubmit = (values: FormValues) => {
    console.log('DUR proposal submit:', values)
    dispatch(insertOpnn(transfromDataType(values)));
    window.alert('의견 제안이 등록되었습니다. 담당자가 확인 후 연락드리겠습니다.')
    form.reset(defaultValues)
  }

  //임시
  const transfromDataType = (values: FormValues): FormData => {
    const formData = new FormData();
    formData.append('wrtrEncptFlnm', values.name);
    formData.append('wrtrEncptTelno', values.contact);
    formData.append('wrtSeCd', values.role);
    formData.append('pbptCn', values.problem);
    formData.append('dmndMttr', values.detail);
    formData.append('dmndMttrDtlCn', values.etc);
    formData.append('refMttr', '');
    formData.append('atchFileSn', '');
    values.files?.forEach((file) => {
      formData.append('attachFiles', file)
    })
    return formData;
  }

  //파일첨부
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const formatFileSize = (size) => (size / 1024 / 1024).toFixed(2) + 'MB';
  const handleDeleteFile = (index) => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  const handleDeleteAllFiles = () => setUploadedFiles([]);


  //return <FormTemplate screenId="KIDS-PP-US-DI-18" title="의견 제안" config={config} />
return (
    <ScreenShell screenId="KIDS-PP-US-DI-18" title="의견 제안" uiType="form">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>의견 제안</span>
                </Typography>
                <Box className="lnb-list">
                  {/* <Lnb items={sideItems} /> */}
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
                    <p>국의약품관리원에서는 DUR정보의 추가 또는 변경이 필요한 부분에 대해서 수시평가를 실시하고 있습니다.
                    보건의료 전문가들로부터 제안된 의견들을 검토함으로써 현장의 의견을 반영하고자 합니다.</p>
                    <p>의견제안과 관련하여 궁금한 점이 있으시면 <span className="fw-700">DUR정보팀(T.02-2172-6824, kids_dur@drugsafe.or.kr)</span>
                    으로 연락주시기 바랍니다.</p>
                    <p>의견 접수 후 남겨주신 연락처로 연락 드리겠습니다.</p>
                    <p>건강보험심사평가원 DUR 전산시스템(의약품안전사용서비스) 관련 문의는 답변이 제한될 수 있습니다.</p>
                  </Box>
                  <p className="fs-18 fw-700">한국의약품안전관리원은 DUR 의견 제안과 관련하여 아래와 같이 개인정보를 수집·이용하고자 합니다. 내용을 자세히 읽으신 후 동의 여부를 결정하여 주십시오.</p>
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
                            <p>4. 동의 거부권리 안내: 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 DUR 의견 제안 이용이 제한됩니다.</p>
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
                <Box className="bordered-box">
                  <ZodFormProvider schema={schema} methods={form}>
                    <Box component="form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                      <Box className="form-group-wrap">
                        {/* 이름 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="name" className="label">
                            이름
                            <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                          </Typography>
                          <RHFTextField name="name" id="name" placeholder="이름을 입력하세요." size="large" fullWidth />
                        </Box>

                        {/* 휴대전화번호 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="contact" className="label">
                            휴대전화번호
                            <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                          </Typography>
                          <RHFTextField name="contact" id="contact" placeholder="010-1234-5678" size="large" fullWidth />
                        </Box>

                        {/* 이메일 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="email" className="label">
                            이메일
                            <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                          </Typography>
                          <RHFTextField name="email" id="email" placeholder="gidong_hong99@gmail.com" size="large" fullWidth />
                        </Box>

                        {/* 현황 및 문제점 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="problem" className="label">
                            현황 및 문제점
                            <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                          </Typography>
                          <RHFTextField name="problem" id="problem" placeholder="현황 및 문제점을 100자 이내로 입력해주세요." size="large" fullWidth multiline minRows={3} />
                        </Box>

                        {/* 의견 및 요청사항 간략기재 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="summary" className="label">
                            의견 및 요청사항 간략기재
                            <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                          </Typography>
                          <RHFTextField name="summary" id="summary" placeholder="의견 및 요청사항을 100자 이내로 입력해주세요." size="large" fullWidth multiline minRows={3} />
                        </Box>

                        {/* 상세 내용 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="detail" className="label">
                            의견 및 요청사항 상세기재
                            <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                          </Typography>
                          <RHFTextField name="detail" id="detail" placeholder="의견 및 요청사항을 1,000자 이내로 입력해주세요." size="large" fullWidth multiline minRows={5} />
                        </Box>

                        {/* 기타 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="etc" className="label">
                            참고사항 및 기타
                            <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                          </Typography>
                          <RHFTextField name="etc" id="etc" placeholder="참고사항 및 기타 사항을 1,000자 이내로 입력해주세요." size="large" fullWidth multiline minRows={2} />
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
                              onChange={setUploadedFiles} 
                              accept=".pdf,.png,.jpg,.jpeg"
                              multiple={false}
                              maxFiles={5}
                              maxFileSizeMB={10}
                              maxTotalSizeMB={10}
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
                  </ZodFormProvider>
                </Box>
                

                {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ScreenShell>
  );
}
