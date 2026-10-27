import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader } from './Motion'
import { usePrefersReducedMotion } from '../hooks/useMotion'

/** Simulated lap telemetry — deterministic-ish smooth noise */
function useTelemetrySim(running, reduced) {
  const [t, setT] = useState({ speed: 0, rpm: 0, gear: 1, throttle: 0, brake: 0, gLat: 0, gLon: 0, lapMs: 0, sector: 1, tires: [95, 97, 93, 96], brakes: [420, 430, 380, 390] })
  const histRef = useRef([])
  const stateRef = useRef({ phase: 0 })
  useEffect(() => {
    if (!running) return
    let raf, last = performance.now()
    const loop = (now) => {
      const dt = Math.min(50, now - last); last = now
      const s = stateRef.current
      s.phase += dt / 1000 * 0.05 // ~20s per virtual lap
      const p = s.phase % 1
      // corner profile: speed dips at certain phases
      const corners = [0.06, 0.19, 0.33, 0.47, 0.62, 0.86].map((c) => Math.exp(-Math.pow((p - c) / 0.045, 2)))
      const cornerLoad = Math.max(...corners)
      const straight = 1 - cornerLoad
      const speed = 90 + straight * 255 + Math.sin(now / 300) * 4
      const rpm = Math.min(12400, 5000 + speed * 21 + Math.sin(now / 120) * 220)
      const gear = Math.max(1, Math.min(8, Math.round(speed / 46)))
      const throttle = cornerLoad > 0.6 ? 10 + (1 - cornerLoad) * 60 : 92 + Math.sin(now / 400) * 8
      const brake = cornerLoad > 0.75 && p > corners[0] ? (cornerLoad - 0.6) * 160 : 0
      const gLat = cornerLoad * 4.6 * Math.sin(p * 40)
      const gLon = (brake > 5 ? -4.2 : throttle > 80 ? 1.6 : 0.2) + Math.sin(now / 500) * 0.2
      const tires = [95, 97, 93, 96].map((b, i) => b + cornerLoad * (i < 2 ? 9 : 13) + Math.sin(now / 900 + i) * 2)
      const brakes = [420, 430, 380, 390].map((b, i) => b + brake * (i < 2 ? 3.2 : 2.4) + Math.sin(now / 700 + i) * 12)
      const next = { speed, rpm, gear, throttle: Math.max(0, Math.min(100, throttle)), brake: Math.max(0, Math.min(100, brake)), gLat, gLon, lapMs: p * 87400, sector: p < 0.34 ? 1 : p < 0.67 ? 2 : 3, tires, brakes }
      setT(next)
      histRef.current.push(next)
      if (histRef.current.length > 240) histRef.current.shift()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [running])
  return t
}

function Gauge({ value, max, label, unit, digits = 0, accent = '#ff2d55', big = false }) {
  const pct = Math.min(1, value / max)
  return (
    <div className="hairline bg-black/40 p-4 relative overflow-hidden">
      <p className="kicker mb-1">{label}</p>
      <p className={`font-display font-bold tabular-nums ${big ? 'text-5xl md:text-6xl' : 'text-3xl'}`}>
        {value.toFixed(digits)}
        <span className="text-[0.35em] ml-2 font-mono tracking-widest text-[#9aa3b2]">{unit}</span>
      </p>
      <motion.div className="absolute bottom-0 left-0 h-[3px]" style={{ width: `${pct * 100}%`, background: accent }} />
    </div>
  )
}

function Sparkline({ data, max, color, height = 60, label, value }) {
  const w = 300
  const pts = data.map((v, i) => `${(i / Math.max(1, data.length - 1)) * w},${height - (Math.min(v, max) / max) * height}`).join(' ')
  return (
    <div className="hairline bg-black/40 p-4">
      <div className="flex justify-between items-baseline mb-2">
        <p className="kicker">{label}</p>
        <p className="font-mono text-sm tabular-nums" style={{ color }}>{value}</p>
      </div>
      <svg viewBox={`0 0 ${w} ${height}`} className="w-full" preserveAspectRatio="none" aria-hidden="true">
        <polyline points={pts} fill="none" stroke={color} strokeWidth="2" />
        <polyline points={`0,${height} ${pts} ${w},${height}`} fill={`${color}22`} stroke="none" />
      </svg>
    </div>
  )
}

export default function Telemetry() {
  const reduced = usePrefersReducedMotion()
  const [running, setRunning] = useState(true)
  const t = useTelemetrySim(running && !reduced, reduced)
  const staticT = { speed: 287, rpm: 11240, gear: 7, throttle: 96, brake: 0, gLat: 1.2, gLon: 0.8, lapMs: 52340, sector: 2, tires: [98, 101, 95, 99], brakes: [410, 422, 388, 396] }
  const d = reduced ? staticT : t

  // gather history via closure of sim is internal; keep local mirror for sparklines
  const [hist, setHist] = useState({ speed: [], throttle: [], gLat: [] })
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setHist((h) => ({
        speed: [...h.speed.slice(-59), d.speed],
        throttle: [...h.throttle.slice(-59), d.throttle],
        gLat: [...h.gLat.slice(-59), Math.abs(d.gLat)],
      }))
    }, 120)
    return () => clearInterval(id)
  }, [d.speed, d.throttle, d.gLat, reduced])

  const fmtLap = (ms) => {
    const total = ms / 1000
    const m = Math.floor(total / 60)
    const s = (total % 60).toFixed(3).padStart(6, '0')
    return `${m}:${s}`
  }

  const barColor = (temp, cold, hot) => (temp < cold ? '#38bdf8' : temp > hot ? '#ff2d55' : '#a3e635')

  return (
    <section id="telemetry" className="relative py-28 md:py-36 overflow-hidden" aria-label="Live telemetry dashboard">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.07),transparent_60%)]" aria-hidden="true" />
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 relative">
        <SectionHeader
          index="03"
          kicker="Mission Control // Simulated Feed"
          title="SIGNAL FROM THE COCKPIT"
          right={
            <button onClick={() => setRunning((r) => !r)} aria-pressed={running} className={`btn-ghost !py-3 !text-[11px] ${!running ? '!border-[#fbbf24]' : ''}`}>
              <span className={`w-2 h-2 rounded-full ${running ? 'bg-[#a3e635] pulse-dot' : 'bg-[#fbbf24]'}`} />
              {running ? 'Stream Live' : 'Stream Paused'}
            </button>
          }
        />

        {/* Main grid */}
        <div className="grid lg:grid-cols-[auto_1fr_auto] gap-5">
          {/* Speed column */}
          <div className="flex flex-col gap-5">
            <div className="hairline bg-black/50 p-6 relative overflow-hidden min-w-[240px]">
              <div className="scanline" aria-hidden="true" />
              <p className="kicker mb-2">Velocity</p>
              <p className="font-display font-bold text-[64px] leading-none tabular-nums">
                {d.speed.toFixed(0)}<span className="text-lg text-[#9aa3b2] font-mono ml-2">km/h</span>
              </p>
              {/* Gear ladder */}
              <div className="mt-5 flex items-end gap-1.5" aria-label={`Gear ${d.gear}`}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
                  <span key={g} className={`flex-1 h-8 transition-colors duration-150 ${g <= d.gear ? 'bg-[#ff2d55]' : 'bg-white/8'}`} style={{ opacity: g === d.gear ? 1 : g < d.gear ? 0.45 : 1 }} />
                ))}
                <span className="font-display font-bold text-3xl ml-3 w-8 text-center">{d.gear}</span>
              </div>
            </div>
            <Gauge label="Engine Speed" value={d.rpm} max={12500} unit="rpm" accent="#fbbf24" />
          </div>

          {/* Center: charts */}
          <div className="flex flex-col gap-5">
            <Sparkline data={hist.speed.length ? hist.speed : new Array(40).fill(d.speed)} max={360} color="#38bdf8" label="Speed Trace · last 7s" value={`${d.speed.toFixed(0)} km/h`} height={80} />
            <div className="grid sm:grid-cols-2 gap-5">
              <Sparkline data={hist.throttle.length ? hist.throttle : new Array(40).fill(d.throttle)} max={100} color="#a3e635" label="Throttle %" value={`${d.throttle.toFixed(0)}%`} />
              <Sparkline data={hist.gLat.length ? hist.gLat : new Array(40).fill(Math.abs(d.gLat))} max={6} color="#ff2d55" label="Lateral G" value={`${Math.abs(d.gLat).toFixed(2)} G`} />
            </div>
            {/* Throttle / brake bars */}
            <div className="hairline bg-black/40 p-4">
              <div className="flex justify-between items-center mb-3">
                <p className="kicker">Pedal Inputs</p>
                <p className="font-mono text-xs text-[#9aa3b2]">DEMO CHANNEL 0x2F</p>
              </div>
              <div className="space-y-3">
                {[['THROTTLE', d.throttle, '#a3e635'], ['BRAKE', d.brake, '#ff2d55'], ['ERS DEPLOY', 62 + Math.sin(Date.now() / 2000) * 8, '#38bdf8']].map(([k, v, c]) => (
                  <div key={k} className="flex items-center gap-4">
                    <span className="font-mono text-[10px] tracking-[0.2em] w-24 text-[#9aa3b2]">{k}</span>
                    <div className="flex-1 h-2.5 bg-white/8 relative overflow-hidden">
                      <motion.div className="absolute inset-y-0 left-0" style={{ width: `${Math.min(100, Math.max(0, v))}%`, background: c, boxShadow: `0 0 12px ${c}` }} transition={{ duration: 0.1 }} />
                    </div>
                    <span className="font-mono text-xs w-12 text-right tabular-nums">{Math.min(100, Math.max(0, v)).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: lap + temps */}
          <div className="flex flex-col gap-5">
            <div className="hairline bg-black/50 p-5 min-w-[220px]">
              <p className="kicker mb-2">Current Lap</p>
              <p className="font-display font-bold text-4xl tabular-nums text-[#a3e635]">{fmtLap(d.lapMs)}</p>
              <div className="mt-4 space-y-2 font-mono text-xs">
                {[1, 2, 3].map((s) => {
                  const best = ['31.204', '29.881', '26.512'][s - 1]
                  const cur = (d.sector === s ? '▲ LIVE' : '—')
                  return (
                    <div key={s} className="flex justify-between border-b border-white/8 pb-1">
                      <span className="text-[#9aa3b2]">S{s}</span>
                      <span>{best}</span>
                      <span className={d.sector === s ? 'text-[#a3e635]' : 'text-[#9aa3b2]/50'}>{cur}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="hairline bg-black/40 p-4">
              <p className="kicker mb-3">Tyre Surface °C</p>
              <div className="grid grid-cols-2 gap-3">
                {['FL', 'FR', 'RL', 'RR'].map((n, i) => (
                  <div key={n}>
                    <div className="flex justify-between font-mono text-[10px] mb-1">
                      <span className="text-[#9aa3b2]">{n}</span>
                      <span style={{ color: barColor(d.tires[i], 90, 110) }}>{d.tires[i].toFixed(0)}°</span>
                    </div>
                    <div className="h-16 w-8 mx-auto bg-white/8 relative overflow-hidden">
                      <motion.div
                        className="absolute bottom-0 inset-x-0"
                        style={{ height: `${Math.min(100, (d.tires[i] / 130) * 100)}%`, background: barColor(d.tires[i], 90, 110) }}
                        transition={{ duration: 0.3 }}
                      />
                      {/* optimal window band */}
                      <span className="absolute inset-x-0 border-y border-dashed border-white/40" style={{ bottom: `${(90 / 130) * 100}%`, height: `${(20 / 130) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hairline bg-black/40 p-4">
              <p className="kicker mb-3">Brake Core °C</p>
              <div className="grid grid-cols-4 gap-2 items-end h-14">
                {d.brakes.map((b, i) => (
                  <div key={i} className="text-center">
                    <motion.div className="w-full rounded-t" style={{ height: `${Math.min(100, (b / 900) * 100) * 0.5}rem`, background: `linear-gradient(180deg, #ff2d55, ${b > 600 ? '#ff8a3c' : '#3a1020'})` }} animate={{ opacity: b > 700 ? [1, 0.7, 1] : 1 }} transition={{ repeat: Infinity, duration: 0.6 }} />
                    <p className="font-mono text-[9px] mt-1 text-[#9aa3b2]">{b.toFixed(0)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 font-mono text-[9px] tracking-[0.25em] text-[#9aa3b2]">// SIMULATED TELEMETRY FOR DEMONSTRATION — NOT A REAL VEHICLE DATA STREAM</p>
      </div>
    </section>
  )
}
