import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { CarSide } from './CarArt'
import { HERO_STATS } from '../data/content'
import { RevealText, MagneticButton } from './Motion'
import { useMouseParallax, usePrefersReducedMotion, useCountUp, useInView } from '../hooks/useMotion'

function StatCounter({ label, value, suffix, decimals }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  const display = useCountUp(value, { decimals, start: inView, duration: 2000 })
  return (
    <div ref={ref} className="border-l border-white/15 pl-4">
      <p className="kicker mb-1">{label}</p>
      <p className="font-display font-bold text-[clamp(1.1rem,2vw,1.7rem)] tabular-nums">
        {display}<span className="text-[#ff2d55] text-[0.7em] ml-1">{suffix}</span>
      </p>
    </div>
  )
}

export default function Hero() {
  const wrapRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  const mouse = useMouseParallax(!reduced)
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end start'] })
  const carY = useTransform(scrollYProgress, [0, 1], [0, 220])
  const carScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  // Speed lines that periodically streak across
  const [lines, setLines] = useState([])
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setLines((prev) => [...prev.slice(-6), { id: Math.random(), top: Math.random() * 90, w: 30 + Math.random() * 40, dur: 0.5 + Math.random() * 0.7 }])
    }, 900)
    return () => clearInterval(id)
  }, [reduced])

  const launch = () => {
    document.getElementById('showcase')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
    if (!reduced) {
      confetti({ particleCount: 90, spread: 100, origin: { y: 0.7 }, colors: ['#ff2d55', '#ffffff', '#38bdf8'], disableForReducedMotion: true })
    }
  }

  return (
    <section
      id="hero"
      ref={wrapRef}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-24 pb-28"
      aria-label="APEX GP hero"
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 tech-grid opacity-70" aria-hidden="true" />
      <div
        className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[140vw] h-[120vh] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(255,45,85,0.16), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 h-px hazard opacity-40" aria-hidden="true" />

      {/* Animated speed lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <AnimatePresence>
          {lines.map((l) => (
            <motion.span
              key={l.id}
              initial={{ x: '-40%', opacity: 0 }}
              animate={{ x: '140%', opacity: [0, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: l.dur, ease: 'linear' }}
              onAnimationComplete={() => setLines((p) => p.filter((x) => x.id !== l.id))}
              className="absolute h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
              style={{ top: `${l.top}%`, width: `${l.w}%` }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Giant outline word behind */}
      <motion.div style={{ x: mouse.x * -18 }} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span className="headline-xl text-stroke text-[26vw] leading-none opacity-40">APEX</span>
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-10 w-full">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rotate-45 bg-[#ff2d55]" />
          <p className="kicker">Apex Grand Prix Works · Concept Showcase 2026</p>
        </div>

        <h1 className="headline-xl text-[clamp(3.4rem,10.5vw,10.5rem)] mb-6" aria-label="Engineered for Speed">
          <RevealText text="ENGINEERED" delay={0.1} className="block" />
          <span className="block">
            <RevealText text="FOR" delay={0.3} className="inline-block mr-4" />
            <RevealText text="SPEED" delay={0.42} className="inline-block text-[#ff2d55]" />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="max-w-xl text-[#c7cdd8] text-base md:text-lg leading-relaxed mb-10"
        >
          Every gram accounted for. Every surface a decision. The AX-24 is a rolling argument
          that aerodynamics, hybrid power and human instinct converge at exactly one place — the apex.
          <span className="block mt-2 font-mono text-[10px] tracking-[0.25em] text-[#9aa3b2]">// FICTIONAL DEMO VEHICLE &amp; SPECIFICATIONS</span>
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap items-center gap-5 mb-14"
        >
          <MagneticButton className="btn-primary glow-red" onClick={launch}>
            Explore the Machine
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="2" /></svg>
          </MagneticButton>
          <a href="#telemetry" className="btn-ghost">Live Telemetry</a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-y-6 gap-x-4"
        >
          {HERO_STATS.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </motion.div>
      </motion.div>

      {/* The car */}
      <motion.div
        style={{ y: carY, scale: carScale, x: mouse.x * 26 }}
        className="relative z-[5] mt-6 md:-mt-24 will-change-transform"
        initial={{ opacity: 0, x: '-18%' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-[1400px] mx-auto px-2 md:px-10">
          <CarSide id="hero-car" color="#ff2d55" accent="#f4f4f5" className="w-full drop-shadow-[0_40px_60px_rgba(255,45,85,0.18)]" />
        </div>
        {/* floor light bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-16 bg-[#ff2d55]/20 blur-3xl rounded-full" aria-hidden="true" />
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] text-[#9aa3b2]">SCROLL</span>
        <span className="relative block w-px h-12 bg-white/15 overflow-hidden">
          {!reduced && <motion.span className="absolute inset-x-0 h-4 bg-[#ff2d55]" animate={{ y: [-16, 48] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />}
        </span>
      </motion.div>

      {/* HUD corner data */}
      <div className="hidden lg:block absolute right-10 top-32 z-10 text-right font-mono text-[10px] tracking-[0.2em] text-[#9aa3b2] space-y-1" aria-hidden="true">
        <p>LAT 45.6212° N — APEX RING</p>
        <p>TRACK TEMP 41°C · WIND 2.4 M/S</p>
        <p className="text-[#a3e635]">● SYSTEM NOMINAL</p>
      </div>
    </section>
  )
}
