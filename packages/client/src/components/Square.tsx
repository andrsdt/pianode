import { colorDefaults } from 'shared'

export function Square(props: { color: { h: number | string; s?: number; l?: number } }) {
  const h = props.color.h
  const l = props.color.l || colorDefaults.l
  const s = props.color.s || colorDefaults.s

  return <p className="w-5 h-5 rounded-full place-self-center mt-0.5 mr-2" style={{ backgroundColor: `hsl(${h}, ${s}%, ${l}%)` }} />
}
