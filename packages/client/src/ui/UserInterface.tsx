import { useContext, useEffect, useState } from 'react'
import { IUser } from 'shared'
import { SocketContext } from '../context/socket'
import { Footer } from './Footer'
import { Header } from './Header'

export function UserInterface() {
  const socket = useContext(SocketContext)
  // TODO: the 'users' array is used in more places. Extract to store?
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    socket.on('users', (userList) => {
      setUsers(userList)
    })

    return () => {
      socket.off('users')
    }
  }, [socket])

  return (
    <>
      <Header users={users} />
      <Footer users={users} />
    </>
  )
}
