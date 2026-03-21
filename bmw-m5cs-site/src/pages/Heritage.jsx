import { motion } from 'framer-motion'
import { Trophy, Clock, Award, Users, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Heritage = () => {
  const milestones = [
    { year: '1984', title: 'First M5 Born', desc: 'The original E28 M5 introduced the world to the ultimate sports sedan', icon: Clock },
    { year: '1998', title: 'V8 Power Era', desc: 'E39 M5 brought naturally aspirated V8 excellence', icon: Award },
    { year: '2005', title: 'F1 Technology', desc: 'E60 M5 with 5.0L V10 screaming to 8,250 rpm', icon: Trophy },
    { year: '2018', title: 'AWD Revolution', desc: 'F90 M5 introduces intelligent M xDrive system', icon: Users },
    { year: '2021', title: 'M5 CS Legacy', desc: 'The most powerful and exclusive M5 ever created', icon: Award }
  ]

  const generations = [
    { name: 'E28 (1984-1987)', hp: '286 hp', img: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'E34 (1988-1995)', hp: '315 hp', img: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'E39 (1998-2003)', hp: '400 hp', img: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'E60 (2005-2010)', hp: '507 hp', img: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'F10 (2011-2016)', hp: '560 hp', img: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'F90 (2018+)', hp: '627 hp', img: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ]

  return (
    <div className="min-h-screen pt-8">
      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bmw-blue/20 via-bmw-dark to-bmw-red/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center px-4">
            <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.3, type: 'spring' }} className="inline-block mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-bmw-blue to-bmw-red flex items-center justify-center shadow-2xl">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6">
              <span className="text-white">LEGENDARY</span><br />
              <span className="gradient-text">HERITAGE</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Nearly 40 years of M5 excellence</p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-bmw-dark">
        <div className="container-custom">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-black text-center mb-16">
            HISTORIC <span className="gradient-text">MOMENTS</span>
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-bmw-blue via-bmw-red to-bmw-blue hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, i) => {
                const Icon = milestone.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`flex items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:flex-row gap-8`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
                      <div className="inline-block p-6 bg-bmw-gray/50 rounded-2xl border border-bmw-blue/20 hover:border-bmw-blue/50 transition-colors">
                        <Icon className="w-10 h-10 text-bmw-blue mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">{milestone.title}</h3>
                        <p className="text-gray-400">{milestone.desc}</p>
                      </div>
                    </div>
                    
                    <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-bmw-blue to-bmw-red flex items-center justify-center shadow-lg shadow-bmw-blue/50 flex-shrink-0">
                      <span className="text-white font-bold text-sm">{milestone.year}</span>
                    </div>
                    
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Generations */}
      <section className="section-padding bg-gradient-to-r from-bmw-blue/10 to-bmw-red/10">
        <div className="container-custom">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-black text-center mb-4">
            EVOLUTION OF <span className="gradient-text">GREATNESS</span>
          </motion.h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">Six generations of automotive excellence</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {generations.map((gen, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -10, scale: 1.02 }} className="group relative overflow-hidden rounded-2xl cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={gen.img} alt={gen.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{gen.name}</h3>
                  <p className="text-bmw-blue font-semibold text-lg">{gen.hp}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-bmw-dark">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-black mb-8">BE PART OF THE <span className="gradient-text">LEGACY</span></h2>
            <Link to="/configurator" className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-bmw-blue to-bmw-red rounded-full font-bold text-lg hover:scale-105 transition-transform">
              Build Your M5 CS <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Heritage
