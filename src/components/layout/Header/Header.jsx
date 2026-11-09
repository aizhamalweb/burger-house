import { useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import CartDialog from '../../../features/cart/components/CartDialog/CartDialog.jsx'
import Logo from '../../ui/Logo/Logo.jsx'
import IconButton from '../../ui/IconButton/IconButton.jsx'
import './Header.css'
const navigation = [
 { label: 'Главная', hash: '#home' },
 { label: 'Меню', hash: '#menu' },
 { label: 'Акции', hash: '#offers' },
 { label: 'Контакты', hash: '#contacts' },
]
export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const headerRef = useRef(null)
  useLayoutEffect(() => {
    const header = headerRef.current
    const root = document.documentElement
    const updateHeight = () => root.style.setProperty('--header-height', header.getBoundingClientRect().height + 'px')
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(header)
    return () => {
      observer.disconnect()
      root.style.removeProperty('--header-height')
    }
  }, [])
  return <header className="header" ref={headerRef}>
    <a href="#main-content" className="skip-link">К содержимому</a>
    <Logo />
    <nav id="navigation" className={`header__nav ${open ? 'is-open' : ''}`} aria-label="Основная навигация">
      <div className="header__nav-items">
      {navigation.map(({ label, hash }) => <Link to={`/${hash}`} key={hash} className={location.pathname === '/' && location.hash === hash && hash !== '#home' ? 'active' : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
      </div>
    </nav>
    <div className="header__actions">
      <CartDialog />
      <IconButton label={open ? 'Закрыть навигацию' : 'Открыть навигацию'} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)} data-mobile-menu>{open ? <X /> : <Menu />}</IconButton>
    </div>
  </header>
}
