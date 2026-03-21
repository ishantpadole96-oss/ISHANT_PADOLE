import { motion } from 'framer-motion'
import { ArrowRight, Palette, Wind, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const Design = () => {
  const exteriorFeatures = [
    { title: 'Carbon Fiber Roof', desc: 'Reduces weight and lowers center of gravity', img: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'M Kidney Grille', desc: 'Illuminated frameless design', img: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Laser Lights', desc: 'BMW Laserlight with blue accents', img: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'M Carbon Ceramics', desc: 'Optional high-performance brakes', img: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ]

  const interiorFeatures = [
    { title: 'M Carbon Bucket Seats', desc: 'Alcantara® and Merino leather', img: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Carbon Fiber Trim', desc: 'Interior trim with M5 CS logo', img: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'M Leather Steering Wheel', desc: 'Heated with M1/M2 buttons', img: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Ambient Lighting', desc: 'Customizable color options', img: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ]

  const colors = [
    { name: 'Brands Hatch Grey', hex: '#4a4a4a' },
    { name: 'Black Sapphire', hex: '#0c0c0c' },
    { name: 'Marina Bay Blue', hex: '#1e3a5f' },
    { name: 'Motegi Red', hex: '#8b0000' },
    { name: 'Alpine White', hex: '#f5f5f5' }
  ]

  return (
    <div className="min-h-screen pt-8">
      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="BMW M5 CS Design" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-bmw-dark" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }} className="inline-block mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-bmw-blue to-bmw-red flex items-center justify-center">
                <Palette className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6">
              <span className="text-white">SCULPTED</span><br />
              <span className="gradient-text">PERFECTION</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Every line tells a story. Every curve serves a purpose.</p>
          </motion.div>
        </div>
      </section>

      {/* Exterior */}
      <section className="section-padding bg-bmw-dark">
        <div className="container-custom">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-black text-center mb-4">
            EXTERIOR <span className="gradient-text">DESIGN</span>
          </motion.h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Aerodynamic excellence meets aggressive styling</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {exteriorFeatures.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -10, scale: 1.02 }} className="group relative overflow-hidden rounded-2xl cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={feature.img} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Colors */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-8">Available Colors</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {colors.map((color, i) => (
                <motion.button key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="group text-center">
                  <div className="w-20 h-20 rounded-full border-4 border-white/20 group-hover:border-white transition-colors mb-3 shadow-lg" style={{ backgroundColor: color.hex }} />
                  <span className="text-sm text-gray-300">{color.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Interior */}
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-black text-center mb-4">
            INTERIOR <span className="gradient-text">CRAFTSMANSHIP</span>
          </motion.h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Luxury meets performance in every detail</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interiorFeatures.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -10, scale: 1.02 }} className="group relative overflow-hidden rounded-2xl cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={feature.img} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-bmw-blue/20 to-bmw-red/20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-black mb-8">MAKE IT <span className="gradient-text">YOURS</span></h2>
            <Link to="/configurator" className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-bmw-blue to-bmw-red rounded-full font-bold text-lg hover:scale-105 transition-transform">
              Start Configuring <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Design
