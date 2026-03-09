import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2 }
      )
        .fromTo(
          headlineRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.6'
        )
        .fromTo(
          subheadRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          hintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          '-=0.2'
        );

      // Subtle CTA pulse
      gsap.to(ctaRef.current, {
        scale: 1.02,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset elements when scrolling back to top
            gsap.set([headlineRef.current, subheadRef.current, ctaRef.current], {
              opacity: 1,
              y: 0,
            });
            gsap.set(bgRef.current, { scale: 1, y: 0 });
          },
        },
      });

      // ENTRANCE (0%-30%): Hold - elements already visible from load animation
      // SETTLE (30%-70%): Hold
      // EXIT (70%-100%): Animate out
      scrollTl.fromTo(
        [headlineRef.current, subheadRef.current, ctaRef.current],
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.08, y: '-6vh' },
        0.7
      );

      scrollTl.fromTo(
        hintRef.current,
        { opacity: 1 },
        { opacity: 0 },
        0.6
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToListings = () => {
    const element = document.getElementById('manifesto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned z-10 flex items-center justify-center"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero-living-room.jpg"
          alt="Modern living room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-near-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1
          ref={headlineRef}
          className="font-heading font-bold text-off-white text-[clamp(64px,12vw,140px)] leading-none tracking-tight"
          style={{ opacity: 0 }}
        >
          Hello.
        </h1>
        <p
          ref={subheadRef}
          className="mt-6 text-off-white/90 text-lg md:text-xl max-w-md mx-auto font-light"
          style={{ opacity: 0 }}
        >
          A quiet, modern stay in the heart of Kigali.
        </p>
        <button
          ref={ctaRef}
          onClick={scrollToListings}
          className="mt-10 btn-gold text-sm font-medium tracking-wide"
          style={{ opacity: 0 }}
        >
          View listings
        </button>
      </div>

      {/* Scroll Hint */}
      <div
        ref={hintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span className="font-mono text-xs text-off-white/70 uppercase tracking-widest">
          Scroll to explore
        </span>
        <ChevronDown className="w-5 h-5 text-off-white/70 animate-bounce" />
      </div>
    </section>
  );
}