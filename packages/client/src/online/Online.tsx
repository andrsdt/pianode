import { useContext, useEffect } from 'react'
import { SocketContext } from '../context/socket'
import { usePrevious } from '../hooks/UsePrevious'
import { ToneKey } from '../models/piano/Tone'
import { PianoState, useStore } from '../store'

export function Online(params: { room: string | undefined }) {
  const socket = useContext(SocketContext)
  const socketId = socket.id
  const { room } = params || ''

  // HANDLE EMITTING
  const [pressedKeys, pressKey, releaseKey, pressPedal, releasePedal, isPedalDown] = useStore((state: PianoState) => [
    state.pressedKeys,
    state.pressKey,
    state.releaseKey,
    state.pressPedal,
    state.releasePedal,
    state.isPedalDown,
  ])

  const previousKeys: { key: ToneKey; id: string }[] = usePrevious(pressedKeys) || []

  useEffect(() => {
    // Play all the new notes that weren't pressed in the previous state
    const pressedKeysFiltered = pressedKeys.filter((k) => !previousKeys.includes(k) && k.id === socketId)
    pressedKeysFiltered.forEach((key) => {
      socket.emit('key_down', { ...key, room })
    })

    // Stop all the notes that were pressed in the previous state and aren't in this one
    const previousKeysFiltered = previousKeys.filter((k) => !pressedKeys.includes(k) && k.id === socketId)
    previousKeysFiltered.forEach((key) => {
      socket.emit('key_up', { ...key, room })
    })
  }, [pressedKeys, previousKeys])

  useEffect(() => {
    // TODO: take the socketId from the server instead of sending it in the request
    socket.emit(isPedalDown ? 'pedal_down' : 'pedal_up', { id: socketId, room })
  }, [isPedalDown])

  // HANDLE RECEIVING
  useEffect(() => {
    socket.on('key_down', (e) => pressKey(e.key, e.id))
    socket.on('key_up', (e) => releaseKey(e.key.note, e.id))
    socket.on('pedal_down', pressPedal)
    socket.on('pedal_up', releasePedal)

    return () => {
      socket.off('key_down')
      socket.off('key_up')
      socket.off('pedal_down')
      socket.off('pedal_up')
    }
  }, [socket])

  return null
}
