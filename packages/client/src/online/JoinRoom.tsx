import { useContext, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { IUser } from 'shared'
import { SocketContext } from '../context/socket'

export function JoinRoom() {
  const socket = useContext(SocketContext)
  const navigate = useNavigate()
  const room = (useParams().roomId || '').substring(0, 4)
  const username = localStorage.getItem('username')
  const colorHue = localStorage.getItem('colorHue') || Math.floor(Math.random() * 360).toString()
  const timestamp = localStorage.getItem('timestamp') || Date.now().toString()
  const hasShownError = useRef(false)

  useEffect(() => {
    const handleResponse = (response: { status: string }) => {
      if (response.status === 'error') navigate('/')
    }

    // Handle socket disconnection
    const handleDisconnect = () => {
      if (!hasShownError.current) {
        toast.error('Lost connection to server')
        hasShownError.current = true
      }
      navigate('/')
    }

    socket.on('disconnect', handleDisconnect)

    // If the user joins directly to the room but does not have a username,
    // redirect to the join screen but store the room in localStorage
    // so that the room can be pre-filled when the user returns to the join screen.
    localStorage.setItem('room', room)

    // Make sure that the user has a name and is in a valid room
    if (!username || !room || !colorHue) {
      navigate('/')
    } else {
      // Check if socket is connected before attempting to join
      if (!socket.connected) {
        if (!hasShownError.current) {
          toast.error((t) => (
            <span>
              Unable to connect to the server.
              <br />
              You can try{' '}
              <a href="/solo" onClick={() => toast.dismiss(t.id)} style={{ color: 'inherit', textDecoration: 'underline' }}>
                solo mode
              </a>{' '}
              in the meantime.
            </span>
          ))
          hasShownError.current = true
        }
        navigate('/')
        return
      }

      const user: IUser = {
        username,
        room,
        colorHue,
      }

      // Important to await the response from the server before the first render,
      // so that the <Online/> component can start listening for messages.
      socket.emit('join_room', { timestamp, user }, handleResponse)
      localStorage.setItem('timestamp', timestamp)
    }

    // Inform the server that the user has left the room
    return () => {
      if (username && socket.connected) socket.emit('leave_room', { room }, handleResponse)
      socket.off('disconnect', handleDisconnect)
      toast.dismiss()
    }
  }, [])
  return null
}
