import type { SetState } from 'zustand'
import create from 'zustand'
import { persist } from 'zustand/middleware'
// import { devtools } from 'zustand/middleware'

export interface PreferencesState {
  camera: string
  setCamera: (camera: string) => void

  cameraZoom: number
  setCameraZoom: (zoom: number) => void

  appMode: 'camera' | 'piano'
  setAppMode: (mode: 'camera' | 'piano') => void

  showTrails: boolean
  setShowTrails: (showTrails: boolean) => void

  colorizeKeys: boolean
  setColorizeKeys: (colorizeKeys: boolean) => void

  pianoVelocities: number
  setPianoVelocities: (pianoVelocities: number) => void
}

export const usePreferencesStore = create(
  persist(
    // devtools(
    (set: SetState<PreferencesState>): PreferencesState => ({
      camera: 'tilted',
      setCamera: (camera: string) => set(() => ({ camera })),

      cameraZoom: 1,
      setCameraZoom: (cameraZoom: number) => set(() => ({ cameraZoom })),

      appMode: 'piano',
      setAppMode: (appMode: 'camera' | 'piano') => set(() => ({ appMode })),

      showTrails: true,
      setShowTrails: (showTrails: boolean) => set(() => ({ showTrails })),

      colorizeKeys: true,
      setColorizeKeys: (colorizeKeys: boolean) => set(() => ({ colorizeKeys })),

      pianoVelocities: 1,
      setPianoVelocities: (pianoVelocities: number) => set(() => ({ pianoVelocities })),
    }),
    // ),
  ),
)
