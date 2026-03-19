/**
 * CDM 과제제안 상세
 */
import { useEffect, useState } from 'react';

const CDM_BASE_URL = import.meta.env.VITE_CDM_API_BASE_URL ?? 'http://localhost:8081';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import type { AsmtPrpItem } from '@/api/cdm/communityInterface.ts';
import {
  fetchAsmtPrpDetail,
  fetchAsmtPrpAnswer,
  deleteAsmtPrp,
  increaseAsmtPrpViewCount,
} from '@/api/cdm/communityApi';
import { useAppSelector } from '@/store/hooks';

function formatDate(value: string): string {
  if (!value) return '-';
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function TaskproposalDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { asmtPrpSn, lang } = useParams<{ asmtPrpSn: string; lang: string }>();

  const currentUrl = location.pathname;
  const userInfo = useAppSelector((s) => s.auth.userInfo) ?? { mbrId: 'admin' } as any; // 🚧 임시 - 원복 시 ?? { mbrId: 'admin' } as any 제거

  const [proposalData, setProposalData] = useState<AsmtPrpItem | null>(null);
  const [answerData, setAnswerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // 스크롤 상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 상세 + 답변 조회
  useEffect(() => {
    if (!asmtPrpSn) return;
    setLoading(true);
    Promise.all([
      fetchAsmtPrpDetail(asmtPrpSn),
      fetchAsmtPrpAnswer(asmtPrpSn).catch(() => null),
    ]).then(([detail, answer]) => {
      setProposalData(detail ?? null);
      const ans = Array.isArray(answer) ? answer[0] ?? null : answer ?? null;
      setAnswerData(ans);
    }).finally(() => setLoading(false));
  }, [asmtPrpSn]);

  // 조회수 증가 (세션 1회)
  useEffect(() => {
    if (!asmtPrpSn) return;
    const viewKey = `ASMT_PRP_VIEW_${asmtPrpSn}`;
    if (sessionStorage.getItem(viewKey)) return;
    increaseAsmtPrpViewCount(asmtPrpSn)
      .then(() => sessionStorage.setItem(viewKey, 'Y'))
      .catch(() => {});
  }, [asmtPrpSn]);

  const isAuthor = !!userInfo?.mbrId; // 🚧 임시 - 원복 시 이 줄을 아래 줄로 교체
  // const isAuthor = !!userInfo?.mbrId && !!proposalData?.rgtrId && userInfo.mbrId === proposalData.rgtrId;

  const handleDelete = async () => {
    if (!window.confirm('이 제안을 삭제하시겠습니까?')) return;
    setDeleting(true);
    try {
      await deleteAsmtPrp({
        asmtPrpSn: asmtPrpSn!,
        ...(answerData?.ansSn ? { ansSn: answerData.ansSn } : {}),
      });
      alert('삭제되었습니다.');
      navigate(`/pp/${lang}/cdm/taskproposal`);
    } catch {
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setDeleting(false);
    }
  };

  const fileList = proposalData?.fileList ?? [];
  const ansFileList = answerData?.fileList ?? [];

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">

          {/* Lnb 영역 */}
          <Box className="lnb-wrap">
            <Box className="lnb-menu">
              <Typography component="h2" className="lnb-tit">
                <span>CDM</span>
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

                {loading && (
                  <Typography sx={{ py: 6, textAlign: 'center', color: 'text.secondary' }}>
                    로딩 중...
                  </Typography>
                )}

                {!loading && !proposalData && (
                  <Typography sx={{ py: 6, textAlign: 'center', color: 'text.secondary' }}>
                    게시물을 찾을 수 없습니다.
                  </Typography>
                )}

                {!loading && proposalData && (
                  <>
                    {/* ===== 제안 상세 ===== */}
                    <Box component="article" className="board-detail">
                      <Box className="board-header">
                        <Typography component="h1" className="board-title">
                          {proposalData.tpcTtlNm || '-'}
                        </Typography>
                        <Box className="board-info">
                          <ul className="info-list">
                            <li>
                              <span className="info-label">제안자</span>
                              <span className="info-value">{proposalData.asmtPrpsrNm || proposalData.rgtrId || '-'}</span>
                            </li>
                            <li>
                              <span className="info-label">등록일</span>
                              <span className="info-value">{proposalData.regDt || '-'}</span>
                            </li>
                            <li>
                              <span className="info-label">조회수</span>
                              <span className="info-value">{proposalData.pstInqCnt ?? 0}</span>
                            </li>
                          </ul>
                        </Box>
                      </Box>

                      <Box
                        className="board-body-wrap"
                        sx={{ mt: 2 }}
                      >
                        {(
                          [
                            { label: '제안내용', value: proposalData.asmtPrpCn },
                            { label: '기대효과', value: proposalData.asmtExptEfctCn },
                            { label: '기타설명', value: proposalData.asmtEtcExplnCn },
                            { label: '주의할점', value: proposalData.asmtCutnMttrCn },
                          ] as { label: string; value: string | null | undefined }[]
                        ).map(({ label, value }, i) => (
                          <Stack
                            key={label}
                            direction="row"
                            sx={{
                              borderTop: i === 0 ? '2px solid #aaa' : '1px solid #ddd',
                              minHeight: 120,
                            }}
                          >
                            <Box
                              sx={{
                                width: 120,
                                flexShrink: 0,
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                pt: 2,
                                px: 1,
                                bgcolor: 'grey.50',
                              }}
                            >
                              <Typography sx={{ fontWeight: 'bold' }}>
                                {label}
                              </Typography>
                            </Box>
                            <Box sx={{ flex: 1, p: 2 }}>
                              <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                {value || '-'}
                              </Typography>
                            </Box>
                          </Stack>
                        ))}

                        {/* 첨부파일 */}
                        {fileList.length > 0 && (
                          <Box className="board-attachment">
                            <ul className="attachment-list">
                              {fileList.map((file: any, index: number) => (
                                <li key={file.atchFileId ?? index}>
                                  <Link
                                    href={`${CDM_BASE_URL}/api/common/file/download/${file.atchFileId}`}
                                    className="attachment-item"
                                    underline="none"
                                    title="첨부파일 다운로드"
                                  >
                                    <Box className="file-info">
                                      <span className="file-label">
                                        {fileList.length === 1 ? '첨부파일' : `첨부파일${index + 1}`}
                                      </span>
                                      <span className="file-name">{file.fileNm}</span>
                                      <span className="file-meta">
                                        <span className="file-ext">[{file.fileExtnNm}]</span>
                                        <span className="file-size">{Math.round(file.fileSz / 1024)} KB</span>
                                      </span>
                                    </Box>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </Box>
                        )}
                      </Box>
                    </Box>

                    {/* ===== 답변 ===== */}
                    {answerData?.ansSn && (
                      <Box component="article" className="board-detail" sx={{ mt: 4 }}>
                        <Box className="board-header">
                          <Typography component="h2" className="board-title">
                            답변
                          </Typography>
                          <Box className="board-info">
                            <ul className="info-list">
                              <li>
                                <span className="info-label">답변자</span>
                                <span className="info-value">{answerData.ansrNm || answerData.rgtrId || '-'}</span>
                              </li>
                              <li>
                                <span className="info-label">등록일</span>
                                <span className="info-value">{formatDate(answerData.regDt)}</span>
                              </li>
                            </ul>
                          </Box>
                        </Box>

                        <Box className="board-body-wrap">
                          <Box className="board-content">
                            <Box
                              sx={{ minHeight: 100 }}
                              dangerouslySetInnerHTML={{ __html: answerData.ansCn || '등록된 답변이 없습니다.' }}
                            />
                          </Box>

                          {ansFileList.length > 0 && (
                            <Box className="board-attachment">
                              <ul className="attachment-list">
                                {ansFileList.map((file: any, index: number) => (
                                  <li key={file.atchFileId ?? index}>
                                    <Link
                                      href={`${CDM_BASE_URL}/api/common/file/download/${file.atchFileId}`}
                                      className="attachment-item"
                                      underline="none"
                                      title="첨부파일 다운로드"
                                    >
                                      <Box className="file-info">
                                        <span className="file-label">
                                          {ansFileList.length === 1 ? '첨부파일' : `첨부파일${index + 1}`}
                                        </span>
                                        <span className="file-name">{file.fileNm}</span>
                                        <span className="file-meta">
                                          <span className="file-ext">[{file.fileExtnNm}]</span>
                                          <span className="file-size">{Math.round(file.fileSz / 1024)} KB</span>
                                        </span>
                                      </Box>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    )}

                    {/* ===== 하단 버튼 ===== */}
                    <Box className="board-actions">
                      {!answerData?.ansSn && isAuthor && (
                        <Button
                          variant="contained"
                          size="large"
                          sx={{ minWidth: 80, height: 48, mr: 1 }}
                          onClick={() => navigate(`/pp/${lang}/cdm/taskproposal/member/taskproposalWrite/${asmtPrpSn}`)}
                        >
                          제안수정
                        </Button>
                      )}
                      {!answerData?.ansSn && isAuthor && (
                        <Button
                          variant="contained"
                          color="error"
                          size="large"
                          sx={{ minWidth: 80, height: 48, mr: 1 }}
                          disabled={deleting}
                          onClick={handleDelete}
                        >
                          제안삭제
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="dark"
                        size="large"
                        sx={{ minWidth: 80, height: 48 }}
                        onClick={() => navigate(`/pp/${lang}/cdm/taskproposal`)}
                      >
                        목록
                      </Button>
                    </Box>
                  </>
                )}

              {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
