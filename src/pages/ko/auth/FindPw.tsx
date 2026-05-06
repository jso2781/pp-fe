/**
 * 화면ID: KIDS-PP-US-LG-08
 * 화면명: 비밀번호 찾기
 * 화면경로: /ko/auth/FindPw
 * 화면설명: 비밀번호 찾기
 */

import DepsLocation from "@/components/common/DepsLocation";
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMbrInfo } from '@/features/mbr/MbrInfoThunks';
import { useAppDispatch } from '@/store/hooks';
import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from "react";
import { getAnyIdConfigUrl } from '@/lib/anyid/anyidConfig';
import { ensureAnyIdAssets, waitForAnyidC, shouldLoadAnyIdSdk } from '@/lib/anyid/ensureAnyIdAssets';
import type { MbrInfoPVO } from '@/features/mbr/MbrInfoTypes';
import { useDialog } from '@/contexts/DialogContext';
import { getAnyIdCiFromSsob } from "@/features/auth/AnyIdThunks";

const showAnyIdArea = shouldLoadAnyIdSdk();

export default function FindPw() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { showAlert } = useDialog()
  const { lang } = useParams<{ lang: string }>();

  const [anyIdReady, setAnyIdReady] = useState(false);
  const hasLoadedAnyIdRef = useRef(false);
  const loadModuleCalledRef = useRef(false);

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
          () => console.warn('[FindPw] AnyidC.LOAD_MODULE not ready (timeout)'),
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
        const ci = await dispatchRef.current(getAnyIdCiFromSsob({ ssob: data?.ssob, tag: data?.txId })).unwrap();
        console.log("FindPw.tsx window.anyidAdaptor success getAnyIdCiFromSsob ci=", ci);

        if (!ci) {
          showAlert(tRef.current('certifySelfFailedReminder') || '인증 정보를 확인할 수 없습니다.');
          return;
        }
        else{
          const info = await dispatchRef.current(getMbrInfo({ linkInfoIdntfId: ci } as MbrInfoPVO)).unwrap();
          console.log("FindPw.tsx window.anyidAdaptor success getMbrInfo info=", info);

          if(!info){
            showAlert(tRef.current('mbrInfoSearchFailed'));
            return;
          }
          else{
            navigateRef.current('/pp/ko/auth/FindPwModify', {
              state: { mbrNo: info?.mbrNo },
            });
            return;
          }
        }
      },
    };

    const configAnyidcJsonUrl = getAnyIdConfigUrl();
    const txId = `findPw-${Date.now()}`;
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
                    <p className="guide-text">{t('findPwGuide')}</p>
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
                        <li>{t('findPwCaution1')}</li>
                        <li>{t('findPwCaution2')}</li>
                        <li>{t('findPwCaution3')}</li>
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
