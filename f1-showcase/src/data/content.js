/**
 * APEX GP — Content Data Layer
 * ------------------------------------------------------------------
 * NOTE: All vehicles, teams and statistics below are FICTIONAL demo
 * content created for this concept website. They are NOT official F1
 * data. The architecture is designed so verified real-world data can
 * be dropped in later.
 */

export const HERO_STATS = [
  { label: 'Top Speed', value: 347, suffix: ' km/h', decimals: 0 },
  { label: 'Power Unit', value: 1050, suffix: ' hp', decimals: 0 },
  { label: 'Downforce @240', value: 850, suffix: ' kg', decimals: 0 },
  { label: 'Min Weight', value: 798, suffix: ' kg', decimals: 0 },
  { label: '0–100 km/h', value: 2.6, suffix: ' s', decimals: 1 },
]

export const CARS = [
  {
    id: 'ax-24',
    name: 'APEX AX-24',
    year: 2024,
    team: 'Apex Grand Prix Works',
    tagline: 'The ground-effect revival, taken to its limit.',
    palette: { primary: '#ff2d55', secondary: '#f4f4f5' },
    powerUnit: 'APEX E-POWER V6 Turbo-Hybrid · Demo spec',
    specs: {
      power: { label: 'Power Output', value: 1050, unit: 'hp' },
      weight: { label: 'Dry Weight', value: 798, unit: 'kg' },
      speed: { label: 'Top Speed', value: 347, unit: 'km/h' },
      downforce: { label: 'Downforce @240km/h', value: 850, unit: 'kg' },
      lap: { label: 'Demo Reference Lap', value: 87.4, unit: 's' },
    },
    aero: 'Zero-drag DRS wing, Venturi-tunnel floor with triple-fence edge, active ride-height control.',
    highlights: ['Carbon monocoque, 79 kg', 'Halo + impact-absorbing nose', 'MGU-K harvests 2MJ/lap (demo)'],
    history: 'Introduced the AX-series twin-flap rear diffuser and set a fictional fastest-demo-sector record of 22.9s.',
    description:
      'The AX-24 is our flagship demonstration machine — a study in how far a sculpted underbody can push mechanical grip without touching the sky-line budget of drag.',
  },
  {
    id: 'ax-21',
    name: 'APEX AX-21 "Tempest"',
    year: 2021,
    team: 'Apex works / customer livery',
    tagline: 'Last of the wide-body era.',
    palette: { primary: '#38bdf8', secondary: '#0b1220' },
    powerUnit: 'APEX T-HYBRID 1.6 V6 · Demo spec',
    specs: {
      power: { label: 'Power Output', value: 980, unit: 'hp' },
      weight: { label: 'Dry Weight', value: 752, unit: 'kg' },
      speed: { label: 'Top Speed', value: 332, unit: 'km/h' },
      downforce: { label: 'Downforce @240km/h', value: 720, unit: 'kg' },
      lap: { label: 'Demo Reference Lap', value: 91.2, unit: 's' },
    },
    aero: 'High-rake philosophy, blown front-wing endplates, simplified barge-board curtains.',
    highlights: ['First Apex tub with integrated crash cone', 'Twin-pillar rear wing', 'Brake-by-wire front axle'],
    history: 'Fictional debut season: four podium-equivalents and one demonstration win at the “Night Circuit” scene.',
    description:
      'Tempest proved that rake angle plus a hungry diffuser could beat cleaner air. It remains the benchmark setup sheet in our simulator.',
  },
  {
    id: 'ax-18',
    name: 'APEX AX-18 "Vulcan"',
    year: 2018,
    team: 'Apex Racing Division',
    tagline: 'Halo-era pioneer.',
    palette: { primary: '#fbbf24', secondary: '#14100a' },
    powerUnit: 'APEX V6-TURBO SINGLE-STAGE · Demo spec',
    specs: {
      power: { label: 'Power Output', value: 920, unit: 'hp' },
      weight: { label: 'Dry Weight', value: 734, unit: 'kg' },
      speed: { label: 'Top Speed', value: 322, unit: 'km/h' },
      downforce: { label: 'Downforce @240km/h', value: 660, unit: 'kg' },
      lap: { label: 'Demo Reference Lap', value: 93.8, unit: 's' },
    },
    aero: 'T-wing support structures removed mid-season; halo added with 7kg penalty absorbed by ballast repositioning.',
    highlights: ['First cockpit protection ring', 'Large sidepod winglets', 'Camber-thrust front suspension'],
    history: 'Remembered for the fictional wet-masterclass street race where the Vulcan held a 4-second margin on slicks-turned-intermediates.',
    description:
      'Vulcan was the bridge between the halo-sceptics and the engineers who made it invisible in the airflow. Our CFD team still calls it beautiful.',
  },
  {
    id: 'ax-98',
    name: 'APEX AX-98 "Homolog"',
    year: 1998,
    team: 'Apex Heritage Project (retro spec)',
    tagline: 'Grooved tyres, raw V10 thunder.',
    palette: { primary: '#a3e635', secondary: '#0a1408' },
    powerUnit: 'APEX 3.0L V10 Naturally Aspirated · Demo spec',
    specs: {
      power: { label: 'Power Output', value: 800, unit: 'hp' },
      weight: { label: 'Dry Weight', value: 600, unit: 'kg' },
      speed: { label: 'Top Speed', value: 305, unit: 'km/h' },
      downforce: { label: 'Downforce @240km/h', value: 480, unit: 'kg' },
      lap: { label: 'Demo Reference Lap', value: 104.5, unit: 's' },
    },
    aero: 'Multi-element grooved-tyre era wings, stepped undercut floor, tall boxy sidepods.',
    highlights: ['19,000 rpm scream (demo)', 'Sequential manual gearbox', 'No traction control, no mercy'],
    history: 'A lovingly-restored fictional heritage car, run each year as a demonstration of how driver skill once filled the grip deficit.',
    description:
      'The Homolog is pure analog violence — mechanical grip, brake modulation by left foot, and a throttle response curve you can feel through your spine.',
  },
]

export const COMPONENTS = [
  {
    id: 'front-wing',
    name: 'Front Wing',
    pos: { x: 12, y: 62 },
    stat: '≈ 32% of total downforce',
    desc: 'Seven-element cascade generates low pressure under the nose while out-washing turbulence away from the front tyres. Flap angles adjust in 0.1° steps via the cockpit rotary.',
  },
  {
    id: 'brakes',
    name: 'Brake ducts & discs',
    pos: { x: 26, y: 70 },
    stat: 'Peak 150 G deceleration at carbon disc face',
    desc: 'Carbon-ceramic discs sit inside vented ducts that trade cooling for aero efficiency. Brake-by-wire balances front/rear bias 200 times per second.',
  },
  {
    id: 'floor',
    name: 'Venturi Floor',
    pos: { x: 48, y: 78 },
    stat: 'Up to 60% of overall downforce',
    desc: 'Tunnels accelerate air beneath the car creating suction. Edge fences seal the low-pressure zone; the floor height is telemetered live to the pit wall.',
  },
  {
    id: 'sidepods',
    name: 'Sidepods',
    pos: { x: 55, y: 55 },
    stat: 'Inlet Δ up to 38°C intake vs ambient',
    desc: 'Downwash-cutting bodies housing radiators and the energy store. Inlet louvres open progressively to hold coolant within a ±2°C operating window.',
  },
  {
    id: 'halo',
    name: 'Halo Cockpit Protection',
    pos: { x: 44, y: 38 },
    stat: 'Static load tested to 12 tonnes',
    desc: 'A titanium ring anchored to the tub and a single front pylon. Deflects debris, survives wheel strikes, and now carries an LED start-light strip.',
  },
  {
    id: 'engine',
    name: 'Power Unit',
    pos: { x: 68, y: 55 },
    stat: '1.6L V6 + MGU-K + MGU-H · 1050 hp (demo)',
    desc: 'Six-part hybrid: turbo V6, kinetic and heat recovery systems, battery and control electronics. Thermal efficiency above 50% — better than any road engine.',
  },
  {
    id: 'rear-wing',
    name: 'Rear Wing + DRS',
    pos: { x: 84, y: 40 },
    stat: '+12 km/h top-speed when opened',
    desc: 'The beam wing and main plane shed drag on straights when DRS activates. One hydraulic flap, zero hesitation, huge slipstream economics.',
  },
  {
    id: 'diffuser',
    name: 'Rear Diffuser',
    pos: { x: 88, y: 74 },
    stat: 'Pressure recovery gradient < 7°',
    desc: 'Expands the fast underbody air back to ambient, extracting the final chunk of downforce. Strakes organise the wake feeding the rear tyres.',
  },
  {
    id: 'tires',
    name: 'Tyres',
    pos: { x: 24, y: 82 },
    stat: 'Optimal window 90–110 °C carcass',
    desc: 'Blown 18-inch rims with tyre-pressure telemetry baked into the wheel. Warm-up generation is the difference between pole and P8.',
  },
  {
    id: 'suspension',
    name: 'Suspension',
    pos: { x: 30, y: 66 },
    stat: 'Pushrod rates to 300 N/mm',
    desc: 'Inerter-linked wishbones keep the platform rigid under 5G corners while absorbing kerb strikes in milliseconds. Camber trust controls tyre shoulders.',
  },
]

export const TIMELINE = [
  {
    year: '1998',
    title: 'The Grooved Era',
    text: 'Four-groove tyres and narrow tracks. Downforce drops by regulation; engine speed rises to 19,000 rpm. Drivers become the dominant stability-control system.',
    accent: '#a3e635',
    facts: ['V10 NA', '600 kg min.', 'Sequential H-pattern'],
  },
  {
    year: '2009',
    title: 'Aero Over Engines',
    text: 'Wide-nose cars, exposed front wings and roof-mounted airscopes. KERS arrives — the first electric torque fill in the modern era.',
    accent: '#38bdf8',
    facts: ['KERS 80hp boost', 'Refuel ban', 'Slippery when dirty'],
  },
  {
    year: '2014',
    title: 'Hybrid Thunder',
    text: '1.6L V6 turbo with MGU-K and MGU-H. Power units become thermal-efficiency laboratories; fuel flow caps turn every joule into strategy.',
    accent: '#fbbf24',
    facts: ['1000+ hp combined', '100 kg/lap fuel', 'Energy deployment maps'],
  },
  {
    year: '2017',
    title: 'Bigger, Wider, Faster',
    text: 'Wider tyres and floors return. Lap times drop three seconds per circuit in a single season — the largest regulated performance jump on record (demo).',
    accent: '#ff2d55',
    facts: ['200mm wider', 'Twin pillar wings', '5G cornering'],
  },
  {
    year: '2022',
    title: 'Ground Effect Returns',
    text: 'Venturi tunnels replace flat-floor complexity. Following distance shrinks; overtaking becomes an engineering goal rather than a hope.',
    accent: '#c084fc',
    facts: ['18" wheels', 'Underbody stalls managed', 'DRS + zonal marshalling'],
  },
  {
    year: '2026',
    title: 'Active Aero Horizon',
    text: 'The next regulation cycle promises movable surfaces, sustainable fuels and a 50/50 split between combustion and electric thrust.',
    accent: '#f4f4f5',
    facts: ['Active wings', '100% sustainable fuel', 'Boost-only overtaking'],
  },
]

export const TRACK = {
  name: 'APEX RING — Grand Prix Layout',
  length: '5.412 km',
  turns: 14,
  drs: 3,
  sectors: [
    { id: 1, color: '#a3e635', range: [0, 0.34], best: '31.204' },
    { id: 2, color: '#fbbf24', range: [0.34, 0.67], best: '29.881' },
    { id: 3, color: '#38bdf8', range: [0.67, 1], best: '26.512' },
  ],
  corners: [
    { n: 1, t: 0.055, name: 'Apex Hairpin', speed: '84 km/h', gear: '2', line: 'Late apex, long exit onto the tunnel.' },
    { n: 4, t: 0.185, name: 'Eau Rouge Rise', speed: '246 km/h', gear: '7', line: 'Flat through the compression — trust the load.' },
    { n: 7, t: 0.33, name: 'Sector-2 Entry', speed: '178 km/h', gear: '5', line: 'Trail-brake in, minimum centre, maximum exit camber.' },
    { n: 9, t: 0.47, name: 'The Stadium', speed: '112 km/h', gear: '3', line: 'Double-apex left-hander under grandstand noise.' },
    { n: 11, t: 0.62, name: 'Chicane Nord', speed: '96 km/h', gear: '2', line: 'Right-left flicker; ride the rumble with caution.' },
    { n: 14, t: 0.86, name: 'Parabolica Final', speed: '145 km/h', gear: '4', line: 'Long sweep setting up the DRS straight — sacrifice entry for exit.' },
  ],
}

export const GALLERY = [
  { id: 'g1', title: 'Grid Walk', sub: 'Pre-race · Night circuit', tone: ['#ff2d55', '#1a0b12'], motif: 'car-front' },
  { id: 'g2', title: 'Carbon Detail', sub: 'Nose impact structure', tone: ['#27272a', '#09090b'], motif: 'carbon' },
  { id: 'g3', title: 'Cockpit POV', sub: 'Halo & steering display', tone: ['#38bdf8', '#081420'], motif: 'hud' },
  { id: 'g4', title: 'Wheel & Brake', sub: '1100 °C disc core', tone: ['#fbbf24', '#1c1206'], motif: 'wheel' },
  { id: 'g5', title: 'Rear Wing', sub: 'DRS actuator macro', tone: ['#a3e635', '#0e1707'], motif: 'wing' },
  { id: 'g6', title: 'Pit Stop', sub: '2.11 s · four-gun release', tone: ['#c084fc', '#150a20'], motif: 'pit' },
  { id: 'g7', title: 'Track Limits', sub: 'Kerb strike, Turn 11', tone: ['#ff2d55', '#160a0d'], motif: 'kerb' },
  { id: 'g8', title: 'Diffuser Light', sub: 'Parc fermé inspection', tone: ['#f4f4f5', '#0b0b0d'], motif: 'diffuser' },
]

export const TICKER_ITEMS = [
  'APEX GP CONCEPT SHOWCASE', 'DEMO TELEMETRY ACTIVE', 'AX-24 · ENGINEERED FOR SPEED',
  'SECTOR ANALYSIS ONLINE', 'PIT LANE OPEN', 'TYRE WINDOW 90–110°C', 'DRS ENABLED',
]
