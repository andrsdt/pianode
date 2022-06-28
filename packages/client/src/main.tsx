import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import { socket, SocketContext } from './context/socket'
import './index.css'
import { Join } from './screens/Join'
import { Room } from './screens/Room'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/join" element={<Join />} />
          <Route path="/rooms/:roomId" element={<Room />} />
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  </React.StrictMode>,
)
