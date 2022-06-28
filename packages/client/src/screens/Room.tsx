import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import axios from '../axios/axios'
import { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SocketContext } from '../context/socket'
import { Piano } from '../models/piano/Piano'
import { Online } from '../online/Online'
import { Camera } from '../scene/Camera'
import { PianoState, useStore } from '../store'
import { UserInterface } from '../ui/UserInterface'

export function Room() {
  const socket = useContext(SocketContext)
  const navigate = useNavigate()

  const [orbitControlsEnabled, setPointerDown, setPointerUp] = useStore((state: PianoState) => [
    state.orbitControlsEnabled,
    state.setPointerDown,
    state.setPointerUp,
  ])

  const username = sessionStorage.getItem('username')
  const room = useParams().roomId

  const handleJoinRoom = async () => {
    if (!socket.id || !username || !room) return false
    // The timestamp of the connection will be used as the user ID
    // This is a bit of a hack, but it works for now
    const timestamp = sessionStorage.getItem('timestamp') ?? Date.now().toString()
    sessionStorage.setItem('timestamp', timestamp)

    // TODO: simplify the code using Acknowledgements
    // https://socket.io/docs/v3/emitting-events/#acknowledgements
    const res = await axios.post('/api/rooms', {
      timestamp,
      id: socket.id,
      username,
      room,
    })

    if (res.status === 201) {
      sessionStorage.setItem('username', username)
      // navigate(`/rooms/${room}`, { replace: true })
      return true
    } else {
      sessionStorage.setItem('timestamp', '')
      sessionStorage.setItem('username', '')
      return false
    }
  }

  const joinIfMissing = async () => {
    const res = await axios.get(`/api/rooms/${room}`)
    if (res.status !== 200) navigate('/join')
    const usersInRoom = res.data
    if (!usersInRoom.includes(username)) {
      // If the connection was successful, subscribe to the room to receive updates
      if (await handleJoinRoom()) socket.emit('join_room', { room })
    }
  }

  useEffect(() => {
    // Make sure that the user has a name
    if (!username || !room) navigate('/join')
    joinIfMissing()

    // Inform the server that the user has left the room
    return () => {
      console.log('leaving screen')
      socket.emit('leave_room', { room })
    }
  }, [])

  return (
    <>
      <UserInterface />
      <Canvas onPointerUp={setPointerUp} onPointerDown={setPointerDown}>
        <Camera />
        <OrbitControls
          enabled={orbitControlsEnabled}
          minAzimuthAngle={-Math.PI / 2}
          maxAzimuthAngle={Math.PI / 2}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          maxDistance={300}
          minDistance={40}
          target={[-116, 0.6, -10.9]}
          enablePan={false}
        />
        <ambientLight intensity={1} />
        <directionalLight color="#fcaa44" position={[0, 120, 205]} intensity={2} />
        <Piano />
        <Online room={room} />
      </Canvas>
    </>
  )
}
