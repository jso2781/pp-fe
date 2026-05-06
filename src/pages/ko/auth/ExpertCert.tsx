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
import { Box, Typography } from '@mui/material';
import { useMemo, useEffect, useRef, useState } from "react";
import { getAnyIdConfigUrl } from '@/lib/anyid/anyidConfig';
import { ensureAnyIdAssets, waitForAnyidC, shouldLoadAnyIdSdk } from '@/lib/anyid/ensureAnyIdAssets';
import { getAnyIdCiFromSsob } from '@/features/auth/AnyIdThunks';
import type { MbrInfoPVO } from '@/features/mbr/MbrInfoTypes';
import { useDialog } from '@/contexts/DialogContext';
import { useAuth } from '@/contexts/AuthContext'

const showAnyIdArea = shouldLoadAnyIdSdk();

export default function ExpertCert() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { showAlert } = useDialog()
  const { lang } = useParams<{ lang: string }>();

  const [anyIdReady, setAnyIdReady] = useState(false);
  const hasLoadedAnyIdRef = useRef(false);
  const loadModuleCalledRef = useRef(false);
  const ciRef = useRef<string | null>(null);
  const { user } = useAuth();

  // URL 파라미터에서 tx, acrValues, redirectUri 추출
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const tx = useMemo(() => {
    // SSO를 쓰는 구조라면 SSO 모듈이 txId를 내려줌(가이드). 없으면 로컬에서 생성.
    return params.get('tx');
  }, [params]);

  /** LoginMethod 등에서 남은 window.anyidAdaptor가 Any-ID 성공 시 /auth/anyid/login을 호출하지 않도록 이 화면 전용으로 덮어씀 */
  const dispatchRef = useRef(dispatch);
  const navigateRef = useRef(navigate);
  const txRef = useRef(tx)
  const tRef = useRef(t);
  useEffect(() => {
    dispatchRef.current = dispatch;
    navigateRef.current = navigate;
    tRef.current = t;
  });

  useEffect(() => { scrollTo(0, 0); }, []);

  // Any-ID 자원 로드 (CertifySelf와 동일)
  useEffect(() => {
    if (!showAnyIdArea) return;
    if (hasLoadedAnyIdRef.current) return;
    hasLoadedAnyIdRef.current = true;
    let cancelWait: (() => void) | null = null;
    ensureAnyIdAssets(false)
      .then(() => {
        cancelWait = waitForAnyidC(
          () => setAnyIdReady(true),
          () => console.warn('[ExpertCert] AnyidC.LOAD_MODULE not ready (timeout)'),
          50,
          40
        );
      })
      .catch((err) => {
        console.error(t('anyIdAssetsLoadFailed'), err);
      });
    return () => { cancelWait?.(); };
  }, [showAnyIdArea, t]);

  const openModal = (message: string) => {
    showAlert(message)
  }

  // #anyidc 마운트 후 LOAD_MODULE 1회 호출 — showAnyIdArea 일 때만
  useEffect(() => {
    if (!showAnyIdArea) return;
    if (!anyIdReady || !window.AnyidC?.LOAD_MODULE) return;
    if (loadModuleCalledRef.current) return;
    loadModuleCalledRef.current = true;

    const prevAdaptor = window.anyidAdaptor;
    window.anyidAdaptor = {
      success: async (data: any) => {
        console.log('[AnyID] log:', data);

        let ci: string | null = null;

        try{
          ci = await dispatchRef.current(getAnyIdCiFromSsob({ ssob: data?.ssob, tag: txRef.current ?? data?.txId })).unwrap();
          ciRef.current = ci ?? null;
          console.log('CertifySelf.tsx window.anyidAdaptor success getAnyIdCiFromSsob ci=', ciRef.current);
        }catch(error){
          // API 호출 실패 시 오류 처리
          console.log('CertifySelf.tsx window.anyidAdaptor success getAnyIdCiFromSsob error=', error);
        }finally{}

        if (!ci) {
          showAlert(tRef.current('certifySelfFailedReminder') || '인증 정보를 확인할 수 없습니다.')
          return;
        }
        try {
          if (user?.userInfo?.linkInfoIdntfId !== ci) {
            showAlert('인증 정보가 일치하지 않습니다.');
            return;
          }

          // FIXME 전문가회원 내업무 페이지 진입을 위한 Any-ID 인증 후처리 이력을 어딘가에 저장 또는, 세션정보 갱신 프로세스 필요 
          // 값 저장
          sessionStorage.setItem('expertCertSuccess', 'true');

          // 페이지 이동
          navigateRef.current('/pp/ko/expert/ExpertMyWork');
        } catch {
          showAlert('내 업무 페이지 조회에 실패했습니다.')
        }
      },
    };

    const configAnyidcJsonUrl = getAnyIdConfigUrl();
    const txId = `exprtCert-${Date.now()}`;
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
        showAlert(tRef.current('certifySelfFailedReminder'))
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
    </>
  );
}
