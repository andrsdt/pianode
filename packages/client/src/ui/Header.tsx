import { useState } from 'react'
import { IUser } from 'shared'
import { ModeControls } from './ModeControls'
import { UserList } from './UserList'

export function Header(props: { users: IUser[] }) {
  const { users } = props

  const [showUserList, setShowUserList] = useState(true)

  return (
    <header className="absolute w-full p-2 z-10">
      <div className="flex justify-between m-2 py-2 px-1 bg-slate-300 rounded-xl h-12 text-white items-center drop-shadow-lg">
        <ModeControls />
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
  )
}
