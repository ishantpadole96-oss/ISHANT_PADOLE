import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import confetti from 'canvas-confetti'
import { CARS } from '../data/content'
import { CarSide } from './CarArt'
import { MagneticButton } from './Motion'
import { usePrefersReducedMotion } from '../hooks/useMotion'

/** Horizontal gallery driven by vertical scroll (sticky pin) */
export function HorizontalGallery() {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })

  // Travel distance measured from the track's real width; updates on resize.
  const [travel, setTravel] = useState(0)
  useEffect(() => {
    const measure = () => { if (trackRef.current) setTravel(-(trackRef.current.scrollWidth - window.innerWidth + 80)) }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  const mx = useTransform(scrollYProgress, [0, 1], [0, travel])

  return (
    <section ref={wrapRef} className="relative" style={{ height: '340vh' }} aria-label="Horizontal fleet gallery">
      <div className="sticky top-0 h-[100svh] overflow-hidden flex items-center bg-[#05060a]">
        <div className="absolute inset-0 tech-grid opacity-30" aria-hidden="true" />
        {/* heading stays fixed */}
        <div className="absolute top-24 left-5 md:left-10 z-10">
          <p className="kicker mb-2">The Fleet // Scroll to traverse</p>
          <h2 className="headline-xl text-[clamp(2rem,5vw,4rem)]">FOUR CHAPTERS,<span className="text-[#ff2d55]"> ONE OBSESSION</span></h2>
        </div>

        <motion.div
          ref={trackRef}
          style={reduced ? undefined : { x: mx }}
          className={`flex gap-8 px-10 will-change-transform ${reduced ? 'overflow-x-auto no-scrollbar w-full' : ''}`}
        >
          {CARS.map((c, i) => (
            <article key={c.id} className="relative shrink-0 w-[78vw] md:w-[54vw] lg:w-[40vw] xl:w-[34vw] h-[62vh] self-end mt-32 group">
              <div className="absolute inset-0 hairline carbon overflow-hidden transition-transform duration-700 group-hover:-translate-y-2">
                <div className="scanline opacity-60" aria-hidden="true" />
                <CarSide id={`hg-${c.id}`} color={c.palette.primary} accent={c.palette.secondary} className="absolute bottom-8 left-0 w-[92%] transition-transform duration-700 group-hover:scale-[1.04]" />
                <span className="absolute top-4 right-5 font-display font-bold text-[90px] leading-none text-white/5">{String(i + 1).padStart(2, '0')}</span>
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/85 to-transparent">
                  <p className="font-display font-bold uppercase tracking-wide">{c.name}</p>
                  <p className="kicker mt-1">{c.year} · {c.specs.power.value} HP · {c.specs.speed.value} KM/H</p>
                </div>
              </div>
            </article>
          ))}
          {/* terminal panel */}
          <div className="shrink-0 w-[78vw] md:w-[54vw] lg:w-[40vw] xl:w-[34vw] h-[62vh] self-end mt-32 flex items-center justify-center">
            <div className="text-center">
              <p className="headline-xl text-[clamp(1.6rem,3vw,2.6rem)] text-white/70">END OF<span className="text-[#ff2d55]"> GARAGE</span></p>
              <p className="kicker mt-3">// CONTINUE TO ENGINEERING DECK</p>
            </div>
          </div>
        </motion.div>

        {/* progress rail */}
        {!reduced && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[60%] max-w-2xl h-px bg-white/10" aria-hidden="true">
            <motion.div className="absolute inset-y-[-1px] left-0 bg-[#ff2d55]" style={{ scaleX: scrollYProgress, width: '100%', transformOrigin: 'left' }} />
          </div>
        )}
      </div>
    </section>
  )
}

/** Cinematic scene break with clip-path wipe */
export function SceneBreak() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const clip = useTransform(scrollYProgress, [0, 0.5, 1], ['inset(50% 0% 50% 0%)', 'inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1])
  return (
    <div ref={ref} className="relative h-[70vh] overflow-hidden carbon">
      <motion.div style={{ clipPath: clip, scale }} className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6">
          <p className="kicker mb-4">Interlude</p>
          <p className="headline-xl text-[clamp(2.4rem,8vw,7rem)]">
            GRIP IS A <span className="text-[#ff2d55]">NEGOTIATION</span>
          </p>
          <p className="mt-5 max-w-xl mx-auto text-[#9aa3b2] text-sm leading-relaxed">
            850 kg of downforce at 240 km/h — the car is pushed onto the road by the sky itself.
            Below, we open the machine.
          </p>
        </div>
      </motion.div>
      <div className="absolute inset-x-0 top-0 h-px hazard opacity-50" />
      <div className="absolute inset-x-0 bottom-0 h-px hazard opacity-50" />
    </div>
  )
}

/** Footer with functional newsletter capture */
export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const reduced = usePrefersReducedMotion()

  const submit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus('error'); return }
    setStatus('success')
    if (!reduced) confetti({ particleCount: 120, spread: 70, origin: { y: 0.9 }, colors: ['#ff2d55', '#fff'], disableForReducedMotion: true })
    setEmail('')
  }

  return (
    <footer className="relative pt-28 pb-16 overflow-hidden border-t border-white/10" aria-label="Footer">
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[120vw] h-64 bg-[#ff2d55]/10 blur-[100px] rounded-full" aria-hidden="true" />
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 relative">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <p className="kicker mb-4">Stay On The Grid</p>
            <h2 className="headline-xl text-[clamp(2.2rem,5vw,4.4rem)] mb-6">GET THE NEXT<br /><span className="text-[#ff2d55]">TELEMETRY DROP</span></h2>
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-lg" noValidate>
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input
                id="nl-email" type="email" required value={email}
                onChange={(e) => { setEmail(e.target.value); if (status !== 'idle') setStatus('idle') }}
                placeholder="you@pitwall.com"
                className="flex-1 bg-white/[0.04] hairline px-5 py-4 font-mono text-sm placeholder:text-[#5b6474] focus:border-[#ff2d55] focus:outline-none transition-colors"
                aria-invalid={status === 'error'}
                aria-describedby="nl-status"
              />
              <MagneticButton className="btn-primary" type="submit">Subscribe →</MagneticButton>
            </form>
            <p id="nl-status" role="status" aria-live="polite" className={`mt-3 font-mono text-xs tracking-[0.2em] ${status === 'error' ? 'text-[#ff2d55]' : status === 'success' ? 'text-[#a3e635]' : 'text-transparent'}`}>
              {status === 'error' ? 'CHECK THE EMAIL FORMAT AND RETRY.' : status === 'success' ? '✓ LOGGED — WELCOME TO THE PIT WALL (DEMO)' : 'placeholder'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:justify-items-end">
            {[
              ['Sections', [['Showcase', '#showcase'], ['Engineering', '#engineering'], ['Telemetry', '#telemetry'], ['Track', '#track'], ['Heritage', '#heritage'], ['Gallery', '#gallery']]],
              ['Credits', [['Design system', null], ['Vector artwork', null], ['Simulated data', null], ['Framer Motion engine', null]]],
            ].map(([title, links]) => (
              <nav key={title} aria-label={title}>
                <p className="kicker mb-4">{title}</p>
                <ul className="space-y-2.5">
                  {links.map(([label, href]) => (
                    <li key={label}>
                      {href
                        ? <a href={href} className="text-sm text-[#9aa3b2] hover:text-white transition-colors inline-flex items-center gap-2"><span className="w-1 h-1 rotate-45 bg-[#ff2d55]/70" />{label}</a>
                        : <span className="text-sm text-[#9aa3b2]">{label}</span>}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 font-mono text-[10px] tracking-[0.25em] text-[#5b6474]">
          <p>© 2026 APEX GP CONCEPT — FICTIONAL SHOWCASE. NOT AFFILIATED WITH FORMULA 1.</p>
          <p>BUILT WITH REACT · FRAMER MOTION · VECTOR ARTWORK</p>
        </div>
      </div>
    </footer>
  )
}
