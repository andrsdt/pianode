import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SocketContext } from '../context/socket'
import { CameraSelector } from './CameraSelector'
import { UserList } from './UserList'

export function UserInterface() {
  const socket = useContext(SocketContext)
  const [users, setUsers] = useState([])
  const [showUserList, setShowUserList] = useState(false)
  const username = sessionStorage.getItem('username')

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
      <header className="absolute w-full p-2 z-10">
        <div className="flex justify-between m-2 py-2 px-1 bg-slate-300 rounded-xl h-12 text-white items-center drop-shadow-lg">
          <CameraSelector />
          <div>
            <button
              type="button"
              className={`m-0.5 py-2 px-2.5  ${
                showUserList ? 'bg-slate-500' : 'bg-slate-400'
              } text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg`}
              onClick={() => setShowUserList(!showUserList)}>
              🟢 {users.length}
            </button>
            <UserList users={users} visible={showUserList} />
          </div>
        </div>
      </header>
      <footer className="absolute bottom-0 m-2 z-10">
        <span className="flex space-x-2">
          <button
            type="button"
            className="py-2 px-2.5 bg-slate-400 hover:bg-slate-500 text-slate-100 transition ease-in duration-100 text-center text-base font-semibold shadow-md rounded-lg">
            <Link to="/join">Leave</Link>
          </button>
          <p className="py-2 px-2.5 bg-slate-400 hover:bg-slate-500 text-slate-100 transition ease-in duration-100 text-center text-base font-semibold shadow-md rounded-lg">
            🟢 {username}
          </p>
        </span>
      </footer>
    </>
  )
}
