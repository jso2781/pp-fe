/**
 * 화면ID: KIDS-PP-US-CS-01
 * 화면명: 이용약관
 * 화면경로: /etc/Terms
 * 화면설명: 이용약관
 */
import DepsLocation from '@/components/common/DepsLocation';
import RenderTrmsStt from '@/pages/ko/etc/components/RenderTrmsStt';
import { Box } from '@mui/material';

export default function Terms() {
  return (
    <Box>
      <DepsLocation />
      <RenderTrmsStt trmsSttCd='UTZTN' isList={false}/>
    </Box>
  )
}
