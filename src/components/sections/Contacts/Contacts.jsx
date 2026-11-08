import { MapPin, Phone, Clock3, Map, CalendarDays, Hand, MessageCircle, Send } from 'lucide-react'
import Motion from '../../ui/Motion/Motion.jsx'
import './Contacts.css'

function Instagram(props) {
 return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
}

export default function Contacts({ page = false }) {
 const Title = page ? 'h1' : 'h2'
 const rows = [
  { icon: Phone, endIcon: Hand, label: 'Телефон', value: 'Номер скоро появится' },
  { icon: MapPin, endIcon: Map, label: 'Наш адрес', value: 'Адрес уточняется' },
  { icon: Clock3, endIcon: CalendarDays, label: 'Часы работы', value: 'Расписание уточняется' },
 ]
 return <section id="contacts" className={`contacts ${page ? 'contacts--page' : ''}`} aria-labelledby={page ? 'hero-title' : 'contacts-title'}>
  <div className="contacts__content">
   <Motion className="contacts__heading"><Title id={page ? 'hero-title' : 'contacts-title'}>КОНТАКТЫ</Title><svg className="contacts__underline" viewBox="0 0 300 30" aria-hidden="true"><path d="M5 24Q155-9 291 14M65 26Q190 7 284 20" /></svg></Motion>
   <div className="contacts__rows">{rows.map(({ icon: Icon, endIcon: EndIcon, label, value }, index) => <Motion tilt key={label} className={`contacts__row contacts__row--${index + 1}`}><Icon className="contacts__icon" aria-hidden="true" /><div><span className="contacts__label">{label}</span><p>{value}</p></div><EndIcon className="contacts__end-icon" aria-hidden="true" /></Motion>)}</div>
   <Motion className="contacts__socials"><span className="visually-hidden">Социальные сети скоро появятся</span>{[{ icon: Instagram, label: 'Instagram' }, { icon: MessageCircle, label: 'WhatsApp' }, { icon: Send, label: 'Telegram' }].map(({ icon: Icon, label }) => <button key={label} type="button" disabled aria-label={`${label} — скоро`} title={`${label} — ссылка пока не добавлена`}><Icon aria-hidden="true" /></button>)}</Motion>
  </div>
  <div className="contacts__flight" aria-hidden="true"><svg viewBox="0 0 400 120"><path d="M5 98C80-15 125 110 220 73S290 45 315 24" /></svg><Send /></div>
  <Motion className="contacts__location"><MapPin aria-hidden="true" /><span aria-hidden="true" /></Motion>
 </section>
}
