import type { SetState } from 'zustand'
import create from 'zustand'
// import { devtools } from 'zustand/middleware'
import { ToneKey } from './models/piano/Tone'

export interface PianoState {
  camera: string
  setCamera: (camera: string) => void

  isPointerDown: boolean
  setPointerDown: () => void
  setPointerUp: () => void

  orbitControlsEnabled: boolean
  enableOrbitControls: () => void
  disableOrbitControls: () => void

  pressedKeys: { key: ToneKey; id: string }[]
  pressKey: (key: ToneKey, id: string) => void
  releaseKey: (note: string, id: string) => void
  replaceKey: (oldKey: string, newKey: ToneKey, id: string) => void

  isPedalDown: boolean
  pressPedal: () => void
  releasePedal: () => void

  isSustainButtonDown: boolean
  toggleSustainButton: () => void
}

export const useStore = create(
  // devtools(
  (set: SetState<PianoState>) => ({
    camera: 'tilted',
    setCamera: (camera: string) => set((_) => ({ camera })),

    isPointerDown: false,
    setPointerDown: () => set((_) => ({ isPointerDown: true })),
    setPointerUp: () => set((_) => ({ isPointerDown: false, orbitControlsEnabled: true })),

    orbitControlsEnabled: true,
    enableOrbitControls: () => set((_) => ({ orbitControlsEnabled: true })),
    disableOrbitControls: () => set((_) => ({ orbitControlsEnabled: false })),

    pressedKeys: [] as { key: ToneKey; id: string }[], // Keys currently pressed
    pressKey: (key: ToneKey, id: string) =>
      set((state) => (state.pressedKeys.includes({ key, id }) ? state : { pressedKeys: [...state.pressedKeys, { key, id }] })),
    releaseKey: (note: string, id: string) => set((state) => ({ pressedKeys: state.pressedKeys.filter((k) => !(k.key.note === note && k.id === id)) })),

    replaceKey: (oldNote: string, newKey: ToneKey, id: string) =>
      set((state) => ({ pressedKeys: [...state.pressedKeys].map((k) => (k.key.note === oldNote ? { key: newKey, id } : k)) })),

    isPedalDown: false,
    pressPedal: () => set((_) => ({ isPedalDown: true })),
    releasePedal: () => set((state) => ({ isPedalDown: state.isSustainButtonDown })),

    isSustainButtonDown: false,
    toggleSustainButton: () => set((state) => ({ isSustainButtonDown: !state.isSustainButtonDown, isPedalDown: !state.isSustainButtonDown })),
  }),
  // ),
)
