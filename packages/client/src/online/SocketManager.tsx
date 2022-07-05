import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SocketContext } from '../context/socket'
import { usePrevious } from '../hooks/UsePrevious'
import { ToneKey } from '../models/piano/Tone'
import { PianoState, usePianoStore } from '../stores/UsePianoStore'
import { UserState, useUserStore } from '../stores/UseUserStore'
import { JoinRoom } from './JoinRoom'

export function SocketManager() {
  const socket = useContext(SocketContext)
  const socketId = socket.id
  const room = (useParams().roomId || '').substring(0, 4)

  // HANDLE EMITTING
  const setUsersInRoom = useUserStore((state: UserState) => state.setUsersInRoom)
  // TODO: handle userState here too. Whenever the user changes, it updates the UserState from its own
  // component and a "socket.emit()" is triggered from here. In the same way, we listen to "socket.on()"
  // here and update the state accordingly, so that the components can render with the new data.

  const [pressedKeys, pressKey, releaseKey, pressPedal, releasePedal, isPedalDown] = usePianoStore((state: PianoState) => [
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
    socket.on('users', setUsersInRoom)

    return () => {
      socket.off('key_down')
      socket.off('key_up')
      socket.off('pedal_down')
      socket.off('pedal_up')
      socket.off('users')
    }
  }, [socket])

  return <JoinRoom />
}
