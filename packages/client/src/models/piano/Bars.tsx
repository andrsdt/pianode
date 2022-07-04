import { useFrame } from '@react-three/fiber'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { colorDefaults, IUser } from 'shared'
import { BoxBufferGeometry, Group, Mesh, MeshStandardMaterial } from 'three'
import { SocketContext } from '../../context/socket'
import { PianoState, useStore } from '../../store'

const SECONDS_VISIBLE = 10 * 1000 // How long the bars are is visible since the moment the key is released
const BAR_SPEED = 0.2 // How fast the bars move

interface IBar {
  startMoment: number
  endMoment?: number
  keyModel: Mesh
  isActive: boolean
  colorHue: number
}

const isBlackKey = (note: string) => note.includes('#')

function Bar(props: { keyModel: Mesh; isActive: boolean; colorHue: number }) {
  const { keyModel, isActive } = props
  const { s, l } = colorDefaults
  const h = props.colorHue

  const mesh = useRef()
  // Creating objects in three.js can be computationally expensive. Use useMemo() to cache
  // the objects and avoid creating them again if they haven't changed.
  // https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls
  const geom = useMemo(() => new BoxBufferGeometry(0.8, 0.1, keyModel.scale.z * 2), [])
  const matLight = useMemo(() => new MeshStandardMaterial({ color: `hsl(${h}, ${s}%, ${l}%)` }), [])
  const matDark = useMemo(() => new MeshStandardMaterial({ color: `hsl(${h}, ${s}%, ${l - 10}%)` }), [])

  // This reference will give us direct access to the mesh
  // Set up state for the hovered and active state
  // Subscribe this component to the render-loop, rotate the mesh every frame

  // TODO: may the useFrame affect the entire group of keys. It could be more
  // performant since only the position of the group is updated
  useFrame(() => {
    if (!mesh.current) return
    const current = mesh.current as Mesh
    current.position.y += isActive ? BAR_SPEED / 5 : BAR_SPEED / 2.45
    if (isActive) current.scale.y += BAR_SPEED * 4
  })

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      // @ts-expect-error allow mutable refs
      ref={mesh}
      position={[keyModel.position.x, 2, keyModel.position.z - (isBlackKey(keyModel.name) ? 0 : 0.35)]}
      rotation={[0, Math.PI / 2, 0]}
      geometry={geom}
      material={isBlackKey(keyModel.name) ? matDark : matLight}
    />
  )
}

export function Bars(props: { piano: Group }) {
  const { piano } = props
  const pianoKeys = piano.children.find((child) => child.name === 'keys') as Group
  const [bars, setBars] = useState<IBar[]>([])
  const [pressedKeys, camera] = useStore((state: PianoState) => [state.pressedKeys, state.camera])

  // TODO: the 'users' array is used in more places. Extract to store?
  const socket = useContext(SocketContext)
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    socket.on('users', (userList) => {
      // FIXME: right now, this is only updated when the user list changes or when the user manually changes his/her color inside a room.
      // Therefore, the lines will be drawn red since `users`  is an empty list.
      // A solution would be to handle the user list via a store, and update such a store on receiving 'users' messages
      setUsers(userList)
    })

    return () => {
      socket.off('users')
    }
  }, [socket])

  useEffect(() => {
    // Copy the current state of bars
    const newBars = [...bars]

    // ADD NEW BARS TO THE LIST
    //For each key in pressedKeys, check if there is not a bar for that key
    // with property isActive set to true. If there is not, create a new bar and add it to the list.
    pressedKeys.forEach((k) => {
      const keyModel = pianoKeys.children.find((child) => child.name === k.key.note) as Mesh
      const colorHue = parseInt(users.find((user) => user.id === k.id)?.colorHue || sessionStorage.getItem('colorHue') || '0')
      const newBar = { startMoment: Date.now(), keyModel, isActive: true, colorHue }
      newBars.push(newBar)
    })

    newBars.forEach((bar) => {
      // SET ISACTIVE TO FALSE FOR BARS THAT ARE NOT BEING PRESSED ANYMORE
      // For each active bar in bars, check if the key is in pressedKeys. If not, set isActive to false.
      if (!pressedKeys.find((k) => bar.isActive && k.key.note === bar.keyModel.name)) {
        bar.isActive = false
        if (!bar.endMoment) bar.endMoment = Date.now()
      }

      // CLEAN THOSE BARS THAT ARE NOT VISIBLE ANYMORE
      // Necessary so that we don't render bars that are not visible anymore,
      // since they end up slowing down the rendering
      if (bar.endMoment && bar.endMoment + SECONDS_VISIBLE < Date.now()) newBars.splice(newBars.indexOf(bar), 1)
    })

    setBars(newBars)

    // Eliminate all the bars on component unmount
    return () => {
      setBars([])
    }
  }, [pressedKeys])

  // If using top camera, the bars should be rendered on the top of the piano and moving outwards
  const isTopCamera = camera === 'top'

  return (
    <group position={isTopCamera ? [0, 18.6, -11.5] : [0, 0, 0]} rotation={isTopCamera ? [-Math.PI / 2, 0, 0] : [0, 0, 0]}>
      {bars.map((b) => (
        // TODO: change the unique key to be somethig more meaningful
        <Bar key={`${b.keyModel.name} ${b.startMoment}`} keyModel={b.keyModel} isActive={b.isActive} colorHue={b.colorHue} />
      ))}
    </group>
  )
}
