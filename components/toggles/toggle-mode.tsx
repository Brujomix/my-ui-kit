import { useEffect, useState } from 'react'
import { MoonIcon } from '../icons/moon-icon'
import { SunIcon } from '../icons/sun-icon'

export function ToggleMode () {
  // true = dark, false = light
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') return true
    // Si no existe, setear a light
    localStorage.setItem('theme', 'light')
    return false
  })

  useEffect(() => {
    // Al montar, aplicar la clase según el theme guardado
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    setThemeMode((prev) => {
      const newMode = !prev
      if (newMode) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
      return newMode
    })
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
