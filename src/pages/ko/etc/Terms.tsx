/**
 * 화면ID: KIDS-PP-US-CS-01
 * 화면명: 이용약관
 * 화면경로: /etc/Terms
 * 화면설명: 이용약관
 */
import DepsLocation from '@/components/common/DepsLocation'
import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <div className="page notfound">
      <DepsLocation />
      <h2>The page is not contents.</h2>
      <p><Link to="/">Go to Home</Link></p>
    </div>
  )
}
