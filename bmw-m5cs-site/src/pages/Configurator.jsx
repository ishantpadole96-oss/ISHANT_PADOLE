import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ChevronRight, Palette, Gauge, Zap, ArrowRight } from 'lucide-react'

const Configurator = () => {
  const [selectedColor, setSelectedColor] = useState('Brands Hatch Grey')
  const [selectedWheels, setSelectedWheels] = useState('20" M Carbon')
  const [selectedInterior, setSelectedInterior] = useState('Black Merino Leather')

  const colors = [
    { name: 'Brands Hatch Grey', hex: '#4a4a4a', popular: true },
    { name: 'Black Sapphire', hex: '#0c0c0c', popular: false },
    { name: 'Marina Bay Blue', hex: '#1e3a5f', popular: false },
    { name: 'Motegi Red', hex: '#8b0000', popular: true },
    { name: 'Alpine White', hex: '#f5f5f5', popular: false }
  ]

  const wheels = [
    { name: '20" M Carbon', desc: 'Lightweight forged design', price: '$8,500' },
    { name: '20" M Star-spoke', desc: 'Aerodynamic optimization', price: '$4,200' },
    { name: '19" M Cross-spoke', desc: 'Classic M styling', price: '$2,800' }
  ]

  const interiors = [
    { name: 'Black Merino Leather', desc: 'Full leather trim with contrast stitching', price: 'Standard' },
    { name: 'Silverstone/Black', desc: 'Two-tone premium leather', price: '$3,500' },
    { name: 'Sakhir Gold/Black', desc: 'Exclusive M color combination', price: '$5,000' }
  ]

  const basePrice = 142000
  const total = basePrice + 
    (selectedWheels === '20" M Carbon' ? 8500 : selectedWheels === '20" M Star-spoke' ? 4200 : 2800) +
    (selectedInterior === 'Black Merino Leather' ? 0 : selectedInterior === 'Silverstone/Black' ? 3500 : 5000)

  return (
    <div className="min-h-screen pt-8">
      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bmw-blue/30 via-bmw-dark to-bmw-red/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center px-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6">
              <span className="text-white">BUILD YOUR</span><br />
              <span className="gradient-text">DREAM M5 CS</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Configure the ultimate driving machine to your specifications</p>
          </motion.div>
        </div>
      </section>

      {/* Configurator */}
      <section className="section-padding bg-bmw-dark">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Preview */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="sticky top-24">
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-bmw-gray to-bmw-dark border border-bmw-blue/20">
                <img src="https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="M5 CS Preview" className="w-full h-full object-cover" style={{ filter: `hue-rotate(${colors.findIndex(c => c.name === selectedColor) * 30}deg)` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedColor}</h3>
                  <p className="text-gray-300">{selectedWheels} • {selectedInterior}</p>
                </div>
                <div className="absolute top-4 right-4 px-4 py-2 bg-bmw-red/90 rounded-full text-sm font-semibold">
                  Live Preview
                </div>
              </div>

              {/* Price Summary */}
              <div className="mt-8 p-6 bg-gradient-to-br from-bmw-gray to-bmw-dark rounded-2xl border border-bmw-blue/20">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Base Price</span>
                  <span className="text-white font-semibold">${basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-bmw-blue/20">
                  <span className="text-gray-400">Selected Options</span>
                  <span className="text-white font-semibold">+${(total - basePrice).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white">Estimated Total</span>
                  <span className="text-3xl font-black gradient-text">${total.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>

            {/* Configuration Options */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-12">
              {/* Colors */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Palette className="w-8 h-8 text-bmw-blue" />
                  <h2 className="text-2xl font-bold text-white">Exterior Color</h2>
                </div>
                <div className="flex flex-wrap gap-4">
                  {colors.map((color) => (
                    <motion.button key={color.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedColor(color.name)} className={`group relative ${selectedColor === color.name ? 'ring-4 ring-bmw-blue ring-offset-4 ring-offset-bmw-dark' : ''}`}>
                      <div className="w-20 h-20 rounded-full border-4 border-white/20 shadow-lg" style={{ backgroundColor: color.hex }} />
                      {color.popular && <div className="absolute -top-2 -right-2 px-2 py-1 bg-bmw-red rounded-full text-xs font-semibold text-white">Popular</div>}
                      <div className="mt-2 text-sm text-gray-300 text-center">{color.name}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Wheels */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Gauge className="w-8 h-8 text-bmw-blue" />
                  <h2 className="text-2xl font-bold text-white">M Wheels</h2>
                </div>
                <div className="space-y-4">
                  {wheels.map((wheel) => (
                    <motion.button key={wheel.name} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setSelectedWheels(wheel.name)} className={`w-full p-6 rounded-xl border-2 transition-all text-left ${selectedWheels === wheel.name ? 'border-bmw-blue bg-bmw-blue/10' : 'border-bmw-blue/20 bg-bmw-gray/50 hover:border-bmw-blue/40'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">{wheel.name}</h3>
                          <p className="text-gray-400 text-sm">{wheel.desc}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-bmw-blue font-bold">{wheel.price}</div>
                          {selectedWheels === wheel.name && <Check className="w-6 h-6 text-bmw-blue mt-2 ml-auto" />}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Interior */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Zap className="w-8 h-8 text-bmw-blue" />
                  <h2 className="text-2xl font-bold text-white">Interior Trim</h2>
                </div>
                <div className="space-y-4">
                  {interiors.map((interior) => (
                    <motion.button key={interior.name} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setSelectedInterior(interior.name)} className={`w-full p-6 rounded-xl border-2 transition-all text-left ${selectedInterior === interior.name ? 'border-bmw-blue bg-bmw-blue/10' : 'border-bmw-blue/20 bg-bmw-gray/50 hover:border-bmw-blue/40'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">{interior.name}</h3>
                          <p className="text-gray-400 text-sm">{interior.desc}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-bmw-blue font-bold">{interior.price}</div>
                          {selectedInterior === interior.name && <Check className="w-6 h-6 text-bmw-blue mt-2 ml-auto" />}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-6 bg-gradient-to-r from-bmw-blue to-bmw-red rounded-full font-bold text-xl text-white hover:shadow-2xl hover:shadow-bmw-blue/40 transition-all flex items-center justify-center">
                Request This Configuration <ArrowRight className="ml-3 w-6 h-6" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Configurator
