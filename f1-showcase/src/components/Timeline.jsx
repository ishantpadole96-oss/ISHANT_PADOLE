import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TIMELINE } from '../data/content'
import { CarSide } from './CarArt'
import { SectionHeader, RevealText, FadeUp } from './Motion'

/** Silhouette morph proxy: era-based car styling via proportions/colors */
function EraCar({ accent, year }) {
  const scale = { 1998: 0.92, 2009: 0.96, 2014: 1.0, 2017: 1.05, 2022: 1.08, 2026: 1.12 }[year] || 1
  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }} className="transition-transform duration-700">
      <CarSide id={`tl-${year}`} color={accent} accent="#e5e7eb" dark="#0b0d12" className="w-full max-w-md" />
    </div>
  )
}

function TimelineItem({ era, i }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [80, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.25, 1, 1, 0.25])
  const left = i % 2 === 0

  return (
    <div ref={ref} className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-20 ${left ? '' : ''}`}>
      {/* spine node */}
      <span className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <span className="block w-3.5 h-3.5 rotate-45 border-2 bg-[#05060a]" style={{ borderColor: era.accent }} />
      </span>

      {/* Art side */}
      <motion.div style={{ y, opacity }} className={`${left ? 'lg:pr-16' : 'lg:order-2 lg:pl-16'} ${left ? '' : 'lg:col-start-2'}`}>
        <EraCar accent={era.accent} year={Number(era.year)} />
      </motion.div>

      {/* Text side */}
      <FadeUp className={`${left ? 'lg:pl-16' : 'lg:order-1 lg:col-start-1 lg:row-start-1 lg:pr-16 lg:text-right'}`}>
        <p className="font-display font-bold text-[clamp(3rem,7vw,6rem)] leading-none mb-3" style={{ color: era.accent }}>
          {era.year}
        </p>
        <h3 className="headline-xl text-2xl md:text-3xl mb-4">{era.title}</h3>
        <p className="text-[#c7cdd8] leading-relaxed max-w-lg inline-block mb-5">{era.text}</p>
        <ul className={`flex flex-wrap gap-2 ${left ? '' : 'lg:justify-end'}`}>
          {era.facts.map((f) => (
            <li key={f} className="px-3 py-1.5 hairline bg-white/[0.03] font-mono text-[10px] tracking-[0.18em] uppercase text-[#9aa3b2]">
              {f}
            </li>
          ))}
        </ul>
      </FadeUp>
    </div>
  )
}

export default function Timeline() {
  const spineRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: spineRef, offset: ['start start', 'end end'] })
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="heritage" className="relative py-28 md:py-36 overflow-hidden" aria-label="Racing heritage timeline">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <SectionHeader index="05" kicker="Heritage // Aerodynamic Evolution" title="THIRTY YEARS IN SIX LAPS" />

        <div ref={spineRef} className="relative">
          {/* central spine with scroll-driven fill */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/10" aria-hidden="true">
            <motion.div className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-[#ff2d55] via-[#fbbf24] to-[#38bdf8]" style={{ scaleY: spineScale, height: '100%' }} />
          </div>

          {TIMELINE.map((era, i) => (
            <TimelineItem key={era.year} era={era} i={i} />
          ))}
        </div>

        {/* closing statement */}
        <div className="mt-16 text-center">
          <RevealText as="p" text="THE NEXT ERA IS ALREADY IN THE WIND TUNNEL." className="headline-xl text-[clamp(1.4rem,3.5vw,2.6rem)] inline-block" />
          <p className="mt-4 kicker">// HERITAGE CONTENT IS A FICTIONAL NARRATIVE FOR DEMONSTRATION</p>
        </div>
      </div>
    </section>
  )
}
