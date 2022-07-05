import { Piano } from '@tonejs/piano'
import { useEffect, useMemo } from 'react'
import { usePrevious } from '../../hooks/UsePrevious'
import { usePianoStore } from '../../stores/UsePianoStore'
import { usePreferencesStore } from '../../stores/UsePreferencesStore'

export interface ToneKey {
  note: string
  velocity: number
}

export function Tone() {
  const velocities = usePreferencesStore((state) => state.pianoVelocities)
  const [pressedKeys, isPedalDown] = usePianoStore((state) => [state.pressedKeys, state.isPedalDown])
  const previousKeys: { key: ToneKey; id: string }[] = usePrevious(pressedKeys) || []

  const keysToPlay = pressedKeys.filter((k) => !previousKeys.includes(k))
  const keysToStop = previousKeys.filter((k) => !pressedKeys.includes(k))

  // TODO: compare performance of useMemo() with defining "tone"
  // outside of the component as it was in the previous version
  const tone = useMemo(() => {
    const toneMemo = new Piano({
      velocities,
      // Increase for more precision when using a MIDI device with weighted keys.
      // Keyboard and mouse controls will only use one velocity
      maxPolyphony: 88,
    })
    toneMemo.toDestination()
    toneMemo.load()
    return toneMemo
  }, [])

  // Update the piano velocities when the user changes them
  useEffect(() => {
    tone.set({ velocities })
    // TODO: need to do .toDestination() and/or .toLoad() here?
  }, [velocities])

  // Play all the new notes that weren't pressed in the previous state
  keysToPlay.forEach((k) => tone.keyDown(k.key))

  // Stop all the notes that were pressed in the previous state and aren't in this one
  keysToStop.forEach((k) => tone.keyUp(k.key))

  // This will be called every time the the [isPedalDown] state changes
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  isPedalDown ? tone.pedalDown() : tone.pedalUp()

  return null
}
