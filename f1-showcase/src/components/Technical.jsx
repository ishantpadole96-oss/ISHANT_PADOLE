import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { COMPONENTS } from '../data/content'
import { CarSide } from './CarArt'
import { SectionHeader } from './Motion'

export default function Technical() {
  const [activeId, setActiveId] = useState('floor')
  const wrapRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] })
  const sweep = useTransform(scrollYProgress, [0, 1], ['-30%', '130%'])

  const active = COMPONENTS.find((c) => c.id === activeId)

  return (
    <section id="engineering" ref={wrapRef} className="relative py-28 md:py-36 overflow-hidden bg-[#07080d]" aria-label="Interactive technical breakdown">
      <div className="absolute inset-0 tech-grid opacity-40" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-10 relative">
        <SectionHeader
          index="02"
          kicker="Anatomy // Interactive Schematic"
          title="EVERY SURFACE HAS A JOB"
          right={<p className="max-w-xs text-sm text-[#9aa3b2] leading-relaxed">Tap a hotspot on the schematic — or browse the component list — to decode what each part does at 300 km/h.</p>}
        />

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
          {/* Schematic stage */}
          <div className="relative carbon hairline overflow-hidden">
            {/* scroll-driven light sweep */}
            <motion.div style={{ x: sweep }} className="absolute inset-y-0 w-1/4 pointer-events-none z-10" aria-hidden="true">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-[#38bdf8]/10 to-transparent" />
            </motion.div>

            <CarSide id="tech-car" color="#2a2f3a" accent="#8b93a5" dark="#0a0c11" className="w-full p-4 md:p-8 opacity-90" />

            {/* Hotspots overlay */}
            <div className="absolute inset-0" role="group" aria-label="Car component hotspots">
              {COMPONENTS.map((c) => {
                const isActive = c.id === activeId
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveId(c.id)}
                    onMouseEnter={() => setActiveId(c.id)}
                    aria-pressed={isActive}
                    aria-label={`Inspect ${c.name}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${c.pos.x}%`, top: `${c.pos.y}%` }}
                  >
                    <span className={`relative block w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        isActive ? 'bg-[#ff2d55] border-white scale-125' : 'bg-black/60 border-[#ff2d55]/70 group-hover:scale-125'
                      }`}>
                      {!isActive && <span className="absolute inset-0 rounded-full border border-[#ff2d55]/60 hotspot-ping" />}
                    </span>
                    <span className={`absolute left-1/2 -translate-x-1/2 top-5 whitespace-nowrap font-mono text-[9px] tracking-[0.2em] uppercase transition-all duration-300 ${
                        isActive ? 'opacity-100 text-white' : 'opacity-0 group-hover:opacity-70 text-[#9aa3b2]'
                      }`}
                    >
                      {c.name}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* connecting line + label panel bottom-left */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 sm:right-auto sm:max-w-md glass !border-b-0 !border-x-0 p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-bold text-lg">{active.name}</h3>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#ff2d55]">{active.stat}</span>
                </div>
                <p className="text-sm text-[#c7cdd8] leading-relaxed">{active.desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Component list */}
          <div>
            <ul className="space-y-1 max-h-[560px] overflow-y-auto no-scrollbar pr-2">
              {COMPONENTS.map((c, i) => {
                const isActive = c.id === activeId
                return (
                  <li key={c.id}>
                    <button
                      onClick={() => setActiveId(c.id)}
                      aria-pressed={isActive}
                      className={`w-full text-left flex items-center gap-4 px-4 py-3.5 border-l-2 transition-all duration-300 ${
                        isActive
                          ? 'border-[#ff2d55] bg-[#ff2d55]/[0.07]'
                          : 'border-white/10 hover:border-white/40 hover:bg-white/[0.03]'
                      }`}
                    >
                      <span className={`font-mono text-[10px] w-6 ${isActive ? 'text-[#ff2d55]' : 'text-[#9aa3b2]'}`}>{String(i + 1).padStart(2, '0')}</span>
                      <span className={`font-display font-semibold tracking-wide uppercase text-sm ${isActive ? 'text-white' : 'text-[#9aa3b2]'}`}>{c.name}</span>
                      <span className={`ml-auto h-px flex-1 mx-2 transition-colors ${isActive ? 'bg-[#ff2d55]/60' : 'bg-white/10'}`} />
                      <span className="font-mono text-[9px] text-[#9aa3b2] hidden xl:block truncate max-w-[140px]">{c.stat}</span>
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Measurement strip */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[['L × W × H', '5631 × 2000 × 967 mm'], ['WHEELBASE', '3600 mm'], ['MIN MASS', '798 kg']].map(([k, v]) => (
                <div key={k} className="hairline p-3 bg-white/[0.02]">
                  <p className="kicker mb-1">{k}</p>
                  <p className="font-mono text-[11px]">{v}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 font-mono text-[9px] tracking-[0.2em] text-[#9aa3b2]">// DEMO FIGURES — NOT OFFICIAL REGULATIONS DATA</p>
          </div>
        </div>
      </div>
    </section>
  )
}
