import { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { IconButton, Box, Stack, FormControl, InputLabel, Select, MenuItem, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Pagination, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DepsLocation from '@/components/common/DepsLocation'
import CollapsibleSideNav from '@/components/navigation/CollapsibleSideNav'
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

export default function KIDS_PP_US_MT_01_LAYOUT() {
  const [collapsed, setCollapsed] = useState(false)
  const sideItems = useMemo(
    () => [
      { key: '/1', label: '내 업무' },
      { 
        key: 'sub1', 
        label: '업무 신청 관리', 
        children: [
          { key: '/2-1', label: '신청 현황' },
          { key: '/2-2', label: '승인 대기 목록' },
        ]
      },
      { 
        key: 'sub2', 
        label: '업무 시스템 메뉴 1',
        children: [
          { key: '/3', label: '업무 시스템 서브 메뉴 1' },
          { key: '/4', label: '업무 시스템 서브 메뉴 2', isExternal: true },
        ]
      },
      { key: '/6', label: '업무 시스템 메뉴 2',},
      { key: '/7', label: '업무 시스템 메뉴 3',},
    ],
    [],
  )

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

   // 페이지 인덱스 (목록 돌아가기용)
  const pageIndex = Number(searchParams.get('page') || 1);
  
  // Redux 스토어 데이터
  const { list, current, loading } = useAppSelector((s) => s.pst);

  const data: any = current || list?.find((n: any) => String(n.id ?? n.nttId) === String(id)) || {};
  const html = data?.contentHtml || data?.nttCn || data?.content || '';
  const isHtml = typeof html === 'string' && /<\/?[a-z][\s\S]*>/i.test(html);

  return (
    <Box className={`page-layout ${collapsed ? 'is-collapsed' : ''}`}>
      <Box className="sub-container">
        <Box className="content-wrap">
          {/* 사이드메뉴 */}
          <Box className="side-nav">
            <CollapsibleSideNav
              title="내업무"
              collapsed={collapsed}
              onToggle={() => setCollapsed((p) => !p)}
              items={sideItems}
              onSelect={(key) => window.alert(`Maps: ${key}`)}
            />
          </Box>
          {/* 서브 콘텐츠 영역 */}
          <Box className="sub-content">
            <Box className="welcome-banner">
              <Stack direction="row" alignItems="center" className="welcome-banner__inner">
                <Typography className="welcome-banner__message">
                  <span className="user-name">김안전</span>님 환영합니다. ‘OOO’ 메뉴에 새로운 확인 사항이 있습니다.
                </Typography>
                <IconButton size="small" className="btn-close" aria-label="close">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Box>
            {/* 상단 현재 위치 정보 */}
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
                {/* --- 본문 시작 --- */}

                <Box component="article" className="board-detail">
                  <Box className="board-header">
                    <Typography component="h1" className="board-title">
                      {data?.title || data?.nttSj || '공지사항 상세페이지 제목 영역입니다.'}
                    </Typography>
                    
                    <Box className="board-info">
                      <ul className="info-list">
                        <li>
                          <span className="info-label">작성자</span>
                          <span className="info-value">{data.writer || data.frstRegisterNm || '관리자'}</span>
                        </li>
                        <li>
                          <span className="info-label">등록일</span>
                          <span className="info-value">{data.date || data.frstRegisterPnttm || '2024-05-20'}</span>
                        </li>
                        <li>
                          <span className="info-label">조회수</span>
                          <span className="info-value">{data.views ?? data.inqireCo ?? '1,234'}</span>
                        </li>
                      </ul>
                    </Box>
                  </Box>

                  <Box className="board-body-wrap">
                    <Box className="board-content">
                      {isHtml ? (
                        <div 
                          className="content-inner html-render" 
                          dangerouslySetInnerHTML={{ __html: html || '<p>HTML 본문 렌더링 영역입니다.</p>' }} 
                        />
                      ) : (
                        <Typography className="content-inner text-render">
                          {String(html || '공지사항의 상세 본문 내용이 출력되는 영역입니다. 현재 등록된 내용이 없습니다.')}
                        </Typography>
                      )}
                      
                    </Box>
                    {/* 첨부파일 */}
                    <Box className="board-attachment">
                      <ul className="attachment-list">
                        <li>
                          <Link 
                            href="#none" 
                            className="attachment-item"
                            underline="none"
                            title="첨부파일 다운로드"
                          >
                            <Box className="file-info">
                              <span className="file-label">첨부파일</span>
                              <span className="file-name">공고문_및_관련_제출서류_양식.zip</span>
                              <span className="file-meta">
                                <span className="file-ext">[zip]</span>
                                <span className="file-size">1,069KB</span>
                              </span>
                            </Box>
                          </Link>
                        </li>
                      </ul>
                    </Box>
                  </Box>
                </Box>

                {/* 댓글 영역 */}
                <Box className="board-comment-section">
                  <Typography className="comment-title">
                    댓글 <Box component="span" className="count">2</Box>
                  </Typography>
                  <Box className="comment-write-box">
                    <Box className="comment-input-group">
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="댓글을 입력하세요."
                        variant="outlined"
                        className="comment-input"
                        slotProps={{
                          htmlInput: {
                            title: "댓글 입력",
                            maxLength: 100,
                          },
                        }}
                      />
                      <Button variant="contained" size="medium" className="btn-comment-submit">등록</Button>
                    </Box>
                    <Box className="text-count">
                      <Box component="span" className="current">0</Box> / 100
                    </Box>
                  </Box>

                  {/* 댓글 리스트 */}
                  <ul className="comment-list">
                    <li>
                      <Box className="comment-item">
                        <Box className="comment-info">
                          <span className="name">홍길동</span>
                          <span className="date">2026-03-24 14:20</span>
                          <Box className="comment-actions">
                            <Button size="xsmall" variant="text" className="btn-edit">수정</Button>
                            <Button size="xsmall" variant="text" className="btn-delete">삭제</Button>
                          </Box>
                        </Box>
                        <Typography className="comment-txt">
                          과학적 의약품 안전관리 정보를 제공하는 전문기관입니다.
                        </Typography>
                      </Box>
                    </li>
                    {/* 수정 중일 때 is-editing 클래스 추가 */}
                    <li>
                      <Box className="comment-item is-editing"> 
                        <Box className="comment-info">
                          <span className="name">홍길동</span>
                          <span className="date">2026-03-24 14:20</span>
                          <Box className="comment-actions">
                            <Button size="xsmall" variant="text" className="btn-edit">수정</Button>
                            <Button size="xsmall" variant="text" className="btn-delete">삭제</Button>
                          </Box>
                        </Box>
                        <Typography className="comment-txt">
                          과학적 의약품 안전관리 정보를 제공하는 전문기관입니다.
                        </Typography>
                        <Box className="comment-edit-wrap">
                          <TextField
                            fullWidth
                            multiline
                            rows={3}
                            defaultValue="과학적 의약품 안전관리 정보를 제공하는 전문기관입니다."
                            variant="outlined"
                            className="comment-input"
                          />
                          <Box className="edit-buttons">
                            <Button size="small" variant="outlined02" className="btn-cancel">취소</Button>
                            <Button size="small" variant="contained" className="btn-save">저장</Button>
                          </Box>
                        </Box>
                      </Box>
                    </li>
                    <li>
                      <Box className="comment-item">
                        <Box className="comment-info">
                          <span className="name">홍길동</span>
                          <span className="date">2026-03-24 14:20</span>
                          <Box className="comment-actions">
                            <Button size="xsmall" variant="text" className="btn-edit">수정</Button>
                            <Button size="xsmall" variant="text" className="btn-delete">삭제</Button>
                          </Box>
                        </Box>
                        <Typography className="comment-txt">
                          협력 소통(Relationship), 전문성(Speciality), 신뢰제고(Trust)‘에 역점을 두고
                        </Typography>
                      </Box>
                    </li>
                    <li>
                      <Box className="comment-item">
                        <Box className="comment-info">
                          <span className="name">홍길동</span>
                          <span className="date">2026-03-24 14:20</span>
                          <Box className="comment-actions">
                            <Button size="xsmall" variant="text" className="btn-edit">수정</Button>
                            <Button size="xsmall" variant="text" className="btn-delete">삭제</Button>
                          </Box>
                        </Box>
                        <Typography className="comment-txt">
                          식품의약품안전처 산하 공공기관으로
                        </Typography>
                      </Box>
                    </li>
                  </ul>
                </Box>

                {/* 하단 버튼 영역 */}
                <Box className="board-actions">
                  <Button 
                      variant="contained" 
                      size="large"
                      className="btn-list-go"
                      onClick={() => navigate(`/ko/notice?page=${pageIndex}`)}
                    >
                    목록
                  </Button>
                </Box>


                {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box> 
    </Box>
  )
}