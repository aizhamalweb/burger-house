import { Beef, Leaf, Soup } from 'lucide-react'
import './IngredientNotes.css'

function BunIcon() {
 return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 29C5 7 43 7 43 29ZM5 34h38v4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z" /><path d="m16 20 1-2m8-2 1 2m7 3 1-2" /></svg>
}
function CheeseIcon() {
 return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 23 26-16 12 16v18H29a5 5 0 0 0-10 0H5v-9a5 5 0 0 0 0-9Zm0 0h38" /><circle cx="28" cy="16" r="3" /><circle cx="33" cy="31" r="3" /><path d="M14 28v4" /></svg>
}
function TomatoIcon() {
 return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M25 15C8 5 1 23 9 35c5 8 19 8 25-1 7-12 3-23-9-19Z" /><path d="m24 8-2 8-8-1 7 5 5-4 7 1-5-5m-7 10c-8 0-10 6-8 11" /></svg>
}
const notes = [
 { id: 'bun-top', title: 'Верхняя булочка', description: 'Мягкая, с кунжутом', icon: <BunIcon /> },
 { id: 'lettuce', title: 'Салат', description: 'Свежий и хрустящий', icon: <Leaf /> },
 { id: 'tomato', title: 'Помидор', description: 'Сочный и спелый', icon: <TomatoIcon /> },
 { id: 'cheese', title: 'Сыр Чеддер', description: 'Насыщенный и тянущийся', icon: <CheeseIcon /> },
 { id: 'patty', title: 'Говяжья котлета', description: 'Сочная, на гриле', icon: <Beef /> },
 { id: 'sauce', title: 'Фирменный соус', description: 'Наш особый рецепт', icon: <Soup /> },
 { id: 'bun-bottom', title: 'Нижняя булочка', description: 'Нежная и воздушная', icon: <BunIcon /> },
]

export default function IngredientNotes() {
 return <div className="ingredient-notes" role="group" aria-label="Состав бургера">
  <svg className="ingredient-notes__arrows" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
   <defs><marker id="ingredient-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M1 1 9 5 1 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></marker></defs>
   {['M685 125Q631 125 574 162', 'M325 206Q367 206 412 235', 'M685 265Q632 260 580 297', 'M318 325Q367 313 417 333', 'M685 346Q632 339 584 367', 'M330 411Q370 396 418 415', 'M685 450Q636 465 585 450'].map(d => <path className="ingredient-arrow--desktop" key={d} d={d} markerEnd="url(#ingredient-arrow)" />)}
   {['M635 125Q607 135 574 162', 'M365 206Q390 217 412 235', 'M635 265Q607 275 580 297', 'M370 325Q395 322 417 333', 'M635 346Q610 352 584 367', 'M375 411Q396 405 418 415', 'M635 450Q610 457 585 450'].map(d => <path className="ingredient-arrow--phone" key={d} d={d} markerEnd="url(#ingredient-arrow)" />)}
  </svg>
  {notes.map(note => <article className={`ingredient-note ingredient-note--${note.id}`} key={note.id}>
   <span className="ingredient-note__icon" aria-hidden="true">{note.icon}</span>
   <div><h2>{note.title}</h2><p>{note.description}</p></div>
  </article>)}
 </div>
}
