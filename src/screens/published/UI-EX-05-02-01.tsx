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
      .document-title {
        font-size: 28px !important;
        font-weight: 700 !important;
        text-align: center;
        letter-spacing: 0.5em; 
        text-indent: 0.5em;  
        position: relative;
        padding-bottom: 15px;
        border-bottom:1px solid #eee;
      }
      .attendance-form {
        font-size: 16px;
        line-height: 1.6;
        padding:30px;
      }
      .info-summary {
        display: flex;
        flex-wrap: wrap;
        padding: 20px;
        background-color: #fcfcfc;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        margin-bottom: 30px;
        gap: 12px 0; /* 행 간격 */
      }

      .info-summary .item {
        width: 50%;
        display: flex;
        align-items: center;
      }

      .info-summary .info-label {
        position: relative;
        font-weight: 700;
        width: 80px;  
        flex-shrink: 0;
        display: flex;
        justify-content: space-between;
        margin-right: 15px;
      }
      .info-summary .info-label::after {
        content: ":";
        margin-left: auto;
      }
      .info-summary .info-text {
        font-weight: 400;
        word-break: keep-all;
      }
      .info-summary .item.full {
        width: 100%;
      }

      .info-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 30px;
      }
      .info-table th, .info-table td {
        border: 1px solid #ccc;
        padding: 10px;
        text-align: left;
      }
      .info-table th {
        background-color: #f2f4f6;
        width: 150px;
        font-weight: 600;
      }
      .info-table .required::before {
        content: '*';
        color: #d32f2f;
        margin-right: 4px;
      }

      /* 안내 및 동의 박스 */
      .notice-box {
        margin-top: 20px;
        padding: 20px;
        border: 1px solid #e0e0e0;
        background-color: #fff;
        margin-bottom: 15px;
      }
      .notice-box h4 {
        margin: 0 0 10px 0;
        font-size: 15px;
        color: #000;
        display: flex;
        justify-content: space-between;
      }
      .notice-box p, .notice-box li {
        font-size: 13px;
        color: #666;
        margin-bottom: 5px;
      }
      .notice-box ul {
        padding-left: 20px;
        margin: 10px 0;
      }

      /* 동의 체크박스 라인 */
      .agree-check-line {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 30px;
        padding-right: 10px;
      }

      /* 하단 서명 영역 */
      .final-signature {
        text-align: center;
        margin-top: 50px;
        padding-top: 20px;
      }
      .final-signature .date {
        font-size: 18px;
        margin-bottom: 25px;
        word-spacing: 15px;
      }
      .final-signature .name-area {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 10px;
        font-size: 16px;
      }
      .final-signature .name-line {
        border-bottom: 1px solid #000;
        width: 150px;
        text-align: center;
        display: inline-block;
      }
      }


    `}</style>
      <Box className="sub-container">
        <Box className="content-wrap">
          <Box className="sub-content">
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
                {/* --- 본문 시작 --- */}

                  <Typography component="h2" className="document-title">참석확인서</Typography>
                  <Box className="attendance-form">
                    <Box className="info-summary">
                      <Box className="item">
                        <span className="info-label">부서명</span> 
                        <span className="info-text">의약품부작용피해구제팀</span>
                      </Box>
                      <Box className="item">
                        <span className="info-label">회의명</span> 
                        <span className="info-text">KARP-00-0-00</span>
                      </Box>
                      <Box className="item">
                        <span className="info-label">일시</span> 
                        <span className="info-text">2026. 02. 09.</span>
                      </Box>
                      <Box className="item">
                        <span className="info-label">장소</span> 
                        <span className="info-text">서면회의</span>
                      </Box>
                    </Box>

                    {/* 참석위원 정보 테이블 */}
                    <table className="info-table">
  <colgroup>
    <col style={{ width: '12%' }} /> {/* 대제목 (참석위원 정보, 금액) */}
    <col style={{ width: '13%' }} /> {/* 항목명 (이름, 자문비 등) */}
    <col style={{ width: '20%' }} /> {/* 입력필드 1 */}
    <col style={{ width: '13%' }} /> {/* 항목명 (주민번호, 급수 등) */}
    <col style={{ width: '20%' }} /> {/* 입력필드 2 */}
    <col style={{ width: '22%' }} /> {/* 우측 비고란 */}
  </colgroup>
  <tbody>
    {/* --- 참석위원 정보 섹션 (4행) --- */}
    <tr>
      <th rowSpan={4} scope="rowgroup">참석위원<br />정보</th>
      <th>*이름</th>
      <td>
        <TextField fullWidth size="small" placeholder="이름 입력" variant="outlined" />
      </td>
      <th>*주민등록번호</th>
      <td colSpan={2}>
        <TextField fullWidth size="small" placeholder="000000-0000000" variant="outlined" />
      </td>
    </tr>
    <tr>
      <th>*은행</th>
      <td>
        <TextField fullWidth size="small" placeholder="은행명" variant="outlined" />
      </td>
      <th>*예금주</th>
      <td colSpan={2}>
        <TextField fullWidth size="small" placeholder="예금주" variant="outlined" />
      </td>
    </tr>
    <tr>
      <th>*계좌번호</th>
      <td colSpan={4}>
        <TextField fullWidth size="small" placeholder="계좌번호 입력 ('-' 제외)" variant="outlined" />
      </td>
    </tr>
    <tr>
      <th>*연락처</th>
      <td colSpan={4}>
        <TextField fullWidth size="small" placeholder="010-0000-0000" variant="outlined" />
      </td>
    </tr>

    {/* --- 금액 섹션 (3행) --- */}
    <tr>
      <th rowSpan={3} scope="rowgroup">금액</th>
      <th>*자문비</th>
      <td>
        <TextField fullWidth size="small" defaultValue="200,000" variant="outlined" disabled />
      </td>
      <th>*급수</th>
      <td>
        <TextField fullWidth size="small" placeholder="호" variant="outlined" />
      </td>
      {/* 우측 교통비 비고란 */}
      <td rowSpan={3} style={{ verticalAlign: 'top', fontSize: '12px', padding: '10px' }}>
        ※ 교통비 지급시 고려사항<br />
        * 서울·수도권을 제외한 지역에서 방문한 경우 별도의 교통비 지급 가능<br />
        (소속 기관에서 교통비를 지급받은 경우 지급 불가)
      </td>
    </tr>
    <tr>
      <th>*원고료</th>
      <td>
        <TextField fullWidth size="small" defaultValue="-" variant="outlined" />
      </td>
      <th>*쪽</th>
      <td>
        <TextField fullWidth size="small" placeholder="P" variant="outlined" />
      </td>
    </tr>
    <tr>
      <th>*합계</th>
      <td colSpan={3}>
        <TextField 
          fullWidth 
          size="small" 
          defaultValue="200,000" 
          variant="outlined" 
          InputProps={{ sx: { fontWeight: 700, color: '#000' } }}
          disabled 
        />
      </td>
    </tr>
  </tbody>
</table>

                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: -2, mb: 4 }}>
                      ※ 서울·수도권을 제외한 지역에서 방문한 경우 별도의 교통비 지급 가능 (소속 기관에서 교통비를 지급받은 경우 지급 불가)
                    </Typography>

                    {/* 안내 및 동의 섹션 */}
                    <Box className="notice-box">
                      <h4>[주민등록번호 수집·이용 안내]</h4>
                      <Typography variant="body2">
                        한국의약품안전관리원은 국세기본법 및 소득세법 관련 규정에 근거해 주민등록번호를 수집·이용함을 고지합니다.
                      </Typography>
                      <ul>
                        <li>1. 수집 목적: 자문비 지급 및 국세청 세무신고</li>
                        <li>2. 보유 기간: 자문회의 종료 후 5년</li>
                      </ul>
                    </Box>

                    <Box className="notice-box">
                      <h4>[개인정보 수집·이용 동의] <Typography component="span" color="primary" variant="body2">[필수]</Typography></h4>
                      <ul>
                        <li>1. 항목: 이름, 연락처, 계좌정보(은행명, 계좌번호, 예금주)</li>
                        <li>2. 목적: 자문비 지급 및 국세청 세무신고</li>
                        <li>3. 보유 기간: 자문회의 종료 후 5년</li>
                      </ul>
                      <Typography variant="caption">※ 동의 거부 시 자문비 지급이 이루어지지 않을 수 있습니다.</Typography>
                    </Box>
                    <Box className="agree-check-line">
                      <FormControlLabel
                        sx={{ alignItems: 'flex-start' }}
                        control={<Checkbox size="small" sx={{ pt: 0 }} />}
                        label={<Typography variant="body2">위의 내용을 읽어보았으며, 내용에 동의합니다.</Typography>}
                      />
                    </Box>

                    <Box className="notice-box">
                      <h4>[개인정보 제3자 제공 동의] <Typography component="span" color="primary" variant="body2">[필수]</Typography></h4>
                      <ul>
                        <li>1. 제공받는 자: 국세청</li>
                        <li>2. 이용목적: 소득세 원천징수, 지급내역 신고 등 세무처리</li>
                        <li>3. 제공항목: 이름, 주민등록번호, 연락처, 계좌정보</li>
                      </ul>
                    </Box>
                    <Box className="agree-check-line">
                      <FormControlLabel
                        sx={{ alignItems: 'flex-start' }}
                        control={<Checkbox size="small" sx={{ pt: 0 }} />}
                        label={<Typography variant="body2">위의 내용을 읽어보았으며, 내용에 동의합니다.</Typography>}
                      />
                    </Box>

                    {/* 최종 서명 섹션 */}
                    <Box className="final-signature">
                      <div className="date">2026년 02월 09일</div>
                      <div className="name-area">
                        위원명 : <span className="name-line">홍길동</span> (서명)
                      </div>
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