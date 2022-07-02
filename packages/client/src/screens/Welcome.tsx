import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validate } from 'shared'
import { PinGroup } from '../components/PinGroup'

export function Welcome() {
  const navigate = useNavigate()
  const [username, setUsername] = useState(sessionStorage.getItem('username') || '')
  const [room, setRoom] = useState(sessionStorage.getItem('room') || '')

  const errors = {
    username: validate.username(username),
    room: validate.room(room),
  }
  const submitDisabled = !errors.username.isValid || !errors.room.isValid

  const handleSubmit = () => {
    sessionStorage.setItem('username', username)
    navigate(`/rooms/${room}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !submitDisabled) {
      handleSubmit()
    }

    // Don't write the character if it's not alphanumeric
    if (/[\W]/.test(e.key)) {
      e.preventDefault()
    }
  }

  return (
    <div className="w-full h-screen p-8 md:p-32 bg-zinc-800 text-zinc-100 md:bg-minimalist-keys bg-contain bg-no-repeat bg-right">
      <div className="md:w-1/2 flex flex-col justify-around md:justify-evenly place-items-center md:place-items-start h-full">
        <div className="text-justify mb-8">
          <h1 className="text-8xl font-bold">Pianode</h1>
          <h2 className="pl-1 text-2xl italic">Collaborative piano, made simple.</h2>
        </div>
        <div className="w-[23rem] flex flex-col bg-zinc-700 drop-shadow-2xl rounded-xl p-6 h-min">
          <p className="text-4xl font-semibold self-center">Join a room</p>
          <p className="text-xl self-center mb-8">and start playing right away 🎹</p>
          <div className={!username || errors.username.isValid ? 'mb-10' : 'mb-3'}>
            <input
              className="w-full p-4 rounded-xl bg-zinc-800 text-2xl "
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {username && !errors.username.isValid && <p className="relative text-red-500 font-semibold mt-1">{errors.username.toast.message}</p>}
          </div>
          <PinGroup digits={4} onChange={setRoom} default={room} />
          <button
            id="join-btn"
            className="w-full p-4 rounded-xl transition-color ease-in-out duration-200 disabled:bg-zinc-500 bg-red-600  hover:bg-red-700 font-bold text-3xl shadow-xl"
            onClick={handleSubmit}
            disabled={submitDisabled}>
            Join
          </button>
        </div>
      </div>
    </div>
  )
}
