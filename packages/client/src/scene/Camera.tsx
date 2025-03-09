import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { Camera as Cam3JS, Vector3 } from 'three'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { usePreferencesStore } from '../stores/UsePreferencesStore'

export function Camera() {
  const currentCamera = usePreferencesStore((state) => state.camera)
  const [cameraZoom] = usePreferencesStore((state) => [state.cameraZoom, state.setCameraZoom])
  const appMode = usePreferencesStore((state) => state.appMode)
  const camera = useRef<Cam3JS>()
  const controls = useRef<OrbitControlsImpl>(null)

  const availableCameras = {
    top: new Vector3(-116, 250, 0),
    tilted: new Vector3(-116, 180, 200),
    side: new Vector3(-268, 6.8, 30),
  }

  const targetPosition = new Vector3(-116, 0, -30)

  // Handle camera type and zoom changes
  useEffect(() => {
    if (!camera.current || !controls.current) return

    // Always start from the base position for the current camera type
    const basePosition = availableCameras[currentCamera as keyof typeof availableCameras]
    camera.current.position.copy(basePosition)
    controls.current.target.copy(targetPosition)

    // Then apply zoom if needed
    if (cameraZoom !== 1) {
      const direction = camera.current.position.clone().sub(targetPosition).normalize()
      const distance = basePosition.distanceTo(targetPosition) * cameraZoom
      const newPosition = targetPosition.clone().add(direction.multiplyScalar(distance))
      camera.current.position.copy(newPosition)
    }
  }, [currentCamera, cameraZoom])

  return (
    <>
      <PerspectiveCamera makeDefault ref={camera} fov={45} />
      <OrbitControls
        ref={controls}
        enableZoom={false}
        enablePan={false}
        enableRotate={appMode === 'camera'}
        minDistance={50}
        maxDistance={500}
        target={targetPosition}
      />
    </>
  )
}
