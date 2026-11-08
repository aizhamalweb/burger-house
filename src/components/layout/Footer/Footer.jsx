import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import Logo from '../../ui/Logo/Logo.jsx'
import './Footer.css'

export default function Footer() {
 return <footer className="footer">
  <div className="footer__hologram" aria-hidden="true" />
  <div className="footer__row"><Logo /><nav aria-label="Навигация в подвале">{[['/','Главная'],['/menu','Меню'],['/offers','Акции'],['/contacts','Контакты']].map(([path,label]) => <Link key={path} to={path} viewTransition>{label}</Link>)}</nav><button className="footer__up" type="button" aria-label="Вернуться наверх" onClick={() => window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}><ArrowUp aria-hidden="true" /></button></div>
  <div className="footer__bottom"><span>© {new Date().getFullYear()} Burger House</span><span>Сделано с аппетитом</span></div>
 </footer>
}
