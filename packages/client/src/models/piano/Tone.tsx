import { Piano } from '@tonejs/piano'
import { usePrevious } from '../../hooks/UsePrevious'
import { useStore } from '../../store'

export interface ToneKey {
  note: string
  velocity: number
}

const tone = new Piano({
  velocities: 1,
  // Increase for more precision when using a MIDI device with weighted keys.
  // Keyboard and mouse controls will only use one velocity
})

tone.toDestination()

tone.load()

export function Tone() {
  const [pressedKeys, isPedalDown] = useStore((state) => [state.pressedKeys, state.isPedalDown])
  const previousKeys: { key: ToneKey; id: string }[] = usePrevious(pressedKeys) || []

  const keysToPlay = pressedKeys.filter((k) => !previousKeys.includes(k))
  const keysToStop = previousKeys.filter((k) => !pressedKeys.includes(k))
  // Play all the new notes that weren't pressed in the previous state
  keysToPlay.forEach((k) => tone.keyDown(k.key))

  // Stop all the notes that were pressed in the previous state and aren't in this one
  keysToStop.forEach((k) => tone.keyUp(k.key))

  // This will be called every time the the [isPedalDown] state changes
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  isPedalDown ? tone.pedalDown() : tone.pedalUp()

  return null
}
