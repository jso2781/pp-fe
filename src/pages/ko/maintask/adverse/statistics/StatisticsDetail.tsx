/**
 * 화면ID: KIDS-PP-US-AE-02
 * 화면명: 이상사례 통계 상세
 * 화면경로: /adverse/statistics/StatisticsDetail/:id
 * 화면설명: 이상사례 통계 상세 (외부용)
 */
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import LnbSectionTitle from '@/components/common/LnbSectionTitle';
import { selectStatisticsDetail, generateStatistics } from '@/features/adverse/statistics/StatisticsThunks';
import { clearCurrent } from '@/features/adverse/statistics/StatisticsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Box,
  Button,
  Typography
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const formatDate = (ymd: string | null | undefined) => {
  if (!ymd) return '-';
  if (ymd.length === 8) return `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`;
  return ymd.slice(0, 10);
};

const formatDomstForgn = (cd: string | null | undefined) => {
  if (cd === '01') return '국내';
  if (cd === '02') return '국외';
  return '-';
};

const formatStatus = (cd: string | null | undefined) => {
  const code = cd?.trim();
  const labels: Record<string, string> = {
    '01': '미생성',
    '02': '생성 중',
    '03': '생성완료',
    '04': '실패',
    '07': '보유기간만료',
  };
  return labels[code ?? ''] || '-';
};

/** 조건 유형 코드 */
const CND = {
  PRODUCT: '01', INGREDIENT: '02', CLASS_INGREDIENT: '03', CLEANSING_INGREDIENT: '04',
  SOC: '05', PT: '06', LLT: '07',
  BY_PRODUCT: '08', AGE_AT_ONSET: '09', SERIOUS_AE_TYPE: '10',
  REPORTER_TYPE: '11', GENDER: '12',
  REPORT_COUNT: '13', REPORT_DETAIL: '14', ADVERSE_EVENT: '15',
  BY_INGREDIENT: '16',
} as const;

const thStyle: React.CSSProperties = {
  background: '#EEF2F7', fontWeight: 700, textAlign: 'left', padding: '12px 15px',
  verticalAlign: 'middle',
};
const tdStyle: React.CSSProperties = {
  textAlign: 'left', padding: '12px 15px',
};

export default function StatisticsDetail() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, id } = useParams<{ lang: string; id: string }>();
  const currentUrl = location.pathname;
  const { current: rawData } = useAppSelector((s) => s.statistics);
  const data = rawData as any;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) dispatch(selectStatisticsDetail(id));
    return () => { dispatch(clearCurrent()); };
  }, [dispatch, id]);

  // 데이터 fallback: 통계 VO에 없으면 dataset에서 가져오기
  const domstForgnSeCd = data?.dataset?.domstForgnSeCd || data?.domstForgnSeCd;
  const rptDataBgngYmd = data?.rptDataBgngYmd || data?.dataset?.rptDataBgngYmd;
  const rptDataEndYmd = data?.rptDataEndYmd || data?.dataset?.rptDataEndYmd;
  const hldPrdBgngYmd = data?.hldPrdBgngYmd || data?.dataset?.hldPrdBgngYmd;
  const hldPrdEndYmd = data?.hldPrdEndYmd || data?.dataset?.hldPrdEndYmd;

  // conditions 파싱
  const parsed = useMemo(() => {
    const conditions: Array<{ cndTypeSeCd: string; cndLtrVl: string }> = data?.conditions || [];
    const codes = (type: string) => conditions.filter(c => c.cndTypeSeCd?.trim() === type).map(c => c.cndLtrVl);
    const hasType = (type: string) => conditions.some(c => c.cndTypeSeCd?.trim() === type);

    return {
      productCodes: codes(CND.PRODUCT).join(', '),
      ingredientCodes: codes(CND.INGREDIENT).join(', '),
      classIngredientCodes: [...codes(CND.CLASS_INGREDIENT), ...codes(CND.CLEANSING_INGREDIENT)].join(', '),
      meddraSOC: codes(CND.SOC).join(', '),
      meddraPT: codes(CND.PT).join(', '),
      meddraLLT: codes(CND.LLT).join(', '),
      // 집계기준
      aggregateByProduct: hasType(CND.BY_PRODUCT),
      aggregateByIngredient: hasType(CND.BY_INGREDIENT),
      aggregateByAge: hasType(CND.AGE_AT_ONSET),
      aggregateBySeriousType: hasType(CND.SERIOUS_AE_TYPE),
      aggregateByReporterType: hasType(CND.REPORTER_TYPE),
      aggregateByGender: hasType(CND.GENDER),
      // 생성자료
      generateReportCount: hasType(CND.REPORT_COUNT),
      generateReportDetail: hasType(CND.REPORT_DETAIL),
      generateAdverseEvent: hasType(CND.ADVERSE_EVENT),
    };
  }, [data]);

  const aggregateLabels = [
    parsed.aggregateByProduct && '품목별',
    parsed.aggregateByIngredient && '성분별',
    parsed.aggregateByReporterType && '보고자유형별',
    parsed.aggregateByGender && '성별',
    parsed.aggregateByAge && '발현 당시 연령',
    parsed.aggregateBySeriousType && '중대 이상사례 유형별',
  ].filter(Boolean).join(', ');

  const generateLabels = [
    parsed.generateReportCount && '보고건수',
    parsed.generateReportDetail && '보고내역',
    parsed.generateAdverseEvent && '이상사례',
  ].filter(Boolean).join(', ');

  const [regenerating, setRegenerating] = useState(false);

  const handleDownload = () => {
    if (id) {
      window.location.href = `/api/statistics/${id}/download`;
    }
  };

  const handleRegenerate = async () => {
    if (!id) return;
    setRegenerating(true);
    try {
      await dispatch(generateStatistics(id)).unwrap();
      alert('통계 생성이 시작되었습니다.');
      dispatch(selectStatisticsDetail(id));
    } catch (e: any) {
      alert(e || '통계 생성 요청에 실패했습니다.');
    } finally {
      setRegenerating(false);
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
                    <Typography component="h1" className="board-title">{data?.statsNm || '-'}</Typography>
                  </Box>

                  <Box className="board-body-wrap">
                    <Box className="base-table-container" sx={{ m: 0 }}>
                        <table className="base-table table-type-2">
                          <colgroup>
                            <col style={{ width: '15%' }} />
                            <col style={{ width: '35%' }} />
                            <col style={{ width: '15%' }} />
                            <col style={{ width: '35%' }} />
                          </colgroup>
                          <tbody>
                            {/* 기본 정보 */}
                            <tr>
                              <th style={thStyle}>통계명</th>
                              <td style={tdStyle} colSpan={3}>{data?.statsNm || '-'}</td>
                            </tr>
                            <tr>
                              <th style={thStyle}>국내외</th>
                              <td style={tdStyle}>{formatDomstForgn(domstForgnSeCd)}</td>
                              <th style={thStyle}>상태</th>
                              <td style={tdStyle}>{formatStatus(data?.statsSttsCd)}</td>
                            </tr>
                            <tr>
                              <th style={thStyle}>자료기간</th>
                              <td style={tdStyle} colSpan={3}>
                                {formatDate(rptDataBgngYmd)} ~ {formatDate(rptDataEndYmd)}
                              </td>
                            </tr>
                            <tr>
                              <th style={thStyle}>등록일</th>
                              <td style={tdStyle}>{formatDate(data?.regDt)}</td>
                              <th style={thStyle}>보유기간</th>
                              <td style={tdStyle}>
                                {formatDate(hldPrdBgngYmd)} ~ {formatDate(hldPrdEndYmd)}
                              </td>
                            </tr>

                            {/* 의약품 조건 */}
                            <tr>
                              <th style={thStyle} rowSpan={3}>의약품</th>
                              <th style={thStyle}>품목코드</th>
                              <td style={tdStyle} colSpan={2}>{parsed.productCodes || '-'}</td>
                            </tr>
                            <tr>
                              <th style={thStyle}>성분코드</th>
                              <td style={tdStyle} colSpan={2}>{parsed.ingredientCodes || '-'}</td>
                            </tr>
                            <tr>
                              <th style={thStyle}>계통성분코드</th>
                              <td style={tdStyle} colSpan={2}>{parsed.classIngredientCodes || '-'}</td>
                            </tr>

                            {/* 이상사례 조건 */}
                            <tr>
                              <th style={thStyle} rowSpan={3}>이상사례</th>
                              <th style={thStyle}>MedDRA LLT</th>
                              <td style={tdStyle} colSpan={2}>{parsed.meddraLLT || '-'}</td>
                            </tr>
                            <tr>
                              <th style={thStyle}>MedDRA PT</th>
                              <td style={tdStyle} colSpan={2}>{parsed.meddraPT || '-'}</td>
                            </tr>
                            <tr>
                              <th style={thStyle}>MedDRA SOC</th>
                              <td style={tdStyle} colSpan={2}>{parsed.meddraSOC || '-'}</td>
                            </tr>

                            {/* 집계기준 */}
                            <tr>
                              <th style={thStyle}>집계기준</th>
                              <td style={tdStyle} colSpan={3}>{aggregateLabels || '-'}</td>
                            </tr>

                            {/* 생성자료 */}
                            <tr>
                              <th style={thStyle}>생성자료</th>
                              <td style={tdStyle} colSpan={3}>{generateLabels || '-'}</td>
                            </tr>
                          </tbody>
                        </table>
                    </Box>

                    {/* 다운로드 */}
                    {data?.statsSttsCd?.trim() === '03' && (
                      <Box sx={{ py: 2, textAlign: 'center' }}>
                        <Button variant="contained" size="large" onClick={handleDownload}>
                          통계 자료 다운로드
                        </Button>
                      </Box>
                    )}
                    {/* 실패/보유기간만료 시 재생성 */}
                    {(data?.statsSttsCd?.trim() === '04' || data?.statsSttsCd?.trim() === '07') && (
                      <Box sx={{ py: 2, textAlign: 'center' }}>
                        <Button variant="contained" size="large" onClick={handleRegenerate} disabled={regenerating}>
                          {regenerating ? '생성 요청 중...' : '재생성'}
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box className="board-actions">
                  <Button
                    variant="contained"
                    color="dark"
                    size="large"
                    className="btn-list-go"
                    onClick={() => navigate(`/pp/${lang}/adverse/statistics/StatisticsList`)}
                  >
                    목록
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
