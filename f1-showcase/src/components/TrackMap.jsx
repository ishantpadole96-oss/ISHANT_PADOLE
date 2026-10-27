import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { TRACK } from '../data/content'
import { SectionHeader } from './Motion'
import { usePrefersReducedMotion } from '../hooks/useMotion'

/** Build a stylized closed circuit path with smooth curves */
function buildTrackPath() {
  const pts = [
    [80, 300], [70, 180], [140, 90], [300, 70], [420, 120], [520, 70],
    [680, 60], [780, 130], [800, 240], [720, 300], [640, 260], [560, 300],
    [520, 380], [560, 450], [700, 470], [760, 420], [700, 360], [560, 400],
    [420, 430], [300, 460], [180, 430], [110, 380],
  ]
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]
    const [x1, y1] = pts[i]
    const mx = (x0 + x1) / 2, my = (y0 + y1) / 2
    d += ` Q ${x0} ${y0} ${mx} ${my}`
  }
  d += ` Q ${pts[0][0]} ${pts[0][1]} ${(pts[0][0] + pts[1][0]) / 2} ${(pts[0][1] + pts[1][1]) / 2}`
  d += ' Z'
  return d
}

export default function TrackMap() {
  const reduced = usePrefersReducedMotion()
  const wrapRef = useRef(null)
  const svgRef = useRef(null)
  const pathRef = useRef(null)
  const [len, setLen] = useState(0)
  const [activeCorner, setActiveCorner] = useState(null)
  const [autoT, setAutoT] = useState(0)

  const d = useMemo(buildTrackPath, [])

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength())
  }, [d])

  // Auto lap animation when not scroll-driving and not reduced
  useEffect(() => {
    if (reduced) return
    let raf
    const loop = (now) => { setAutoT((now / 22000) % 1); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] })
  const reveal = useTransform(scrollYProgress, [0.15, 0.85], [0, 1])
  const [revealed, setRevealed] = useState(reduced ? 1 : 0)
  useEffect(() => reveal.on('change', (v) => !reduced && setRevealed(v)), [reveal, reduced])

  // car follows scroll-reveal while sweeping in, then loops like a live lap
  const carT = revealed > 0.02 && revealed < 1 ? revealed : autoT

  const pointAt = (tt) => {
    if (!pathRef.current || !len) return { x: 0, y: 0 }
    return pathRef.current.getPointAtLength(tt * len)
  }
  const p = pointAt(carT)
  const pAhead = pointAt(Math.min(0.999, carT + 0.004))
  const angle = (p && pAhead) ? (Math.atan2(pAhead.y - p.y, pAhead.x - p.x) * 180) / Math.PI : 0

  const sectorFor = (tt) => TRACK.sectors.find((s) => tt >= s.range[0] && tt < s.range[1]) || TRACK.sectors[2]

  return (
    <section id="track" ref={wrapRef} className="relative py-28 md:py-36 overflow-hidden bg-[#07080d]" aria-label="Interactive track map">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 relative">
        <SectionHeader
          index="04"
          kicker={`Circuit // ${TRACK.name}`}
          title="ONE LAP, TOLD IN MOTION"
          right={
            <div className="flex gap-6 font-mono text-xs text-[#9aa3b2]">
              <span>{TRACK.length}</span><span>{TRACK.turns} TURNS</span><span>{TRACK.drs} DRS ZONES</span>
            </div>
          }
        />

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 items-start">
          {/* Map */}
          <div className="hairline bg-black/40 relative overflow-hidden p-2 md:p-6">
            <svg ref={svgRef} viewBox="0 0 840 540" className="w-full" role="img" aria-label="Stylized circuit map with animated racing line">
              {/* glow under track */}
              <defs>
                <filter id="glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              </defs>

              {/* asphalt */}
              <path d={d} fill="none" stroke="#1a1e27" strokeWidth="26" strokeLinejoin="round" />
              <path d={d} fill="none" stroke="#242a36" strokeWidth="20" strokeLinejoin="round" />

              {/* kerb dashes */}
              <path d={d} fill="none" stroke="#ff2d55" strokeWidth="2" strokeDasharray="10 14" opacity="0.5" />

              {/* sector arcs — colored overlays */}
              {len > 0 && TRACK.sectors.map((s) => {
                const segLen = (s.range[1] - s.range[0]) * len
                const dashOffset = -s.range[0] * len
                return (
                  <path key={s.id} d={d} fill="none" stroke={s.color} strokeWidth="3" strokeOpacity="0.35"
                    strokeDasharray={`${segLen} ${len}`} style={{ strokeDashoffset: dashOffset }} />
                )
              })}

              {/* animated racing line reveal (measuring path) */}
              <path ref={pathRef} d={d} fill="none" stroke="#ffffff" strokeWidth="2.5" filter="url(#glow)"
                strokeDasharray={`${len || 1}`} strokeDashoffset={`${(len || 1) * (1 - (reduced ? 1 : Math.max(revealed, 0.02)))}`}
                strokeLinecap="round" opacity="0.9"
              />

              {/* start/finish */}
              {(() => { const sp = pointAt(0); return sp.x ? (
                <g transform={`translate(${sp.x},${sp.y})`}>
                  <rect x="-4" y="-20" width="8" height="40" fill="#fff" opacity="0.85" />
                  <text x="10" y="-14" fontSize="11" fill="#9aa3b2" fontFamily="'JetBrains Mono', monospace">START/FINISH</text>
                </g>
              ) : null })()}

              {/* corner markers */}
              {len > 0 && TRACK.corners.map((c) => {
                const cp = pointAt(c.t)
                const isActive = activeCorner === c.n
                return (
                  <g key={c.n} transform={`translate(${cp.x},${cp.y})`} className="cursor-pointer" onClick={() => setActiveCorner(isActive ? null : c.n)} role="button" tabIndex={0}
                     aria-label={`Turn ${c.n} ${c.name}`} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveCorner(isActive ? null : c.n)}>
                    <circle r={isActive ? 15 : 11} fill="#05060a" stroke={isActive ? '#ff2d55' : '#5b6474'} strokeWidth="2" className="transition-all" />
                    <text textAnchor="middle" dy="4" fontSize="10" fill={isActive ? '#ff2d55' : '#9aa3b2'} fontFamily="'JetBrains Mono', monospace">{c.n}</text>
                  </g>
                )
              })}

              {/* the car */}
              {p.x !== undefined && len > 0 && (
                <g transform={`translate(${p.x},${p.y}) rotate(${angle})`} data-sector={sectorFor(carT).id}>
                  <circle r="14" fill={sectorFor(carT).color} opacity="0.18" />
                  <path d="M10 0 L-7 -6 L-4 0 L-7 6 Z" fill={sectorFor(carT).color} filter="url(#glow)" />
                </g>
              )}
            </svg>

            {/* live position readout */}
            <div className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.2em] text-[#9aa3b2]" aria-live="off">
              LAP PROGRESS {(carT * 100).toFixed(1)}% · SECTOR {sectorFor(carT).id}
            </div>
          </div>

          {/* Corner intel panel */}
          <div>
            <p className="kicker mb-4">Corner Intel // Select on map</p>
            <ul className="space-y-2">
              {TRACK.corners.map((c) => {
                const isActive = activeCorner === c.n
                return (
                  <li key={c.n}>
                    <button
                      onClick={() => setActiveCorner(isActive ? null : c.n)}
                      aria-expanded={isActive}
                      className={`w-full text-left hairline px-4 py-3 transition-all duration-300 ${isActive ? 'border-[#ff2d55]! bg-[#ff2d55]/[0.07]' : 'hover:border-white/30 bg-white/[0.02]'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold uppercase tracking-wide text-sm">
                          <span className="font-mono text-[#ff2d55] mr-3">T{String(c.n).padStart(2, '0')}</span>{c.name}
                        </span>
                        <span className="font-mono text-[10px] text-[#9aa3b2]">{c.speed} · G{c.gear}</span>
                      </div>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }} className="overflow-hidden text-sm text-[#c7cdd8] mt-2 leading-relaxed"
                          >
                            {c.line}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {TRACK.sectors.map((s) => (
                <div key={s.id} className="hairline p-3 bg-white/[0.02]">
                  <p className="font-mono text-[10px] tracking-[0.2em]" style={{ color: s.color }}>SECTOR {s.id}</p>
                  <p className="font-display font-bold text-lg tabular-nums mt-1">{s.best}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
