/**
 * 화면ID: KIDS-PP-US-AE-03
 * 화면명: 이상사례 통계 생성
 * 화면경로: /adverse/statistics/StatisticsCreate
 * 화면설명: 이상사례 통계 생성 (외부용)
 */
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import LnbSectionTitle from '@/components/common/LnbSectionTitle';
import { saveStatistics, generateStatistics, selectRprsDataset } from '@/features/adverse/statistics/StatisticsThunks';
import { CND_TYPE } from '@/features/adverse/statistics/StatisticsTypes';
import type { DatasetRVO, StatisticsSavePVO } from '@/features/adverse/statistics/StatisticsTypes';
import { useAppDispatch } from '@/store/hooks';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CodeSearchDialog from '@/pages/ko/maintask/adverse/statistics/CodeSearchDialog';
import type { CodeSearchType } from '@/features/adverse/statistics/CodeSearchTypes';

const headerSx = { width: '15%', backgroundColor: '#f5f5f5', fontWeight: 600, fontSize: '0.9rem', py: 1.5 };
const subHeaderSx = { ...headerSx, width: '12%' };
const dataSx = { fontSize: '0.9rem', py: 1.5 };

const formatYmd = (ymd: string | null | undefined) => {
  if (!ymd) return '';
  if (ymd.length === 8) return `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`;
  return ymd;
};

export default function StatisticsCreate() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();
  const currentUrl = location.pathname;

  const [statsNm, setStatsNm] = useState('');
  const [region, setRegion] = useState<'domestic' | 'overseas'>('domestic');
  const [reportStartDate, setReportStartDate] = useState('');
  const [reportEndDate, setReportEndDate] = useState('');

  // 데이터셋
  const [selectedDataset, setSelectedDataset] = useState<DatasetRVO | null>(null);
  const [datasetMessage, setDatasetMessage] = useState('');

  // 의약품
  const [productCodes, setProductCodes] = useState('');
  const [ingredientCodes, setIngredientCodes] = useState('');
  const [classIngredientCodes, setClassIngredientCodes] = useState('');

  // 이상사례
  const [meddraLLT, setMeddraLLT] = useState('');
  const [meddraPT, setMeddraPT] = useState('');
  const [meddraSOC, setMeddraSOC] = useState('');

  // 집계기준
  const [aggProduct, setAggProduct] = useState(false);
  const [aggIngredient, setAggIngredient] = useState(false);
  const [aggReporterType, setAggReporterType] = useState(false);
  const [aggGender, setAggGender] = useState(false);
  const [aggAge, setAggAge] = useState(false);
  const [aggSeriousType, setAggSeriousType] = useState(false);

  // 생성자료
  const [genReportCount, setGenReportCount] = useState(false);
  const [genReportDetail, setGenReportDetail] = useState(false);
  const [genAdverseEvent, setGenAdverseEvent] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [savedId, setSavedId] = useState<number | null>(null);

  // 코드 검색 다이얼로그
  const [codeSearchOpen, setCodeSearchOpen] = useState(false);
  const [codeSearchType, setCodeSearchType] = useState<CodeSearchType>('item');
  const [codeSearchTarget, setCodeSearchTarget] = useState<string>('');

  const isForeign = region === 'overseas';

  // 데이터셋 자료기간 범위
  const datasetPeriod = useMemo(() => {
    if (!selectedDataset) return { min: '', max: '' };
    return {
      min: formatYmd(selectedDataset.rptDataBgngYmd),
      max: formatYmd(selectedDataset.rptDataEndYmd),
    };
  }, [selectedDataset]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 국내외 변경 시 대표 데이터셋 자동 로드
  useEffect(() => {
    const domstForgnSeCd = region === 'domestic' ? '01' : '02';
    dispatch(selectRprsDataset(domstForgnSeCd)).unwrap().then(({ dataset, message }) => {
      if (dataset) {
        setSelectedDataset(dataset);
        setReportStartDate(formatYmd(dataset.rptDataBgngYmd));
        setReportEndDate(formatYmd(dataset.rptDataEndYmd));
        setDatasetMessage('');
      } else {
        setSelectedDataset(null);
        setReportStartDate('');
        setReportEndDate('');
        setDatasetMessage(message);
      }
    }).catch(() => {
      setSelectedDataset(null);
      setReportStartDate('');
      setReportEndDate('');
      setDatasetMessage('대표 데이터셋 조회 중 오류가 발생했습니다.');
    });
  }, [region, dispatch]);

  const openCodeSearch = useCallback((type: CodeSearchType, targetField: string) => {
    setCodeSearchType(type);
    setCodeSearchTarget(targetField);
    setCodeSearchOpen(true);
  }, []);

  const setterMap: Record<string, (v: string) => void> = useMemo(() => ({
    productCodes: setProductCodes,
    ingredientCodes: setIngredientCodes,
    classIngredientCodes: setClassIngredientCodes,
    meddraLLT: setMeddraLLT,
    meddraPT: setMeddraPT,
    meddraSOC: setMeddraSOC,
  }), []);

  const valueMap: Record<string, string> = useMemo(() => ({
    productCodes,
    ingredientCodes,
    classIngredientCodes,
    meddraLLT,
    meddraPT,
    meddraSOC,
  }), [productCodes, ingredientCodes, classIngredientCodes, meddraLLT, meddraPT, meddraSOC]);

  const handleCodeSelect = useCallback((codes: string[]) => {
    const setter = setterMap[codeSearchTarget];
    if (!setter) return;
    const existing = valueMap[codeSearchTarget]
      ?.split(',').map(c => c.trim()).filter(c => c) ?? [];
    const merged = Array.from(new Set([...existing, ...codes]));
    setter(merged.join(', '));
  }, [codeSearchTarget, setterMap, valueMap]);

  const buildSaveData = useCallback((): StatisticsSavePVO => {
    const conditions: Array<{ cndTypeSeCd: string; cndLtrVl: string }> = [];
    const addCodes = (typeCd: string, csv: string) => {
      csv.split(',').map(c => c.trim()).filter(c => c).forEach(code =>
        conditions.push({ cndTypeSeCd: typeCd, cndLtrVl: code })
      );
    };

    if (productCodes) addCodes(CND_TYPE.PRODUCT, productCodes);
    if (ingredientCodes) addCodes(CND_TYPE.INGREDIENT, ingredientCodes);
    if (classIngredientCodes) {
      addCodes(isForeign ? CND_TYPE.CLEANSING_INGREDIENT : CND_TYPE.CLASS_INGREDIENT, classIngredientCodes);
    }
    if (meddraSOC) addCodes(CND_TYPE.SOC, meddraSOC);
    if (meddraPT) addCodes(CND_TYPE.PT, meddraPT);
    if (meddraLLT) addCodes(CND_TYPE.LLT, meddraLLT);

    if (aggProduct) conditions.push({ cndTypeSeCd: CND_TYPE.BY_PRODUCT, cndLtrVl: 'Y' });
    if (aggIngredient) conditions.push({ cndTypeSeCd: CND_TYPE.BY_INGREDIENT, cndLtrVl: 'Y' });
    if (aggAge) conditions.push({ cndTypeSeCd: CND_TYPE.AGE_AT_ONSET, cndLtrVl: 'Y' });
    if (aggSeriousType) conditions.push({ cndTypeSeCd: CND_TYPE.SERIOUS_AE_TYPE, cndLtrVl: 'Y' });
    if (aggReporterType) conditions.push({ cndTypeSeCd: CND_TYPE.REPORTER_TYPE, cndLtrVl: 'Y' });
    if (aggGender) conditions.push({ cndTypeSeCd: CND_TYPE.GENDER, cndLtrVl: 'Y' });

    if (genReportCount) conditions.push({ cndTypeSeCd: CND_TYPE.REPORT_COUNT, cndLtrVl: 'Y' });
    if (genReportDetail) conditions.push({ cndTypeSeCd: CND_TYPE.REPORT_DETAIL, cndLtrVl: 'Y' });
    if (genAdverseEvent) conditions.push({ cndTypeSeCd: CND_TYPE.ADVERSE_EVENT, cndLtrVl: 'Y' });

    const toYmd = (d: string) => d ? d.replace(/-/g, '') : undefined;

    return {
      statsDsetMngSn: savedId ?? undefined,
      statsNm,
      dsetMngSn: selectedDataset?.dsetMngSn,
      rptDataBgngYmd: toYmd(reportStartDate),
      rptDataEndYmd: toYmd(reportEndDate),
      conditions,
    };
  }, [
    statsNm, selectedDataset, reportStartDate, reportEndDate,
    productCodes, ingredientCodes, classIngredientCodes,
    meddraLLT, meddraPT, meddraSOC,
    aggProduct, aggIngredient, aggReporterType, aggGender, aggAge, aggSeriousType,
    genReportCount, genReportDetail, genAdverseEvent,
    isForeign, savedId,
  ]);

  const validate = () => {
    if (!statsNm.trim()) { alert('통계명을 입력해주세요.'); return false; }
    if (!selectedDataset) { alert(datasetMessage || '대표 데이터셋이 지정되지 않았습니다. 관리자에게 문의해주세요.'); return false; }
    if (!aggProduct && !aggIngredient && !aggAge && !aggSeriousType && !aggReporterType && !aggGender) {
      alert('집계기준을 하나 이상 선택해주세요.'); return false;
    }
    if (!genReportCount && !genReportDetail && !genAdverseEvent) {
      alert('생성자료를 하나 이상 선택해주세요.'); return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const result = await dispatch(saveStatistics(buildSaveData())).unwrap();
      if (result.statsDsetMngSn) setSavedId(result.statsDsetMngSn);
      alert('저장되었습니다.');
    } catch (e: any) {
      alert(e || '저장에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGenerate = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const result = await dispatch(saveStatistics(buildSaveData())).unwrap();
      const id = result.statsDsetMngSn || savedId;
      if (!id) { alert('저장된 통계가 없습니다.'); return; }
      setSavedId(id);
      await dispatch(generateStatistics(String(id))).unwrap();
      alert('통계 생성이 시작되었습니다.');
      navigate(`/pp/${lang}/adverse/statistics/StatisticsDetail/${id}`);
    } catch (e: any) {
      alert(e || '통계 생성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">
          <Box className="lnb-wrap">
            <Box className="lnb-menu">
              <Typography component="h2" className="lnb-tit"><LnbSectionTitle /></Typography>
              <Box className="lnb-list"><Lnb currentUrl={currentUrl} /></Box>
            </Box>
          </Box>

          <Box className="sub-content">
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
                <Box component="article" className="board-detail">
                  <Box className="board-header">
                    <Typography component="h1" className="board-title">통계 생성</Typography>
                  </Box>

                  <Box className="board-body-wrap">
                    <TableContainer component={Paper} className="bbs-list" sx={{ mb: 3 }}>
                      <Table aria-label="통계 생성 폼">
                        <TableBody>
                          {/* 통계명 */}
                          <TableRow>
                            <TableCell component="th" sx={headerSx}>
                              통계명 <span style={{ color: 'red' }}>*</span>
                            </TableCell>
                            <TableCell sx={dataSx} colSpan={3}>
                              <TextField fullWidth size="small" placeholder="통계명을 입력하세요"
                                value={statsNm} onChange={(e) => setStatsNm(e.target.value)} />
                            </TableCell>
                          </TableRow>

                          {/* 국내외, 자료기간 */}
                          <TableRow>
                            <TableCell component="th" sx={headerSx}>국내외</TableCell>
                            <TableCell sx={{ ...dataSx, whiteSpace: 'nowrap' }}>
                              <Stack direction="row" spacing={1} sx={{ flexWrap: 'nowrap' }}>
                                <FormControlLabel control={<Radio size="small" checked={region === 'domestic'} onChange={() => setRegion('domestic')} />}
                                  label="국내" sx={{ mr: 0 }} />
                                <FormControlLabel control={<Radio size="small" checked={region === 'overseas'} onChange={() => setRegion('overseas')} />}
                                  label="국외" sx={{ mr: 0 }} />
                              </Stack>
                            </TableCell>
                            <TableCell component="th" sx={headerSx}>자료기간</TableCell>
                            <TableCell sx={dataSx}>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <TextField size="small" type="date" value={reportStartDate}
                                  onChange={(e) => setReportStartDate(e.target.value)}
                                  disabled={!selectedDataset}
                                  slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: datasetPeriod.min, max: reportEndDate || datasetPeriod.max } }}
                                  sx={{ width: 170 }} />
                                <span>~</span>
                                <TextField size="small" type="date" value={reportEndDate}
                                  onChange={(e) => setReportEndDate(e.target.value)}
                                  disabled={!selectedDataset}
                                  slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: reportStartDate || datasetPeriod.min, max: datasetPeriod.max } }}
                                  sx={{ width: 170 }} />
                                {selectedDataset && (
                                  <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                                    (원시자료: {datasetPeriod.min} ~ {datasetPeriod.max})
                                  </Typography>
                                )}
                              </Stack>
                            </TableCell>
                          </TableRow>


                          {/* 의약품 */}
                          <TableRow>
                            <TableCell component="th" sx={headerSx} rowSpan={3}>의약품</TableCell>
                            <TableCell component="th" sx={subHeaderSx}>품목코드</TableCell>
                            <TableCell sx={dataSx} colSpan={2}>
                              <TextField fullWidth size="small"
                                placeholder={isForeign ? 'WHO DRUG 품목코드 (쉼표로 구분)' : '식약처 품목코드 (쉼표로 구분)'}
                                value={productCodes} onChange={(e) => setProductCodes(e.target.value)}
                                InputProps={{ endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton size="small" onClick={() => openCodeSearch('item', 'productCodes')}>
                                      <SearchIcon fontSize="small" />
                                    </IconButton>
                                  </InputAdornment>
                                )}} />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" sx={subHeaderSx}>성분코드</TableCell>
                            <TableCell sx={dataSx} colSpan={2}>
                              <TextField fullWidth size="small"
                                placeholder={isForeign ? 'WHO DRUG 성분코드 (쉼표로 구분)' : '식약처 주원료코드 (쉼표로 구분)'}
                                value={ingredientCodes} onChange={(e) => setIngredientCodes(e.target.value)}
                                InputProps={{ endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton size="small" onClick={() => openCodeSearch('ingredient', 'ingredientCodes')}>
                                      <SearchIcon fontSize="small" />
                                    </IconButton>
                                  </InputAdornment>
                                )}} />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" sx={subHeaderSx}>{isForeign ? '클렌징성분코드' : '계통성분코드'}</TableCell>
                            <TableCell sx={dataSx} colSpan={2}>
                              <TextField fullWidth size="small"
                                placeholder={isForeign ? '클렌징된 WHODRUG 성분코드 (쉼표로 구분)' : '식약처 계통성분코드 (쉼표로 구분)'}
                                value={classIngredientCodes} onChange={(e) => setClassIngredientCodes(e.target.value)}
                                InputProps={{ endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton size="small" onClick={() => openCodeSearch('classIngredient', 'classIngredientCodes')}>
                                      <SearchIcon fontSize="small" />
                                    </IconButton>
                                  </InputAdornment>
                                )}} />
                            </TableCell>
                          </TableRow>

                          {/* 이상사례 */}
                          <TableRow>
                            <TableCell component="th" sx={headerSx} rowSpan={3}>이상사례</TableCell>
                            <TableCell component="th" sx={subHeaderSx}>MedDRA LLT</TableCell>
                            <TableCell sx={dataSx} colSpan={2}>
                              <TextField fullWidth size="small" placeholder="MedDRA LLT 코드 (쉼표로 구분)"
                                value={meddraLLT} onChange={(e) => setMeddraLLT(e.target.value)}
                                InputProps={{ endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton size="small" onClick={() => openCodeSearch('llt', 'meddraLLT')}>
                                      <SearchIcon fontSize="small" />
                                    </IconButton>
                                  </InputAdornment>
                                )}} />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" sx={subHeaderSx}>MedDRA PT</TableCell>
                            <TableCell sx={dataSx} colSpan={2}>
                              <TextField fullWidth size="small" placeholder="MedDRA PT 코드 (쉼표로 구분)"
                                value={meddraPT} onChange={(e) => setMeddraPT(e.target.value)}
                                InputProps={{ endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton size="small" onClick={() => openCodeSearch('pt', 'meddraPT')}>
                                      <SearchIcon fontSize="small" />
                                    </IconButton>
                                  </InputAdornment>
                                )}} />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" sx={subHeaderSx}>MedDRA SOC</TableCell>
                            <TableCell sx={dataSx} colSpan={2}>
                              <TextField fullWidth size="small" placeholder="MedDRA SOC 코드 (쉼표로 구분)"
                                value={meddraSOC} onChange={(e) => setMeddraSOC(e.target.value)}
                                InputProps={{ endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton size="small" onClick={() => openCodeSearch('soc', 'meddraSOC')}>
                                      <SearchIcon fontSize="small" />
                                    </IconButton>
                                  </InputAdornment>
                                )}} />
                            </TableCell>
                          </TableRow>

                          {/* 집계기준 */}
                          <TableRow>
                            <TableCell component="th" sx={headerSx}>
                              집계기준 <span style={{ color: 'red' }}>*</span>
                            </TableCell>
                            <TableCell sx={dataSx} colSpan={3}>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                <FormControlLabel control={<Checkbox size="small" checked={aggProduct} onChange={(e) => setAggProduct(e.target.checked)} />} label="품목별" />
                                <FormControlLabel control={<Checkbox size="small" checked={aggIngredient} onChange={(e) => setAggIngredient(e.target.checked)} />} label="성분별" />
                                <FormControlLabel control={<Checkbox size="small" checked={aggReporterType} onChange={(e) => setAggReporterType(e.target.checked)} />} label="보고자유형별" />
                                <FormControlLabel control={<Checkbox size="small" checked={aggGender} onChange={(e) => setAggGender(e.target.checked)} />} label="성별" />
                                <FormControlLabel control={<Checkbox size="small" checked={aggAge} onChange={(e) => setAggAge(e.target.checked)} />} label="발현 당시 연령" />
                                <FormControlLabel control={<Checkbox size="small" checked={aggSeriousType} onChange={(e) => setAggSeriousType(e.target.checked)} />} label="중대 이상사례 유형별" />
                              </Box>
                            </TableCell>
                          </TableRow>

                          {/* 생성자료 */}
                          <TableRow>
                            <TableCell component="th" sx={headerSx}>
                              생성자료 <span style={{ color: 'red' }}>*</span>
                            </TableCell>
                            <TableCell sx={dataSx} colSpan={3}>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                <FormControlLabel control={<Checkbox size="small" checked={genReportCount} onChange={(e) => setGenReportCount(e.target.checked)} />} label="보고건수" />
                                <FormControlLabel control={<Checkbox size="small" checked={genReportDetail} onChange={(e) => setGenReportDetail(e.target.checked)} />} label="보고내역" />
                                <FormControlLabel control={<Checkbox size="small" checked={genAdverseEvent} onChange={(e) => setGenAdverseEvent(e.target.checked)} />} label="이상사례" />
                              </Box>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>

                {/* 하단 버튼 */}
                <Box className="board-actions">
                  <Button variant="contained" size="large" onClick={handleSave} disabled={submitting}
                    sx={{ mr: 1, height: 64, fontWeight: 700 }}>저장</Button>
                  <Button variant="contained" size="large" onClick={handleGenerate} disabled={submitting}
                    sx={{ mr: 1, height: 64, fontWeight: 700 }}>통계생성</Button>
                  <Button variant="contained" color="dark" size="large" className="btn-list-go"
                    onClick={() => navigate(`/pp/${lang}/adverse/statistics/StatisticsList`)}>목록</Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <CodeSearchDialog
        open={codeSearchOpen}
        onClose={() => setCodeSearchOpen(false)}
        onSelect={handleCodeSelect}
        type={codeSearchType}
        multiSelect={true}
        existingCodes={valueMap[codeSearchTarget]?.split(',').map(c => c.trim()).filter(c => c) ?? []}
      />
    </Box>
  );
}
