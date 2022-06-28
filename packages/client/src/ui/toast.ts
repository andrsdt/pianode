import toast, { ToastOptions } from 'react-hot-toast'

export interface Notification {
  message: string
  id: string
  type: string
}

const defaultOptions = { position: 'top-right' } as ToastOptions

export const toasts = {
  info: {
    function: toast,
    options: defaultOptions,
  },
  success: {
    function: toast.success,
    options: defaultOptions,
  },
  error: {
    function: toast.error,
    options: defaultOptions,
  },
}

export const putToast = (not: Notification) => {
  // Will redirect each notification to the correct toast function
  // (info, success, error) and will pass the corresponding options

  // The Notification interface is according to the type of data
  // returned by the express.js server
  const t = toasts[not.type as keyof typeof toasts]
  t.function(not.message, { id: not.id, ...t.options })
}
