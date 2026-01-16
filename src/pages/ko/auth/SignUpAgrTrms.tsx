/**
 * 화면ID: KIDS-PP-US-JM-02
 * 화면명: 약관 동의
 * 화면경로: /ko/auth/SignUpAgrTrms
 * 화면설명: 약관 동의 화면
 */
import { useTranslation } from 'react-i18next'
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Stepper, Step, StepLabel, Typography, Checkbox, FormControlLabel, List, ListItem, Dialog, DialogTitle, DialogContent, DialogActions, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DepsLocation from '@/components/common/DepsLocation'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectTrmsListForSignUp } from '@/features/stt/TrmsSttThunks'
import type { TrmsSttRVO } from '@/features/stt/TrmsSttTypes'

// --- 약관 상세 컨텐츠 (모달 내부에 들어갈 내용) ---
interface TermsDetailProps {
  list: TrmsSttRVO[];
  popupId: string;
  defaultContent: string;
}

const TermsDetail: React.FC<TermsDetailProps> = ({ list, popupId, defaultContent }) => {
  const termData = useMemo(() => {
    // console.log("TermsDetail useMemo list=", list);
    // console.log("TermsDetail useMemo popupId=", popupId);
    const found = list.find(item => {
      // trmsSttCd에 공백이 포함될 수 있으므로 trim()으로 비교
      const itemCode = item.trmsSttCd?.trim() || '';
      const searchCode = popupId.trim();
      // console.log("TermsDetail comparing item.trmsSttCd=", item.trmsSttCd, "(trimmed:", itemCode, ") with popupId=", popupId, "(trimmed:", searchCode, ")");
      return itemCode === searchCode;
    });
    // console.log("TermsDetail useMemo found=", found);
    return found;
  }, [list, popupId]);

  const content = termData?.trmsSttCn || defaultContent;

  // console.log("TermsDetail termData=", termData);
  // console.log("TermsDetail termData?.trmsSttCn=", termData?.trmsSttCn);
  // console.log("TermsDetail defaultContent=", defaultContent);
  // console.log("TermsDetail final content=", content);
  
  // HTML 태그가 포함된 경우 dangerouslySetInnerHTML 사용, 아니면 일반 텍스트로 표시
  const hasHtmlTags = /<[^>]+>/.test(content);

  if (hasHtmlTags) {
    return <Box dangerouslySetInnerHTML={{ __html: content }} />;
  }else{
    return <Box><pre>{content}</pre></Box>;
  }

  // return <Box>{content}</Box>;
};

export default function SignUpAgrTrms() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n: i18nInstance } = useTranslation();
  const screenId = "SignUpAgrTrms"
  const currentStep = 1

  const dispatch = useAppDispatch();
  const { list, totalCount, loading, error } = useAppSelector((state) => state.stt);
  const hasFetchedRef = useRef(false); // 한 번만 호출되도록 보장하는 ref

  useEffect(() => {
    // 화면 진입 시 한 번만 조회
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      dispatch(selectTrmsListForSignUp());
    }
  }, [dispatch]);

  // console.log("list=",list);
  // console.log("totalCount=",totalCount);
  // console.log("loading=",loading);
  // console.log("error=",error);

  const steps = [
    { label: t('step1'), description: t('signUpSelect') },
    { label: t('step2'), description: t('signUpAgree') },
    { label: t('step3'), description: t('certifySelf') },
    { label: t('step4'), description: t('inputMbrInfo') },
    { label: t('step5'), description: t('signUpComplete') },
  ]

  // --- 모달 제어 로직 시작 ---
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{ popupId: string, title: string, content: React.ReactNode | null, setter: ((checked: boolean) => void) | null }>({ popupId: '', title: '', content: null, setter: null });

  // 약관별 기본 내용 매핑
  const getDefaultContent = (popupId: string): string => {
    const defaultContents: Record<string, string> = {
      'UTZTN': '이용약관 상세 내용입니다.<br/>내용이 길어지면 자동으로 스크롤이 생성됩니다.',
      'CLCT': '개인정보 수집 및 이용동의 상세 내용입니다.',
      'STTY_AGT': '만 14세 미만 아동에 관한 개인정보 수집〮이용 동의_법정대리인 상세 내용입니다.',
      'STT_PRVC': '개인정보취급방침 상세 내용입니다.',
    };
    return defaultContents[popupId] || '약관 내용이 없습니다.';
  };

  const handleShowModal = useCallback((popupId: string, title: string, setter: (checked: boolean) => void) => {
    // console.log("handleShowModal popupId=", popupId);
    // console.log("handleShowModal list=", list);
    // console.log("handleShowModal list.length=", list.length);
    
    // list에서 해당 약관 찾기
    const foundTerm = list.find(item => item.trmsSttCd === popupId);
    // console.log("handleShowModal foundTerm=", foundTerm);
    // console.log("handleShowModal foundTerm?.trmsSttCn=", foundTerm?.trmsSttCn);
    
    const content = <TermsDetail list={list} popupId={popupId} defaultContent={getDefaultContent(popupId)} />;
    setModalData({ popupId, title, content, setter });
    setModalOpen(true); // 버튼 클릭 시 true로 변경하여 팝업을 렌더링함
  }, [list]);

  // 모달 확인 버튼 클릭 시 해당 약관 체크하고 모달 닫기 (체크박스가 있는 약관만 체크)
  const handleModalConfirm = () => {
    // 체크박스가 있는 약관만 체크 (개인정보처리방침은 체크박스가 없으므로 체크하지 않음)
    const currentTerm = termsData.find(term => term.popupId === modalData.popupId);
    if (modalData.setter && currentTerm?.showCheckbox) {
      modalData.setter(true); // 해당 약관을 체크
    }
    setModalOpen(false); // 모달 닫기
  };  
  // --- 모달 제어 로직 끝 ---

  // --- 상태 관리(State) 시작 ---
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  // 이전 페이지에서 만 14세 미만 회원 가입 화면으로부터 이동했을 때만 "만 14세 미만 아동의 회원가입에 따른 개인정보 수집이용에 관한 법정대리인 동의" 약관 표기
  const isJunior = location.pathname.includes('/ko/auth/JuniorSignUpAgrTrms');

  // 필수 약관 미동의 알림 팝업 상태 (비활성화 방식을 쓰더라도 만약을 위해 유지)
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  /*
   * 만 14세미만 아동의 회원가입인 경우 필수 약관(1, 2, 3번) 동의 여부 체크 변수 추가
   * 만 14세 이상 회원가입인 경우 필수 약관(1, 2번) 동의 여부 체크 변수 추가
   */
  const isRequiredAgreed = isJunior ? checked1 && checked2 && checked3 : checked1 && checked2;

  const allChecked = isJunior ? checked1 && checked2 && checked3 : checked1 && checked2;

  const handleAllAgree = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked1(isChecked);
    setChecked2(isChecked);
    setChecked3(isChecked);
    setChecked4(isChecked);
  };

  // 다음 버튼 클릭 핸들러
  const handleNextStep = () => {
    // 필수 약관(1, 2, 4번) 동의 여부 체크
    if (isRequiredAgreed) {
      navigate('/screens/KIDS-PP-US-JM-03'); // 다음 단계(본인 인증)로 이동
    } else {
      // 버튼 disabled 처리를 했으므로 실제로는 이 로직을 타지 않지만 안전상 유지
      setShowErrorPopup(true); 
    }
  };

  // 개별 약관 리스트 데이터 구성
  const termsData = useMemo(() => [
    { 
      id: 1, 
      popupId: 'UTZTN', 
      label: t('termsOfUse'), 
      required: true, 
      checked: checked1, 
      isdisplay: true, 
      showCheckbox: true, 
      showOptionalLabel: true, 
      setter: setChecked1
    },
    { 
      id: 2, 
      popupId: 'CLCT', 
      label: t('privacyCollectionAgree'), 
      required: true, 
      checked: checked2, 
      isdisplay: true, 
      showCheckbox: true, 
      showOptionalLabel: true, 
      setter: setChecked2
    },
    { 
      id: 3, 
      popupId: 'STTY_AGT', 
      label: t('signUpJuniorPrivacyCollectionAgree'), 
      required: true, 
      checked: checked3, 
      isdisplay: (isJunior ? true : false), 
      showCheckbox: true, 
      showOptionalLabel: true, 
      setter: setChecked3
    },
    { 
      id: 4, 
      popupId: 'STT_PRVC', 
      label: t('privacyPolicy'), 
      required: false, 
      checked: checked4, 
      isdisplay: true, 
      showCheckbox: false, 
      showOptionalLabel: false, 
      setter: setChecked4
    },
  ], [checked1, checked2, checked3, checked4, isJunior, t]);
  // --- 상태 관리 끝 ---

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
                  
                  <Box className="pageCont-joinType member-page">
                    {/* 단계 표시 */}
                    <Box 
                      className="step-progress" 
                      role="img" 
                      aria-label={`${t('totalSteps')} ${currentStep + 1}${t('step')} ${steps[currentStep].description} ${t('inProgress')}`}
                    >
                      <Stepper activeStep={currentStep} alternativeLabel>
                        {steps.map((step, index) => (
                          <Step key={index}>
                            <StepLabel 
                              aria-hidden="true"
                              slotProps={{
                                stepIcon: {
                                  classes: {
                                    root: 'step-icon',
                                    text: 'step-text'
                                  }
                                }
                              }}
                            >
                              <Typography variant="caption" className="step-label">
                                {step.label}
                              </Typography>
                              <Typography className={`step-description ${index === currentStep ? 'current-step' : ''}`}>
                                {step.description}
                              </Typography>
                            </StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>

                    {/* 단계 제목 */}
                    <Box className="step-header">
                      <Typography className="step-title">
                        <Box component="span" className="step-current">
                          {steps[currentStep].label}
                        </Box>
                        {` / ${steps[steps.length - 1].label}`}
                      </Typography>
                      <Typography className="step-description">
                        <span className="step-description-text">
                          {steps[currentStep].description}
                        </span>
                      </Typography>
                    </Box>

                    <Box className="agree-terms">
                      {/* 전체 동의 섹션 */}
                      <Box className="all-agree">
                        <FormControlLabel
                          control={
                            <Checkbox 
                              onChange={handleAllAgree} 
                              checked={allChecked} 
                            />
                          }
                          label={<strong className="label">{t('allAgree')}</strong>}
                        />
                      </Box>

                      {/* 개별 약관 리스트 */}
                      <List className="terms-list">
                        {termsData
                          .filter((item) => item.isdisplay)
                          .map((item) => (
                            <ListItem 
                              key={item.id}
                              disablePadding
                              className="terms-item"
                              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                              <FormControlLabel
                                control={
                                  item.showCheckbox ? (
                                    <Checkbox 
                                      className="terms-checkbox"
                                      checked={item.checked} 
                                      onChange={(e) => item.setter(e.target.checked)} 
                                      size="small"
                                    />
                                  ) : (
                                    <Box sx={{ width: 36, height: 36, padding: '8px', boxSizing: 'border-box' }} /> // 체크박스와 동일한 크기 및 padding
                                  )
                                }
                                label={
                                  <Typography component="div">
                                    <span className="terms-link">{item.label}</span>
                                    {item.showOptionalLabel && (
                                      <Typography 
                                        component="span" 
                                        variant="caption" 
                                        className={item.required ? 'required' : 'optional'}
                                        sx={{ ml: 0.5, color: item.required ? 'error.main' : 'text.secondary' }}
                                      >
                                        ({item.required ? t('required') : t('optional')})
                                      </Typography>
                                    )}
                                  </Typography>
                                }
                              />
                              {/* 약관보기 버튼 클릭 시 handleShowModal 호출 */}
                              <Button 
                                type="button"
                                variant="text" 
                                size="small" 
                                className="btn_terms_view"
                                onClick={() => handleShowModal(item.popupId, item.label, item.setter)}
                              >
                                {t('termsView')}
                              </Button>
                            </ListItem>
                          ))}
                      </List>
                    </Box>

                    {/* 하단 버튼 영역 */}
                    <Box className="btn-group between">
                      <Button 
                        variant="outlined" 
                        size="large" 
                        onClick={() => navigate(-1)}
                      >
                        {t('cancel')}
                      </Button>
                      <Button 
                        variant="contained" 
                        size="large" 
                        onClick={handleNextStep}
                        // 필수 체크가 안 되어 있으면 버튼 비활성화
                        disabled={!isRequiredAgreed}
                      >
                        {t('agree')}
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

      {/* 약관 상세 팝업 */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle component="div" className="modal-title">
          <h2>{modalData.title}</h2>
          <IconButton
            aria-label={t('close')}
            onClick={() => setModalOpen(false)}
            className="btn-modal-close"
          >
            <CloseIcon aria-hidden="true" />
          </IconButton>
        </DialogTitle>
        <DialogContent className="modal-content" sx={{ minHeight: '200px' }}>
          {modalData.content}
        </DialogContent>
        <DialogActions className="modal-footer">
          <Button variant="contained" onClick={handleModalConfirm}>
            {t('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}