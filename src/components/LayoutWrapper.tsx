'use client'

import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

import { usePathname } from 'next/navigation'

import { CartProvider } from '@/context/CartContext'
import Cart from './Cart'
import CartTrigger from './CartTrigger'

export default function LayoutWrapper({ 
  children,
  content 
}: { 
  children: React.ReactNode,
  content: any
}) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <main className="min-h-screen bg-bg-base">{children}</main>
  }

  return (
    <CartProvider>
      <Navbar content={content} />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer content={content} />
      <Cart />
      <CartTrigger />
    </CartProvider>
  )
}
