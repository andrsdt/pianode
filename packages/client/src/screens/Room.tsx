import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
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
  const room = useParams().roomId
  const username = sessionStorage.getItem('username')
  const timestamp = sessionStorage.getItem('timestamp') || Date.now().toString()

  const [orbitControlsEnabled, setPointerDown, setPointerUp] = useStore((state: PianoState) => [
    state.orbitControlsEnabled,
    state.setPointerDown,
    state.setPointerUp,
  ])

  const handleResponse = (response: { status: string }) => {
    if (response.status === 'error') navigate('/join')
  }

  useEffect(() => {
    // Make sure that the user has a name and is in a valid room
    if (!username || !room) {
      navigate('/join')
    } else {
      socket.emit('join_room', { timestamp, id: socket.id, username, room }, handleResponse)

      sessionStorage.setItem('timestamp', timestamp)
      sessionStorage.setItem('room', room)
    }

    // Inform the server that the user has left the room
    return () => {
      socket.emit('leave_room', { room }, handleResponse)
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
