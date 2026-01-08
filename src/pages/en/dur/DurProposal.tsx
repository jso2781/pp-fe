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
  const sideItems = useMemo(
    () => [
      { key: '/en/dur/understand', label: 'DUR 이해', disabled: true },
      { key: '/en/dur/search', label: 'DUR 정보검색', disabled: true },
      { key: '/en/dur/use', label: '의약품 적정사용정보', disabled: true },
      { key: '/en/dur/notice', label: '알림 게시판' },
      { key: '/en/dur/proposal', label: '의견 제안' },
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
    window.alert('Submitted. (Sample screen)')
    form.reset(defaultValues)
  }

  return (
    <div className="ds-page ds-dur-proposal">
      <div className="ds-container">
        <BreadcrumbNav className="ds-breadcrumb" items={[{ title: '홈' }, { title: 'DUR 정보' }, { title: '의견 제안' }]} />

        <PageTitle title="의견 제안" subtitle="DUR 정보" />

        <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <SectionSideNav title="DUR 정보" items={sideItems} selectedKey="/en/dur/proposal" />
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <FormPage>
              <FormSection title="Info">
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  Korea Institute of Drug Safety &amp; Risk Management (KIDS) continuously evaluates DUR information updates.
                  <br />
                  Your suggestion may be reflected after review, and we will contact you with the result.
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

              <FormSection title="Submit a Suggestion">
                <ZodFormProvider schema={schema} methods={form}>
                  <Box component="form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                    <Stack spacing={2}>
                      <Typography variant="subtitle1" fontWeight={900}>
                        Consent to Collect/Use Personal Information
                      </Typography>

                      <RHFRadioGroup
                        name="agree"
                        label="Consent"
                        row
                        options={[
                          { value: 'Y', label: 'Agree' },
                          { value: 'N', label: 'Disagree' },
                        ]}
                      />

                      <RHFCheckbox
                        name="age14"
                        label="I am 14 years old or older."
                        helperText="Only users aged 14 or above can use this service."
                      />

                      <Divider />

                      <RHFTextField name="name" label="Name" fullWidth />
                      <RHFTextField name="role" label="Occupation" fullWidth />
                      <RHFTextField name="contact" label="Contact (Phone or Email)" fullWidth />
                      <RHFTextField name="problem" label="Current Status and Issues" fullWidth multiline minRows={3} />
                      <RHFTextField name="detail" label="Details" fullWidth multiline minRows={5} />
                      <RHFTextField name="etc" label="Others" fullWidth multiline minRows={2} />

                      <RHFFileUploadField
                        name="files"
                        label="Attachments"
                        helperText="Allowed: pdf, doc, docx, xls, xlsx, ppt, pptx, jpg, jpeg, png, zip / Total <= 10MB (sample only)"
                        accept={accept}
                        allowedExtensions={allowedExtensions}
                        maxTotalSizeMB={10}
                        showImagePreview
                      />

                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button variant="outlined" onClick={() => form.reset(defaultValues)}>
                          Reset
                        </Button>
                        <Button variant="contained" type="submit">
                          Submit
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
