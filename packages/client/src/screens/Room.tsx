import { Canvas } from '@react-three/fiber'
import { Piano } from '../models/piano/Piano'
import { SocketManager } from '../online/SocketManager'
import { Camera } from '../scene/Camera'
import { ControlsState, useControlsStore } from '../stores/UseControlsStore'
import { UserInterface } from '../ui/UserInterface'

export function Room() {
  const [setPointerDown, setPointerUp] = useControlsStore((state: ControlsState) => [state.setPointerDown, state.setPointerUp])

  return (
    <div className="w-full h-screen" onPointerUp={setPointerUp} onPointerDown={setPointerDown}>
      <SocketManager />
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
