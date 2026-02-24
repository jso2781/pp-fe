import React, { useMemo, useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button, Typography, Checkbox, Stack, Tabs, Tab, Pagination } from '@mui/material';
import { Switch as BaseSwitch } from '@base-ui/react';
import { useAppSelector } from '@/store/hooks';
import { useSearchParams, useLocation } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ScreenShell from '../../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import KoglLicense from '@/components/common/KoglLicense';
import { useAuth } from '@/contexts/AuthContext';

export default function KIDS_PP_US_DI_14() {
  const location = useLocation();
  const { getMenuInfo } = useAuth();
  const menuKoglCprgtTypeCd = getMenuInfo(location.pathname)?.menuKoglCprgtTypeCd ?? '4';

  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '#', 
      label: 'DUR 정보',
      children: [
        { key: '#', label: '내가 먹는 약의 DUR 정보' }
      ] 
    }
  ], []);

  // --- 테스트 데이터 ---
  const initialDrugData = [
    { id: 1, ingredient: 'haloperidol', name: '페리돌정5밀리그램(할로페리돌)', company: '환인제약(주)' },
    { id: 2, ingredient: 'aspirin', name: '아스피린프로텍트정100mg', company: '바이엘코리아(주)' },
    { id: 3, ingredient: 'acetaminophen', name: '타이레놀정500mg(아세트아미노펜)', company: '한국존슨앤드존슨' },
    { id: 4, ingredient: 'amlodipine', name: '노바스크정5mg(암로디핀베실산염)', company: '한국화이자제약(주)' },
    { id: 5, ingredient: 'amlodipine', name: '노바스크정5mg(암로디핀베실산염)', company: '한국화이자제약(주)' },
    { id: 6, ingredient: 'amlodipine', name: '노바스크정5mg(암로디핀베실산염)', company: '한국화이자제약(주)' },
    { id: 7, ingredient: 'amlodipine', name: '노바스크정5mg(암로디핀베실산염)', company: '한국화이자제약(주)' },
  ];

  // --- 상태 관리 ---
  const [basketList, setBasketList] = useState([]); 

  // 체크박스 클릭 시 (추가/삭제)
  const handleToggleDrug = (drug) => {
    const isExist = basketList.find(item => item.id === drug.id);
    if (isExist) {
      setBasketList(basketList.filter(item => item.id !== drug.id));
    } else {
      setBasketList([...basketList, drug]);
    }
  };

  // 바구니 개별 삭제 버튼
  const handleDelete = (id) => {
    setBasketList(basketList.filter(item => item.id !== id));
  };

  //스위치
  const [isCheck, setIsCheck] = useState(false);

  // 탭
  const searchCount = {
    tab1: 12,
    tab2: 5,
    tab3: 8,
    tab4: 0,
    tab5: 3,
    tab6: 21,
    tab7: 7,
    tab8: 4,
  };

  // 탭 이름 정의
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

  const [activeCategory, setActiveCategory] = useState<string>('TAB1');
  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveCategory(newValue);
  };

  //페이징
  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = Number(searchParams.get('page') || 1);
  const { list, totalCount } = useAppSelector((s) => s.pst);
  const totalPages = Math.max(1, Math.ceil((totalCount || 1) / 10));

  return (
    <ScreenShell screenId="KIDS-PP-US-DI-14" title="내가 먹는 약의 DUR 정보" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>DUR 정보</span>
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

                <section className="pageCont-dur-MyDrugInfo">
                  <Box className="info-drug-box">
                    <Box className="drug-title">내가 먹는 약의 DUR 정보를 확인해보세요!</Box>
                    <p className="drug-title--sub">복용 중인 의약품을 입력하면 금기 및 주의 정보를 확인 할 수 있습니다.</p>
                    <ul className="drug-list">
                      <li>DUR정보가 있더라도 의약전문가의 의료적 판단에 따라 처방·조제 될 수 있습니다.</li>
                      <li>참고자료원: 식품의약품안전처 “의약품 병용금기 성분 등의 지정에 관한 규정” 고시,
                      “의약품 적정사용을 위한 주의 정보” 공고 및 건강보험심사평가원 “DUR 대상 의약품” 등</li>
                    </ul> 
                  </Box>
                  <h3 className="section-title">조회 방법</h3>
                  <Box className="drug-step-box">
                    <ul className="drug-step-list">
                      <li>
                        <div className="step-num">01</div>
                        <div className="step-content">
                          <p className="step-text">의약품을 검색 후 대상 의약품의 선택 버튼을 눌러주세요.</p>
                          <p className="step-desc">(제공할 정보가 없거나, 허가 취하된 의약품은 검색 되지 않을 수 있습니다.)</p>
                        </div>
                      </li>
                      <li>
                        <div className="step-num">02</div>
                        <div className="step-content">
                          <p className="step-text">의약품 바구니에 담긴 의약품들을 확인 후 “DUR정보 확인하기” 버튼을 눌러주세요.</p>
                          <p className="step-desc">(의약품 바구니 내 의약품은 최대 100개 까지 입력할 수 있습니다.)</p>
                        </div>
                      </li>
                      <li>
                        <div className="step-num">03</div>
                        <div className="step-content">
                          <p className="step-text">DUR 정보 결과에서 DUR 정보별 안전정보를 확인 할 수 있습니다.</p>
                        </div>
                      </li>
                    </ul>
                  </Box>

                  <Box className="drug-dur-process">
                    <Box className="dur-split-layout">
                      {/* ========================
                      1단계 내가 먹는 의약품 검색 영역
                      ======================== */}
                      <Box className="search-section">
                        <Box className="step-title-group">
                          <p className="step-label">1단계<span>내가 먹는 의약품 검색</span></p>
                          <Box className="search-filter-section">
                            <Box component="form" className="board-search">
                              <FormControl size="large" className="search-condition">
                                <InputLabel id="search-condition-label" className="sr-only">검색조건</InputLabel>
                                <Select 
                                  size="large" 
                                  labelId="search-condition-label" 
                                  defaultValue=""
                                >
                                  <MenuItem value="">성분명(영)</MenuItem>
                                  <MenuItem value="">제품명(한)</MenuItem>
                                </Select>
                              </FormControl>
                              <Box className="search-input-group">
                                <TextField 
                                  size="large" 
                                  placeholder="검색어를 입력해주세요." 
                                  sx={{ flexGrow: 1 }}
                                />
                                <Button variant="contained" size="large" className="btn-search">검색</Button>
                              </Box>
                            </Box>
                          </Box>
                        </Box>

                        {/* ========================
                        검색된 내가 먹는 의약품 목록
                        ======================== */}
                        <Box className="search-result-content">
                          <Box className="base-table-container">
                            <Box className="base-table-meta">
                              <Stack direction="row" alignItems="center" spacing={2} className="switch_group">
                                <Typography className="switch_title">
                                  의약품 바구니 담기 선택
                                </Typography>
                                <BaseSwitch.Root
                                  id="search-type-switch"
                                  className="base_switch_root"
                                  checked={isCheck}
                                  onCheckedChange={(checked) => setIsCheck(checked)}
                                  aria-label="의약품 바구니 담기 선택 기준" 
                                >
                                  <BaseSwitch.Thumb className="base_switch_thumb" />
                                </BaseSwitch.Root>
                                <Typography 
                                  component="label" 
                                  htmlFor="search-type-switch" 
                                  className="switch_label"
                                  sx={{ cursor: 'pointer' }}
                                >
                                  {isCheck ? '성분명' : '제품명'}
                                </Typography>
                              </Stack>
                              <p className="helper-text">의약품 바구니 선택 옵션을 변경하시면 의약품 바구니가 초기화됩니다.</p>
                            </Box>
                            <Box className="table-responsive has-vscroll">
                              <table className="base-table">
                                <caption className="sr-only">내가 먹는 의약품 목록</caption>
                                <colgroup>
                                  {/* 성분명/제품명/제약회사/선택 */}
                                  <col style={{ width: '25%' }} />
                                  <col />
                                  <col style={{ width: '25%' }} />
                                  <col style={{ width: '50px' }} />

                                  {/* 제품명/제약회사/선택 */}
                                  {/* <col />
                                  <col style={{ width: '25%' }} />
                                  <col style={{ width: '50px' }} /> */}

                                  {/* 성분명/선택 */}
                                  {/* <col />
                                  <col style={{ width: '50px' }} /> */}
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col">성분명</th>
                                    <th scope="col">제품명</th>
                                    <th scope="col">제약회사</th>
                                    <th scope="col">선택</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {initialDrugData.length > 0 ? (
                                    initialDrugData.map((drug) => (
                                      <tr key={drug.id}>
                                        <td>{drug.ingredient}</td>
                                        <td>{drug.name}</td>
                                        <td>{drug.company}</td>
                                        <td>
                                          <Checkbox
                                            className="chk-select"
                                            checked={basketList.some((item) => item.id === drug.id)}
                                            onChange={() => handleToggleDrug(drug)}
                                            slotProps={{
                                              input: { 'aria-label': `${drug.name} 선택` },
                                            }}
                                          />
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan={4}>
                                        <Box className="no-data">
                                          제공할 정보가 없거나, 허가 취하된 의약품은 검색 되지 않을 수 있습니다.
                                        </Box>
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </Box>
                          </Box>
                        </Box>
                      </Box>

                      {/* ========================
                        2단계 의약품 바구니 영역
                      ======================== */}
                      <Box className="basket-section">
                        <Box className="step-title-group">
                          <p className="step-label">2단계<span>의약품 바구니</span></p>
                        </Box>
                        <Box className="basket-content">
                          <Box className="base-table-container">
                            <Box className="base-table-meta">
                              <Box className="board-info">
                                <Typography className="board-count">
                                  총 <Typography component="span" className="count">{basketList.length}</Typography> 개 선택
                                </Typography>
                              </Box>
                            </Box>

                            {/* ========================
                              선택한 의약품 목록
                              ======================== */}
                            <Box className="table-responsive has-vscroll">
                              <table className="base-table">
                                <caption className="sr-only">의약품 선택 목록</caption>
                                <colgroup>
                                  {/* NO/제품명/제약회사/삭제 */}
                                  <col style={{ width: '40px' }} />
                                  <col />
                                  <col style={{ width: '25%' }} />
                                  <col style={{ width: '50px' }} />

                                  {/* NO/성분명/삭제 */}
                                  {/* <col style={{ width: '40px' }} />
                                  <col />
                                  <col style={{ width: '50px' }} /> */}
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col">NO</th>
                                    <th scope="col">제품명</th>
                                    <th scope="col">제약회사</th>
                                    <th scope="col">삭제</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {basketList.length > 0 ? (
                                    basketList.map((item, index) => (
                                      <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td className="text-left">{item.name}</td>
                                        <td>{item.company}</td>
                                        <td>
                                          <Button 
                                            className="btn-delete-circle" 
                                            onClick={() => handleDelete(item.id)}
                                            aria-label={`${item.name} 삭제`}
                                            sx={{ textTransform: 'none' }}
                                            title="삭제" 
                                          >
                                            <span aria-hidden="true">×</span>
                                          </Button>
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan={4}>
                                        <Box className="no-data">
                                          <p>의약품 바구니가 비어져있습니다.</p>
                                          <p>검색한 의약품을 선택해주세요.</p>
                                        </Box>
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box className="btn-group center">
                      <Button variant="contained" size="large">
                        DUR 정보 확인하기
                      </Button>
                    </Box>
                  </Box>
                  
                  {/* ========================
                    3단계 DUR 정보결과
                  ======================== */}
                  <Box className="dur-result-section">
                    <Box className="step-title-group">
                      <p className="step-label">3단계<span>DUR 정보결과</span></p>
                    </Box>
                    <Box className="dur-result-content">
                      <Box className="category-tabs box-variant col-4" role="navigation" aria-label="기본 카테고리 선택">
                        {/* 탭 5개씩 나열일경우 col-5 클래스명 변경 */}
                        <Tabs
                          value={activeCategory} 
                          onChange={handleTabChange}
                          scrollButtons="auto"
                          selectionFollowsFocus
                        >
                          {Object.keys(categoryNaming).map((category) => {
                            const isDisable = (searchCount as any)[category.toLowerCase()] === 0;
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
                          id={`tabpanel-type1-${category}`}
                          aria-labelledby={`tab-type1-${category}`}
                          hidden={activeCategory !== category}
                          className="tab-panel-container"
                        >
                          {activeCategory === category && (
                          <Box className="panel-content">
                            <Typography className="sr-only">{categoryNaming[category]} 탭 컨텐츠 </Typography>
                            <Box className="panel-inner">
                              <Box className="board-info" aria-label="검색결과">
                                <Typography className="board-count">
                                  검색결과 <Typography component="span" className="count">1</Typography> 건
                                </Typography>
                              </Box>
                              <Box className="result-detail-area">
                                <ul className="result-detail-list">
                                  <li className="result-set-item">
                                    <Box className="detail-card">
                                      <dl className="detail-item">
                                        <dt>제품명</dt>
                                        <dd>
                                          <Box className="detail-info-row">
                                            <span className="text">다이아벡스정250밀리그램 (메트포르민염산염)</span>
                                            <Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />}>
                                              제품검색
                                            </Button>
                                          </Box>
                                        </dd>
                                      </dl>
                                      <dl className="detail-item">
                                        <dt>제품명</dt>
                                        <dd>
                                          <Box className="detail-info-row">
                                            <span className="text">패티오돌주사(아이오다이즈드오일)_(12.8g/10mL)</span>
                                          </Box>
                                        </dd>
                                      </dl>
                                      <dl className="detail-item">
                                        <dt>상세정보</dt>
                                        <dd>
                                          <Box className="detail-info-row">
                                            <span className="text">기능성 신부전에 의한 유산산성증 촉진</span>
                                          </Box>
                                        </dd>
                                      </dl>
                                      <dl className="detail-item">
                                        <dt>비고</dt>
                                        <dd>
                                          <Box className="detail-info-row">
                                            <span className="text">48시간 이내 병용금기</span>
                                          </Box>
                                        </dd>
                                      </dl>
                                    </Box>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    ))}
                    </Box>
                    <Stack className="paging-wrap">
                      <Pagination count={totalPages} page={pageIndex} onChange={(_, p) => {
                        const next = new URLSearchParams(searchParams);
                        next.set('page', String(p));
                        setSearchParams(next);
                      }} />
                    </Stack>
                  </Box>
                  {/* //dur-result-section */}

                  {/* 공공(KOGL) 저작물 */}
                  <KoglLicense menuKoglCprgtTypeCd={menuKoglCprgtTypeCd} />

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
                          <div key={item.id} className="evaluation-item">
                            <input type="radio" id={item.id} name="page-eval" value={item.id} className="a11y-radio" />
                            <label htmlFor={item.id} className="evaluation-label">{item.label}</label>
                          </div>
                        ))}
                        <Button variant="contained" className="evaluation-btn">제출</Button>
                      </Box>
                    </fieldset>
                  </Box>

                  <Box className="contact-box">
                    <div className="info-item">
                      <span className="info-label">업무 담당 부서</span>
                      <span className="info-value">정보화팀</span>
                    </div>
                    
                    <div className="info-item">
                      <span className="info-label">업무 담당자</span>
                      <span className="info-value">하연경</span>
                    </div>
                    
                    <div className="info-item">
                      <span className="info-label">전화번호</span>
                      <span className="info-value">
                        <a href="tel:02-2172-6738" className="info-tel">02-2172-6738</a>
                        <span className="info-sub">(응대시간: 평일 09:00 - 17:00, 국경일 및 휴일 제외)</span>
                      </span>
                    </div>
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