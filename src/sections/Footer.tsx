import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-50 bg-near-black border-t border-off-white/10 py-12">
      <div className="px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Logo & Tagline */}
          <div>
            <button
              onClick={() => scrollToSection('hero')}
              className="font-heading font-bold text-off-white text-lg tracking-tight"
            >
              Gevonne Getaway
            </button>
            <p className="mt-2 text-off-white/50 text-sm">
              Your home in Kigali.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-6 lg:gap-8">
            <button
              onClick={() => scrollToSection('listings')}
              className="text-off-white/70 text-sm hover:text-gold transition-colors"
            >
              Listings
            </button>
            <button
              onClick={() => scrollToSection('amenities')}
              className="text-off-white/70 text-sm hover:text-gold transition-colors"
            >
              Amenities
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-off-white/70 text-sm hover:text-gold transition-colors"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-off-white/70 text-sm hover:text-gold transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Social */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-off-white/20 flex items-center justify-center text-off-white/70 hover:text-gold hover:border-gold transition-colors"
              onClick={(e) => {
                e.preventDefault();
                alert('Coming soon!');
              }}
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-off-white/20 flex items-center justify-center text-off-white/70 hover:text-gold hover:border-gold transition-colors"
              onClick={(e) => {
                e.preventDefault();
                alert('Coming soon!');
              }}
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-off-white/20 flex items-center justify-center text-off-white/70 hover:text-gold hover:border-gold transition-colors"
              onClick={(e) => {
                e.preventDefault();
                alert('Coming soon!');
              }}
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-off-white/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <p className="text-off-white/40 text-xs">
            {currentYear} Gevonne Getaway. All rights reserved.
          </p>
          <p className="text-off-white/40 text-xs">
            Yvonne & Gervais Retreat — Remera, Kigali, Rwanda
          </p>
        </div>
      </div>
    </footer>
  );
}