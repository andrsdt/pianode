import { PreferencesState, usePreferencesStore } from '../stores/UsePreferencesStore'
import { CameraControls } from './CameraControls'

function PianoControls() {
  const [showTrails, setShowTrails, colorizeKeys, setColorizeKeys] = usePreferencesStore((state: PreferencesState) => [
    state.showTrails,
    state.setShowTrails,
    state.colorizeKeys,
    state.setColorizeKeys,
  ])

  return (
    <div className="flex items-center">
      <button
        className={`m-0.5 py-2 px-2.5 ${
          showTrails ? 'bg-slate-500' : 'bg-slate-400'
        } hover:bg-slate-500 text-white transition ease-in duration-100 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg`}
        onClick={() => setShowTrails(!showTrails)}>
        {showTrails ? 'Trails 🎵' : 'No trails 🚫'}
      </button>
      <button
        className={`m-0.5 py-2 px-2.5 ${
          colorizeKeys ? 'bg-slate-500' : 'bg-slate-400'
        } hover:bg-slate-500 text-white transition ease-in duration-100 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg`}
        onClick={() => setColorizeKeys(!colorizeKeys)}>
        {colorizeKeys ? 'Colorized keys 🎨' : 'Blank keys ⬜'}
      </button>
    </div>
  )
}

export function ModeControls() {
  const [appMode, setAppMode] = usePreferencesStore((state: PreferencesState) => [state.appMode, state.setAppMode])

  return (
    <div className="flex items-center">
      <div className="flex items-center bg-slate-400 rounded-lg m-0.5">
        <button
          className={`py-2 px-2.5 rounded-l-lg transition ease-in duration-100 text-center text-base font-semibold shadow-md focus:outline-none ${
            appMode === 'piano' ? 'bg-slate-500 text-white' : 'text-slate-300'
          }`}
          onClick={() => setAppMode('piano')}>
          🎹 Piano
        </button>
        <button
          className={`py-2 px-2.5 rounded-r-lg transition ease-in duration-100 text-center text-base font-semibold shadow-md focus:outline-none ${
            appMode === 'camera' ? 'bg-slate-500 text-white' : 'text-slate-300'
          }`}
          onClick={() => setAppMode('camera')}>
          🎥 Camera
        </button>
      </div>
      {appMode === 'camera' ? <CameraControls /> : <PianoControls />}
    </div>
  )
}
