import { useEffect, useRef } from 'react'
import './Motion.css'

export default function Motion({ children, className = '', tilt = false, delay }) {
 const ref = useRef(null)
 useEffect(() => {
  const element = ref.current
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (reduced.matches) return
  element.classList.add('motion--waiting')
  const observer = new IntersectionObserver(entries => {
   if (entries[0].isIntersecting) { element.classList.remove('motion--waiting'); observer.disconnect() }
  }, { threshold: .12 })
  observer.observe(element)
  const reset = () => { element.style.removeProperty('--tilt-x'); element.style.removeProperty('--tilt-y') }
  const move = event => {
   if (!tilt || reduced.matches || event.pointerType !== 'mouse') return
   const bounds = element.getBoundingClientRect()
   element.style.setProperty('--tilt-x', `${-(event.clientY - bounds.top - bounds.height / 2) / bounds.height * 9}deg`)
   element.style.setProperty('--tilt-y', `${(event.clientX - bounds.left - bounds.width / 2) / bounds.width * 9}deg`)
  }
  element.addEventListener('pointermove', move)
  element.addEventListener('pointerleave', reset)
  return () => { observer.disconnect(); reset(); element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', reset) }
 }, [tilt])
 return <div ref={ref} style={delay === undefined ? undefined : { transitionDelay: `${delay}ms, ${delay}ms, 0ms` }} className={`motion ${tilt ? 'motion--tilt' : ''} ${className}`}>{children}</div>
}
