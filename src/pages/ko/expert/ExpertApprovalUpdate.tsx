/**
 * 화면ID: KIDS-PP-US-MT-03
 * 화면명: 전문가 메뉴 - 업무 신청 관리 상세
 * 화면경로: /expert/ExpertApproval/:exprtTaskSn
 * 화면설명: 전문가 메뉴 - 업무 신청 관리 상세
 */
import DepsLocation from '@/components/common/DepsLocation';
import CollapsibleSideNav from '@/components/navigation/CollapsibleSideNav';
import { useDialog } from '@/contexts/DialogContext';
import { downloadAtch } from '@/features/atch/AtchThunks';
import { selectExprtApproval, updateExprtApproval } from '@/features/exprt/ExprtApprovalThunks';
import { ExprtApprovalUVO } from '@/features/exprt/ExprtApprovalTypes';
import { selectExprtMenus } from '@/features/exprt/ExprtTaskThunks';
import { getLangFromPathname } from '@/routes/lang';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Box, Button, FormControl, Grid, Link, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function ExpertApprovalUpdate() {
  const dispatch = useAppDispatch();  
  const current = useAppSelector((s) => s.exprtApproval.current);
  const lnbStructor = useAppSelector((s) => s.exprtTask.lnbStructor);
  const auth = useAppSelector((s) => s.auth);
  const mbrNo = auth?.userInfo?.mbrNo || '';

  const { showDialogBackdrop, showAlertBackdrop } = useDialog();

  const navigate = useNavigate();
  const location = useLocation();
  const lang = getLangFromPathname(location.pathname) || 'ko'

  // 파일 다운로드
  const handleDownload = (atchFileGroupId: string, atchFileId: string) => {
    dispatch(
      downloadAtch({atchFileGroupId, atchFileId})
    );
  };

  // 대국민포털_전문가내업무관리 업무시스템에 해당하는 메뉴 목록 조회
  useEffect(() => {
    if (mbrNo) {
      dispatch(selectExprtMenus({ mbrNo }));
    }
  }, [dispatch, mbrNo]);  

  // LNB
  const [collapsed, setCollapsed] = useState(false);

  // 대국민포털_전문가업무신청관리 소속 전문가 회원 상세 조회
  const { exprtTaskSn } = useParams<{ exprtTaskSn: string }>();
  useEffect(() => {
    dispatch(selectExprtApproval({ exprtTaskSn }));
  }, [dispatch, exprtTaskSn]);  

  // 상태관리
  const [exprtAprvSttsCode, setExprtAprvSttsCode] = useState(current?.exprtAprvSttsCode || 'W');
  const [exprtRjctRsn, setExprtRjctRsn] = useState(current?.exprtRjctRsn || '');
  const [taskAprvSttsCode, setTaskAprvSttsCode] = useState(current?.taskAprvSttsCode || '');
  const [taskRjctRsn, setTaskRjctRsn] = useState(current?.taskRjctRsn || '');

  // 대국민포털_전문가내업무관리 소속 전문가 회원 승인 상태 업데이트
  const handleUpdateExprtApproval = () => {
    showDialogBackdrop({
      message: '저장하시겠습니까?',
      title: '승인 상태 변경',
      type: 'confirm',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: async () => {
        try {
          const newPVO: ExprtApprovalUVO = {
            exprtTaskSn,
            exprtAprvSttsCode,
            exprtNo: current?.exprtNo,
            mbrId: auth.userInfo?.mbrId || '',
            exprtRjctRsn,
            taskAprvSttsCode,
            taskRjctRsn
          };
          
          const result = await dispatch(updateExprtApproval(newPVO)).unwrap();
          if (result === 'SUCCESS') {
            showDialogBackdrop({
              message: '저장되었습니다.',
              title: '승인 상태 변경 완료',
              type: 'alert',
              confirmText: '확인',
              onConfirm: () => {
                navigate(`/ko/expert/ExpertApproval/${exprtTaskSn}`)
              },
            })
          }
        } catch (error) {
          console.error('전문가 승인 상태 변경 실패:', error);
          showDialogBackdrop({
            message: '전문가 승인 상태 변경에 실패했습니다. 다시 시도해주세요.',
            title: '변경 실패',
            type: 'alert',
            confirmText: '확인',
          });
        }
      },
    })
  }  

  return (
    <Box className={`page-layout ${collapsed ? 'is-collapsed' : ''}`}>
      <Box className="sub-container">
        <Box className="content-wrap">
          <Box className="side-nav">
            <CollapsibleSideNav
              title="내 업무"
              collapsed={collapsed}
              onToggle={() => setCollapsed((p) => !p)}
              lnbStructor={lnbStructor}
              onSelect={(key) => {
                if (key.startsWith('http')) {
                  window.open(key, '_blank');
                } else {
                  const dest = key.startsWith('/ko/') ? key : '/ko' + key;
                  navigate(dest);
                }
              }}
            />
          </Box>
            <Box className="sub-content">
              <DepsLocation />{/* 상단 현재 위치 정보 */}
              <Box className="content-view" id="content">
                <Box className="page-content">
                  {/* --- 본문 시작 --- */}

                  <Grid container spacing={3} className="layout-row">
                    <Grid size={{ xs: 12, md: 5 }} className="col">
                      <h3 className="section-title-work">전문가 회원 정보</h3>
                      <Box className="panel-box">
                        <dl className="info-list">
                          <div className="info-item">
                            <dt>아이디</dt>
                            <dd>{current?.mbrId ?? '-'}</dd>
                          </div>
                          <div className="info-item">
                            <dt>이름</dt>
                            <dd>{current?.name ?? '-'}</dd>
                          </div>
                          <div className="info-item">
                            <dt>휴대전화번호</dt>
                            <dd>{current?.telNo ?? '-'}</dd>
                          </div>
                          <div className="info-item">
                            <dt>기관 이메일</dt>
                            <dd>{current?.instEmlNm ?? '-'}</dd>
                          </div>
                          <div className="info-item">
                            <dt>신청일</dt>
                            <dd>{current?.exprtInfoRegDt ?? '-'}</dd>
                          </div>
                          <div className="info-item">
                            <dt>증빙 서류</dt>
                            <dd>
                                <Box className="board-attachment">
                                  <ul className="attachment-list">
                                    <li key='tempkey'>
                                      <Box className="file-info">
                                        <span className="file-label">첨부파일</span>
                                        <span className="file-name">파일명</span>
                                        <span className="file-meta">
                                          <span className="file-ext">[pdf]</span>
                                          <span className="file-size">52050</span>
                                        </span>
                                        <Link 
                                          className="attachment-item"
                                          underline="none"
                                          title="첨부파일 다운로드"
                                          onClick={() => handleDownload('999', '1')}                                          
                                        >
                                          <span className="ico-down" aria-hidden="true"/>
                                        </Link>
                                      </Box>                                      
                                    </li>
                                  </ul>
                                </Box>   
                            </dd>
                          </div>
                        </dl>
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }} className="col">
                      <h3 className="section-title-work">처리 정보</h3>
                      <Box className="panel-box bg">
                        <dl className="info-list">
                          <div className="info-item">
                            <dt id="expert-status-label">전문가 회원 신청 상태</dt>
                            <dd>
                              <FormControl fullWidth size="small">
                                <Select
                                  labelId="expert-status-label"
                                  value={exprtAprvSttsCode}
                                  onChange={(e) => setExprtAprvSttsCode(e.target.value)}
                                  inputProps={{ 'aria-label': '전문가 회원 신청 상태 선택' }}
                                >
                                  <MenuItem value="W">대기</MenuItem>
                                  <MenuItem value="A">승인</MenuItem>
                                  <MenuItem value="R">반려</MenuItem>
                                  <MenuItem value="C">회수</MenuItem>
                                </Select>
                              </FormControl>
                            </dd>
                          </div>

                          <div className="info-item">
                            <dt>
                              <label htmlFor="expert-reject-reason">반려 사유</label>
                            </dt>
                            <dd>
                              <TextField
                                fullWidth
                                value={exprtRjctRsn}
                                onChange={(e) => setExprtRjctRsn(e.target.value)}
                                id="expert-reject-reason" 
                                placeholder="반려 사유를 입력하세요."
                              />
                            </dd>
                          </div>

                          <div className="info-item">
                            <dt id="system-status-label">업무 시스템 신청 상태</dt>
                            <dd>
                              <FormControl fullWidth size="small">
                                <Select
                                  labelId="system-status-label"
                                  value={taskAprvSttsCode}
                                  onChange={(e) => setTaskAprvSttsCode(e.target.value)}
                                  inputProps={{ 'aria-label': '업무 시스템 신청 상태 선택' }}
                                >
                                  <MenuItem value="W">대기</MenuItem>
                                  <MenuItem value="A">승인</MenuItem>
                                  <MenuItem value="R">반려</MenuItem>
                                  <MenuItem value="C">회수</MenuItem>
                                </Select>
                              </FormControl>
                            </dd>
                          </div>
                          <div className="info-item">
                            <dt>
                              <label htmlFor="system-reject-reason">반려 사유</label>
                            </dt>
                            <dd>
                              <TextField
                                fullWidth
                                value={taskRjctRsn}
                                onChange={(e) => setTaskRjctRsn(e.target.value)}                                
                                id="system-reject-reason"
                                placeholder="반려 사유를 입력하세요."
                              />
                            </dd>
                          </div>
                        </dl>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box className="btn-group between">
                    <Box className="left-group">
                      <Button variant="outlined02" size="large" onClick={() => navigate(`/ko/expert/ExpertApproval`)}>
                        목록
                      </Button>
                    </Box>
                    <Box className="right-group">
                      <Button variant="outlined02" size="large" onClick={() => navigate(`/ko/expert/ExpertApproval/${exprtTaskSn}`)}>
                        취소
                      </Button>
                      <Button variant="contained" size="large" onClick={handleUpdateExprtApproval}>
                        저장
                      </Button>
                    </Box>
                  </Box> 
                  
                  {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
        </Box>
      </Box>
    </Box>
  );
}
