import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/socket'
import { validate } from 'shared'

import { putToast } from '../ui/toast'

export function Join() {
  const navigate = useNavigate()
  const socket = useContext(SocketContext)

  const [username, setUsername] = useState(sessionStorage.getItem('username') || '')
  const [room, setRoom] = useState(sessionStorage.getItem('room') || '')

  const handleSubmit = () => {
    sessionStorage.setItem('username', username)
    const validations = [validate.room(room), validate.username(username)]
    validations.forEach((v) => !v.isValid && putToast(v.toast))
    if (validations.some((v) => !v.isValid)) return
    navigate(`/rooms/${room}`)
  }

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
      <button id="join-room-button" disabled={!socket.id || !username || !room} onClick={handleSubmit}>
        Join
      </button>
    </div>
  )
}
