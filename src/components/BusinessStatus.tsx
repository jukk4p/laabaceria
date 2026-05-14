'use client'

import { useState, useEffect } from 'react'

export default function BusinessStatus() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const checkStatus = () => {
      // Forzar hora de Madrid (España)
      const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Madrid' }))
      const day = now.getDay()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const currentTime = hours * 60 + minutes

      let open = false

      if (day >= 1 && day <= 5) {
        // Lunes a Viernes: 08:30 - 14:00, 17:30 - 21:00
        const morningOpen = 8 * 60 + 30
        const morningClose = 14 * 60
        const eveningOpen = 17 * 60 + 30
        const eveningClose = 21 * 60

        if ((currentTime >= morningOpen && currentTime < morningClose) || 
            (currentTime >= eveningOpen && currentTime < eveningClose)) {
          open = true
        }
      } else if (day === 6) {
        // Sábados: 08:30 - 14:00
        const satOpen = 8 * 60 + 30
        const satClose = 14 * 60

        if (currentTime >= satOpen && currentTime < satClose) {
          open = true
        }
      }

      setIsOpen(open)
    }

    checkStatus()
    const interval = setInterval(checkStatus, 60000)
    return () => clearInterval(interval)
  }, [])

  if (isOpen) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[11px] font-bold uppercase tracking-wider w-fit">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
        Abierto ahora
      </div>
    )
  }

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-bold uppercase tracking-wider w-fit">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
      Cerrado ahora
    </div>
  )
}
