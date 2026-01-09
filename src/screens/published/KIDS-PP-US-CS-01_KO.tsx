import { Box, Button, Checkbox, Stack, TextField, Typography, Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import DepsLocation from "@/components/common/DepsLocation"
import ScreenShell from '../ScreenShell'
export default function KIDS_PP_US_CS_01_KO() {
  // TODO: uiType이 모호합니다. 템플릿/구성을 수정하세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return (
    <ScreenShell screenId="KIDS_PP_US_CS_01_KO" title="고객센터 이용약관 한글" uiType="page">
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
