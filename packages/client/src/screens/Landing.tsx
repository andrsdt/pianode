import { Link } from 'react-router-dom'

export function Landing() {
  return (
    <div>
      Pianode is awesome, <Link to="/join">join</Link> a room now!
    </div>
  )
}
