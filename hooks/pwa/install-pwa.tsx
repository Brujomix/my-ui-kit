// Hook para manejar la instalación de PWA
import { useEffect, useState } from 'react'
import { Button } from '../tags/button'

export function UseInstallPWA () {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    })
  }, [])

  const promptInstall = () => {
    if (deferredPrompt == null) return

    // Muestra el prompt de instalación
    if (deferredPrompt) {
      deferredPrompt.prompt()
      setDeferredPrompt(null)
    }
  }

  return (
    <>
      {deferredPrompt != null && (
        <div className='fixed bottom-4 left-1/2 -translate-x-1/2 z-50'>
          <Button onClick={promptInstall}>Instalar APP</Button>
        </div>
      )}
    </>
  )
}
