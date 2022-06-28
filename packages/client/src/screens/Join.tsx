import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/socket'

export function Join() {
  const navigate = useNavigate()
  const socket = useContext(SocketContext)

  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  return (
    <div>
      Room
      <input
        type="text"
        placeholder="0000"
        id="room-input"
        onChange={(e) => {
          setRoom(e.target.value || '')
        }}
      />
      Username
      <input
        type="text"
        placeholder="Guest"
        id="username-input"
        onChange={(e) => {
          setUsername(e.target.value || '')
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
