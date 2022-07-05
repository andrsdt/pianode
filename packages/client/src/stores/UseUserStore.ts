import { IUser } from 'shared'
import type { SetState } from 'zustand'
import create from 'zustand'
// import { devtools } from 'zustand/middleware'

export interface UserState {
  usersInRoom: IUser[]
  setUsersInRoom: (users: IUser[]) => void
}

export const useUserStore = create(
  // devtools(
  (set: SetState<UserState>) => ({
    usersInRoom: [] as IUser[],
    setUsersInRoom: (usersInRoom: IUser[]) => set(() => ({ usersInRoom })),
  }),
  // ),
)
