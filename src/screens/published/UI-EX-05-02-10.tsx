import { useMemo, useState } from 'react'
import { Box, Typography, Stack, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox, TextField } from '@mui/material';
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

      .confirmation-sub-title {
        display: block;
        text-align: center;
        font-weight: 700;
        font-size: 18px;
        margin: 20px 0 10px;
        text-decoration: underline;
      }
      .confirmation-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .confirmation-list li {
        margin-bottom: 12px;
        display: flex;
        gap: 8px;
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
                <Button variant="contained" onClick={() => setOpen(true)}>이해관계확인서</Button>

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
                    <Typography component="h3">이해관계확인서</Typography>
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
                    <Typography className="paper-title">이해관계확인서</Typography>
                    <Typography sx={{ mb: 2 }}>
                      본인은 의약품 부작용의 심의ㆍ의결(자문) 등을 함에 있어 다음의 사유가 없음을 확인합니다.
                    </Typography>
                    <Box className="confirmation-desc">
                      <strong className="confirmation-sub-title">다 음</strong>
                      <ul className="confirmation-list">
                        <li>
                          <span>1.</span>
                          <span>본인 또는 본인의 배우자나 배우자였던 사람이 안건의 당사자이거나 그 안건의 당사자(당사자가 법인ㆍ단체 등인 경우에는 그 임원을 포함하며, 이하 같다)와 공동권리자 또는 공동의무자</span>
                        </li>
                        <li>
                          <span>2.</span>
                          <span>본인이 이 안건의 당사자와 친족이거나 과거 친족관계가 존재</span>
                        </li>
                        <li>
                          <span>3.</span>
                          <span>본인이 이 안건에 대하여 자문, 연구, 용역(하도급을 포함한다), 감정(鑑定) 또는 조사를 하였거나 하고 있음</span>
                        </li>
                        <li>
                          <span>4.</span>
                          <span>본인이나 본인이 속한 법인ㆍ단체 등이 이 안건 당사자의 대리인이거나 과거 대리인이었던 사실이 존재</span>
                        </li>
                        <li>
                          <span>5.</span>
                          <span>본인이 임원 또는 직원으로 재직하고 있거나 최근 3년 내에 재직하였던 기업 등이 이 안건에 대하여 자문, 연구, 용역(하도급을 포함한다), 감정 또는 조사를 한 경우가 존재</span>
                        </li>
                      </ul>
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