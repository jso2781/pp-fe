import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page notfound">
      <h2>The page cannot be found.</h2>
      <p><Link to="/">Go to Home</Link></p>
    </div>
  )
}
