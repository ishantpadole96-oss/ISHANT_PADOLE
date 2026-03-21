import { motion } from 'framer-motion'
import { Cpu, Wifi, Shield, Smartphone, Headphones, Zap, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Technology = () => {
  const technologies = [
    { icon: Cpu, title: 'M Drive Professional', desc: 'Advanced traction control with 10-stage adjustment', color: 'from-blue-500 to-cyan-500' },
    { icon: Wifi, title: 'BMW Curved Display', desc: '12.3" info + 14.4" control displays', color: 'from-purple-500 to-pink-500' },
    { icon: Shield, title: 'Driving Assistant Pro', desc: 'Lane keeping, adaptive cruise, collision warning', color: 'from-green-500 to-emerald-500' },
    { icon: Smartphone, title: 'BMW Digital Key Plus', desc: 'Unlock and start with your smartphone', color: 'from-orange-500 to-red-500' },
    { icon: Headphones, title: 'Bowers & Wilkins Audio', desc: '1400W surround sound system', color: 'from-yellow-500 to-orange-500' },
    { icon: Zap, title: 'Head-Up Display', desc: 'M-specific readouts in your line of sight', color: 'from-red-500 to-pink-500' }
  ]

  const features = [
    { title: 'M xDrive Intelligent AWD', desc: 'Seamlessly distributes power between all four wheels for optimal traction. Switch to 4WD Sport or pure 2WD mode for different driving experiences.' },
    { title: 'Adaptive M Suspension', desc: 'Electronically controlled dampers continuously adjust to road conditions and driving style for perfect balance of comfort and sportiness.' },
    { title: 'M Compound Brakes', desc: 'Lightweight aluminum construction with blue calipers provide exceptional stopping power and fade resistance under extreme conditions.' },
    { title: 'Active M Differential', desc: 'Locking rear differential optimizes traction and stability by distributing drive torque between rear wheels based on driving dynamics.' }
  ]

  return (
    <div className="min-h-screen pt-8">
      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bmw-blue/30 via-bmw-dark to-bmw-red/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="text-center px-4">
            <motion.div initial={{ rotate: -180, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 100 }} className="inline-block mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-bmw-blue to-bmw-red flex items-center justify-center shadow-2xl shadow-bmw-blue/50">
                <Cpu className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6">
              <span className="text-white">FUTURE</span><br />
              <span className="gradient-text">TECHNOLOGY</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Cutting-edge innovation meets intuitive design</p>
          </motion.div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div key={i} className="absolute w-1 h-1 bg-bmw-blue/30 rounded-full" initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: 0 }} animate={{ y: [null, Math.random() * -300], opacity: [0, 1, 0] }} transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }} />
          ))}
        </div>
      </section>

      {/* Tech Cards */}
      <section className="section-padding bg-bmw-dark">
        <div className="container-custom">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-black text-center mb-4">
            INTELLIGENT <span className="gradient-text">INNOVATION</span>
          </motion.h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">Advanced technology designed to enhance every journey</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {technologies.map((tech, i) => {
              const Icon = tech.icon
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -12, scale: 1.03 }} className="group relative p-8 bg-gradient-to-br from-bmw-gray to-bmw-dark rounded-2xl border border-bmw-blue/10 hover:border-bmw-blue/40 overflow-hidden cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{tech.title}</h3>
                    <p className="text-gray-400">{tech.desc}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bmw-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              )
            })}
          </div>

          {/* Detailed Features */}
          <div className="space-y-8 mb-20">
            {features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.01 }} className="group p-8 bg-bmw-gray/50 rounded-2xl border border-bmw-blue/10 hover:border-bmw-blue/30 transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:gradient-text transition-all">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
                  </div>
                  <div className="relative h-48 rounded-xl overflow-hidden">
                    <img src={`https://images.pexels.com/photos/${[116675, 170811, 120049, 112460][i]}/pexels-photo-${[116675, 170811, 120049, 112460][i]}.jpeg?auto=compress&cs=tinysrgb&w=800`} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-bmw-dark/80 to-transparent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-8">EXPERIENCE THE <span className="gradient-text">FUTURE</span></h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/configurator" className="group px-10 py-5 bg-gradient-to-r from-bmw-blue to-bmw-red rounded-full font-bold text-lg hover:scale-105 transition-transform inline-flex items-center">
                Configure Now <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/experience" className="px-10 py-5 border-2 border-white/30 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                Watch Tech Film
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Technology
