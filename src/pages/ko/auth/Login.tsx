/**
 * 화면ID: KIDS-PP-US-LG-15
 * 화면명: KIDS 아이디 로그인
 * 화면경로: /ko/auth/Login
 * 화면설명: KIDS 아이디 로그인 화면
 */
import React from 'react';
import { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useAuth } from '@/contexts/AuthContext'
import { login as loginThunk } from '@/features/auth/AuthThunks';
import { Box, Button, Checkbox, Divider, FormControlLabel, Link, Stack, TextField, Typography, List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import DepsLocation from '@/components/common/DepsLocation'
import { useTranslation } from 'react-i18next';
import { useDialog } from '@/contexts/DialogContext';

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

export default function Login() {
  const { t, i18n: i18nInstance } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth(); // login 함수는 사용하지 않음 (Redux가 소스)
  const { showAlert, showConfirmBackdrop, showDialogBackdrop } = useDialog();
  const auth = useAppSelector((s) => s.auth);
  const { userInfo, tokenId, accessToken, refreshToken, pswdErrNmtm, loading } = auth || {};
  // console.log("Login auth userInfo=", userInfo);
  // console.log("Login auth tokenId=", tokenId);
  // console.log("Login auth accessToken=", accessToken);
  // console.log("Login auth refreshToken=", refreshToken);
  // console.log("Login auth pswdErrNmtm=", pswdErrNmtm);
  // console.log("Login auth loading=",loading);
  
  const [values, setValues] = useState<LoginValues>({ loginId: '', password: '', rememberId: false })
  const [errors, setErrors] = useState<Partial<Record<keyof LoginValues, string>>>({})
  const [loginFail, setLoginFail] = useState<LoginFailInfo | null>(null)
  const [localFailCount, setLocalFailCount] = useState(0)
  const hasCheckedAuth = useRef(false);
  const [isRehydrated, setIsRehydrated] = useState(false) // Redux Persist rehydrate 완료 여부

  // 아이디 저장 기능: 페이지 로드 시 저장된 아이디 불러오기
  useEffect(() => {
    const savedId = sessionStorage.getItem(STORAGE_KEY_REMEMBER_ID)
    if (savedId) {
      setValues((p) => ({ ...p, loginId: savedId, rememberId: true }))
    }
  }, []);

  // isAuthenticated 변경 시에만 로그 출력 (StrictMode로 인한 중복 호출 방지)
  useEffect(() => {
    console.log('========================= Login isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  // 비밀번호 변경 안내 팝업 표시 여부 확인
  // Description: 회원가입 또는 비밀번호 변경 후 80일 전부터 메시지 노출
  const checkPasswordChangeReminder = () => {
    const reminderDate = sessionStorage.getItem(STORAGE_KEY_PASSWORD_CHANGE_REMINDER)
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
      next.loginId = t('idPlaceholder')
    } else if (v.loginId.trim().length < 2) {
      next.loginId = t('minimumTwoCharacters')
    } else if (KOREAN_REGEX.test(v.loginId)) {
      next.loginId = t('idCannotContainKorean')
    }
    if (!v.password.trim()) {
      next.password = t('passwordPlaceholder')
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
      sessionStorage.setItem(STORAGE_KEY_REMEMBER_ID, values.loginId)
    } else {
      sessionStorage.removeItem(STORAGE_KEY_REMEMBER_ID)
    }

    try{
      const res = await dispatch(loginThunk({ mbrId: values.loginId, mbrEnpswd: values.password, appId: import.meta.env.VITE_APP_ID ?? 'kids-pp-dev' })).unwrap();

      const userInfo = res.userInfo;

      /**
       * 로그인 결과에 비밀번호오류횟수(pswdErrNmtm) 값이 없으면 로컬 카운트를 증가시킴(이 경우 입력한 사용자ID로 사용자 정보를 못 찾은 경우임)
       * 로그인 결과에 비밀번호오류횟수(pswdErrNmtm) 값이 있으면 서버 값을 우선 사용하여 로컬 카운트를 업데이트
       * 여기서 로그인 결과에 회원정보(userInfo)가 없으면서 비밀번호오류횟수(pswdErrNmtm) 값만 있으면 사용자 정보는 존재하는데 패스워드가 불일치 하는 경우임.
       */
      const pswdErrNmtm = res.pswdErrNmtm !== null ? res.pswdErrNmtm : (localFailCount + 1);

      console.log("login await dispatch(loginThunk~~ res=",res);

      // 로그인 결과에 회원정보(userInfo)가 없으면 로그인 실패 처리 진행
      if(!userInfo && pswdErrNmtm > 0) {
        setLocalFailCount(pswdErrNmtm);

        // 5회째 실패 시 팝업 표시 (showConfirmBackdrop)
        if (pswdErrNmtm >= MAX_FAIL_COUNT) {
          setLoginFail(null);
          showConfirmBackdrop(
            t('passwordError5TimesMessage'),
            t('passwordError5Times'),
            () => navigate('/ko/auth/findPw'),
            () => {}
          );
          return; // 로그인 실패 - 리다이렉트하지 않음
        }

        // 4회째까지만 오류 횟수 노출
        if(pswdErrNmtm <= 4){
          setLoginFail({
            reason: t('passwordMismatch'),
            failedCount: pswdErrNmtm,
            isIdError: false,
          })
          setErrors({ password: `${t('passwordMismatch')} (${pswdErrNmtm}/${MAX_FAIL_COUNT})` })
        }else{
          setLoginFail(null)
          setErrors({})
        }
        showAlert(t('loginFail'), t('error'),() =>{
          return; // 로그인 실패 - 리다이렉트하지 않음
        });
        return; // 로그인 실패 - 리다이렉트하지 않음
      }
      
      // 비밀번호 변경 안내 팝업 표시 여부 확인 (showDialogBackdrop)
      if (checkPasswordChangeReminder()) {
        showDialogBackdrop({
          message: `${t('passwordChangeReminderMessage')}\n\n${t('passwordChangeReminderMessage2')}`,
          title: t('passwordChangeTitle'),
          type: 'confirm',
          cancelText: t('laterChange'),
          confirmText: t('nowChange'),
          onCancel: () => {
            const nextReminderDate = new Date();
            nextReminderDate.setDate(nextReminderDate.getDate() + PASSWORD_CHANGE_REMINDER_DAYS);
            sessionStorage.setItem(STORAGE_KEY_PASSWORD_CHANGE_REMINDER, nextReminderDate.toISOString());
            navigate('/ko', { replace: true });
          },
          onConfirm: () => {
            navigate('/screens/KIDS-PP-US-LG-09');
          },
        });
      } else {
        setTimeout(() => {
          navigate('/ko', { replace: true }) // 일반 회원은 메인 페이지로
        }, 100);
      }
    }catch(error: any){
      console.log("login await dispatch(loginThunk~~ error=",error);

      console.log("login await dispatch(loginThunk~~ typeof error === 'string' =",typeof error === 'string');
      // 서버 에러 처리
      try{
        const errorInfo = typeof error === 'string' ? JSON.parse(error) : error;
        if(errorInfo?.code === -1){
          // alert(errorInfo.msg);
          showAlert(t('systemErrorTitle'), t('systemErrorMessage'));
          return;
        }
      }catch(e){
        // JSON 파싱 실패 시 무시 (일반 에러 메시지인 경우)
      }

      // 로컬 실패 카운트 증가
      const nextCount = localFailCount + 1;

      setLocalFailCount(nextCount);

      // 5회째 실패 시 팝업 표시 (showConfirmBackdrop)
      if (nextCount >= MAX_FAIL_COUNT) {
        setLoginFail(null);
        showConfirmBackdrop(
          t('passwordError5TimesMessage'),
          t('passwordError5Times'),
          () => navigate('/ko/auth/findPw'),
          () => {}
        );
        return;
      }

      // 4회째까지만 오류 횟수 노출
      if(nextCount <= 4){
        setLoginFail({
          reason: t('passwordMismatch'),
          failedCount: nextCount,
          isIdError: false,
        })
        setErrors({ password: `${t('passwordMismatch')} (${nextCount}/${MAX_FAIL_COUNT})` })
      }else{
        setLoginFail(null)
        setErrors({})
      }
    }
  }

  return (
    <>
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
                      <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
                        {/* 브라우저 자동입력이 더미를 채우도록 유도 (Chrome 등은 autocomplete="off"를 로그인 필드에서 무시함) */}
                        <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
                          <input type="text" name="username" autoComplete="username" tabIndex={-1} />
                          <input type="password" name="password" autoComplete="current-password" tabIndex={-1} />
                        </div>
                        <Box className="form-item">
                          <Typography component="label" htmlFor="loginId" className="label">
                            {t('login')}
                          </Typography>
                          <TextField
                            id="loginId"
                            name="kids_uid"
                            placeholder={t('idPlaceholder')}
                            size="large"
                            value={values.loginId}
                            onChange={(e) => {
                              let v = e.target.value.replace(KOREAN_REGEX, '')
                              if (v.length > MAX_LENGTH) v = v.slice(0, MAX_LENGTH)
                              setValues((p) => ({ ...p, loginId: v }))
                              if (errors.loginId) setErrors((prev) => ({ ...prev, loginId: undefined }))
                            }}
                            error={!!errors.loginId}
                            helperText={errors.loginId}
                            fullWidth
                            inputProps={{ maxLength: MAX_LENGTH, autoComplete: 'username', inputMode: 'text' }}
                            slotProps={{
                              htmlInput: { 'aria-describedby': errors.loginId ? 'loginId-alert' : undefined },
                              formHelperText: {
                                id: 'loginId-alert',
                                className: 'error-alert',
                                role: errors.loginId ? 'alert' : undefined,
                                'aria-live': errors.loginId ? 'polite' : undefined,
                              },
                            }}
                          />
                        </Box>

                        <Box className="form-item">
                          <Typography component="label" htmlFor="password-input" className="label">
                            {t('password')}
                          </Typography>
                          <TextField
                            id="password-input"
                            name="kids_cred"
                            placeholder={t('passwordPlaceholder')}
                            size="large"
                            type="password"
                            value={values.password}
                            onChange={(e) => {
                              let v = e.target.value
                              if (v.length > MAX_LENGTH) v = v.slice(0, MAX_LENGTH)
                              setValues((p) => ({ ...p, password: v }))
                              if (errors.password) {
                                setErrors((prev) => ({ ...prev, password: undefined }))
                                setLoginFail(null)
                              }
                            }}
                            error={!!errors.password || !!loginFail}
                            helperText={errors.password || (loginFail ? `${loginFail.reason} (${loginFail.failedCount}/${MAX_FAIL_COUNT})` : '')}
                            fullWidth
                            inputProps={{ maxLength: MAX_LENGTH, autoComplete: 'new-password' }}
                            slotProps={{
                              htmlInput: { 'aria-describedby': (errors.password || loginFail) ? 'password-input-alert' : undefined },
                              formHelperText: {
                                id: 'password-input-alert',
                                className: 'error-alert',
                                role: (errors.password || loginFail) ? 'alert' : undefined,
                                'aria-live': (errors.password || loginFail) ? 'polite' : undefined,
                              },
                            }}
                          />
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
                                  sessionStorage.removeItem(STORAGE_KEY_REMEMBER_ID)
                                }
                              }}
                              // 2. 키보드 탭(Tab) 이동 시 시각적 포커스를 명확히 함 (MUI 기본 지원되지만 확인)
                              disableRipple={false} 
                            />
                          }
                          label={
                            <Typography>
                              {t('rememberId')}
                            </Typography>
                          }
                        />
                        <Box className="login-actions">
                          <Button variant="contained" type="submit" size="large" fullWidth>
                            {t('login')}
                          </Button>
                        </Box>
                        <List className="account-utils" component="nav" aria-label={t('accountManagementMenu')}>
                          <React.Fragment key="signup">
                            <ListItem disablePadding className="account-utils__item">
                              <Link
                                component="button"
                                onClick={() => navigate('/ko/auth/SignUpSel')}
                                className="account-utils__link"
                              >
                                {t('signUp')}
                              </Link>
                            </ListItem>
                            <Divider orientation="vertical" flexItem className="account-utils__divider" />
                          </React.Fragment>
                          <React.Fragment key="findId">
                            <ListItem disablePadding className="account-utils__item">
                              <Link
                                component="button"
                                onClick={() => navigate('/ko/auth/FindId')}
                                className="account-utils__link"
                              >
                                {t('findId')}
                              </Link>
                            </ListItem>
                            <Divider orientation="vertical" flexItem className="account-utils__divider" />
                          </React.Fragment>
                          <React.Fragment key="findPassword">
                            <ListItem disablePadding className="account-utils__item">
                              <Link
                                component="button"
                                onClick={() => navigate('/ko/auth/FindPw')}
                                className="account-utils__link"
                              >
                                {t('findPassword')}
                              </Link>
                            </ListItem>
                          </React.Fragment>
                        </List>
                      </Box>
                    </Box>
                    <Box className="login-section__notice">
                      <Box component="ul" className="bullet-list">
                        <li>{t('passwordErrorReminder')}</li>
                        <li>{t('passwordChangeReminder')}</li>
                        <li>{t('logoutAfter60Minutes')}</li>
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

    </>
  )
}
