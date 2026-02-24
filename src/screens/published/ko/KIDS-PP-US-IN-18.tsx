import React, { useMemo } from 'react';
import { Box, Typography, Button, TextField} from '@mui/material';
import { useLocation } from 'react-router-dom';
import ScreenShell from '../../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import KoglLicense from '@/components/common/KoglLicense';
import { useAuth } from '@/contexts/AuthContext';


export default function KIDS_PP_US_IN_18() {
  const location = useLocation();
  const { getMenuInfo } = useAuth();
  const menuKoglCprgtTypeCd = getMenuInfo(location.pathname)?.menuKoglCprgtTypeCd ?? '4';

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: '클린신고센터',
      children: [
        { key: '#', label: '클린신고센터' }
      ] 
    }
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-IN-18" title="클린신고센터 등록" uiType="form">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>클린신고센터</span>
                </Typography>
                <Box className="lnb-list">
                  <Lnb items={sideItems} />
                </Box>
              </Box>
            </Box>

            {/* 컨텐츠 본문 영역 */}
            <Box className="sub-content">
              <DepsLocation />
              <Box className="content-view" id="content">
                <Box className="page-content">
                {/* --- 본문 시작 --- */}

                  <section className="pageCont-cleanCenter">
                    <h3 className="section-title">클린신고서 작성</h3>
                    <Box className="bordered-box">
                      <Box component="form" noValidate>
                        <Box className="form-group-wrap">
                          {/* 이름 (필수) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="userName" className="label">
                              이름 <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                            </Typography>
                            <TextField
                              id="userName"
                              placeholder="이름을 입력하세요."
                              size="large"
                              fullWidth
                              error={true} 
                              helperText="이름을 입력해주세요."
                              slotProps={{
                                htmlInput: { 'aria-required': 'true', 'aria-describedby': 'userName-alert' },
                                formHelperText: { id: 'userName-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite' },
                              }}
                            />
                          </Box>

                          {/* 휴대전화번호 (필수) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="userPhone" className="label">
                              휴대전화번호 <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                            </Typography>
                            <TextField
                              id="userPhone"
                              type="tel"
                              placeholder="010-1234-5678"
                              size="large"
                              fullWidth
                              error={true}
                              helperText="휴대전화번호를 형식에 맞게 입력해주세요."
                              slotProps={{
                                htmlInput: { 'aria-required': 'true', 'aria-describedby': 'userPhone-alert' },
                                formHelperText: { id: 'userPhone-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite' },
                              }}
                            />
                          </Box>

                          {/* 이메일 (선택) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="userEmail" className="label">
                              이메일 <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                            </Typography>
                            <TextField
                              id="userEmail"
                              type="email"
                              placeholder="gidong_hong99@gmail.com"
                              size="large"
                              fullWidth
                              slotProps={{
                                htmlInput: { 'aria-describedby': 'userEmail-alert' },
                                formHelperText: { id: 'userEmail-alert', className: 'error-alert' },
                              }}
                            />
                          </Box>

                          {/* 신고사항 제목 (필수) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="reportTitle" className="label">
                              신고사항 제목 <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                            </Typography>
                            <TextField
                              id="reportTitle"
                              placeholder="(예시: 부정청탁, 금품수수 등)"
                              size="large"
                              fullWidth
                              error={true}
                              helperText="신고사항 제목을 입력해주세요."
                              slotProps={{
                                htmlInput: { 'aria-required': 'true', 'aria-describedby': 'reportTitle-alert' },
                                formHelperText: { id: 'reportTitle-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite' },
                              }}
                            />
                          </Box>

                          {/* 부정행위자 이름 (필수) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="targetName" className="label">
                              부정행위자 이름 <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                            </Typography>
                            <TextField
                              id="targetName"
                              placeholder="(예시: 관련있는 모든 사람의 이름을 모두 기재)"
                              size="large"
                              fullWidth
                              error={true}
                              helperText="부정행위자 이름을 입력해주세요."
                              slotProps={{
                                htmlInput: { 'aria-required': 'true', 'aria-describedby': 'targetName-alert' },
                                formHelperText: { id: 'targetName-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite' },
                              }}
                            />
                          </Box>

                          {/* 부정행위 시기 (필수) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="reportDate" className="label">
                              부정행위 시기 <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                            </Typography>
                            <TextField
                              id="reportDate"
                              placeholder="시기를 구체적을 일시 또는 기간을 입력해주세요."
                              size="large"
                              fullWidth
                              error={true}
                              helperText="부정행위 시기를 입력해주세요."
                              slotProps={{
                                htmlInput: { 'aria-required': 'true', 'aria-describedby': 'reportDate-alert' },
                                formHelperText: { id: 'reportDate-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite' },
                              }}
                            />
                          </Box>

                          {/* 부정행위 장소 (필수) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="reportLocation" className="label">
                              부정행위 장소 <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                            </Typography>
                            <TextField
                              id="reportLocation"
                              placeholder="(예시: O층 사무실, O층 회의실 등)"
                              size="large"
                              fullWidth
                              error={true}
                              helperText="부정행위 장소를 입력해주세요."
                              slotProps={{
                                htmlInput: { 'aria-required': 'true', 'aria-describedby': 'reportLocation-alert' },
                                formHelperText: { id: 'reportLocation-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite' },
                              }}
                            />
                          </Box>

                          {/* 부정행위 내용 (필수) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="reportContent" className="label">
                              부정행위 내용 <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
                            </Typography>
                            <TextField
                              id="reportContent"
                              placeholder="구체적이고 상세하게 3,000자 이내로 입력해주세요."
                              multiline
                              rows={4}
                              size="large"
                              fullWidth
                              error={true}
                              helperText="부정행위 내용을 입력해주세요."
                              slotProps={{
                                htmlInput: { 'aria-required': 'true', 'aria-describedby': 'reportContent-alert' },
                                formHelperText: { id: 'reportContent-alert', className: 'error-alert', role: 'alert', 'aria-live': 'polite' },
                              }}
                            />
                          </Box>

                          {/* 신고인 외 알고 있는 사람 (선택) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="witness" className="label">
                              신고인 외 알고 있는 사람: 목격자 포함 <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                            </Typography>
                            <TextField
                              id="witness"
                              placeholder="(예시: OOO도 같이 있었음)"
                              size="large"
                              fullWidth
                              slotProps={{
                                htmlInput: { 'aria-describedby': 'witness-alert' },
                                formHelperText: { id: 'witness-alert', className: 'error-alert' },
                              }}
                            />
                          </Box>

                          {/* 신고내용을 확인할 수 있는 방법 (선택) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="verifyMethod" className="label">
                              신고내용을 확인할 수 있는 방법 <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                            </Typography>
                            <TextField
                              id="verifyMethod"
                              placeholder="(예시: NNNN년 NN월 NN일자 문서에서 확인 가능함)"
                              size="large"
                              fullWidth
                              slotProps={{
                                htmlInput: { 'aria-describedby': 'verifyMethod-alert' },
                                formHelperText: { id: 'verifyMethod-alert', className: 'error-alert' },
                              }}
                            />
                          </Box>

                          {/* 부정행위를 알게 된 계기 (선택) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="reportMotive" className="label">
                              부정행위를 알게 된 계기 <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                            </Typography>
                            <TextField
                              id="reportMotive"
                              placeholder="(예시: 신고인지 직접 겪음, 타인에게서 들었고 녹취본이 있음)"
                              size="large"
                              fullWidth
                              slotProps={{
                                htmlInput: { 'aria-describedby': 'reportMotive-alert' },
                                formHelperText: { id: 'reportMotive-alert', className: 'error-alert' },
                              }}
                            />
                          </Box>

                          {/* 부정행위의 횟수 및 기간 (선택) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="reportDuration" className="label">
                              부정행위의 횟수 및 기간 <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                            </Typography>
                            <TextField
                              id="reportDuration"
                              placeholder="(예시: 한달에 한번, 분기별 진행함)"
                              size="large"
                              fullWidth
                              slotProps={{
                                htmlInput: { 'aria-describedby': 'reportDuration-alert' },
                                formHelperText: { id: 'reportDuration-alert', className: 'error-alert' },
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box className="btn-group between">
                      <Button variant="outlined02" size="large">취소하기</Button>
                      <Button variant="contained" size="large">제줄하기</Button>
                    </Box>
                  </section> 
                {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ScreenShell>
  );
}