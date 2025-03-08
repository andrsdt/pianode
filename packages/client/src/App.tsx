import { useGLTF } from '@react-three/drei'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { socket, SocketContext } from './context/socket'
import { Error } from './screens/Error'
import { Home } from './screens/Home'
import { Room } from './screens/Room'
import { SoloRoom } from './screens/SoloRoom'
import { Notifications } from './ui/Notifications'

function App() {
  // Preload the piano model so that the user doesn't have to wait for it to load
  useGLTF.preload('/models/piano-draco.glb')

  return (
    <SocketContext.Provider value={socket}>
      <Notifications />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/:roomId" element={<Room />} />
          <Route path="/solo" element={<SoloRoom />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  )
}

export default App
