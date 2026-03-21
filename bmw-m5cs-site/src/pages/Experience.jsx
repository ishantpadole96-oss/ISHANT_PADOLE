import { motion } from 'framer-motion'
import { Play, Calendar, MapPin, Users, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Experience = () => {
  const experiences = [
    { title: 'M Track Experience', desc: 'Push your limits on professional race tracks with expert instructors', location: 'Multiple Locations', duration: '2 Days', img: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Performance Driving School', desc: 'Master advanced driving techniques in controlled environments', location: 'BMW Performance Center', duration: '3 Days', img: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Ice Experience', desc: 'Learn car control on frozen lakes in extreme winter conditions', location: 'Arctic Circle', duration: '4 Days', img: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ]

  const videos = [
    { title: 'M5 CS on Track', views: '2.4M', duration: '8:42', thumbnail: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Drift Masterclass', views: '1.8M', duration: '12:15', thumbnail: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Nürburgring Lap Record', views: '3.2M', duration: '6:30', thumbnail: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Behind the Design', views: '980K', duration: '15:20', thumbnail: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ]

  return (
    <div className="min-h-screen pt-8">
      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://videos.pexels.com/video-files/6796052/6796052-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/5835276/5835276-uhd_2560_1440_24fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-bmw-dark" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }} className="inline-block mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-bmw-blue to-bmw-red flex items-center justify-center">
                <Play className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6">
              <span className="text-white">LIVE THE</span><br />
              <span className="gradient-text">EXPERIENCE</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Beyond driving. Beyond expectations.</p>
          </motion.div>
        </div>
      </section>

      {/* M Experiences */}
      <section className="section-padding bg-bmw-dark">
        <div className="container-custom">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-black text-center mb-4">
            M <span className="gradient-text">EXPERIENCES</span>
          </motion.h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">Unforgettable moments behind the wheel</p>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {experiences.map((exp, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -10, scale: 1.02 }} className="group relative overflow-hidden rounded-2xl cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={exp.img} alt={exp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{exp.desc}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{exp.location}</span>
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{exp.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Video Gallery */}
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-black text-center mb-4">
            FEATURED <span className="gradient-text">VIDEOS</span>
          </motion.h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">Watch the M5 CS in action</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {videos.map((video, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8, scale: 1.03 }} className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-bmw-gray">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-bmw-blue transition-all">
                    <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[10px] border-y-transparent ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <h4 className="text-white font-semibold text-sm mb-1">{video.title}</h4>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center"><Users className="w-3 h-3 mr-1" />{video.views}</span>
                    <span>{video.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-8">READY TO <span className="gradient-text">EXPERIENCE IT?</span></h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="group px-10 py-5 bg-gradient-to-r from-bmw-blue to-bmw-red rounded-full font-bold text-lg hover:scale-105 transition-transform inline-flex items-center">
                Book Test Drive <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/gallery" className="px-10 py-5 border-2 border-white/30 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                View Gallery
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Experience
