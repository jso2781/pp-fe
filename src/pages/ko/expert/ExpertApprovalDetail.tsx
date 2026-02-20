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
import { selectExprtApproval, withdrawExprtApproval } from '@/features/exprt/ExprtApprovalThunks';
import { ExprtApprovalUVO } from '@/features/exprt/ExprtApprovalTypes';
import { selectExprtMenus } from '@/features/exprt/ExprtTaskThunks';
import { getLangFromPathname, langPath } from '@/routes/lang';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Box, Button, Grid, MenuItem, Pagination, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

export default function ExpertApprovalDetail() {
  const dispatch = useAppDispatch();  
  const current = useAppSelector((s) => s.exprtApproval.current);
  const authList = useAppSelector((s) => s.exprtApproval.authList);
  const defenseYn = useAppSelector((s) => s.exprtApproval.defenseYn);
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
  const apprInstTaskList = auth?.userInfo?.apprInstTaskList?.map(item => item.bzmnTaskMngNo ?? '') ?? [];
  useEffect(() => {
    dispatch(selectExprtApproval({ exprtTaskSn, bzmnTaskMngNos: apprInstTaskList ?? [] }));
  }, [dispatch, exprtTaskSn]);  

  // 권한이 없을경우 defense
  useEffect(() => {
    if (defenseYn) {
      showDialogBackdrop({
        message: '비정상적인 접근입니다.',
        title: '알림',
        type: 'alert',
        confirmText: '확인',
        onConfirm: () => {
          navigate(`/ko/expert/ExpertApproval`);
        },
      })
    }
  }, [defenseYn]);  

  // 대국민포털_전문가내업무관리 소속 전문가 회원 탈퇴 처리
  const handleWithdrawExprtApproval = () => {
    showDialogBackdrop({
      message: '해당 회원을 탈퇴 처리하시겠습니까?',
      title: '전문가 회원 탈퇴',
      type: 'confirm',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: async () => {
        try {
          const newPVO: ExprtApprovalUVO = {
            exprtTaskSn,
            exprtAprvSttsCode: 'C',
            exprtNo: current?.exprtNo,
            mbrId: auth.userInfo?.mbrId || '',
            mbrNo: current?.mbrNo,
            taskAprvSttsCode: 'C',
          };
          
          const result = await dispatch(withdrawExprtApproval(newPVO)).unwrap();
          if (result === 'SUCCESS') {
            showDialogBackdrop({
              message: '탈퇴 처리되었습니다.',
              title: '전문가 회원 탈퇴 완료',
              type: 'alert',
              confirmText: '확인',
              onConfirm: () => {
                navigate(`/ko/expert/ExpertApproval`);
              },
            })
          }
        } catch (error) {
          console.error('전문가 회원 탈퇴 실패:', error);
          showDialogBackdrop({
            message: '전문가 회원 탈퇴에 실패했습니다. 다시 시도해주세요.',
            title: '탈퇴 실패',
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
                                          <span className="ico-down" aria-hidden="true" style={{cursor: 'pointer'}}/>
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

                          {/* 전문가 회원 전환 신청 승인 정보 */}
                          <div className="info-item">
                            <dt>전문가 회원 신청 상태</dt>
                            {current?.exprtAprvSttsCode === 'R' 
                            ? <dd className="status-rejected">{current?.exprtAprvSttsLabel}</dd> 
                            : <dd>{current?.exprtAprvSttsLabel}</dd>
                            }
                          </div>
                          {current?.exprtAprvSttsCode === 'R' && 
                            ( <div className="info-item">
                                <dt>반려 사유</dt>
                                <dd className="reason-text rejected">{current?.exprtRjctRsn ?? '반려 사유 없음'}</dd>
                              </div>
                            )}                           
                          <div className="info-item">
                            <dt>관리자 처리일</dt>
                            <dd>{current?.exprtAprvPrcsDt ?? '-'}</dd>
                          </div>

                          {/* 업무 시스템 명 */}
                          <div className="info-item">
                            <dt>업무시스템</dt>
                            <dd>{current?.label ?? '-'}</dd>
                          </div>

                          {/* 업무시스템 승인 정보 */}
                          <div className="info-item">
                            <dt>업무 시스템 신청 상태</dt>
                            {current?.taskAprvSttsCode === 'R' 
                            ? <dd className="status-rejected">{current?.taskAprvSttsLabel}</dd> 
                            : <dd>{current?.taskAprvSttsLabel}</dd>
                            }
                          </div>
                          {current?.taskAprvSttsCode === 'R' && 
                            ( <div className="info-item">
                                <dt>반려 사유</dt>
                                <dd className="reason-text rejected">{current?.taskRjctRsn ?? '반려 사유 없음'}</dd>
                              </div>
                            )}                                                       
                          {/* 업무시스템 권한 목록 */}                      
                          <div className="info-item">
                            <dt>업무 시스템 권한</dt>
                            <dd>
                              {authList && authList.length > 0 ? (
                                authList.map((auth) => (
                                  <Button
                                    key={`auth_${auth.authrtCd}`}
                                    variant="outlined02"
                                    size="small"                                    
                                    sx={{ marginRight: '10px', pointerEvents: 'none' }} 
                                  >
                                    {auth.authrtNm} 
                                  </Button>
                                ))
                              ) : (
                                <span>-</span>
                              )}                                               
                            </dd>
                          </div>                              

                          <div className="info-item">
                            <dt>관리자 처리일</dt>
                            <dd>{current?.taskAprvPrcsDt ?? '-'}</dd>
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
                      {current?.exprtAprvSttsCode === 'A' && (
                      <Button variant="outlined04" size="large" onClick={handleWithdrawExprtApproval}>
                        전문가 탈퇴
                      </Button>
                      )}
                      <Button variant="outlined02" size="large" onClick={() => navigate(`/ko/expert/ExpertApproval`)}>
                        취소
                      </Button>
                      {(current?.exprtAprvSttsCode === 'W' || current?.exprtAprvSttsCode === 'A') && (
                      <Button variant="contained" size="large" onClick={() => navigate(`/ko/expert/ExpertApprovalUpdate/${exprtTaskSn}`)}>
                        수정
                      </Button>
                      )}
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
