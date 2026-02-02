/**
 * 화면ID: KIDS-PP-US-CS-02
 * 화면명: 개인정보취급방침
 * 화면경로: /etc/PrivacyPolicy
 * 화면설명: 개인정보취급방침
 */
import DepsLocation from '@/components/common/DepsLocation';
import RenderTrmsStt from '@/pages/ko/etc/components/RenderTrmsStt';
import { Box } from '@mui/material';

export default function PrivacyPolicy() {
  return (
    <Box>
      <DepsLocation />
      <RenderTrmsStt trmsSttCd='STT_PRVC' isList={true}/>
    </Box>
  )
}
