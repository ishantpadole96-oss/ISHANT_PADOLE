import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', interest: 'test-drive' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const dealers = [
    { city: 'New York', address: '555 W 57th St, New York, NY 10019', phone: '+1 (212) 555-0100', hours: 'Mon-Sat: 9AM-8PM' },
    { city: 'Los Angeles', address: '11750 Santa Monica Blvd, LA, CA 90025', phone: '+1 (310) 555-0200', hours: 'Mon-Sat: 9AM-8PM' },
    { city: 'Miami', address: '2000 Biscayne Blvd, Miami, FL 33137', phone: '+1 (305) 555-0300', hours: 'Mon-Sat: 9AM-7PM' },
    { city: 'Chicago', address: '1520 N Lake Shore Dr, Chicago, IL 60610', phone: '+1 (312) 555-0400', hours: 'Mon-Sat: 9AM-8PM' }
  ]

  return (
    <div className="min-h-screen pt-8">
      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bmw-blue/30 via-bmw-dark to-bmw-red/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center px-4">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }} className="inline-block mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-bmw-blue to-bmw-red flex items-center justify-center">
                <Mail className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6">
              <span className="text-white">GET IN</span><br />
              <span className="gradient-text">TOUCH</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Start your M5 CS journey today</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-bmw-dark">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-white mb-6">Send Us a Message</h2>
              
              {submitted ? (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/50 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
                      <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-bmw-gray border border-bmw-blue/20 rounded-xl focus:border-bmw-blue focus:ring-2 focus:ring-bmw-blue/20 outline-none transition-all text-white" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Email Address *</label>
                      <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-bmw-gray border border-bmw-blue/20 rounded-xl focus:border-bmw-blue focus:ring-2 focus:ring-bmw-blue/20 outline-none transition-all text-white" placeholder="john@example.com" />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-bmw-gray border border-bmw-blue/20 rounded-xl focus:border-bmw-blue focus:ring-2 focus:ring-bmw-blue/20 outline-none transition-all text-white" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Interest *</label>
                      <select value={formData.interest} onChange={(e) => setFormData({...formData, interest: e.target.value})} className="w-full px-4 py-3 bg-bmw-gray border border-bmw-blue/20 rounded-xl focus:border-bmw-blue focus:ring-2 focus:ring-bmw-blue/20 outline-none transition-all text-white">
                        <option value="test-drive">Book Test Drive</option>
                        <option value="purchase">Purchase Inquiry</option>
                        <option value="configurator">Configuration Help</option>
                        <option value="experience">M Experience</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Message *</label>
                    <textarea required rows="5" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 bg-bmw-gray border border-bmw-blue/20 rounded-xl focus:border-bmw-blue focus:ring-2 focus:ring-bmw-blue/20 outline-none transition-all text-white resize-none" placeholder="Tell us how we can help you..." />
                  </div>
                  
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full py-4 bg-gradient-to-r from-bmw-blue to-bmw-red rounded-full font-bold text-lg text-white hover:shadow-2xl hover:shadow-bmw-blue/40 transition-all flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" /> Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-6 bg-bmw-gray/50 rounded-xl border border-bmw-blue/10">
                    <MapPin className="w-6 h-6 text-bmw-blue flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">BMW Headquarters</h3>
                      <p className="text-gray-400">Petuelring 130, 80788 Munich, Germany</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-6 bg-bmw-gray/50 rounded-xl border border-bmw-blue/10">
                    <Phone className="w-6 h-6 text-bmw-blue flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Customer Service</h3>
                      <p className="text-gray-400">+49 89 382 0</p>
                      <p className="text-gray-400">Mon-Fri: 8AM-6PM CET</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-6 bg-bmw-gray/50 rounded-xl border border-bmw-blue/10">
                    <Clock className="w-6 h-6 text-bmw-blue flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Response Time</h3>
                      <p className="text-gray-400">We typically respond within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Brochure Download', 'Financial Services', 'Trade-In Value', 'Warranty Info'].map((link, i) => (
                    <a key={i} href="#" className="p-4 bg-bmw-gray/50 rounded-xl border border-bmw-blue/10 text-gray-300 hover:text-white hover:border-bmw-blue/40 transition-all text-sm">{link}</a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Dealers */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white text-center mb-8">Find Your Nearest Dealer</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dealers.map((dealer, i) => (
                <motion.div key={i} whileHover={{ y: -5, scale: 1.02 }} className="p-6 bg-bmw-gray/50 rounded-xl border border-bmw-blue/10 hover:border-bmw-blue/40 transition-all cursor-pointer">
                  <h3 className="text-xl font-bold text-white mb-3">{dealer.city}</h3>
                  <p className="text-gray-400 text-sm mb-4">{dealer.address}</p>
                  <div className="space-y-2 text-sm">
                    <p className="text-bmw-blue flex items-center"><Phone className="w-4 h-4 mr-2" />{dealer.phone}</p>
                    <p className="text-gray-400 flex items-center"><Clock className="w-4 h-4 mr-2" />{dealer.hours}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
