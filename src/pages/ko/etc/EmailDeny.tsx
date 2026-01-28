/**
 * 화면ID: KIDS-PP-US-CS-04
 * 화면명: 이메일 무단수집 거부랴
 * 화면경로: /etc/EmailDeny
 * 화면설명: 이메일 무단수집 거부
 */
import DepsLocation from '@/components/common/DepsLocation';
import { getTrmsSttLatest } from '@/features/stt/TrmsSttThunks';
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect } from 'react';
import CleanHtml from '@/components/common/CleanHtml';

export default function EmailDeny() {
  const dispatch = useAppDispatch();
  const { current, loading } = useAppSelector(s => s.stt);
  
  useEffect(() => {
    dispatch(getTrmsSttLatest({ trmsSttCd: 'STT_EML' }));
  }, [dispatch]);
  
  return (
    <div>
      <DepsLocation />
      <CleanHtml html={current?.trmsSttCn} loading={loading}/>
    </div>
  )
}


