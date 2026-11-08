import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingCart, X, Trash2, Coins, Truck, ArrowRight, Hamburger } from 'lucide-react'
import { useCart } from '../../model/useCart'
import IconButton from '../../../../components/ui/IconButton/IconButton.jsx'
import './CartDialog.css'

export default function CartDialog() {
 const dialogRef = useRef(null)
 const triggerRef = useRef(null)
 const closeButtonRef = useRef(null)
 const { items, count, add, remove, deleteItem } = useCart()
 const total = items.reduce((sum,item) => sum + item.price * item.quantity, 0)
 const close = () => dialogRef.current.close()
 const open = event => {
  triggerRef.current = event.currentTarget
  dialogRef.current.showModal()
  closeButtonRef.current?.focus({ preventScroll: true })
 }
 const restoreFocus = () => triggerRef.current?.focus({ preventScroll: true })
 return <>
  <IconButton label={`Открыть корзину: ${count} товаров`} onClick={open}><ShoppingCart aria-hidden="true" /><span className="cart-count">{count}</span></IconButton>
  <dialog className="basket" ref={dialogRef} aria-labelledby="cart-title" onClose={restoreFocus} onClick={event => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close() } }}>
   <div className="basket__inner">
    <Hamburger className="basket__watermark" aria-hidden="true" />
    <header className="basket__heading"><span className="basket__emblem"><ShoppingCart aria-hidden="true" /><span>{count}</span></span><h2 id="cart-title">Корзина<svg viewBox="0 0 250 25" aria-hidden="true"><path d="M4 9Q103-7 45 21Q143 0 245 13" /></svg></h2><button type="button" ref={closeButtonRef} className="basket__square basket__close" aria-label="Закрыть корзину" onClick={close}><X /></button></header>
    {items.length ? <>
     <ul className="basket__items">{items.map(item => <li className="basket__item" key={item.id}>
      <div className="basket__photo"><img src={item.image} alt={item.name} /></div>
      <div className="basket__details"><h3>{item.name}</h3><p className="basket__price">{item.price * item.quantity} сом</p><div className="basket__quantity" role="group" aria-label={`Количество: ${item.name}`}><button type="button" aria-label={`Уменьшить количество: ${item.name}`} onClick={() => remove(item.id)}><Minus aria-hidden="true" /></button><span aria-live="polite" aria-atomic="true">{item.quantity}</span><button type="button" aria-label={`Добавить: ${item.name}`} onClick={() => add(item)}><Plus aria-hidden="true" /></button></div></div>
      <button type="button" className="basket__square basket__delete" aria-label={`Удалить ${item.name} из корзины`} onClick={() => deleteItem(item.id)}><Trash2 aria-hidden="true" /></button>
     </li>)}</ul>
     <div className="basket__summary"><svg className="basket__wave" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 76C80-70 310 110 570 45S820-10 1000 35" /></svg><div className="basket__summary-row"><p className="basket__total" aria-live="polite" aria-atomic="true"><Coins aria-hidden="true" /><span>Итого: <strong>{total} сом</strong></span></p><button type="button" className="basket__checkout" disabled><Truck aria-hidden="true" /><span>Оформить заказ</span><ArrowRight aria-hidden="true" /></button></div></div>
    </> : <div className="basket__empty"><ShoppingCart aria-hidden="true" /><h3>Здесь пока пусто</h3><p>Самое время выбрать свой любимый бургер.</p><Link to="/menu" viewTransition onClick={close}>Посмотреть меню <ArrowRight aria-hidden="true" /></Link></div>}
   </div>
  </dialog>
 </>
}
