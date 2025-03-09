import { animated, useSpring } from '@react-spring/three'
import { PianoState, usePianoStore } from '../../stores/UsePianoStore'

interface Props {
  name: string
  geometry: THREE.BufferGeometry
  material: THREE.MeshStandardMaterial
  position: [x: number, y: number, z: number]
  rotation: [x: number, y: number, z: number]
  scale: [x: number, y: number, z: number]
}

export function Key(props: Readonly<Props>) {
  const { name, geometry, material, scale } = props

  const pos = props.position
  const downPos: Props['position'] = [pos[0], pos[1] - 0.25, pos[2]]

  const rot = props.rotation
  const downRot: Props['rotation'] = [rot[0] + Math.PI / 45, rot[1], rot[2]]

  const isDown = usePianoStore((state: PianoState) => state.pressedKeys.map((k) => k.key.note).includes(name))

  const { position, rotation } = useSpring({
    position: isDown ? downPos : pos,
    rotation: isDown ? downRot : rot,

    config: {
      tension: 200,
      friction: 13,
    },
  })

  return (
    <animated.mesh
      name={name}
      geometry={geometry}
      material={material}
      position={position}
      // @ts-expect-error not assignable
      rotation={rotation}
      scale={scale}
    />
  )
}
