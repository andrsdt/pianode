import { Canvas } from '@react-three/fiber'
import { Piano } from '../models/piano/Piano'
import { Camera } from '../scene/Camera'
import { ControlsState, useControlsStore } from '../stores/UseControlsStore'
import { UserInterface } from '../ui/UserInterface'
import { useEffect } from 'react'
import { useUserStore } from '../stores/UseUserStore'

export function SoloRoom() {
  const [setPointerDown, setPointerUp] = useControlsStore((state: ControlsState) => [state.setPointerDown, state.setPointerUp])
  const setUsersInRoom = useUserStore((state) => state.setUsersInRoom)

  useEffect(() => {
    // Set up a single user for solo play
    const username = localStorage.getItem('username') || ''
    const colorHue = localStorage.getItem('colorHue') || '0'
    setUsersInRoom([{
      username,
      colorHue,
      room: 'solo'
    }])

    // Listen for color changes in localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'colorHue' && e.newValue) {
        setUsersInRoom([{
          username,
          colorHue: e.newValue,
          room: 'solo'
        }])
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <div className="w-full h-screen noselect" onPointerUp={setPointerUp} onPointerDown={setPointerDown}>
      <UserInterface />
      <Canvas>
        <Camera />
        <ambientLight intensity={1} />
        <directionalLight color="#fcaa44" position={[0, 120, 205]} intensity={2} />
        <Piano />
      </Canvas>
    </div>
  )
} 