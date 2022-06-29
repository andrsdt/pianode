import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SocketContext, socket } from './context/socket'
import { Landing } from './screens/Landing'
import { Room } from './screens/Room'
import { Notifications } from './ui/Notifications'
import { Join } from './screens/Join'

function App() {
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
