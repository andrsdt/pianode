import { IUser } from 'shared'
import { Square } from '../components/Square'

function UserListEntry(props: { user: IUser }) {
  const { user } = props

  return (
    <li className="flex py-2 px-3 items-center transition transform" key={user.username}>
      <Square color={{ h: user.colorHue }} />
      <p className="text-gray-600">{user.username}</p>
    </li>
  )
}
export function UserList(props: { users: IUser[]; visible: boolean }) {
  const { users, visible } = props

  return (
    <div
      className={`${
        visible ? 'scale-x-100' : 'scale-x-0 translate-x-24'
      } fixed top-24 right-0 flex-col rounded-lg -mt-10 mr-1.5 pt-2 pb-1 bg-white w-44 drop-shadow-lg divide-y divide-gray-300 transition-transform ease-in-out duration-300`}>
      <p className="text-gray-500 pb-1 font-semibold px-3 mb-1">Users</p>
      <ul className="flex flex-col divide-y">
        {users.map((user) => (
          <UserListEntry user={user} />
        ))}
      </ul>
    </div>
  )
}
