import { useGLTF } from '@react-three/drei'
import { ThreeEvent } from '@react-three/fiber'
import { useContext, useEffect, useRef, useState } from 'react'
import THREE from 'three'
import { SocketContext } from '../../context/socket'
import { Midi } from '../../controls/Midi'
import { usePrevious } from '../../hooks/UsePrevious'
import { ControlsState, useControlsStore } from '../../stores/UseControlsStore'
import { PianoState, usePianoStore } from '../../stores/UsePianoStore'
import { Key } from './Key'
import { GLTFResult } from './Piano'
import { Tone } from './Tone'
import { PreferencesState, usePreferencesStore } from '../../stores/UsePreferencesStore'

export function Keys({ ...props }: JSX.IntrinsicElements['group']) {
  const socketId = useContext(SocketContext).id
  const appMode = usePreferencesStore((state: PreferencesState) => state.appMode)

  const keys = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/models/piano-draco.glb') as GLTFResult

  const [pressedKeyWithMouse, setPressedKeyWithMouse] = useState('')
  const lastPressedKeyWithMouse = usePrevious(pressedKeyWithMouse) || ''

  const [pressKey, releaseKey, replaceKey] = usePianoStore((state: PianoState) => [state.pressKey, state.releaseKey, state.replaceKey])

  const isPointerDown = useControlsStore((state: ControlsState) => state.isPointerDown)

  const handlePointerDown = (e: ThreeEvent<MouseEvent>) => {
    const key = e.object.name
    e.stopPropagation()
    setPressedKeyWithMouse(key)
  }

  const handlePointerOver = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (!isPointerDown) return
    const key = e.object.name
    setPressedKeyWithMouse(key)
  }

  useEffect(() => {
    if (appMode !== 'piano') return
    if (!lastPressedKeyWithMouse && pressedKeyWithMouse) pressKey({ note: pressedKeyWithMouse, velocity: 1 }, socketId)
    if (lastPressedKeyWithMouse && !pressedKeyWithMouse) releaseKey(lastPressedKeyWithMouse, socketId)
    if (lastPressedKeyWithMouse && pressedKeyWithMouse) replaceKey(lastPressedKeyWithMouse, { note: pressedKeyWithMouse, velocity: 1 }, socketId)
  }, [pressedKeyWithMouse, appMode])

  return (
    <>
      <group
        name="keys"
        // @ts-expect-error allow mutable refs
        ref={keys}
        {...props}
        onPointerDown={handlePointerDown}
        onPointerUp={() => setPressedKeyWithMouse('')}
        onPointerOver={handlePointerOver}
        onPointerOut={() => setPressedKeyWithMouse('')}>
        <Key
          name="G7"
          geometry={nodes.G7.geometry}
          material={materials.White}
          position={[-15.6, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="F7"
          geometry={nodes.F7.geometry}
          material={materials.White}
          position={[-20.07, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="E7"
          geometry={nodes.E7.geometry}
          material={materials.White}
          position={[-24.55, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="D7"
          geometry={nodes.D7.geometry}
          material={materials.White}
          position={[-29.02, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="C7"
          geometry={nodes.C7.geometry}
          material={materials.White}
          position={[-33.5, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="B6"
          geometry={nodes.B6.geometry}
          material={materials.White}
          position={[-37.97, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="A6"
          geometry={nodes.A6.geometry}
          material={materials.White}
          position={[-42.45, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="G6"
          geometry={nodes.G6.geometry}
          material={materials.White}
          position={[-46.92, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="F6"
          geometry={nodes.F6.geometry}
          material={materials.White}
          position={[-51.39, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="E6"
          geometry={nodes.E6.geometry}
          material={materials.White}
          position={[-55.87, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="D6"
          geometry={nodes.D6.geometry}
          material={materials.White}
          position={[-60.34, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="C6"
          geometry={nodes.C6.geometry}
          material={materials.White}
          position={[-64.82, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="B5"
          geometry={nodes.B5.geometry}
          material={materials.White}
          position={[-69.29, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="A5"
          geometry={nodes.A5.geometry}
          material={materials.White}
          position={[-73.77, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="G5"
          geometry={nodes.G5.geometry}
          material={materials.White}
          position={[-78.24, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="F5"
          geometry={nodes.F5.geometry}
          material={materials.White}
          position={[-82.71, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="E5"
          geometry={nodes.E5.geometry}
          material={materials.White}
          position={[-87.19, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="D5"
          geometry={nodes.D5.geometry}
          material={materials.White}
          position={[-91.66, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="C5"
          geometry={nodes.C5.geometry}
          material={materials.White}
          position={[-96.14, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="B4"
          geometry={nodes.B4.geometry}
          material={materials.White}
          position={[-100.61, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="A4"
          geometry={nodes.A4.geometry}
          material={materials.White}
          position={[-105.09, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="G4"
          geometry={nodes.G4.geometry}
          material={materials.White}
          position={[-109.56, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="F4"
          geometry={nodes.F4.geometry}
          material={materials.White}
          position={[-114.04, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="E4"
          geometry={nodes.E4.geometry}
          material={materials.White}
          position={[-118.51, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="D4"
          geometry={nodes.D4.geometry}
          material={materials.White}
          position={[-122.98, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="C4"
          geometry={nodes.C4.geometry}
          material={materials.White}
          position={[-127.46, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="B3"
          geometry={nodes.B3.geometry}
          material={materials.White}
          position={[-131.93, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="A3"
          geometry={nodes.A3.geometry}
          material={materials.White}
          position={[-136.41, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="G3"
          geometry={nodes.G3.geometry}
          material={materials.White}
          position={[-140.88, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="F3"
          geometry={nodes.F3.geometry}
          material={materials.White}
          position={[-145.35, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="E3"
          geometry={nodes.E3.geometry}
          material={materials.White}
          position={[-149.83, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="D3"
          geometry={nodes.D3.geometry}
          material={materials.White}
          position={[-154.3, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="C3"
          geometry={nodes.C3.geometry}
          material={materials.White}
          position={[-158.78, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="B2"
          geometry={nodes.B2.geometry}
          material={materials.White}
          position={[-163.25, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="A2"
          geometry={nodes.A2.geometry}
          material={materials.White}
          position={[-167.73, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="G2"
          geometry={nodes.G2.geometry}
          material={materials.White}
          position={[-172.2, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="F2"
          geometry={nodes.F2.geometry}
          material={materials.White}
          position={[-176.68, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="E2"
          geometry={nodes.E2.geometry}
          material={materials.White}
          position={[-181.15, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="D2"
          geometry={nodes.D2.geometry}
          material={materials.White}
          position={[-185.62, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="C2"
          geometry={nodes.C2.geometry}
          material={materials.White}
          position={[-190.1, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="B1"
          geometry={nodes.B1.geometry}
          material={materials.White}
          position={[-194.57, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="A1"
          geometry={nodes.A1.geometry}
          material={materials.White}
          position={[-199.05, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="G1"
          geometry={nodes.G1.geometry}
          material={materials.White}
          position={[-203.52, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="F1"
          geometry={nodes.F1.geometry}
          material={materials.White}
          position={[-208, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="E1"
          geometry={nodes.E1.geometry}
          material={materials.White}
          position={[-212.47, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="D1"
          geometry={nodes.D1.geometry}
          material={materials.White}
          position={[-216.94, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="C1"
          geometry={nodes.C1.geometry}
          material={materials.White}
          position={[-221.42, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="B0"
          geometry={nodes.B0.geometry}
          material={materials.White}
          position={[-225.71, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="A0"
          geometry={nodes.A0.geometry}
          material={materials.White}
          position={[-230.35, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="F#7"
          geometry={nodes['F#7'].geometry}
          material={materials.Black}
          position={[-17.87, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="D#7"
          geometry={nodes['D#7'].geometry}
          material={materials.Black}
          position={[-26.81, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="C#7"
          geometry={nodes['C#7'].geometry}
          material={materials.Black}
          position={[-31.28, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="A#7"
          geometry={nodes['A#7'].geometry}
          material={materials.Black}
          position={[-8.91, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="G#7"
          geometry={nodes['G#7'].geometry}
          material={materials.Black}
          position={[-13.38, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="F#6"
          geometry={nodes['F#6'].geometry}
          material={materials.Black}
          position={[-49.17, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="D#6"
          geometry={nodes['D#6'].geometry}
          material={materials.Black}
          position={[-58.11, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="C#6"
          geometry={nodes['C#6'].geometry}
          material={materials.Black}
          position={[-62.59, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="A#5"
          geometry={nodes['A#5'].geometry}
          material={materials.Black}
          position={[-71.53, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="G#5"
          geometry={nodes['G#5'].geometry}
          material={materials.Black}
          position={[-76, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="F#5"
          geometry={nodes['F#5'].geometry}
          material={materials.Black}
          position={[-80.47, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="D#5"
          geometry={nodes['D#5'].geometry}
          material={materials.Black}
          position={[-89.41, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="C#5"
          geometry={nodes['C#5'].geometry}
          material={materials.Black}
          position={[-93.89, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="A#4"
          geometry={nodes['A#4'].geometry}
          material={materials.Black}
          position={[-102.83, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="G#4"
          geometry={nodes['G#4'].geometry}
          material={materials.Black}
          position={[-107.3, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="F#4"
          geometry={nodes['F#4'].geometry}
          material={materials.Black}
          position={[-111.77, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="D#4"
          geometry={nodes['D#4'].geometry}
          material={materials.Black}
          position={[-120.71, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="C#4"
          geometry={nodes['C#4'].geometry}
          material={materials.Black}
          position={[-125.19, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="A#3"
          geometry={nodes['A#3'].geometry}
          material={materials.Black}
          position={[-134.13, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="G#3"
          geometry={nodes['G#3'].geometry}
          material={materials.Black}
          position={[-138.6, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="F#3"
          geometry={nodes['F#3'].geometry}
          material={materials.Black}
          position={[-143.07, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="D#3"
          geometry={nodes['D#3'].geometry}
          material={materials.Black}
          position={[-152.01, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="C#3"
          geometry={nodes['C#3'].geometry}
          material={materials.Black}
          position={[-156.49, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="A#2"
          geometry={nodes['A#2'].geometry}
          material={materials.Black}
          position={[-165.43, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="G#2"
          geometry={nodes['G#2'].geometry}
          material={materials.Black}
          position={[-169.9, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="F#2"
          geometry={nodes['F#2'].geometry}
          material={materials.Black}
          position={[-174.37, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="D#2"
          geometry={nodes['D#2'].geometry}
          material={materials.Black}
          position={[-183.32, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="C#2"
          geometry={nodes['C#2'].geometry}
          material={materials.Black}
          position={[-187.79, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="A#1"
          geometry={nodes['A#1'].geometry}
          material={materials.Black}
          position={[-196.73, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="G#1"
          geometry={nodes['G#1'].geometry}
          material={materials.Black}
          position={[-201.2, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="F#1"
          geometry={nodes['F#1'].geometry}
          material={materials.Black}
          position={[-205.67, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="D#1"
          geometry={nodes['D#1'].geometry}
          material={materials.Black}
          position={[-214.62, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="C#1"
          geometry={nodes['C#1'].geometry}
          material={materials.Black}
          position={[-219.09, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="A#0"
          geometry={nodes['A#0'].geometry}
          material={materials.Black}
          position={[-228.03, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="G#6"
          geometry={nodes['G#6'].geometry}
          material={materials.Black}
          position={[-44.7, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="B7"
          geometry={nodes.B7.geometry}
          material={materials.White}
          position={[-6.66, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="A7"
          geometry={nodes.A7.geometry}
          material={materials.White}
          position={[-11.13, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
        <Key
          name="A#6"
          geometry={nodes['A#6'].geometry}
          material={materials.Black}
          position={[-40.23, 1.98, -13.33]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.79, 1, 1.04]}
        />
        <Key
          name="C8"
          geometry={nodes.C8.geometry}
          material={materials.White}
          position={[-2.18, 1.98, -13.33]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12.63, 2.5, 2.21]}
        />
      </group>
      <Tone />
      <Midi />
    </>
  )
}
