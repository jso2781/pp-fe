/**
 * 화면ID: KIDS-PP-US-DI-14
 * 화면명: 내가 먹는 약의 DUR 정보
 * 화면경로: /maintask/dur/MydrugInfo
 * 화면설명: 내가 먹는 약의 DUR 정보
 */
import ContactArea from '@/components/common/ContactArea'
import DepsLocation from '@/components/common/DepsLocation'
import DgstfnExnm from '@/components/common/DgstfnExnm'
import KoglLicense from '@/components/common/KoglLicense'
import Lnb from '@/components/common/Lnb'
import LnbSectionTitle from '@/components/common/LnbSectionTitle'
import { useAuth } from '@/contexts/AuthContext'
import { selectDurMyDrugInfoList, selectDurMyDrugSearchList } from '@/features/dur/DurMyDrugInfoThunks'
import { resetResults } from '@/features/dur/DurMyDrugInfoSlice'
import { DurMyDrugInfoPVO, DurMyDrugSearchRVO } from '@/features/dur/DurMyDrugInfoTypes'
import { AgeItem, ConcItem, CpctItem, DosageItem, EftgrpItem, NurswItem, PrgntItem, SnctzItem } from '@/features/dur/DurSearchRoomTypes'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Switch as BaseSwitch } from '@base-ui/react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Box, Button, Checkbox, FormControl, InputLabel, LinearProgress, MenuItem, Pagination, Select, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

type TabListMap = Record<string, { totalCount: number; list: any[] }>

const TAB_DETAIL_PAGE_SIZE = 10
const TAB_ORDER: string[] = ['TAB1', 'TAB2', 'TAB3', 'TAB4', 'TAB5', 'TAB6', 'TAB7', 'TAB8']

export default function MyDrugInfo() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { lang } = useParams<{ lang: string }>()

  const { searchList, list, searchLoading, resultLoading } = useAppSelector((s) => s.durMyDrugInfo)

  const { getMenuInfo } = useAuth()
  const menuInfo = getMenuInfo(location.pathname)

  const dgstfnExmnYn = menuInfo?.dgstfnExmnYn ?? null
  const deptInfoExpsrYn = menuInfo?.deptInfoExpsrYn ?? null
  const menuKoglCprgtTypeCd = menuInfo?.menuKoglCprgtTypeCd ?? null
  const menuSn = menuInfo?.menuSn ?? null
  const contactDepNm = menuInfo?.menuTkcgDeptNm ?? null
  const contactPersonNm = menuInfo?.menuPicFlnm ?? null
  const contactPhoneNum = menuInfo?.encptPicTelno ?? null

  const currentUrl = location.pathname

  const [basketList, setBasketList] = useState<DurMyDrugSearchRVO[]>([])
  const [searchCnd, setSearchCnd] = useState<'igrdNm' | 'prdctNm'>('prdctNm')
  const [searchWrd, setSearchWrd] = useState<string>('')
  const [isCheck, setIsCheck] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('TAB1')
  const [hasRequestedResult, setHasRequestedResult] = useState(false)
  const [tabDetailPageNum, setTabDetailPageNum] = useState<Record<string, number>>({
    tab1: 1, tab2: 1, tab3: 1, tab4: 1, tab5: 1, tab6: 1, tab7: 1, tab8: 1,
  })

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveCategory(newValue)
  }

  const getDrugId = (drug: DurMyDrugSearchRVO, index?: number) => {
    return drug.itemSeq || drug.ingrCode || drug.stdCd || `${drug.itemName || ''}|${drug.ingrEngName || ''}|${drug.entpName || ''}|${index ?? ''}`
  }

  const handleToggleDrug = (drug: DurMyDrugSearchRVO, index?: number) => {
    const targetId = getDrugId(drug, index)
    const isExist = basketList.find((item) => getDrugId(item) === targetId)
    if (isExist) {
      setBasketList(basketList.filter((item) => getDrugId(item) !== targetId))
      return
    }
    setBasketList([...basketList, drug])
  }

  const handleDelete = (id: string) => {
    setBasketList(basketList.filter((item) => getDrugId(item) !== id))
  }

  const handleSearch = () => {
    const keyword = searchWrd.trim()
    if (!keyword) return
    runSearch(keyword, searchCnd, isCheck)
  }

  const runSearch = (keyword: string, condition: 'igrdNm' | 'prdctNm', checked: boolean) => {
    dispatch(selectDurMyDrugSearchList({
      searchType: condition === 'prdctNm' ? 'item' : 'ingr',
      searchValue: keyword,
      itemYn: condition === 'igrdNm' ? (checked ? 'Y' : 'N') : 'N',
    }))
  }

  const drugData: DurMyDrugSearchRVO[] = useMemo(() => (Array.isArray(searchList) ? searchList : []), [searchList])

  const isItemSearchCase = searchCnd === 'prdctNm'
  const isIngrItemCase = searchCnd === 'igrdNm' && isCheck
  const isIngrOnlyCase = searchCnd === 'igrdNm' && !isCheck

  const getBasketLabel = (item: DurMyDrugSearchRVO) => {
    if (isIngrOnlyCase) {
      return item.ingrEngName || '-'
    }
    return item.itemName || '-'
  }

  useEffect(() => {
    setBasketList([])
  }, [isCheck, searchCnd])

  useEffect(() => {
    const keyword = searchWrd.trim()
    if (!keyword) return
    runSearch(keyword, searchCnd, isCheck)
  }, [searchCnd, isCheck])

  useEffect(() => {
    return () => {
      dispatch(resetResults())
    }
  }, [dispatch])

  const mergedTabs: TabListMap = useMemo(() => {
    const concList: ConcItem[] = []
    const ageList: AgeItem[] = []
    const prgntList: PrgntItem[] = []
    const cpctList: CpctItem[] = []
    const dosageList: DosageItem[] = []
    const eftgrpList: EftgrpItem[] = []
    const snctzList: SnctzItem[] = []
    const nurswList: NurswItem[] = []

    ;(list ?? []).forEach((row: any) => {
      if (!row) return
      if (Array.isArray(row.concList)) concList.push(...row.concList)
      if (Array.isArray(row.ageList)) ageList.push(...row.ageList)
      if (Array.isArray(row.prgntList)) prgntList.push(...row.prgntList)
      if (Array.isArray(row.cpctList)) cpctList.push(...row.cpctList)
      if (Array.isArray(row.dosageList)) dosageList.push(...row.dosageList)
      if (Array.isArray(row.eftgrpList)) eftgrpList.push(...row.eftgrpList)
      if (Array.isArray(row.snctzList)) snctzList.push(...row.snctzList)
      if (Array.isArray(row.nurswList)) nurswList.push(...row.nurswList)
    })

    return {
      tab1: { totalCount: concList.length, list: concList },
      tab2: { totalCount: ageList.length, list: ageList },
      tab3: { totalCount: prgntList.length, list: prgntList },
      tab4: { totalCount: cpctList.length, list: cpctList },
      tab5: { totalCount: dosageList.length, list: dosageList },
      tab6: { totalCount: eftgrpList.length, list: eftgrpList },
      tab7: { totalCount: snctzList.length, list: snctzList },
      tab8: { totalCount: nurswList.length, list: nurswList },
    }
  }, [list])

  useEffect(() => {
    if (!hasRequestedResult) return
    const firstTabWithData = TAB_ORDER.find((tabKey, index) => {
      const mapKey = `tab${index + 1}`
      return (mergedTabs[mapKey]?.totalCount ?? 0) > 0
    })
    setActiveCategory(firstTabWithData ?? 'TAB1')
  }, [hasRequestedResult, mergedTabs])

  const categoryNaming: Record<string, string> = {
    TAB1: `병용금기 (${mergedTabs.tab1.totalCount})`,
    TAB2: `특정연령대 금기 (${mergedTabs.tab2.totalCount})`,
    TAB3: `임부금기 (${mergedTabs.tab3.totalCount})`,
    TAB4: `용량주의 (${mergedTabs.tab4.totalCount})`,
    TAB5: `투여기간주의 (${mergedTabs.tab5.totalCount})`,
    TAB6: `효능군중복주의 (${mergedTabs.tab6.totalCount})`,
    TAB7: `노인주의 (${mergedTabs.tab7.totalCount})`,
    TAB8: `수유부주의 (${mergedTabs.tab8.totalCount})`,
  }

  const getPagedTabList = (tabKey: string) => {
    const { list: tabList, totalCount } = mergedTabs[tabKey] ?? { list: [], totalCount: 0 }
    const currentPage = tabDetailPageNum[tabKey] ?? 1
    const totalPages = Math.max(1, Math.ceil(totalCount / TAB_DETAIL_PAGE_SIZE))
    const start = (currentPage - 1) * TAB_DETAIL_PAGE_SIZE
    const pagedList = tabList.slice(start, start + TAB_DETAIL_PAGE_SIZE)
    return { pagedList, totalCount, totalPages, currentPage }
  }

  const setTabDetailPage = (tabKey: string, page: number) => {
    setTabDetailPageNum((prev) => ({ ...prev, [tabKey]: page }))
  }

  /** 제품검색 클릭 시 DurPrdctDetailPop을 팝업 창으로 열고, igrdNm을 쿼리로 전달 */
  const openPrdctDetailPop = (igrdNm: string, bannTypeCd: string, rlvtAge?: string) => {
    const base = `${window.location.origin}/pp/${lang ?? 'ko'}/maintask/dur/DurPrdctDetailPop`;
    const url = `${base}?igrdNm=${encodeURIComponent(igrdNm)}&bannTypeCd=${encodeURIComponent(bannTypeCd)}${(rlvtAge ? "&rlvtAge="+rlvtAge : "")}`;
    const width = 800;
    const height = 600;
    const left = Math.round((window.screen.width - width) / 1.5);
    const top = Math.round((window.screen.height - height) / 1.5);
    const features = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes,popup=1`;
    window.open(url, 'DurPrdctDetailPop', features);
  };  

  const openEftgrpDetailPop = (igrdNm: string) => {
    const base = `${window.location.origin}/pp/${lang ?? 'ko'}/maintask/dur/DurEftgrpDetailPop`
    const url = `${base}?igrdNm=${encodeURIComponent(igrdNm)}`
    const width = 800
    const height = 600
    const left = Math.round((window.screen.width - width) / 2)
    const top = Math.round((window.screen.height - height) / 2)
    const features = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes,popup=1`
    window.open(url, 'DurEftgrpDetailPop', features)
  }

  const onClickCheckDur = () => {
    if (basketList.length === 0) return

    setTabDetailPageNum({ tab1: 1, tab2: 1, tab3: 1, tab4: 1, tab5: 1, tab6: 1, tab7: 1, tab8: 1 })
    setHasRequestedResult(true)

    let searchParam = basketList.map((item) => ({          
          prdctCd: item.itemName || '',
          igrdCd: item.ingrEngName || '',
        })) as DurMyDrugInfoPVO[]; 

    if (isCheck) {
        searchParam = basketList.map((item) => ({          
          prdctCd: item.itemName || '',
          igrdCd: '',
        })) as DurMyDrugInfoPVO[];       
    }

    dispatch(
      selectDurMyDrugInfoList(searchParam)
    );
  }

  const renderDetailRows = (category: string, item: any) => {
    const baseRows = [
      { label: '제품명', value: item?.prdctNm || '-' },
      { label: '성분', value: item?.igrdNm || '-' },
    ]

    if (category === 'TAB1') {
      return [...baseRows, { label: '병용금기 제품', value: item?.prohibitPrdctNm || '-' }, { label: '병용금기 성분', value: item?.prohibitIgrdNm || '-' }, { label: '상세정보', value: item?.dtlInfoCn || '-' }, { label: '비고', value: item?.rmrkCn || '-' }]
    }
    if (category === 'TAB2') {
      const ageValue = `${item?.rlvtAge ?? ''}${item?.rlvtAgeUnitNm ?? ''} ${item?.agePrcsCndNm ?? ''}`.trim()
      return [...baseRows, { label: '해당 연령', value: ageValue || '-' }, { label: '상세정보', value: item?.dtlInfoCn || '-' }]
    }
    if (category === 'TAB3') {
      return [...baseRows, { label: '금기등급', value: item?.condiGrdCd || '-' }, { label: '상세정보', value: item?.dtlInfoCn || '-' }]
    }
    if (category === 'TAB4') {
      return [...baseRows, { label: '1일 최대용량', value: item?.dayMaxAdminCpct || '-' }, { label: '상세정보', value: item?.dtlInfoCn || '-' }]
    }
    if (category === 'TAB5') {
      return [...baseRows, { label: '최대투여기간', value: item?.maxAdminPrdDayCnt || '-' }, { label: '비고', value: item?.rmrkCn || '-' }]
    }
    if (category === 'TAB6') {
      return [...baseRows, { label: '효능군', value: item?.effGroupNm || '-' }, { label: '계열', value: item?.groupNm || '-' }]
    }

    return [...baseRows, { label: '비고', value: item?.rmrkCn || '-' }]
  }

  const getBannTypeCd = (category: string) => {
    if (category === 'TAB1') return 'conc'
    if (category === 'TAB2') return 'age'
    if (category === 'TAB3') return 'prgnt'
    if (category === 'TAB4') return 'cpct'
    if (category === 'TAB5') return 'dosage'
    if (category === 'TAB6') return 'eftgrp'
    if (category === 'TAB7') return 'snctz'
    return 'nursw'
  }

  const activeTabKey = `tab${Number(activeCategory.replace('TAB', ''))}`
  const activeTotalCount = mergedTabs[activeTabKey]?.totalCount ?? 0

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">
          <Box className="lnb-wrap">
            <Box className="lnb-menu">
              <Typography component="h2" className="lnb-tit">
                <LnbSectionTitle />
              </Typography>
              <Box className="lnb-list">
                <Lnb currentUrl={currentUrl} />
              </Box>
            </Box>
          </Box>

          <Box className="sub-content">
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
                <section className="pageCont-dur-MyDrugInfo">
                  <Box className="info-drug-box">
                    <Box className="drug-title">내가 먹는 약의 DUR 정보를 확인해보세요!</Box>
                    <p className="drug-title--sub">복용 중인 의약품을 입력하면 금기 및 주의 정보를 확인 할 수 있습니다.</p>
                    <ul className="drug-list">
                      <li>DUR정보가 있더라도 의약전문가의 의료적 판단에 따라 처방·조제 될 수 있습니다.</li>
                      <li>본 화면의 검색 정보는 정기적으로 업데이트되나, 실시간 변동되는 의약품 허가 현황과 차이가 있을 수 있습니다. 검색 결과는 참고용으로 활용하시기 바랍니다.</li>
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
                          <p className="step-desc">(제공할 정보가 없거나, 허가가 없는 의약품은 검색 되지 않을 수 있습니다.)</p>
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
                          <p className="step-text">DUR 정보 결과에서 검색한 의약품에 대한 DUR 정보를 확인할 수 있습니다.</p>
                        </div>
                      </li>
                    </ul>
                  </Box>

                  <Box className="drug-dur-process">
                    <Box className="dur-split-layout">
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
                                  value={searchCnd}
                                  onChange={(e) => {
                                    const next = e.target.value as 'igrdNm' | 'prdctNm'
                                    setSearchCnd(next)
                                    if (next === 'prdctNm') setIsCheck(false)
                                  }}
                                >
                                  <MenuItem value="igrdNm">성분명(영)</MenuItem>
                                  <MenuItem value="prdctNm">제품명(한)</MenuItem>
                                </Select>
                              </FormControl>
                              <Box className="search-input-group">
                                <TextField
                                  size="large"
                                  placeholder="검색어를 입력해주세요."
                                  sx={{ flexGrow: 1 }}
                                  value={searchWrd}
                                  onChange={(e) => setSearchWrd(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault()
                                      handleSearch()
                                    }
                                  }}
                                  slotProps={{
                                    htmlInput: { 'aria-label': '검색어 입력' }
                                  }}
                                />
                                <Button
                                  type="button"
                                  variant="contained"
                                  size="large"
                                  className="btn-search"
                                  disabled={(searchWrd ?? '').trim().length < 2  || searchLoading}
                                  onClick={handleSearch}
                                >
                                  {t('search')}
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        </Box>

                        <Box className="search-result-content">
                          {searchLoading && <LinearProgress sx={{ mb: 1 }} />}
                          <Box className="base-table-container">
                            <Box className="base-table-meta">
                              {searchCnd === 'igrdNm' && (
                                <>
                                  <Stack direction="row" alignItems="center" spacing={2} className="switch_group">
                                    <Typography className="switch_title">의약품 바구니 담기 선택</Typography>
                                    <BaseSwitch.Root
                                      id="search-type-switch"
                                      className="base_switch_root"
                                      checked={isCheck}
                                      onCheckedChange={(checked) => setIsCheck(checked)}
                                      aria-label="의약품 바구니 담기 선택 기준"
                                    >
                                      <BaseSwitch.Thumb className="base_switch_thumb" />
                                    </BaseSwitch.Root>
                                    <Typography component="label" htmlFor="search-type-switch" className="switch_label" sx={{ cursor: 'pointer' }}>
                                      {isCheck ? '제품명' : '성분명'}
                                    </Typography>
                                  </Stack>
                                  <p className="helper-text">의약품 바구니 선택 옵션을 변경하시면 의약품 바구니가 초기화됩니다.</p>
                                </>
                              )}
                            </Box>
                            <Box className="table-responsive has-vscroll">
                              <table className="base-table">
                                <caption className="sr-only">내가 먹는 의약품 목록</caption>
                                <colgroup>
                                  {isItemSearchCase && (
                                    <>
                                      <col />
                                      <col style={{ width: '25%' }} />
                                    </>
                                  )}
                                  {isIngrItemCase && (
                                    <>
                                      <col style={{ width: '25%' }} />
                                      <col />
                                      <col style={{ width: '25%' }} />
                                    </>
                                  )}
                                  {isIngrOnlyCase && <col />}
                                  <col style={{ width: '50px' }} />
                                </colgroup>
                                <thead>
                                  <tr>
                                    {isItemSearchCase && (
                                      <>
                                        <th scope="col">제품명</th>
                                        <th scope="col">제약회사</th>
                                      </>
                                    )}
                                    {isIngrItemCase && (
                                      <>
                                        <th scope="col">성분명</th>
                                        <th scope="col">제품명</th>
                                        <th scope="col">제약회사</th>
                                      </>
                                    )}
                                    {isIngrOnlyCase && <th scope="col">성분명</th>}
                                    <th scope="col">선택</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {drugData.length > 0 ? (
                                    drugData.map((drug, index) => (
                                      <tr key={getDrugId(drug, index)}>
                                        {isItemSearchCase && (
                                          <>
                                            <td>{drug.itemName || '-'}</td>
                                            <td>{drug.entpName || '-'}</td>
                                          </>
                                        )}
                                        {isIngrItemCase && (
                                          <>
                                            <td>{drug.ingrEngName || '-'}</td>
                                            <td>{drug.itemName || '-'}</td>
                                            <td>{drug.entpName || '-'}</td>
                                          </>
                                        )}
                                        {isIngrOnlyCase && <td>{drug.ingrEngName || '-'}</td>}
                                        <td>
                                          <Checkbox
                                            className="chk-select"
                                            checked={basketList.some((item) => getDrugId(item) === getDrugId(drug, index))}
                                            onChange={() => handleToggleDrug(drug, index)}
                                            slotProps={{ input: { 'aria-label': `${drug.itemName || drug.ingrEngName || ''} 선택` } }}
                                          />
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan={isIngrOnlyCase ? 2 : 3 + (isIngrItemCase ? 1 : 0)}>
                                        <Box className="no-data">제공할 정보가 없거나, 허가 취하된 의약품은 검색 되지 않을 수 있습니다.</Box>
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </Box>
                          </Box>
                        </Box>
                      </Box>

                      <Box className="basket-section">
                        <Box className="step-title-group">
                          <p className="step-label">2단계<span>의약품 바구니</span></p>
                          <Box className="base-table-meta">
                            <Box className="board-info">
                              <Typography className="board-count">
                                총 <Typography component="span" className="count">{basketList.length}</Typography> 개 선택
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Box className="basket-content">
                          <Box className="base-table-container">
                            <Box className="empty-box"></Box>
                            <Box className="table-responsive has-vscroll">
                              <table className="base-table">
                                <caption className="sr-only">의약품 선택 목록</caption>
                                <colgroup>
                                  <col style={{ width: '40px' }} />
                                  <col style={{ width: isIngrOnlyCase ? 'calc(100% - 90px)' : undefined }} />
                                  <col style={{ width: '25%', display: isIngrOnlyCase ? 'none' : undefined }} />
                                  <col style={{ width: '50px' }} />
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col">NO</th>
                                    <th scope="col">{isIngrOnlyCase ? '성분명' : '제품명'}</th>
                                    {!isIngrOnlyCase && <th scope="col">제약회사</th>}
                                    <th scope="col">삭제</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {basketList.length > 0 ? (
                                    basketList.map((item, index) => (
                                      <tr key={getDrugId(item, index)}>
                                        <td>{index + 1}</td>
                                        <td className="text-left">{getBasketLabel(item)}</td>
                                        {!isIngrOnlyCase && <td>{item.entpName || '-'}</td>}
                                        <td>
                                          <Button
                                            className="btn-delete-circle"
                                            onClick={() => handleDelete(getDrugId(item, index))}
                                            aria-label={`${item.itemName || item.ingrEngName || ''} 삭제`}
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
                                      <td colSpan={isIngrOnlyCase ? 3 : 4}>
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
                      <Button variant="contained" size="large" disabled={basketList.length === 0 || resultLoading} onClick={onClickCheckDur}>
                        DUR 정보 확인하기
                      </Button>
                    </Box>
                  </Box>

                  {hasRequestedResult && (
                    <Box className="dur-result-section">
                      <Box className="step-title-group">

                        {/* ========================================================================= */}
                        <p className="step-label">3단계<span>DUR 정보결과</span></p>

                        <Box className="board-info" aria-label="검색결과">
                          <Typography className="board-count">
                            정보결과 총 <Typography component="span" className="count">{activeTotalCount}</Typography> 개
                          </Typography>
                        </Box>                       
                        {/* ========================================================================= */}

                      </Box>

                      {resultLoading && <LinearProgress sx={{ mb: 2 }} />}

                      <Box className="dur-result-content">
                        <Box className="category-tabs box-variant col-4" role="navigation" aria-label="기본 카테고리 선택">
                          <Tabs value={activeCategory} onChange={handleTabChange} scrollButtons="auto" selectionFollowsFocus>
                            {Object.keys(categoryNaming).map((category) => {
                              const tabKey = `tab${Number(category.replace('TAB', ''))}`
                              const isDisable = (mergedTabs[tabKey]?.totalCount ?? 0) === 0
                              return (
                                <Tab
                                  key={`type1-${category}`}
                                  value={category}
                                  label={categoryNaming[category]}
                                  id={`tab-type1-${category}`}
                                  aria-controls={`tabpanel-type1-${category}`}
                                  disabled={isDisable}
                                />
                              )
                            })}
                          </Tabs>
                        </Box>

                        {Object.keys(categoryNaming).map((category) => {
                          const tabKey = `tab${Number(category.replace('TAB', ''))}`
                          const { pagedList, totalCount, totalPages, currentPage } = getPagedTabList(tabKey)

                          return (
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
                                    {pagedList.length === 0 ? (
                                      <Box className="no-data">조회된 DUR 정보가 없습니다.</Box>
                                    ) : (
                                      pagedList.map((item: any, idx: number) => (
                                        <Box key={`${tabKey}-item-${idx}`} className="result-detail-area">
                                          <ul className="result-detail-list">
                                            <li className="result-set-item">
                                              <Box className="detail-card">
                                                {renderDetailRows(category, item).map((row, rowIdx) => (
                                                  <dl className="detail-item" key={`${tabKey}-row-${idx}-${rowIdx}`}>
                                                    <dt>{row.label}</dt>
                                                    <dd>
                                                      <Box className="detail-info-row">
                                                        <span className="text">{row.value}</span>
                                                        {row.label === '성분' && item?.igrdNm && (activeCategory !== 'TAB1') && (
                                                          <Button
                                                            variant="outlined02"
                                                            size="xsmall"
                                                            className="btn-detail"
                                                            endIcon={<ChevronRightIcon />}
                                                            onClick={() => openPrdctDetailPop(item.igrdNm, getBannTypeCd(category), item.rlvtAge)}
                                                          >
                                                            제품검색
                                                          </Button>
                                                        )}
                                                        {category === 'TAB6' && row.label === '계열' && item?.igrdNm && (
                                                          <Button
                                                            variant="outlined02"
                                                            size="xsmall"
                                                            className="btn-detail"
                                                            endIcon={<ChevronRightIcon />}
                                                            onClick={() => openEftgrpDetailPop(item.igrdNm)}
                                                          >
                                                            중복 상세보기
                                                          </Button>
                                                        )}
                                                      </Box>
                                                    </dd>
                                                  </dl>
                                                ))}
                                              </Box>
                                            </li>
                                          </ul>
                                        </Box>
                                      ))
                                    )}

                                    {totalCount > TAB_DETAIL_PAGE_SIZE && (
                                      <Stack className="paging-wrap" sx={{ mt: 2 }}>
                                        <Pagination
                                          page={currentPage}
                                          count={totalPages}
                                          onChange={(_: React.ChangeEvent<unknown>, page: number) => setTabDetailPage(tabKey, page)}
                                          showFirstButton
                                          showLastButton
                                        />
                                      </Stack>
                                    )}
                                  </Box>
                                </Box>
                              )}
                            </Box>
                          )
                        })}
                      </Box>
                    </Box>
                  )}
                </section>

                {menuKoglCprgtTypeCd && menuKoglCprgtTypeCd.trim() !== '' && <KoglLicense menuKoglCprgtTypeCd={menuKoglCprgtTypeCd} />}
                {dgstfnExmnYn && <DgstfnExnm menuSn={menuSn} />}
                {deptInfoExpsrYn && (
                  <ContactArea
                    contactDepNm={contactDepNm}
                    contactPersonNm={contactPersonNm}
                    contactPhoneNum={contactPhoneNum}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
