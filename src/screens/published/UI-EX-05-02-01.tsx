import { useMemo, useState } from 'react'
import { Box, Typography, TextField, FormControlLabel, Checkbox, } from '@mui/material';
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

      .attendance-area {
        font-size: 16px;
        line-height: 1.6;

        .attendance-meta-group {
          display: flex;
          flex-wrap: wrap;
          padding: 20px;
          background-color: #fcfcfc;
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          margin-bottom: 30px;
          gap: 12px 0;

          .item {
            width: 50%;
            display: flex;
            align-items: center;

            &.full {
              width: 100%;
            }
          }

          .meta-label {
            position: relative;
            font-weight: 700;
            width: 80px;
            flex-shrink: 0;
            display: flex;
            justify-content: space-between;
            margin-right: 15px;

            &::after {
              content: ":";
              margin-left: auto;
            }
          }

          .meta-data {
            font-weight: 400;
            word-break: keep-all;
          }
        }

        .paper-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;

          th,
          td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: left;
          }

          th {
            background-color: #f2f4f6;
            width: 150px;
            font-weight: 600;
          }
        }

        .ir {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }

        .required::before {
          content: '*';
          color: #d32f2f;
          margin-right: 4px;
          font-weight: bold;
        }

        .unit-input {
          display: flex;
          align-items: center;
          gap: 8px;

          .unit-text {
            font-size: 14px;
            white-space: nowrap;
            flex-shrink: 0;
          }

          .MuiTextField-root {
            flex-grow: 1;
          }
        }

        .amount-field input {
          text-align: center !important;
          font-weight: 700 !important;
        }

        .align-right .MuiInputBase-input {
          text-align: right !important;
          padding-right: 12px !important;
        }

        .agreement-section {
          margin-top: 20px;
          padding: 20px;
          background-color: #f9f9f9;
          border: 1px solid #e0e0e0;
          border-radius: 4px;

          .agreement-title {
            font-size: 16px;
            font-weight: 800 !important;
            margin-bottom: 8px !important;
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .required-tag {
            color: #d32f2f;
            font-weight: 700;
          }

          .agreement-text {
            line-height: 1.7;
            margin-bottom: 12px;
            word-break: keep-all;
          }

          .agree-check {
            display: flex;
            justify-content: flex-end;
            border-top: 1px dashed #d0d0d0;
            padding-top: 10px;
            margin-top: 10px;

            .MuiTypography-root {
              font-weight: 600;
            }
          }
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

                  <Box className="paper-doc">
                    <Typography className="paper-title">참석확인서</Typography>
                    <Box className="attendance-area">
                      <Box className="attendance-meta-group">
                        <Box className="item">
                          <span className="meta-label">부서명</span> 
                          <span className="meta-data">의약품부작용피해구제팀</span>
                        </Box>
                        <Box className="item">
                          <span className="meta-label">회의명</span> 
                          <span className="meta-data">KARP-00-0-00</span>
                        </Box>
                        <Box className="item">
                          <span className="meta-label">일시</span> 
                          <span className="meta-data">2026. 02. 09.</span>
                        </Box>
                        <Box className="item">
                          <span className="meta-label">장소</span> 
                          <span className="meta-data">서면회의</span>
                        </Box>
                      </Box>
                      {/* 참석위원 정보 테이블 */}
                      <table className="paper-table">
                        <colgroup>
                          <col style={{ width: '12%' }} /> 
                          <col style={{ width: '13%' }} />
                          <col style={{ width: '20%' }} />
                          <col style={{ width: '13%' }} /> 
                          <col style={{ width: '20%' }} />
                          <col style={{ width: '22%' }} /> 
                        </colgroup>
                        <tbody>
                          <tr>
                            <th rowSpan={4} scope="rowgroup">참석위원<br />정보</th>
                            <th><span className="required"><span className="ir">필수입력</span></span>이름</th>
                            <td>
                              <TextField fullWidth size="small" placeholder="이름" variant="outlined" />
                            </td>
                            <th><span className="required"><span className="ir">필수입력</span></span>주민등록번호</th>
                            <td colSpan={2}>
                              <TextField fullWidth size="small" placeholder="000000-0000000" variant="outlined" />
                            </td>
                          </tr>
                          <tr>
                            <th><span className="required"><span className="ir">필수입력</span></span>은행</th>
                            <td>
                              <TextField fullWidth size="small" placeholder="은행명" variant="outlined" />
                            </td>
                            <th><span className="required"><span className="ir">필수입력</span></span>예금주</th>
                            <td colSpan={2}>
                              <TextField fullWidth size="small" placeholder="예금주" variant="outlined" />
                            </td>
                          </tr>
                          <tr>
                            <th><span className="required"><span className="ir">필수입력</span></span>계좌번호</th>
                            <td colSpan={4}>
                              <TextField fullWidth size="small" placeholder="계좌번호" variant="outlined" />
                            </td>
                          </tr>
                          <tr>
                            <th><span className="required"><span className="ir">필수입력</span></span>연락처</th>
                            <td colSpan={4}>
                              <TextField fullWidth size="small" placeholder="010-0000-0000" variant="outlined" />
                            </td>
                          </tr>
                          <tr>
                            <th rowSpan={3} scope="rowgroup">금액</th>
                            <th><span className="required"><span className="ir">필수입력</span></span>자문비</th>
                            <td>
                              <TextField fullWidth size="small" defaultValue="200,000" variant="outlined" className="amount-field" />
                            </td>
                            <th><span className="required"><span className="ir">필수입력</span></span>급수</th>
                            <td>
                              <div className="unit-input">
                                <TextField fullWidth size="small" placeholder="호" variant="outlined" className="align-right" />
                                <span className="unit-text">호</span>
                              </div>
                            </td>
                            <td rowSpan={3} className="remark-cell" style={{ verticalAlign: 'top', fontSize: '13px', padding: '10px' }}>
                              <p>※ 교통비 지급시 고려사항</p>
                              <p>• 서울·수도권을 제외한 지역에서 방문한 경우 별도의 교통비 지급 가능</p>
                              <p>• 소속 기관에서 교통비를 지급받은 경우 지급 불가</p>
                            </td>
                          </tr>
                          <tr>
                            <th><span className="required"><span className="ir">필수입력</span></span>원고료</th>
                            <td>
                              <TextField fullWidth size="small" defaultValue="-" variant="outlined" className="align-right" />
                            </td>
                            <th><span className="required"><span className="ir">필수입력</span></span>쪽</th>
                            <td>
                              <div className="unit-input">
                                <TextField fullWidth size="small" placeholder="P" variant="outlined" className="align-right" />
                                <span className="unit-text">쪽</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th><span className="required"><span className="ir">필수입력</span></span>합계</th>
                            <td colSpan={3}>
                              <TextField 
                                className="amount-field"
                                fullWidth 
                                size="small" 
                                defaultValue="200,000" 
                                variant="outlined" 
                                slotProps={{
                                  input: {
                                    sx: { textAlign: 'center', fontWeight: 700 }
                                  }
                                }}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <Typography display="block" sx={{ mt: -2, mb: 4 }}>
                        ※ 서울·수도권을 제외한 지역에서 방문한 경우 별도의 교통비 지급 가능 (소속 기관에서 교통비를 지급받은 경우 지급 불가)
                      </Typography>
                      {/* --- 주민등록번호 수집 안내 --- */}
                      <Box className="agreement-section">
                        <Typography className="agreement-title">[주민등록번호 수집·이용 안내]</Typography>
                        <Box className="agreement-text">
                          <p>한국의약품
                            안전관리원(이하 “의약품안전원”)은 자문비 지급 및 관련 세무업무 처리를 위하여 국세기본법 제85조의 3(장부 등의 비치와 보존), 소득세법 제164조(지급명세서의 제출), 동법 시행령 제213조(지급명세서 등의 제출) 및 동법 시행규칙 제100조(일반서식) 에 근거해 주민등록번호를 수집·이용 함을 고지합니다.
                          </p>
                          <ul className="policy-list">
                            <li><strong>1. 수집 목적:</strong> 자문비 지급 및 국세청 세무신고</li>
                            <li><strong>2. 보유 기간:</strong> <strong>자문회의 종료 후 5년</strong></li>
                          </ul>
                        </Box>
                      </Box>
                      {/* --- 개인정보 수집·이용 동의 --- */}
                      <Box className="agreement-section">
                        <Typography className="agreement-title">
                          [개인정보 수집·이용 동의] <span className="required-tag">[필수]</span>
                        </Typography>
                        <Box className="agreement-text">
                          <ul className="policy-list">
                            <li><strong>1. 수집하는 개인정보 항목:</strong> 이름, 연락처, 계좌정보(은행명, 계좌번호, 예금주)</li>
                            <li><strong>2. 수집 목적:</strong> 자문비 지급 및 국세청 세무신고</li>
                            <li><strong>3. 보유 기간:</strong> <strong>자문회의 종료 후 5년</strong></li>
                            <li><strong>4. 동의 거부 권리:</strong> 상기 정보 수집에 대하여 동의하지 않을 수 있으나, 동의하지 않을시 자문비 지급이 이루어지지 않을 수 있습니다.</li>
                          </ul>
                        </Box>
                        <Box className="agree-check">
                          <FormControlLabel
                            control={<Checkbox size="small" />}
                            label="위의 내용을 읽어보았으며, 내용에 동의합니다."
                          />
                        </Box>
                      </Box>
                      {/* --- 제3자 제공 동의 --- */}
                      <Box className="agreement-section">
                        <Typography className="agreement-title">
                          [개인정보 제3자 제공 동의] <span className="required-tag">[필수]</span>
                        </Typography>
                        <Box className="agreement-text">
                          <ul className="policy-list">
                            <li><strong>1. 개인정보를 제공받는 자:</strong> 국세청</li>
                            <li><strong>2. 개인정보를 제공받는 자의 개인정보 이용목적:</strong> <strong>소득세 원천징수, 지급내역 신고 등 세무처리</strong></li>
                            <li><strong>3. 제공하는 개인정보의 항목:</strong> 이름, 주민등록번호, 연락처, 계좌정보(은행명, 계좌번호, 예금주)</li>
                            <li><strong>4. 개인정보를 제공받는 자의 개인정보 보유 및 이용기간:</strong> <strong>국세청 소관 법령에 따른 보유·이용 기간까지</strong></li>
                            <li><strong>5. 동의 거부 권리:</strong> 상기 정보 제공에 대하여 동의하지 않을 수 있으나, 동의하지 않을시 자문비 지급이 이루어지지 않을 수 있습니다.</li>
                          </ul>
                        </Box>
                        <Box className="agree-check">
                          <FormControlLabel
                            control={<Checkbox size="small" />}
                            label="위의 내용을 읽어보았으며, 내용에 동의합니다."
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box className="signature-area">
                      <div className="date">
                        2026년 02월 10일
                      </div>
                      <Box className="signature-info-wrap">
                        <div className="signature-line">
                          <span>위원명 :</span>
                          <TextField variant="standard" />
                          <span>(서명)</span>
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