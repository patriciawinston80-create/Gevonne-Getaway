import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dates: '',
    message: '',
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left column animation
      gsap.fromTo(
        leftColRef.current,
        { y: '5vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: '6vw', opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Contact items stagger
      const contactItems = leftColRef.current?.querySelectorAll('.contact-item');
      if (contactItems) {
        gsap.fromTo(
          contactItems,
          { x: '-2vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDialogMessage('Thank you for your inquiry! We will get back to you within a few hours to confirm availability.');
    setShowDialog(true);
    setFormData({ name: '', email: '', dates: '', message: '' });
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '250785468063';
    const message = encodeURIComponent('Hello! I am interested in booking a stay at Gevonne Getaway. Could you please provide more information?');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+250785468063';
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:hello@gevonnegetaway.com';
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-50 bg-near-black py-20 lg:py-28"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="/contact-dark-interior.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-near-black/50 to-near-black" />

      <div className="relative z-10 px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column */}
          <div ref={leftColRef} className="lg:w-1/2" style={{ opacity: 0 }}>
            <h2 className="font-heading font-bold text-off-white text-[clamp(34px,4vw,56px)] tracking-tight">
              Ready to stay?
            </h2>
            <p className="mt-4 text-off-white/70 text-base lg:text-lg max-w-md">
              Send a message and we'll confirm availability within a few hours.
            </p>

            {/* Contact Methods */}
            <div className="mt-10 space-y-4">
              <button
                onClick={handleEmailClick}
                className="contact-item flex items-center gap-4 text-off-white/80 hover:text-gold transition-colors group"
              >
                <div className="w-12 h-12 rounded-full border border-off-white/20 flex items-center justify-center group-hover:border-gold transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm lg:text-base">hello@gevonnegetaway.com</span>
              </button>

              <button
                onClick={handlePhoneClick}
                className="contact-item flex items-center gap-4 text-off-white/80 hover:text-gold transition-colors group"
              >
                <div className="w-12 h-12 rounded-full border border-off-white/20 flex items-center justify-center group-hover:border-gold transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-sm lg:text-base">+250 785 468 063</span>
              </button>

              <button
                onClick={handleWhatsAppClick}
                className="contact-item flex items-center gap-4 text-off-white/80 hover:text-gold transition-colors group"
              >
                <div className="w-12 h-12 rounded-full border border-off-white/20 flex items-center justify-center group-hover:border-gold transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-sm lg:text-base">WhatsApp</span>
              </button>

              <div className="contact-item flex items-center gap-4 text-off-white/80">
                <div className="w-12 h-12 rounded-full border border-off-white/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-sm lg:text-base">Kigali, Rwanda</span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            ref={formRef}
            className="lg:w-1/2"
            style={{ opacity: 0 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-off-white rounded-2xl p-6 lg:p-10 card-shadow"
            >
              <div className="space-y-5">
                <div>
                  <label className="block text-text-primary text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-text-primary/10 bg-white text-text-primary focus:outline-none focus:border-gold transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-text-primary text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-text-primary/10 bg-white text-text-primary focus:outline-none focus:border-gold transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-text-primary text-sm font-medium mb-2">
                    Preferred Dates
                  </label>
                  <input
                    type="text"
                    value={formData.dates}
                    onChange={(e) =>
                      setFormData({ ...formData, dates: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-text-primary/10 bg-white text-text-primary focus:outline-none focus:border-gold transition-colors"
                    placeholder="e.g., March 15-20, 2026"
                  />
                </div>

                <div>
                  <label className="block text-text-primary text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-text-primary/10 bg-white text-text-primary focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Tell us about your trip..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gold text-near-black rounded-full font-medium flex items-center justify-center gap-2 hover:bg-[#c49350] transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Request dates
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-off-white border-none">
          <DialogHeader>
            <DialogTitle className="font-heading text-text-primary text-xl">
              Message Sent!
            </DialogTitle>
            <DialogDescription className="text-text-secondary">
              {dialogMessage}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}