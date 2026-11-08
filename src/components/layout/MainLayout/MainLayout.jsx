import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import '../../../styles/content.css'
import useSlowScroll from '../../../hooks/useSlowScroll.js'
export default function MainLayout() {
 const { pathname, hash, key } = useLocation()
 useSlowScroll(pathname)
 useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
  const titles = { '/': 'Премиальные бургеры', '/menu': 'Меню', '/offers': 'Акции и скидки', '/contacts': 'Контакты' }
  document.title = `${titles[pathname] || 'Страница не найдена'} — Burger House`
 }, [pathname])
 useEffect(() => {
  if (pathname !== '/' || !hash) return
  const frame = requestAnimationFrame(() => {
   const section = document.getElementById(hash.slice(1))
   if (!section) return
   const headerHeight = document.querySelector('.header')?.getBoundingClientRect().height || 0
   const top = hash === '#home' ? 0 : section.getBoundingClientRect().top + window.scrollY - headerHeight - 12
   window.scrollTo({ top: Math.max(0, top), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  })
  return () => cancelAnimationFrame(frame)
 }, [pathname, hash, key])
 return <><Header /><main id="main-content"><Outlet /></main><Footer /></>
}
