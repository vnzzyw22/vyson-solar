import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const HERO_VIDEO_SRC = '/vysao-hero-video-nuvens.mp4'
const HERO_POSTER_SRC = '/vysao-hero-sem-marca-dagua.jpg'
const CROSSFADE_SECONDS = 0.45

const backgroundLayerClassName = 'absolute inset-0 h-full w-full object-cover object-[65%_center] sm:object-center'

function HeroLoopingVideo() {
  const videoARef = useRef<HTMLVideoElement>(null)
  const videoBRef = useRef<HTMLVideoElement>(null)
  const [activeIsA, setActiveIsA] = useState(true)
  const [ready, setReady] = useState(false)
  const swappingRef = useRef(false)

  useEffect(() => {
    const a = videoARef.current
    const b = videoBRef.current
    if (!a || !b) return

    a.currentTime = 0
    void a.play().catch(() => {})

    function handleTimeUpdate(event: Event) {
      const outgoing = event.currentTarget as HTMLVideoElement
      if (swappingRef.current || !outgoing.duration) return
      if (outgoing.duration - outgoing.currentTime > CROSSFADE_SECONDS) return

      swappingRef.current = true
      const incoming = outgoing === a ? b : a
      if (!incoming) return
      incoming.currentTime = 0
      void incoming.play().catch(() => {})
      setActiveIsA((prev) => !prev)

      window.setTimeout(() => {
        outgoing.pause()
        outgoing.currentTime = 0
        swappingRef.current = false
      }, CROSSFADE_SECONDS * 1000)
    }

    a.addEventListener('timeupdate', handleTimeUpdate)
    b.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      a.removeEventListener('timeupdate', handleTimeUpdate)
      b.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  return (
    <>
      <video
        ref={videoARef}
        muted
        autoPlay
        playsInline
        preload="auto"
        onPlaying={() => setReady(true)}
        className={`${backgroundLayerClassName} transition-opacity ease-linear`}
        style={{ transitionDuration: `${CROSSFADE_SECONDS}s`, opacity: ready && activeIsA ? 1 : 0 }}
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      <video
        ref={videoBRef}
        muted
        playsInline
        preload="auto"
        className={`${backgroundLayerClassName} transition-opacity ease-linear`}
        style={{ transitionDuration: `${CROSSFADE_SECONDS}s`, opacity: ready && !activeIsA ? 1 : 0 }}
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
    </>
  )
}

export function HeroBackground() {
  const reducedMotion = useReducedMotion()

  return (
    <>
      <img
        src={HERO_POSTER_SRC}
        alt="Nuvens e sombras em movimento sobre paisagem do interior do Paraná com sistema fotovoltaico instalado"
        className={backgroundLayerClassName}
      />
      {!reducedMotion && <HeroLoopingVideo />}
    </>
  )
}
