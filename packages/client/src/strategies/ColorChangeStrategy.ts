import { Socket } from 'socket.io-client'
import { useUserStore } from '../stores/UseUserStore'

export interface ColorChangeStrategy {
  handleColorChange(hue: string): void
}

export class MultiplayerColorChangeStrategy implements ColorChangeStrategy {
  constructor(private socket: Socket) {}

  handleColorChange(hue: string): void {
    this.socket.emit('change_color', { hue })
    localStorage.setItem('colorHue', hue)
  }
}

export class SoloColorChangeStrategy implements ColorChangeStrategy {
  handleColorChange(hue: string): void {
    const setUsersInRoom = useUserStore.getState().setUsersInRoom
    const username = localStorage.getItem('username') || ''
    
    // Update the user's color in the store
    setUsersInRoom([{
      username,
      colorHue: hue,
      room: 'solo'
    }])
    localStorage.setItem('colorHue', hue)
  }
} 