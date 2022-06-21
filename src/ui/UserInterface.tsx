import { PianoState, useStore } from '../store'

export function UserInterface() {
  const setCamera = useStore((state: PianoState) => state.setCamera)

  return (
    <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 1, display: 'flex', flexDirection: 'column' }}>
      <button onClick={() => setCamera('top')}>Top camera</button>
      <button onClick={() => setCamera('tilted')}>Tilted camera</button>
      <button onClick={() => setCamera('side')}>Side camera</button>
    </div>
  )
}
