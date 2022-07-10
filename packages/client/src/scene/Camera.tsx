import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Camera as Cam3JS, Vector3 } from 'three'
import { usePreferencesStore } from '../stores/UsePreferencesStore'

export function Camera() {
  const currentCamera = usePreferencesStore((state) => state.camera)
  const [cameraChanged, setCameraChanged] = useState(false)

  useEffect(() => {
    setCameraChanged(true)
  }, [currentCamera])

  const availableCameras = {
    top: [-116, 200, 0],
    tilted: [-116, 140, 160],
    side: [-268, 6.8, 22],
  }

  const camera = useRef()

  // On first render, set the camera position to the default one
  useEffect(() => {
    if (!camera.current) return
    const cam = camera.current as Cam3JS
    const [x, y, z] = availableCameras[currentCamera as keyof typeof availableCameras]
    cam.position.set(x, y, z)
    cam.lookAt(-116, 0, -30)
  }, [])

  useFrame(() => {
    // Don't run this useFrame() if the lerp isn't going on
    // to avoid unnecesary computations
    if (!cameraChanged || !camera.current) return
    const cam = camera.current as Cam3JS
    // use LERP TO SET CAMERA POSITION
    const [newX, newY, newZ] = availableCameras[currentCamera as keyof typeof availableCameras]
    cam.position.lerp(new Vector3(newX, newY, newZ), 0.025)
    cam.lookAt(-116, 0, -30)

    // Detect if the camera has reached its destination and stop lerping
    if (Math.abs(cam.position.x - newX) < 0.1 && Math.abs(cam.position.y - newY) < 0.1 && Math.abs(cam.position.z - newZ) < 0.1) {
      setCameraChanged(false)
    }
  })

  return <PerspectiveCamera makeDefault ref={camera} fov={35} />
}
