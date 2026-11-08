import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { CartProvider } from '../features/cart/model/CartProvider'

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  )
}
