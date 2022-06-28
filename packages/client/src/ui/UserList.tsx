import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socket'

export function UserList() {
  const socket = useContext(SocketContext)
  const [users, setUsers] = useState([])

  useEffect(() => {
    socket.on('users', (us) => {
      setUsers(us)
    })

    return () => {
      socket.off('users')
    }
  }, [socket])

  return (
    <div>
      <p>Users</p>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  )
}
