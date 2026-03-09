import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Stepper, Step, StepLabel, Typography, Checkbox, FormControlLabel, List, ListItem, Dialog, DialogTitle, DialogContent, DialogActions, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DepsLocation from '@/components/common/DepsLocation'
import ScreenShell from '../../ScreenShell'

// --- 약관 상세 컨텐츠 (모달 내부에 들어갈 내용) ---
const TermsDetail01 = () => 
<div>		
  이용약관
</div>;
const TermsDetail02 = () => 
  <div className="privacy-policy-box">
    <div className="policy-content">
      <dl>
        <dt>1. 개인정보의 수집∙이용 목적</dt>
        <dd>회원관리, 만족도 조사, 교육 사이트 접속</dd>

        <dt>2. 수집하는 개인정보의 항목</dt>
        <dd>수집항목 : 이름, 휴대전화번호, 연계정보(CI), 아이디, 비밀번호</dd>

        <dt>3. 개인정보의 보유 및 이용기간</dt>
        <dd><span className="highlight">회원 탈퇴 시 까지</span></dd>

        <dt>4. 동의거부권리 안내</dt>
        <dd>
          <p>개인정보 수집 ∙ 이용에 대한 동의를 거부할 권리가 있습니다.</p>
          <p>그러나, 동의 거부 시 회원으로 가입할 수 없음을 알려 드립니다.</p>
        </dd>
      </dl> 
    </div>
  </div>;
const TermsDetail03 = () => 
  <div className="privacy-policy-box">
    <div className="policy-content">
      <dl>
        <dt>1. 개인정보의 수집∙이용 목적</dt>
        <dd>회원관리, 만족도 조사, 교육 사이트 접속</dd>

        <dt>2. 수집하는 개인정보의 항목</dt>
        <dd>수집항목 : 이메일</dd>

        <dt>3. 개인정보의 보유 및 이용기간</dt>
        <dd><span className="highlight">회원 탈퇴 시 까지</span></dd>

        <dt>4. 동의거부권리 안내</dt>
        <dd>
          <p>개인정보 수집 ∙ 이용에 대한 동의 거부 시 회원가입에는 제한이 없습니다.</p>
          <p>단, 서비스 내역 통지 등을 이메일로 수신 받을 수 없습니다.</p>
        </dd>
      </dl>
    </div>
  </div>;
const TermsDetail04 = () => <Box>저작권보호정책 및 정보공유 동의 상세 내용입니다.</Box>;

export default function KIDS_PP_US_JM_02() {
  const navigate = useNavigate()
  const screenId = "KIDS-PP-US-JM-02"
  const currentStep = 1

  const steps = [
    { label: '1단계', description: '회원 유형 선택' },
    { label: '2단계', description: '약관 동의' },
    { label: '3단계', description: '본인 인증' },
    { label: '4단계', description: '회원 정보 입력' },
    { label: '5단계', description: '가입 신청 완료' },
  ]

  // --- 모달 제어 로직 시작 ---
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ id: '', title: '', content: null });

  const handleShowModal = (id, title, content) => {
    setModalData({ id, title, content });
    setModalOpen(true); // 버튼 클릭 시 true로 변경하여 팝업을 렌더링함
  };
  // --- 모달 제어 로직 끝 ---

  // --- 상태 관리(State) 시작 ---
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  // 필수 약관 미동의 알림 팝업 상태 (비활성화 방식을 쓰더라도 만약을 위해 유지)
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  // 필수 약관(1, 2, 4번) 동의 여부 체크 변수 추가
  const isRequiredAgreed = checked1 && checked2 && checked4;

  const allChecked = checked1 && checked2 && checked3 && checked4;

  const handleAllAgree = (event) => {
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
  const termsData = [
    { id: 1, popupId: `${screenId}-P01`, label: '이용약관', required: true, checked: checked1, setter: setChecked1, component: <TermsDetail01 /> },
    { id: 2, popupId: `${screenId}-P02`, label: '개인정보 수집 및 이용동의', required: true, checked: checked2, setter: setChecked2, component: <TermsDetail02 /> },
    { id: 3, popupId: `${screenId}-P03`, label: '개인정보 수집 및 이용동의', required: false, checked: checked3, setter: setChecked3, component: <TermsDetail03 /> },
    { id: 4, popupId: `${screenId}-P04`, label: '저작권보호정책 및 정보공유 동의', required: true, checked: checked4, setter: setChecked4, component: <TermsDetail04 /> },
  ];
  // --- 상태 관리 끝 ---

  return (
    <ScreenShell screenId={screenId} title="약관동의" uiType="page">

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
                      aria-label={`총 5단계 중 현재 ${currentStep + 1}단계 ${steps[currentStep].description} 진행 중`}
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
                          label={<strong className="label">모두 동의합니다.</strong>}
                        />
                      </Box>

                      {/* 개별 약관 리스트 */}
                      <List className="terms-list">
                        {termsData.map((item) => (
                          <ListItem 
                            key={item.id}
                            disablePadding
                            className="terms-item"
                            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox 
                                  className="terms-checkbox"
                                  checked={item.checked} 
                                  onChange={(e) => item.setter(e.target.checked)} 
                                  size="small"
                                />
                              }
                              label={
                                <Typography component="div">
                                  <span className="terms-link">{item.label}</span>
                                  <Typography 
                                    component="span" 
                                    variant="caption" 
                                    className={item.required ? 'required' : 'optional'}
                                    sx={{ ml: 0.5, color: item.required ? 'error.main' : 'text.secondary' }}
                                  >
                                    ({item.required ? '필수' : '선택'})
                                  </Typography>
                                </Typography>
                              }
                            />
                            {/* 약관보기 버튼 클릭 시 handleShowModal 호출 */}
                            <Button 
                              type="button"
                              variant="text" 
                              size="small" 
                              className="btn_terms_view"
                              onClick={() => handleShowModal(item.popupId, item.label, item.component)}
                            >
                              약관보기
                            </Button>
                          </ListItem>
                        ))}
                      </List>
                    </Box>

                    {/* 하단 버튼 영역 */}
                    <Box className="btn-group between">
                      <Button 
                        variant="outlined02" 
                        size="large" 
                        onClick={() => navigate(-1)}
                      >
                        취소하기
                      </Button>
                      <Button 
                        variant="contained" 
                        size="large" 
                        onClick={handleNextStep}
                        // 필수 체크가 안 되어 있으면 버튼 비활성화
                        disabled={!isRequiredAgreed}
                      >
                        동의하기
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
            aria-label="닫기"
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
          <Button variant="contained" onClick={() => setModalOpen(false)}>
            확인
          </Button>
        </DialogActions>
      </Dialog>

    </ScreenShell>
  )
}