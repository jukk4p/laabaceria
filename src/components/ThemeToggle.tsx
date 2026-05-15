'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    // Recuperar el tema guardado o usar el del sistema
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('light', savedTheme === 'light')
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light')
      document.documentElement.classList.add('light')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('light', newTheme === 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gold/10 border border-gold/20 text-gold hover:bg-gold/20 transition-all duration-300 group"
      aria-label="Cambiar tema"
    >
      {theme === 'light' ? (
        <Moon size={18} className="group-hover:rotate-12 transition-transform" />
      ) : (
        <Sun size={18} className="group-hover:rotate-90 transition-transform duration-500" />
      )}
    </button>
  )
}
