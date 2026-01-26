import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Box, Stack, Typography, Link, Button } from '@mui/material';
import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_NO_02() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 게시글 ID 추출
  const [searchParams] = useSearchParams();
  
  // 페이지 인덱스 (목록 돌아가기용)
  const pageIndex = Number(searchParams.get('page') || 1);
  
  // Redux 스토어 데이터
  const { list, current, loading } = useAppSelector((s) => s.pst);

  // LNB 아이템 설정
  const sideItems = useMemo(() => [
    { key: '/ko/notice', label: '공지사항' },
    { key: '/ko/jobs', label: '채용게시판' },
    { key: 'centers_group', label: '센터', children: [{ key: '/center/1', label: '센터 소개' }] },
  ], []);

  // 2. 데이터 매핑 로직 (기존 NoticeDetail 로직 통합)
  const data: any = current || list?.find((n: any) => String(n.id ?? n.nttId) === String(id)) || {};
  const html = data?.contentHtml || data?.nttCn || data?.content || '';
  const isHtml = typeof html === 'string' && /<\/?[a-z][\s\S]*>/i.test(html);

  return (
    <ScreenShell screenId="KIDS-PP-US-NO-02" title="공지사항 상세" uiType="page">
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>알림마당</span>
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
                  <Box component="article" className="board-detail">
                    {/* (제목 + 정보) */}
                    <Box className="board-header">
                      <Typography component="h1" className="board-title">
                        {/* 데이터가 없을 때 퍼블용 텍스트 노출 */}
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
                      {/* 게시글 본문 영역 */}
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

                        <Box
                          component="img"
                          src="https://www.drugsafe.or.kr/cmm/fms/FileDown.do?atchFileId=FILE_000000000079447&fileSn=0"
                          alt="공지사항 본문 테스트용 이미지"
                        />

                        <Box className="iframe-wrap">
                          <Box
                            component="iframe"
                            src="https://www.youtube.com/embed/D0l1HdemykU?si=fTvqzwHgZhhLxsVJ"
                            title="공지사항 안내 영상" // 타이틀 제공
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="iframe"
                          />
                        </Box>
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

                    <Box className="kogl-license-wrap">
                      <Box className="kogl-container">
                        <Box className="kogl-image">
                          <img  src="/img/icon_kogl.png" alt="공공누리 제4유형: 출처표시, 상업적 이용금지, 변경금지" />
                        </Box>
                        
                        <Box className="kogl-text">
                          <Typography component="p">
                            본 저작물은 "공공누리" 제4유형 : 출처표시 + 상업적 이용금지 + 변경금지 조건에 따라 이용할 수 있습니다.
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
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
    </ScreenShell>
  );
}