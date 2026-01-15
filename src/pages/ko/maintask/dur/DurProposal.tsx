import { useMemo } from 'react'
import { Alert, Box, Button, Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';import PageTitle from '@/components/common/PageTitle'
import { FormPage, FormSection, FieldGroup } from '@/components/form/FormLayout'
import { BreadcrumbNav } from '@/components/mui'
import SectionSideNav from '@/components/navigation/SectionSideNav'
import { ZodFormProvider } from '@/components/rhf/ZodFormProvider'
import * as z from 'zod'
import { useZodForm } from '@/components/rhf/useZodForm'
import RHFTextField from '@/components/rhf/RHFTextField'
import RHFCheckbox from '@/components/rhf/RHFCheckbox'
import RHFRadioGroup from '@/components/rhf/RHFRadioGroup'
import RHFFileUploadField from '@/components/rhf/RHFFileUploadField'
import { validateFiles } from '@/lib/validation/files'
import { useAppDispatch } from '@/store/hooks';
import { insertOpnn } from '@/features/opnn/OpnnThunks';

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

  const dispatch = useAppDispatch();

  const sideItems = useMemo(
    () => [
      { key: '/ko/dur/understand', label: 'DUR 이해', disabled: true },
      { key: '/ko/dur/search', label: 'DUR 정보검색', disabled: true },
      { key: '/ko/dur/use', label: '의약품 적정사용정보', disabled: true },
      { key: '/ko/dur/notice', label: '알림 게시판' },
      { key: '/ko/dur/proposal', label: '의견 제안' },
    ],
    [],
  )

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

  return (
    <div className="ds-page ds-dur-proposal">
      <div className="ds-container">
        <BreadcrumbNav className="ds-breadcrumb" items={[{ title: '홈' }, { title: 'DUR 정보' }, { title: '의견 제안' }]} />

        <PageTitle title="의견 제안" subtitle="DUR 정보" />

        <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <SectionSideNav title="DUR 정보" items={sideItems} selectedKey="/ko/dur/proposal" />
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <FormPage>
              <FormSection title="안내">
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  한국의약품안전관리원에서는 DUR정보의 추가 또는 변경이 필요한 부분에 대해서 수시평가를 실시하고 있습니다.
                  <br />
                  의견제안은 검토 후 반영될 수 있으며, 처리 결과는 기재하신 연락처로 안내드립니다.
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  {procedureItems.map((p, idx) => (
                    <Grid key={idx} size={{ xs: 12, sm: 6 }}>
                      <Alert severity="info" icon={false} sx={{ borderRadius: 2 }}>
                        <Typography variant="subtitle2" fontWeight={900}>
                          {p.title}
                        </Typography>
                        {p.description && (
                          <Typography variant="body2" color="text.secondary">
                            {p.description}
                          </Typography>
                        )}
                      </Alert>
                    </Grid>
                  ))}
                </Grid>
              </FormSection>

              <FormSection title="의견 제안 등록">
                <ZodFormProvider schema={schema} methods={form}>
                  <Box component="form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                    <Stack spacing={2}>
                      <Typography variant="subtitle1" fontWeight={900}>
                        개인정보 수집·이용 동의
                      </Typography>

                      <RHFRadioGroup
                        name="agree"
                        label="동의 여부"
                        row
                        options={[
                          { value: 'Y', label: '동의함' },
                          { value: 'N', label: '동의하지 않음' },
                        ]}
                      />

                      <RHFCheckbox name="age14" label="만 14세 이상입니다." helperText="만 14세 이상만 이용 가능합니다." />

                      <Divider />

                      <RHFTextField name="name" label="성명" fullWidth />
                      <RHFTextField name="role" label="구분(직업)" fullWidth />
                      <RHFTextField name="contact" label="연락처(전화 또는 이메일)" fullWidth />
                      <RHFTextField name="problem" label="현황 및 문제점" fullWidth multiline minRows={3} />
                      <RHFTextField name="detail" label="상세 내용" fullWidth multiline minRows={5} />
                      <RHFTextField name="etc" label="기타" fullWidth multiline minRows={2} />

                      <RHFFileUploadField
                        name="files"
                        label="첨부파일"
                        helperText="허용: pdf, doc, docx, xls, xlsx, ppt, pptx, jpg, jpeg, png, zip / 총 10MB 이하 (샘플 화면: 업로드는 저장되지 않습니다)"
                        accept={accept}
                        allowedExtensions={allowedExtensions}
                        maxTotalSizeMB={10}
                        showImagePreview
                      />

                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button variant="outlined" onClick={() => form.reset(defaultValues)}>
                          초기화
                        </Button>
                        <Button variant="contained" type="submit">
                          등록
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </ZodFormProvider>
              </FormSection>
            </FormPage>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
