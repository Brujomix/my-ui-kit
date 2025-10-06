// Hook para manejar la instalación de PWA
import { useEffect, useState } from 'react'
import { Button } from '../tags/button'
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export function InstallPWA () {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)
  const [fade, setFade] = useState<'in' | 'out' | null>(null)

  // Chequear si la app ya está instalada
  useEffect(() => {
    // Si está en modo standalone o ya instalada, no mostrar cartel
  // iOS Safari expone 'standalone' en navigator, pero no está en el tipo estándar
    const isIOSStandalone = typeof window.navigator === 'object' && 'standalone' in window.navigator && (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || isIOSStandalone
    if (isStandalone) return

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setFade('in')
      setVisible(true)
      // Fade out después de 6 segundos
      setTimeout(() => {
        setFade('out')
        setTimeout(() => setVisible(false), 600) // 600ms para el fade-out
      }, 6000)
    }
    window.addEventListener('beforeinstallprompt', handler)

    // Si la app se instala, ocultar cartel
    const onAppInstalled = () => setVisible(false)
    window.addEventListener('appinstalled', onAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [])

  const promptInstall = () => {
    if (deferredPrompt == null) return
    deferredPrompt.prompt()
    setDeferredPrompt(null)
    setFade('out')
    setTimeout(() => setVisible(false), 500)
  }

  return (
    <>
      {visible && (
        <div
          className={`text-gray-100 fixed w-1/2 bottom-4 z-50 border p-4 bg-gray-800 dark:bg-gray-900 rounded-lg shadow-zinc-600 shadow-md flex flex-col gap-2 transition-opacity duration-500 ${fade === 'in' ? 'opacity-100' : 'opacity-0'}`}
          style={{ pointerEvents: fade === 'out' ? 'none' : 'auto' }}
        >
          <p>¿Instalar la aplicación?</p>
          <p className='text-sm italic whitespace-break-spaces'>Podrías tener acceso a funciones avanzadas y notificaciones.</p>
          <div className='text-gray-950'>
            <Button maxWidth maxHeight onClick={promptInstall}>Instalar APP</Button>
          </div>
        </div>
      )}
    </>
  )
}
