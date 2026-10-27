import { motion, useScroll, useTransform } from 'framer-motion'

/** Splits text into animated word/char spans with a staggered mask reveal */
export function RevealText({ text, className = '', as: Tag = 'span', delay = 0, charBy = false }) {
  const words = text.split(' ')
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: '115%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.85, delay: delay + i * (charBy ? 0.06 : 0.08), ease: [0.76, 0, 0.24, 1] }}
          >
            {w}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Fade/slide on scroll wrapper */
export function FadeUp({ children, delay = 0, y = 34, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Section header system: kicker + huge headline + rule line */
export function SectionHeader({ index, kicker, title, accent = '#ff2d55', right }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
      <div>
        <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-[11px] tracking-[0.3em]" style={{ color: accent }}>{index}</span>
          <span className="h-px w-10" style={{ background: accent }} />
          <span className="kicker">{kicker}</span>
        </div>
        <RevealText text={title} as="h2" className="headline-xl text-[clamp(2.6rem,6vw,5.2rem)] max-w-4xl" />
      </div>
      {right && <FadeUp delay={0.2}>{right}</FadeUp>}
    </div>
  )
}

/** Magnetic button — pulls toward cursor, springs back */
export function MagneticButton({ children, className = '', onClick, href, ...rest }) {
  const handleMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    e.currentTarget.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`
  }
  const reset = (e) => { e.currentTarget.style.transform = 'translate(0,0)' }
  const Comp = href ? 'a' : 'button'
  return (
    <Comp
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
      style={{ willChange: 'transform' }}
      {...(href ? {} : { type: 'button', ...rest })}
    >
      {children}
    </Comp>
  )
}

/** Scroll-driven parallax layer helper */
export function Parallax({ children, speed = 60, className = '' }) {
  const ref = { current: null }
  const elRef = (node) => (ref.current = node)
  return <div ref={elRef} className={className}><ParallaxInner targetRef={ref} speed={speed}>{children}</ParallaxInner></div>
}

function ParallaxInner({ children, targetRef, speed }) {
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])
  return <motion.div style={{ y }} className="will-change-transform">{children}</motion.div>
}
