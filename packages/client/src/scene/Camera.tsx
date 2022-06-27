import { PerspectiveCamera } from '@react-three/drei'
import { Vector3 } from 'three'
import { useStore } from '../store'

export function Camera() {
  const camera = useStore((state) => state.camera)

  const cameras = {
    top: {
      position: [-116, 200, 0],
      fov: 40,
    },
    tilted: {
      position: [-116, 140, 160],
      fov: 40,
    },
    side: {
      position: [-268, 6.8, 22],
      fov: 40,
    },
  }

  // TODO: smooth animation between coords
  const position = cameras[camera as keyof typeof cameras].position
  return <PerspectiveCamera makeDefault position={position as unknown as Vector3} fov={40} />
}
