import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="content-section content-section--page">
      <p className="section-eyebrow">404</p>
      <h1 id="hero-title" className="section-title">ТУТ ПОКА<br /><span>ПУСТО</span></h1>
      <p className="section-description">Но в нашем меню точно найдётся что-нибудь вкусное.</p>
      <Link className="action-link" to="/menu" viewTransition>Открыть меню</Link>
    </section>
  )
}
