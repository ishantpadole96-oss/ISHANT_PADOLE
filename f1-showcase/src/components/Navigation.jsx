import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { TICKER_ITEMS } from '../data/content'

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'showcase', label: 'Cars' },
  { id: 'engineering', label: 'Tech' },
  { id: 'telemetry', label: 'Data' },
  { id: 'track', label: 'Track' },
  { id: 'heritage', label: 'Heritage' },
  { id: 'gallery', label: 'Gallery' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const { scrollYProgress } = useScroll()
  const spring = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section spy
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  // Lock body scroll when overlay open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const go = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  return (
    <>
      {/* Top scroll progress bar */}
      <motion.div
        style={{ scaleX: spring }}
        className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-[#ff2d55] z-[70]"
        aria-hidden="true"
      />

      {/* Nav bar */}
      <header
        className={`fixed top-0 inset-x-0 z-[60] transition-all duration-500 ${
          scrolled ? 'py-3 backdrop-blur-xl bg-[#05060a]/80 border-b border-white/10' : 'py-6 bg-transparent'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between" aria-label="Primary">
          {/* Logo */}
          <button onClick={() => go('hero')} className="flex items-center gap-3 group" aria-label="APEX GP — go to top">
            <svg width="34" height="34" viewBox="0 0 32 32" className="transition-transform duration-300 group-hover:rotate-[15deg]">
              <rect width="32" height="32" rx="6" fill="#0b0d12" stroke="#ff2d55" strokeOpacity="0.5" />
              <path d="M6 24 L16 6 L26 24 L21 24 L16 14 L11 24 Z" fill="#ff2d55" />
            </svg>
            <span className="font-display font-bold tracking-[0.22em] text-sm hidden sm:block">
              APEX<span className="text-[#ff2d55]">GP</span>
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => go(s.id)}
                  className={`relative px-4 py-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors ${
                    active === s.id ? 'text-white' : 'text-[#9aa3b2] hover:text-white'
                  }`}
                >
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 bottom-0.5 h-[2px] bg-[#ff2d55]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {s.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <span className="hidden md:flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[#9aa3b2]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] pulse-dot" /> LIVE DEMO DATA
            </span>
            {/* Burger */}
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="lg:hidden relative w-11 h-11 flex items-center justify-center hairline bg-white/[0.03]"
            >
              <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-[3px]' : ''}`} />
              <span className={`absolute block w-5 h-[2px] bg-white transition-all duration-300 ${open ? '-rotate-45' : ''}`} style={{ top: open ? undefined : '21px' }} />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen overlay (mobile / tablet + desktop full menu) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(140% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[55] carbon"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="tech-grid absolute inset-0 opacity-60" />
            <div className="relative h-full flex flex-col justify-center px-8 md:px-20 max-w-[1400px] mx-auto">
              <p className="kicker mb-8">Navigation // {String(SECTIONS.findIndex((s) => s.id === active) + 1).padStart(2, '0')} of {SECTIONS.length}</p>
              <ul className="space-y-1">
                {SECTIONS.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                  >
                    <button
                      onClick={() => go(s.id)}
                      className="group flex items-baseline gap-5 py-2"
                    >
                      <span className="font-mono text-xs text-[#ff2d55]">{String(i + 1).padStart(2, '0')}</span>
                      <span className={`headline-xl text-[clamp(2rem,7vw,4rem)] transition-colors ${active === s.id ? 'text-[#ff2d55]' : 'text-white/85 group-hover:text-white'}`}>
                        {s.label}
                      </span>
                      <span className="h-px flex-1 bg-white/10 group-hover:bg-[#ff2d55]/60 transition-colors" />
                    </button>
                  </motion.li>
                ))}
              </ul>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-10 font-mono text-[10px] tracking-[0.3em] text-[#9aa3b2]"
              >
                FICTIONAL DEMO CONCEPT · NOT OFFICIAL F1 CONTENT
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ticker strip pinned under nav on hero only — rendered as fixed bottom strip */}
      <div className="fixed bottom-0 inset-x-0 z-[50] pointer-events-none">
        <div className="border-t border-white/10 bg-[#05060a]/85 backdrop-blur-md overflow-hidden">
          <div className="marquee-track flex whitespace-nowrap py-2 w-max">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-6 px-8 font-mono text-[10px] tracking-[0.3em] text-[#9aa3b2]">
                <span className="w-1 h-1 rotate-45 bg-[#ff2d55]" /> {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right side section dots */}
      <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-[58] flex-col gap-4 items-end" aria-hidden="true">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => go(s.id)}
            tabIndex={-1}
            className="group flex items-center gap-3"
          >
            <span className={`font-mono text-[9px] tracking-[0.25em] uppercase transition-all ${active === s.id ? 'opacity-100 text-white' : 'opacity-0 group-hover:opacity-60 text-[#9aa3b2]'}`}>
              {s.label}
            </span>
            <span className={`block rounded-full transition-all duration-300 ${active === s.id ? 'w-2.5 h-2.5 bg-[#ff2d55]' : 'w-1.5 h-1.5 bg-white/30 group-hover:bg-white/70'}`} />
          </button>
        ))}
      </div>
    </>
  )
}
