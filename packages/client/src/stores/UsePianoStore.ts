import type { SetState } from 'zustand'
import create from 'zustand'
import { ToneKey } from '../models/piano/Tone'
// import { devtools } from 'zustand/middleware'

export interface PianoState {
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

export const usePianoStore = create(
  // devtools(
  (set: SetState<PianoState>) => ({
    pressedKeys: [] as { key: ToneKey; id: string }[], // Keys currently pressed
    pressKey: (key: ToneKey, id: string) =>
      set((state) => (state.pressedKeys.includes({ key, id }) ? state : { pressedKeys: [...state.pressedKeys, { key, id }] })),
    releaseKey: (note: string, id: string) => set((state) => ({ pressedKeys: state.pressedKeys.filter((k) => !(k.key.note === note && k.id === id)) })),

    replaceKey: (oldNote: string, newKey: ToneKey, id: string) =>
      set((state) => ({ pressedKeys: [...state.pressedKeys].map((k) => (k.key.note === oldNote ? { key: newKey, id } : k)) })),

    isPedalDown: false,
    pressPedal: () => set(() => ({ isPedalDown: true })),
    releasePedal: () => set((state) => ({ isPedalDown: state.isSustainButtonDown })),

    isSustainButtonDown: false,
    toggleSustainButton: () => set((state) => ({ isSustainButtonDown: !state.isSustainButtonDown, isPedalDown: !state.isSustainButtonDown })),
  }),
  // ),
)
