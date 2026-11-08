import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LayoutGrid, Hamburger, Popcorn, CupSoda } from 'lucide-react'
import { menuProducts } from '../../features/menu/data/products.js'
import './Menu.css'
import Offers from '../../components/sections/Offers/Offers.jsx'
import ProductCard from '../../features/menu/components/ProductCard'

const categories = [
 { id: 'all', label: 'Все', icon: LayoutGrid },
 { id: 'burgers', label: 'Бургеры', icon: Hamburger },
 { id: 'fries', label: 'Картофель', icon: Popcorn },
 { id: 'drinks', label: 'Напитки', icon: CupSoda },
]

export default function MenuPage({ embedded = false }) {
 const [category, setCategory] = useState('all')
 const [announcement, setAnnouncement] = useState('')
 const [searchParams, setSearchParams] = useSearchParams()
 const search = searchParams.get('search') || ''
 useEffect(() => {
  if (embedded) return
  window.scrollTo(0, 0)
 }, [embedded])
 const products = menuProducts.filter(product => (category === 'all' || product.category === category) && `${product.name} ${product.description}`.toLocaleLowerCase('ru').includes(search.toLocaleLowerCase('ru')))
 return <><div id="menu" className="menu-page">
  <section className="menu-intro" aria-labelledby={embedded ? 'home-menu-title' : 'hero-title'}>
   <p className="menu-eyebrow">Премиальные бургеры<span aria-hidden="true" /></p>
   {embedded ? <h2 id="home-menu-title" className="menu-intro__title">НАШЕ <span>МЕНЮ</span></h2> : <h1 id="hero-title">НАШЕ <span>МЕНЮ</span></h1>}
   <p className="menu-description">Выбирай любимое — мы приготовим с удовольствием.</p>
  </section>
  <section className="menu-catalog" aria-label="Меню Burger House">
   <div className="menu-filters" role="group" aria-label="Категории меню">
    {categories.map(({ id, label, icon: Icon }) => <button key={id} type="button" aria-pressed={category === id} onClick={() => setCategory(id)}><Icon aria-hidden="true" />{label}</button>)}
   </div>
   <p className="visually-hidden" role="status">{announcement}</p>
   {search && <p className="menu-search-result">Поиск: «{search}» <button type="button" onClick={() => setSearchParams({})}>Сбросить</button></p>}
   {products.length ? <div className="menu-grid" key={`${category}:${search}`}>
    {products.map((product, index) => <ProductCard key={product.id} product={product} index={index} onAdd={setAnnouncement} />)}
   </div> : <div className="menu-empty"><h2>{search ? 'Ничего не найдено' : 'Скоро в меню'}</h2><p>{search ? 'Попробуйте другое название или откройте всё меню.' : 'Мы готовим эту категорию. А пока попробуйте наши бургеры.'}</p><button type="button" onClick={() => { setCategory('burgers'); setSearchParams({}) }}>Выбрать бургер</button></div>}
  </section>
 </div><Offers /></>
}
