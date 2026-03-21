import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useAnimation, useInView } from 'framer-motion'
import { 
  Zap, 
  Gauge, 
  Timer, 
  Trophy, 
  ArrowRight, 
  Play,
  ChevronDown,
  Sparkles
} from 'lucide-react'

const Home = () => {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  const stats = [
    { icon: Zap, value: '627', label: 'Horsepower', unit: 'hp', color: 'text-bmw-blue' },
    { icon: Gauge, value: '750', label: 'Torque', unit: 'Nm', color: 'text-bmw-red' },
    { icon: Timer, value: '3.0', label: '0-100 km/h', unit: 'sec', color: 'text-yellow-400' },
    { icon: Trophy, value: '305', label: 'Top Speed', unit: 'km/h', color: 'text-green-400' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            onLoadedData={() => setVideoLoaded(true)}
          >
            <source src="https://videos.pexels.com/video-files/6796052/6796052-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/5835276/5835276-uhd_2560_1440_24fps.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/4428663/4428663-uhd_2560_1440_24fps.mp4" type="video/mp4" />
          </video>
          
          {/* Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-bmw-dark" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{
                y: [null, Math.random() * -200],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8"
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium text-white/90">The Most Powerful M5 Ever Created</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-9xl font-black mb-6 leading-tight"
            >
              <span className="block text-white drop-shadow-2xl">BMW M5 CS</span>
              <span className="block gradient-text mt-2">THE ULTIMATE</span>
              <span className="block text-white drop-shadow-2xl">DRIVING MACHINE</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Experience the pinnacle of automotive engineering. Where raw power meets 
              precision craftsmanship. The BMW M5 CS redefines what a sports sedan can be.
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -8 }}
                    className="group p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-bmw-blue/50 hover:shadow-2xl hover:shadow-bmw-blue/20 transition-all duration-300 cursor-pointer"
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color} group-hover:rotate-12 transition-transform duration-300`} />
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                      {stat.value}
                      <span className="text-lg ml-1">{stat.unit}</span>
                    </div>
                    <div className="text-sm text-gray-400 group-hover:text-white transition-colors">
                      {stat.label}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/performance"
                className="group relative px-8 py-4 bg-gradient-to-r from-bmw-blue to-bmw-red rounded-full font-semibold text-white overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg shadow-bmw-blue/30 hover:shadow-bmw-blue/50"
              >
                <span className="relative z-10 flex items-center">
                  Explore Performance
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-bmw-red to-bmw-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <Link
                to="/experience"
                className="group px-8 py-4 border-2 border-white/30 rounded-full font-semibold text-white hover:bg-white/10 hover:border-white/50 hover:scale-105 transition-all duration-300 flex items-center"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Film
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/50" />
        </motion.div>

        {/* Loading State */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-bmw-dark flex items-center justify-center z-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-bmw-blue border-t-bmw-red rounded-full"
            />
          </div>
        )}
      </section>

      {/* Quick Preview Section */}
      <section className="section-padding bg-bmw-dark">
        <div className="container-custom">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              <span className="gradient-text">ENGINEERED</span> FOR EXCELLENCE
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Every detail has been meticulously crafted to deliver an unparalleled driving experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Unmatched Performance',
                description: 'Twin-turbo V8 engine delivering breathtaking acceleration and top speed',
                image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800',
                link: '/performance'
              },
              {
                title: 'Stunning Design',
                description: 'Aerodynamic excellence meets luxurious craftsmanship inside and out',
                image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
                link: '/design'
              },
              {
                title: 'Cutting-Edge Technology',
                description: 'Advanced driver assistance systems and intuitive connectivity features',
                image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
                link: '/technology'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  <Link
                    to={item.link}
                    className="inline-flex items-center text-bmw-blue font-semibold group-hover:text-bmw-red transition-colors"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-bmw-blue/20 to-bmw-red/20" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
              FEEL THE <span className="gradient-text">POWER</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              EXPERIENCE THE PRECISION
            </p>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
              The BMW M5 CS awaits. Configure your perfect specification and 
              take the first step towards owning the ultimate driving machine.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/configurator"
                className="group px-10 py-5 bg-gradient-to-r from-bmw-blue to-bmw-red rounded-full font-bold text-lg text-white hover:scale-105 hover:shadow-2xl hover:shadow-bmw-blue/40 transition-all duration-300"
              >
                <span className="flex items-center">
                  Build Your M5 CS
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>
              
              <Link
                to="/contact"
                className="px-10 py-5 border-2 border-white/30 rounded-full font-bold text-lg text-white hover:bg-white/10 hover:border-white/50 hover:scale-105 transition-all duration-300"
              >
                Contact Dealer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
