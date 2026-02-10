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
      
      .confirmation-desc {
        margin: 30px 0;
        padding: 0 10px;
        font-size: 18px;
        line-height: 1.8;
        text-align: justify;
        word-break: keep-all; 
      }

      .confirmation-attachment {
        margin-top: 25px;
        font-weight: 700;
        display: block;
        border-left: 4px solid #e0e0e0;
        padding-left: 12px;
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

                <Box className="paper-doc">
                    <Typography className="paper-title">자문위원회 자문확인서</Typography>
                    <Box 
                      className="confirmation-desc"
                      sx={{ 
                        minHeight: '400px',
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        mt: 4, 
                        mb: 6 
                      }}
                    >
                      <p>
                        본인은 「약사법」 제68조의11 제6항 및 「의약품 부작용   피해구제에 관한 규정」(대통령령) 제5조에 따라 위촉된 ‘의약품부작용 전문위원회’ 위원으로서 한국의약품안전관리원장의  요청에 따라 첨부문서와 같이 자문 의견을 제시하였음을 확인합니다. 
                      </p>
                      <p>
                        또한 해당 의견이 의약품부작용 피해구제 심의를 위한 조사  보고서에 첨부되어 제출됨을 동의합니다. 
                      </p>
                      <span className="confirmation-attachment">
                        첨부. 전문위원회 자문의견 1부.
                      </span>
                    </Box>
                    <Box className="signature-area">
                      <div className="date">
                        2026년 02월 10일
                      </div>
                      <Box className="signature-info-wrap">
                        <div className="signature-line">
                          <span>분과 :</span>
                          <TextField variant="standard" />
                        </div>
                        <div className="signature-line">
                          <span>성명 :</span>
                          <TextField variant="standard" />
                          <span>(서명 또는 인)</span>
                        </div>
                      </Box>
                    </Box>
                  </Box>
                
                {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box> 
    </Box>
  )
}