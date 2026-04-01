/**
 * 화면ID: CleanCenterCert
 * 화면명: 클린신고센터 본인인증
 * 화면경로: /ko/auth/CleanCenterCert
 * 화면설명: 클린신고센터 본인인증
 */

import DepsLocation from "@/components/common/DepsLocation";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMbrInfo } from '@/features/mbr/MbrInfoThunks';
import { useAppDispatch } from '@/store/hooks';
import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from "react";
import { ensureAnyIdAssets, waitForAnyidC, shouldLoadAnyIdSdk } from '@/lib/anyid/ensureAnyIdAssets';
import type { MbrInfoPVO } from '@/features/mbr/MbrInfoTypes';
import { useDialog } from '@/contexts/DialogContext';

const showAnyIdArea = shouldLoadAnyIdSdk();

export default function CleanCenterCert() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { showAlert } = useDialog()
  const { lang } = useParams<{ lang: string }>();
  const redirectTo =
    (location.state as { redirectTo?: string } | null)?.redirectTo ?? `/pp/${lang ?? 'ko'}/about/ethics/CleanForm`

  const [anyIdReady, setAnyIdReady] = useState(false);
  const hasLoadedAnyIdRef = useRef(false);
  const loadModuleCalledRef = useRef(false);

  /** Any-ID SDK가 LOAD_MODULE에 넘긴 success 외에 window.anyidAdaptor.success만 호출하는 경우 대비 (LoginMethod 잔여 핸들러로 /auth/anyid/login 호출 방지) */
  const dispatchRef = useRef(dispatch);
  const navigateRef = useRef(navigate);
  const tRef = useRef(t);
  useEffect(() => {
    dispatchRef.current = dispatch;
    navigateRef.current = navigate;
    tRef.current = t;
  });

  useEffect(() => { scrollTo(0, 0); }, []);

  // Any-ID 자원 로드 (CertifySelf·ExpertCert와 동일 — `shouldLoadAnyIdSdk` 와 일치해야 함)
  useEffect(() => {
    if (!showAnyIdArea) return;
    if (hasLoadedAnyIdRef.current) return;
    hasLoadedAnyIdRef.current = true;
    let cancelWait: (() => void) | null = null;
    ensureAnyIdAssets(false)
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
  }, [showAnyIdArea, t]);

  // #anyidc 마운트 후 LOAD_MODULE 1회 호출 — showAnyIdArea 일 때만
  useEffect(() => {
    if (!showAnyIdArea) return;
    if (!anyIdReady || !window.AnyidC?.LOAD_MODULE) return;
    if (loadModuleCalledRef.current) return;
    loadModuleCalledRef.current = true;

    const prevAdaptor = window.anyidAdaptor;
    window.anyidAdaptor = {
      success: async (data: any) => {
        const ci = data?.res?.ci;
        if (!ci) {
          showAlert(tRef.current('certifySelfFailedReminder') || '인증 정보를 확인할 수 없습니다.');
          return;
        }
        try{
          const info = await dispatchRef.current(getMbrInfo({ linkInfoIdntfId: ci } as MbrInfoPVO)).unwrap();
          console.log("CleanCenterCert.tsx window.anyidAdaptor success getMbrInfo=", info);

          if(!info){
            showAlert(tRef.current('mbrInfoSearchFailed'));
            return;
          }
          else{
            navigateRef.current(redirectTo, {
              state: { cleanCenterCert: { id: info?.mbrId, name: info?.encptMbrFlnm } },
            });
          }
        }catch{
          showAlert(tRef.current('mbrInfoSearchFailed'));
          return;
        }
      },
    };

    const configAnyidcJsonUrl = `${(import.meta.env.BASE_URL || '/').replace(/\/+$/, '/')}config/config.anyidc.json`;
    const txId = `cleanCenterCert-${Date.now()}`;
    const lvl = 3;

    window.AnyidC.LOAD_MODULE({
      cfg: configAnyidcJsonUrl,
      txId,
      tag: txId,
      lvl,
      bypass: 1,
      toggle: false,
      show: false,
      theme: '4.1.0',
      redirect_uri: window.location.href,
      success: (data: any) => {
        void window.anyidAdaptor?.success?.(data)
      },
      fail: (err: any) => {
        console.error(tRef.current('certifySelfFailed'), err);
        showAlert(tRef.current('certifySelfFailedReminder'));
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
                  <Box className="pageCont-idPwFind member-page">
                    <p className="guide-text">{t('cleanCenterCertSelectMethod')}</p>
                    {showAnyIdArea ? (
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
                        <li>{t('cleanCenterCertCaution1')}</li>
                        <li>{t('cleanCenterCertCaution2')}</li>
                        <li>{t('cleanCenterCertCaution3')}</li>
                      </ul>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
