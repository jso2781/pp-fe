import { useMemo, useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';import DepsLocation from '@/components/common/DepsLocation'
import { FormPage, FormSection, FieldGroup } from '@/components/form/FormLayout'
import ScreenShell from '../ScreenShell'
import CollapsibleSideNav from '@/components/navigation/CollapsibleSideNav'
import { ZodFormProvider } from '@/components/rhf/ZodFormProvider'
import * as z from 'zod'
import { useZodForm } from '@/components/rhf/useZodForm'
import RHFTextField from '@/components/rhf/RHFTextField'
import RHFSwitch from '@/components/rhf/RHFSwitch'
import RHFFileUploadField from '@/components/rhf/RHFFileUploadField'
import { validateFiles } from '@/lib/validation/files'

const allowedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'zip']
const accept = allowedExtensions.map((e) => `.${e}`).join(',')

const schema = z.object({
  boardName: z.string(),
  title: z.string().trim().min(1, { message: '제목을 입력하세요.' }),
  isFixed: z.boolean().default(false),
  content: z.string().trim().min(1, { message: '내용을 입력하세요.' }),
  attachments: z
    .array(z.instanceof(File))
    .default([])
    .superRefine((files, ctx) => {
      const msg = validateFiles(files, { maxTotalSizeMB: 20, allowedExtensions })
      if (msg) ctx.addIssue({ code: z.ZodIssueCode.custom, message: msg })
    }),
})

type FormValues = z.infer<typeof schema>

const defaultValues: FormValues = {
  boardName: 'readonly',
  title: '',
  isFixed: false,
  content: '',
  attachments: [],
}

export default function KIDS_PP_US_MT_01_Write() {
  const [collapsed, setCollapsed] = useState(false)

  const sideItems = useMemo(
    () => [
      { key: '/1', label: '내 업무' },
      { key: '/2', label: '업무 신청 관리', disabled: true },
      { key: '/3', label: '업무 시스템 서브 메뉴 1' },
      { key: '/4', label: '업무 시스템 서브 메뉴 2' },
      { key: '/6', label: '업무 시스템 메뉴 2', disabled: true },
      { key: '/7', label: '업무 시스템 메뉴 3', disabled: true },
    ],
    [],
  )

  const form = useZodForm<FormValues>(schema, {
    mode: 'onBlur',
    defaultValues,
  })

  const onSubmit = (values: FormValues) => {
    console.log('submit:', values)
    window.alert('샘플 화면입니다. (저장 로직은 연결되어 있지 않습니다)')
  }

  return (
    <ScreenShell screenId="KIDS-PP-US-MT-01_Write" title="내업무" uiType="page">
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CollapsibleSideNav
          title="알림마당"
          collapsed={collapsed}
          onToggle={() => setCollapsed((p) => !p)}
          items={sideItems}
          selectedKey="/1"
          onSelect={(key) => {
            // TODO: 실제 라우팅 연결 필요
            window.alert(`navigate: ${key}`)
          }}
        />

        <Box sx={{ flex: 1, p: 2 }}>
          <DepsLocation />

          <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
            회원정보
          </Typography>

          <FormPage>
            <FormSection>
              <ZodFormProvider schema={schema} methods={form}>
                <Box component="form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                  <Stack spacing={2}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 12 }}>
                        <RHFTextField name="boardName" label="게시판 명" fullWidth InputProps={{ readOnly: true }} />
                      </Grid>
                      <Grid size={{ xs: 12, md: 12 }}>
                        <RHFTextField name="title" label="제목" fullWidth />
                      </Grid>
                      <Grid size={{ xs: 12, md: 12 }}>
                        <RHFSwitch name="isFixed" label="스위치" />
                      </Grid>
                      <Grid size={{ xs: 12, md: 12 }}>
                        <RHFFileUploadField
                          name="attachments"
                          label="첨부파일"
                          helperText="허용: pdf, doc, docx, xls, xlsx, ppt, pptx, jpg, jpeg, png, zip / 총 20MB 이하 (샘플 화면)"
                          accept={accept}
                          allowedExtensions={allowedExtensions}
                          maxTotalSizeMB={20}
                          showImagePreview
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 12 }}>
                        <RHFTextField name="content" label="내용" fullWidth multiline minRows={6} />
                      </Grid>
                    </Grid>

                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button variant="outlined" onClick={() => form.reset(defaultValues)}>
                        초기화
                      </Button>
                      <Button variant="contained" type="submit">
                        저장
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </ZodFormProvider>
            </FormSection>
          </FormPage>
        </Box>
      </Box>
    </ScreenShell>
  )
}
