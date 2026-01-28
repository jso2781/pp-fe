/**
 * 화면ID: KIDS-PP-US-CS-02
 * 화면명: 개인정보취급방침
 * 화면경로: /etc/PrivacyPolicy
 * 화면설명: 개인정보취급방침
 */
import DepsLocation from '@/components/common/DepsLocation'
import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <div className="page notfound">
      <DepsLocation />
      <h2>The page is not contents.</h2>
      <p><Link to="/">Go to Home</Link></p>
    </div>
  )
}
