import React from 'react';
import { Alert, Box, Button, Checkbox, Divider, FormControlLabel, Link, TextField, Typography, List, ListItem } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation'
import ScreenShell from '../ScreenShell'

export default function KIDS_PP_US_LG_02() {
  return (
    <ScreenShell screenId="KIDS-PP-US-LG-02" title="로그인 로그인 방식 선택" uiType="page">
      
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
                        <Typography component="label" htmlFor="loginId">
                          아이디
                        </Typography>
                        <TextField
                          id="loginId" // 라벨의 htmlFor와 일치
                          placeholder="아이디 혹은 이메일을 입력하세요."
                          size="large"
                          fullWidth
                          error={true} // 에러가 발생했을 때 true로 변경됨
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
                        <Typography component="label" htmlFor="password-input">
                          비밀번호
                        </Typography>
                        <TextField
                          id="password-input"
                          placeholder="비밀번호를 입력하세요."
                          size="large"
                          type="password"
                          fullWidth
                          error={true} // 에러가 발생했을 때 true로 변경됨
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

    </ScreenShell>
  );
}
