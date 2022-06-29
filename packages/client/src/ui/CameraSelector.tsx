import { PianoState, useStore } from '../store'

export function CameraSelector() {
  const setCamera = useStore((state: PianoState) => state.setCamera)

  // Inner component for the button logic
  const CameraButton = (props: { camera: string }) => (
    <button
      className="m-0.5 py-2 px-2.5 bg-slate-400 hover:bg-slate-500 text-slate-slate-100 transition ease-in duration-100 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg"
      onClick={() => setCamera(props.camera)}>
      {props.camera}
    </button>
  )

  return (
    <div className="flex">
      <p className="bg-slate-500 rounded-lg m-0.5 p-2 px-2.5">Camera</p>
      <CameraButton camera="top" />
      <CameraButton camera="tilted" />
      <CameraButton camera="side" />
    </div>
  )
}
