import { UserState, useUserStore } from '../stores/UseUserStore'
import { Footer } from './Footer'
import { Header } from './Header'

export function UserInterface() {
  const usersInRoom = useUserStore((state: UserState) => state.usersInRoom)

  return (
    <>
      <Header users={usersInRoom} />
      <Footer users={usersInRoom} />
    </>
  )
}
