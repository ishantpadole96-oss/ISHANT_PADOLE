import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { GALLERY } from '../data/content'
import { SectionHeader } from './Motion'
import { CarSide, CarFront, CarRear } from './CarArt'

/** Procedural artwork motifs so the gallery is visually rich without external photos */
function Motif({ motif, tone }) {
  const [a, b] = tone
  const common = { className: 'absolute inset-0 w-full h-full', preserveAspectRatio: 'none', 'aria-hidden': true }
  switch (motif) {
    case 'car-front':
      return <div className="absolute inset-0 flex items-end justify-center opacity-90"><CarFront color={a} className="w-[85%] translate-y-[12%]" /></div>
    case 'hud':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <circle cx="200" cy="170" r="110" stroke={a} strokeWidth="3" fill="none" opacity="0.7" />
          <circle cx="200" cy="170" r="80" stroke="#fff" strokeOpacity="0.25" strokeWidth="1" fill="none" />
          {Array.from({ length: 24 }).map((_, i) => {
            const ang = (i / 24) * Math.PI * 1.5 + Math.PI * 0.75
            return <line key={i} x1={200 + Math.cos(ang) * 96} y1={170 + Math.sin(ang) * 96} x2={200 + Math.cos(ang) * 110} y2={170 + Math.sin(ang) * 110} stroke={i > 16 ? a : '#fff'} strokeOpacity="0.7" strokeWidth="3" />
          })}
          <path d="M120 60 L280 60 M120 74 L240 74" stroke={a} strokeWidth="2" opacity="0.6" />
          <text x="200" y="185" textAnchor="middle" fill="#fff" fontFamily="'Chakra Petch'" fontSize="42" fontWeight="700">G8</text>
        </svg>
      )
    case 'carbon':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <defs>
            <pattern id={`cb-${a.slice(1)}`} width="24" height="24" patternUnits="userSpaceOnUse">
              <rect width="24" height="24" fill="#0b0d12" />
              <path d="M0 12 L12 0 L24 12 L12 24 Z" fill={a} opacity="0.16" />
              <path d="M0 0 L6 6 M18 24 L24 18" stroke="#fff" strokeOpacity="0.1" />
            </pattern>
          </defs>
          <rect width="400" height="300" fill={`url(#cb-${a.slice(1)})`} />
          <ellipse cx="200" cy="150" rx="150" ry="90" fill="none" stroke={a} strokeWidth="2" strokeDasharray="6 10" opacity="0.7" />
        </svg>
      )
    case 'wheel':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <circle cx="200" cy="150" r="120" fill="#0a0c10" stroke="#22262e" strokeWidth="10" />
          <circle cx="200" cy="150" r="70" fill="#14171d" stroke={a} strokeOpacity="0.6" strokeWidth="2" />
          {Array.from({ length: 12 }).map((_, k) => {
            const ang = (k / 12) * Math.PI * 2
            return <line key={k} x1={200 + Math.cos(ang) * 20} y1={150 + Math.sin(ang) * 20} x2={200 + Math.cos(ang) * 66} y2={150 + Math.sin(ang) * 66} stroke="#2c313c" strokeWidth="7" />
          })}
          <circle cx="200" cy="150" r="16" fill={a} />
          <circle cx="200" cy="150" r="46" fill="none" stroke="#ff5a3c" strokeWidth="14" opacity="0.35" />
        </svg>
      )
    case 'wing':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M40 ${120 + i * 34} Q200 ${80 + i * 30} 380 ${110 + i * 34} L380 ${126 + i * 34} Q200 ${98 + i * 30} 40 ${136 + i * 34} Z`} fill={i === 0 ? a : '#171b23'} stroke="#ffffff22" />
          ))}
          <rect x="190" y="80" width="20" height="180" fill="#0c0e13" stroke={a} strokeOpacity="0.5" />
          <path d="M40 60 L380 44" stroke={a} strokeWidth="3" strokeDasharray="10 8" opacity="0.8" />
        </svg>
      )
    case 'pit':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" fill="#0b0d12" />
          {[60, 150, 240, 330].map((x, i) => (
            <g key={x}>
              <rect x={x} y="90" width="14" height="130" rx="6" fill="#1b202a" />
              <circle cx={x + 7} cy="80" r="18" fill={i % 2 ? a : '#232834'} opacity={i === 1 ? 1 : 0.7} />
            </g>
          ))}
          <path d="M0 250 H400" stroke={a} strokeWidth="4" strokeDasharray="26 16" />
          <text x="200" y="46" textAnchor="middle" fill="#fff" fontFamily="'JetBrains Mono'" fontSize="20" opacity="0.85">2.11s</text>
        </svg>
      )
    case 'kerb':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" fill="#0d0f14" />
          {Array.from({ length: 10 }).map((_, i) => (
            <rect key={i} x={i * 40} y="200" width="40" height="46" fill={i % 2 ? a : '#e5e7eb'} opacity={i % 2 ? 0.9 : 0.85} transform={`skewX(-18) translate(${i % 2 ? 0 : 6},0)`} />
          ))}
          <path d="M0 190 C120 150 280 150 400 120" stroke="#fff" strokeWidth="2" strokeDasharray="4 10" opacity="0.5" fill="none" />
        </svg>
      )
    case 'diffuser':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" fill="#0a0b0e" />
          {Array.from({ length: 9 }).map((_, i) => (
            <path key={i} d={`M${60 + i * 35} 260 L${70 + i * 35} 90`} stroke={i === 4 ? a : '#2a2f3a'} strokeWidth={i === 4 ? 5 : 3} />
          ))}
          <path d="M40 260 H360" stroke="#fff" strokeOpacity="0.4" strokeWidth="3" />
          <ellipse cx="200" cy="180" rx="150" ry="60" fill={a} opacity="0.08" />
        </svg>
      )
    default:
      return null
  }
}

function GalleryCard({ item, index, onZoom }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const innerY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const tall = index % 3 === 1
  return (
    <motion.figure
      ref={ref}
      layout
      className={`relative overflow-hidden hairline group cursor-zoom-in bg-black/40 ${tall ? 'row-span-2 min-h-[420px]' : 'min-h-[240px]'}`}
      onClick={() => onZoom(item)}
      onKeyDown={(e) => e.key === 'Enter' && onZoom(item)}
      tabIndex={0}
      role="button"
      aria-label={`Open ${item.title}`}
    >
      <motion.div style={{ y: innerY }} className="absolute inset-[-12%]">
        <Motif motif={item.motif} tone={item.tone} />
      </motion.div>
      {/* gradient veil */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      {/* corner brackets */}
      <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-white/0 group-hover:border-white/70 transition-all duration-500" />
      <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-white/0 group-hover:border-white/70 transition-all duration-500" />
      <figcaption className="absolute bottom-0 inset-x-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <p className="font-display font-bold uppercase tracking-wide text-lg">{item.title}</p>
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#9aa3b2]">{item.sub}</p>
      </figcaption>
      <span className="absolute top-3 right-3 font-mono text-[10px] text-white/40">{String(index + 1).padStart(2, '0')}</span>
    </motion.figure>
  )
}

export default function Gallery() {
  const [zoomed, setZoomed] = useState(null)

  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-[#07080d]" aria-label="Editorial gallery">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <SectionHeader
          index="06"
          kicker="Gallery // Field Notes"
          title="DETAILS THAT WIN SECONDS"
          right={<p className="max-w-xs text-sm text-[#9aa3b2] leading-relaxed">Procedurally-rendered concept plates — click any frame for the full view. Replace with licensed photography in production.</p>}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[240px] gap-4">
          {GALLERY.map((g, i) => (
            <GalleryCard key={g.id} item={g} index={i} onZoom={setZoomed} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-md flex items-center justify-center p-5"
            onClick={() => setZoomed(null)}
            role="dialog" aria-modal="true" aria-label={zoomed.title}
          >
            <motion.div
              initial={{ scale: 0.86, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="relative max-w-3xl w-full aspect-[4/3] hairline overflow-hidden bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <Motif motif={zoomed.motif} tone={zoomed.tone} />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-between">
                <div>
                  <p className="headline-xl text-2xl">{zoomed.title}</p>
                  <p className="kicker mt-1">{zoomed.sub}</p>
                </div>
                <button onClick={() => setZoomed(null)} className="btn-ghost !py-2.5 !text-[11px]" aria-label="Close image viewer">Close ✕</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
