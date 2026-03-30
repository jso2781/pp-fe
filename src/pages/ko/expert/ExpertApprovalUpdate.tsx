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
import { selectExprtApproval, selectTaskAuthList, updateExprtApproval } from '@/features/exprt/ExprtApprovalThunks';
import { ExprtApprovalUVO, ExprtTaskAuthRVO } from '@/features/exprt/ExprtApprovalTypes';
import { selectExprtMenus } from '@/features/exprt/ExprtTaskThunks';
import { getLangFromPathname } from '@/routes/lang';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Box, Button, FormControl, Grid, Link, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function ExpertApprovalUpdate() {
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
  const handleDownload = (atchFileId: string) => {
    dispatch(
      downloadAtch({atchFileId})
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
    dispatch(selectExprtApproval({ exprtTaskSn, mbrNo }));
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
          navigate(`/pp/${lang}/expert/ExpertApproval`);
        },
      })
    }
  }, [defenseYn]); 

  // 상태관리
  const [exprtAprvSttsCode, setExprtAprvSttsCode] = useState(current?.exprtAprvSttsCode || 'W');
  const [exprtRjctRsn, setExprtRjctRsn] = useState(current?.exprtRjctRsn || '');
  const [taskAprvSttsCode, setTaskAprvSttsCode] = useState(current?.taskAprvSttsCode || 'W');
  const [taskRjctRsn, setTaskRjctRsn] = useState(current?.taskRjctRsn || '');

  /** authList + authListAll을 authrtCd 기준 병합한 목록 (기본값: authList) */
  const [mergedList, setMergedList] = useState<ExprtTaskAuthRVO[]>(authList ?? []);

  useEffect(() => {
    setMergedList(authList ?? []);
  }, [authList]);  

  // 대국민포털_전문가내업무관리 소속 전문가 회원 승인 상태 업데이트
  const handleUpdateExprtApproval = () => {
    showDialogBackdrop({
      message: '저장하시겠습니까?',
      title: '처리 정보 수정',
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
            mbrNo: current?.mbrNo,
            exprtRjctRsn,
            taskAprvSttsCode,
            taskRjctRsn,
            taskAuthList: mergedList,
          };
          
          const result = await dispatch(updateExprtApproval(newPVO)).unwrap();
          if (result === 'SUCCESS') {
            showDialogBackdrop({
              message: '저장되었습니다.',
              title: '처리 정보 수정 완료',
              type: 'alert',
              confirmText: '확인',
              onConfirm: () => {
                if (exprtAprvSttsCode === 'R') {
                  navigate(`/pp/${lang}/expert/ExpertApproval`);
                } else {
                  navigate(`/pp/${lang}/expert/ExpertApproval/${exprtTaskSn}`);  
                }
              },
            })
          }
        } catch (error) {
          console.error('처리 정보 수정 실패:', error);
          showDialogBackdrop({
            message: '처리 정보 수정에 실패했습니다. 다시 시도해주세요.',
            title: '수정 실패',
            type: 'alert',
            confirmText: '확인',
          });
        }
      },
    })
  }  

  /** authrtCd 기준 중복 제거 후 병합 */
  const mergeAuthList = (listA: ExprtTaskAuthRVO[], listB: ExprtTaskAuthRVO[]): ExprtTaskAuthRVO[] => {
    const byCd = new Map<string, ExprtTaskAuthRVO>();
    listA.forEach((a) => { if (a.authrtCd) byCd.set(a.authrtCd, a); });
    listB.forEach((a) => { if (a.authrtCd) byCd.set(a.authrtCd, a); });
    return Array.from(byCd.values());
  };

  // 대국민포털_전문가업무신청관리 업무시스템 권한 목록 조회 (부여 가능 권한 조회 후 병합)
  const searchTaskAuthList = async () => {
    const listAll = await dispatch(selectTaskAuthList({ taskSeCd: current?.value })).unwrap();
    setMergedList(mergeAuthList(authList ?? [], listAll ?? []));
  };    

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
                  const dest = key.startsWith('/') ? key : `/${key}`;
                  window.location.assign(dest);
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
                            <dd>{current?.encptExprtFlnm ?? '-'}</dd>
                          </div>
                          <div className="info-item">
                            <dt>휴대전화번호</dt>
                            <dd>{current?.encptMbrTelno ?? '-'}</dd>
                          </div>
                          <div className="info-item">
                            <dt>기관 이메일</dt>
                            <dd>{current?.encptExprtInstEmlNm ?? '-'}</dd>
                          </div>
                          <div className="info-item">
                            <dt>신청일</dt>
                            <dd>{current?.exprtInfoRegDt ?? '-'}</dd>
                          </div>
                          {current?.file && (<>
                            <div className="info-item">
                              <dt>증빙 서류</dt>
                              <dd>
                                  <Box className="board-attachment">
                                    <ul className="attachment-list">
                                      <li key='tempkey'>
                                        <Box className="file-info">
                                          <span className="file-name">{current?.file?.fileNm ?? '-'}</span>
                                          <span className="file-meta">
                                            <span className="file-size"> [{current?.file?.fileSz ?? 0} KB]</span>
                                          </span>
                                          <Link 
                                            className="attachment-item"
                                            underline="none"
                                            title="첨부파일 다운로드"
                                            onClick={() => handleDownload(current?.file?.atchFileId ?? '')}                                          
                                          >                                          
                                            <span className="ico-down" aria-hidden="true" style={{cursor: 'pointer'}}/>
                                          </Link>
                                        </Box>                                      
                                      </li>
                                    </ul>
                                  </Box>   
                              </dd>
                            </div>
                          </>)}
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
                                  onChange={(e) => {
                                    setExprtAprvSttsCode(e.target.value);
                                    setExprtRjctRsn('');
                                    setTaskAprvSttsCode(current?.taskAprvSttsCode || 'W');
                                  }}
                                  inputProps={{ 'aria-label': '전문가 회원 신청 상태 선택' }}
                                  disabled={current?.exprtAprvSttsCode === 'A'}
                                >
                                  <MenuItem value="W">대기</MenuItem>
                                  <MenuItem value="A">승인</MenuItem>
                                  <MenuItem value="R">반려</MenuItem>
                                </Select>
                              </FormControl>
                            </dd>
                          </div>

                          {exprtAprvSttsCode === 'R' && (
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
                          )}

                          {exprtAprvSttsCode === 'A' && (
                          <>
                            <div className="info-item">
                              <dt>업무시스템</dt>
                              <dd>{current?.label ?? '-'}</dd>
                            </div>                                                    
                            <div className="info-item">
                              <dt id="system-status-label">업무 시스템 신청 상태</dt>
                              <dd>
                                <FormControl fullWidth size="small">
                                  <Select
                                    labelId="system-status-label"
                                    value={taskAprvSttsCode}
                                    onChange={(e) => {
                                      setTaskAprvSttsCode(e.target.value);
                                      setTaskRjctRsn('');
                                    }}
                                    inputProps={{ 'aria-label': '업무 시스템 신청 상태 선택' }}
                                  >
                                    {current?.taskAprvSttsCode === 'W'
                                      ? [
                                          <MenuItem key="W" value="W">대기</MenuItem>,
                                          <MenuItem key="A" value="A">승인</MenuItem>,
                                          <MenuItem key="R" value="R">반려</MenuItem>
                                        ]
                                      : [
                                          <MenuItem key="A" value="A">승인</MenuItem>,
                                          <MenuItem key="C" value="C">회수</MenuItem>
                                        ]}
                                  </Select>
                                </FormControl>
                              </dd>
                            </div>

                            {/* 업무시스템 권한 목록 */} 
                            {taskAprvSttsCode === 'A' && (                
                              <div className="info-item">
                                <dt>업무 시스템 권한                              
                                  <Button
                                    variant="contained"
                                    size="xsmall"                                    
                                    sx={{ marginLeft: '10px'}} 
                                    onClick={searchTaskAuthList}
                                  >
                                    권한 조회
                                  </Button>                            
                                </dt>
                                <dd>
                                  {mergedList.length > 0 ? (
                                    mergedList.map((auth) => (
                                      <Button
                                        key={`auth_${auth.authrtCd}`}
                                        variant="outlined02"
                                        size="small"
                                        sx={{ marginRight: '10px' }}
                                        onClick={() => {
                                          setMergedList((prev) =>
                                            prev.filter((a) => a.authrtCd !== auth.authrtCd)
                                          );
                                        }}
                                      >
                                        {auth.authrtNm} X
                                      </Button>
                                    ))
                                  ) : (
                                    <span>-</span>
                                  )}
                                </dd>
                              </div>  
                            )}
                          </>
                          )}

                          {(exprtAprvSttsCode === 'A' && taskAprvSttsCode === 'R') && (
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
                          )}
                        </dl>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box className="btn-group between">
                    <Box className="left-group">
                      <Button variant="outlined02" size="large" onClick={() => navigate(`/pp/${lang}/expert/ExpertApproval`)}>
                        목록
                      </Button>
                    </Box>
                    <Box className="right-group">
                      <Button variant="outlined02" size="large" onClick={() => navigate(`/pp/${lang}/expert/ExpertApproval/${exprtTaskSn}`)}>
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
