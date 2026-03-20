/**
 * 화면ID: KIDS-PP-US-LG-06
 * 화면명: 아이디 찾기
 * 화면경로: /ko/auth/FindId
 * 화면설명: 아이디 찾기
 */

import DepsLocation from "@/components/common/DepsLocation";
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMbrInfo } from '@/features/mbr/MbrInfoThunks';
import { useAppDispatch } from '@/store/hooks';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useEffect, useRef, useState } from "react";
import { ensureAnyIdAssets, waitForAnyidC } from '@/lib/anyid/ensureAnyIdAssets';
import type { MbrInfoPVO } from '@/features/mbr/MbrInfoTypes';

const isProduction = import.meta.env.MODE === 'production'

export default function FindId() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  const [anyIdReady, setAnyIdReady] = useState(false);
  const hasLoadedAnyIdRef = useRef(false);
  const loadModuleCalledRef = useRef(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

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
          () => console.warn('[FindId] AnyidC.LOAD_MODULE not ready (timeout)'),
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

    const configAnyidcJsonUrl = `${(import.meta.env.BASE_URL || '/').replace(/\/+$/, '/')}config/config.anyidc.json`;
    const txId = `findId-${Date.now()}`;
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
      success: (data: any) => {
        const ci = data?.res?.ci;
        if (!ci) {
          openModal(t('certifySelfFailedReminder') || '인증 정보를 확인할 수 없습니다.');
          return;
        }
        dispatch(getMbrInfo({linkInfoIdntfId: ci} as MbrInfoPVO)).unwrap()
          .then((res) => {
            navigate('/pp/ko/auth/FindIdAuthSuccess', {
              state: { id: res?.mbrId, name: res?.encptMbrFlnm },
            });
          })
          .catch(() => {
            openModal('회원 정보 조회에 실패했습니다.');
          });
      },
      fail: (err: any) => {
        console.error(t('certifySelfFailed'), err);
        openModal(t('certifySelfFailedReminder'));
      },
      log: (data: any) => {
        console.log(t('anyIdLog'), data);
      },
    });
  }, [anyIdReady, dispatch, navigate, t]);

  return (
    <>
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">
            <Box className="sub-content">
              <DepsLocation />
              <Box className="content-view" id="content">
                <Box className="page-content">
                  <Box className="pageCont-idPwFind member-page">
                    <p className="guide-text">{t('findIdSelectMethod')}</p>
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
                        <Typography color="error">로컬 테스트 환경입니다. 개발환경에서는 사용할 수 없습니다.</Typography>
                      </Box>
                    )}
                    <Box component="section" className="caution-area" aria-labelledby="caution-title">
                      <Typography component="h4" id="caution-title" className="caution-title">
                        {t('cautionTitle')}
                      </Typography>
                      <ul className="caution-list">
                        <li>{t('findIdCaution1')}</li>
                        <li>{t('findIdCaution2')}</li>
                        <li>{t('findIdCaution3')}</li>
                      </ul>
                    </Box>
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
