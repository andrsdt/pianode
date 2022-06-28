import { Stats } from '@react-three/drei'
import { CameraSelector } from './CameraSelector'
import { UserList } from './UserList'

export function UserInterface() {
  return (
    <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 1 }}>
      <CameraSelector />
      <UserList />
      <Stats />
    </div>
  )
}
