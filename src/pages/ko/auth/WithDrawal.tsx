/**
 * 화면ID: KIDS-PP-US-JM-10
 * 화면명: 회원탈퇴
 * 화면경로: /ko/auth/WithDrawal
 * 화면설명: KIDS-PP-US-JM-10(회원탈퇴) 반영
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import { useTranslation } from 'react-i18next';
import { updateMbrInfo } from '@/features/mbr/MbrInfoThunks';
import { MbrInfoPVO, UpdateMbrInfoRVO } from '@/features/mbr/MbrInfoTypes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

/**
 * PostgreSQL timestamp without time zone 컬럼에 맞는 형식으로 반환.
 * - toISOString()('2026-01-19T14:28:43.646Z')은 DB에서 varchar로 인식되어 타입 오류 유발.
 * - 'yyyy-MM-dd HH:mm:ss' 형식은 timestamp로 암시 변환 가능.
 */
const toTimestampString = (): string => new Date().toISOString().slice(0, 19).replace('T', ' ');

export default function WithDrawal() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [reason, setReason] = useState('');
  const dispatch = useAppDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value);
  };

  const userInfo = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (!userInfo) navigate('/ko');
  }, [userInfo, navigate]);

  if (!userInfo) return null;

  const handleWithdrawal = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userInfo) return;
    try {
      const now = toTimestampString();
      const mbrInfoPVO: MbrInfoPVO = {
        mbrId: userInfo.mbrId,
        mbrJoinSttsCd: 'W',
        mbrWhdwlDt: now,
        mbrWhdwlRsn: reason
      };

      const result : UpdateMbrInfoRVO = await dispatch(updateMbrInfo(mbrInfoPVO)).unwrap();
      if(result?.updateCnt && result.updateCnt > 0){
        navigate('/ko');
        return;
      }else if(result?.updateCnt && result.updateCnt === 0){
        // openDialog(t('error') || '오류', t('mbrWithdrawalFailed') || '회원탈퇴에 실패했습니다.');
        return;
      }else{
        // openDialog(t('error') || '오류', t('mbrWithdrawalFailed') || '회원탈퇴에 실패했습니다.');
        return;
      }
    }catch(err){
      console.log(t('mbrWithdrawalFailed'), err);
    }finally{
      // navigate('/ko');
      return;
    }
  }

  return (
    <>
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">
            <Box className="sub-content">
              <DepsLocation />
              <Box className="content-view" id="content">
                <Box className="page-content">
                  <Box className="pageCont-withdrawal member-page">
                    <Typography className="guide-text">
                      {t('mbrWithdrawalGuide')}
                    </Typography>

                    <Box className="member-caution-panel">
                      <Typography className="caution-tit">{t('mbrWithdrawalBefore')}</Typography>
                      <Typography className="caution-txt" component="div">
                        {t('mbrWithdrawalBeforeDescription1')}<br />
                        {t('mbrWithdrawalBeforeDescription2')}<br />
                        {t('mbrWithdrawalBeforeDescription3')}
                      </Typography>
                    </Box>

                    <Box className="bordered-box">
                      <Box component="form" noValidate>
                        <Box className="form-group-wrap withdrawal">
                          <FormControl component="fieldset" fullWidth>
                            <FormLabel component="legend" className="form-label">{t('mbrWithdrawalReason')}</FormLabel>
                            <RadioGroup
                              aria-label={t('mbrWithdrawalReasonSelect')}
                              name="withdrawal-reason"
                              value={reason}
                              onChange={handleChange}
                              className="radio-group-custom"
                            >
                              <FormControlLabel
                                value="no-activity"
                                control={<Radio size="small" />}
                                label={t('mbrWithdrawalReasonNoActivity')}
                              />
                              <FormControlLabel
                                value="rare-visit"
                                control={<Radio size="small" />}
                                label={t('mbrWithdrawalReasonRareVisit')}
                              />
                              <FormControlLabel
                                value="no-benefit"
                                control={<Radio size="small" />}
                                label={t('mbrWithdrawalReasonNoBenefit')}
                              />
                              <FormControlLabel
                                value="etc"
                                control={<Radio size="small" />}
                                label={t('mbrWithdrawalReasonEtc')}
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </Box>
                    </Box>

                    <Box className="btn-group between">
                      <Button variant="outline02" size="large" onClick={() => navigate(-1)}>{t('cancel')}</Button>
                      <Button variant="contained" size="large" onClick={handleWithdrawal}>{t('mbrWithdrawalSubmit')}</Button>
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
