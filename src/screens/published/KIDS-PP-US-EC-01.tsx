import React from 'react'
import { Alert, Box, Button, Checkbox, Divider, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import DepsLocation from "@/components/common/DepsLocation"
import ScreenShell from '../ScreenShell'

export default function KIDS_PP_US_EC_01() {
  // TODO: uiType이 모호합니다. 템플릿/구성을 수정하세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
  }

  return (
    <ScreenShell screenId="KIDS-PP-US-EC-01" title="전문가 회원 전환 신청 소속선택 로그인 방식 선택" uiType="form">
      <div className="page-layout">
        <div className="sub-container">
          <div className="content-wrap">
  
            {/* sub content :: s */}
            <div className="sub-content">
              <DepsLocation></DepsLocation>
              <div className="content-view" id="content">
                
              </div>
            </div>
            {/* sub content :: e */}
          </div>
        </div>
      </div>
    </ScreenShell>
  )
}
