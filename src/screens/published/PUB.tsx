import React from 'react'
import { useState } from "react";
import { Box, Button, Typography, TextField, Stack, LinearProgress, Tabs, Tab, FormControlLabel, Checkbox, Radio, RadioGroup, Paper } from '@mui/material';
import { Switch as BaseSwitch } from '@base-ui/react';
import { Download as DownloadIcon} from '@mui/icons-material';
import FileUploadField from '@/components/form/FileUploadField';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ScreenShell from '../ScreenShell';

export default function PUB() {
  
  //스위치
  const [isCheck, setIsCheck] = useState(false);

  // 탭
  const categoryNaming: Record<string, string> = {
    all: "전체",
    TAB1: "탭1",
    TAB2: "탭2",
    TAB3: "탭3",
    TAB4: "탭4",
    TAB5: "탭5",
    TAB6: "탭6",
    TAB7: "탭7",
    TAB8: "탭8",
    TAB9: "탭9"
  };
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveCategory(newValue);
  };


  //퍼블 파일첨부용
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const formatFileSize = (size) => (size / 1024 / 1024).toFixed(2) + 'MB';
  const handleDeleteFile = (index) => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  const handleDeleteAllFiles = () => setUploadedFiles([]);

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


                  <h3 className="section-title">스위치</h3>
                  <Stack direction="row" alignItems="center" spacing={2} className="switch_group">
                    <BaseSwitch.Root
                      className="base_switch_root"
                      checked={isCheck}
                      onCheckedChange={(checked) => setIsCheck(checked)}
                    >
                      <BaseSwitch.Thumb className="base_switch_thumb" />
                    </BaseSwitch.Root>
                    <Typography component="p" className="switch_label">
                      {isCheck ? '사용 중' : '미사용'}
                    </Typography>
                  </Stack>
                
                  <h3 className="section-title">탭</h3>
                  {/* 탭라인 스타일 */}
                  <Box className="category-tabs" role="navigation" aria-label="기본 카테고리 선택">
                    <Tabs
                      value={activeCategory} 
                      onChange={handleTabChange}
                      variant="scrollable"
                      scrollButtons="auto"
                      selectionFollowsFocus
                    >
                      {Object.keys(categoryNaming).map((category) => (
                        <Tab 
                          key={`type1-${category}`} 
                          value={category} 
                          label={categoryNaming[category]} 
                          id={`tab-type1-${category}`}
                          aria-controls={`tabpanel-type1-${category}`}
                        />
                      ))}
                    </Tabs>
                  </Box>

                  {/* 탭박스 스타일 */}
                  <Box className="category-tabs box-variant" role="navigation" aria-label="기본 카테고리 선택">
                    <Tabs
                      value={activeCategory} 
                      onChange={handleTabChange}
                      scrollButtons="auto"
                      selectionFollowsFocus
                    >
                      {Object.keys(categoryNaming).map((category) => (
                        <Tab 
                          key={`type1-${category}`} 
                          value={category} 
                          label={categoryNaming[category]} 
                          id={`tab-type1-${category}`}
                          aria-controls={`tabpanel-type1-${category}`}
                        />
                      ))}
                    </Tabs>
                  </Box>

                  {Object.keys(categoryNaming).map((category) => (
                    <Box
                      key={`panel-type1-${category}`}
                      role="tabpanel" 
                      id={`tabpanel-type1-${category}`} // Tab의 aria-controls와 매칭
                      aria-labelledby={`tab-type1-${category}`} // 이 패널의 이름이 무엇인지 연결
                      hidden={activeCategory !== category} // 선택되지 않은 패널은 숨김
                      className="tab-panel-container"
                    >
                      {activeCategory === category && (
                        <Box className="panel-content">
                          <Typography className="sr-only">{categoryNaming[category]} 탭 컨텐츠 </Typography>
                          <Typography>
                            {categoryNaming[category]} 내용이 출력됩니다.
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  ))}


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
                  <Box className="base-table-container">
                    <Box className="base-table-meta">
                      <p className="update-date">(2025.07.14 기준)</p>
                    </Box>
                    
                    <Box className="table-responsive">
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
                    </Box>
                  </Box>

                  <h3 className="section-title">테이블 모바일 스크롤 (가로)</h3>
                  <Box className="base-table-container">
                    <Box className="table-responsive has-scroll">
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
                    </Box>
                  </Box>


                  <h3 className="section-title">테이블 모바일 스크롤 (세로)</h3>
                  <Box className="base-table-container">
                    <Box className="table-responsive has-vscroll">
                      <table className="base-table">
                        <caption className="sr-only">테이블제목</caption>
                        <colgroup>
                          <col />
                          <col style={{ width: '30%' }} />
                        </colgroup>
                        <thead>
                          <tr>
                            <th scope="col">정보 유형</th>
                            <th scope="col">정보 건수</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>병용금기</td>
                            <td>1,450</td>
                          </tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                          <tr><td>특정연령대금기</td><td>207</td></tr>
                        </tbody>
                      </table>
                    </Box>
                  </Box>


                  <h3 className="section-title">체크박스,라디오</h3>
                  {/* 체크박스 가로형 */}
                  <Box className="form-item-row">
                    <Typography className="label">
                      체크박스 가로형
                      <Box component="span" className="required">(필수)</Box>
                    </Typography>
                    <Box className="group-container">
                      <Box className="form-item">
                        <FormControlLabel
                          className="chk-field"
                          control={<Checkbox id="chk-r1" />}
                          label={<Typography component="label" htmlFor="chk-r1">체크1</Typography>}
                        />
                      </Box>
                      <Box className="form-item">
                        <FormControlLabel
                          className="chk-field"
                          control={<Checkbox id="chk-r2" />}
                          label={<Typography component="label" htmlFor="chk-r2">체크2</Typography>}
                        />
                      </Box>
                    </Box>
                  </Box>

                  {/* 체크박스 세로형 */}
                  <Box className="form-item-row-vertical">
                    <Typography className="label">
                      체크박스 세로형
                      <Box component="span" className="required">(필수)</Box>
                    </Typography>
                    <Box className="group-container">
                      <Box className="form-item">
                        <FormControlLabel
                          className="chk-field"
                          control={<Checkbox id="chk-v1" />}
                          label={<Typography component="label" htmlFor="chk-v1">항목1</Typography>}
                        />
                      </Box>
                      <Box className="form-item">
                        <FormControlLabel
                          className="chk-field"
                          control={<Checkbox id="chk-v2" />}
                          label={<Typography component="label" htmlFor="chk-v2">항목2</Typography>}
                        />
                      </Box>
                    </Box>
                  </Box>

                  {/* 라디오 가로형 */}
                  <Box className="form-item-row">
                    <Typography className="label">
                      라디오 가로형
                      <Box component="span" className="required">(필수)</Box>
                    </Typography>
                    <RadioGroup row className="radio-group-container">
                      <Box className="form-item">
                        <FormControlLabel
                          className="rdo-field"
                          value="1"
                          control={<Radio id="rdo-r1" />}
                          label={<Typography component="label" htmlFor="rdo-r1">선택1</Typography>}
                        />
                      </Box>
                      <Box className="form-item">
                        <FormControlLabel
                          className="rdo-field"
                          value="2"
                          control={<Radio id="rdo-r2" />}
                          label={<Typography component="label" htmlFor="rdo-r2">선택2</Typography>}
                        />
                      </Box>
                    </RadioGroup>
                  </Box>

                  {/* 라디오 세로형 */}
                  <Box className="form-item-row-vertical">
                    <Typography className="label">
                      라디오 세로형
                      <Box component="span" className="required">(필수)</Box>
                    </Typography>
                    <RadioGroup row className="radio-group-container">
                      <Box className="form-item">
                        <FormControlLabel
                          className="rdo-field"
                          value="1"
                          control={<Radio id="rdo-v1" />}
                          label={<Typography component="label" htmlFor="rdo-v1">선택1</Typography>}
                        />
                      </Box>
                      <Box className="form-item">
                        <FormControlLabel
                          className="rdo-field"
                          value="2"
                          control={<Radio id="rdo-v2" />}
                          label={<Typography component="label" htmlFor="rdo-v2">선택2</Typography>}
                        />
                      </Box>
                    </RadioGroup>
                  </Box>

                  <h3 className="section-title">폼</h3>
                  <Box className="bordered-box">
                    <Box component="form" noValidate>
                      <Box className="form-group-wrap">
                        <Box className="form-item">
                          <Typography component="label" htmlFor="password" className="label">
                            새 비밀번호 
                            <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
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
                            <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
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
                            <Button variant="outlined" size="large" aria-label="아이디 중복확인" className="btn-form-util">중복확인</Button>
                          </Stack>
                        </Box>

                        <Box className="flex-container flex-half">
                          {/* 이름 (필수) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="userName" className="label">
                              이름
                              <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
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
                              <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
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
                  </Box>

                  <h3 className="section-title">버튼</h3>

                  <Button variant="contained">기본버튼 contained</Button>
                  <Button variant="contained02">기본버튼 contained02</Button>

                  <br/><br/> 
                  
                  <Button variant="outlined">라인버튼 outlined</Button>
                  <Button variant="outlined02">라인버튼 outlined02</Button>


                  <h3 className="section-title">버튼 사이즈</h3>
                  <Button variant="contained" size="xsmall">xsmall</Button>
                  <Button variant="contained" size="small">small</Button>
                  <Button variant="contained" size="medium">medium</Button>
                  <Button variant="contained" size="large">large</Button>


                  {/* <Button variant="outlined" className="btn-outline-02">btn-outline-02</Button> */}
                  
                  <br/><br/>             
                  <Button 
                    variant="text" 
                    className="btn-link" 
                    endIcon={<ChevronRightIcon />}
                    size="small"
                  >
                    링크버튼
                  </Button>
                  <Button 
                    variant="outlined" 
                    className="btn-detail" 
                    endIcon={<ChevronRightIcon />}
                    size="small"
                  >
                    상세보기
                  </Button>
                  <Button 
                    variant="text" 
                    className="btn-download"
                    startIcon={<DownloadIcon />}
                    size="small"
                  >
                    다운로드
                  </Button>


                    
                  <h3 className="section-title">하단버튼</h3>
                  <Box className="btn-group between">
                    <Button variant="outlined02" size="large">
                      취소하기
                    </Button>
                    <Button variant="contained" size="large">
                      확인
                    </Button>
                  </Box>
                  <Box className="btn-group center">
                    <Button variant="outlined02" size="large">
                      취소하기
                    </Button>
                    <Button variant="contained" size="large">
                      확인
                    </Button>
                  </Box>
                  <Box className="btn-group right">
                    <Button variant="outlined02" size="large">
                      취소하기
                    </Button>
                    <Button variant="contained" size="large">
                      확인
                    </Button>
                  </Box>


                  <h3 className="section-title">파일첨부</h3>



                  <Box className="attach-file-box">
                    <FileUploadField
                      value={uploadedFiles}
                      onChange={setUploadedFiles} 
                      accept=".pdf,.png,.jpg,.jpeg"
                      multiple={false}
                      maxFiles={5}
                      maxFileSizeMB={10}
                      maxTotalSizeMB={10}
                      helperText="PDF, PNG, JPG 형식의 10MB 이하의 파일을 업로드해주세요."
                    />
                    
                    {uploadedFiles.length > 0 && (
                      <Box className="file-viewer">
                        <Stack direction="row" className="uploader-info">
                          <Typography component="p" className="file-count">
                            <Box component="span">{uploadedFiles.length}개</Box>
                          </Typography>
                          <Button
                            size="xsmall"
                            variant="outlined02"
                            onClick={handleDeleteAllFiles}
                            sx={{ textTransform: 'none' }}
                          >
                            전체 파일 삭제
                          </Button>
                        </Stack>
                        <Box className="file-list">
                          {uploadedFiles.map((file, index) => (
                            <Box key={index} className="file-item">
                              <Typography>
                                {file.name} [
                                {file.name.split('.').pop()?.toLowerCase()}, {formatFileSize(file.size)}]
                              </Typography>
                              <Button 
                                className="btn-delete-circle" 
                                size="small"
                                onClick={() => handleDeleteFile(index)}
                                title="삭제" 
                              >
                                <span aria-hidden="true">×</span>
                              </Button>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}
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
