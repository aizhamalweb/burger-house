import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Beef, Leaf, Soup, Truck, BadgePercent } from 'lucide-react'
import FeatureItem from '../../ui/FeatureItem/FeatureItem.jsx'
import HeroVideo from './HeroVideo.jsx'
import IngredientNotes from './IngredientNotes.jsx'
import './Hero.css'
export default function Hero() {
 const sectionRef = useRef(null)

 return <section className="hero" ref={sectionRef} aria-labelledby="hero-title">
  <div className="hero__composition">
  <div className="hero__media">
  <HeroVideo sectionRef={sectionRef} /><div className="hero__shade" aria-hidden="true" />
  <IngredientNotes />
  <div className="hero__steam" aria-hidden="true">
   <span /><span /><span /><span />
  </div>
  </div>
  <div className="hero__intro">
  <div className="hero__copy">
   <p className="hero__eyebrow">Премиальные бургеры<span aria-hidden="true" /></p>
   <h1 id="hero-title" className="hero__title"><span>BURGER</span><span>HOUSE</span></h1>
   <p className="hero__description">Сочные бургеры, хрустящий картофель<br className="desktop-break" /> и любимые напитки — всё в одном месте.</p>
  </div>
  <div className="hero__perks">
   <div className="hero__benefits"><FeatureItem icon={<Truck />}><strong>Быстрая<br />доставка</strong></FeatureItem><FeatureItem icon={<BadgePercent />}><strong>Выгодные<br />акции</strong></FeatureItem></div>
  </div>
   <div className="hero__end-actions">
    <Link to="/menu" className="hero__cta hero__cta--primary">Заказать</Link>
    <Link to="/menu" className="hero__cta">Посмотреть меню</Link>
   </div>
  </div>
  <div className="hero__ingredients">
   <FeatureItem framed icon={<Beef />}><strong>100%</strong><br />Говядина<br />премиум-класса</FeatureItem>
   <FeatureItem framed icon={<Leaf />}><strong>Свежие</strong><br />ингредиенты</FeatureItem>
   <FeatureItem framed icon={<Soup />}><strong>Фирменный</strong><br />соус</FeatureItem>
  </div>
  </div>
 </section>
}
