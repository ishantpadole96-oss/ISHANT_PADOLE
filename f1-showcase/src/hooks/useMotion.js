import { useEffect, useRef, useState } from 'react'

/** Global reduced-motion flag */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

/** Animated number counter — counts up when element enters viewport */
export function useCountUp(target, { duration = 1600, decimals = 0, start = true } = {}) {
  const [value, setValue] = useState(0)
  const reduced = usePrefersReducedMotion()
  const raf = useRef(null)
  useEffect(() => {
    if (reduced || !start) { setValue(target); return }
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(parseFloat((target * eased).toFixed(decimals)))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target, duration, decimals, start, reduced])
  return value.toFixed(decimals)
}

/** In-viewport detection */
export function useInView(ref, { once = true, threshold = 0.25 } = {}) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); if (once) obs.disconnect() } else if (!once) setInView(false) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, once, threshold])
  return inView
}

/** Mouse position hook for parallax (normalized -1..1) */
export function useMouseParallax(enabled = true) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    if (!enabled) return
    let raf = null
    const onMove = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        setPos({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1,
        })
        raf = null
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => { window.removeEventListener('pointermove', onMove); if (raf) cancelAnimationFrame(raf) }
  }, [enabled])
  return pos
}

/** Scroll progress of the whole document 0..1 */
export function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      setP(h.scrollTop / (h.scrollHeight - h.clientHeight || 1))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return p
}
