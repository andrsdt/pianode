import { animated, config, useSpring } from '@react-spring/three'
import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { PianoState, useStore } from '../../store'
import { GLTFResult } from './Piano'

export function Sustain({ ...props }: JSX.IntrinsicElements['group']) {
  const sustain = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/models/piano-draco.glb') as GLTFResult

  const [toggleSustainButton, isSustainButtonDown, isPedalDown] = useStore((state: PianoState) => [
    state.toggleSustainButton,
    state.isSustainButtonDown,
    state.isPedalDown,
  ])

  const { pedalRightRot } = useSpring({
    pedalRightRot: isPedalDown ? [3.35, 1.48, Math.PI] : [3.12, 1.48, Math.PI],
    config: config.stiff,
  })

  const { sustainButtonPos } = useSpring({
    sustainButtonPos: isSustainButtonDown ? [-225.31, 4.8, -20.43] : [-225.31, 5.17, -20.43],
    config: config.stiff,
  })

  return (
    <group
      name="sustain"
      // @ts-expect-error allow mutable refs
      ref={sustain}
      {...props}
      dispose={null}>
      <mesh name="bar-left" geometry={nodes['bar-left'].geometry} material={materials.Gray} position={[-123.48, -62.77, -20.07]} scale={[1.8, 53.92, 1.8]} />
      <mesh
        name="pedals-base"
        geometry={nodes['pedals-base'].geometry}
        material={materials.Gray}
        position={[-111.58, -117.34, -20.07]}
        scale={[21.27, 6.46, 6.73]}
      />
      <mesh name="bar-right" geometry={nodes['bar-right'].geometry} material={materials.Gray} position={[-100.24, -62.77, -20.07]} scale={[1.8, 53.92, 1.8]} />
      <animated.mesh
        name="pedal-right"
        geometry={nodes['pedal-right'].geometry}
        material={materials.Metallic}
        position={[-102.04, -120.82, -14.62]}
        // Workaround for intentional conversion to [number, number, number]
        rotation={pedalRightRot as unknown as [number, number, number]}
        scale={[2.23, 2.58, 2.93]}
      />
      <mesh
        name="pedal-center"
        geometry={nodes['pedal-center'].geometry}
        material={materials.Metallic}
        position={[-112.27, -120.82, -14.62]}
        rotation={[-0.03, 1.54, 0]}
        scale={[2.22, 2.58, 2.94]}
      />
      <mesh
        name="pedal-left"
        geometry={nodes['pedal-left'].geometry}
        material={materials.Metallic}
        position={[-122.25, -120.82, -14.62]}
        rotation={[-0.03, 1.42, 0]}
        scale={[2.24, 2.58, 2.92]}
      />
      <animated.mesh
        name="sustain-button"
        geometry={nodes['sustain-button'].geometry}
        material={materials.Transparent}
        // @ts-ignore
        position={sustainButtonPos}
        rotation={[0, 0, 0]}
        scale={[2.36, 0.45, 0.57]}
        onClick={toggleSustainButton}
      />
      <mesh name="sustain-text" geometry={nodes['sustain-text'].geometry} material={materials.White} position={[-227.75, 4.99, -21.88]} scale={1.24} />
      <mesh
        name="sustain-led"
        geometry={nodes['sustain-led'].geometry}
        material={isSustainButtonDown ? materials.Material : materials.Transparent}
        position={[-228.68, 5.04, -20.54]}
        scale={[0.33, 0.15, 0.33]}
      />
    </group>
  )
}
