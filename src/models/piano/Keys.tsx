import { useGLTF } from '@react-three/drei'
import { ThreeEvent } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import THREE from 'three'
import { Midi } from '../../controls/Midi'
import { PianoState, useStore } from '../../store'
import { usePrevious } from '../../hooks/UsePrevious'
import { Key } from './Key'
import { GLTFResult } from './Piano'
import { Tone } from './Tone'

export function Keys({ ...props }: JSX.IntrinsicElements['group']) {
  const keys = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/models/piano-draco.glb') as GLTFResult

  const [pressedKeyWithMouse, setPressedKeyWithMouse] = useState('')
  const lastPressedKeyWithMouse = usePrevious(pressedKeyWithMouse) || ''

  const [pressKey, releaseKey, replaceKey, isPointerDown, orbitControlsEnabled, disableOrbitControls] = useStore((state: PianoState) => [
    state.pressKey,
    state.releaseKey,
    state.replaceKey,
    state.isPointerDown,
    state.orbitControlsEnabled,
    state.disableOrbitControls,
  ])

  const handlePointerDown = (e: ThreeEvent<MouseEvent>) => {
    const key = e.object.name
    e.stopPropagation()
    disableOrbitControls()
    setPressedKeyWithMouse(key)
  }

  const handlePointerOver = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (!isPointerDown || orbitControlsEnabled) {
      return
    }
    const key = e.object.name
    setPressedKeyWithMouse(key)
  }

  useEffect(() => {
    !lastPressedKeyWithMouse && pressedKeyWithMouse && pressKey({ note: pressedKeyWithMouse, velocity: 1 })
    lastPressedKeyWithMouse && !pressedKeyWithMouse && releaseKey(lastPressedKeyWithMouse)
    lastPressedKeyWithMouse && pressedKeyWithMouse && replaceKey(lastPressedKeyWithMouse, { note: pressedKeyWithMouse, velocity: 1 })
  }, [pressedKeyWithMouse])

  return (
    <>
      <group
        // @ts-expect-error
        ref={keys}
        {...props}
        dispose={null}
        onPointerDown={handlePointerDown}
        onPointerUp={() => setPressedKeyWithMouse('')}
        onPointerOver={handlePointerOver}
        onPointerOut={() => setPressedKeyWithMouse('')}>
        <Key
          name="G7"
          geometry={nodes.G7.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="F7"
          geometry={nodes.F7.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="E7"
          geometry={nodes.E7.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="D7"
          geometry={nodes.D7.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="C7"
          geometry={nodes.C7.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="B6"
          geometry={nodes.B6.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="A6"
          geometry={nodes.A6.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="G6"
          geometry={nodes.G6.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="F6"
          geometry={nodes.F6.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="E6"
          geometry={nodes.E6.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="D6"
          geometry={nodes.D6.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="C6"
          geometry={nodes.C6.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="B5"
          geometry={nodes.B5.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="A5"
          geometry={nodes.A5.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="G5"
          geometry={nodes.G5.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="F5"
          geometry={nodes.F5.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="E5"
          geometry={nodes.E5.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="D5"
          geometry={nodes.D5.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="C5"
          geometry={nodes.C5.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="B4"
          geometry={nodes.B4.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="A4"
          geometry={nodes.A4.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="G4"
          geometry={nodes.G4.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="F4"
          geometry={nodes.F4.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="E4"
          geometry={nodes.E4.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="D4"
          geometry={nodes.D4.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="C4"
          geometry={nodes.C4.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="B3"
          geometry={nodes.B3.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="A3"
          geometry={nodes.A3.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="G3"
          geometry={nodes.G3.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="F3"
          geometry={nodes.F3.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="E3"
          geometry={nodes.E3.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="D3"
          geometry={nodes.D3.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="C3"
          geometry={nodes.C3.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="B2"
          geometry={nodes.B2.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="A2"
          geometry={nodes.A2.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="G2"
          geometry={nodes.G2.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="F2"
          geometry={nodes.F2.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="E2"
          geometry={nodes.E2.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="D2"
          geometry={nodes.D2.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="C2"
          geometry={nodes.C2.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="B1"
          geometry={nodes.B1.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="A1"
          geometry={nodes.A1.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="G1"
          geometry={nodes.G1.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="F1"
          geometry={nodes.F1.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="E1"
          geometry={nodes.E1.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="D1"
          geometry={nodes.D1.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="C1"
          geometry={nodes.C1.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="B0"
          geometry={nodes.B0.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="A0"
          geometry={nodes.A0.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="F#7"
          geometry={nodes['F#7'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="D#7"
          geometry={nodes['D#7'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="C#7"
          geometry={nodes['C#7'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="A#7"
          geometry={nodes['A#7'].geometry}
          material={materials.Black}
          position={[-86.98, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="G#7"
          geometry={nodes['G#7'].geometry}
          material={materials.Black}
          position={[-86.98, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="F#6"
          geometry={nodes['F#6'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="D#6"
          geometry={nodes['D#6'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="C#6"
          geometry={nodes['C#6'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="A#5"
          geometry={nodes['A#5'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="G#5"
          geometry={nodes['G#5'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="F#5"
          geometry={nodes['F#5'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="D#5"
          geometry={nodes['D#5'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="C#5"
          geometry={nodes['C#5'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="A#4"
          geometry={nodes['A#4'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="G#4"
          geometry={nodes['G#4'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="F#4"
          geometry={nodes['F#4'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="D#4"
          geometry={nodes['D#4'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="C#4"
          geometry={nodes['C#4'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="A#3"
          geometry={nodes['A#3'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="G#3"
          geometry={nodes['G#3'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="F#3"
          geometry={nodes['F#3'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="D#3"
          geometry={nodes['D#3'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="C#3"
          geometry={nodes['C#3'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="A#2"
          geometry={nodes['A#2'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="G#2"
          geometry={nodes['G#2'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="F#2"
          geometry={nodes['F#2'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="D#2"
          geometry={nodes['D#2'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="C#2"
          geometry={nodes['C#2'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="A#1"
          geometry={nodes['A#1'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="G#1"
          geometry={nodes['G#1'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="F#1"
          geometry={nodes['F#1'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="D#1"
          geometry={nodes['D#1'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="C#1"
          geometry={nodes['C#1'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="A#0"
          geometry={nodes['A#0'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="G#6"
          geometry={nodes['G#6'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="B7"
          geometry={nodes.B7.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="A7"
          geometry={nodes.A7.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="A#6"
          geometry={nodes['A#6'].geometry}
          material={materials.Black}
          position={[-118.3, 3, -12.2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="C8"
          geometry={nodes.C8.geometry}
          material={materials.White}
          position={[-118.6, 0.6, -10.9]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
      </group>
      <Tone />
      <Midi />
    </>
  )
}
