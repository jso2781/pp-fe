import { useMemo, useState } from 'react'
import { Box, Typography, Stack, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox, RadioGroup, Radio, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DepsLocation from '@/components/common/DepsLocation'

export default function UI_EX_05_02_09() {
  const [collapsed, setCollapsed] = useState(false)
  
  const [open, setOpen] = useState(true) 

  const sideItems = useMemo(
    () => [
      { key: '/', label: '전문가관리',},
    ],
    [],
  )
  
  return (
    <Box className={`page-layout ${collapsed ? 'is-collapsed' : ''}`}>
      <style>{`
      .modal-title {
        padding: 20px 24px !important;
        border-bottom: 1px solid #e0e0e0;
        position: relative;
        display: flex !important;
        align-items: center;
        justify-content: space-between;
      }
      .modal-title h3 {
        font-weight: 700;
        font-size: 1.25rem;
        line-height: 1.4;
        margin: 0;
      }
      .modal-content {
        padding-top: 24px !important;
        padding-bottom: 24px !important;
      }

      .paper-doc {
        border: 1px solid #ccc;
        padding: 30px;
        background-color: #fff;
        font-size: 15px;
        line-height: 1.8;
        margin-bottom: 24px;
      }
      .paper-title {
        font-size: 28px;    
        font-weight: 700;  
        text-align:center;
        letter-spacing: 2px;  
        position: relative;
        display: block;
        margin-bottom:20px;
        padding-bottom: 8px;
      }
      .paper-title::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        border-bottom: 1px solid #ccc;
        border-top: 1px solid #ccc;
      }

      .pledge-area{
        .all-check-wrap {
          text-align:right;
          background-color: #f1f3f5;
          padding: 15px 20px;
          border-radius: 4px;
          margin-bottom: 20px;
          border: 1px solid #dee2e6;
        }
        .agreement-section {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px dashed #ddd;
        }
        .agreement-section:last-child {
          margin-bottom:0;
          padding-bottom:0;
          border-bottom: none;
        }
        .agreement-text {
          background-color: #f8f9fa;
          padding: 20px;
          border: 1px solid #e9ecef;
          border-radius: 4px;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 12px;
          word-break: keep-all;
        }
        .agree-check{
          justify-content: end;
        }
      }
      /* 서명 영역 */
      .signature-area {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        align-items: end;
        width: 100%;
      }
      .signature-area .date {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 30px;
        word-spacing: 20px;
      }

      .signature-area .sign {
        display: flex;
        align-items: flex-end
        font-size: 16px;
        gap: 8px;
      }
    `}</style>
      <Box className="sub-container">
        <Box className="content-wrap">
          <Box className="sub-content">
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
                {/* --- 본문 시작 --- */}

                {/* 테스트용 버튼 */}
                <Button variant="contained" onClick={() => setOpen(true)}>개인정보보호 등 서약서</Button>

                <Dialog
                  open={open}
                  onClose={() => setOpen(false)}
                  fullWidth
                  maxWidth="lg"
                  classes={{
                      paper: 'modal-lg'
                    }}
                  >
                  <DialogTitle component="div" className="modal-title">
                    <Typography component="h3">개인정보보호 등 서약서</Typography>
                    <IconButton 
                      aria-label="닫기" 
                      className="btn-modal-close" 
                      onClick={() => setOpen(false)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </DialogTitle>
                  <DialogContent 
                    className="modal-content" 
                    sx={{ 
                      maxHeight: '400px', 
                      overflowY: 'auto', 
                    }}
                  >
                    {/* 팝업내용시작 */}
                    <Box className="paper-doc">
                      <Typography className="paper-title">개인정보 보호 등 서약서</Typography>
                      <Box className="pledge-area">
                        <Box className="all-check-wrap">
                          <FormControlLabel
                            control={<Checkbox />}
                            label={<Typography sx={{ fontWeight: 700 }}>전체 동의합니다.</Typography>}
                          />
                        </Box>
                        <Box className="agreement-section">
                          <Box className="agreement-text">
                            본인은 의약품 부작용 심의위원(전문위원)으로 위촉된 기간 중 또는 의약품 부작용 심의위원회(전문위원회)에 참여하는 등으로 알게 된 신청인의 개인정보(주민등록번호 및 민감정보 포함, 이하 같다)에 대하여 그 비밀을 지킬 것을 서약합니다.
                          </Box>
                          <RadioGroup row name="agreement1" className="agree-check">
                            <FormControlLabel value="yes" control={<Radio />} label="동의함" />
                            <FormControlLabel value="no" control={<Radio />} label="동의하지 않음" />
                          </RadioGroup>
                        </Box>
                        <Box className="agreement-section">
                          <Box className="agreement-text">
                            개인정보보호법이 정한 적절한 절차 없이 개인정보를 무단으로 조회, 유출, 사용하지 않을 것을 서약합니다.
                          </Box>
                          <RadioGroup row name="agreement2" className="agree-check">
                            <FormControlLabel value="yes" control={<Radio />} label="동의함" />
                            <FormControlLabel value="no" control={<Radio />} label="동의하지 않음" />
                          </RadioGroup>
                        </Box>
                        <Box className="agreement-section">
                          <Box className="agreement-text">
                            개인정보의 비밀 준수와 개인정보보호를 위한 법적 기준인 개인정보보호법령에 관하여 충분히 설명 받고 숙지하였습니다.
                          </Box>
                          <RadioGroup row name="agreement3" className="agree-check">
                            <FormControlLabel value="yes" control={<Radio />} label="동의함" />
                            <FormControlLabel value="no" control={<Radio />} label="동의하지 않음" />
                          </RadioGroup>
                        </Box>
                        <Box className="agreement-section">
                          <Box className="agreement-text">
                            만약 이러한 서약에도 불구하고 심의, 의결 등 절차상 알게 된 개인정보에 대하여 비밀을 누설하거나 정당한 사유 없이 조회, 유출, 사용할 경우 민, 형사상 제재를 받을 수 있음을 통보받았으며 이러한 제재에 대하여 이의를 제기하지 않을 것을 본인의 자의로 서약합니다.
                          </Box>
                          <RadioGroup row name="agreement4" className="agree-check">
                            <FormControlLabel value="yes" control={<Radio />} label="동의함" />
                            <FormControlLabel value="no" control={<Radio />} label="동의하지 않음" />
                          </RadioGroup>
                        </Box>
                      </Box>
                      <Box className="signature-area">
                        <div className="date">
                          2026년 02월 10일
                        </div>
                        <Box className="signature-info-wrap">
                          <div className="signature-line">
                            <span>성명 :</span>
                            <TextField variant="standard" />
                            <span>(서명)</span>
                          </div>
                        </Box>
                      </Box>
                    </Box>
                    {/* 팝업내용끝 */}
                  </DialogContent>
                  <DialogActions 
                    className="modal-footer" 
                    sx={{ 
                      borderTop: '1px solid #e0e0e0',
                      justifyContent: 'center',
                      paddingBottom: '24px',
                      gap: '8px' 
                    }}
                  >
                    <Button variant="contained" onClick={() => setOpen(false)}>
                      확인
                    </Button>
                    <Button variant="outlined" onClick={() => setOpen(false)}>
                      닫기
                    </Button>
                  </DialogActions>
                </Dialog>
                {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box> 
    </Box>
  )
}