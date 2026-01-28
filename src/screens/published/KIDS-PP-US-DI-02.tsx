import React, { useMemo, useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button, Typography, Stack, Pagination, Tabs, Tab, LinearProgress } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import { useSearchParams } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Download as DownloadIcon} from '@mui/icons-material';
import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import KoglLicense from '@/components/common/KoglLicense';

export default function KIDS_PP_US_DI_02() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'DUR 정보',
      children: [
        { key: '#', label: 'DUR 정보검색' }
      ] 
    }
  ], []);

  //페이징
  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = Number(searchParams.get('page') || 1);
  const { list, totalCount } = useAppSelector((s) => s.pst);
  const totalPages = Math.max(1, Math.ceil((totalCount || 1) / 10));

  // 탭
  const searchCount = { //퍼블테스트용
    tab1: 12,
    tab2: 5,
    tab3: 8,
    tab4: 0,
    tab5: 3,
    tab6: 21,
    tab7: 7,
    tab8: 4,
  };

  const categoryNaming: Record<string, string> = {
    TAB1: `병용금기 (${searchCount.tab1})`,
    TAB2: `특정연령대 금기 (${searchCount.tab2})`,
    TAB3: `임부금기 (${searchCount.tab3})`,
    TAB4: `용량주의 (${searchCount.tab4})`,
    TAB5: `투여기간주의 (${searchCount.tab5})`,
    TAB6: `효능군중복주의 (${searchCount.tab6})`,
    TAB7: `노인주의 (${searchCount.tab7})`,
    TAB8: `수유부주의 (${searchCount.tab8})`,
  };
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveCategory(newValue);
  };

  // 상세 결과 데이터
 /*  const resultData = [
    {
      id: 1,
      targetIngredient: "haloperidol",
      contraIngredients: [
        { name: "benserazide hydrochloride (as benserazide) + levodopa", hasDetail: true },
        { name: "benserazide hydrochloride (as benserazide) + levodopa", hasDetail: false },
      ],
      detailInfo: "없음",
      remarks: "Levodopa의 치료감소",
    },
    {
      id: 2,
      targetIngredient: "aspirin",
      contraIngredients: [
        { name: "warfarin sodium", hasDetail: true }
      ],
      detailInfo: "출혈 위험 증가 우려",
      remarks: "병용 주의 필요",
    }
  ]; */


  //return <ListTemplate screenId="KIDS-PP-US-DI-02" title="DUR 정보검색" config={config} />
  return (
    <ScreenShell screenId="KIDS-PP-US-DI-02" title="DUR 정보검색" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>알림마당</span>
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
                <section className="pageCont-dur-DurSearchRoom">
                  <Box className="info-guide-box">
                    <Box className="guide-title">시작하기 전에</Box>
                    <ul className="guide-list">
                      <li>DUR이 적용되고 있는 성분 및 품목을 기준으로 검색이 가능합니다.</li>
                      <li>식품의약품안전처 공시·공고로 지정된 금기 및 주의 성분은 <strong>“DUR 정보 다운로드”</strong> 버튼을 클릭하여 다운로드 받은 엑셀 파일로 확인하세요.</li>
                    </ul>

                    <ul className="guide-list--sub">
                      <li>본 DUR 정보는 비상업적 연구 또는 교육에만 사용할 수 있으며, 상업적 목적으로 활용하는 경우 한국의약품안전관리원의 사전 승인을 받아야만 합니다.</li>
                      <li>Provided for non-commercial research and education use only. Used with permission from KIDS for any commercial purposes.</li>
                      <li>의약품을 아래 검색창에 입력하면, 병용시 주의, 어린이∙어르신∙임신부∙수유부에서 주의 정보 등을 확인할 수 있습니다.</li>
                      <li>참고자료원 : 식품의약품안전처 “의약품 병용금기 성분 등의 지정에 관한 규정” 고시, “의약품 적정사용을 위한 주의 정보” 공고 및 건강보험심사평가원 “DUR 대상 의약품”</li>
                    </ul>
                  </Box>

                  <Box className="search-filter-section">
                    <Box className="download-link-area">
                      <Button 
                        variant="outlined02" 
                        endIcon={<DownloadIcon />}
                        size="xsmall"
                      > 
                        DUR 정보 다운로드
                      </Button>
                    </Box>
                    <Box component="form" className="board-search">
                      <FormControl size="large" className="search-condition">
                        <InputLabel id="search-condition-label" className="sr-only">검색조건</InputLabel>
                        <Select 
                          size="large" 
                          //value={searchCnd} 
                          labelId="search-condition-label" 
                          //onChange={(e) => setSearchCnd(String(e.target.value))}
                        >
                          <MenuItem value="title">성분명(영)</MenuItem>
                          <MenuItem value="content">제품명(한)</MenuItem>
                        </Select>
                      </FormControl>
                      <Box className="search-input-group">
                        <TextField 
                          size="large" 
                          placeholder="검색어 입력" 
                          //value={searchWrd} 
                          //onChange={(e) => setSearchWrd(e.target.value)} 
                          sx={{ flexGrow: 1 }}
                        />
                        <Button variant="contained" size="large" className="btn-search">검색</Button>
                      </Box>
                    </Box>
                  </Box>

                  {/* DUR 정보 검색 결과 */}
                  <h3 className="section-title">DUR 정보 검색 결과</h3>
                  <Box className="base-table-container">
                    <Box className="table-responsive">
                      <table className="base-table">
                        <caption className="sr-only">DUR 정보 검색 결과 목록</caption>
                        <colgroup>
                          <col style={{ width: '30%' }} />
                          <col style={{ width: '45%' }} />
                          <col style={{ width: '25%' }} />
                        </colgroup>
                        <thead>
                          <tr>
                            <th scope="col">성분명(영)</th>
                            <th scope="col">DUR 유형</th>
                            <th scope="col">상세보기</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">haloperidol</th>
                            <td>
                              <Box className="dur-icons">
                                <img src="/img/ico_dur_01.png" alt="병용금기 성분 아이콘" />
                                <img src="/img/ico_dur_02.png" alt="특정연령대 금기 성분 아이콘" />
                                <img src="/img/ico_dur_03.png" alt="임부금기 성분 아이콘" />
                                <img src="/img/ico_dur_04.png" alt="용량주의 성분 아이콘" />
                                <img src="/img/ico_dur_05.png" alt="투여기간주의 성분 아이콘" />
                                <img src="/img/ico_dur_06.png" alt="효능군중복주의 성분 아이콘" />
                                <img src="/img/ico_dur_07.png" alt="노인주의 성분 아이콘" />
                                <img src="/img/ico_dur_08.png" alt="수유부주의 성분 아이콘" />
                                <img src="/img/ico_dur_09.png" alt="분할주의 의약품 아이콘" />
                              </Box>
                            </td>
                            <td>
                              <Button 
                                size="xsmall"
                                variant="outlined" 
                                className="btn-detail" 
                                endIcon={<ChevronRightIcon />}
                              >
                                상세보기
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Box>
                  </Box>
                  <Stack className="paging-wrap">
                    <Pagination count={totalPages} page={pageIndex} onChange={(_, p) => {
                      const next = new URLSearchParams(searchParams);
                      next.set('page', String(p));
                      setSearchParams(next);
                    }} />
                  </Stack>

                  {/* DUR 정보 검색 결과 상세보기 */}
                  <h3 className="section-title">DUR 정보 검색 결과 상세보기</h3>
                  <Box className="category-tabs box-variant col-4" role="navigation" aria-label="기본 카테고리 선택">
                    {/* 탭 5개씩 나열일경우 col-5 클래스명 변경 */}
                    <Tabs
                      value={activeCategory} 
                      onChange={handleTabChange}
                      scrollButtons="auto"
                      selectionFollowsFocus
                    >
                      {Object.keys(categoryNaming).map((category) => {
                        // searchCount에서 0인지 확인
                        const isDisable = (searchCount as any)[category.toLowerCase()] === 0;
                        // 탭비활성화 조건
                        const isFixedDisabled = ['TAB3', 'TAB6'].includes(category);
                        return (
                          <Tab 
                            key={`type1-${category}`} 
                            value={category} 
                            label={categoryNaming[category]}
                            id={`tab-type1-${category}`}
                            aria-controls={`tabpanel-type1-${category}`}
                            disabled={isDisable || isFixedDisabled} 
                          />
                        );
                      })}
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
                          <Box className="panel-inner">
                            {categoryNaming[category]} {/* 텝 테스트텍스트 */}

                            {/* DUR 정보 검색 결과  */}
                            <Box className="result-definition-box">
                              “병용금기 성분” 이란 두 가지 이상의 유효성분을 함께 사용하는 경우 치료효과의 변화 또는 심각한 부작용 발생 등의 우려가
                              있어 동시에 사용하지 않아야 하는 유효성분의 조합을 말합니다.
                              ( 「의약품 병용금기 성분 등의 지정에 관한 규정」 식품의약품안전처 고시 )
                              다만, 의사의 판단 하에 치료적 유익성과 위험성을 고려하여 처방이 가능합니다.
                            </Box>

                            <Box className="board-info" aria-label="검색결과">
                              <Typography className="board-count">
                                검색결과 
                                <Typography component="span" className="count">1</Typography>
                                건
                              </Typography>
                            </Box>
                            <Box className="result-detail-area">
                              <ul className="result-detail-list">
                                <li className="result-set-item">
                                  <Box className="detail-card">
                                    {/* 검색한 성분 */}
                                    <dl className="detail-item">
                                      <dt>검색한 제품</dt>
                                      <dd>
                                        <Box className="detail-info-row">
                                          <span className="text">명인할로페리돌정1.5밀리그람_(1.5mg/1정)ol</span>
                                        </Box>
                                      </dd>
                                    </dl>

                                    {/* 검색한 제품의 성분 */}
                                    <dl className="detail-item">
                                      <dt>검색한 제품의 성분</dt>
                                      <dd>
                                        <Box className="detail-info-row">
                                          <span className="text">haloperidol</span>
                                        </Box>
                                      </dd>
                                    </dl> 

                                    {/* 성분 */}
                                    <dl className="detail-item">
                                      <dt>병용금기 성분</dt>
                                      <dd>
                                        <Box className="detail-info-row">
                                          <span className="text">benserazide hydrochloride (as benserazide) + levodopa</span>
                                          <Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />}>
                                            제품검색
                                          </Button>
                                        </Box>
                                        <Box className="detail-info-row">
                                          <span className="text">benserazide hydrochloride (as benserazide) + levodopa</span>
                                        </Box>
                                      </dd>
                                    </dl>

                                    {/* 상세정보 */}
                                    <dl className="detail-item">
                                      <dt>상세정보</dt>
                                      <dd>
                                        <Box className="detail-info-row">
                                          <span className="text">Levodopa의 치료감소</span>
                                        </Box>
                                      </dd>
                                    </dl>

                                    {/* 비고 */}
                                    <dl className="detail-item">
                                      <dt>비고</dt>
                                      <dd>
                                        <Box className="detail-info-row">
                                          <span className="text">없음</span>
                                        </Box>
                                      </dd>
                                    </dl>
                                  </Box>
                                </li>
                              </ul>
                            </Box>
                          </Box>
                        </Box>
                        /* //panel-content */
                      )}
                    </Box>
                  ))}

                  {/* DUR 정보 검색 결과 로딩 */}
                  <Box className="loading-progress-box">
                    <Typography className="loading-msg-top">
                      DUR 정보 검색 결과 상세 정보를 불러오고 있습니다.
                    </Typography> 
                    <LinearProgress className="bar-style" />
                    <Typography className="loading-msg-bottom">
                      잠시만 기다려 주세요.
                    </Typography>
                  </Box>

                  {/* 공공(KOGL) 저작물 */}
                  <KoglLicense />

                  <Box className="evaluation-box">
                    <fieldset className="evaluation-fieldset">
                      <legend className="evaluation-legend">현재 페이지의 콘텐츠에 만족하시나요? </legend>
                      <Box className="evaluation-group">
                        {[
                          { id: 'v-good', label: '매우 만족' },
                          { id: 'good', label: '만족' },
                          { id: 'normal', label: '보통' },
                          { id: 'bad', label: '불만족' },
                          { id: 'v-bad', label: '매우 불만족' }
                        ].map((item) => (
                          <Box key={item.id} className="evaluation-item">
                            <input type="radio" id={item.id} name="page-eval" value={item.id} className="a11y-radio" />
                            <label htmlFor={item.id} className="evaluation-label">{item.label}</label>
                          </Box>
                        ))}
                        <Button variant="contained" className="evaluation-btn">제출</Button>
                      </Box>
                    </fieldset>
                  </Box>

                  <Box className="contact-box">
                    <Box className="info-item">
                      <span className="info-label">업무 담당 부서</span>
                      <span className="info-value">정보화팀</span>
                    </Box>
                    
                    <Box className="info-item">
                      <span className="info-label">업무 담당자</span>
                      <span className="info-value">하연경</span>
                    </Box>
                    
                    <Box className="info-item">
                      <span className="info-label">전화번호</span>
                      <span className="info-value">
                        <a href="tel:02-2172-6738" className="info-tel">02-2172-6738</a>
                        <span className="info-sub">(응대시간: 평일 09:00 - 17:00, 국경일 및 휴일 제외)</span>
                      </span>
                    </Box>
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
