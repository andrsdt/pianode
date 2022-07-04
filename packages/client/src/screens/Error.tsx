import { Link } from 'react-router-dom'

export function Error() {
  return (
    <div className=" flex flex-col justify-evenly items-center text-center bg-zinc-800 h-screen px-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold text-zinc-50 mb-4">You have found a secret place</h1>
        <p className="text-md text-zinc-300 mb-10">
          Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL.
        </p>
        <a className="font-semibold text-blue-400">
          <Link to="/">Take me back to home page</Link>
        </a>
      </div>
      <img className="h-1/2 object-contain" src="/images/broken-piano.png" />
    </div>
  )
}
