import { useContext, useEffect } from 'react'
import webmidi from 'webmidi'
import { SocketContext } from '../context/socket'
import { usePianoStore } from '../stores/UsePianoStore'

export function Midi() {
  const socketId = useContext(SocketContext).id

  const [pressKey, releaseKey, pressPedal, releasePedal] = usePianoStore((state) => [state.pressKey, state.releaseKey, state.pressPedal, state.releasePedal])

  const setupWebmidi = () => {
    // TODO: midi select menu
    const input = webmidi.inputs[0]
    if (!input) return

    input.addListener('noteon', 'all', (e) => {
      const key = { note: `${e.note.name}${e.note.octave}`, velocity: e.velocity }
      pressKey(key, socketId)
    })

    input.addListener('noteoff', 'all', (e) => {
      const key = `${e.note.name}${e.note.octave}`
      releaseKey(key, socketId)
    })

    // Handle pedal events. not supported natively by the webmidi library
    input.addListener('midimessage', 'all', (e) => {
      const firstByte = e.data[0]
      // Ignore no-op midi codes
      if ([0xf8, 0xfe].includes(firstByte)) return

      const secondByte = e.data[1]
      // Sustain pedal messages look like [0xB0, 0x40, 0x00]
      if (firstByte === 0xb0 && secondByte === 0x40) {
        // Third byte determines the pedal state (0 = up, 127 = down)
        const thirdByte = e.data[2]
        if (thirdByte == 0x7f) {
          pressPedal()
        }
        if (thirdByte == 0x00) {
          releasePedal()
        }
      }
    })
  }

  useEffect(() => {
    webmidi.enable((err) => {
      if (err) {
        console.log('WebMIDI not available')
      } else {
        setupWebmidi()
      }
    })
  }, [])
  return null
}
