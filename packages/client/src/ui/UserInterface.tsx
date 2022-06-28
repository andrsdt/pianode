import { Stats } from '@react-three/drei'
import { useContext, useState, useEffect } from 'react'
import { SocketContext } from '../context/socket'
import { PianoState, useStore } from '../store'

export function UserInterface() {
  const setCamera = useStore((state: PianoState) => state.setCamera)
  const socket = useContext(SocketContext)
  const [users, setUsers] = useState([])

  useEffect(() => {
    socket.on('users', (us) => {
      console.log(us)
      setUsers(us)
    })

    return () => {
      socket.off('users')
    }
  }, [socket])

  return (
    <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 1, display: 'flex', flexDirection: 'column' }}>
      <Stats />
      <div>
        <button onClick={() => setCamera('top')}>Top camera</button>
        <button onClick={() => setCamera('tilted')}>Tilted camera</button>
        <button onClick={() => setCamera('side')}>Side camera</button>
      </div>
      <div>
        <p>Users</p>
        <ul>
          {users.map((user) => (
            <li key={user}>{user}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
