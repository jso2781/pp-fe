/**
 * 화면ID: KIDS-PP-US-CS-03
 * 화면명: 고정형 영상정보처리기기 운영·관리 방침
 * 화면경로: /etc/CctvPolicy
 * 화면설명: 고정형 영상정보처리기기 운영·관리 방침
 */
import DepsLocation from '@/components/common/DepsLocation';
import RenderTrmsStt from '@/pages/ko/etc/components/RenderTrmsStt';
import { Box } from '@mui/material';

export default function CctvPolicy() {
  return (
    <Box>
      <DepsLocation />
      <RenderTrmsStt trmsSttCd='STT_CCTV' isList={true} />
    </Box>
  )
}