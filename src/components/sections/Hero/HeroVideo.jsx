import { useRef, useState, useSyncExternalStore } from 'react'
import burgerVideo from '../../../assets/videos/bg-video.mp4'
import phoneVideo from '../../../assets/videos/bg-video_phone.mp4'
import useScrollVideo from './hooks/useScrollVideo.js'

const phoneQuery = '(max-width: 1023px)'
const subscribeToPhoneLayout = callback => {
 const media = window.matchMedia(phoneQuery)
 media.addEventListener('change', callback)
 return () => media.removeEventListener('change', callback)
}
const isPhoneLayout = () => window.matchMedia(phoneQuery).matches

export default function HeroVideo({ sectionRef }) {
 const videoRef = useRef(null)
 const [failed, setFailed] = useState(false)
 const phone = useSyncExternalStore(subscribeToPhoneLayout, isPhoneLayout, () => false)
 const source = phone ? phoneVideo : burgerVideo
 useScrollVideo(videoRef, sectionRef, source)
 const updateAspectRatio = event => {
  const { videoWidth, videoHeight } = event.currentTarget
  if (videoWidth && videoHeight) {
   sectionRef.current?.style.setProperty('--hero-video-aspect', `${videoWidth} / ${videoHeight}`)
  }
 }
 return <><video className="hero__video" ref={videoRef} src={source} preload="auto" muted playsInline aria-hidden="true" onLoadStart={() => setFailed(false)} onLoadedMetadata={updateAspectRatio} onError={() => setFailed(true)} />
  {failed && <p className="hero__video-error" role="status">Видео не удалось загрузить. Обновите страницу, чтобы попробовать ещё раз.</p>}</>
}
