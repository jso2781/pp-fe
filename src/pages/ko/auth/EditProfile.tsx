/**
 * 화면ID: KIDS-PP-US-JM-09
 * 화면명: 회원정보 수정
 * 화면경로: /ko/auth/EditProfile
 * 화면설명: 회원정보 수정 화면 (KIDS-PP-US-JM-09.pdf 반영)
 */
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, TextField, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DepsLocation from '@/components/common/DepsLocation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { existMbrInfo, updateMbrInfo } from '@/features/mbr/MbrInfoThunks';
import { MbrInfoPVO, MbrInfoRVO, UpdateMbrInfoRVO } from '@/features/mbr/MbrInfoTypes';
import { setAuthUserInfo } from '@/features/auth/AuthSlice';


/**
 * PostgreSQL timestamp without time zone 컬럼에 맞는 형식으로 반환.
 * - toISOString()('2026-01-19T14:28:43.646Z')은 DB에서 varchar로 인식되어 타입 오류 유발.
 * - 'yyyy-MM-dd HH:mm:ss' 형식은 timestamp로 암시 변환 가능.
 */
const toTimestampString = (): string => new Date().toISOString().slice(0, 19).replace('T', ' ');

export default function EditProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Redux에서 사용자 정보 가져오기
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    mbrId: userInfo?.mbrId || '',
    userName: userInfo?.mbrEncptFlnm || '', // 암호화된 이름 (평문으로 표시 불가, 실제로는 복호화 필요)
    phone: userInfo?.mbrEncptTelno || '', // 암호화된 전화번호 (평문으로 표시 불가, 실제로는 복호화 필요)
    email: userInfo?.mbrEncptEml || '', // 암호화된 이메일 (평문으로 표시 불가, 실제로는 복호화 필요)
    password: '',
    confirmPassword: '',
  });

  // 상태 관리
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessages, setSuccessMessages] = useState<Record<string, string>>({});
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false);
  const [isPhoneCertified, setIsPhoneCertified] = useState(false);
  const [anyIdReady, setAnyIdReady] = useState(false);
  const hasFetchedRef = useRef(false);

  // Dialog 상태 관리
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogOnConfirm, setDialogOnConfirm] = useState<(() => void) | null>(null);

  // Any-ID 스크립트 로드 확인
  useEffect(() => {
    const checkAnyIdReady = () => {
      if (window.AnyidC?.LOAD_MODULE) {
        setAnyIdReady(true);
      } else {
        setTimeout(checkAnyIdReady, 100);
      }
    };
    checkAnyIdReady();
  }, []);

  // userInfo가 변경되면 formData 업데이트
  useEffect(() => {
    if (userInfo) {
      setFormData(prev => ({
        ...prev,
        mbrId: userInfo.mbrId || '',
        userName: userInfo.mbrEncptFlnm || '',
        phone: userInfo.mbrEncptTelno || '',
        email: userInfo.mbrEncptEml || '',
      }));
    }
  }, [userInfo]);

  // 이메일 유효성 검사
  const validateEmail = (email: string): string => {
    if (!email || email.trim().length === 0) {
      return ''; // 선택 항목이므로 빈 값은 오류 아님
    }
    const trimmed = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmed)) {
      return t('emailFormatError') || '올바른 이메일 형식이 아닙니다.';
    }
    return '';
  };

  // 비밀번호 유효성 검사 (숫자, 영문, 특수문자 조합 10-20자리)
  const validatePassword = (password: string): string => {
    if (!password || password.trim().length === 0) {
      return t('newPasswordPlaceholder') || '새 비밀번호를 입력해주세요.';
    }
    const trimmed = password.trim();
    if (trimmed.length < 10 || trimmed.length > 20) {
      return t('passwordLengthError') || '비밀번호는 10자 이상 20자 이하여야 합니다.';
    }
    // 숫자, 영문, 특수문자 조합 확인
    const hasNumber = /[0-9]/.test(trimmed);
    const hasLetter = /[a-zA-Z]/.test(trimmed);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(trimmed);
    
    if (!hasNumber || !hasLetter || !hasSpecial) {
      return t('passwordSpecialError') || '비밀번호는 숫자, 영문, 특수문자를 포함해야 합니다.';
    }
    return '';
  };

  // 비밀번호 확인 일치 검증
  const validateConfirmPassword = (confirmPassword: string, password: string): string => {
    if (!confirmPassword || confirmPassword.trim().length === 0) {
      return t('passwordConfirmPlaceholder') || '비밀번호 확인을 입력해주세요.';
    }
    if (confirmPassword !== password) {
      return t('passwordConfirmMismatchReminder') || '비밀번호가 일치하지 않습니다.';
    }
    return '';
  };

  // 입력 필드 변경 핸들러
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // 중복확인 상태 초기화 (값이 변경되면 중복확인 무효화)
    if (field === 'email') {
      setIsEmailChecked(false);
      setEmailAvailable(false);
      setSuccessMessages(prev => ({ ...prev, email: '' }));
    }

    // 실시간 유효성 검사
    let error = '';
    if (field === 'email') {
      error = validateEmail(value);
    } else if (field === 'password') {
      error = validatePassword(value);
      // 비밀번호 변경 시 비밀번호 확인도 재검증
      if (formData.confirmPassword) {
        const confirmError = validateConfirmPassword(formData.confirmPassword, value);
        setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
      }
    } else if (field === 'confirmPassword') {
      error = validateConfirmPassword(value, formData.password);
    }

    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // 이메일 중복확인
  const handleCheckEmailDuplicate = async () => {
    // 이메일이 입력되지 않은 경우 (선택 항목)
    if (!formData.email || formData.email.trim().length === 0) {
      return;
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
      setErrors(prev => ({ ...prev, email: emailError }));
      setIsEmailChecked(false);
      setEmailAvailable(false);
      return;
    }

    try {
      const result = await dispatch(existMbrInfo({ mbrEncptEml: formData.email })).unwrap();
      if (result.existYn === 'Y') {
        setEmailAvailable(false);
        setIsEmailChecked(true);
        setErrors(prev => ({ ...prev, email: t('emailError') || '중복된 이메일입니다. 다른 이메일로 입력해주세요.' }));
        return;
      } else {
        setEmailAvailable(true);
        setIsEmailChecked(true);
        setSuccessMessages(prev => ({ ...prev, email: t('available') || '사용 가능한 이메일입니다.' }));
        setErrors(prev => ({ ...prev, email: '' }));
      }
    } catch (error) {
      console.error(t('emailDuplicateCheckFailed'), error);
      setEmailAvailable(false);
      setIsEmailChecked(true);
      setErrors(prev => ({ ...prev, email: t('emailError') || '이메일 중복확인 중 오류가 발생했습니다.' }));
    }
  };

  // Dialog 열기 함수
  const openDialog = (title: string, message: string, onConfirm?: () => void) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setDialogOnConfirm(() => onConfirm || null);
    setDialogOpen(true);
  };

  // Dialog 닫기 함수
  const closeDialog = () => {
    setDialogOpen(false);
    setDialogTitle('');
    setDialogMessage('');
    setDialogOnConfirm(null);
  };

  // Dialog 확인 버튼 클릭 핸들러
  const handleDialogConfirm = () => {
    if (dialogOnConfirm) {
      dialogOnConfirm();
    }
    closeDialog();
  };

  // 휴대전화번호 변경 (Any-ID 본인인증)
  const handlePhoneChange = () => {
    if (!anyIdReady || !window.AnyidC?.LOAD_MODULE) {
      openDialog(t('error') || '오류', t('certifySelfModuleNotReady') || '본인인증 모듈이 준비되지 않았습니다.');
      return;
    }

    // public 폴더 기준 상대 경로 사용
    const configAnyidcJsonUrl = '/anyid/config/config.anyidc.json';
    const txId = `phone-change-${Date.now()}`;

    // Any-ID 본인인증 랩업 호출
    window.AnyidC.LOAD_MODULE({
      cfg: configAnyidcJsonUrl,
      txId: txId,
      tag: txId,
      lvl: 2, // 휴대폰 SMS 인증 레벨
      bypass: 1,
      toggle: true,
      theme: '4.1.0',
      redirect_uri: window.location.href,
      success: function (data: any) {
        // 본인인증 성공
        setIsPhoneCertified(true);
        // 본인인증 완료된 휴대전화번호로 변경
        // TODO: data에서 전화번호 추출하여 formData.phone 업데이트
        // 예: setFormData(prev => ({ ...prev, phone: data.phone }));
        window.anyidAdaptor?.success?.(data);
      },
      fail: function (err: any) {
        console.error(t('certifySelfFailed'), err);
        setIsPhoneCertified(false);
        openDialog(t('error') || '오류', t('certifySelfFailedReminder') || '본인인증에 실패했습니다.');
      },
      log: function (data: any) {
        console.log('============================ ' + t('anyIdLog') + ' ============================', data);
      },
    });
  };

  // 비밀번호 변경 모드 토글
  const handlePasswordChange = () => {
    setIsPasswordChangeMode(true);
    setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    setErrors(prev => ({ ...prev, password: '', confirmPassword: '' }));
  };

  // 전체 폼 유효성 검사
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 이메일이 입력된 경우에만 검증
    if (formData.email && formData.email.trim().length > 0) {
      const emailError = validateEmail(formData.email);
      if (emailError) newErrors.email = emailError;
      
      // 이메일이 입력된 경우 중복확인 필수
      if (!isEmailChecked || !emailAvailable) {
        newErrors.email = t('emailDuplicateCheckCompleteReminder');
      }
    }

    // 비밀번호 변경 모드인 경우에만 비밀번호 검증
    if (isPasswordChangeMode) {
      const passwordError = validatePassword(formData.password);
      if (passwordError) newErrors.password = passwordError;

      const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);
      if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 저장 버튼 클릭 핸들러
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    // 이메일이 입력된 경우 중복확인 체크
    if (formData.email && formData.email.trim().length > 0) {
      if (!isEmailChecked || !emailAvailable) {
        openDialog(t('error') || '오류', t('emailDuplicateCheckCompleteReminder') || '이메일 중복확인을 완료해주세요.');
        return;
      }
    }

    try {
      const now = toTimestampString();

      // MbrInfoPVO 형식으로 변환
      const mbrInfoPVO: MbrInfoPVO = {
        mbrId: formData.mbrId,
        mbrEncptEml: formData.email || undefined,
        // 비밀번호 변경 모드인 경우에만 비밀번호 업데이트
        ...(isPasswordChangeMode && formData.password ? {
          mbrEnpswd: formData.password,         // 새로운 비밀번호
          bfrEnpswd: userInfo?.mbrEnpswd || '', // 이전 비밀번호 (현재 비밀번호를 이전 비밀번호로 저장)
          pswdChgDt: now                        // 비밀번호 변경일시
        } : {}),
        // 휴대전화번호 변경이 완료된 경우에만 업데이트
        ...(isPhoneCertified && formData.phone ? { mbrEncptTelno: formData.phone } : {}),
      };

      const result: UpdateMbrInfoRVO = await dispatch(updateMbrInfo(mbrInfoPVO)).unwrap();
      if (result?.updateCnt && result.updateCnt > 0) {

        const userInfo: MbrInfoRVO = result.userInfo;

        // 회원정보 수정 성공 시 auth.userInfo 업데이트
        dispatch(setAuthUserInfo(userInfo));

        openDialog(
          t('success') || '성공',
          t('editComplete') || '회원정보가 수정되었습니다.',
          () => navigate('/ko')
        );
      } else {
        openDialog(t('error') || '오류', t('editFailed') || '회원정보 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error(t('editFailed'), error);
      openDialog(t('error') || '오류', t('editFailed') || '회원정보 수정 중 오류가 발생했습니다.');
    }
  };

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
                  <Box className="pageCont-memberEdit member-page">
                    <Box className="bordered-box">
                      <Box component="form" noValidate>
                        <Box className="form-group-wrap">
                          {/* 1.1 아이디 (필수) - 비활성화 */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="mbrId" className="label">
                              {t('mbrId')}
                              <Box component="span" className="necessary" aria-label={t('requiredInput')}>({t('required')})</Box>
                            </Typography>
                            <TextField
                              id="mbrId"
                              value={formData.mbrId}
                              placeholder={t('mbrIdPlaceholder')}
                              size="large"
                              fullWidth
                              disabled
                              slotProps={{
                                htmlInput: {
                                  'aria-required': 'true',
                                },
                              }}
                            />
                          </Box>

                          {/* 1.2 이름 (필수) - 비활성화 */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="userName" className="label">
                              {t('name')}
                              <Box component="span" className="necessary" aria-label={t('requiredInput')}>({t('required')})</Box>
                            </Typography>
                            <TextField
                              id="userName"
                              value={formData.userName}
                              placeholder={t('namePlaceholder')}
                              size="large"
                              fullWidth
                              disabled
                              slotProps={{
                                htmlInput: {
                                  'aria-required': 'true',
                                },
                              }}
                            />
                          </Box>

                          {/* 1.3 휴대전화번호 (필수) - 비활성화, 1.4 번호변경 버튼 */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="phone" className="label">
                              {t('phone')}
                              <Box component="span" className="necessary" aria-label={t('requiredInput')}>({t('required')})</Box>
                            </Typography>
                            <Stack direction="row" spacing={1} className="input-with-btn">
                              <TextField
                                id="phone"
                                value={formData.phone}
                                placeholder={t('phonePlaceholder')}
                                size="large"
                                fullWidth
                                disabled
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                  },
                                }}
                              />
                              <Button
                                variant="outlined"
                                size="large"
                                onClick={handlePhoneChange}
                                aria-label={t('phoneCertify')}
                                className="btn-outline-02 btn-form-util"
                              >
                                {t('phoneChange')}
                              </Button>
                            </Stack>
                          </Box>

                          {/* 1.5 이메일 (선택) - 활성화, 1.6 중복확인 버튼 */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="email" className="label">
                              {t('email')}
                              <Box component="span" className="optional" aria-label={t('optionalInput')}>({t('optional')})</Box>
                            </Typography>
                            <Stack direction="row" spacing={1} className="input-with-btn">
                              <TextField
                                id="email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                placeholder={t('emailPlaceholder')}
                                size="large"
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email || successMessages.email || ''}
                                slotProps={{
                                  htmlInput: {
                                    'aria-describedby': errors.email || successMessages.email ? 'email-alert' : undefined,
                                    autoComplete: 'email',
                                  },
                                  formHelperText: {
                                    id: 'email-alert',
                                    className: errors.email ? 'error-alert' : successMessages.email ? 'success-message' : '',
                                    role: (errors.email || successMessages.email) ? 'alert' : undefined,
                                    'aria-live': (errors.email || successMessages.email) ? 'polite' : undefined,
                                  },
                                }}
                              />
                              <Button
                                variant="outlined"
                                size="large"
                                onClick={handleCheckEmailDuplicate}
                                onMouseDown={(e) => e.preventDefault()}
                                aria-label={t('emailDuplicateCheck')}
                                className="btn-outline-02 btn-form-util"
                                disabled={!formData.email || formData.email.trim().length === 0}
                              >
                                {t('duplicateCheck')}
                              </Button>
                            </Stack>
                          </Box>

                          {/* 1.7 비밀번호 - 변경 버튼 클릭 시 활성화 */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="password" className="label">
                              {t('password')}
                              <Box component="span" className="necessary" aria-label={t('requiredInput')}>({t('required')})</Box>
                            </Typography>
                            <Stack direction="row" spacing={1} className="input-with-btn">
                              <TextField
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                placeholder={isPasswordChangeMode ? t('passwordCombination') : t('passwordPlaceholder')}
                                size="large"
                                fullWidth
                                disabled={!isPasswordChangeMode}
                                error={!!errors.password}
                                helperText={errors.password || ''}
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                    'aria-describedby': errors.password ? 'password-alert' : undefined,
                                    autoComplete: 'new-password',
                                  },
                                  formHelperText: {
                                    id: 'password-alert',
                                    className: errors.password ? 'error-alert' : '',
                                    role: errors.password ? 'alert' : undefined,
                                    'aria-live': errors.password ? 'polite' : undefined,
                                  },
                                }}
                              />
                              <Button
                                variant="outlined"
                                size="large"
                                onClick={handlePasswordChange}
                                aria-label={t('passwordChange')}
                                className="btn-outline-02 btn-form-util"
                                disabled={isPasswordChangeMode}
                              >
                                {t('change')}
                              </Button>
                            </Stack>
                          </Box>

                          {/* 1.8 비밀번호 확인 - 비밀번호 변경 모드일 때만 표시 */}
                          {isPasswordChangeMode && (
                            <Box className="form-item">
                              <Typography component="label" htmlFor="confirmPassword" className="label">
                                {t('passwordConfirm')}
                                <Box component="span" className="necessary" aria-label={t('requiredInput')}>({t('required')})</Box>
                              </Typography>
                              <TextField
                                id="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                placeholder={t('passwordConfirmPlaceholder')}
                                size="large"
                                fullWidth
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword || ''}
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                    'aria-describedby': errors.confirmPassword ? 'confirmPassword-alert' : undefined,
                                    autoComplete: 'new-password',
                                  },
                                  formHelperText: {
                                    id: 'confirmPassword-alert',
                                    className: errors.confirmPassword ? 'error-alert' : '',
                                    role: errors.confirmPassword ? 'alert' : undefined,
                                    'aria-live': errors.confirmPassword ? 'polite' : undefined,
                                  },
                                }}
                              />
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>

                    <Stack direction="row" className="form-helper-group">
                      <Typography className="txt">
                        {t('mbrWithdrawalReminder')}
                      </Typography>
                      <Button
                        variant="text"
                        className="btn-link"
                        endIcon={<ChevronRightIcon />}
                      >
                        {t('mbrWithdrawal')}
                      </Button>
                    </Stack>

                    {/* 하단 버튼 영역 */}
                    <Box className="btn-group between">
                      <Button variant="outlined" size="large" onClick={() => navigate(-1)}>
                        {t('cancel')}
                      </Button>
                      <Button variant="contained" size="large" onClick={handleSave}>
                        {t('editComplete')}
                      </Button>
                    </Box>
                  </Box>
                  {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* 알림 Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <Divider />
        <DialogContent>
          <Typography variant="body1">
            {dialogMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>{t('cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleDialogConfirm}
            autoFocus
          >
            {t('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
