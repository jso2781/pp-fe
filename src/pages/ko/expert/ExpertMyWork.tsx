/**
 * 화면ID: KIDS-PP-US-MT-01
 * 화면명: 전문가 메뉴 - 내 업무
 * 화면경로: /expert/ExpertMyWork
 * 화면설명: 전문가 메뉴 - 내 업무
 */
import DepsLocation from '@/components/common/DepsLocation';
import CollapsibleSideNav from '@/components/navigation/CollapsibleSideNav';
import { useDialog } from '@/contexts/DialogContext';
import { refresh } from '@/features/auth/AuthThunks';
import { applyExprtTask, selectExprtInfo, withdrawExprt, withdrawExprtTask, selectExprtMenus } from '@/features/exprt/ExprtTaskThunks';
import { ExprtTaskPVO } from '@/features/exprt/ExprtTaskTypes';
import { getLangFromPathname, langPath } from '@/routes/lang';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ExpertMyWork() {
  const dispatch = useAppDispatch();
  const current = useAppSelector((s) => s.exprtTask.current);
  const lnbStructor = useAppSelector((s) => s.exprtTask.lnbStructor);
  const auth = useAppSelector((s) => s.auth);
  const mbrNo = auth?.userInfo?.mbrNo || '';

  const { showDialogBackdrop, showAlertBackdrop } = useDialog();

  const navigate = useNavigate();
  const location = useLocation();
  const lang = getLangFromPathname(location.pathname) || 'ko'
  const to = (p: string) => {
    const raw = langPath(lang, p)
    return raw.replace(/\/{2,}/g, '/')
  }

  useEffect(() => {
    if (mbrNo) dispatch(selectExprtInfo({ mbrNo }));
  }, [dispatch, mbrNo]);

  const info = current?.info ?? null;
  const taskList = current?.task ?? [];

  // 대국민포털_전문가내업무관리 업무시스템에 해당하는 메뉴 목록 조회
  useEffect(() => {
    if (mbrNo) {
      dispatch(selectExprtMenus({ mbrNo }));
    }
  }, [dispatch, mbrNo]);

  // 대국민포털_전문가내업무관리 전문가 회원 전환 신청 취소
  const handleConfirmWithdrawExprt = () => {
    showDialogBackdrop({
      message: '신청하신 전문가회원 전환신청을 정말 취소하시겠습니까?\n취소 시 일반회원으로 전환되며 내 업무로 접근이 불가합니다.',
      title: '전문가회원 전환신청 취소',
      type: 'confirm',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: async () => {
        try {
          const result = await dispatch(withdrawExprt({exprtNo: info?.exprtNo, mbrNo: info?.mbrNo})).unwrap();
          if (result === 'SUCCESS') {
            showDialogBackdrop({
              message: '취소가 완료되었습니다.\n일반회원으로 전환되며 홈 화면으로 이동합니다.',
              title: '전문가회원 전환신청 취소완료',
              type: 'alert',
              confirmText: '확인',
              onConfirm: async () => {
                // jwt refresh 호출로 전문가 회원 정보 갱신
                await dispatch(refresh({ 
                  tokenSn: auth.tokenSn ?? 0,
                  updtTokenCn: auth.updtTokenCn ?? '',
                })).unwrap();

                navigate(to(`/pp/${lang}`));
              },
            })
          }
        } catch (error) {
          console.error('전문가 회원 전환 신청 취소 실패:', error);
          showDialogBackdrop({
            message: '전문가 회원 전환 신청 취소에 실패했습니다. 다시 시도해주세요.',
            title: '취소 실패',
            type: 'alert',
            confirmText: '확인',
          });
        }
      },
    })
  }
  
  // 대국민포털_전문가내업무관리 전문가 회원 전환 반려 후 재신청
  const handleConfirmReApplyExprt = () => {
    showDialogBackdrop({
      message: '확인 버튼을 누르면, 전환 신청 페이지로 이동하며 1단계 부터 다시 진행됩니다.',
      title: '전문가회원 전환신청 재신청',
      type: 'confirm',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: () => {
        navigate(to(`/pp/${lang}/expert/ExpertMemberApply`));
      },
    })
  }

  // 대국민포털_전문가내업무관리 전문가 회원 업무 신청 취소
  const handleConfirmWithdrawExprtTask = (exprtTaskSn: string, label: string) => {
    showDialogBackdrop({
      message: `${label} 업무를 정말 취소하시겠습니까?\n취소 시 해당 업무시스템 사용이 불가합니다.`,
      title: '업무시스템 사용 신청 취소',
      type: 'confirm',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: async () => {
        try {
          const result = await dispatch(withdrawExprtTask({exprtTaskSn})).unwrap();
          if (result === 'SUCCESS') {
            showDialogBackdrop({
              message: '취소가 완료되었습니다.',
              title: '업무시스템 사용 신청 취소완료',
              type: 'alert',
              confirmText: '확인',
              onConfirm: () => {
                dispatch(selectExprtInfo({ mbrNo }));
                dispatch(selectExprtMenus({ mbrNo }));
              },
            })
          }
        } catch (error) {
          console.error('업무시스템 사용 신청 취소 실패:', error);
          showDialogBackdrop({
            message: '업무시스템 사용 신청 취소에 실패했습니다. 다시 시도해주세요.',
            title: '취소 실패',
            type: 'alert',
            confirmText: '확인',
          });
        }
      },
    })
  }

  // 대국민포털_전문가내업무관리 전문가 회원 업무 신청
  const handleConfirmApplyExprtTask = (exprtTaskPVO : ExprtTaskPVO, label: string) => {
    showDialogBackdrop({
      message: `${label} 사용을 신청하시겠습니까?\n승인이 완료되면 좌측 메뉴에서 해당 업무 시스템을 확인하실 수 있습니다.`,
      title: '업무시스템 사용 신청',
      type: 'confirm',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: async () => {
        try {
          const newPVO: ExprtTaskPVO = {
            ...exprtTaskPVO,
            exprtNo: info?.exprtNo,
            mbrId: auth.userInfo?.mbrId,
          };
          
          const result = await dispatch(applyExprtTask(newPVO)).unwrap();
          if (result === 'SUCCESS') {
            showDialogBackdrop({
              message: '신청이 완료되었습니다.',
              title: '업무시스템 사용 신청 완료',
              type: 'alert',
              confirmText: '확인',
              onConfirm: () => {
                dispatch(selectExprtInfo({ mbrNo }));
              },
            })
          }
        } catch (error) {
          console.error('업무시스템 사용 신청 실패:', error);
          showDialogBackdrop({
            message: '업무시스템 사용 신청에 실패했습니다. 다시 시도해주세요.',
            title: '신청 실패',
            type: 'alert',
            confirmText: '확인',
          });
        }
      },
    })
  }  

  // LNB
  const [collapsed, setCollapsed] = useState(false);

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
                  const dest = key.startsWith('/pp/ko/') ? key : '/pp/ko' + key;
                  navigate(dest);
                }
              }}
            />
          </Box>
          <Box className="sub-content">
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
                <h3 className="section-title-work">내 정보</h3>
                <Box className="panel-box">
                  <Box className="my-account-info">
                    <Box className="user-context">
                      <Box className="status-badge-group">
                        <span className="tag">전문가회원</span>
                        {info?.exprtAprvSttsCode === 'W' && <span className="badge pending">신청중</span>}
                        {info?.exprtAprvSttsCode === 'R' && (
                          <>
                            <span className="badge rejected">반려중</span>
                            <Button
                              variant="text"
                              className="btn-view-reason"
                              endIcon={<ChevronRightIcon />}
                              size="small"
                              onClick={() => showAlertBackdrop(info?.rjctRsn ?? '반려 사유 없음', '반려 사유')}
                            >
                              반려사유보기
                            </Button>
                          </>
                        )}
                        {info?.exprtAprvSttsCode === 'A' && <span className="badge">승인</span>}
                        {info?.exprtAprvSttsCode === 'C' && <span className="badge">회수</span>}
                      </Box>
                      <Box className="user-info-group">
                        <span className="user-name">{info?.encptExprtFlnm ?? '-'}</span>
                        <span className="user-company">{info?.instNm ?? '-'}</span>
                      </Box>
                      <p className="last-login">마지막 접속일시 : {info?.lastLgnDt ?? '-'}</p>
                    </Box>
                    {info && (
                      <Box className="control-action">
                        {info.exprtAprvSttsCode === 'W' && (
                          <Button variant="outlined04" size="small" className="s-lg" onClick={handleConfirmWithdrawExprt}>
                            신청취소하기
                          </Button>
                        )}
                        {(info.exprtAprvSttsCode === 'R' || info.exprtAprvSttsCode === 'C') && (
                          <Button variant="outlined03" size="small" className="s-lg" onClick={handleConfirmReApplyExprt}>
                            재신청하기
                          </Button>
                        )}                        
                      </Box>
                    )}
                  </Box>
                </Box>
                
                {(info?.exprtAprvSttsCode !== 'R' && info?.exprtAprvSttsCode !== 'C') && (
                  <>
                    <h3 className="section-title-work">업무 시스템 선택</h3>
                    <Box className="panel-box">
                      <ul className="work-system-list">
                        {taskList.map((item) => {
                          const code = item.taskAprvSttsCode;
                          const taskLabel = item.label ?? item.value ?? '업무';
                          const statusClass = code === 'A' ? 'using' : code === 'W' ? 'waiting' : code === 'R' ? 'rejected' : code === 'C' ? 'canceled' : 'available';
                          const statusText = code === 'A' ? '사용중' : code === 'W' ? '승인중' : code === 'R' ? '반려중' : code === 'C' ? '회수' : '신청가능';
                          return (
                            <li key={item.bzmnTaskMngNo ?? item.value ?? taskLabel} className="item">
                              <Box className="system-info">
                                <span className={`tag ${statusClass}`}>{statusText}</span>
                                <Button variant="text" className="system-name" endIcon={<ChevronRightIcon />}>
                                  {taskLabel}                    
                                </Button>
                                  {code === 'R' && ( 
                                    <Button
                                      variant="text"
                                      className="btn-view-reason"
                                      endIcon={<ChevronRightIcon />}
                                      size="small"
                                      onClick={() => showAlertBackdrop(item?.rjctRsn ?? '반려 사유 없음', '반려 사유')}
                                      sx={{color: '#666'}}>
                                      반려사유보기
                                    </Button>                                                            
                                  )}                             
                              </Box>
                              <Box className="control-action">
                                {code === 'W' && <span className="status-text">승인 대기 중</span>}
                                {code === 'C' && (
                                  <Button variant="outlined03" size="small" className="s-lg" onClick={() => handleConfirmApplyExprtTask(item, taskLabel)}>
                                    재신청하기
                                  </Button>
                                )}                                
                                {code === 'A' && (
                                  <Button variant="outlined04" size="small" className="s-lg" onClick={() => handleConfirmWithdrawExprtTask(item.exprtTaskSn ?? '', taskLabel)}>
                                    신청취소하기
                                  </Button>
                                )}
                                {code === 'R' && (
                                  <Button variant="outlined03" size="small" className="s-lg" onClick={() => handleConfirmApplyExprtTask(item, taskLabel)}>
                                    재신청하기
                                  </Button>
                                )}
                                {!code && (
                                  <Button variant="outlined03" size="small" className="s-lg" onClick={() => handleConfirmApplyExprtTask(item, taskLabel)}>
                                    신청하기
                                  </Button>
                                )}
                              </Box>
                            </li>
                          );
                        })}
                      </ul>
                    </Box>
                  </>
                )}

              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
