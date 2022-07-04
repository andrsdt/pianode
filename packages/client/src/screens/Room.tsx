import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { colorDefaults, IUser } from 'shared'
import { SocketContext } from '../context/socket'
import { Piano } from '../models/piano/Piano'
import { Online } from '../online/Online'
import { Camera } from '../scene/Camera'
import { PianoState, useStore } from '../store'
import { UserInterface } from '../ui/UserInterface'

export function Room() {
  const socket = useContext(SocketContext)
  const navigate = useNavigate()
  const room = (useParams().roomId || '').substring(0, 4)
  const username = localStorage.getItem('username')
  const colorHue = localStorage.getItem('colorHue') || colorDefaults.h.toString()
  const timestamp = localStorage.getItem('timestamp') || Date.now().toString()

  const [orbitControlsEnabled, setPointerDown, setPointerUp] = useStore((state: PianoState) => [
    state.orbitControlsEnabled,
    state.setPointerDown,
    state.setPointerUp,
  ])

  useEffect(() => {
    const handleResponse = (response: { status: string }) => {
      if (response.status === 'error') navigate('/')
    }

    // If the user joins directly to the room but does not have a username,
    // redirect to the join screen but store the room in localStorage
    // so that the room can be pre-filled when the user returns to the join screen.
    localStorage.setItem('room', room)

    // Make sure that the user has a name and is in a valid room
    if (!username || !room || !colorHue) {
      navigate('/')
    } else {
      const user: IUser = {
        username,
        room,
        colorHue,
      }

      socket.emit('join_room', { timestamp, user }, handleResponse)
      localStorage.setItem('timestamp', timestamp)
    }

    // Inform the server that the user has left the room
    return () => {
      if (username) socket.emit('leave_room', { room }, handleResponse)
      toast.dismiss()
    }
  }, [])

  return (
    <div className="w-full h-screen">
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
          enablePan={true} // TODO: disable
        />
        <ambientLight intensity={1} />
        <directionalLight color="#fcaa44" position={[0, 120, 205]} intensity={2} />
        <Piano />
        <Online room={room} />
      </Canvas>
    </div>
  )
}
