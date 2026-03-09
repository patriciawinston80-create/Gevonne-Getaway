import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-off-white/90 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className={`font-heading font-bold text-lg tracking-tight transition-colors ${
              isScrolled ? 'text-text-primary' : 'text-off-white'
            }`}
          >
            Gevonne Getaway
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('listings')}
              className={`text-sm font-medium transition-colors hover:opacity-70 ${
                isScrolled ? 'text-text-primary' : 'text-off-white'
              }`}
            >
              Listings
            </button>
            <button
              onClick={() => scrollToSection('amenities')}
              className={`text-sm font-medium transition-colors hover:opacity-70 ${
                isScrolled ? 'text-text-primary' : 'text-off-white'
              }`}
            >
              Amenities
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`text-sm font-medium transition-colors hover:opacity-70 ${
                isScrolled ? 'text-text-primary' : 'text-off-white'
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                isScrolled
                  ? 'border border-gold text-gold hover:bg-gold hover:text-near-black'
                  : 'border border-gold text-off-white hover:bg-gold hover:text-near-black'
              }`}
            >
              Book
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? 'text-text-primary' : 'text-off-white'
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-off-white transition-transform duration-500 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <button
            onClick={() => scrollToSection('listings')}
            className="text-2xl font-heading font-semibold text-text-primary"
          >
            Listings
          </button>
          <button
            onClick={() => scrollToSection('amenities')}
            className="text-2xl font-heading font-semibold text-text-primary"
          >
            Amenities
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-2xl font-heading font-semibold text-text-primary"
          >
            Contact
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="mt-4 px-8 py-3 bg-gold text-near-black rounded-full text-lg font-medium"
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}