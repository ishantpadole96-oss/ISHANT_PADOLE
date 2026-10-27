import { useEffect, useState } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Showcase from './components/Showcase'
import Technical from './components/Technical'
import Telemetry from './components/Telemetry'
import TrackMap from './components/TrackMap'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
import { HorizontalGallery, SceneBreak, SiteFooter } from './components/Extras'

/** Cinematic preloader — start-light sequence */
function Preloader({ onDone }) {
  const [lights, setLights] = useState(0)
  const [gone, setGone] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { onDone(); setGone(true); return }
    const id = setInterval(() => {
      setLights((l) => {
        if (l >= 5) { clearInterval(id); setTimeout(() => { onDone(); setGone(true) }, 600); return l }
        return l + 1
      })
    }, 320)
    return () => clearInterval(id)
  }, [onDone])
  if (gone) return null
  return (
    <div className="fixed inset-0 z-[100] bg-[#05060a] flex flex-col items-center justify-center gap-8 transition-opacity duration-700" style={{ opacity: lights >= 5 ? 0 : 1 }} aria-hidden="true">
      <p className="kicker">APEX GP · SYSTEM BOOT</p>
      <div className="flex gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 transition-all duration-300 ${i < lights ? 'bg-[#ff2d55] border-[#ff2d55] shadow-[0_0_30px_rgba(255,45,85,0.8)] scale-110' : 'border-white/20'}`} />
        ))}
      </div>
      <p className="font-display font-bold tracking-[0.4em] text-white/70">ENGINEERED FOR SPEED</p>
    </div>
  )
}

/** Custom cursor with magnetic hover states (pointer-fine only) */
function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hot, setHot] = useState(false)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    document.documentElement.classList.add('has-custom-cursor')
    let raf = null
    const move = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY })
        const el = e.target.closest('a, button, [role="button"], input')
        setHot(!!el)
        raf = null
      })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => { window.removeEventListener('pointermove', move); document.documentElement.classList.remove('has-custom-cursor') }
  }, [])
  if (!window.matchMedia('(pointer: fine)').matches) return null
  return (
    <div
      className="fixed z-[9999] pointer-events-none hidden md:block mix-blend-difference"
      style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
      aria-hidden="true"
    >
      <div className={`rounded-full border border-white transition-all duration-200 ${hot ? 'w-12 h-12 bg-white/10' : 'w-8 h-8'}`}>
        <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />
      <Cursor />
      <a href="#showcase" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[101] focus:bg-white focus:text-black focus:px-4 focus:py-2">Skip to content</a>
      <main className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navigation />
        <Hero />
        <Showcase />
        <HorizontalGallery />
        <SceneBreak />
        <Technical />
        <Telemetry />
        <TrackMap />
        <Timeline />
        <Gallery />
        <SiteFooter />
      </main>
    </>
  )
}
