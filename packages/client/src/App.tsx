import { useGLTF } from '@react-three/drei'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { socket, SocketContext } from './context/socket'
import { Join } from './screens/Join'
import { Landing } from './screens/Landing'
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
          <Route path="/" element={<Landing />} />
          <Route path="/join" element={<Join />} />
          <Route path="/rooms/:roomId" element={<Room />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  )
}

export default App
