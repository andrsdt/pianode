import toast, { ToastOptions } from 'react-hot-toast'
import { ToasterProps } from 'react-hot-toast/dist/core/types'

export interface Notification {
  message: string
  id: string
  type: string
}

// Defaults for the toaster itself
export const defaultToasterProps = { position: 'top-center', reverseOrder: true } as ToasterProps

// Defaults for each individual toast, in case they are not specified
const defaultToastOptions = {} as ToastOptions

export const toasts = {
  info: {
    function: toast,
    options: defaultToastOptions,
  },
  success: {
    function: toast.success,
    options: defaultToastOptions,
  },
  error: {
    function: toast.error,
    options: defaultToastOptions,
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
