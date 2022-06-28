import { useContext, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { SocketContext } from '../context/socket'

interface Notification {
  message: string
  id: string
  type: string
}

const types = {
  info: toast,
  success: toast.success,
  error: toast.error,
}

const toasts = {
  info: {
    function: toast,
    options: {},
  },
  success: {
    function: toast.success,
    options: {},
  },
  error: {
    function: toast.error,
    options: {},
  },
}
export function Notifications() {
  const socket = useContext(SocketContext)

  useEffect(() => {
    // Dismiss all notifications when leaving the page
    return () => {
      toast.dismiss()
    }
  }, [])

  useEffect(() => {
    console.log('doing things')
    socket.on('notification', (not: Notification) => {
      // Will redirect each notification to the correct toast function
      // (info, success, error) and will pass the corresponding options
      const t = toasts[not.type as keyof typeof toasts]
      t.function(not.message, { id: not.id, ...t.options })
    })

    return () => {
      socket.off('notification')
    }
  }, [socket])

  return <Toaster />
}
