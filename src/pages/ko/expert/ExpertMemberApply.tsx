/**
 * 화면ID: KIDS-PP-US-EC-01 | KIDS-PP-US-EC-02 | KIDS-PP-US-EC-03
 * 화면명: 소속 선택  | 추가 정보 입력 | 신청 완료
 * 화면경로: /expert/ExpertMemberApply
 * 화면설명: 소속 선택 | 추가 정보 입력 | 신청 완료
 */
import DepsLocation from '@/components/common/DepsLocation';
import FileUploadField from '@/components/form/FileUploadField';
import { useDialog } from '@/contexts/DialogContext';
import { CheckCircle } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { existsInstByBrno } from '@/features/exprt/ExprtApplyThunks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ExprtApplyTaskVO } from '@/features/exprt/ExprtApplyTypes';

type StepRefs = {
  step1: HTMLDivElement | null;
  step2: HTMLDivElement | null;
  step3: HTMLDivElement | null;
};

export default function ExpertMemberApply() {
  const dispatch = useAppDispatch();

  const { showDialogBackdrop } = useDialog();

  const handleCustomConfirm = () => {
    showDialogBackdrop({
      message: '등록 하시겠습니까?',
      title: '전문가 회원 전환 등록',
      type: 'confirm',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: () => setCurrentStep(2),
    })
  }

  const [currentStep, setCurrentStep] = useState(0);
  const stepRefs = useRef<StepRefs>({
    step1: null,
    step2: null,
    step3: null,
  });

  // Step 1: 소속선택
  const [businessNumber, setBusinessNumber] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<{
    name: string;
    number: string;
    task: ExprtApplyTaskVO[];
  } | null>(null);
  const [companySearchError, setCompanySearchError] = useState('');

  // Step 2: 추가정보입력
  const [organizationEmail, setOrganizationEmail] = useState('');
  const [emailDuplicateChecked, setEmailDuplicateChecked] = useState(false);
  const [emailDuplicateMessage, setEmailDuplicateMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<Array<{ index: number; message: string }>>([]);
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);

  const steps = [
    { label: '1단계', description: '소속선택' },
    { label: '2단계', description: '추가정보입력' },
    { label: '3단계', description: '신청완료' },
  ];

  // 업무 시스템 목록 (예시 데이터)
  const businessSystems = [
    { id: 'ecrf', label: 'eCRF 업무' },
    { id: 'system2', label: '업무 시스템 2' },
    { id: 'system3', label: '업무 시스템 3' },
    { id: 'system4', label: '업무 시스템 4' },
    { id: 'system5', label: '업무 시스템 5' },
  ];

  // 단계 변경 시 스크롤 이동
  useEffect(() => {
    if (currentStep == 0) {
      window.scrollTo(0, 0);
      return;
    }

    const refKey = `step${currentStep + 1}` as keyof StepRefs;
    const ref = stepRefs.current[refKey];

    if (ref) {
      // window.scrollTo({ top: ref.offsetTop - 100, behavior: 'smooth' });
      window.scrollTo(0, 0);
    }
  }, [currentStep]);

  // 사업자등록번호 조회
  const handleSearchCompany = async () => {
    if (!businessNumber || businessNumber.length < 10) {
      setCompanySearchError('사업자등록번호를 올바르게 입력해주세요.');
      setSelectedCompany(null);
      return;
    }

    const result = await dispatch(existsInstByBrno({ 
      brno: businessNumber,
    })).unwrap();

    setSelectedCompany(null);
    
    if (result.instNm === null || result.instNm === '') {
      setCompanySearchError('조회하신 업체명이 없습니다. 다시 입력하여 조회해주세요.');
    } else {
      if (result.taskSystemList?.length != 0) {
        setSelectedCompany({
          name: result.instNm ?? '',
          number: businessNumber,
          task: result.taskSystemList ?? [],
        });
        setCompanySearchError('');
      } else {
        setCompanySearchError('조회하신 업체는 전문가회원 업무 시스템 사용이 불가합니다. 확인 후 신청해주세요.');        
      }      
    }

    // 예시: 조회 성공 케이스
    // if (businessNumber === '1234567890') {
    //   setSelectedCompany({
    //     name: '한국제약회사',
    //     number: '123-23-45678',
    //     task: [],
    //   });
    //   setCompanySearchError('');
    // } else {
    //   setCompanySearchError('조회하신 업체명이 없습니다. 다시 입력하여 조회해주세요.');
    //   setSelectedCompany(null);
    // }
  };

  // 이메일 중복확인
  const handleCheckEmailDuplicate = () => {
    if (!organizationEmail || !organizationEmail.includes('@')) {
      setEmailDuplicateMessage('올바른 이메일 주소를 입력해주세요.');
      setEmailDuplicateChecked(false);
      return;
    }

    // TODO: 실제 API 호출로 대체
    // 예시: 사용 가능한 경우
    setEmailDuplicateChecked(true);
    // setEmailDuplicateMessage('사용 가능한 이메일입니다.');
  };

  // 업무 시스템 선택 변경
  const handleSystemToggle = (systemId: string) => {
    setSelectedSystems((prev) =>
      prev.includes(systemId)
        ? prev.filter((id) => id !== systemId)
        : [...prev, systemId]
    );
  };

  // Step 1 완료 조건
  const canCompleteStep1 = selectedCompany !== null;

  // Step 2 완료 조건
  const canCompleteStep2 =
    emailDuplicateChecked &&
    uploadedFiles.length > 0 &&
    selectedSystems.length > 0;

  // Step 1 완료
  const handleCompleteStep1 = () => {
    if (canCompleteStep1) {
      setCurrentStep(1);
    }
  };

  // Step 2 완료
  const handleCompleteStep2 = () => {
    if (canCompleteStep2) {
      handleCustomConfirm();
    }
  };

  // 전체 파일 삭제
  const handleDeleteAllFiles = () => {
    setUploadedFiles([]);
  };

  // 파일 크기 포맷팅
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)}MB`;
  };

  // 파일 추가 처리 (크기 검증 포함)
  const handleFilesChange = (files: File[]) => {
    const maxSizeMB = 20;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    
    const errors: Array<{ index: number; message: string }> = [];
    
    files.forEach((file, index) => {
      if (file.size > maxSizeBytes) {
        errors.push({
          index,
          message: `등록 가능한 파일 용량을 초과하였습니다. 20MB 미만의 파일만 등록할 수 있습니다.`,
        });
      }
    });
    
    setFileErrors(errors);
    setUploadedFiles(files);
  };

  // 파일 삭제 시 에러도 제거
  const handleDeleteFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    setFileErrors((prev) => prev.filter((err) => err.index !== index).map((err) => ({
      ...err,
      index: err.index > index ? err.index - 1 : err.index,
    })));
  };

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">
          <Box className="sub-content">
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
              {/* --- 본문 시작 --- */}
                <Box className="member-page">
                  {/* 단계 표시 */}
                  <Box
                    className="step-progress"
                    role="img"
                    aria-label={`총 3단계 중 현재 ${currentStep + 1}단계 ${steps[currentStep].description} 진행 중`}
                   
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
                                  text: 'step-text',
                                },
                              },
                            }}
                          >
                            <Typography variant="caption" className="step-label">
                              {step.label}
                            </Typography>
                            <Typography
                              className={`step-description ${
                                index === currentStep ? 'current-step' : ''
                              }`}
                            >
                              {step.description}
                            </Typography>
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>

                  {/* Step 1: 소속선택 */}
                  <Box className="step-header"
                    ref={(el: HTMLDivElement | null) => {
                      stepRefs.current.step1 = el;
                    }}
                    sx={{
                      display: currentStep === 0 ? 'block' : 'none',
                    }}
                  >
                    <Typography className="step-title">
                      <Box component="span" className="step-current">
                        1단계
                      </Box>
                      {' / 3단계 '}
                    </Typography>
                    <Typography className="step-description">
                      <span className="step-description-text">
                        소속선택
                      </span>
                    </Typography>

                    <Box className="bordered-box">
                        {/* 사업자등록번호 조회 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="bizNumber" className="label">
                            사업자등록번호 조회
                            <Box component="span" className="necessary" aria-label="필수입력">(필수)</Box>
                          </Typography>
                          <Stack direction="row" spacing={1} className="input-with-btn">
                            <TextField
                              id="bizNumber"
                              placeholder="사업자등록번호를 입력하세요. ('-'제외 입력)"
                              value={businessNumber}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, '');
                                setBusinessNumber(value);
                                setCompanySearchError('');
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleSearchCompany();
                                }
                              }}
                              inputProps={{ maxLength: 10 }}
                              size="large"
                              fullWidth
                            />
                            <Button
                              onClick={handleSearchCompany}
                              aria-label="사업자등록번호 조회"
                              variant="outlined"
                              size="large"
                              className="btn-form-util"
                            >
                              조회
                            </Button>
                          </Stack>
                        </Box>


                        {/* 조회 결과 */}
                        {selectedCompany && (
                          <Paper
                            variant="outlined"
                            role="region"
                            aria-labelledby="company-info-title"
                            sx={{
                              p: 2,
                              bgcolor: 'grey.50',
                              borderColor: 'grey.300',
                            }}
                          >
                            <Typography id="company-info-title" sx={{ display: 'none' }}>
                              선택된 업체 정보
                            </Typography>
                            <RadioGroup
                              value={selectedCompany.name}
                              onChange={() => {}}
                              aria-readonly="true"
                            >
                              <FormControlLabel
                                value={selectedCompany.name}
                                control={
                                  <Radio 
                                    checked 
                                    slotProps={{ 
                                      input: { 'aria-label': `${selectedCompany.name} 선택됨` } 
                                    }}
                                  />
                                }
                                label={
                                  <Box>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                      {selectedCompany.name}
                                    </Typography>
                                    {/* <Typography variant="body2" color="text.secondary">
                                      <span aria-label="사업자 번호">{selectedCompany.number}</span>
                                      {selectedCompany.number && ' | '}
                                      <span aria-label="주소">{selectedCompany.address}</span>
                                    </Typography> */}
                                  </Box>
                                }
                              />
                            </RadioGroup>
                          </Paper>
                        )}

                        {/* 안내 & 실패 메시지 */}
                        {companySearchError && !selectedCompany ? (
                          <Box className="status-box">
                            <Typography className="status-box__text">
                              {companySearchError}
                            </Typography>
                          </Box>
                          ) : ( 
                          <>
                            {!selectedCompany && (
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                사업자등록번호 조회에 입력 후 조회 버튼을 클릭하여 조회된 업체를 선택해주세요.
                              </Typography>
                            )}                          
                          </>
                        )}
                      </Box>

                      {/* 버튼 영역 */}
                      <Box className="btn-group between">
                        <Button
                          variant="outlined02"
                          onClick={() => window.history.back()}
                        >
                          취소하기
                        </Button>
                        <Button
                          variant="contained"
                          disabled={!canCompleteStep1}
                          onClick={handleCompleteStep1}
                        >
                          선택완료
                        </Button>
                      </Box>
                  </Box>


                  {/* Step 2: 추가정보입력 */}
                  <Box
                    ref={(el: HTMLDivElement | null) => {
                      stepRefs.current.step2 = el;
                    }}
                    sx={{
                      display: currentStep === 1 ? 'block' : 'none',
                      minHeight: '60vh',
                    }}
                  >
                    <Box className="step-header">
                      <Typography className="step-title">
                        <Box component="span" className="step-current">
                          2단계
                        </Box>
                        {' / 3단계 '}
                      </Typography>
                      <Typography className="step-description">
                        <span className="step-description-text">
                          추가정보입력
                        </span>
                      </Typography>
                    </Box>

                    
                    <h3 className="form-section-title">소속 기관 이메일</h3>
                    <Box className="bordered-box">
                      {/* 기관 이메일 */}
                      <Box className="form-item">
                        <Typography component="label" htmlFor="eorg-email" className="label">
                          기관 이메일
                          <Box component="span" className="necessary" aria-label="필수입력">(필수)</Box>
                        </Typography>
                        <Stack direction="row" spacing={1} className="input-with-btn">
                          <TextField
                            id="eorg-email"
                            size="large"
                            fullWidth
                            placeholder="이메일 주소를 입력하세요."
                            value={organizationEmail}
                            onChange={(e) => {
                              setOrganizationEmail(e.target.value);
                              setEmailDuplicateChecked(false);
                              setEmailDuplicateMessage('');
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleCheckEmailDuplicate();
                              }
                            }}                            
                            type="email"
                            error={!!emailDuplicateMessage && !emailDuplicateChecked}
                            helperText={emailDuplicateMessage}
                          />
                          <Button
                            variant="outlined"
                            onClick={handleCheckEmailDuplicate}
                            size="large"
                          >
                            중복확인
                          </Button>
                        </Stack>
                        {emailDuplicateChecked && (
                          <FormHelperText sx={{ color: 'success.main', mt: 0.5 }}>
                            사용 가능한 이메일입니다.
                          </FormHelperText>
                        )}
                      </Box>
                    </Box>

                    {/* 파일 첨부 */}
                    <h3 className="form-section-title">증빙서류 제출</h3>
                    <Box className="bordered-box attach-file-box">
                      <FileUploadField
                        value={uploadedFiles}
                        onChange={setUploadedFiles}
                        accept=".pdf,.png,.jpg,.jpeg"
                        maxFileSizeMB={10}
                        maxTotalSizeMB={10}
                        helperText="PDF, PNG, JPG 형식의 10MB 이하의 파일을 업로드해주세요."
                      />
                      {uploadedFiles.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                            <Typography variant="body2" color="text.main">
                              {uploadedFiles.length}개
                            </Typography>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={handleDeleteAllFiles}
                              sx={{ textTransform: 'none' }}
                            >
                              전체 파일 삭제 &gt;
                            </Button>
                          </Stack>
                          <Stack spacing={1}>
                            {uploadedFiles.map((file, index) => (
                              <Paper
                                key={index}
                                variant="outlined"
                                sx={{
                                  p: 1.5,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <Typography variant="body2">
                                  {file.name} [
                                  {file.name.split('.').pop()?.toLowerCase()}, {formatFileSize(file.size)}]
                                </Typography>
                                <Button
                                  size="small"
                                  onClick={() => handleDeleteFile(index)}
                                  sx={{ minWidth: 'auto', color: 'error.main' }}
                                >
                                  삭제 x
                                </Button>
                              </Paper>
                            ))}
                          </Stack>
                        </Box>
                      )}
                    </Box>

                    {/* 업무 시스템 선택 */}
                    <h3 className="form-section-title">업무 시스템 선택 <span className="necessary">(필수)</span></h3>
                    <Box className="bordered-box">
                      <Stack spacing={1}>
                        {businessSystems.map((system) => (
                          <FormControlLabel
                            key={system.id}
                            control={
                              <Checkbox
                                checked={selectedSystems.includes(system.id)}
                                onChange={() => handleSystemToggle(system.id)}
                              />
                            }
                            label={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2">{system.label} &gt;</Typography>
                                <Typography variant="caption" color="success.main">
                                  신청가능
                                </Typography>
                              </Box>
                            }
                          />
                        ))}
                      </Stack>
                    </Box>

                    {/* 버튼 영역 */}
                    <Box className="btn-group between">
                      <Button
                        variant="outlined02"
                        onClick={() => setCurrentStep(0)}
                        size="large"
                      >
                        취소하기
                      </Button>
                      <Button
                        variant="contained"
                        disabled={!canCompleteStep2}
                        onClick={handleCompleteStep2}
                        size="large"
                      >
                        등록하기
                      </Button>
                    </Box>
                  </Box>


                  {/* Step 3: 신청완료 */}
                  <Box
                    ref={(el: HTMLDivElement | null) => {
                      stepRefs.current.step3 = el;
                    }}
                    sx={{
                      display: currentStep === 2 ? 'block' : 'none',
                      minHeight: '60vh',
                    }}
                  >

                    <Box className="step-header">
                      <Typography className="step-title">
                      <Box component="span" className="step-current">
                        3단계
                      </Box>
                      {' / 3단계 '}
                    </Typography>
                      <Typography className="step-description">
                        <span className="step-description-text">
                          전문가회원 전환신청 완료
                        </span>
                      </Typography>
                    </Box>

                    <Box className="bordered-box">
                      <Box className="join-complete-section expert-member-complete">
                        <Typography component="p" className="complete-title">
                          전문가회원 전환신청을 완료했습니다.
                        </Typography>
                        <Typography component="p" className="complete-info">
                          신청하신 기관 관리자의 승인이 완료된 후 내 업무에서 확인 하실 수
                          있습니다.
                        </Typography>
                      </Box>
                    </Box>
                    {/* 버튼 영역 */}
                    <Box className="btn-group center">
                      <Button
                        variant="outlined02"
                        onClick={() => (window.location.href = '/ko')}
                        sx={{ minWidth: 120 }}
                      >
                        홈으로
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          // TODO: 내 업무 페이지로 이동
                          window.location.href = '/ko/mytask';
                        }}
                        sx={{ minWidth: 120 }}
                      >
                        내 업무
                      </Button>
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
  );
}
