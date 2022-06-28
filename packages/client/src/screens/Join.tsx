import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/socket'

export function Join() {
  const navigate = useNavigate()
  const socket = useContext(SocketContext)

  const [username, setUsername] = useState(sessionStorage.getItem('username') || '')
  const [room, setRoom] = useState(sessionStorage.getItem('room') || '')

  return (
    <div>
      Room
      <input
        type="text"
        id="room-input"
        placeholder="00000"
        inputMode="numeric"
        defaultValue={room}
        onChange={(e) => {
          setRoom(e.target.value)
        }}
      />
      Username
      <input
        type="text"
        id="username-input"
        placeholder="Guest"
        defaultValue={username}
        onChange={(e) => {
          setUsername(e.target.value)
        }}
      />
      <button
        id="join-room-button"
        disabled={!socket.id || !username || !room}
        onClick={() => {
          sessionStorage.setItem('username', username)
          navigate(`/rooms/${room}`)
        }}>
        Join
      </button>
    </div>
  )
}
