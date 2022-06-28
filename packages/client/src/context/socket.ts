import { SERVER_URL } from './../consts'
import { createContext } from 'react'
import { io } from 'socket.io-client'

export const socket = io(SERVER_URL)
export const SocketContext = createContext(socket)
