import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DepsLocation from '@/components/common/DepsLocation'
import ScreenShell from '../ScreenShell'

export default function KIDS_PP_US_JM_10() {
  
  const navigate = useNavigate();
  const [reason, setReason] = useState(''); // 선택된 라디오 값을 저장할 상태

  const handleChange = (event) => {
    setReason(event.target.value); // 라디오 버튼 변경 시 상태 업데이트
  };

  return (
    <ScreenShell screenId="KIDS-PP-US-JM-10" title="회원탈퇴" uiType="form">

      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">
            {/* 서브 콘텐츠 영역 */}
            <Box className="sub-content">
              {/* 상단 현재 위치 정보 */}
              <DepsLocation />
              <Box className="content-view" id="content">
                <Box className="page-content">
                  {/* --- 본문 시작 --- */}
                  
                  <Box className="pageCont-withdrawal member-page">
                    <Typography className="guide-text">
                      회원 탈퇴를 위해 사유를 선택해주세요.
                    </Typography>

                    <Box className="member-caution-panel">
                      <Typography className="caution-tit">회원 탈퇴하기 전에</Typography>
                      <Typography className="caution-txt">
                        회원 탈퇴를 하면 가입 시 입력한 개인정보는 모두 삭제되며 삭제된 데이터는 복구되지 않습니다.<br />
                        탈퇴가 완료된 후에는 회원정보가 삭제되기 때문에 본인 여부를 확인할 수 없습니다.<br />
                        게시글을 임의로 삭제해드릴 수 없으니 삭제해야 할 정보가 있으실 경우 탈퇴 전 삭제하신 후 회원 탈퇴를 진행해주시기 바랍니다.
                      </Typography>
                    </Box>

                    <Box className="bordered-box">
                      <Box component="form" noValidate>
                        <Box className="form-group-wrap withdrawal">
                          <FormControl component="fieldset" fullWidth>
                            <FormLabel component="legend" className="form-label">탈퇴 사유</FormLabel>
                            <RadioGroup
                              aria-label="탈퇴 사유 선택"
                              name="withdrawal-reason"
                              value={reason}
                              onChange={handleChange}
                              className="radio-group-custom"
                            >
                              <FormControlLabel 
                                value="no-activity" 
                                control={<Radio size="small" />} 
                                label="가입 후 활동할 항목이 없어서" 
                              />
                              <FormControlLabel 
                                value="rare-visit" 
                                control={<Radio size="small" />} 
                                label="자주 방문하지 않아서" 
                              />
                              <FormControlLabel 
                                value="no-benefit" 
                                control={<Radio size="small" />} 
                                label="회원으로서 활동할 이유가 없어서" 
                              />
                              <FormControlLabel 
                                value="etc" 
                                control={<Radio size="small" />} 
                                label="기타" 
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </Box>
                    </Box>

                    {/* 하단 버튼 영역 */}
                    <Box className="btn-group between">
                      <Button variant="outline02" size="large" onClick={() => navigate(-1)}>취소하기</Button>
                      <Button variant="contained" size="large">탈퇴하기</Button>
                    </Box>
                  </Box>
                  {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
  
    </ScreenShell>
  )
}
