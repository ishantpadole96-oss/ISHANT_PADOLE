import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Performance from './pages/Performance'
import Design from './pages/Design'
import Technology from './pages/Technology'
import Gallery from './pages/Gallery'
import Heritage from './pages/Heritage'
import Configurator from './pages/Configurator'
import Experience from './pages/Experience'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bmw-dark text-white overflow-x-hidden">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/design" element={<Design />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/heritage" element={<Heritage />} />
            <Route path="/configurator" element={<Configurator />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
