/**
 * CDM Q&A 등록/수정
 */
import { useEffect, useRef, useState } from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import type { BoardType } from '@/api/cdm/boardConfig';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getQnaDetail, insertQna, updateQna } from '@/features/cdm/qna/QnaCdmThunks';

const BOARD_BBS_ID: Partial<Record<BoardType, string>> = {
  qna: 'BBS0000001',
  researchProject: 'BBS0000002',
};

interface FileInputRow {
  id: number;
  file: File | null;
}

interface ExistingFile {
  atchFileId: string;
  fileNm: string;
  fileExtnNm: string;
  fileSz: number;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getFileExtension(fileName: string): string {
  const lastDot = fileName.lastIndexOf('.');
  return lastDot === -1 ? '' : fileName.substring(lastDot + 1).toUpperCase();
}

export default function QnaWrite() {
  const navigate = useNavigate();
  const location = useLocation();
  const { qstnSn, lang, boardType } = useParams<{ qstnSn: string; lang: string; boardType: BoardType }>();
  const bbsId = boardType ? BOARD_BBS_ID[boardType] : BOARD_BBS_ID['qna'];

  const isEditMode = !!qstnSn;
  const currentUrl = location.pathname;
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((s) => s.auth.userInfo);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [existingFiles, setExistingFiles] = useState<ExistingFile[]>([]);
  const [deleteFileIds, setDeleteFileIds] = useState<string[]>([]);
  const [fileRows, setFileRows] = useState<FileInputRow[]>([{ id: 0, file: null }]);
  const [rowIdCounter, setRowIdCounter] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  // 스크롤 상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 수정 모드: 기존 데이터 로드
  useEffect(() => {
    if (!isEditMode || !qstnSn) return;
    setLoading(true);
    dispatch(getQnaDetail({ qstnSn, bbsId }))
      .unwrap()
      .then((data) => {
        if (!data) return;
        setTitle(data.pstTtl || '');
        setContent(data.pstCn || '');

        if (data.fileList && data.fileList.length > 0) {
          setExistingFiles(data.fileList);
        }
      })
      .catch(() => alert('데이터를 불러오는 중 오류가 발생했습니다.'))
      .finally(() => setLoading(false));
  }, [qstnSn, isEditMode, bbsId]);

  const handleAddFileRow = () => {
    setFileRows((prev) => [...prev, { id: rowIdCounter, file: null }]);
    setRowIdCounter((prev) => prev + 1);
  };

  const handleFileSelect = (rowId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFileRows((prev) => prev.map((row) => (row.id === rowId ? { ...row, file: selectedFile } : row)));
  };

  const handleFileClear = (rowId: number) => {
    setFileRows((prev) => prev.map((r) => (r.id === rowId ? { ...r, file: null } : r)));
    if (fileInputRefs.current[rowId]) fileInputRefs.current[rowId].value = '';
  };

  const handleFileRowDelete = (rowId: number) => {
    setFileRows((prev) => prev.filter((r) => r.id !== rowId));
  };

  const handleExistingFileDelete = (atchFileId: string) => {
    setExistingFiles((prev) => prev.filter((f) => f.atchFileId !== atchFileId));
    setDeleteFileIds((prev) => [...prev, atchFileId]);
  };

  const handleSave = async () => {
    if (!userInfo?.mbrNo) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('pstTtl', title);
      formData.append('pstCn', content);
      formData.append('bbsId', bbsId ?? '');
      formData.append('rgtrId', userInfo?.mbrNo ?? '');
      formData.append('mdfrId', userInfo?.mbrNo ?? '');
      if (isEditMode && qstnSn) formData.append('qstnSn', qstnSn);
      fileRows.forEach((row) => { if (row.file) formData.append('files', row.file, row.file.name); });
      deleteFileIds.forEach((id) => formData.append('deleteFileIds', id));

      if (isEditMode) {
        await dispatch(updateQna(formData)).unwrap();
        alert('수정되었습니다.');
        navigate(`/pp/${lang}/cdm/qna/member/qnaDetail/${qstnSn}`);
      } else {
        await dispatch(insertQna(formData)).unwrap();
        alert('등록되었습니다.');
        navigate(`/pp/${lang}/cdm/qna`);
      }
    } catch {
      alert(isEditMode ? '수정 중 오류가 발생했습니다.' : '등록 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const actionLabel = isEditMode ? '수정' : '저장';
  const buttonLabel = saving ? `${actionLabel} 중...` : actionLabel;

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

                {loading ? (
                  <Typography sx={{ py: 6, textAlign: 'center', color: 'text.secondary' }}>로딩 중...</Typography>
                ) : (
                  <>
                    {/* 안내문 */}
                    <Box sx={{ mb: 3, p: 2, bgcolor: 'warning.50', border: '1px solid', borderColor: 'warning.200', borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, textAlign: 'center' }}>
                        개인정보 유출, 타인에 대한 비방과 허위 사실 적시, 욕설 등의 게시물은 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」에 의거 처벌을 받을 수 있습니다.
                      </Typography>
                    </Box>

                    {/* 입력 폼 */}
                    <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', mt: 2 }}>
                      <Box component="tbody">

                        {/* 제목 */}
                        <Box component="tr" sx={{ borderTop: '2px solid #aaa', borderBottom: '1px solid #ddd' }}>
                          <Box component="th" sx={{ width: 120, bgcolor: 'grey.50', p: 2, textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem', verticalAlign: 'middle' }}>
                            제목 <span style={{ color: 'red' }}>*</span>
                          </Box>
                          <Box component="td" sx={{ p: 2 }}>
                            <input
                              type="text"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              placeholder="제목을 입력하세요."
                              maxLength={100}
                              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, fontSize: '0.9rem', boxSizing: 'border-box' }}
                            />
                          </Box>
                        </Box>

                        {/* 질문내용 */}
                        <Box component="tr" sx={{ borderBottom: '1px solid #ddd' }}>
                          <Box component="th" sx={{ width: 120, bgcolor: 'grey.50', p: 2, textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem', verticalAlign: 'top', pt: 2.5 }}>
                            질문내용
                          </Box>
                          <Box component="td" sx={{ p: 2 }}>
                            <textarea
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                              placeholder="내용을 입력해주세요."
                              rows={6}
                              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, fontSize: '0.9rem', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }}
                            />
                          </Box>
                        </Box>

                        {/* 첨부파일 */}
                        <Box component="tr" sx={{ borderBottom: '1px solid #ddd' }}>
                          <Box component="th" sx={{ width: 120, bgcolor: 'grey.50', p: 2, textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem', verticalAlign: 'top', pt: 2.5 }}>
                            첨부파일
                          </Box>
                          <Box component="td" sx={{ p: 2 }}>
                            {/* 기존 파일 */}
                            {existingFiles.length > 0 && (
                              <Box sx={{ mb: 2 }}>
                                {existingFiles.map((file) => (
                                  <Box key={file.atchFileId} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                    <Link href={`/api/community/file/download/${file.atchFileId}`} underline="hover" sx={{ fontSize: '0.875rem' }}>
                                      {file.fileNm} [{file.fileExtnNm}] {Math.round(file.fileSz / 1024)} KB
                                    </Link>
                                    <Button size="small" color="error" variant="text" onClick={() => handleExistingFileDelete(file.atchFileId)}>삭제</Button>
                                  </Box>
                                ))}
                              </Box>
                            )}

                            {/* 파일 추가 버튼 */}
                            <Box sx={{ mb: 1.5 }}>
                              <Button variant="outlined" size="small" onClick={handleAddFileRow}>파일 추가</Button>
                            </Box>

                            {/* 파일 행 */}
                            {fileRows.map((row, index) => (
                              <Box key={row.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1, border: '1px solid #ccc', borderRadius: 1, px: 1.5, py: 0.75, minHeight: 38 }}>
                                  <label htmlFor={`file-input-${row.id}`} style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, cursor: 'pointer' }}>
                                    <input
                                      id={`file-input-${row.id}`}
                                      type="file"
                                      ref={(el) => { fileInputRefs.current[row.id] = el; }}
                                      onChange={(e) => handleFileSelect(row.id, e)}
                                      style={{ display: 'none' }}
                                    />
                                    <span style={{ border: '1px solid #ccc', borderRadius: 3, padding: '2px 10px', fontSize: 13, background: '#f9fafb', whiteSpace: 'nowrap' }}>파일 선택</span>
                                    {row.file && <span style={{ fontSize: 13, color: '#111' }}>{row.file.name} ({formatFileSize(row.file.size)})</span>}
                                  </label>
                                  {row.file && (
                                    <button type="button" onClick={() => handleFileClear(row.id)} style={{ background: '#e5e7eb', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 12, color: '#555' }}>✕</button>
                                  )}
                                </Box>
                                {index > 0 && (
                                  <Button size="small" color="error" variant="outlined" onClick={() => handleFileRowDelete(row.id)}>삭제</Button>
                                )}
                              </Box>
                            ))}
                          </Box>
                        </Box>

                      </Box>
                    </Box>

                    {/* 하단 버튼 */}
                    <Box className="board-actions" sx={{ mt: 3 }}>
                      <Button variant="contained" size="large" onClick={handleSave} disabled={saving} sx={{ mr: 1, minWidth: 80, height: 48 }}>
                        {buttonLabel}
                      </Button>
                      <Button
                        variant="contained"
                        color="dark"
                        size="large"
                        disabled={saving}
                        onClick={() => navigate(`/pp/${lang}/cdm/qna`)}
                        sx={{ minWidth: 80, height: 48 }}
                      >
                        취소
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
