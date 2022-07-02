import { useGLTF } from '@react-three/drei'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { socket, SocketContext } from './context/socket'
import { Home } from './screens/Home'
import { Room } from './screens/Room'
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
          {/* TODO: Error page */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  )
}

export default App
