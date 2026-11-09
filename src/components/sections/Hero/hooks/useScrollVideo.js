import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { progressToTime } from '../../../../utils/videoUtils.js'
gsap.registerPlugin(ScrollTrigger)
export default function useScrollVideo(videoRef, sectionRef, source) {
 useEffect(() => {
  const video = videoRef.current
  const section = sectionRef.current
  if (!video || !section) return
  const scene = section.closest('.home-scene')
  const menu = scene?.querySelector('.home-scene__menu')
  const scrollSpace = scene?.querySelector('.home-scene__scroll-space')
  let menuVisible = false
  const updateMenu = () => {
   if (!menu) return
   const lastFrame = progressToTime(1, video.duration)
   const ready = Number.isFinite(video.duration) && video.readyState >= 2 && !video.seeking &&
    target >= lastFrame - .015 && video.currentTime >= lastFrame - .015
   if (ready === menuVisible) return
   menuVisible = ready
   menu.style.visibility = ready ? 'visible' : 'hidden'
  }
  if (menu) menu.style.visibility = 'hidden'
  const notes = section.querySelector('.ingredient-notes')
  const initialElements = section.querySelectorAll('.hero__copy, .hero__ingredients')
  const benefits = section.querySelector('.hero__benefits')
  const endActions = section.querySelector('.hero__end-actions')
  const steam = section.querySelector('.hero__steam')
  const setVisibility = (element, opacity) => {
   if (!element) return
   element.style.opacity = String(opacity)
   element.style.visibility = opacity > 0 ? 'visible' : 'hidden'
  }
  const smoothStep = value => {
   const progress = Math.max(0, Math.min(1, value))
   return progress * progress * (3 - 2 * progress)
  }
  const updateNotes = () => {
   updateMenu()
   const time = video.currentTime
   const introEnd = Number.isFinite(video.duration) ? video.duration * .1 : .75
   const notesFadeOut = Math.max(1.25, introEnd + .4)
   const opacity = smoothStep((time - introEnd) / .2) * (1 - smoothStep((time - notesFadeOut) / .25))
   if (notes) {
    notes.style.opacity = String(opacity)
    notes.style.visibility = opacity > 0 ? 'visible' : 'hidden'
   }
   if (Number.isFinite(video.duration) && video.duration > 0) {
    const endTime = progressToTime(1, video.duration)
    const fadeDuration = Math.min(.5, endTime * .15)
    const startOpacity = 1 - smoothStep(time / (video.duration * .1))
    const endOpacity = smoothStep((time - (endTime - fadeDuration)) / fadeDuration)
    const initialOpacity = Math.max(startOpacity, endOpacity)
    setVisibility(benefits, startOpacity)
    setVisibility(endActions, endOpacity)
    setVisibility(steam, endOpacity)
    initialElements.forEach(element => {
     element.style.opacity = String(initialOpacity)
     element.style.visibility = initialOpacity > 0 ? 'visible' : 'hidden'
    })
   }
  }
  let trigger, frame = 0, target = 0, lastSeekTime = 0
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const seek = timestamp => {
   frame = 0
   // Let the decoder finish its current frame before requesting another one.
   if (video.seeking || video.readyState < 2) return
   const distance = target - video.currentTime
   if (Math.abs(distance) <= .015) { lastSeekTime = 0; updateNotes(); return }
   const elapsed = lastSeekTime ? Math.min((timestamp - lastSeekTime) / 1000, .5) : 1 / 60
   lastSeekTime = timestamp
   const eased = distance * (1 - Math.exp(-20 * elapsed))
   const maxStep = Math.max(.04, video.duration * .035)
   const step = Math.max(-maxStep, Math.min(maxStep, eased))
   // Slow decoders catch up directly instead of building a queue of stale frames.
   video.currentTime = reducedMotion.matches || elapsed > .08 || Math.abs(distance) > video.duration * .15 || Math.abs(distance) < .04 ? target : video.currentTime + step
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(seek) }
  const stop = () => { trigger?.kill(); cancelAnimationFrame(frame); frame = 0; lastSeekTime = 0 }
  const initialize = () => {
   stop()
   frame = 0
   video.pause()
   updateNotes()
   if (!Number.isFinite(video.duration) || video.duration <= 0) return
   const sync = self => {
    target = progressToTime(self.progress, video.duration)
    updateMenu()
    schedule()
   }
   trigger = ScrollTrigger.create({
    trigger: scene || section,
    start: 'top top',
    end: () => `+=${scrollSpace ? Math.max(1, section.offsetHeight + scrollSpace.offsetHeight - window.innerHeight) : window.innerHeight * 2.5}`,
    pin: !scene,
    onUpdate: sync,
    onRefresh: sync,
    invalidateOnRefresh: true,
   })
   sync(trigger)
  }
  // Container changes (including orientation changes) must update scroll distances.
  let refreshFrame = 0
  const resizeObserver = new ResizeObserver(() => {
   cancelAnimationFrame(refreshFrame)
   refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh())
  })
  resizeObserver.observe(section)
  const composition = section.querySelector('.hero__composition')
  if (composition) resizeObserver.observe(composition)
  const onError = () => { stop(); if (menu) menu.style.removeProperty('visibility') }
  video.addEventListener('loadedmetadata', initialize)
  video.addEventListener('loadeddata', schedule)
  video.addEventListener('canplay', schedule)
  video.addEventListener('seeked', schedule)
  video.addEventListener('seeked', updateNotes)
  video.addEventListener('timeupdate', updateNotes)
  video.addEventListener('error', onError)
  if (video.readyState >= 1) initialize()
  return () => {
   resizeObserver.disconnect()
   cancelAnimationFrame(refreshFrame)
   stop()
   video.removeEventListener('loadedmetadata', initialize)
   video.removeEventListener('loadeddata', schedule)
   video.removeEventListener('canplay', schedule)
   video.removeEventListener('seeked', schedule)
   video.removeEventListener('seeked', updateNotes)
   video.removeEventListener('timeupdate', updateNotes)
   video.removeEventListener('error', onError)
   if (menu) menu.style.removeProperty('visibility')
   if (notes) { notes.style.removeProperty('opacity'); notes.style.removeProperty('visibility') }
   initialElements.forEach(element => { element.style.removeProperty('opacity'); element.style.removeProperty('visibility') })
   ;[benefits, endActions, steam].forEach(element => { if (element) { element.style.removeProperty('opacity'); element.style.removeProperty('visibility') } })
  }
 }, [videoRef, sectionRef, source])
}
