import { useMemo, useState } from 'react'
import { Box, Typography, Stack, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox, RadioGroup, Radio } from '@mui/material';
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

      .declaration-box {
        border: 1px solid #ccc;
        padding: 30px;
        background-color: #fff;
        color: #333;
        font-size: 15px;
        line-height: 1.8;
        margin-bottom: 24px;
      }

      .declaration-sub-title {
        display: block;
        text-align: center;
        font-weight: 700;
        font-size: 18px;
        margin: 20px 0 10px;
        text-decoration: underline;
      }

      .declaration-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .declaration-list li {
        margin-bottom: 12px;
        display: flex;
        gap: 8px;
      }

      .signature-agreement {
        background-color: #f9f9f9;
        padding: 15px 20px; 
        border: 1px solid #e0e0e0;
        margin-top: 30px;
        display: flex;
        justify-content: center;
      }

      /* 체크박스와 텍스트 라벨 정렬 */
      .signature-agreement .MuiFormControlLabel-root {
        align-items: flex-start !important;
        margin: 0;
        gap: 4px;
      }

      .signature-agreement .MuiCheckbox-root {
        padding: 0;
        margin-top: 2px;
      }

      .signature-area {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }

      .signature-area .date {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 30px;
        word-spacing: 20px;
        color: #000;
      }

      .signature-area .sign {
        display: flex;
        align-items: flex-end
        font-size: 16px;
        gap: 8px;
      }
      .signature-area .sign-line {
        display: inline-block; 
        border-bottom: 1px solid #000;
        width: 150px;   
        margin-bottom: 4px;  
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
                  <Box className="declaration-box">
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      본인은 의약품 부작용의 심의ㆍ의결(자문) 등을 함에 있어 다음의 사유가 없음을 확인합니다.
                    </Typography>

                    <strong className="declaration-sub-title">다 음</strong>
                    <ul className="declaration-list">
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

                    <Box className="signature-agreement">
                      <FormControlLabel
                        control={<Checkbox />}
                        label={
                          <Typography sx={{ fontWeight: 500 }}>
                            본인은 본 동의 표시(전자적 방식 포함)가 자필서명을 갈음하며, 
                            지필서명과 동일한 법적 효력을 갖는 것에 동의합니다.
                          </Typography>
                        }
                      />
                    </Box>
                    <Box className="signature-area">
                      <div className="date">
                        0000년 00월 00일
                      </div>
                      <div className="sign">
                        <span>성명 :</span>
                        <span className="sign-line"></span>
                        <span>(서명)</span>
                      </div>
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