import React from 'react'
import { Box, Button, Typography, TextField, Stack, LinearProgress } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ScreenShell from '../ScreenShell';

export default function PUB() {
  // TODO: uiType이 모호합니다. 템플릿/구성을 수정하세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  //return <FormTemplate screenId="PUB" title="고객센터 이용약관111" config={config} />
  return (
    <ScreenShell screenId="PUB" title="컴포넌트" uiType="page">

      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            {/* <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>알림마당</span>
                </Typography>
                <Box className="lnb-list">
                  <Lnb items={sideItems} />
                </Box>
              </Box>
            </Box> */}

            {/* 컨텐츠 본문 영역 */}
            <Box className="sub-content">
              {/* <DepsLocation /> */}
              <Box className="content-view" id="content">
                <Box className="page-content">
                {/* --- 본문 시작 --- */}


                <h3 className="section-title">데이터 로딩</h3>
                <Box className="loading-progress-box">
                  <Typography className="loading-msg-top">
                    DUR 정보 검색 결과 상세 정보를 불러오고 있습니다.
                  </Typography> 
                  <LinearProgress className="bar-style" />
                  <Typography className="loading-msg-bottom">
                    잠시만 기다려 주세요.
                  </Typography>
                </Box>

                <h3 className="section-title">테이블</h3>
                <div className="base-table-container">
                  <div className="base-table-meta">
                    <p className="update-date">(2025.07.14 기준)</p>
                  </div>
                  
                  <div className="table-responsive">
                    <table className="base-table">
                      <caption className="sr-only">테이블제목</caption>
                      <colgroup>
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '45%' }} />
                        <col style={{ width: '30%' }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope="col" colSpan={2}>정보 유형</th>
                          <th scope="col">정보 건수</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row" rowSpan={3}>금기성분 고시</th>
                          <td>병용금기 (2004년~)</td>
                          <td>1,450</td>
                        </tr>
                        <tr>
                          <td>특정연령대금기 (2004년~)</td>
                          <td>207</td>
                        </tr>
                        <tr>
                          <td>임부금기 (2008년~)</td>
                          <td>1,210</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <h3 className="section-title">테이블 모바일 스크롤</h3>
                <div className="base-table-container">
                  <div className="base-table-meta">
                    <p className="update-date">(2025.07.14 기준)</p>
                  </div>
                  
                  <div className="table-responsive has-scroll">
                    <table className="base-table">
                      <caption className="sr-only">테이블제목</caption>
                      <colgroup>
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '45%' }} />
                        <col style={{ width: '30%' }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope="col" colSpan={2}>정보 유형</th>
                          <th scope="col">정보 건수</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row" rowSpan={3}>금기성분 고시</th>
                          <td>병용금기 (2004년~)</td>
                          <td>1,450</td>
                        </tr>
                        <tr>
                          <td>특정연령대금기 (2004년~)</td>
                          <td>207</td>
                        </tr>
                        <tr>
                          <td>임부금기 (2008년~)</td>
                          <td>1,210</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <h3 className="section-title">폼</h3>
                <Box component="form" noValidate>
                  <Box className="form-group-wrap">
                    <Box className="form-item">
                      <Typography component="label" htmlFor="password" className="label">
                        새 비밀번호 
                        <Box component="span" className="necessary" aria-label="필수입력">(필수)</Box>
                      </Typography>
                      <TextField
                        id="password"
                        type="password"
                        placeholder="숫자+영문+특수문자 조합 10자리 이상"
                        size="large"
                        fullWidth
                        error={true}
                        helperText="사용할수없는 비밀번호입니다."
                        slotProps={{
                          htmlInput: {
                            'aria-required': 'true',
                            //'aria-describedby': errors.password ? 'password-alert' : undefined,
                            
                          },
                          formHelperText: {
                            id: 'password-alert',
                            className: 'error-alert',
                            //role: errors.password ? 'alert' : undefined,
                            //'aria-live': errors.password ? 'polite' : undefined,
                          },
                        }}
                      />
                    </Box>

                    <Box className="form-item">
                      <Typography component="label" htmlFor="loginId" className="label">
                        아이디
                        <Box component="span" className="necessary" aria-label="필수입력">(필수)</Box>
                      </Typography>
                      <Stack direction="row" spacing={1} className="input-with-btn">
                        <TextField
                          id="loginId"
                          placeholder="아이디를 입력하세요."
                          size="large"
                          fullWidth
                          error={true}
                          helperText="사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요."
                          slotProps={{
                            htmlInput: {
                              'aria-required': 'true',
                              //'aria-describedby': errors.loginId ? 'loginId-alert' : undefined,
                              
                            },
                            formHelperText: {
                              id: 'loginId-alert',
                              className: 'error-alert',
                              //role: errors.loginId ? 'alert' : undefined,
                              //'aria-live': errors.loginId ? 'polite' : undefined,
                            },
                          }}
                        />
                        <Button variant="outlined" size="large" aria-label="아이디 중복확인" className="btn-outline-02 btn-form-util">중복확인</Button>
                      </Stack>
                    </Box>

                    <Box className="flex-container flex-half">
                      {/* 이름 (필수) */}
                      <Box className="form-item">
                        <Typography component="label" htmlFor="userName" className="label">
                          이름
                          <Box component="span" className="necessary" aria-label="필수입력">(필수)</Box>
                        </Typography>
                        <TextField
                          id="userName"
                          placeholder="이름을 입력하세요."
                          size="large"
                          slotProps={{
                            htmlInput: {
                              'aria-required': 'true',
                            },
                          }}
                          fullWidth
                        />
                      </Box>
                      {/* 휴대폰번호 (필수) */}
                      <Box className="form-item">
                        <Typography component="label" htmlFor="phone" className="label">
                          휴대폰번호
                          <Box component="span" className="necessary" aria-label="필수입력">(필수)</Box>
                        </Typography>
                        <TextField
                          id="phone"
                          placeholder="숫자만 입력하세요."
                          size="large"
                          slotProps={{
                            htmlInput: {
                              'aria-required': 'true',
                            },
                          }}
                          fullWidth
                        />
                      </Box>
                    </Box>

                  </Box>
                </Box>

                <h3 className="section-title">버튼</h3>
                <Button 
                  variant="text" 
                  className="btn-link" 
                  endIcon={<ChevronRightIcon />}
                >
                  링크버튼
                </Button>

                <Button variant="contained">
                  버튼
                </Button>
                <Button variant="outlined">
                  버튼
                </Button>
                <Button variant="outlined" className="btn-outline-02">
                  버튼
                </Button>

                  
                <h3 className="section-title">하단버튼</h3>
                <Box className="btn-group between">
                  <Button variant="outlined" size="large">
                    취소하기
                  </Button>
                  <Button variant="contained" size="large">
                    확인
                  </Button>
                </Box>
                <Box className="btn-group center">
                  <Button variant="outlined" size="large">
                    취소하기
                  </Button>
                  <Button variant="contained" size="large">
                    확인
                  </Button>
                </Box>
                <Box className="btn-group right">
                  <Button variant="outlined" size="large">
                    취소하기
                  </Button>
                  <Button variant="contained" size="large">
                    확인
                  </Button>
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
