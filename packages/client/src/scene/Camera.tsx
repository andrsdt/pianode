import { PerspectiveCamera } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { Camera as Cam3JS } from 'three'
import { usePreferencesStore } from '../stores/UsePreferencesStore'

export function Camera() {
  const currentCamera = usePreferencesStore((state) => state.camera)
  const availableCameras = {
    top: [-116, 200, 0],
    tilted: [-116, 140, 160],
    side: [-268, 6.8, 22],
  }

  const camera = useRef()

  useEffect(() => {
    if (!camera.current) return
    const cam = camera.current as Cam3JS
    cam.lookAt(-116, 0, -30)
  }, [currentCamera])

  // TODO: smooth animation between coords
  return (
    <PerspectiveCamera
      makeDefault
      ref={camera}
      // @ts-expect-error it can be assigned
      position={availableCameras[currentCamera as keyof typeof availableCameras]}
      fov={35}
    />
  )
}
