import './Logo.css'
import { Hamburger } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function Logo() {
  return <Link to="/" className="logo" aria-label="Burger House — главная"><Hamburger aria-hidden="true" /><span><b>BURGER</b><b>HOUSE</b></span></Link>
}

