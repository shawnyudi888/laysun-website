import { useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Installations from './sections/Installations';
import Consultation from './sections/Consultation';
import Testimonials from './sections/Testimonials';
import Products from './sections/Products';
import FAQ from './sections/FAQ';
import Footer from './sections/Footer';

function App() {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#e7ebe4]">
      {/* Grain overlay for texture */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Installations />
        <Consultation />
        <Testimonials />
        <Products />
        <FAQ />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Toast notifications */}
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
