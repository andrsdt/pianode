import { PianoState, useStore } from '../store'

export function CameraSelector() {
  const setCamera = useStore((state: PianoState) => state.setCamera)

  return (
    <div>
      <button onClick={() => setCamera('top')}>Top camera</button>
      <button onClick={() => setCamera('tilted')}>Tilted camera</button>
      <button onClick={() => setCamera('side')}>Side camera</button>
    </div>
  )
}
