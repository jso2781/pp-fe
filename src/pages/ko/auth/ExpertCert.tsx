/**
 * 화면ID: 
 * 화면명: 내업무 페이지 AnyId 인증
 * 화면경로: /ko/auth/ExpertCert
 * 화면설명: 내업무 페이지 진입 전 AnyId 인증 처리 (전문가 회원 전용)
 */

import DepsLocation from "@/components/common/DepsLocation";
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMbrInfo } from '@/features/mbr/MbrInfoThunks';
import { useAppDispatch } from '@/store/hooks';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useEffect, useRef, useState } from "react";
import { ensureAnyIdAssets, waitForAnyidC } from '@/lib/anyid/ensureAnyIdAssets';
import type { MbrInfoPVO } from '@/features/mbr/MbrInfoTypes';

const isProduction = import.meta.env.MODE === 'production'

export default function ExpertCert() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  const [anyIdReady, setAnyIdReady] = useState(false);
  const hasLoadedAnyIdRef = useRef(false);
  const loadModuleCalledRef = useRef(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  /** LoginMethod 등에서 남은 window.anyidAdaptor가 Any-ID 성공 시 /auth/anyid/login을 호출하지 않도록 이 화면 전용으로 덮어씀 */
  const dispatchRef = useRef(dispatch);
  const navigateRef = useRef(navigate);
  const tRef = useRef(t);
  useEffect(() => {
    dispatchRef.current = dispatch;
    navigateRef.current = navigate;
    tRef.current = t;
  });

  useEffect(() => { scrollTo(0, 0); }, []);

  // Any-ID 자원 로드 (CertifySelf와 동일)
  useEffect(() => {
    if (import.meta.env.MODE !== 'production') return;
    if (hasLoadedAnyIdRef.current) return;
    hasLoadedAnyIdRef.current = true;
    let cancelWait: (() => void) | null = null;
    ensureAnyIdAssets()
      .then(() => {
        cancelWait = waitForAnyidC(
          () => setAnyIdReady(true),
          () => console.warn('[FindPw] AnyidC.LOAD_MODULE not ready (timeout)'),
          50,
          40
        );
      })
      .catch((err) => {
        console.error(t('anyIdAssetsLoadFailed'), err);
      });
    return () => { cancelWait?.(); };
  }, [t]);

  const openModal = (message: string) => {
    setModalMessage(message);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalMessage('');
  };

  // #anyidc 마운트 후 LOAD_MODULE 1회 호출 — production 전용
  useEffect(() => {
    if (!isProduction) return;
    if (!anyIdReady || !window.AnyidC?.LOAD_MODULE) return;
    if (loadModuleCalledRef.current) return;
    loadModuleCalledRef.current = true;

    const prevAdaptor = window.anyidAdaptor;
    window.anyidAdaptor = {
      success: async (data: any) => {
        const ci = data?.res?.ci;
        if (!ci) {
          setModalMessage(tRef.current('certifySelfFailedReminder') || '인증 정보를 확인할 수 없습니다.');
          setModalOpen(true);
          return;
        }
        try {
          // FIXME 전문가회원 내업무 페이지 진입을 위한 Any-ID 인증 후처리 이력을 어딘가에 저장 또는, 세션정보 갱신 프로세스 필요 
          // 값 저장
          sessionStorage.setItem('expertCertSuccess', 'true');

          // 페이지 이동
          navigateRef.current('/pp/ko/expert/ExpertMyWork');
        } catch {
          setModalMessage('내 업무 페이지 조회에 실패했습니다.');
          setModalOpen(true);
        }
      },
    };

    const configAnyidcJsonUrl = `${(import.meta.env.BASE_URL || '/').replace(/\/+$/, '/')}config/config.anyidc.json`;
    const txId = `exprtCert-${Date.now()}`;
    const lvl = 3;

    window.AnyidC.LOAD_MODULE({
      cfg: configAnyidcJsonUrl,
      txId,
      tag: txId,
      lvl,
      bypass: 0,
      toggle: false,
      theme: '4.1.0',
      redirect_uri: window.location.href,
      success: (data: any) => window.anyidAdaptor?.success?.(data),
      fail: (err: any) => {
        console.error(tRef.current('certifySelfFailed'), err);
        setModalMessage(tRef.current('certifySelfFailedReminder'));
        setModalOpen(true);
      },
      log: (data: any) => {
        console.log(tRef.current('anyIdLog'), data);
      },
    });

    return () => {
      window.anyidAdaptor = prevAdaptor;
    };
  }, [anyIdReady]);

  return (
    <>
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">
            <Box className="sub-content">
              <DepsLocation />
              <Box className="content-view" id="content">
                <Box className="page-content">
                  <Box className="pageCont-expertCert member-page">
                    <p className="guide-text">전문가 회원 메뉴는 Any-ID 인증 후 이용 가능합니다.</p>
                    {isProduction ? (
                      <Box sx={{ mt: 2 }}>
                        <div id="anyidc" className="anyidc" />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          mt: 2,
                          minHeight: 200,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px dashed',
                          borderColor: 'divider',
                          borderRadius: 1,
                          bgcolor: 'background.paper',
                          px: 2,
                          textAlign: 'center',
                        }}
                      >
                        <Typography color="error" sx={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => {
                          sessionStorage.setItem('expertCertSuccess', 'true');
                          navigateRef.current('/pp/ko/expert/ExpertMyWork');
                        }}>
                          로컬 테스트 환경입니다. 개발환경에서는 사용할 수 없습니다.
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Dialog open={modalOpen} onClose={closeModal} maxWidth="sm" fullWidth>
        <DialogTitle component="div" className="modal-title">
          <h2>{t('alert')}</h2>
          <IconButton aria-label={t('close')} onClick={closeModal} className="btn-modal-close">
            <CloseIcon aria-hidden="true" />
          </IconButton>
        </DialogTitle>
        <DialogContent className="modal-content">
          <Typography variant="body1">{modalMessage}</Typography>
        </DialogContent>
        <DialogActions className="modal-footer">
          <Button variant="contained" onClick={closeModal}>{t('confirm')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
