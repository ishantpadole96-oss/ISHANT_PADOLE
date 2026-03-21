import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn, Filter } from 'lucide-react'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')

  const images = [
    { id: 1, src: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Front View', category: 'exterior' },
    { id: 2, src: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Side Profile', category: 'exterior' },
    { id: 3, src: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Rear Angle', category: 'exterior' },
    { id: 4, src: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Dashboard', category: 'interior' },
    { id: 5, src: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Carbon Seats', category: 'interior' },
    { id: 6, src: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Steering Wheel', category: 'interior' },
    { id: 7, src: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Night Drive', category: 'action' },
    { id: 8, src: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Track Day', category: 'action' },
    { id: 9, src: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Drift Mode', category: 'action' },
    { id: 10, src: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Engine Bay', category: 'details' },
    { id: 11, src: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Wheels', category: 'details' },
    { id: 12, src: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'M Badge', category: 'details' }
  ]

  const filters = ['all', 'exterior', 'interior', 'action', 'details']

  const filteredImages = activeFilter === 'all' ? images : images.filter(img => img.category === activeFilter)

  const nextImage = () => {
    if (selectedImage) {
      const currentIndex = images.findIndex(img => img.id === selectedImage.id)
      const nextIndex = (currentIndex + 1) % images.length
      setSelectedImage(images[nextIndex])
    }
  }

  const prevImage = () => {
    if (selectedImage) {
      const currentIndex = images.findIndex(img => img.id === selectedImage.id)
      const prevIndex = (currentIndex - 1 + images.length) % images.length
      setSelectedImage(images[prevIndex])
    }
  }

  return (
    <div className="min-h-screen pt-8">
      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Gallery Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-bmw-dark" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6">
              <span className="text-white">VISUAL</span><br />
              <span className="gradient-text">EXPERIENCE</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Explore the beauty of engineering excellence</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="section-padding bg-bmw-dark">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map(filter => (
              <motion.button key={filter} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveFilter(filter)} className={`px-6 py-3 rounded-full font-semibold capitalize transition-all ${activeFilter === filter ? 'bg-gradient-to-r from-bmw-blue to-bmw-red text-white' : 'bg-bmw-gray text-gray-400 hover:text-white'}`}>
                {filter}
              </motion.button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div key={image.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -8, scale: 1.02 }} onClick={() => setSelectedImage(image)} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer">
                  <img src={image.src} alt={image.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold">{image.title}</h3>
                    <p className="text-gray-300 text-sm capitalize">{image.category}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute inset-0 border-4 border-transparent group-hover:border-bmw-blue/50 rounded-2xl transition-colors duration-300" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="relative max-w-6xl w-full">
              <button onClick={() => setSelectedImage(null)} className="absolute -top-12 right-0 p-2 text-white hover:text-bmw-red transition-colors">
                <X className="w-8 h-8" />
              </button>
              
              <button onClick={(e) => { e.stopPropagation(); prevImage() }} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-3 bg-white/10 rounded-full text-white hover:bg-bmw-blue transition-colors">
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <button onClick={(e) => { e.stopPropagation(); nextImage() }} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-3 bg-white/10 rounded-full text-white hover:bg-bmw-red transition-colors">
                <ChevronRight className="w-8 h-8" />
              </button>
              
              <img src={selectedImage.src} alt={selectedImage.title} className="w-full h-auto rounded-2xl shadow-2xl" />
              
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-white">{selectedImage.title}</h3>
                <p className="text-gray-400 capitalize">Category: {selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Section */}
      <section className="section-padding bg-gradient-to-r from-bmw-blue/10 to-bmw-red/10">
        <div className="container-custom text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-black mb-8">
            IN <span className="gradient-text">MOTION</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} whileHover={{ scale: 1.02 }} className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer">
                <img src={`https://images.pexels.com/photos/${i === 1 ? '120049' : '112460'}/pexels-photo-${i === 1 ? '120049' : '112460'}.jpeg?auto=compress&cs=tinysrgb&w=1200`} alt="Video thumbnail" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-bmw-blue transition-all">
                    <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Gallery
