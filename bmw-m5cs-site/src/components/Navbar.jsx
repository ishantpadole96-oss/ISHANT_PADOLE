import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Performance', path: '/performance' },
    { name: 'Design', path: '/design' },
    { name: 'Technology', path: '/technology' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Heritage', path: '/heritage' },
    { name: 'Configurator', path: '/configurator' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-bmw-dark/95 backdrop-blur-md shadow-lg shadow-bmw-blue/10' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="group flex items-center space-x-3">
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-bmw-blue via-white to-bmw-red p-0.5 group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <span className="text-xs font-bold text-white">BMW</span>
                </div>
              </div>
              <span className="hidden md:block text-xl font-bold gradient-text group-hover:tracking-wider transition-all duration-300">
                M5 CS
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                    isActive(link.path)
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-bmw-blue to-bmw-red transition-all duration-300 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                  <span className="absolute inset-0 bg-gradient-to-r from-bmw-blue/10 to-bmw-red/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                to="/configurator"
                className="relative px-6 py-2.5 bg-gradient-to-r from-bmw-blue to-bmw-red rounded-full text-sm font-semibold text-white overflow-hidden group hover:scale-105 transition-transform duration-300"
              >
                <span className="relative z-10">Build Yours</span>
                <div className="absolute inset-0 bg-gradient-to-r from-bmw-red to-bmw-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-bmw-gray/50 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 z-40 bg-bmw-dark/98 backdrop-blur-lg lg:hidden overflow-y-auto"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                      isActive(link.path)
                        ? 'bg-gradient-to-r from-bmw-blue/20 to-bmw-red/20 text-white border-l-4 border-bmw-blue'
                        : 'text-gray-300 hover:bg-bmw-gray/50 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {link.name}
                      <ChevronDown className={`w-5 h-5 transform transition-transform ${
                        isActive(link.path) ? 'rotate-180 text-bmw-blue' : ''
                      }`} />
                    </div>
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-4"
              >
                <Link
                  to="/configurator"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-6 py-4 bg-gradient-to-r from-bmw-blue to-bmw-red rounded-xl text-center font-semibold text-white hover:scale-105 transition-transform duration-300"
                >
                  Build Your M5 CS
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
