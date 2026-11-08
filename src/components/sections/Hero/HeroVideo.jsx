import { useRef, useState } from 'react'
import burgerVideo from '../../../assets/videos/bg-video.mp4'
import useScrollVideo from './hooks/useScrollVideo.js'
export default function HeroVideo({ sectionRef }) {
 const videoRef = useRef(null)
 const [failed, setFailed] = useState(false)
 useScrollVideo(videoRef, sectionRef)
 return <><video className="hero__video" ref={videoRef} src={burgerVideo} preload="auto" muted playsInline aria-hidden="true" onError={() => setFailed(true)} />
  {failed && <p className="hero__video-error" role="status">Видео не удалось загрузить. Обновите страницу, чтобы попробовать ещё раз.</p>}</>
}
