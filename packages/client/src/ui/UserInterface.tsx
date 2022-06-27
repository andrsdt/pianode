import { useContext } from 'react'
import { SocketContext } from '../context/socket'
import { PianoState, useStore } from '../store'

export function UserInterface() {
  const setCamera = useStore((state: PianoState) => state.setCamera)
  const socketId = useContext(SocketContext).id

  return (
    <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 1, display: 'flex', flexDirection: 'column' }}>
      <button onClick={() => setCamera('top')}>Top camera</button>
      <button onClick={() => setCamera('tilted')}>Tilted camera</button>
      <button onClick={() => setCamera('side')}>Side camera</button>
      <p>{socketId}</p>
    </div>
  )
}
