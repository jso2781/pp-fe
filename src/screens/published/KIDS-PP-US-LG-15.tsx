import React from 'react';
import { useState, useEffect } from 'react'
import { Alert, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, Link, Stack, TextField, Typography, List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import DepsLocation from '@/components/common/DepsLocation'
import ScreenShell from '../ScreenShell'

const STORAGE_KEY_REMEMBER_ID = 'kids_login_remember_id'
const STORAGE_KEY_PASSWORD_CHANGE_REMINDER = 'kids_password_change_reminder'
const PASSWORD_CHANGE_REMINDER_DAYS = 80 // 80일 전부터 알림

type LoginValues = {
  loginId: string
  password: string
  rememberId: boolean
}

type LoginFailInfo = {
  reason: string
  failedCount: number
  isIdError?: boolean
}

const KOREAN_REGEX = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g
const MAX_LENGTH = 20
const MAX_FAIL_COUNT = 5

export default function KIDS_PP_US_LG_15() {
  const navigate = useNavigate()
  const [values, setValues] = useState<LoginValues>({ loginId: '', password: '', rememberId: false })
  const [errors, setErrors] = useState<Partial<Record<keyof LoginValues, string>>>({})
  const [loginFail, setLoginFail] = useState<LoginFailInfo | null>(null)
  const [localFailCount, setLocalFailCount] = useState(0)
  const [showPasswordErrorPopup, setShowPasswordErrorPopup] = useState(false)
  const [showPasswordChangeReminder, setShowPasswordChangeReminder] = useState(false)

  // 아이디 저장 기능: 페이지 로드 시 저장된 아이디 불러오기
  useEffect(() => {
    const savedId = localStorage.getItem(STORAGE_KEY_REMEMBER_ID)
    if (savedId) {
      setValues((p) => ({ ...p, loginId: savedId, rememberId: true }))
    }
  }, [])

  // 비밀번호 변경 안내 팝업 표시 여부 확인
  // Description: 회원가입 또는 비밀번호 변경 후 80일 전부터 메시지 노출
  const checkPasswordChangeReminder = () => {
    const reminderDate = localStorage.getItem(STORAGE_KEY_PASSWORD_CHANGE_REMINDER)
    if (reminderDate) {
      const reminder = new Date(reminderDate)
      const now = new Date()
      // 아직 알림 날짜가 지나지 않았으면 표시하지 않음
      if (now < reminder) {
        return false
      }
    }

    // TODO: 실제 로그인 성공 후 서버에서 비밀번호 변경 필요 여부 확인
    // 비밀번호 변경 정책: 비밀번호는 90일마다 변경 필요
    // 80일 전부터 알림 시작 (즉, 변경 후 10일 후부터 알림)
    // const passwordLastChanged = response.data.passwordLastChanged // 서버에서 받아온 마지막 변경일 (회원가입일 또는 마지막 변경일)
    // const now = new Date()
    // const daysSinceChange = Math.floor((now.getTime() - new Date(passwordLastChanged).getTime()) / (1000 * 60 * 60 * 24))
    // const daysUntilExpiry = 90 - daysSinceChange
    // if (daysUntilExpiry <= PASSWORD_CHANGE_REMINDER_DAYS && daysUntilExpiry > 0) {
    //   return true // 80일 전부터 알림 시작
    // }

    // 샘플: 테스트를 위해 false 반환 (실제로는 위의 로직 사용)
    return false // 실제 구현 시 위의 주석 처리된 로직 사용
  }

  const validate = (v: LoginValues) => {
    const next: Partial<Record<keyof LoginValues, string>> = {}
    if (!v.loginId.trim()) {
      next.loginId = '아이디를 입력하세요.'
    } else if (v.loginId.trim().length < 2) {
      next.loginId = '최소 두자리 수 이상 입력해주세요.'
    } else if (KOREAN_REGEX.test(v.loginId)) {
      next.loginId = '아이디에는 한글을 입력할 수 없습니다.'
    }
    if (!v.password.trim()) {
      next.password = '비밀번호를 입력하세요.'
    }
    return next
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length) return

    // 아이디 저장 기능
    if (values.rememberId) {
      localStorage.setItem(STORAGE_KEY_REMEMBER_ID, values.loginId)
    } else {
      localStorage.removeItem(STORAGE_KEY_REMEMBER_ID)
    }

    try {
      // TODO: 실제 로그인 API 호출
      // const response = await https.post('/auth/login', {
      //   loginId: values.loginId,
      //   password: values.password,
      // })

      // 샘플: 실패횟수 시뮬레이션 (실제로는 서버에서 실패 횟수를 관리)
      const nextCount = localFailCount + 1
      setLocalFailCount(nextCount)

      // 5회째 실패 시 팝업 표시
      if (nextCount >= MAX_FAIL_COUNT) {
        setShowPasswordErrorPopup(true)
        setLoginFail(null)
        return
      }

      // 4회째까지만 오류 횟수 노출
      if (nextCount <= 4) {
        setLoginFail({
          reason: '아이디 또는 비밀번호가 일치하지 않습니다.',
          failedCount: nextCount,
          isIdError: false,
        })
        setErrors({ password: `아이디 또는 비밀번호가 일치하지 않습니다. (${nextCount}/${MAX_FAIL_COUNT})` })
      } else {
        setLoginFail(null)
        setErrors({})
      }

      // 샘플: 실제 로그인 성공 시 아래 코드 실행
      // const userType = response.data.userType // 'general' | 'expert'
      
      // 비밀번호 변경 안내 팝업 표시 여부 확인
      if (checkPasswordChangeReminder()) {
        setShowPasswordChangeReminder(true)
      } else {
        // 비밀번호 변경 안내가 필요 없으면 정상 로그인 처리
        // if (userType === 'expert') {
        //   navigate('/screens/KIDS-PP-US-MT-01')
        // } else {
        //   navigate('/ko') // 일반 회원은 메인 페이지로
        // }
        window.alert('샘플 화면입니다. (로그인 API 미연동)')
      }
    } catch (error: any) {
      // 서버 에러 처리
      const nextCount = localFailCount + 1
      setLocalFailCount(nextCount)

      if (nextCount >= MAX_FAIL_COUNT) {
        setShowPasswordErrorPopup(true)
        setLoginFail(null)
        return
      }

      if (nextCount <= 4) {
        setLoginFail({
          reason: '아이디 또는 비밀번호가 일치하지 않습니다.',
          failedCount: nextCount,
          isIdError: false,
        })
        setErrors({ password: `아이디 또는 비밀번호가 일치하지 않습니다. (${nextCount}/${MAX_FAIL_COUNT})` })
      }
    }
  }

  return (
    <ScreenShell screenId="KIDS-PP-US-LG-15" title="아이디 로그인" uiType="input">

      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">
            {/* 서브 콘텐츠 영역 */}
            <Box className="sub-content">
              {/* 상단 현재 위치 정보 */}
              <DepsLocation />
              <Box className="content-view" id="content">
                <Box className="page-content">
                  {/* --- 본문 시작 --- */}
                  <Box className="page-content__login">
                    <Box className="login-section__form">
                      <Box className="form-item">
                        <Typography component="label" htmlFor="loginId" className="label">
                          아이디
                        </Typography>
                        <TextField
                          id="loginId" // 라벨의 htmlFor와 일치
                          placeholder="아이디 혹은 이메일을 입력하세요."
                          size="large"
                          value={values.loginId}
                          onChange={(e) => {
                            let v = e.target.value.replace(KOREAN_REGEX, '')
                            // 최대 20자 제한
                            if (v.length > MAX_LENGTH) {
                              v = v.slice(0, MAX_LENGTH)
                            }
                            setValues((p) => ({ ...p, loginId: v }))
                            // 입력 시 에러 초기화
                            if (errors.loginId) {
                              setErrors((prev) => ({ ...prev, loginId: undefined }))
                            }
                          }}
                          error={!!errors.loginId}
                          helperText={errors.loginId}
                          fullWidth
                          inputProps={{ maxLength: MAX_LENGTH }}
                          // 스크린 리더가 입력 형식을 미리 알 수 있도록 설명 연결
                          slotProps={{
                            htmlInput: {
                              'aria-describedby': 'loginId-alert',
                            },
                          }}
                        />
                        <Alert severity="error" className="error-alert" id="loginId-alert" role="alert">
                          최소 두자리 수 이상 입력해주세요.
                        </Alert>
                      </Box>

                      <Box className="form-item">
                        <Typography  component="label" htmlFor="password-input" className="label">
                          비밀번호
                        </Typography>
                        <TextField
                          id="password-input"
                          placeholder="비밀번호를 입력하세요."
                          size="large"
                          type="password"
                          value={values.password}
                          onChange={(e) => {
                            let v = e.target.value
                            // 최대 20자 제한
                            if (v.length > MAX_LENGTH) {
                              v = v.slice(0, MAX_LENGTH)
                            }
                            setValues((p) => ({ ...p, password: v }))
                            // 입력 시 에러 초기화
                            if (errors.password) {
                              setErrors((prev) => ({ ...prev, password: undefined }))
                              setLoginFail(null)
                            }
                          }}
                          error={!!errors.password || !!loginFail}
                          helperText={errors.password || (loginFail && !errors.password ? `${loginFail.reason} (${loginFail.failedCount}/${MAX_FAIL_COUNT})` : '')}
                          fullWidth
                          inputProps={{ maxLength: MAX_LENGTH }}
                          // 스크린 리더가 입력 형식을 미리 알 수 있도록 설명 연결
                          slotProps={{
                            htmlInput: {
                              'aria-describedby': 'password-input-alert',
                            },
                          }}
                        />
                        <Alert severity="error" className="error-alert" id="password-input-alert" role="alert">
                          아이디 / 이메일 또는 비밀번호가 일치하지 않습니다. (1/5)
                        </Alert>
                      </Box>

                      <FormControlLabel
                        control={
                          <Checkbox
                            // 1. 보조 기기에서 체크박스의 상태 변화를 더 잘 인지하도록 속성 추가
                            inputProps={{ 
                              'aria-label': '아이디 저장 여부 선택',
                              'role': 'checkbox'
                            }}
                            checked={values.rememberId}
                            onChange={(e) => {
                              const checked = e.target.checked
                              setValues((p) => ({ ...p, rememberId: checked }))
                              // 체크 해제 시 localStorage에서도 제거
                              if (!checked) {
                                localStorage.removeItem(STORAGE_KEY_REMEMBER_ID)
                              }
                            }}
                            // 2. 키보드 탭(Tab) 이동 시 시각적 포커스를 명확히 함 (MUI 기본 지원되지만 확인)
                            disableRipple={false} 
                          />
                        }
                        label={
                          <Typography>
                            아이디 저장
                          </Typography>
                        }
                      />
                      <Box className="login-actions">
                        <Button variant="contained" type="submit" size="large" fullWidth>
                          로그인
                        </Button>
                      </Box>
                      <List className="account-utils" component="nav" aria-label="계정 관리 메뉴">
                        {[
                          { label: '회원가입', path: '/screens/KIDS-PP-US-JM-01' },
                          { label: '아이디 찾기', path: '/screens/KIDS-PP-US-LG-06' },
                          { label: '비밀번호 찾기', path: '/screens/KIDS-PP-US-LG-08' }
                        ].map((item, index, array) => (
                          <React.Fragment key={item.label}>
                            <ListItem disablePadding className="account-utils__item">
                              <Link
                                component="button"
                                onClick={() => navigate(item.path)}
                                className="account-utils__link"
                              >
                                {item.label}
                              </Link>
                            </ListItem>
                            {index < array.length - 1 && (
                              <Divider orientation="vertical" flexItem className="account-utils__divider" />
                            )}
                          </React.Fragment>
                        ))}
                      </List>
                    </Box>
                    <Box className="login-section__notice">
                      <Box component="ul" className="bullet-list">
                        <li>개인정보 보호를 위해 비밀번호 5회 이상 오류 시, 비밀번호 재설정이 필요합니다.</li>
                        <li>비밀번호는 주기적(3개월)으로 변경하시고, 서비스 이용 후 반드시 로그아웃 하시기 바랍니다.</li>
                        <li>로그인 후 60분 동안 미동작 시 자동으로 로그아웃 됩니다.</li>
                      </Box>
                    </Box>
                  </Box>
                  {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* <Box sx={{ p: 2, maxWidth: 520, mx: 'auto' }}>
        <Box component="form" onSubmit={onSubmit} noValidate> */}
          {/* <Stack spacing={2}>
            <TextField
              label="아이디"
              placeholder="아이디 혹은 이메일을 입력하세요."
              value={values.loginId}
              onChange={(e) => {
                let v = e.target.value.replace(KOREAN_REGEX, '')
                // 최대 20자 제한
                if (v.length > MAX_LENGTH) {
                  v = v.slice(0, MAX_LENGTH)
                }
                setValues((p) => ({ ...p, loginId: v }))
                // 입력 시 에러 초기화
                if (errors.loginId) {
                  setErrors((prev) => ({ ...prev, loginId: undefined }))
                }
              }}
              error={!!errors.loginId}
              helperText={errors.loginId}
              fullWidth
              inputProps={{ maxLength: MAX_LENGTH }}
            />

            <TextField
              label="비밀번호"
              placeholder="비밀번호를 입력하세요."
              type="password"
              value={values.password}
              onChange={(e) => {
                let v = e.target.value
                // 최대 20자 제한
                if (v.length > MAX_LENGTH) {
                  v = v.slice(0, MAX_LENGTH)
                }
                setValues((p) => ({ ...p, password: v }))
                // 입력 시 에러 초기화
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: undefined }))
                  setLoginFail(null)
                }
              }}
              error={!!errors.password || !!loginFail}
              helperText={errors.password || (loginFail && !errors.password ? `${loginFail.reason} (${loginFail.failedCount}/${MAX_FAIL_COUNT})` : '')}
              fullWidth
              inputProps={{ maxLength: MAX_LENGTH }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={values.rememberId}
                  onChange={(e) => {
                    const checked = e.target.checked
                    setValues((p) => ({ ...p, rememberId: checked }))
                    // 체크 해제 시 localStorage에서도 제거
                    if (!checked) {
                      localStorage.removeItem(STORAGE_KEY_REMEMBER_ID)
                    }
                  }}
                />
              }
              label="아이디 저장"
            />

            <Button variant="contained" type="submit" size="large">
              로그인
            </Button> */}

            {/* 회원가입, 아이디 찾기, 비밀번호 찾기 링크 */}
            {/* <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 1 }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/screens/KIDS-PP-US-JM-01')}
                sx={{
                  cursor: 'pointer',
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: 'primary.main',
                  },
                }}
              >
                회원가입
              </Link>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/screens/KIDS-PP-US-LG-06')}
                sx={{
                  cursor: 'pointer',
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: 'primary.main',
                  },
                }}
              >
                아이디 찾기
              </Link>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/screens/KIDS-PP-US-LG-08')}
                sx={{
                  cursor: 'pointer',
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: 'primary.main',
                  },
                }}
              >
                비밀번호 찾기
              </Link>
            </Stack> */}
          {/* </Stack>
        </Box>
      </Box> */}

      {/* 비밀번호 5회 오류 팝업 */}
      <Dialog
        open={showPasswordErrorPopup}
        onClose={() => setShowPasswordErrorPopup(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>비밀번호 5회 오류</DialogTitle>
        <Divider />
        <DialogContent>
          <Typography variant="body1">
            비밀번호가 5회이상 잘못입력되어, 비밀번호를 재설정 후 이용할 수 있습니다. 비밀번호를 재설정하시겠습니까?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPasswordErrorPopup(false)}>취소</Button>
          <Button
            variant="contained"
            onClick={() => {
              setShowPasswordErrorPopup(false)
              navigate('/screens/KIDS-PP-US-LG-08') // 비밀번호 찾기 페이지로 이동
            }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>

      {/* 비밀번호 변경 안내 팝업 (KIDS-PP-US-LG-16) */}
      <Dialog
        open={showPasswordChangeReminder}
        onClose={undefined} // 팝업은 버튼으로만 닫을 수 있음
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>비밀번호 변경 안내</DialogTitle>
        <Divider />
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 1 }}>
            회원님께서 비밀번호를 변경하신지 90일이 이상 경과되어 안내해드립니다.
          </Typography>
          <Typography variant="body1">
            비밀번호를 변경하시려면 지금 변경 버튼을 클릭해주세요.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              // 나중에 변경: 팝업 닫고 +80일 후 다시 알림
              // 해당 회원의 비밀번호 유효기간을 버튼을 클릭한 일자를 기준으로 +80일 뒤에 다시 알림 메시지 노출
              const nextReminderDate = new Date()
              nextReminderDate.setDate(nextReminderDate.getDate() + PASSWORD_CHANGE_REMINDER_DAYS)
              localStorage.setItem(STORAGE_KEY_PASSWORD_CHANGE_REMINDER, nextReminderDate.toISOString())
              setShowPasswordChangeReminder(false)
              
              // 정상 로그인 처리 계속
              // TODO: 실제 로그인 성공 처리
              // const userType = response.data.userType
              // if (userType === 'expert') {
              //   navigate('/screens/KIDS-PP-US-MT-01')
              // } else {
              //   navigate('/ko')
              // }
            }}
          >
            나중에 변경
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              // 지금 변경: 팝업 닫고 비밀번호 재설정 페이지로 이동
              setShowPasswordChangeReminder(false)
              navigate('/screens/KIDS-PP-US-LG-09')
            }}
          >
            지금 변경
          </Button>
        </DialogActions>
      </Dialog>
    </ScreenShell>
  )
}
