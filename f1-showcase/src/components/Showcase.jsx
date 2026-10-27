import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { CARS } from '../data/content'
import { CarSide, CarFront, CarRear } from './CarArt'
import { SectionHeader, FadeUp } from './Motion'
import { useCountUp, useInView, usePrefersReducedMotion } from '../hooks/useMotion'

const VIEWS = ['side', 'front', 'rear']

function SpecCounter({ label, value, unit, decimals = 0, accent }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  const display = useCountUp(value, { decimals, start: inView, duration: 1400 })
  return (
    <div ref={ref} className="glass px-4 py-3">
      <p className="kicker mb-1">{label}</p>
      <p className="font-display font-bold text-xl md:text-2xl tabular-nums">
        {display}
        <span style={{ color: accent }} className="text-[11px] ml-1.5 font-mono tracking-widest">{unit}</span>
      </p>
    </div>
  )
}

export default function Showcase() {
  const [idx, setIdx] = useState(0)
  const [view, setView] = useState('side')
  const [compare, setCompare] = useState(false)
  const reduced = usePrefersReducedMotion()
  const car = CARS[idx]
  const wrapRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] })
  const bgX = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const ViewComp = view === 'front' ? CarFront : view === 'rear' ? CarRear : CarSide

  return (
    <section id="showcase" ref={wrapRef} className="relative py-28 md:py-36 overflow-hidden" aria-label="Car showcase">
      {/* Moving background year */}
      <motion.span
        style={{ x: bgX }}
        className="absolute top-16 right-[-5%] headline-xl text-stroke text-[20vw] opacity-[0.07] pointer-events-none select-none"
        aria-hidden="true"
      >
        {car.year}
      </motion.span>

      <div className="max-w-[1400px] mx-auto px-5 md:px-10 relative">
        <SectionHeader
          index="01"
          kicker="The Garage // Fictional Demo Fleet"
          title="MACHINES OF INTENT"
          right={
            <button
              onClick={() => setCompare((c) => !c)}
              aria-pressed={compare}
              className={`btn-ghost !py-3 !text-[11px] ${compare ? '!border-[#ff2d55] !bg-[#ff2d55]/10' : ''}`}
            >
              {compare ? 'Exit Comparison' : 'Compare All'}
            </button>
          }
        />

        <AnimatePresence mode="wait">
          {compare ? (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 xl:grid-cols-4 gap-5"
            >
              {CARS.map((c, i) => (
                <FadeUp key={c.id} delay={i * 0.08}>
                  <article className="hairline bg-white/[0.02] p-5 hover:border-[color:var(--pc)] transition-colors group" style={{ '--pc': c.palette.primary }}>
                    <CarSide id={`cmp-${c.id}`} color={c.palette.primary} accent={c.palette.secondary} className="w-full group-hover:translate-x-1 transition-transform duration-500" />
                    <h3 className="font-display font-bold text-lg mt-4">{c.name}</h3>
                    <p className="kicker mb-4">{c.year} · {c.team}</p>
                    <table className="w-full text-sm font-mono">
                      <tbody>
                        {[['POWER', `${c.specs.power.value} hp`], ['WEIGHT', `${c.specs.weight.value} kg`], ['TOP SPEED', `${c.specs.speed.value} km/h`], ['DOWNFORCE', `${c.specs.downforce.value} kg`]].map(([k, v]) => (
                          <tr key={k} className="border-t border-white/8">
                            <td className="py-2 text-[#9aa3b2] text-xs tracking-widest">{k}</td>
                            <td className="py-2 text-right tabular-nums">{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </article>
                </FadeUp>
              ))}
            </motion.div>
          ) : (
            <motion.div key="single" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              {/* Selector tabs */}
              <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Select car">
                {CARS.map((c, i) => (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={i === idx}
                    onClick={() => { setIdx(i); setView('side') }}
                    className={`px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] uppercase border transition-all duration-300 ${
                      i === idx ? 'text-black font-bold' : 'text-[#9aa3b2] border-white/15 hover:border-white/40 hover:text-white'
                    }`}
                    style={i === idx ? { background: c.palette.primary, borderColor: c.palette.primary } : {}}
                  >
                    {c.name.replace('APEX ', '')}
                  </button>
                ))}
              </div>

              <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
                {/* Car stage */}
                <div className="relative">
                  <div className="carbon hairline relative overflow-hidden">
                    <div className="scanline" aria-hidden="true" />
                    {/* view switcher */}
                    <div className="absolute top-4 left-4 z-10 flex gap-1 bg-black/50 backdrop-blur p-1 hairline" role="group" aria-label="Car view">
                      {VIEWS.map((v) => (
                        <button
                          key={v}
                          onClick={() => setView(v)}
                          aria-pressed={view === v}
                          className={`px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${view === v ? 'bg-white text-black' : 'text-[#9aa3b2] hover:text-white'}`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${car.id}-${view}`}
                        initial={reduced ? false : { opacity: 0, x: 60, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={reduced ? undefined : { opacity: 0, x: -60, filter: 'blur(6px)' }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="p-6 md:p-10"
                      >
                        <ViewComp id={`show-${car.id}`} color={car.palette.primary} accent={car.palette.secondary} className={view === 'side' ? 'w-full' : 'w-full max-w-xl mx-auto'} />
                      </motion.div>
                    </AnimatePresence>
                    {/* HUD readouts over image */}
                    <div className="absolute bottom-3 right-4 font-mono text-[9px] tracking-[0.2em] text-[#9aa3b2] space-y-0.5 text-right pointer-events-none" aria-hidden="true">
                      <p>VIEW: {view.toUpperCase()} · RENDER: VECTOR</p>
                      <p>PID {car.id.toUpperCase()} · STATUS <span style={{ color: car.palette.primary }}>SHOWCASE</span></p>
                    </div>
                  </div>

                  {/* Aero strip */}
                  <FadeUp delay={0.15}>
                    <div className="mt-5 glass p-5 flex gap-4 items-start">
                      <span className="font-mono text-[10px] tracking-[0.25em] shrink-0 mt-1" style={{ color: car.palette.primary }}>AERO</span>
                      <p className="text-sm text-[#c7cdd8] leading-relaxed">{car.aero}</p>
                    </div>
                  </FadeUp>
                </div>

                {/* Info column */}
                <div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={car.id}
                      initial={reduced ? false : { opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? undefined : { opacity: 0, y: -16 }}
                      transition={{ duration: 0.45 }}
                    >
                      <p className="kicker mb-2">{car.year} · {car.team}</p>
                      <h3 className="headline-xl text-[clamp(2rem,4vw,3.2rem)] mb-2">{car.name}</h3>
                      <p className="font-display text-lg mb-5" style={{ color: car.palette.primary }}>{car.tagline}</p>
                      <p className="text-[#c7cdd8] text-sm leading-relaxed mb-6">{car.description}</p>

                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <SpecCounter label={car.specs.power.label} value={car.specs.power.value} unit={car.specs.power.unit} accent={car.palette.primary} />
                        <SpecCounter label={car.specs.weight.label} value={car.specs.weight.value} unit={car.specs.weight.unit} accent={car.palette.primary} />
                        <SpecCounter label={car.specs.speed.label} value={car.specs.speed.value} unit={car.specs.speed.unit} accent={car.palette.primary} />
                        <SpecCounter label={car.specs.downforce.label} value={car.specs.downforce.value} unit={car.specs.downforce.unit} accent={car.palette.primary} />
                      </div>

                      <div className="hairline p-5 bg-white/[0.02] mb-6">
                        <p className="kicker mb-3">Power Unit</p>
                        <p className="font-mono text-sm">{car.powerUnit}</p>
                        <ul className="mt-4 space-y-2">
                          {car.highlights.map((h) => (
                            <li key={h} className="flex items-center gap-3 text-sm text-[#c7cdd8]">
                              <span className="w-1.5 h-1.5 rotate-45 shrink-0" style={{ background: car.palette.primary }} /> {h}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-4 items-start hairline border-l-2 !border-l-[color:var(--pc)] p-5 bg-white/[0.02]" style={{ '--pc': car.palette.primary }}>
                        <div>
                          <p className="kicker mb-2">Racing History (fictional)</p>
                          <p className="text-sm text-[#c7cdd8] leading-relaxed">{car.history}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
