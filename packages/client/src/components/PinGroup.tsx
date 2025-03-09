import { useState, useEffect } from 'react'

function PinInput(props: Readonly<{ position: number; val: string; setPin: React.Dispatch<React.SetStateAction<string>> }>) {
  const { position, val, setPin } = props

  const setVal = (e: string) => {
    setPin((prev) => prev.slice(0, position) + e + prev.slice(position + 1))
  }

  const focusOnPrevious = (target: HTMLInputElement) => {
    const previous = target.previousElementSibling as HTMLInputElement
    if (previous) {
      previous.focus()
      previous.select()
    }
  }

  const focusOnNext = (target: HTMLInputElement) => {
    const next = target.nextElementSibling as HTMLInputElement
    if (next) {
      next.focus()
      next.select()
    }
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (value !== '') focusOnNext(event.target)

    // prevent user from entering more than 1 digit per pin cell
    const singleDigit = value.length === 2 ? value.slice(1, 2) : value.slice(0, 1)

    // Replace the field value with the new digit
    setPin((prev) => {
      return prev.slice(0, position) + singleDigit + prev.slice(position + 1)
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    if (event.code === 'ArrowLeft') focusOnPrevious(target)
    if (event.code === 'ArrowRight') focusOnNext(target)
    if (event.code === 'ArrowUp') event.preventDefault()
    if (event.code === 'ArrowDown') event.preventDefault()
    if (event.code === 'Backspace') {
      setVal('')
      const next = target.nextElementSibling as HTMLInputElement
      if (!next?.value) focusOnPrevious(target)
    }
    if (event.code === 'Enter') {
      const joinButton = document.querySelector('#join-btn') as HTMLElement
      joinButton?.click()
    }

    // Don't allow non-numeric input
    if (/[Ee.\-+]+/.test(event.key)) {
      event.preventDefault()
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    // When pasting a room code, paste the first 4 digits of the clipboard content
    event.preventDefault()
    const onlyNumbers = event.clipboardData.getData('text').replaceAll(/\D/g, '').slice(0, 4)
    // If the clipboard content has no numbers or is missing, do nothing
    if (onlyNumbers) setPin(onlyNumbers)
  }

  return (
    <input
      className="appearance-none w-[25%] py-[5%] bg-zinc-800 rounded-lg text-3xl text-center"
      type="number"
      placeholder="0"
      value={val}
      onChange={handleOnChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
    />
  )
}

export function PinGroup(props: Readonly<{ default?: string; digits: number; onChange: any }>) {
  const [pin, setPin] = useState(props.default || '')

  useEffect(() => {
    // Call the parent's onChange when the pin changes
    props.onChange(pin)
  }, [pin])

  return (
    <span className="flex justify-between space-x-3 mb-6 ">
      {Array.from({ length: props.digits }, (_, i) => (
        <PinInput key={i} position={i} val={pin.slice(i, i + 1)} setPin={setPin} />
      ))}
    </span>
  )
}
