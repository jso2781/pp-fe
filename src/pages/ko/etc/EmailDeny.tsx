/**
 * 화면ID: KIDS-PP-US-CS-04
 * 화면명: 이메일 무단수집 거부
 * 화면경로: /etc/EmailDeny
 * 화면설명: 이메일 무단수집 거부
 */
import { getTrmsSttLatest } from '@/features/stt/TrmsSttThunks';
import { useAppDispatch } from '@/store/hooks'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'

export default function EmailDeny() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTrmsSttLatest({ trmsSttCd: 'STT_EML' }));
  }, []);
  return (
    <div className="page notfound">
      <h2>The page is not contents.</h2>
      <p><Link to="/">Go to Home</Link></p>
    </div>
  )
}

