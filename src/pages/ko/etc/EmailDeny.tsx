/**
 * 화면ID: KIDS-PP-US-CS-04
 * 화면명: 이메일 무단수집 거부
 * 화면경로: /etc/EmailDeny
 * 화면설명: 이메일 무단수집 거부
 */
import DepsLocation from '@/components/common/DepsLocation';
import RenderTrmsStt from '@/pages/ko/etc/components/RenderTrmsStt';
import { Box } from '@mui/material';

export default function EmailDeny() {
  return (
    <Box>
      <DepsLocation />
      <RenderTrmsStt trmsSttCd='STT_EML' isList={false}/>
    </Box>
  )
}