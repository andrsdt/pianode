import { useGLTF } from '@react-three/drei'
import { useEffect, useMemo } from 'react'
import { DoubleSide, Group, Mesh, MeshStandardMaterial } from 'three'
import { usePrevious } from '../../hooks/UsePrevious'
import { usePianoStore } from '../../stores/UsePianoStore'
import { useUserStore } from '../../stores/UseUserStore'
import { GLTFResult } from './Piano'
import { ToneKey } from './Tone'

const isBlackKey = (note: string) => note.includes('#')

export function ColorizeKeys(props: { piano: Group | undefined }) {
  const { materials } = useGLTF('/models/piano-draco.glb') as GLTFResult
  const { piano } = props
  const pianoKeys = piano?.children.find((child) => child.name === 'keys') as Group

  const users = useUserStore((state) => state.usersInRoom)

  const pressedKeys = usePianoStore((state) => state.pressedKeys)
  const previousKeys: { key: ToneKey; id: string }[] = usePrevious(pressedKeys) || []
  const newKeysPlayed = pressedKeys.filter((k) => !previousKeys.includes(k))
  const keysReleased = previousKeys.filter((k) => !pressedKeys.includes(k))

  // Every time a user join/leaves the room, re-compute the materials
  const colorizedMaterials = useMemo(() => {
    const res: { [colorHue: string]: MeshStandardMaterial } = {}
    for (const user of users) {
      res[user.colorHue] = new MeshStandardMaterial({
        color: `hsl(${user.colorHue}, 50%, 70%)`,
        metalness: 0.3,
        roughness: 0.3,
        emissive: '#000',
        emissiveIntensity: 0.5,
        side: DoubleSide,
      })
    }
    return res
  }, [users])

  useEffect(() => {
    newKeysPlayed.forEach((k) => {
      const keyModel = pianoKeys.children.find((child) => child.name === k.key.note) as Mesh
      const colorHue = parseInt(users.find((user) => user.id === k.id)?.colorHue || localStorage.getItem('colorHue') || '0')
      keyModel.material = colorizedMaterials[colorHue]
    })

    keysReleased.forEach((k) => {
      const keyModel = pianoKeys.children.find((child) => child.name === k.key.note) as Mesh
      keyModel.material = isBlackKey(k.key.note) ? materials.Black : materials.White
    })
  }, [pressedKeys])

  return null
}
