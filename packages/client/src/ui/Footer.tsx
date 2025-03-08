import { useContext, useEffect, useState, useMemo } from 'react'
import { HslColorPicker } from 'react-colorful'
import { Link } from 'react-router-dom'
import { colorDefaults, IUser } from 'shared'
import { Square } from '../components/Square'
import { SocketContext } from '../context/socket'
import { ColorChangeStrategy, MultiplayerColorChangeStrategy, SoloColorChangeStrategy } from '../strategies/ColorChangeStrategy'

function HuePicker(props: { hue: string; visible: boolean }) {
  const { visible } = props
  const socket = useContext(SocketContext)
  const [hue, setHue] = useState(props.hue)
  const { s, l } = colorDefaults
  const isSoloMode = window.location.pathname === '/solo'

  const colorChangeStrategy = useMemo<ColorChangeStrategy>(() => {
    return isSoloMode 
      ? new SoloColorChangeStrategy()
      : new MultiplayerColorChangeStrategy(socket)
  }, [isSoloMode, socket])

  const handleOutOfFocus = () => {
    const currentHue = localStorage.getItem('colorHue')
    if (currentHue === hue) return
    colorChangeStrategy.handleColorChange(hue)
  }

  return (
    <div
      className={`${
        visible ? 'scale-100 -left-2 bottom-12' : 'scale-0 left-8 bottom-8'
      } transition-all duration-300 ease-in-out only-hue picker-pill absolute`}>
      <HslColorPicker
        color={{ h: parseInt(hue), s, l }}
        onChange={(color) => {
          setHue(color.h.toString())
        }}
        onPointerOut={handleOutOfFocus}
        onPointerUp={handleOutOfFocus}
      />
    </div>
  )
}

function UserPill(props: { user: IUser }) {
  const { user } = props
  const [showColorPicker, setShowColorPicker] = useState(false)

  return (
    <>
      <div
        className="relative flex py-2 px-2.5 bg-slate-400 hover:bg-slate-500 text-slate-100 transition ease-in duration-100 text-center text-base font-semibold shadow-md rounded-lg hover:cursor-pointer"
        onClick={() => setShowColorPicker((v) => !v)}>
        <Square color={{ h: user.colorHue }} />
        {user.username}
      </div>
      <HuePicker hue={user.colorHue} visible={showColorPicker} />
    </>
  )
}

export function Footer(props: { users: IUser[] }) {
  const { users } = props
  const username = localStorage.getItem('username')
  const me: IUser | undefined = users.find((u) => u.username === username)

  return (
    <footer className="absolute bottom-0 m-2 z-10">
      <span className="flex space-x-2">
        <button
          type="button"
          className="py-2 px-2.5 bg-slate-400 hover:bg-slate-500 text-slate-100 transition ease-in duration-100 text-center text-base font-semibold shadow-md rounded-lg">
          <Link to="/">Leave</Link>
        </button>
        {me && <UserPill user={me} />}
      </span>
    </footer>
  )
}
