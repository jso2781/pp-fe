import { Box, Button, Checkbox, Stack, TextField, Typography, Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import DepsLocation from "@/components/common/DepsLocation"
import ScreenShell from '../ScreenShell'
export default function KIDS_PP_US_CS_01_EN() {
  // TODO: uiType이 모호합니다. 템플릿/구성을 수정하세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return (
    <ScreenShell screenId="KIDS_PP_US_CS_01_EN" title="고객센터 이용약관 영문" uiType="page">
    <div className="page_layout">
      <div className="sub_container">
        <div className="content_wrap">

          {/* sub content :: s */}
          <div className="sub_content">
            <DepsLocation></DepsLocation>
            <div className="content_view" id="content">
              
            </div>
          </div>
          {/* sub content :: e */}
        </div>
      </div>
    </div>
    </ScreenShell>
  )
}
