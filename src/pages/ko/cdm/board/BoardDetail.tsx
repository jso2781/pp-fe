/**
 * CDM 게시판 상세
 */
import { useEffect } from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import { BOARD_CONFIG, type BoardType } from '@/api/cdm/boardConfig';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getBoardDetail, increaseBoardViewCount } from '@/features/cdm/board/BoardCdmThunks';

export default function BoardDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const { boardType, pstSn, lang } = useParams<{ boardType: string; pstSn: string; lang: string }>();

  const config = BOARD_CONFIG[boardType as BoardType];

  const dispatch = useAppDispatch();
  const { detail: boardData, loading } = useAppSelector((s) => s.cdmBoard);

  // Lnb 랜더링용
  const currentUrl = location.pathname;

  // 스크롤 상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 상세 조회
  useEffect(() => {
    if (!boardType || !pstSn) return;
    dispatch(getBoardDetail({ bbsId: config?.bbsId || boardType || "", pstSn }));
  }, [boardType, pstSn]);

  // 조회수 증가 (세션 중복 방지)
  useEffect(() => {
    if (!pstSn || !boardType) return;
    const mbrId = localStorage.getItem('mbrId') ?? 'GUEST';
    const viewKey = `BOARD_VIEW_${boardType}_${pstSn}_${mbrId}`;
    if (!sessionStorage.getItem(viewKey)) {
      dispatch(increaseBoardViewCount({ pstSn }));
      sessionStorage.setItem(viewKey, 'Y');
    }
  }, [boardType, pstSn]);

  const html = boardData?.pstCn || '';
  const isHtml = typeof html === 'string' && /<\/?[a-z][\s\S]*>/i.test(html);
  const fileList = boardData?.fileList ?? [];

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">

          {/* Lnb 영역 */}
          <Box className="lnb-wrap">
            <Box className="lnb-menu">
              <Typography component="h2" className="lnb-tit">
                <span>{t('menuCdm')}</span>
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

                {!loading && !boardData && (
                  <Typography sx={{ py: 6, textAlign: 'center', color: 'text.secondary' }}>
                    게시물을 찾을 수 없습니다.
                  </Typography>
                )}

                {!loading && boardData && (
                  <>
                    <Box component="article" className="board-detail">
                      {/* 제목 + 정보 */}
                      <Box className="board-header">
                        <Typography component="h1" className="board-title">
                          {boardData.pstTtl || '-'}
                        </Typography>

                        <Box className="board-info">
                          <ul className="info-list">
                            <li>
                              <span className="info-label">{t('writer')}</span>
                              <span className="info-value">{boardData.wrtrDeptNm || boardData.rgtrId || '-'}</span>
                            </li>
                            <li>
                              <span className="info-label">{t('date')}</span>
                              <span className="info-value">{boardData.regDt || '-'}</span>
                            </li>
                            <li>
                              <span className="info-label">{t('views')}</span>
                              <span className="info-value">{boardData.pstInqCnt ?? '-'}</span>
                            </li>
                          </ul>
                        </Box>
                      </Box>

                      <Box className="board-body-wrap">
                        {/* 게시글 본문 */}
                        <Box className="board-content">
                          {isHtml ? (
                            <div
                              className="content-inner html-render"
                              dangerouslySetInnerHTML={{ __html: html }}
                            />
                          ) : (
                            <Typography className="content-inner text-render">
                              {String(html || '')}
                            </Typography>
                          )}
                        </Box>

                        {/* 첨부파일 */}
                        {fileList.length > 0 && (
                          <Box className="board-attachment">
                            <ul className="attachment-list">
                              {fileList.map((file, index) => (
                                <li key={file.atchFileId ?? index}>
                                  <Link
                                    href={`${import.meta.env.VITE_CDM_API_BASE_URL ?? '/api/cm'}/common/file/download/${file.atchFileId}`}
                                    className="attachment-item"
                                    underline="none"
                                    title="첨부파일 다운로드"
                                    target="_blank"
                                    rel="noopener noreferrer"
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

                    {/* 하단 버튼 */}
                    <Box className="board-actions">
                      <Button
                        variant="contained"
                        color="dark"
                        size="large"
                        className="btn-list-go"
                        onClick={() => navigate(`/pp/${lang}/cdm/board/${boardType}`)}
                      >
                        {t('목록')}
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
