/*
  Auto-generated by: https://github.com/pmndrs/gltfjsx
  Modified by @andrsdt
*/

import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import { PUBLIC_URL } from '../../consts'
import { Keys } from './Keys'
import { Sustain } from './Pedals'

export type GLTFResult = GLTF & {
  nodes: {
    G7: THREE.Mesh
    F7: THREE.Mesh
    E7: THREE.Mesh
    D7: THREE.Mesh
    C7: THREE.Mesh
    B6: THREE.Mesh
    A6: THREE.Mesh
    G6: THREE.Mesh
    F6: THREE.Mesh
    E6: THREE.Mesh
    D6: THREE.Mesh
    C6: THREE.Mesh
    B5: THREE.Mesh
    A5: THREE.Mesh
    G5: THREE.Mesh
    F5: THREE.Mesh
    E5: THREE.Mesh
    D5: THREE.Mesh
    C5: THREE.Mesh
    B4: THREE.Mesh
    A4: THREE.Mesh
    G4: THREE.Mesh
    F4: THREE.Mesh
    E4: THREE.Mesh
    D4: THREE.Mesh
    C4: THREE.Mesh
    B3: THREE.Mesh
    A3: THREE.Mesh
    G3: THREE.Mesh
    F3: THREE.Mesh
    E3: THREE.Mesh
    D3: THREE.Mesh
    C3: THREE.Mesh
    B2: THREE.Mesh
    A2: THREE.Mesh
    G2: THREE.Mesh
    F2: THREE.Mesh
    E2: THREE.Mesh
    D2: THREE.Mesh
    C2: THREE.Mesh
    B1: THREE.Mesh
    A1: THREE.Mesh
    G1: THREE.Mesh
    F1: THREE.Mesh
    E1: THREE.Mesh
    D1: THREE.Mesh
    C1: THREE.Mesh
    B0: THREE.Mesh
    A0: THREE.Mesh
    ['F#7']: THREE.Mesh
    ['D#7']: THREE.Mesh
    ['C#7']: THREE.Mesh
    ['A#7']: THREE.Mesh
    ['G#7']: THREE.Mesh
    ['F#6']: THREE.Mesh
    ['D#6']: THREE.Mesh
    ['C#6']: THREE.Mesh
    ['A#5']: THREE.Mesh
    ['G#5']: THREE.Mesh
    ['F#5']: THREE.Mesh
    ['D#5']: THREE.Mesh
    ['C#5']: THREE.Mesh
    ['A#4']: THREE.Mesh
    ['G#4']: THREE.Mesh
    ['F#4']: THREE.Mesh
    ['D#4']: THREE.Mesh
    ['C#4']: THREE.Mesh
    ['A#3']: THREE.Mesh
    ['G#3']: THREE.Mesh
    ['F#3']: THREE.Mesh
    ['D#3']: THREE.Mesh
    ['C#3']: THREE.Mesh
    ['A#2']: THREE.Mesh
    ['G#2']: THREE.Mesh
    ['F#2']: THREE.Mesh
    ['D#2']: THREE.Mesh
    ['C#2']: THREE.Mesh
    ['A#1']: THREE.Mesh
    ['G#1']: THREE.Mesh
    ['F#1']: THREE.Mesh
    ['D#1']: THREE.Mesh
    ['C#1']: THREE.Mesh
    ['A#0']: THREE.Mesh
    ['G#6']: THREE.Mesh
    B7: THREE.Mesh
    A7: THREE.Mesh
    ['A#6']: THREE.Mesh
    C8: THREE.Mesh
    felt: THREE.Mesh
    base: THREE.Mesh
    panel: THREE.Mesh
    andrsdt: THREE.Mesh
    ['github-logo']: THREE.Mesh
    ['bar-left']: THREE.Mesh
    ['pedals-base']: THREE.Mesh
    ['bar-right']: THREE.Mesh
    ['pedal-right']: THREE.Mesh
    ['pedal-center']: THREE.Mesh
    ['pedal-left']: THREE.Mesh
    ['sustain-button']: THREE.Mesh
    ['sustain-text']: THREE.Mesh
    ['sustain-led']: THREE.Mesh
    walls: THREE.Mesh
  }
  materials: {
    White: THREE.MeshStandardMaterial
    Black: THREE.MeshStandardMaterial
    Material: THREE.MeshStandardMaterial
    Gray: THREE.MeshStandardMaterial
    Metallic: THREE.MeshStandardMaterial
    Transparent: THREE.MeshPhysicalMaterial
  }
}

export function Piano({ ...props }: JSX.IntrinsicElements['group']) {
  const piano = useRef<THREE.Group>()
  const structure = useRef<THREE.Group>()
  const room = useRef<THREE.Group>()

  const { nodes, materials } = useGLTF(PUBLIC_URL + '/models/piano-draco.glb') as GLTFResult

  return (
    <group
      // @ts-expect-error
      ref={piano}
      {...props}
      dispose={null}>
      <Keys />
      <group
        // @ts-expect-error
        ref={structure}
        {...props}
        dispose={null}>
        <mesh name="felt" geometry={nodes.felt.geometry} material={materials.Material} position={[-116.27, 2.44, -13.68]} scale={[117.38, 1, 1]} />
        <mesh name="base" geometry={nodes.base.geometry} material={materials.Gray} position={[-116.58, -3.17, -1.61]} scale={[118.2, 24.13, -14.22]} />
        <mesh name="panel" geometry={nodes.panel.geometry} material={materials.Gray} position={[-116.85, -43.52, -16.3]} scale={[118.41, 11.41, -1.15]} />
        <mesh name="andrsdt" geometry={nodes.andrsdt.geometry} material={materials.White} position={[-6.24, 5.09, -20.63]} scale={0.9} />
        <mesh name="github-logo" geometry={nodes['github-logo'].geometry} material={materials.White} position={[-20.33, 5.11, -20.46]} scale={13.72} />
        <Sustain />
      </group>
      <group
        // @ts-expect-error
        ref={room}
        {...props}
        dispose={null}>
        <mesh name="walls" geometry={nodes.walls.geometry} material={materials.White} position={[-114.86, -2.49, 129.8]} scale={[173.22, 122.32, 173.22]} />
      </group>
    </group>
  )
}

useGLTF.preload(PUBLIC_URL + 'models/piano-draco.glb')
