/**
 * Procedural F1 car artwork — side profile SVG.
 * Rendered as vector art (no external photos needed) so it always loads,
 * scales crisply and can be re-colored per car livery.
 */

export function CarSide({ color = '#ff2d55', accent = '#f4f4f5', dark = '#0b0d12', className = '', style = {}, id = 'car' }) {
  const g = `grad-${id}`
  const g2 = `gloss-${id}`
  return (
    <svg viewBox="0 0 1000 340" className={className} style={style} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} />
          <stop offset="1" stopColor={dark} />
        </linearGradient>
        <linearGradient id={g2} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.16" />
        </linearGradient>
        <radialGradient id={`rub-${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.62" stopColor="#101216" />
          <stop offset="1" stopColor="#030405" />
        </radialGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="500" cy="300" rx="430" ry="22" fill="#000" opacity="0.55" />

      {/* Rear wing assembly */}
      <g>
        <rect x="880" y="96" width="105" height="16" rx="4" fill={`url(#${g})`} />
        <rect x="880" y="96" width="105" height="6" rx="3" fill={`url(#${g2})`} />
        <path d="M930 112 L930 168" stroke={accent} strokeWidth="7" />
        <rect x="895" y="128" width="80" height="9" rx="3" fill={dark} stroke={accent} strokeOpacity="0.5" />
      </g>

      {/* Engine cover / shark fin */}
      <path d="M640 128 C720 128 800 140 872 168 L872 200 L660 200 Z" fill={dark} />
      <path d="M648 132 C724 132 798 146 862 170" stroke={color} strokeWidth="3" opacity="0.85" />

      {/* Main body */}
      <path
        d="M60 218
           C120 200 190 190 250 186
           L330 150 C360 138 400 132 440 132
           L520 132 C580 132 620 128 648 128
           L660 200 L560 210 L360 214 L250 222 Z"
        fill={`url(#${g})`}
      />
      {/* Gloss overlay */}
      <path
        d="M60 218
           C120 200 190 190 250 186
           L330 150 C360 138 400 132 440 132
           L520 132 C580 132 620 128 648 128
           L660 200 L560 210 L360 214 L250 222 Z"
        fill={`url(#${g2})`}
      />

      {/* Sidepod */}
      <path d="M470 168 C540 162 600 168 640 186 L640 214 C580 222 500 224 462 218 Z" fill={dark} stroke={accent} strokeOpacity="0.35" />
      <path d="M480 176 C540 172 590 178 626 192" stroke={color} strokeWidth="4" opacity="0.9" />

      {/* Cockpit + halo */}
      <path d="M392 132 C400 108 428 96 462 96 C494 96 512 110 516 132 Z" fill="#05070c" />
      <path d="M396 128 C404 104 430 92 462 92 C492 92 512 106 516 128" stroke={accent} strokeWidth="6" strokeLinecap="round" />
      <path d="M456 92 L456 60 M440 60 L472 60" stroke={accent} strokeWidth="5" strokeLinecap="round" />
      {/* Airbox */}
      <path d="M520 96 L556 74 L588 96 L588 128 L520 128 Z" fill={dark} stroke={color} strokeOpacity="0.6" />
      <path d="M556 78 L556 96" stroke={accent} strokeWidth="3" />

      {/* Nose tip & front wing */}
      <path d="M60 218 L28 224 L28 232 L120 236 L250 226 Z" fill={dark} />
      <path d="M10 246 L210 238 L210 252 L10 258 Z" fill={`url(#${g})`} />
      <path d="M10 246 L210 238" stroke={accent} strokeWidth="2.5" opacity="0.9" />
      <path d="M20 232 L20 258" stroke={accent} strokeWidth="5" />

      {/* Floor / bargeboard detail */}
      <path d="M250 226 L360 218 L560 214 L700 208 L700 224 L300 236 Z" fill="#04050a" />
      <path d="M300 214 L300 232 M330 212 L330 230" stroke={accent} strokeOpacity="0.5" strokeWidth="3" />

      {/* Wheels */}
      {[
        { cx: 205, r: 62 },
        { cx: 790, r: 68 },
      ].map((w, i) => (
        <g key={i}>
          <circle cx={w.cx} cy={238} r={w.r} fill={`url(#rub-${id})`} />
          <circle cx={w.cx} cy={238} r={w.r} stroke="#1d2129" strokeWidth="3" />
          <circle cx={w.cx} cy={238} r={w.r * 0.55} fill="#14171d" stroke={accent} strokeOpacity="0.5" strokeWidth="2" />
          {/* spokes */}
          {Array.from({ length: 10 }).map((_, k) => {
            const a = (k / 10) * Math.PI * 2
            return (
              <line
                key={k}
                x1={w.cx + Math.cos(a) * w.r * 0.18}
                y1={238 + Math.sin(a) * w.r * 0.18}
                x2={w.cx + Math.cos(a) * w.r * 0.52}
                y2={238 + Math.sin(a) * w.r * 0.52}
                stroke="#2b303b"
                strokeWidth="4"
              />
            )
          })}
          <circle cx={w.cx} cy={238} r={10} fill={color} />
          {/* brake glow */}
          <circle cx={w.cx} cy={238} r={w.r * 0.34} fill="#ff5a3c" opacity="0.14" />
        </g>
      ))}

      {/* Suspension arms */}
      <path d="M250 210 L205 238 M262 224 L205 238 M700 206 L790 238 M712 220 L790 238" stroke="#3a4150" strokeWidth="5" strokeLinecap="round" />

      {/* Number roundel */}
      <circle cx="600" cy="176" r="20" fill={accent} opacity="0.92" />
      <text x="600" y="183" textAnchor="middle" fontFamily="'Chakra Petch', sans-serif" fontWeight="700" fontSize="22" fill={dark}>
        1
      </text>
    </svg>
  )
}

/** Front-quarter stylized view for the showcase view-switcher */
export function CarFront({ color = '#ff2d55', accent = '#f4f4f5', dark = '#0b0d12', className = '' }) {
  return (
    <svg viewBox="0 0 600 340" className={className} fill="none" aria-hidden="true">
      <ellipse cx="300" cy="300" rx="240" ry="18" fill="#000" opacity="0.5" />
      {/* front wing */}
      <path d="M70 268 L530 268 L510 284 L90 284 Z" fill={dark} stroke={color} strokeOpacity="0.6" />
      <path d="M70 268 L110 250 L490 250 L530 268 Z" fill={color} opacity="0.25" />
      {/* wheels */}
      <rect x="96" y="170" width="64" height="110" rx="18" fill="#0c0e12" stroke="#232834" strokeWidth="3" />
      <rect x="440" y="170" width="64" height="110" rx="18" fill="#0c0e12" stroke="#232834" strokeWidth="3" />
      {/* nose */}
      <path d="M262 250 L338 250 L326 150 L274 150 Z" fill={dark} stroke={accent} strokeOpacity="0.4" />
      <path d="M282 150 L318 150 L312 108 L288 108 Z" fill={color} />
      {/* halo ring */}
      <path d="M210 150 C210 84 390 84 390 150" stroke={accent} strokeWidth="9" strokeLinecap="round" />
      <path d="M300 84 L300 150" stroke={accent} strokeWidth="6" />
      {/* mirrors */}
      <rect x="188" y="120" width="34" height="14" rx="5" fill={dark} stroke={color} />
      <rect x="378" y="120" width="34" height="14" rx="5" fill={dark} stroke={color} />
      {/* brake ducts glow */}
      <circle cx="128" cy="224" r="16" fill="#ff5a3c" opacity="0.25" />
      <circle cx="472" cy="224" r="16" fill="#ff5a3c" opacity="0.25" />
    </svg>
  )
}

/** Rear view */
export function CarRear({ color = '#ff2d55', accent = '#f4f4f5', dark = '#0b0d12', className = '' }) {
  return (
    <svg viewBox="0 0 600 340" className={className} fill="none" aria-hidden="true">
      <ellipse cx="300" cy="300" rx="250" ry="18" fill="#000" opacity="0.5" />
      {/* rear wing */}
      <rect x="120" y="80" width="360" height="22" rx="6" fill={color} />
      <rect x="120" y="80" width="360" height="8" rx="4" fill="#fff" opacity="0.2" />
      <path d="M150 102 L150 150 M450 102 L450 150" stroke={accent} strokeWidth="8" />
      <rect x="170" y="120" width="260" height="12" rx="4" fill={dark} stroke={accent} strokeOpacity="0.5" />
      {/* diffuser */}
      <path d="M180 268 L420 268 L400 232 L200 232 Z" fill="#04050a" stroke={accent} strokeOpacity="0.4" />
      {[220, 250, 280, 310, 340, 370].map((x) => (
        <line key={x} x1={x} y1="234" x2={x} y2="266" stroke="#2c3340" strokeWidth="4" />
      ))}
      {/* tyres */}
      <rect x="70" y="150" width="86" height="130" rx="22" fill="#0c0e12" stroke="#232834" strokeWidth="3" />
      <rect x="444" y="150" width="86" height="130" rx="22" fill="#0c0e12" stroke="#232834" strokeWidth="3" />
      {/* body */}
      <path d="M200 232 L400 232 L380 160 L330 160 L320 120 L280 120 L270 160 L220 160 Z" fill={dark} stroke={color} strokeOpacity="0.7" />
      {/* rain light */}
      <rect x="288" y="176" width="24" height="8" rx="2" fill="#ff2d55" />
      <circle cx="300" cy="150" r="26" fill="#ff5a3c" opacity="0.12" />
    </svg>
  )
}
