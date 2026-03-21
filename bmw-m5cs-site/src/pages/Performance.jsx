import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { 
  Zap, 
  Gauge, 
  Timer, 
  Trophy, 
  Engine, 
  Wind,
  Fuel,
  Settings,
  ArrowRight,
  Play
} from 'lucide-react'

const Performance = () => {
  const [counts, setCounts] = useState({ hp: 0, torque: 0, acceleration: 0, topSpeed: 0 })
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      animateCounter('hp', 627, 2000)
      animateCounter('torque', 750, 2000)
      animateCounter('acceleration', 3.0, 2000)
      animateCounter('topSpeed', 305, 2000)
    }
  }, [isInView])

  const animateCounter = (key, target, duration) => {
    const start = 0
    const increment = target / (duration / 16)
    let current = start
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      setCounts(prev => ({ ...prev, [key]: key === 'acceleration' ? current.toFixed(1) : Math.floor(current) }))
    }, 16)
  }

  const specs = [
    { icon: Engine, label: 'Engine Type', value: '4.4L Twin-Turbo V8', description: 'M TwinPower Turbo technology' },
    { icon: Zap, label: 'Power Output', value: '627 hp', description: '@ 6,000 rpm' },
    { icon: Gauge, label: 'Torque', value: '750 Nm', description: '@ 1,800-5,950 rpm' },
    { icon: Timer, label: '0-100 km/h', value: '3.0 sec', description: 'With M Launch Control' },
    { icon: Trophy, label: 'Top Speed', value: '305 km/h', description: 'With M Driver\'s Package' },
    { icon: Fuel, label: 'Transmission', value: '8-Speed M Steptronic', description: 'Drivelogic with 3 modes' },
    { icon: Wind, label: 'Drivetrain', value: 'M xDrive AWD', description: 'Rear-wheel drive mode available' },
    { icon: Settings, label: 'Weight', value: '1,825 kg', description: 'DIN unladen weight' }
  ]

  const performanceModes = [
    { name: 'ROAD', color: 'from-blue-500 to-cyan-500', description: 'Comfortable daily driving with smooth power delivery' },
    { name: 'SPORT', color: 'from-yellow-500 to-orange-500', description: 'Sharper throttle response and firmer suspension' },
    { name: 'TRACK', color: 'from-red-500 to-pink-500', description: 'Maximum performance for circuit driving' }
  ]

  return (
    <div className="min-h-screen pt-8">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://videos.pexels.com/video-files/3205903/3205903-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/6796052/6796052-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-bmw-dark" />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-bmw-blue to-bmw-red flex items-center justify-center">
                <Engine className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6">
              <span className="text-white">UNLEASH</span>
              <br />
              <span className="gradient-text">PURE POWER</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              The heart of a beast. The soul of a champion. Experience engineering perfection.
            </p>

            <div className="flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-bmw-blue to-bmw-red rounded-full font-semibold flex items-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Performance Film
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Animated Stats */}
      <section className="section-padding bg-bmw-dark">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { key: 'hp', label: 'Horsepower', unit: 'hp', icon: Zap, color: 'text-bmw-blue' },
              { key: 'torque', label: 'Torque', unit: 'Nm', icon: Gauge, color: 'text-bmw-red' },
              { key: 'acceleration', label: '0-100 km/h', unit: 'sec', icon: Timer, color: 'text-yellow-400' },
              { key: 'topSpeed', label: 'Top Speed', unit: 'km/h', icon: Trophy, color: 'text-green-400' }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="group p-8 bg-gradient-to-br from-bmw-gray to-bmw-dark rounded-2xl border border-bmw-blue/20 hover:border-bmw-blue/50 transition-all duration-300"
                >
                  <Icon className={`w-10 h-10 ${stat.color} mb-4 group-hover:rotate-12 transition-transform`} />
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">
                    {counts[stat.key]}
                    <span className="text-xl ml-2">{stat.unit}</span>
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>

          {/* Detailed Specs */}
          <div ref={ref} className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-4">
                TECHNICAL <span className="gradient-text">SPECIFICATIONS</span>
              </h2>
              <p className="text-gray-400 text-lg">Every number tells a story of engineering excellence</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {specs.map((spec, index) => {
                const Icon = spec.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group p-6 bg-bmw-gray/50 rounded-xl border border-bmw-blue/10 hover:border-bmw-blue/40 hover:shadow-xl hover:shadow-bmw-blue/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-bmw-blue/20 to-bmw-red/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-bmw-blue group-hover:text-bmw-red transition-colors" />
                    </div>
                    <h3 className="text-sm text-gray-400 mb-2">{spec.label}</h3>
                    <p className="text-2xl font-bold text-white mb-2">{spec.value}</p>
                    <p className="text-xs text-gray-500">{spec.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Performance Modes */}
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-center mb-12"
            >
              M MODES: <span className="gradient-text">CHOOSE YOUR FIGHTER</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {performanceModes.map((mode, index) => (
                <motion.div
                  key={mode.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <h3 className={`text-5xl font-black mb-4 bg-gradient-to-r ${mode.color} bg-clip-text text-transparent`}>
                        {mode.name}
                      </h3>
                      <p className="text-gray-300 text-lg">{mode.description}</p>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="mt-6 inline-flex items-center text-white font-semibold"
                      >
                        Activate Mode
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 rounded-full border-2 border-white/10 group-hover:border-white/30 transition-colors" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full border-2 border-white/10 group-hover:border-white/30 transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Engine Close-up */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden mb-20"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-12 flex flex-col justify-center bg-gradient-to-br from-bmw-gray to-bmw-dark">
                <h2 className="text-4xl md:text-5xl font-black mb-6">
                  THE HEART OF A <span className="gradient-text">CHAMPION</span>
                </h2>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  The 4.4-liter M TwinPower Turbo V8 engine in the BMW M5 CS produces 
                  an exhilarating 627 horsepower and 750 Nm of torque. This masterpiece 
                  of engineering features cross-bank exhaust manifolds, wire-arc sprayed 
                  iron-coated cylinder bores, and VALVETRONIC fully variable valve timing.
                </p>
                
                <div className="space-y-4">
                  {[
                    'Twin-scroll turbochargers',
                    'High-precision direct injection',
                    'Infinite double-VANOS camshaft adjustment',
                    'Lightweight titanium exhaust system'
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-bmw-blue to-bmw-red" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="relative h-96 md:h-auto">
                <img
                  src="https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="BMW M Engine"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-bmw-dark/50" />
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-black mb-8">
              READY TO <span className="gradient-text">EXPERIENCE IT?</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="/configurator"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-bmw-blue to-bmw-red rounded-full font-bold text-lg"
              >
                Configure Your M5 CS
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 border-2 border-white/30 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Book Test Drive
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Performance
