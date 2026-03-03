import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button, Typography, Stack, Pagination, Tabs, Tab, LinearProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useSearchParams, useLocation, useParams } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Download as DownloadIcon} from '@mui/icons-material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import KoglLicense from '@/components/common/KoglLicense';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import DgstfnExnm from '@/components/common/DgstfnExnm';
import ContactArea from '@/components/common/ContactArea';
import { selectDurSearchRoomList } from '@/features/dur/DurSearchRoomThunks';
import { resetResults } from '@/features/dur/DurSearchRoomSlice';
import { AgeItem, ConcItem, CpctItem, DosageItem, DurSearchRoomRVO, EftgrpItem, NurswItem, PrgntItem, SnctzItem } from '@/features/dur/DurSearchRoomTypes';

export default function DurSearchRoom(){
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const { list, totalCount, totalPages, loading } = useAppSelector((s) => s.durSearchRoom);
  const { lang } = useParams<{ lang: string }>();

  /** 제품검색 클릭 시 DurPrdctDetailPop을 팝업 창으로 열고, igrdNm을 쿼리로 전달 */
  const openPrdctDetailPop = (igrdNm: string, bannTypeCd: string) => {
    const base = `${window.location.origin}/pp/${lang ?? 'ko'}/maintask/dur/DurPrdctDetailPop`;
    const url = `${base}?igrdNm=${encodeURIComponent(igrdNm)}&bannTypeCd=${encodeURIComponent(bannTypeCd)}`;
    const width = 800;
    const height = 600;
    const left = Math.round((window.screen.width - width) / 1.5);
    const top = Math.round((window.screen.height - height) / 1.5);
    const features = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes,popup=1`;
    window.open(url, 'DurPrdctDetailPop', features);
  };

  /** 중복 상세보기 클릭 시 DurEftgrpDetailPop을 팝업 창으로 열고, igrdNm을 쿼리로 전달 */
  const openEftgrpDetailPop = (igrdNm: string) => {
    const base = `${window.location.origin}/pp/${lang ?? 'ko'}/maintask/dur/DurEftgrpDetailPop`;
    const url = `${base}?igrdNm=${encodeURIComponent(igrdNm)}`;
    const width = 800;
    const height = 600;
    const left = Math.round((window.screen.width - width) / 2);
    const top = Math.round((window.screen.height - height) / 2);
    const features = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes,popup=1`;
    window.open(url, 'DurEftgrpDetailPop', features);
  };

  const [searchCnd, setSearchCnd] = useState<string>(searchParams.get('searchCnd') || 'igrdNm');
  const [searchWrd, setSearchWrd] = useState<string>(searchParams.get('searchWrd') || '');

  /** 결과 목록/상세에 사용할 조회조건. 검색 실행 시에만 갱신되어, 조회조건 변경만으로는 칼럼이 바뀌지 않음 */
  const [resultSearchCnd, setResultSearchCnd] = useState<string>(searchParams.get('searchCnd') || 'igrdNm');

  // 페이징
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10) // 화면에 페이지 사이즈 설정이 필요시 setPageSize 활용

  const { getMenuInfo } = useAuth();
  const menuInfo = getMenuInfo(location.pathname);

  /** 개인정보포함여부 */
  const prvcInclYn = menuInfo?.prvcInclYn ?? null;

  /** 만족도조사여부 */
  const dgstfnExmnYn = menuInfo?.dgstfnExmnYn ?? null;

  /** 메뉴노출여부 */
  const menuExpsrYn = menuInfo?.menuExpsrYn ?? null;

  /** 부서정보노출여부 */
  const deptInfoExpsrYn = menuInfo?.deptInfoExpsrYn ?? null;

  /** 담당자정보노출여부 */
  const picInfoExpsrYn = menuInfo?.picInfoExpsrYn ?? null;

  /** 메뉴공공누리저작권유형코드 */
  const menuKoglCprgtTypeCd = menuInfo?.menuKoglCprgtTypeCd ?? null;

  const menuSn = menuInfo?.menuSn ?? null;
  const contactDepNm = menuInfo?.menuTkcgDeptNm ?? null;
  const contactPersonNm = menuInfo?.menuPicFlnm ?? null;
  const contactPhoneNum = menuInfo?.encptPicTelno ?? null;

  // Lnb 랜더링용
  const currentUrl = location.pathname;

  // 스크롤 상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNum]);

  // 다른 메뉴로 나갈 때 조회 결과 초기화 → 다시 들어오면 결과 없음
  useEffect(() => {
    return () => {
      dispatch(resetResults());
    };
  }, [dispatch]);

  const rows = useMemo(() => {
    const arr = Array.isArray(list) && list.length > 0 ? list : [];
    return arr.map((n: DurSearchRoomRVO, idx: number) => {
      return {
        id: idx,
        igrdNm: n.igrdNm ?? '',
        prdctNm: n.prdctNm ?? '',
        concList: n.concList ?? [],
        ageList: n.ageList ?? [],
        prgntList: n.prgntList ?? [],
        cpctList: n.cpctList ?? [],
        dosageList: n.dosageList ?? [],
        eftgrpList: n.eftgrpList ?? [],
        snctzList: n.snctzList ?? [],
        nurswList: n.nurswList ?? []
      };
    });
  }, [list]);

  useEffect(() => {
    if((searchWrd ?? '').trim().length < 2)return;
    setResultSearchCnd(searchCnd);
    dispatch(selectDurSearchRoomList({ pageNum, pageSize, igrdNm: searchCnd === 'igrdNm' ? searchWrd : undefined, prdctNm: searchCnd === 'prdctNm' ? searchWrd : undefined }));
  }, [dispatch, pageNum]);

  // 조회 결과가 바뀌면 상세 선택 초기화 (탭/상세 영역 숨김)
  useEffect(() => {
    setSelectedRowIndex(null);
  }, [list]);

  const onSearch = () => {
    if((searchWrd ?? '').trim().length < 2)return;
    setPageNum(1);
    setSelectedRowIndex(null); // 조회가 완료(loading=true)되기 전까진 "DUR 정보 검색 결과" 영역과 "DUR 정보 검색 결과 상세보기" 영역을 숨김.
    setResultSearchCnd(searchCnd);
    dispatch(selectDurSearchRoomList({ pageNum: 1, pageSize, igrdNm: searchCnd === 'igrdNm' ? searchWrd : undefined, prdctNm: searchCnd === 'prdctNm' ? searchWrd : undefined }));
  };

  /** 상세보기 클릭한 행 인덱스. null이면 탭/상세 영역 숨김 */
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  /** 탭 상세 영역 화면 페이징 크기 (백엔드 호출 없이 프론트에서만 slice) */
  const TAB_DETAIL_PAGE_SIZE = 10;

  // 탭별 리스트 정보 (상세 클릭한 행 기준으로 표기)
  const [tabContentLists, setTabContentLists] = useState<Record<string, {totalCount: number, list: any[]}>>({
    tab1: {totalCount: 0, list: [] as ConcItem[]},
    tab2: {totalCount: 0, list: [] as AgeItem[]},
    tab3: {totalCount: 0, list: [] as PrgntItem[]},
    tab4: {totalCount: 0, list: [] as CpctItem[]},
    tab5: {totalCount: 0, list: [] as DosageItem[]},
    tab6: {totalCount: 0, list: [] as EftgrpItem[]},
    tab7: {totalCount: 0, list: [] as SnctzItem[]},
    tab8: {totalCount: 0, list: [] as NurswItem[]}
  });

  /** 탭별 현재 페이지 (탭 상세 리스트용, 키: tab1~tab8) */
  const [tabDetailPageNum, setTabDetailPageNum] = useState<Record<string, number>>({
    tab1: 1, tab2: 1, tab3: 1, tab4: 1, tab5: 1, tab6: 1, tab7: 1, tab8: 1
  });

  /** 탭 키에 해당하는 리스트를 현재 페이지만 잘라서 반환 (백엔드 무관 클라이언트 페이징) */
  const getPagedTabList = (tabKey: string) => {
    const { list, totalCount } = tabContentLists[tabKey] ?? { list: [], totalCount: 0 };
    const currentPage = tabDetailPageNum[tabKey] ?? 1;
    const totalPages = Math.max(1, Math.ceil(totalCount / TAB_DETAIL_PAGE_SIZE));
    const start = (currentPage - 1) * TAB_DETAIL_PAGE_SIZE;
    const pagedList = list.slice(start, start + TAB_DETAIL_PAGE_SIZE);
    return { pagedList, totalCount, totalPages, currentPage };
  };

  const setTabDetailPage = (tabKey: string, page: number) => {
    setTabDetailPageNum((prev) => ({ ...prev, [tabKey]: page }));
  };

  /** 상세보기 영역 제목으로 스크롤 (상세 페이지 번호 클릭 시마다 해당 제목까지 위로 이동) */
  const detailSectionRef = useRef<HTMLHeadingElement>(null);
  const scrollToDetailSectionTitle = () => {
    const el = detailSectionRef.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };
  const handleTabDetailPageChange = (tabKey: string, page: number) => {
    setTabDetailPage(tabKey, page);
    setTimeout(scrollToDetailSectionTitle, 50);
  };

  const TAB_ORDER: string[] = ['TAB1', 'TAB2', 'TAB3', 'TAB4', 'TAB5', 'TAB6', 'TAB7', 'TAB8'];

  const onDetailClick = (rowIdx: number) => {
    const row = rows[rowIdx];
    if (!row) return;
    setSelectedRowIndex(rowIdx);
    setTabDetailPageNum({ tab1: 1, tab2: 1, tab3: 1, tab4: 1, tab5: 1, tab6: 1, tab7: 1, tab8: 1 });
    setTabContentLists({
      tab1: { totalCount: row.concList.length, list: row.concList },
      tab2: { totalCount: row.ageList.length, list: row.ageList },
      tab3: { totalCount: row.prgntList.length, list: row.prgntList },
      tab4: { totalCount: row.cpctList.length, list: row.cpctList },
      tab5: { totalCount: row.dosageList.length, list: row.dosageList },
      tab6: { totalCount: row.eftgrpList.length, list: row.eftgrpList },
      tab7: { totalCount: row.snctzList.length, list: row.snctzList },
      tab8: { totalCount: row.nurswList.length, list: row.nurswList },
    });
    // 데이터가 존재하는 첫 번째 탭 자동 선택
    const listLengths = [
      row.concList.length,
      row.ageList.length,
      row.prgntList.length,
      row.cpctList.length,
      row.dosageList.length,
      row.eftgrpList.length,
      row.snctzList.length,
      row.nurswList.length,
    ];
    const firstTabWithData = TAB_ORDER.find((_, i) => listLengths[i] > 0);
    setActiveCategory(firstTabWithData ?? 'TAB1');
  };

  const categoryNaming: Record<string, string> = {
    TAB1: `병용금기 (${tabContentLists.tab1.totalCount})`,
    TAB2: `특정연령대 금기 (${tabContentLists.tab2.totalCount})`,
    TAB3: `임부금기 (${tabContentLists.tab3.totalCount})`,
    TAB4: `용량주의 (${tabContentLists.tab4.totalCount})`,
    TAB5: `투여기간주의 (${tabContentLists.tab5.totalCount})`,
    TAB6: `효능군중복주의 (${tabContentLists.tab6.totalCount})`,
    TAB7: `노인주의 (${tabContentLists.tab7.totalCount})`,
    TAB8: `수유부주의 (${tabContentLists.tab8.totalCount})`,
  };

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveCategory(newValue);
  };

  const categoryDesc: Record<string, string>   = {
    TAB1: '“병용금기 성분” 이란 두 가지 이상의 유효성분을 함께 사용하는 경우 치료효과의 변화 또는 심각한 부작용 발생 등의 우려가\n\n있어 동시에 사용하지 않아야 하는 유효성분의 조합을 말합니다.\n\n( 「의약품 병용금기 성분 등의 지정에 관한 규정」 식품의약품안전처 고시 )\n\n다만, 의사의 판단 하에 치료적 유익성과 위험성을 고려하여 처방이 가능합니다.',
    TAB2: '“특정연령대금기 성분” 이란 소아, 노인 등 특정한 연령대의 환자가 사용함에 있어 안전성이 확보되지 않았거나 심각한 부작용\n발생 등의 우려가 있어 사용하지 않아야 하는 유효성분을 말합니다.\n\n( 「의약품 병용금기 성분 등의 지정에 관한 규정」 식품의약품안전처 고시 )\n\n다만, 의사의 판단 하에 치료적 유익성과 위험성을 고려하여 처방이 가능합니다.',
    TAB3: '”임부금기 성분” 이란 태아에게 매우 심각한 위해성(태아기형 또는 태아독성 등)을 유발하거나 유발할 가능성이 높아 임부에게\n상요하는 것이 권장되지 않는 유효성분을 말하는 것으로 다음 각 목의 구분에 따라 사용이 금지되는 성분을 말합니다.\n\n( 「의약품 병용금기 성분 등의 지정에 관한 규정」 식품의약품안전처 고시 )\n\n가. 1등급 : 사람에서 태아에 대한 위해성이 명확하고, 약물사용의 위험성이 치료 상의 유익성을 상회하는 경우로 원칙적으로 사용금지\n\n나. 2등급 : 사람에서 태아에 대한 위해성이 나타날 수 있으며, 약물사용의 위험성이 치료 상의 유익성을 상회하는 경우로 원칙적\n으로 사용금지. 다만, 치료상의 유익성이 약물상용의 잠재적 위험성을 상회하거나 명확한 임상적 사유가 있어 사용하는 경우에는\n예외.\n\n다만, 의사의 판단 하에 치료적 유익성과 위험성을 고려하여 처방이 가능합니다.\n',
    TAB4: '“용량주의 성분” 이란 성인에게 특정 용량을 초과하여 투여 시 효과의 증가는 기대하기 어렵고 용량의존적 부작용 발생 가능성이\n높아져 1일 최대용량에 대한 주의가 필요한 유효성분을 말합니다.\n\n( 「의약품 병용금기 성분 등의 지정에 관한 규정」 식품의약품안전처 고시 )\n\n다만, 의사의 판단 하에 치료적 유익성과 위험성을 고려하여 처방이 가능합니다.',
    TAB5: '“투여기간주의 성분” 이란 특정 투여기간을 초과하여 효과의 증가는 기대하기 어렵고 부작용 발생 가능성이 높아져 1회 최대 투\n여기간에 대한 주의가 필요한 유효성분을 말합니다.\n\n( 「의약품 병용금기 성분 등의 지정에 관한 규정」 식품의약품안전처 고시 )\n\n다만, 의사의 판단 하에 치료적 유익성과 위험성을 고려하여 처방이 가능합니다',
    TAB6: '“효능군중복주의 성분” 이란 약리기전이 동일하거나 유사한 효능군 내에서 중복 투여될 때 추가적인 효과의 증가는 기대하기 어\n렵고 부작용 발생 가능성이 높아져 주의가 필요한 유효성분을 말합니다.\n\n( 「의약품 병용금기 성분 등의 지정에 관한 규정」 식품의약품안전처 고시 )\n\n다만, 의사의 판단 하에 치료적 유익성과 위험성을 고려하여 처방이 가능합니다',
    TAB7: '“노인주의 성분” 이란 노인에서 부작용 발생 빈도 증가 등의 우려가 있어 사용 시 주의가 필요한 유효성분을 말합니다.\n\n( 「의약품 병용금기 성분 등의 지정에 관한 규정」 식품의약품안전처 고시 )\n\n다만, 의사의 판단 하에 치료적 유익성과 위험성을 고려하여 처방이 가능합니다.',
    TAB8: '“수유부주의 성분” 이란 수유 중의 소아에게 부작용 발생 등의 우려가 있어 수유부에게 사용 시 주의가 필요한 유효성분을 말합\n니다.\n( 「의약품 병용금기 성분 등의 지정에 관한 규정」 식품의약품안전처 고시 )\n\n다만, 의사의 판단 하에 치료적 유익성과 위험성을 고려하여 처방이 가능합니다.'
  };

  return (
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>{t('durInfo')}</span>
                </Typography>
                <Box className="lnb-list">
                  <Lnb currentUrl={currentUrl} />
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
                        {t('durInfoDownload')}
                      </Button>
                    </Box>
                    <Box component="form" className="board-search">
                      <FormControl size="large" className="search-condition">
                        <InputLabel id="search-condition-label" className="sr-only">{t('searchCondition')}</InputLabel>
                        <Select 
                          size="large" 
                          value={searchCnd} 
                          labelId="search-condition-label" 
                          onChange={(e) => setSearchCnd(String(e.target.value))}
                        >
                          <MenuItem value="igrdNm">{t('igrdNmEn')}</MenuItem>
                          <MenuItem value="prdctNm">{t('prdctNmKo')}</MenuItem>
                        </Select>
                      </FormControl>
                      <Box className="search-input-group">
                        <TextField 
                          size="large" 
                          placeholder={t('searchKeywordInput')} 
                          value={searchWrd} 
                          onChange={(e) => setSearchWrd(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              onSearch();
                            }
                          }}
                          sx={{ flexGrow: 1 }}
                        />
                        <Button
                          type="button"
                          variant="contained"
                          size="large"
                          className="btn-search"
                          disabled={(searchWrd ?? '').trim().length < 2}
                          onClick={onSearch}
                        >
                          {t('search')}
                        </Button>
                      </Box>
                    </Box>
                  </Box>

                  {/* DUR 정보 검색 결과 로딩(조회 중인 경우(loading=true)만 표기) */}
                  {loading && (
                    <Box className="loading-progress-box">
                      <Typography className="loading-msg-top">
                        DUR 정보 검색 결과 상세 정보를 불러오고 있습니다.
                      </Typography> 
                      <LinearProgress className="bar-style" />
                      <Typography className="loading-msg-bottom">
                        잠시만 기다려 주세요.
                      </Typography>
                    </Box>
                  )}

                  {/* DUR 정보 검색 결과(조회가 완료(loading=false)된 후 표시) */}
                  {!loading && (
                    <>
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
                              <th scope="col">{(list.length > 0 ? resultSearchCnd : searchCnd) === 'igrdNm' ? '성분명(영)' : '제품명(한)'}</th>
                              <th scope="col">DUR 유형</th>
                              <th scope="col">상세보기</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              rows.length > 0 ? (
                                rows.map((row) => (
                                  <tr key={row.id}>
                                    <th scope="row">{(list.length > 0 ? resultSearchCnd : searchCnd) === 'igrdNm' ? row.igrdNm : row.prdctNm}</th>
                                    <td>
                                      <Box className="dur-icons">
                                        {row.concList.length > 0 ? <img src="/img/cms/ico_dur_01.png" alt="병용금기 성분 아이콘" /> : ''}
                                        {row.ageList.length > 0 ? <img src="/img/cms/ico_dur_02.png" alt="특정연령대 금기 성분 아이콘" /> : ''}
                                        {row.prgntList.length > 0 ? <img src="/img/cms/ico_dur_03.png" alt="임부금기 성분 아이콘" /> : ''}
                                        {row.cpctList.length > 0 ? <img src="/img/cms/ico_dur_04.png" alt="용량주의 성분 아이콘" /> : ''}
                                        {row.dosageList.length > 0 ? <img src="/img/cms/ico_dur_05.png" alt="투여기간주의 성분 아이콘" /> : ''}
                                        {row.eftgrpList.length > 0 ? <img src="/img/cms/ico_dur_06.png" alt="효능군중복주의 성분 아이콘" /> : ''}
                                        {row.snctzList.length > 0 ? <img src="/img/cms/ico_dur_07.png" alt="노인주의 성분 아이콘" /> : ''}
                                        {row.nurswList.length > 0 ? <img src="/img/cms/ico_dur_08.png" alt="수유부주의 성분 아이콘" /> : ''}
                                      </Box>
                                    </td>
                                    <td>
                                      <Button 
                                        size="xsmall"
                                        variant="outlined" 
                                        className="btn-detail" 
                                        endIcon={<ChevronRightIcon />}
                                        onClick={() => onDetailClick(row.id)}
                                      >
                                        {t('detail')}
                                      </Button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={3}>
                                    <div className="no-data">검색결과가 없습니다.</div>
                                  </td>
                                </tr>
                              )
                            }
                          </tbody>
                        </table>
                      </Box>
                    </Box>
                    {
                      rows.length > 0 ? (
                        <Stack className="paging-wrap">
                          <Pagination
                            page={pageNum}
                            count={totalPages ?? 0}
                            onChange={(_: React.ChangeEvent<unknown>, page: number) => {
                              setPageNum(page)
                            }}
                            showFirstButton
                            showLastButton
                          />
                        </Stack>
                      ) : null
                    }
                    </>
                  )}

                  {/* DUR 정보 검색 결과 상세보기(조회가 완료된 상태에서 상세보기 클릭한 경우만 표시) */}
                  {!loading && selectedRowIndex !== null && (
                    <>
                    <h3 ref={detailSectionRef} className="section-title">DUR 정보 검색 결과 상세보기</h3>
                    <Box className="category-tabs box-variant col-4" role="navigation" aria-label="기본 카테고리 선택">
                      {/* 탭 5개씩 나열일경우 col-5 클래스명 변경 */}
                      <Tabs
                        value={activeCategory} 
                        onChange={handleTabChange}
                        scrollButtons="auto"
                        selectionFollowsFocus
                      >
                        {Object.keys(categoryNaming).map((category) => {
                          // 해당 탭 리스트 개수가 0이면 비활성화
                          const isDisable = tabContentLists[category.toLowerCase()].totalCount === 0;
                          return (
                            <Tab 
                              key={`type1-${category}`} 
                              value={category} 
                              label={categoryNaming[category]}
                              id={`tab-type1-${category}`}
                              aria-controls={`tabpanel-type1-${category}`}
                              disabled={isDisable} 
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
                        {/* 병용금기 탭 */}
                        {'TAB1' === activeCategory && (() => {
                          const tabKey = 'tab1';
                          const { pagedList, totalCount, totalPages, currentPage } = getPagedTabList(tabKey);
                          return (
                            <Box className="panel-content">
                              <Typography className="sr-only">{categoryNaming['TAB1']} 탭 컨텐츠 </Typography>
                              <Box className="panel-inner">
                                {/* DUR 정보 검색 결과  */}
                                <Box className="result-definition-box">
                                  {categoryDesc['TAB1']}
                                </Box>
  
                                <Box className="board-info" aria-label="검색결과">
                                  <Typography className="board-count">
                                    검색결과 
                                    <Typography component="span" className="count">
                                      {totalCount}
                                    </Typography>
                                    건
                                  </Typography>
                                </Box>
                                {
                                  pagedList.map((item: ConcItem, idx: number) => (
                                    <Box key={`tab1-item-${idx}`} className="result-detail-area">
                                      <ul className="result-detail-list">
                                        <li className="result-set-item">
                                          <Box className="detail-card">
                                            {/* 검색한 제품명 */}
                                            {
                                              resultSearchCnd === 'prdctNm' && (
                                                <dl className="detail-item">
                                                  <dt>검색한 제품</dt>
                                                  <dd>
                                                    <Box className="detail-info-row">
                                                      <span className="text">{item.prdctNm}</span>
                                                    </Box>
                                                  </dd>
                                                </dl>
                                              )
                                            }
  
                                            {/* 검색한 제품의 성분명 */}
                                            <dl className="detail-item">
                                              <dt>{resultSearchCnd === 'igrdNm' ? '검색한 성분' : '검색한 제품의 성분'}</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  {
                                                    resultSearchCnd === 'igrdNm' ? (
                                                      <>
                                                      <span className="text">{item.igrdNm}</span>
                                                      <Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />} onClick={() => openPrdctDetailPop(item.igrdNm, 'conc')}>
                                                        제품검색
                                                      </Button>
                                                      </>
                                                    ) : (
                                                      <span className="text">{item.igrdNm}</span>
                                                    )
                                                  }
                                                </Box>
                                              </dd>
                                            </dl> 
      
                                            {/* 성분 */}
                                            <dl className="detail-item">
                                              <dt>병용금기 성분</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  <span className="text">{item.prohibitIgrdNm}</span>
                                                  <Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />} onClick={() => openPrdctDetailPop(item.igrdNm, 'conc')}>
                                                    제품검색
                                                  </Button>
                                                </Box>
                                              </dd>
                                            </dl>
      
                                            {/* 상세정보 */}
                                            <dl className="detail-item">
                                              <dt>상세정보</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  <span className="text">{item.dtlInfoCn}</span>
                                                </Box>
                                              </dd>
                                            </dl>
      
                                            {/* 비고 */}
                                            <dl className="detail-item">
                                              <dt>비고</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  <span className="text">{item.rmrkCn}</span>
                                                </Box>
                                              </dd>
                                            </dl>
                                          </Box>
                                        </li>
                                      </ul>
                                    </Box>
                                  ))
                                }
                                {totalCount > TAB_DETAIL_PAGE_SIZE && (
                                  <Stack className="paging-wrap" sx={{ mt: 2 }}>
                                    <Pagination
                                      page={currentPage}
                                      count={totalPages}
                                      onChange={(_: React.ChangeEvent<unknown>, page: number) => handleTabDetailPageChange(tabKey, page)}
                                      showFirstButton
                                      showLastButton
                                    />
                                  </Stack>
                                )}
                              </Box>
                            </Box>
                          );
                        })()}

                        {/* 특정연령대 금기 탭 */}
                        {'TAB2' === activeCategory && (() => {
                          const tabKey = 'tab2';
                          const { pagedList, totalCount, totalPages, currentPage } = getPagedTabList(tabKey);
                          return (
                            <Box className="panel-content">
                              <Typography className="sr-only">{categoryNaming['TAB2']} 탭 컨텐츠 </Typography>
                              <Box className="panel-inner">
                                {/* DUR 정보 검색 결과  */}
                                <Box className="result-definition-box">
                                  {categoryDesc['TAB2']}
                                </Box>
  
                                <Box className="board-info" aria-label="검색결과">
                                  <Typography className="board-count">
                                    검색결과 
                                    <Typography component="span" className="count">
                                      {totalCount}
                                    </Typography>
                                    건
                                  </Typography>
                                </Box>
                                {
                                  pagedList.map((item: AgeItem, idx: number) => (
                                    <Box key={`tab2-item-${idx}`} className="result-detail-area">
                                      <ul className="result-detail-list">
                                        <li className="result-set-item">
                                          <Box className="detail-card">
                                            {/* 검색한 제품명 */}
                                            {
                                              resultSearchCnd === 'prdctNm' && (
                                                <dl className="detail-item">
                                                  <dt>검색한 제품</dt>
                                                  <dd>
                                                    <Box className="detail-info-row">
                                                      <span className="text">{item.prdctNm}</span>
                                                    </Box>
                                                  </dd>
                                                </dl>
                                              )
                                            }
  
                                            {/* 검색한 성분(성분) */}
                                            <dl className="detail-item">
                                              <dt>{resultSearchCnd === 'igrdNm' ? '검색한 성분' : '성분'}</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  {
                                                    resultSearchCnd === 'igrdNm' ? (
                                                      <>
                                                      <span className="text">{item.igrdNm}</span>
                                                      <Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />} onClick={() => openPrdctDetailPop(item.igrdNm, 'age')}>
                                                        제품검색
                                                      </Button>
                                                      </>
                                                    ) : (
                                                      <span className="text">{item.igrdNm}</span>
                                                    )
                                                  }
                                                </Box>
                                              </dd>
                                            </dl>
      
                                            {/* 연령 */}
                                            <dl className="detail-item">
                                              <dt>연령</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  <span className="text">{item.rlvtAge} {item.rlvtAgeUnitNm} {item.agePrcsCndNm}</span>
                                                </Box>
                                              </dd>
                                            </dl>
      
                                            {/* 상세정보 */}
                                            <dl className="detail-item">
                                              <dt>상세정보</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  <span className="text">{item.dtlInfoCn}</span>
                                                </Box>
                                              </dd>
                                            </dl>
  
                                          </Box>
                                        </li>
                                      </ul>
                                    </Box>
                                  ))
                                }
                                {totalCount > TAB_DETAIL_PAGE_SIZE && (
                                  <Stack className="paging-wrap" sx={{ mt: 2 }}>
                                    <Pagination
                                      page={currentPage}
                                      count={totalPages}
                                      onChange={(_: React.ChangeEvent<unknown>, page: number) => handleTabDetailPageChange(tabKey, page)}
                                      showFirstButton
                                      showLastButton
                                    />
                                  </Stack>
                                )}
                              </Box>
                            </Box>
                          );
                        })()}

                        {/* 임부금기 탭 */}
                        {'TAB3' === activeCategory && (() => {
                          const tabKey = 'tab3';
                          const { pagedList, totalCount, totalPages, currentPage } = getPagedTabList(tabKey);
                          return (
                            <Box className="panel-content">
                              <Typography className="sr-only">{categoryNaming['TAB3']} 탭 컨텐츠 </Typography>
                              <Box className="panel-inner">
                                {/* DUR 정보 검색 결과  */}
                                <Box className="result-definition-box">
                                  {categoryDesc['TAB3']}
                                </Box>
  
                                <Box className="board-info" aria-label="검색결과">
                                  <Typography className="board-count">
                                    검색결과 
                                    <Typography component="span" className="count">
                                      {totalCount}
                                    </Typography>
                                    건
                                  </Typography>
                                </Box>
                                {
                                  pagedList.map((item: PrgntItem, idx: number) => (
                                    <Box key={`tab3-item-${idx}`} className="result-detail-area">
                                      <ul className="result-detail-list">
                                        <li className="result-set-item">
                                          <Box className="detail-card">
                                            {/* 검색한 제품명 */}
                                            {
                                              resultSearchCnd === 'prdctNm' && (
                                                <dl className="detail-item">
                                                  <dt>검색한 제품</dt>
                                                  <dd>
                                                    <Box className="detail-info-row">
                                                      <span className="text">{item.prdctNm}</span>
                                                    </Box>
                                                  </dd>
                                                </dl>
                                              )
                                            }
  
                                            {/* 검색한 성분(성분) */}
                                            <dl className="detail-item">
                                              <dt>{resultSearchCnd === 'igrdNm' ? '검색한 성분' : '성분'}</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  {
                                                    resultSearchCnd === 'igrdNm' ? (
                                                      <>
                                                      <span className="text">{item.igrdNm}</span>
                                                      <Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />} onClick={() => openPrdctDetailPop(item.igrdNm, 'prgnt')}>
                                                        제품검색
                                                      </Button>
                                                      </>
                                                    ) : (
                                                      <span className="text">{item.igrdNm}</span>
                                                    )
                                                  }
                                                </Box>
                                              </dd>
                                            </dl>
      
                                            {/* 임부금기등급 */}
                                            <dl className="detail-item">
                                              <dt>임부금기등급</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  <span className="text">{item.condiGrdCd}</span>
                                                </Box>
                                              </dd>
                                            </dl>
      
                                            {/* 상세정보 */}
                                            <dl className="detail-item">
                                              <dt>상세정보</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  <span className="text">{item.dtlInfoCn}</span>
                                                </Box>
                                              </dd>
                                            </dl>
  
                                          </Box>
                                        </li>
                                      </ul>
                                    </Box>
                                  ))
                                }
                                {totalCount > TAB_DETAIL_PAGE_SIZE && (
                                  <Stack className="paging-wrap" sx={{ mt: 2 }}>
                                    <Pagination
                                      page={currentPage}
                                      count={totalPages}
                                      onChange={(_: React.ChangeEvent<unknown>, page: number) => handleTabDetailPageChange(tabKey, page)}
                                      showFirstButton
                                      showLastButton
                                    />
                                  </Stack>
                                )}
                              </Box>
                            </Box>
                          );
                        })()}

                        {/* 용량주의 탭 */}
                        {'TAB4' === activeCategory && (() => {
                          const tabKey = 'tab4';
                          const { pagedList, totalCount, totalPages, currentPage } = getPagedTabList(tabKey);
                          return (
                            <Box className="panel-content">
                              <Typography className="sr-only">{categoryNaming['TAB4']} 탭 컨텐츠 </Typography>
                              <Box className="panel-inner">
                                {/* DUR 정보 검색 결과  */}
                                <Box className="result-definition-box">
                                  {categoryDesc['TAB4']}
                                </Box>
  
                                <Box className="board-info" aria-label="검색결과">
                                  <Typography className="board-count">
                                    검색결과 
                                    <Typography component="span" className="count">
                                      {totalCount}
                                    </Typography>
                                    건
                                  </Typography>
                                </Box>
                                {
                                  pagedList.map((item: CpctItem, idx: number) => (
                                    <Box key={`tab4-item-${idx}`} className="result-detail-area">
                                      <ul className="result-detail-list">
                                        <li className="result-set-item">
                                          <Box className="detail-card">
                                            {/* 검색한 제품명 */}
                                            {
                                              resultSearchCnd === 'prdctNm' && (
                                                <dl className="detail-item">
                                                  <dt>검색한 제품</dt>
                                                  <dd>
                                                    <Box className="detail-info-row">
                                                      <span className="text">{item.prdctNm}</span>
                                                    </Box>
                                                  </dd>
                                                </dl>
                                              )
                                            }
  
                                            {/* 검색한 성분(성분) */}
                                            <dl className="detail-item">
                                              <dt>{resultSearchCnd === 'igrdNm' ? '검색한 성분' : '성분'}</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  {
                                                    resultSearchCnd === 'igrdNm' ? (
                                                      <>
                                                      <span className="text">{item.igrdNm}</span>
                                                      <Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />} onClick={() => openPrdctDetailPop(item.igrdNm, 'cpct')}>
                                                        제품검색
                                                      </Button>
                                                      </>
                                                    ) : (
                                                      <span className="text">{item.igrdNm}</span>
                                                    )
                                                  }
                                                </Box>
                                              </dd>
                                            </dl>
      
                                            {/* 1일 최대용량 */}
                                            <dl className="detail-item">
                                              <dt>1일 최대용량</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  <span className="text">{item.dayMaxAdminCpct}</span>
                                                </Box>
                                              </dd>
                                            </dl>
      
                                            {/* 비고 */}
                                            <dl className="detail-item">
                                              <dt>비고</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  <span className="text">{item.dtlInfoCn}</span>
                                                </Box>
                                              </dd>
                                            </dl>
  
                                          </Box>
                                        </li>
                                      </ul>
                                    </Box>
                                  ))
                                }
                                {totalCount > TAB_DETAIL_PAGE_SIZE && (
                                  <Stack className="paging-wrap" sx={{ mt: 2 }}>
                                    <Pagination
                                      page={currentPage}
                                      count={totalPages}
                                      onChange={(_: React.ChangeEvent<unknown>, page: number) => handleTabDetailPageChange(tabKey, page)}
                                      showFirstButton
                                      showLastButton
                                    />
                                  </Stack>
                                )}
                              </Box>
                            </Box>
                          );
                        })()}

                        {/* 투여기간주의 탭 */}
                        {'TAB5' === activeCategory && (() => {
                          const tabKey = 'tab5';
                          const { pagedList, totalCount, totalPages, currentPage } = getPagedTabList(tabKey);
                          return (
                            <Box className="panel-content">
                              <Typography className="sr-only">{categoryNaming['TAB5']} 탭 컨텐츠 </Typography>
                              <Box className="panel-inner">
                                {/* DUR 정보 검색 결과  */}
                                <Box className="result-definition-box">
                                  {categoryDesc['TAB5']}
                                </Box>
  
                                <Box className="board-info" aria-label="검색결과">
                                  <Typography className="board-count">
                                    검색결과 
                                    <Typography component="span" className="count">
                                      {totalCount}
                                    </Typography>
                                    건
                                  </Typography>
                                </Box>
                                {
                                  pagedList.map((item: DosageItem, idx: number) => (
                                    <Box key={`tab5-item-${idx}`} className="result-detail-area">
                                      <ul className="result-detail-list">
                                        <li className="result-set-item">
                                          <Box className="detail-card">
                                            {/* 검색한 제품명 */}
                                            {
                                              resultSearchCnd === 'prdctNm' && (
                                                <dl className="detail-item">
                                                  <dt>검색한 제품</dt>
                                                  <dd>
                                                    <Box className="detail-info-row">
                                                      <span className="text">{item.prdctNm}</span>
                                                    </Box>
                                                  </dd>
                                                </dl>
                                              )
                                            }
  
                                            {/* 검색한 성분(성분) */}
                                            <dl className="detail-item">
                                              <dt>{resultSearchCnd === 'igrdNm' ? '검색한 성분' : '성분'}</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  {
                                                    resultSearchCnd === 'igrdNm' ? (
                                                      <>
                                                      <span className="text">{item.igrdNm}</span>
                                                      <Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />} onClick={() => openPrdctDetailPop(item.igrdNm, 'dosage')}>
                                                        제품검색
                                                      </Button>
                                                      </>
                                                    ) : (
                                                      <span className="text">{item.igrdNm}</span>
                                                    )
                                                  }
                                                </Box>
                                              </dd>
                                            </dl>
      
                                            {/* 최대투여기간(일) */}
                                            <dl className="detail-item">
                                              <dt>최대투여기간(일)</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  <span className="text">{item.maxAdminPrdDayCnt}</span>
                                                </Box>
                                              </dd>
                                            </dl>
      
                                            {/* 비고 */}
                                            <dl className="detail-item">
                                              <dt>비고</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  <span className="text">{item.rmrkCn}</span>
                                                </Box>
                                              </dd>
                                            </dl>
  
                                          </Box>
                                        </li>
                                      </ul>
                                    </Box>
                                  ))
                                }
                                {totalCount > TAB_DETAIL_PAGE_SIZE && (
                                  <Stack className="paging-wrap" sx={{ mt: 2 }}>
                                    <Pagination
                                      page={currentPage}
                                      count={totalPages}
                                      onChange={(_: React.ChangeEvent<unknown>, page: number) => handleTabDetailPageChange(tabKey, page)}
                                      showFirstButton
                                      showLastButton
                                    />
                                  </Stack>
                                )}
                              </Box>
                            </Box>
                          );
                        })()}

                        {/* 효능군중복 탭 */}
                        {'TAB6' === activeCategory && (() => {
                          const tabKey = 'tab6';
                          const { pagedList, totalCount, totalPages, currentPage } = getPagedTabList(tabKey);
                          return (
                            <Box className="panel-content">
                              <Typography className="sr-only">{categoryNaming['TAB6']} 탭 컨텐츠 </Typography>
                              <Box className="panel-inner">
                                {/* DUR 정보 검색 결과  */}
                                <Box className="result-definition-box">
                                  {categoryDesc['TAB6']}
                                </Box>
  
                                <Box className="board-info" aria-label="검색결과">
                                  <Typography className="board-count">
                                    검색결과 
                                    <Typography component="span" className="count">
                                      {totalCount}
                                    </Typography>
                                    건
                                  </Typography>
                                </Box>
                                {
                                  pagedList.map((item: EftgrpItem, idx: number) => (
                                    <Box key={`tab6-item-${idx}`} className="result-detail-area">
                                      <ul className="result-detail-list">
                                        <li className="result-set-item">
                                          <Box className="detail-card">
                                            {/* 검색한 제품명 */}
                                            {
                                              resultSearchCnd === 'prdctNm' && (
                                                <dl className="detail-item">
                                                  <dt>검색한 제품</dt>
                                                  <dd>
                                                    <Box className="detail-info-row">
                                                      <span className="text">{item.prdctNm}</span>
                                                    </Box>
                                                  </dd>
                                                </dl>
                                              )
                                            }
  
                                            {/* 검색한 성분(성분) */}
                                            <dl className="detail-item">
                                              <dt>{resultSearchCnd === 'igrdNm' ? '검색한 성분' : '성분'}</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  {
                                                    resultSearchCnd === 'igrdNm' ? (
                                                      <>
                                                      <span className="text">{item.igrdNm}</span>
                                                      <Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />} onClick={() => openPrdctDetailPop(item.igrdNm, 'eftgrp')}>
                                                        제품검색
                                                      </Button>
                                                      </>
                                                    ) : (
                                                      <span className="text">{item.igrdNm}</span>
                                                    )
                                                  }
                                                </Box>
                                              </dd>
                                            </dl>
      
                                            {/* 효능군 */}
                                            <dl className="detail-item">
                                              <dt>효능군</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  <span className="text">{item.effGroupNm}</span>
                                                </Box>
                                              </dd>
                                            </dl>

                                            {/* 계열 */}
                                            <dl className="detail-item">
                                              <dt>계열</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  <span className="text">{item.groupNm}</span>
                                                  <Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />} onClick={() => openEftgrpDetailPop(item.igrdNm)}>
                                                    중복 상세보기
                                                  </Button>
                                                </Box>
                                              </dd>
                                            </dl>

                                          </Box>
                                        </li>
                                      </ul>
                                    </Box>
                                  ))
                                }
                                {totalCount > TAB_DETAIL_PAGE_SIZE && (
                                  <Stack className="paging-wrap" sx={{ mt: 2 }}>
                                    <Pagination
                                      page={currentPage}
                                      count={totalPages}
                                      onChange={(_: React.ChangeEvent<unknown>, page: number) => handleTabDetailPageChange(tabKey, page)}
                                      showFirstButton
                                      showLastButton
                                    />
                                  </Stack>
                                )}
                              </Box>
                            </Box>
                          );
                        })()}

                        {/* 노인주의 탭 */}
                        {'TAB7' === activeCategory && (() => {
                          const tabKey = 'tab7';
                          const { pagedList, totalCount, totalPages, currentPage } = getPagedTabList(tabKey);
                          return (
                            <Box className="panel-content">
                              <Typography className="sr-only">{categoryNaming['TAB7']} 탭 컨텐츠 </Typography>
                              <Box className="panel-inner">
                                {/* DUR 정보 검색 결과  */}
                                <Box className="result-definition-box">
                                  {categoryDesc['TAB7']}
                                </Box>
  
                                <Box className="board-info" aria-label="검색결과">
                                  <Typography className="board-count">
                                    검색결과 
                                    <Typography component="span" className="count">
                                      {totalCount}
                                    </Typography>
                                    건
                                  </Typography>
                                </Box>
                                {
                                  pagedList.map((item: SnctzItem, idx: number) => (
                                    <Box key={`tab7-item-${idx}`} className="result-detail-area">
                                      <ul className="result-detail-list">
                                        <li className="result-set-item">
                                          <Box className="detail-card">
                                            {/* 검색한 제품명 */}
                                            {
                                              resultSearchCnd === 'prdctNm' && (
                                                <dl className="detail-item">
                                                  <dt>검색한 제품</dt>
                                                  <dd>
                                                    <Box className="detail-info-row">
                                                      <span className="text">{item.prdctNm}</span>
                                                    </Box>
                                                  </dd>
                                                </dl>
                                              )
                                            }
  
                                            {/* 검색한 성분(성분) */}
                                            <dl className="detail-item">
                                              <dt>{resultSearchCnd === 'igrdNm' ? '검색한 성분' : '성분'}</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  {
                                                    resultSearchCnd === 'igrdNm' ? (
                                                      <>
                                                      <span className="text">{item.igrdNm}</span>
                                                      <Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />} onClick={() => openPrdctDetailPop(item.igrdNm, 'snctz')}>
                                                        제품검색
                                                      </Button>
                                                      </>
                                                    ) : (
                                                      <span className="text">{item.igrdNm}</span>
                                                    )
                                                  }
                                                </Box>
                                              </dd>
                                            </dl>
      
                                            {/* 비고 */}
                                            <dl className="detail-item">
                                              <dt>비고</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  <span className="text">{item.rmrkCn}</span>
                                                </Box>
                                              </dd>
                                            </dl>
  
                                          </Box>
                                        </li>
                                      </ul>
                                    </Box>
                                  ))
                                }
                                {totalCount > TAB_DETAIL_PAGE_SIZE && (
                                  <Stack className="paging-wrap" sx={{ mt: 2 }}>
                                    <Pagination
                                      page={currentPage}
                                      count={totalPages}
                                      onChange={(_: React.ChangeEvent<unknown>, page: number) => handleTabDetailPageChange(tabKey, page)}
                                      showFirstButton
                                      showLastButton
                                    />
                                  </Stack>
                                )}
                              </Box>
                            </Box>
                          );
                        })()}

                        {/* 수유부주의 탭 */}
                        {'TAB8' === activeCategory && (() => {
                          const tabKey = 'tab8';
                          const { pagedList, totalCount, totalPages, currentPage } = getPagedTabList(tabKey);
                          return (
                            <Box className="panel-content">
                              <Typography className="sr-only">{categoryNaming['TAB8']} 탭 컨텐츠 </Typography>
                              <Box className="panel-inner">
                                {/* DUR 정보 검색 결과  */}
                                <Box className="result-definition-box">
                                  {categoryDesc['TAB8']}
                                </Box>
  
                                <Box className="board-info" aria-label="검색결과">
                                  <Typography className="board-count">
                                    검색결과 
                                    <Typography component="span" className="count">
                                      {totalCount}
                                    </Typography>
                                    건
                                  </Typography>
                                </Box>
                                {
                                  pagedList.map((item: NurswItem, idx: number) => (
                                    <Box key={`tab8-item-${idx}`} className="result-detail-area">
                                      <ul className="result-detail-list">
                                        <li className="result-set-item">
                                          <Box className="detail-card">
                                            {/* 검색한 제품명 */}
                                            {
                                              resultSearchCnd === 'prdctNm' && (
                                                <dl className="detail-item">
                                                  <dt>검색한 제품</dt>
                                                  <dd>
                                                    <Box className="detail-info-row">
                                                      <span className="text">{item.prdctNm}</span>
                                                    </Box>
                                                  </dd>
                                                </dl>
                                              )
                                            }
  
                                            {/* 검색한 성분(성분) */}
                                            <dl className="detail-item">
                                              <dt>{resultSearchCnd === 'igrdNm' ? '검색한 성분' : '성분'}</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  {
                                                    resultSearchCnd === 'igrdNm' ? (
                                                      <>
                                                      <span className="text">{item.igrdNm}</span>
                                                      <Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />} onClick={() => openPrdctDetailPop(item.igrdNm, 'nursw')}>
                                                        제품검색
                                                      </Button>
                                                      </>
                                                    ) : (
                                                      <span className="text">{item.igrdNm}</span>
                                                    )
                                                  }
                                                </Box>
                                              </dd>
                                            </dl>
      
                                            {/* 비고 */}
                                            <dl className="detail-item">
                                              <dt>비고</dt>
                                              <dd>
                                                <Box className="detail-info-row">
                                                  <span className="text">{item.rmrkCn}</span>
                                                </Box>
                                              </dd>
                                            </dl>
  
                                          </Box>
                                        </li>
                                      </ul>
                                    </Box>
                                  ))
                                }
                                {totalCount > TAB_DETAIL_PAGE_SIZE && (
                                  <Stack className="paging-wrap" sx={{ mt: 2 }}>
                                    <Pagination
                                      page={currentPage}
                                      count={totalPages}
                                      onChange={(_: React.ChangeEvent<unknown>, page: number) => handleTabDetailPageChange(tabKey, page)}
                                      showFirstButton
                                      showLastButton
                                    />
                                  </Stack>
                                )}
                              </Box>
                            </Box>
                          );
                        })()}

                      </Box>
                    ))}
                    </> 
                  )}

                  {/* 공공(KOGL) 저작물 */}
                  {menuKoglCprgtTypeCd && (
                    <KoglLicense menuKoglCprgtTypeCd={menuKoglCprgtTypeCd} />
                  )}

                  {/* 만족도 조사 */}
                  {dgstfnExmnYn && (
                    <DgstfnExnm menuSn={menuSn} />
                  )}

                  {/* 업무 담당 부서 및 연락처 */}
                  {deptInfoExpsrYn && (
                    <ContactArea
                      contactDepNm={contactDepNm}
                      contactPersonNm={contactPersonNm}
                      contactPhoneNum={contactPhoneNum}
                    />
                  )}

                </section>
                {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
  );
}
