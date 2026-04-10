/**
 * 화면ID: -
 * 화면명: 자문위원 전환신청
 * 화면경로: /ko/advice/MbcmtApply
 * 화면설명: 자문위원 전환신청 화면 (자격여부 확인 후 신청)
 */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, TextField, CircularProgress, Backdrop } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import DepsLocation from '@/components/common/DepsLocation'
import { useDialog } from '@/contexts/DialogContext'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { exprtAplyChk, updateExprtAprvStts } from '@/features/advice/MbcmtApplyThunks'
import { resetMbcmtApply } from '@/features/advice/MbcmtApplySlice'
import { decrypto } from '@/features/crypto/CryptoThunks'

export default function MbcmtApply() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { showAlertBackdrop } = useDialog()
  const { loading } = useAppSelector((state) => state.mbcmtApply)

  const [qualified, setQualified] = useState<boolean | null>(null)
  const [isApplying, setIsApplying] = useState(false)
  const [decryptedName, setDecryptedName] = useState<string>('')
  const [decryptedPhone, setDecryptedPhone] = useState<string>('')

  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const mbrNo = userInfo?.mbrNo;

  useEffect(() => {
    if (!userInfo?.encptMbrFlnm && !userInfo?.encptMbrTelno) return
    dispatch(decrypto({
      encptMbrFlnm: userInfo.encptMbrFlnm,
      encptMbrTelno: userInfo.encptMbrTelno,
    })).unwrap().then((res) => {
      setDecryptedName(res.decptMbrFlnm ?? '')
      setDecryptedPhone(res.decptMbrTelno ?? '')
    }).catch(() => {})
  }, [userInfo?.encptMbrFlnm, userInfo?.encptMbrTelno])

  /** 자격여부 확인 */
  const handleCheckQualification = async () => {
    try {
      const result = await dispatch(exprtAplyChk({
        mbrNo: mbrNo,
      })).unwrap()

      if (result.resCd === '1') {
        setQualified(true)
      } else if (result.resMsg?.includes('완료')) {
        setQualified(null)
      } else {
        setQualified(false)
      }
      showAlertBackdrop(result.resMsg, '알림')
    } catch (error) {
      showAlertBackdrop('자격여부 확인 중 오류가 발생했습니다.', '알림')
    }
  }

  /** 신청하기 */
  const handleApply = async () => {
    if (qualified === null) {
      showAlertBackdrop('자격여부확인을 먼저 진행해주세요.', '알림')
      return
    }

    setIsApplying(true)
    try {
      await dispatch(updateExprtAprvStts({
        mbrNo: mbrNo,
      })).unwrap()

      showAlertBackdrop('자문위원 전환신청이 완료되었습니다.', '알림', () => {
        navigate('/pp/ko')
      })
    } catch (error) {
      showAlertBackdrop('신청 처리 중 오류가 발생했습니다.', '알림')
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <Box className="page-layout">
      <style>{`
        .advisor-info-box .info-check-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .advisor-info-box .info-check-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .advisor-reg-form {
          display: flex;
          align-items: flex-end;
          gap: 20px;
          flex-wrap: wrap;
        }
        .advisor-reg-form .form-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .MuiDialog-root:not(.common-alert) .MuiDialog-paper {
          max-width: 480px;
        }
      `}</style>
      <Box className="sub-container">
        <Box className="content-wrap">
          <Box className="sub-content">
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">

                {/* --- 안내 영역 --- */}
                <Box className="bordered-box advisor-info-box mb40" sx={{ backgroundColor: '#f8f9fa' }}>
                  <Box className="df fs-20 fw-700 mb20" sx={{ alignItems: 'center', gap: '8px' }}>
                    <DescriptionOutlinedIcon sx={{ fontSize: 24, color: '#555' }} />
                    자문위원 전환신청 시작하기 전에
                  </Box>
                  <Box className="fs-15 txt-3 mb20" sx={{ lineHeight: 1.8, wordBreak: 'keep-all' }}>
                    한국의약품안전관리원의 자문위원으로 활동 중인 전문가의 경우, 자문 시스템 이용을 위해 별도의 전환 신청이 필요합니다.<br />
                    의약품부작용 피해구제 등 자문위원으로 활동 중이신 전문가께서는 원활한 자문 수행을 위해 전환 신청을 진행해 주시기 바랍니다.<br />
                    전환 신청은 자격 요건 확인 절차를 거쳐 승인되며, 승인 후 자문 시스템 이용이 가능합니다.
                  </Box>
                  <Box className="info-check-list">
                    <Box className="info-check-item fs-15 txt-3">
                      <CheckCircleOutlineIcon sx={{ fontSize: 20, color: '#087C80' }} />
                      회원가입 후 로그인 필요
                    </Box>
                    <Box className="info-check-item fs-15 txt-3">
                      <CheckCircleOutlineIcon sx={{ fontSize: 20, color: '#087C80' }} />
                      자문위원 신청자격여부 체크
                    </Box>
                  </Box>
                </Box>

                {/* --- 자문위원 등록요청 --- */}
                <Box className="mb30">
                  <Box className="fs-18 fw-700 mb20 pb10" sx={{ borderBottom: '2px solid var(--color-text-1)' }}>
                    자문위원 등록요청
                  </Box>
                  <Box className="advisor-reg-form">
                    <Box className="form-item" sx={{ minWidth: 200 }}>
                      <span className="fs-14 fw-600">
                        이름 <span className="txt-4 fs-13 ml5">(필수)</span>
                      </span>
                      <TextField
                        size="small"
                        placeholder="이름을 입력해주세요"
                        value={decryptedName}
                        variant="outlined"
                        disabled
                      />
                    </Box>
                    <Box className="form-item" sx={{ minWidth: 220 }}>
                      <span className="fs-14 fw-600">
                        휴대전화번호 <span className="txt-4 fs-13 ml5">(필수)</span>
                      </span>
                      <TextField
                        size="small"
                        placeholder="010-0000-0000"
                        value={decryptedPhone}
                        variant="outlined"
                        disabled
                      />
                    </Box>
                    <button
                      type="button"
                      className="btn_outline"
                      onClick={handleCheckQualification}
                      disabled={loading}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {loading ? '조회중...' : '자격여부확인'}
                    </button>
                    <button
                      type="button"
                      className="btn_default"
                      onClick={handleApply}
                      disabled={qualified !== true || isApplying}
                    >
                      신청하기
                    </button>
                  </Box>
                  {qualified !== null && (
                    <Typography className={`mt10 fs-14 ${qualified ? 'txt-2' : 'txt-4'}`}>
                      {qualified ? '자격이 확인되었습니다. 신청하기를 진행해주세요.' : '자격 요건을 충족하지 않습니다.'}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* 로딩 오버레이 */}
      <Backdrop open={loading || isApplying} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress color="inherit" />
          <Typography color="inherit">{isApplying ? '신청 처리중입니다...' : '조회중입니다...'}</Typography>
        </Box>
      </Backdrop>
    </Box>
  )
}
