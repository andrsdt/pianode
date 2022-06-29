import { useContext, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { SocketContext } from '../context/socket'
import { defaultToasterProps, putToast } from './toast'

export function Notifications() {
  const socket = useContext(SocketContext)

  useEffect(() => {
    // Dismiss all notifications when leaving the page
    return () => {
      toast.dismiss()
    }
  }, [])

  useEffect(() => {
    // When a notification is received, display it through the custom "putToast" handler
    socket.on('notification', putToast)

    return () => {
      socket.off('notification')
    }
  }, [socket])

  return <Toaster {...defaultToasterProps} />
}
