import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import { getPst } from '@/features/pst/PstThunks';
import { downloadAtch } from '@/features/atch/AtchThunks';
import { PstRVO } from '@/features/pst/PstTypes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Box, Button, Link, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SideItem } from '@/features/common/CommonTypes';

export default function NoticeDetail() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const bbsId = 'BBS_COM_002'; // 채용 게시판 ID
  const { pstSn } = useParams<{ pstSn: string }>();

  const { current } = useAppSelector((s) => s.pst)

  useEffect(() => {
    if (bbsId && pstSn) dispatch(getPst({bbsId, pstSn}))
  }, [dispatch, bbsId, pstSn])

  const sideItems: SideItem[] = useMemo(
    () => [
      { key: '/news/NewsNoticeList', label: '공지사항', disabled: false },
      { key: '/news/NewsJobNoticeList', label: '채용 게시판', disabled: true },
      { key: '/news/NewsDataRoomList', label: '자료실', disabled: false },
    ],
    [],
  );

  const data: PstRVO = current || {};
  const html = data?.pstCn || '';
  const isHtml = typeof html === 'string' && /<\/?[a-z][\s\S]*>/i.test(html)
  const atchFiles = data?.atchRVOs || [];

  const handleDownload = (atchFileSn: string) => {
    dispatch(
      downloadAtch({atchFileSn})
    );
  };
  
  return (
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
                        {data.pstTtl || '-'}
                      </Typography>
                      
                      <Box className="board-info">
                        <ul className="info-list">
                          <li>
                            <span className="info-label">작성자</span>
                            <span className="info-value">{data.wrtrDeptNm ?? '-'}</span>
                          </li>
                          <li>
                            <span className="info-label">등록일</span>
                            <span className="info-value">{data.regDt ?? '-'}</span>
                          </li>
                          <li>
                            <span className="info-label">조회수</span>
                            <span className="info-value">{data.pstInqCnt ?? '-'}</span>
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
                            dangerouslySetInnerHTML={{ __html: html }} 
                          />
                        ) : (
                          <Typography className="content-inner text-render">
                            {String(html || '')}
                          </Typography>
                        )}
                      </Box>
                      {/* 첨부파일 */}
                      {atchFiles.length > 0 && (
                      <Box className="board-attachment">
                        <ul className="attachment-list">
                          {atchFiles.map((file, index) => (
                          <li key={index}>
                            <Link 
                              // href={file.atchFilePath ?? '#none'} // 첨부파일 다운로드 api 연동으로 변경 필요
                              className="attachment-item"
                              underline="none"
                              title="첨부파일 다운로드"
                              onClick={() => handleDownload(file.atchFileSn ?? '')}
                            >
                              <Box className="file-info">
                                <span className="file-label">{atchFiles.length === 1 ? '첨부파일' : `첨부파일${index + 1}`}</span>
                                <span className="file-name">{file.atchFileNm}</span>
                                <span className="file-meta">
                                  <span className="file-ext">[{file.atchFileExtnNm}]</span>
                                  <span className="file-size">{file.atchFileSz}</span> {/** 파일 크기 단위 변환 로직 필요 */}
                                </span>
                              </Box>
                            </Link>
                          </li>
                          ))}
                        </ul>
                      </Box>
                      )}
                    </Box>
                    <Box className="kogl-license-wrap">
                      <Box className="kogl-container">
                        <Link 
                          href="http://www.kogl.or.kr/info/licenseType4.do"
                          underline="none"
                          target="_blank"
                          title="저작권 로고"
                        >
                          <Box className="kogl-image">
                            <img 
                              src="/img//icon_kogl.png" 
                              alt="공공누리 제4유형: 출처표시, 상업적 이용금지, 변경금지" 
                            />
                          </Box>
                        </Link>
                        <Box className="kogl-text">
                          <Typography variant="body2" component="p">
                            본 저작물은 <strong>"공공누리" 제4유형 : 출처표시 + 상업적 이용금지 + 변경금지</strong> 조건에 따라 이용할 수 있습니다.
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  {/* 하단 버튼 영역 */}
                  <Box className="board-actions">
                    <Button 
                        variant="contained" 
                        color="dark" 
                        size="large"
                        className="btn-list-go"
                        onClick={() => navigate(`/ko/news/NewsJobNoticeList`)}
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
