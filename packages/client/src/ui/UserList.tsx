export function UserList(props: { users: any[]; visible: boolean }) {
  const { users, visible } = props

  return (
    <div
      className={`${
        visible ? 'scale-x-100 right-0' : 'scale-x-0 translate-x-24 right-2'
      } overflow-visible fixed top-24 flex-col rounded-lg -mt-10 mr-1.5 pt-2 pb-1 bg-white w-44 drop-shadow-lg divide-y divide-gray-300 transform transition-all ease-in-out duration-300
     `}>
      <p className="text-gray-500 pb-1 font-semibold px-3 mb-1">Users</p>
      <ul className="flex flex-col divide-y">
        {users.map((user) => (
          <li className="flex py-2 px-3 items-center transition transform " key={user}>
            <p className="bg-[#70eb85] w-4 h-4 rounded-full mt-0.5"></p>
            <p className="pl-1.5 text-gray-600">{user}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
