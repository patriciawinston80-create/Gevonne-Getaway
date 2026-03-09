import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    quote:
      'The apartment was spotless, check‑in was seamless, and the neighborhood felt safe and lively.',
    author: 'Sarah',
    role: 'remote worker',
  },
  {
    id: 2,
    quote:
      'Fast Wi‑Fi, great coffee setup, and a comfortable bed. Felt like home.',
    author: 'James',
    role: 'consultant',
  },
  {
    id: 3,
    quote:
      'Quiet enough to rest, close enough to explore. Highly recommend.',
    author: 'Amina',
    role: 'solo traveler',
  },
];

export default function GuestNotes() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Cards animation with stagger
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: '8vh', opacity: 0, rotate: -1 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.15,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative z-50 bg-off-white py-20 lg:py-28"
    >
      <div className="px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column - Sticky Header */}
          <div
            ref={leftColRef}
            className="lg:w-1/3 lg:sticky lg:top-32 lg:self-start"
            style={{ opacity: 0 }}
          >
            <h2 className="font-heading font-bold text-text-primary text-[clamp(34px,4vw,56px)] tracking-tight">
              Guest notes
            </h2>
            <p className="mt-4 text-text-secondary text-base lg:text-lg">
              We host travelers from around the world—here's what they say.
            </p>
          </div>

          {/* Right Column - Cards */}
          <div className="lg:w-2/3 space-y-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`bg-white rounded-2xl p-6 lg:p-8 card-shadow ${
                  index === 1 ? 'lg:ml-8' : ''
                }`}
                style={{ opacity: 0 }}
              >
                <Quote className="w-8 h-8 text-gold/40 mb-4" />
                <p className="text-text-primary text-lg lg:text-xl leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="font-heading font-bold text-gold text-sm">
                      {testimonial.author[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-text-primary text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-text-secondary text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}