import { useState } from 'react'
import { CartContext } from './cartContext'

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const add = product => setItems(previous => {
    const existing = previous.find(item => item.id === product.id)
    return existing
      ? previous.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...previous, { ...product, quantity: 1 }]
  })

  const remove = id => setItems(previous => previous.flatMap(item => {
    if (item.id !== id) return [item]
    return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : []
  }))

  const deleteItem = id => setItems(previous => previous.filter(item => item.id !== id))
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, add, remove, deleteItem, count }}>
      {children}
    </CartContext.Provider>
  )
}
