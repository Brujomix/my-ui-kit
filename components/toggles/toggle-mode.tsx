import { useState } from 'react'
import { MoonIcon } from '../icons/moon-icon'
import { SunIcon } from '../icons/sun-icon'

export function ToggleMode () {
  const [themeMode, setThemeMode] = useState(false)

  const toggleTheme = () => {
    setThemeMode(!themeMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <>
      {!themeMode
        ? (
          <button onClick={toggleTheme}>
            <MoonIcon className='w-5 text-black' />
          </button>
          )
        : (
          <button onClick={toggleTheme}>
            <SunIcon className='w-5 text-gray-200' />
          </button>
          )}
    </>
  )
}
