import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Crown, Flame, Gift } from 'lucide-react'
import comboImage from '../../../assets/images/offers/combo-duo.png'
import burgerImage from '../../../assets/images/products/double_cheeseburger.png'
import drinkImage from '../../../assets/images/offers/complimentary-drink.png'
import './Offers.css'

gsap.registerPlugin(ScrollTrigger)

export default function Offers({ page = false }) {
 const Title = page ? 'h1' : 'h2'
 const sectionRef = useRef(null)
 useEffect(() => {
  const section = sectionRef.current
  const stage = section.querySelector('.offers__stage')
  const stack = section.querySelector('.offers__stack')
  const media = gsap.matchMedia()
  media.add({
   phone: '(max-width: 1023px)',
   larger: '(min-width: 1024px)',
  }, context => {
   const phone = context.conditions.phone
   const cards = gsap.utils.toArray('.offer-card', section)
   const timeline = gsap.timeline({ scrollTrigger: {
    trigger: phone ? stage : section,
    start: 'top top',
    end: phone ? () => '+=' + Math.max(cards[0].offsetHeight * 3, window.innerHeight) : 'bottom bottom',
    pin: phone ? stage : false,
    pinSpacing: true,
    anticipatePin: 1,
    scrub: true,
    invalidateOnRefresh: true,
   } })
   const entryPosition = {
    yPercent: phone ? 0 : 115,
    // Once pinned, the stack's offset is its distance from the viewport top.
    y: phone ? () => Math.max(window.innerHeight - stack.offsetTop + 24, stack.offsetHeight * 1.15) : 0,
   }
   gsap.set(cards.slice(1), { ...entryPosition, opacity: 1, visibility: 'hidden' })
   timeline.set(cards[1], { visibility: 'visible' }, .15)
    .fromTo(cards[1], entryPosition, { y: 0, yPercent: phone ? 50 : 0, duration: .3, ease: 'none', immediateRender: false }, .15)
    .set(cards[2], { visibility: 'visible' }, .6)
    .fromTo(cards[2], entryPosition, { y: 0, yPercent: phone ? 100 : 0, duration: .3, ease: 'none', immediateRender: false }, .6)
    .to({}, { duration: .1 }, .9)
  }, section)
  return () => media.revert()
 }, [])

 return <section id="offers" className="offers" ref={sectionRef} aria-labelledby="offers-title">
  <div className="offers__stage">
  <div className="offers__heading">
   <p className="offers__eyebrow">Выгодные предложения<span aria-hidden="true" /></p>
   <Title className="offers__title" id="offers-title">АКЦИИ <span>&amp; СКИДКИ</span><i className="offers__rays" aria-hidden="true"><i /><i /><i /></i></Title>
   <p className="offers__description">Специальные предложения, комбо-наборы<br />и сезонные акции — не упусти выгоду!</p>
  </div>
  <div className="offers__stack" role="group" aria-label="Три специальных предложения">
   <article className="offer-card offer-card--combo">
    <div className="offer-card__copy">
     <span className="offer-card__tag"><Crown aria-hidden="true" />Комбо-акция</span>
     <h3>Комбо<br />Дуэт</h3>
     <p>Два бургера + картофель фри + 2 напитка</p>
     <div className="offer-card__price"><strong>790 сом</strong><del>990 сом</del></div>
    </div>
    <img className="offer-card__food" src={comboImage} alt="Два бургера, картофель фри и два напитка" />
    <span className="offer-card__discount">−20%</span>
   </article>
   <article className="offer-card offer-card--burger">
    <div className="offer-card__copy">
     <span className="offer-card__tag"><Flame aria-hidden="true" />Горячее предложение</span>
     <h3>Большой<br />бургер</h3>
     <p>Увеличенная порция любимого бургера</p>
     <div className="offer-card__price"><strong>480 сом</strong><del>600 сом</del></div>
    </div>
    <img className="offer-card__food" src={burgerImage} alt="Большой бургер с двумя котлетами и сыром" />
    <span className="offer-card__discount">−20%</span>
   </article>
   <article className="offer-card offer-card--drink">
    <div className="offer-card__copy">
     <span className="offer-card__tag"><Gift aria-hidden="true" />Подарок</span>
     <h3>Напиток<br />в подарок</h3>
     <p>Любимый напиток к вашему заказу</p>
     <div className="offer-card__price"><strong>от 600 сом</strong></div>
    </div>
    <div className="offer-card__drink-art"><img src={drinkImage} alt="Холодный напиток и подарочная коробка" /></div>
    <span className="offer-card__discount" aria-label="Подарок"><Gift aria-hidden="true" /></span>
   </article>
  </div>
  </div>
 </section>
}
