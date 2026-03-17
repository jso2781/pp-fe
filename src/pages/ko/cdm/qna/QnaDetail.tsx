/**
 * CDM Q&A 상세
 */
import { useEffect, useState } from 'react';

const CDM_BASE_URL = import.meta.env.VITE_CDM_API_BASE_URL ?? 'http://localhost:8081';
import { Box, Button, Link, Typography } from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import type { QnaItem } from '@/api/cdm/communityInterface.ts';
import {
  fetchQnaDetail,
  fetchQnaAnswer,
  deleteQna,
  increaseQnaViewCount,
} from '@/api/cdm/communityApi';
import { type BoardType } from '@/api/cdm/boardConfig';
import { useAppSelector } from '@/store/hooks';

const BOARD_BBS_ID: Partial<Record<BoardType, string>> = {
  qna: 'BBS0000001',
  researchProject: 'BBS0000002',
};

function formatDate(value: string): string {
  if (!value) return '-';
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function QnaDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { qstnSn, lang } = useParams<{ qstnSn: string; lang: string }>();

  const bbsId = BOARD_BBS_ID['qna'];
  const currentUrl = location.pathname;
  const userInfo = useAppSelector((s) => s.auth.userInfo) ?? { mbrId: 'admin' } as any; // 🚧 임시 - 원복 시 ?? { mbrId: 'admin' } as any 제거

  const [qnaData, setQnaData] = useState<QnaItem | null>(null);
  const [ansData, setAnsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // 스크롤 상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 상세 조회
  useEffect(() => {
    if (!qstnSn) return;
    setLoading(true);
    Promise.all([
      fetchQnaDetail(qstnSn, bbsId),
      fetchQnaAnswer(qstnSn).catch(() => null),
    ]).then(([detail, answer]) => {
      setQnaData(detail ?? null);
      setAnsData(answer ?? null);
    }).finally(() => setLoading(false));
  }, [qstnSn]);

  // 조회수 증가 (세션 1회)
  useEffect(() => {
    if (!qstnSn) return;
    const viewKey = `QNA_VIEWED_${qstnSn}`;
    if (sessionStorage.getItem(viewKey)) return;
    increaseQnaViewCount(qstnSn)
      .then(() => sessionStorage.setItem(viewKey, 'Y'))
      .catch(() => {});
  }, [qstnSn]);

  const isAuthor = !!userInfo?.mbrId; // 🚧 임시 - 원복 시 이 줄을 아래 줄로 교체
  // const isAuthor = !!userInfo?.mbrId && !!qnaData?.rgtrId && userInfo.mbrId === qnaData.rgtrId;

  const handleDelete = async () => {
    if (!window.confirm('질문을 삭제하시겠습니까?')) return;
    setDeleting(true);
    try {
      await deleteQna({ ansSn: ansData?.ansSn, qstnSn: qstnSn! });
      alert('삭제되었습니다.');
      navigate(`/pp/${lang}/cdm/qna`);
    } catch {
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setDeleting(false);
    }
  };

  const qnaContent = qnaData?.pstCn || '';
  const isHtml = typeof qnaContent === 'string' && /<\/?[a-z][\s\S]*>/i.test(qnaContent);
  const qnaFileList = qnaData?.fileList ?? [];
  const ansFileList = ansData?.fileList ?? [];

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

                {!loading && !qnaData && (
                  <Typography sx={{ py: 6, textAlign: 'center', color: 'text.secondary' }}>
                    게시물을 찾을 수 없습니다.
                  </Typography>
                )}

                {!loading && qnaData && (
                  <>
                    {/* ===== 질문 ===== */}
                    <Box component="article" className="board-detail">
                      <Box className="board-header">
                        <Typography component="h1" className="board-title">
                          {qnaData.pstTtl || '-'}
                        </Typography>
                        <Box className="board-info">
                          <ul className="info-list">
                            <li>
                              <span className="info-label">질문자</span>
                              <span className="info-value">{qnaData.qstnrNm || qnaData.rgtrId || '-'}</span>
                            </li>
                            <li>
                              <span className="info-label">등록일</span>
                              <span className="info-value">{qnaData.regDt || '-'}</span>
                            </li>
                            <li>
                              <span className="info-label">조회수</span>
                              <span className="info-value">{qnaData.pstInqCnt ?? 0}</span>
                            </li>
                          </ul>
                        </Box>
                      </Box>

                      <Box className="board-body-wrap">
                        <Box className="board-content">
                          {isHtml ? (
                            <div
                              className="content-inner html-render"
                              dangerouslySetInnerHTML={{ __html: qnaContent }}
                            />
                          ) : (
                            <Typography className="content-inner text-render" sx={{ whiteSpace: 'pre-line' }}>
                              {qnaContent}
                            </Typography>
                          )}
                        </Box>

                        {qnaFileList.length > 0 && (
                          <Box className="board-attachment">
                            <ul className="attachment-list">
                              {qnaFileList.map((file: any, index: number) => (
                                <li key={file.atchFileId ?? index}>
                                  <Link
                                    href={`${CDM_BASE_URL}/api/common/file/download/${file.atchFileId}`}
                                    className="attachment-item"
                                    underline="none"
                                    title="첨부파일 다운로드"
                                  >
                                    <Box className="file-info">
                                      <span className="file-label">
                                        {qnaFileList.length === 1 ? '첨부파일' : `첨부파일${index + 1}`}
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
                    {ansData && (
                      <Box component="article" className="board-detail" sx={{ mt: 4 }}>
                        <Box className="board-header">
                          <Typography component="h2" className="board-title">
                            답변
                          </Typography>
                          <Box className="board-info">
                            <ul className="info-list">
                              <li>
                                <span className="info-label">답변자</span>
                                <span className="info-value">{ansData.ansrNm || '-'}</span>
                              </li>
                              <li>
                                <span className="info-label">등록일</span>
                                <span className="info-value">{formatDate(ansData.regDt)}</span>
                              </li>
                            </ul>
                          </Box>
                        </Box>

                        <Box className="board-body-wrap">
                          <Box className="board-content">
                            <Typography className="content-inner text-render" sx={{ whiteSpace: 'pre-line', minHeight: 100 }}>
                              {ansData.ansCn}
                            </Typography>
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
                      {!ansData && isAuthor && (
                        <Button
                          variant="contained"
                          size="large"
                          sx={{ minWidth: 80, height: 48, mr: 1 }}
                          onClick={() => navigate(`/pp/${lang}/cdm/qna/member/qnaWrite/${qstnSn}`)}
                        >
                          수정
                        </Button>
                      )}
                      {!ansData && isAuthor && (
                        <Button
                          variant="contained"
                          color="error"
                          size="large"
                          sx={{ minWidth: 80, height: 48, mr: 1 }}
                          disabled={deleting}
                          onClick={handleDelete}
                        >
                          삭제
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="dark"
                        size="large"
                        sx={{ minWidth: 80, height: 48 }}
                        onClick={() => navigate(`/pp/${lang}/cdm/qna`)}
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
