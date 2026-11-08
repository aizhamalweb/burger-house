import { useEffect } from 'react'

// Use the native scroll position so sticky elements and ScrollTrigger stay in sync.
export default function useSlowScroll(pathname) {
 useEffect(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let frame = 0
  let lastTime = 0
  let current = window.scrollY
  let target = current
  const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  const clamp = value => Math.max(0, Math.min(maxScroll(), value))
  const reset = () => {
   cancelAnimationFrame(frame)
   frame = 0
   lastTime = 0
   current = target = window.scrollY
  }
  const tick = time => {
   if (reducedMotion.matches) { reset(); return }
   const delta = lastTime ? Math.min((time - lastTime) / 1000, .05) : 1 / 60
   lastTime = time
   target = clamp(target)
   const distance = target - current
   // Never exceed 600 pixels/second, even when wheel events arrive in bursts.
   const eased = distance * (1 - Math.exp(-8 * delta))
   const step = Math.max(-600 * delta, Math.min(600 * delta, eased))
   current = clamp(current + step)
   window.scrollTo({ top: current, behavior: 'instant' })
   if (Math.abs(target - current) > .5) frame = requestAnimationFrame(tick)
   else { window.scrollTo({ top: target, behavior: 'instant' }); reset() }
  }
  const wheel = event => {
   if (reducedMotion.matches || event.ctrlKey || event.metaKey || !event.cancelable || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
   if (event.target instanceof Element) {
    // Dialogs and nested lists keep their own native scrolling.
    if (event.target.closest('dialog, input, textarea, select, [contenteditable="true"]')) return
    for (let element = event.target; element && element !== document.body; element = element.parentElement) {
     const style = getComputedStyle(element)
     if (/(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight + 1) return
    }
   }
   event.preventDefault()
   if (!frame) current = target = window.scrollY
   const unit = event.deltaMode === 1 ? 20 : event.deltaMode === 2 ? window.innerHeight : 1
   const movement = Math.max(-100, Math.min(100, event.deltaY * unit)) * .7
   if ((target - current) * movement < 0) target = current
   // Discard excess momentum instead of queuing a long scroll after release.
   target = clamp(Math.max(current - 300, Math.min(current + 300, target + movement)))
   if (!frame) frame = requestAnimationFrame(tick)
  }
  const onNativeScroll = () => {
   // Scrollbar dragging, keyboard navigation and anchors remain immediate.
   if (Math.abs(window.scrollY - current) > 2) reset()
  }
  const onKey = event => {
   if (['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key)) reset()
  }
  window.addEventListener('wheel', wheel, { passive: false })
  window.addEventListener('scroll', onNativeScroll, { passive: true })
  window.addEventListener('keydown', onKey)
  window.addEventListener('pointerdown', reset, { passive: true })
  window.addEventListener('touchstart', reset, { passive: true })
  window.addEventListener('blur', reset)
  return () => {
   reset()
   window.removeEventListener('wheel', wheel)
   window.removeEventListener('scroll', onNativeScroll)
   window.removeEventListener('keydown', onKey)
   window.removeEventListener('pointerdown', reset)
   window.removeEventListener('touchstart', reset)
   window.removeEventListener('blur', reset)
  }
 }, [pathname])
}
