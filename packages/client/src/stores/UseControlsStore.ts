import type { SetState } from 'zustand'
import create from 'zustand'
// import { devtools } from 'zustand/middleware'

export interface ControlsState {
  isPointerDown: boolean
  setPointerDown: () => void
  setPointerUp: () => void
}

export const useControlsStore = create(
  // devtools(
  (set: SetState<ControlsState>) => ({
    isPointerDown: false,
    setPointerDown: () => set(() => ({ isPointerDown: true })),
    setPointerUp: () => set(() => ({ isPointerDown: false })),
  }),
  // ),
)
