import React from 'react'
import { useState, useEffect} from "react";
import { Box, Button, Typography, TextField, Stack, LinearProgress, Tabs, Tab, FormControlLabel, Checkbox, Radio, RadioGroup, Pagination } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import { useSearchParams } from 'react-router-dom';
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

  //페이징
  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = Number(searchParams.get('page') || 1);
  const { list, totalCount } = useAppSelector((s) => s.pst);
  const totalPages = Math.max(1, Math.ceil((totalCount || 1) / 10));

  //퍼블 파일첨부용
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const formatFileSize = (size) => (size / 1024 / 1024).toFixed(2) + 'MB';
  const handleDeleteFile = (index) => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  const handleDeleteAllFiles = () => setUploadedFiles([]);

  // 앵커탭
  useEffect(() => {
    const handleAnchorScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('.category-anchor-tabs .tab-link') as HTMLAnchorElement | null;
      
      if (!link) return;

      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault(); 

          const tabContainer = link.closest('.category-anchor-tabs');
          if (tabContainer) {
            const allTabs = tabContainer.querySelectorAll('.tab-link');
            
            allTabs.forEach((tab) => {
              tab.classList.remove('active');
              tab.setAttribute('aria-selected', 'false');
            });

            link.classList.add('active');
            link.setAttribute('aria-selected', 'true');
          }

          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };
    document.addEventListener('click', handleAnchorScroll);
    return () => {
      document.removeEventListener('click', handleAnchorScroll);
    };
  }, []);


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



                  <h3 className="section-title">html 컨텐츠 앵커탭</h3>
                  <div className="category-anchor-tabs" aria-label="카테고리 이동">
                    <ul className="tabs-list" role="tablist">
                      <li className="tab-item" role="none">
                        <a href="#anchor-sec1" id="tab1" className="tab-link active" role="tab" aria-selected="true" aria-controls="anchor-sec1">사전협의</a>
                      </li>
                      <li className="tab-item" role="none">
                        <a href="#anchor-sec2" id="tab2" className="tab-link" role="tab" aria-selected="false" aria-controls="anchor-sec2">활용결과 등록</a>
                      </li>
                      <li className="tab-item" role="none">
                        <a href="#anchor-sec3" id="tab3" className="tab-link" role="tab" aria-selected="false" aria-controls="anchor-sec3">시스템 이용 문의</a>
                      </li>
                    </ul>
                  </div>
                  <div className="anchor-contents-area">
                    <section id="anchor-sec1" className="tab-section" role="tabpanel" tabIndex={0} aria-labelledby="tab1">
                      <div className="inner-box">
                        <p>사전협의 상세 내용... (내용 길게 생략)</p>
                        <p>사전협의 상세 내용... (내용 길게 생략)</p>
                        <p>사전협의 상세 내용... (내용 길게 생략)</p>
                        <p>사전협의 상세 내용... (내용 길게 생략)</p>
                        <p>사전협의 상세 내용... (내용 길게 생략)</p>
                        <p>사전협의 상세 내용... (내용 길게 생략)</p>
                        <p>사전협의 상세 내용... (내용 길게 생략)</p>
                        <p>사전협의 상세 내용... (내용 길게 생략)</p>
                      </div>
                    </section>
                    <section id="anchor-sec2" className="tab-section" role="tabpanel" tabIndex={0} aria-labelledby="tab2">
                      <div className="inner-box">
                        <p>활용결과 등록 상세 내용...</p>
                        <p>활용결과 등록 상세 내용...</p>
                        <p>활용결과 등록 상세 내용...</p>
                        <p>활용결과 등록 상세 내용...</p>
                        <p>활용결과 등록 상세 내용...</p>
                        <p>활용결과 등록 상세 내용...</p>
                        <p>활용결과 등록 상세 내용...</p>
                      </div>
                    </section>
                    <section id="anchor-sec3" className="tab-section" role="tabpanel" tabIndex={0} aria-labelledby="tab3">
                      <div className="inner-box">
                        <p>시스템 이용 문의 상세 내용...</p>
                        <p>시스템 이용 문의 상세 내용...</p>
                        <p>시스템 이용 문의 상세 내용...</p>
                        <p>시스템 이용 문의 상세 내용...</p>
                        <p>시스템 이용 문의 상세 내용...</p>
                        <p>시스템 이용 문의 상세 내용...</p>
                        <p>시스템 이용 문의 상세 내용...</p>
                        <p>시스템 이용 문의 상세 내용...</p>
                        <p>시스템 이용 문의 상세 내용...</p>
                        <p>시스템 이용 문의 상세 내용...</p>
                        <p>시스템 이용 문의 상세 내용...</p>
                        <p>시스템 이용 문의 상세 내용...</p>
                      </div>
                    </section>
                  </div>

                  <h3 className="section-title">탭 라인</h3>
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

                  <h3 className="section-title">탭 박스</h3>

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
                          <Box>
                            {categoryNaming[category]} 내용이 출력됩니다.
                          </Box>
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

                  <h3 className="section-title">테이블 type-2</h3>
                  <Box className="base-table-container">
                    <Box className="table-responsive">
                      <table className="base-table table-type-2">
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


                  <h3 className="section-title">데이터없을경우</h3>
                  <Box className="no-data">
                    <p>게시물이없습니다.</p>
                  </Box>

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

                        <Box className="form-item">
                          <Typography component="label" htmlFor="reportMotive" className="label">
                            부정행위를 알게 된 계기 <Box component="span" className="optional">(선택)</Box>
                          </Typography>
                          
                          {/* 플레이스홀더 대신 가이드 텍스트 */}
                          <Typography variant="caption" sx={{ color: '#8A949E', display: 'block', mb: 1, lineHeight: 1.4 }}>
                            * 알게 된 계기, 일시, 장소 등을 최대한 상세히 작성해 주시면 처리에 도움이 됩니다.
                          </Typography>

                          <TextField
                            id="reportMotive"
                            placeholder="내용을 입력하세요."
                            multiline
                            rows={4}
                            fullWidth
                          />
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
                  <Button variant="outlined03">라인버튼 outlined02</Button>
                  <Button variant="outlined04">라인버튼 outlined04</Button>


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
                  <Box className="btn-group">
                    <Button variant="contained02" size="large">
                      목록
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

                  <Box className="btn-group center">
                    <Button variant="outlined02" size="large">
                      취소하기
                    </Button>
                    <Button variant="contained" size="large">
                      확인
                    </Button>
                  </Box>

                  <Box className="btn-group between">
                    <Button variant="outlined02" size="large">취소하기</Button>
                    <Button variant="contained" size="large">수정</Button>
                  </Box>

                  <Box className="btn-group between">
                      <Box className="left-group">
                        <Button variant="contained02" size="large">
                          목록
                        </Button>
                      </Box>
                      <Box className="right-group">
                        <Button variant="outlined02" size="large">
                          취소
                        </Button>
                        <Button variant="contained" size="large">
                          수정
                        </Button>
                      </Box>
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


                  <h3 className="section-title">버튼 html</h3>  
                  <button type="button" className="btn-link-html">버튼 내부링크 바로가기</button>
                  <br/><br/>
                  <a href="#" className="btn-link-html" target="_blank">a 내부링크 바로가기</a>
                  <br/><br/>
                  <a href="#" className="btn-link-blank-html" target="_blank"  rel="noopener noreferrer" title="바로가기(새 창 열림)">
                     텍스트타입 외부 바로가기
                    <span className="ico-link-blank" aria-hidden="true"></span>
                    <span className="sr-only">(새 창 열림)</span>
                  </a>
                  <br/><br/>
                  <a 
                    href="#" 
                    className="btn_default" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title="바로가기(새 창 열림)"
                  >
                     버튼타입 외부 바로가기
                    <span className="ico-link" aria-hidden="true"></span>
                    <span className="sr-only">(새 창 열림)</span>
                  </a>
                  

                  <br/><br/>
                  <div className="btn-group-control right">
                    <button type="button" className="btn_default xsmall">회원가입</button>
                    <button type="button" className="btn_outline_sub xsmall"><span className="ico-down" aria-hidden="true"></span>민원신청 매뉴얼 다운로드</button>
                    <button type="button" className="btn_outline_sub xsmall">피해구제 민원신청 바로가기<span className="ico-arr-right" aria-hidden="true"></span></button>
                  </div>
                  <br/><br/>

                  <button className="btn_outline_sub xsmall"><span className="ico-down" aria-hidden="true"></span>다운로드</button>
                  <br/><br/>
                  <button className="btn_outline_sub xsmall">바로가기<span className="ico-arr-right" aria-hidden="true"></span></button>
                  <br/><br/>

                  <button className="btn_default">버튼</button>
                  <button className="btn_default xsmall">버튼 xsmall</button>
                  <button className="btn_default small">버튼 small</button>
                  <button className="btn_default large">버튼 large</button>
                  <br/>

                  <button className="btn_default_sub">버튼</button>
                  <button className="btn_default_sub xsmall">버튼 xsmall</button>
                  <button className="btn_default_sub small">버튼 small</button>
                  <button className="btn_default_sub large">버튼 large</button>
                  <br/>

                  <button className="btn_outline">버튼</button>
                  <button className="btn_outline xsmall">버튼 xsmall</button>
                  <button className="btn_outline small">버튼 small</button>
                  <button className="btn_outline large">버튼 large</button>
                  <br/>

                  <button className="btn_outline_sub">버튼</button>
                  <button className="btn_outline_sub xsmall">버튼 xsmall</button>
                  <button className="btn_outline_sub small">버튼 small</button>
                  <button className="btn_outline_sub large">버튼 large</button>


                  <h3 className="section-title">페이징</h3>
                  <Stack className="paging-wrap">
                    <Pagination count={totalPages} page={pageIndex} onChange={(_, p) => {
                      const next = new URLSearchParams(searchParams);
                      next.set('page', String(p));
                      setSearchParams(next);
                    }} />
                  </Stack>


                  <h3 className="section-title">타이틀아래 텍스트 구성</h3>
                  <div className="section-desc">
                    <p>의약품은 시판 전 동물시험에 의한 전임상시험과 사람에 대한 임상시험을 거쳐 시판 허가를 받게 됩니다.</p>
                    <p>이런한 임상시험은 관찰기간이 제한되고, 한정된 연구대상자를 대상으로 하기 때문에 모든 약물이상반응을 파악하는 것은 불가능합니다.</p>
                    <p>따라서 시판 후 약물감시는 대단히 중요하며, 의약품 사용시 나타나는 각종 이상사례를 수집·평가하여 안전대책을 강구함으로써 국민의 안전한 의약품 사용을 도모할 수 있습니다.</p>
                  </div>

                  <h3 className="section-title">리스트 블릿</h3>
                  <ul className="list-bullet">
                    <li>개인정보 보호를 위해 비밀번호 5회 이상 오류 시, 비밀번호 재설정이 필요합니다.</li>
                    <li>비밀번호는 주기적(3개월)으로 변경하시고, 서비스 이용 후 반드시 로그아웃 하시기 바랍니다.</li>
                    <li>로그인 후 60분 동안 미동작 시 자동으로 로그아웃 됩니다.</li>
                  </ul>

                  <br></br>

                  <ul className="list-bullet-2">
                      <li>식품의약품안전처와 한국의약품안전관리원에서는 전문가를 위한 의약품 적정사용 정보집을 발간하고 의약품 처방‧조제 시 참고자료로 활용하도록 하고 있습니다.</li>
                      <li>2009년에는 노인에 대한 의약품 적정사용 정보집, 2010년에는 임부에 대한 의약품 적정사용 정보집, 2011년에는 소아, 신질환 환자에 대한 의약품 적정사용 정보집, 2012년에는 간질환 환자에 대한 의약품 적정사용 정보집을 개발‧제공 하였습니다.</li>
                  </ul>

                  <br></br>

                  <ul className="list-bullet-3">
                      <li>식품의약품안전처와 한국의약품안전관리원에서는 전문가를 위한 의약품 적정사용 정보집을 발간하고 의약품 처방‧조제 시 참고자료로 활용하도록 하고 있습니다.</li>
                      <li>2009년에는 노인에 대한 의약품 적정사용 정보집, 2010년에는 임부에 대한 의약품 적정사용 정보집, 2011년에는 소아, 신질환 환자에 대한 의약품 적정사용 정보집, 2012년에는 간질환 환자에 대한 의약품 적정사용 정보집을 개발‧제공 하였습니다.</li>
                  </ul>

                  <h3 className="section-title">리스트 넘버</h3>
                  <ul className="num-list">
                    <li>
                      <span className="num">1.</span>
                      <p className="txt">사망을 초래하거나 생명을 위협하는 사례</p>
                    </li>
                    <li>
                      <span className="num">2.</span>
                      <p className="txt">사망을 초래하거나 생명을 위협하는 사례</p>
                    </li>
                    <li>
                      <span className="num">3.</span>
                      <p className="txt">사망을 초래하거나 생명을 위협하는 사례</p>
                    </li>
                  </ul>

                  <h3 className="section-title">dl 리스트</h3>
                  <dl className="list-definition">
                    <dt>제조·수입업체</dt>
                    <dd>
                      <p>1) 자료 요청서 작성 및 제출</p>
                      <p>2) 순차적으로 검토 및 접수</p>
                      <p>3) 자료 추출 및 제공</p>
                    </dd>
                    <dt>제조·수입업체</dt>
                    <dd>
                      <p>1) 자료 요청서 작성 및 제출</p>
                      <p>2) 순차적으로 검토 및 접수</p>
                      <p>3) 자료 추출 및 제공</p>
                    </dd>
                  </dl>

                  <br/>

                  <dl className="list-definition">
                    <dt>규정 및 신청방법 문의</dt>
                    <dd>
                      <ul className="list-bullet-3">
                          <li>이메일 : kids_kd@drugsafe.or.kr</li>
                          <li>전화 : 02-2172-6700(-1-3)</li>
                      </ul>
                    </dd>
                    <dt>규정 및 신청방법 문의</dt>
                    <dd>
                      <ul className="list-bullet-3">
                          <li>이메일 : kids_kd@drugsafe.or.kr</li>
                          <li>전화 : 02-2172-6700(-1-3)</li>
                      </ul>
                    </dd>
                  </dl>


                  <h3 className="section-title">텍스트타입</h3>
                  <p className="txt-type-1">이상사례·약물이상반응 중 다음 각 항목의 어느 하나에 해당하는 경우를 말합니다.</p>
                  <p className="txt-type-1 txt-2">이상사례·약물이상반응 중 다음 각 항목의 어느 하나에 해당하는 경우를 말합니다.</p>
                  <p className="txt-type-1 txt-4">이상사례·약물이상반응 중 다음 각 항목의 어느 하나에 해당하는 경우를 말합니다.</p>
                  <p className="txt-type-2">이상사례·약물이상반응 중 다음 각 항목의 어느 하나에 해당하는 경우를 말합니다.</p>
                 
                  <h3 className="section-title">텍스트 아이콘타입</h3>
                  <p className="txt-icon-1">이상사례·약물이상반응 중 다음 각 항목의 어느 하나에 해당하는 경우를 말합니다.</p>
                
                  <h3 className="section-title">box</h3>
                  <div className="box-type-1"></div>
                  <div className="box-type-2"></div>

                  <h3 className="section-title">사이간격</h3>
                  <p>sx=mb: 5</p>
                  <p>class mb40</p>
                  <Box sx={{ mb: 5 }}></Box>



                  <h3 className="section-title">이미지</h3>
                  <div className="img-switcher">
                    <img src="/img/dadverseKaers_img01.png" alt="이미지설명" className="responsive-img pc-only"/>
                    <img src="/img/dadverseKaers_img01_m.png"  alt="" aria-hidden="true" className="responsive-img mo-only"/>
                  </div>

                

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
