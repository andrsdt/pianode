import { createContext } from 'react'
import { io } from 'socket.io-client'

const SOCKET_URL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3001'
export const socket = io(SOCKET_URL)
export const SocketContext = createContext(socket)
