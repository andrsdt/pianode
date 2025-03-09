import { PreferencesState, usePreferencesStore } from '../stores/UsePreferencesStore'
import { CameraSelector } from './CameraSelector'

export function CameraControls() {
  const [cameraZoom, setCameraZoom] = usePreferencesStore((state: PreferencesState) => [state.cameraZoom, state.setCameraZoom])

  const handleZoom = (delta: number) => {
    const newZoom = Math.max(0.5, Math.min(2, cameraZoom - delta))
    setCameraZoom(newZoom)
  }

  return (
    <div className="flex items-center">
      <CameraSelector />
      <button
        className="m-0.5 py-2 px-2.5 bg-slate-400 hover:bg-slate-500 text-white transition ease-in duration-100 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg"
        onClick={() => handleZoom(-0.1)}>
        ➖
      </button>
      <button
        className="m-0.5 py-2 px-2.5 bg-slate-400 hover:bg-slate-500 text-white transition ease-in duration-100 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg"
        onClick={() => handleZoom(0.1)}>
        ➕
      </button>
    </div>
  )
}
