'use client'

import { useState, useEffect } from 'react'

export function OpenStatus() {
  const [status, setStatus] = useState<'open' | 'closed' | null>(null)

  useEffect(() => {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Madrid' }))
    const day = now.getDay()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const totalMinutes = hours * 60 + minutes

    let isOpen = false

    // L-V: 8:30–14:00 (510–840) and 17:30–21:00 (1050–1260)
    if (day >= 1 && day <= 5) {
      isOpen = (totalMinutes >= 510 && totalMinutes < 840) || (totalMinutes >= 1050 && totalMinutes < 1260)
    } 
    // S: 8:30–14:00 (510–840)
    else if (day === 6) {
      isOpen = totalMinutes >= 510 && totalMinutes < 840
    }

    setStatus(isOpen ? 'open' : 'closed')
  }, [])

  if (!status) return null

  return (
    <span className={`inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] px-4 py-1.5 rounded-full border ${
      status === 'open'
        ? 'bg-green-500/10 text-green-500 border-green-500/40'
        : 'bg-red-500/10 text-red-500 border-red-500/40'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
        status === 'open' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'
      }`} />
      {status === 'open' ? 'Abierto ahora' : 'Cerrado ahora'}
    </span>
  )
}
