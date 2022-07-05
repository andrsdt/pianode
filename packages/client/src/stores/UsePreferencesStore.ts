import type { SetState } from 'zustand'
import create from 'zustand'
// import { devtools } from 'zustand/middleware'

export interface PreferencesState {
  camera: string
  setCamera: (camera: string) => void

  showTrails: boolean
  setShowTrails: (showTrails: boolean) => void

  colorizeKeys: boolean
  setColorizeKeys: (colorizeKeys: boolean) => void

  pianoVelocities: number
  setPianoVelocities: (pianoVelocities: number) => void
}

export const usePreferencesStore = create(
  // devtools(
  (set: SetState<PreferencesState>) => ({
    camera: 'tilted',
    setCamera: (camera: string) => set(() => ({ camera })),

    showTrails: true,
    setShowTrails: (showTrails: boolean) => set(() => ({ showTrails })),

    colorizeKeys: true,
    setColorizeKeys: (colorizeKeys: boolean) => set(() => ({ colorizeKeys })),

    pianoVelocities: 1,
    setPianoVelocities: (pianoVelocities: number) => set(() => ({ pianoVelocities })),
  }),
  // ),
)
