import { Link } from 'react-router-dom'
import { Instagram, Github, Linkedin, Mail, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ishant_padole/?utm_source=ig_web_button_share_sheet',
      icon: Instagram,
      color: 'hover:text-pink-500'
    },
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: Github,
      color: 'hover:text-white'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: Linkedin,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Email',
      url: 'mailto:contact@example.com',
      icon: Mail,
      color: 'hover:text-red-500'
    }
  ]

  const footerLinks = {
    'Explore': [
      { name: 'Home', path: '/' },
      { name: 'Performance', path: '/performance' },
      { name: 'Design', path: '/design' },
      { name: 'Technology', path: '/technology' }
    ],
    'Gallery': [
      { name: 'Photo Gallery', path: '/gallery' },
      { name: 'Videos', path: '/experience' },
      { name: '360° View', path: '/configurator' }
    ],
    'More': [
      { name: 'Heritage', path: '/heritage' },
      { name: 'Experience', path: '/experience' },
      { name: 'Contact', path: '/contact' }
    ]
  }

  return (
    <footer className="bg-bmw-gray border-t border-bmw-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-bmw-blue via-white to-bmw-red p-0.5 group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <span className="text-sm font-bold text-white">BMW</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold gradient-text">M5 CS</h3>
                <p className="text-xs text-gray-400">The Ultimate Driving Machine</p>
              </div>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Experience the pinnacle of automotive engineering. The BMW M5 CS represents 
              the perfect fusion of performance, luxury, and cutting-edge technology. 
              Built for those who demand nothing but the best.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-bmw-dark/50 border border-bmw-blue/20 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-bmw-blue/20 group`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4 flex items-center">
                {category}
                <div className="ml-2 w-8 h-0.5 bg-gradient-to-r from-bmw-blue to-bmw-red rounded-full" />
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors duration-300 relative group inline-block"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-bmw-blue to-bmw-red group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-bmw-blue/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} BMW M5 CS Showcase. All rights reserved.
            </div>

            {/* Developer Credit */}
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-400">Developed by</span>
              <a
                href="https://www.instagram.com/ishant_padole/?utm_source=ig_web_button_share_sheet"
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-text font-semibold hover:underline decoration-bmw-blue decoration-2 underline-offset-2 transition-all duration-300"
              >
                ISHANT VISHNU PADOLE
              </a>
              <Heart className="w-4 h-4 text-bmw-red fill-bmw-red animate-pulse" />
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4 text-xs text-gray-500">
            <span>This is a fan-made showcase website</span>
            <span className="hidden md:inline">•</span>
            <span>Not affiliated with BMW AG</span>
            <span className="hidden md:inline">•</span>
            <span>For educational purposes only</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
