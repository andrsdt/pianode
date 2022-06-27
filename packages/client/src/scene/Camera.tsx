import { PerspectiveCamera } from '@react-three/drei'
import { useStore } from '../store'

export function Camera() {
  const currentCamera = useStore((state) => state.camera)
  const availableCameras = {
    top: [-116, 200, 0],
    tilted: [-116, 140, 160],
    side: [-268, 6.8, 22],
  }

  // TODO: smooth animation between coords
  return <PerspectiveCamera makeDefault position={availableCameras[currentCamera as keyof typeof availableCameras]} fov={40} />
}
