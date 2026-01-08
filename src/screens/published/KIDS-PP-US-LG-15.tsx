import { useState } from 'react'
import { Alert, Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material'
import DepsLocation from '@/components/common/DepsLocation'
import ScreenShell from '../ScreenShell'

type LoginValues = {
  loginId: string
  password: string
  rememberId: boolean
}

type LoginFailInfo = {
  reason: string
  failedCount: number
}

const KOREAN_REGEX = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g

export default function KIDS_PP_US_LG_15() {
  const [values, setValues] = useState<LoginValues>({ loginId: '', password: '', rememberId: false })
  const [errors, setErrors] = useState<Partial<Record<keyof LoginValues, string>>>({})
  const [loginFail, setLoginFail] = useState<LoginFailInfo | null>(null)
  const [localFailCount, setLocalFailCount] = useState(0)

  const validate = (v: LoginValues) => {
    const next: Partial<Record<keyof LoginValues, string>> = {}
    if (!v.loginId.trim()) next.loginId = '아이디를 입력하세요.'
    if (KOREAN_REGEX.test(v.loginId)) next.loginId = '아이디에는 한글을 입력할 수 없습니다.'
    if (!v.password.trim()) next.password = '비밀번호를 입력하세요.'
    return next
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length) return

    // 샘플: 실패횟수 시뮬레이션
    const nextCount = localFailCount + 1
    setLocalFailCount(nextCount)
    setLoginFail({ reason: '아이디 또는 비밀번호가 올바르지 않습니다.', failedCount: nextCount })
    window.alert('샘플 화면입니다. (로그인 API 미연동)')
  }

  return (
    <ScreenShell screenId="KIDS-PP-US-LG-15" title="아이디 로그인" uiType="input">
      <Box sx={{ p: 2, maxWidth: 520, mx: 'auto' }}>
        <DepsLocation />

        <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
          로그인
        </Typography>

        <Box component="form" onSubmit={onSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              label="아이디"
              value={values.loginId}
              onChange={(e) => {
                const v = e.target.value.replace(KOREAN_REGEX, '')
                setValues((p) => ({ ...p, loginId: v }))
              }}
              error={!!errors.loginId}
              helperText={errors.loginId}
              fullWidth
            />

            <TextField
              label="비밀번호"
              type="password"
              value={values.password}
              onChange={(e) => setValues((p) => ({ ...p, password: e.target.value }))}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={values.rememberId}
                  onChange={(e) => setValues((p) => ({ ...p, rememberId: e.target.checked }))}
                />
              }
              label="아이디 저장"
            />

            {loginFail ? (
              <Alert severity="error">
                {loginFail.reason} (실패 {loginFail.failedCount}회)
              </Alert>
            ) : null}

            <Button variant="contained" type="submit" size="large">
              로그인
            </Button>
          </Stack>
        </Box>
      </Box>
    </ScreenShell>
  )
}
