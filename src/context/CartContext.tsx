'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  id: string
  slug: string
  title: string
  price: number
  image: string
  category: string
  quantity: number
  material?: string
  dimensions?: string
}

interface CartProductInput {
  id: string
  slug?: string
  title: string
  price?: number
  image: string
  category?: string
  material?: string
  dimensions?: string
}

interface CartContextType {
  items: CartItem[]
  totalItems: number
  subtotal: number
  isCartOpen: boolean
  addToCart: (product: CartProductInput, quantity?: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'mcw_shopping_cart_v1'

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load cart from localStorage after mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setItems(parsed)
        }
      }
    } catch {
      // Ignore storage errors
    } finally {
      setIsHydrated(true)
    }
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Ignore storage errors
    }
  }, [items, isHydrated])

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  const toggleCart = () => setIsCartOpen((prev) => !prev)

  const addToCart = (product: CartProductInput, quantity: number = 1) => {
    const qtyToAdd = Math.max(1, quantity)
    const productPrice = typeof product.price === 'number' && !isNaN(product.price) ? product.price : 85.0
    const slug = product.slug || product.id

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id)
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd,
        }
        return updated
      } else {
        return [
          ...prev,
          {
            id: product.id,
            slug,
            title: product.title,
            price: productPrice,
            image: product.image,
            category: product.category || 'Handicrafts',
            quantity: qtyToAdd,
            material: product.material,
            dimensions: product.dimensions,
          },
        ]
      }
    })

    // Immediately open slide drawer from the right
    setIsCartOpen(true)
  }

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
