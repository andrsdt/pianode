import { OrbitControls, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import './App.css'
import { Piano } from './models/piano'
import { Camera } from './scene/Camera'
import { PianoState, useStore } from './store'
import { UserInterface } from './ui/UserInterface'

function App() {
  const [orbitControlsEnabled, setPointerDown, setPointerUp] = useStore((state: PianoState) => [
    state.orbitControlsEnabled,
    state.setPointerDown,
    state.setPointerUp,
  ])

  return (
    <div id="canvas-container">
      <Suspense>
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
          <Stats />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default App
