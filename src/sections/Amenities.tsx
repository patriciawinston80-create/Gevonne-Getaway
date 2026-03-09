import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wifi, Droplets, UtensilsCrossed, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Amenities() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

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
        },
      });

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(
        bgRef.current,
        { x: '-12vw', scale: 1.08, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        labelRef.current,
        { y: '-4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: '-10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(
        bodyRef.current,
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.12
      );

      scrollTl.fromTo(
        ctaRef.current,
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.14
      );

      // Icons stagger
      const icons = iconsRef.current?.children;
      if (icons) {
        scrollTl.fromTo(
          icons,
          { y: '3vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.16
        );
      }

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl.fromTo(
        bgRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        labelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-6vw', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        [bodyRef.current, ctaRef.current],
        { x: 0, opacity: 1 },
        { x: '6vw', opacity: 0, ease: 'power2.in' },
        0.76
      );

      if (icons) {
        scrollTl.fromTo(
          icons,
          { opacity: 1 },
          { opacity: 0, stagger: 0.01, ease: 'power2.in' },
          0.78
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="amenities"
      className="section-pinned z-40 flex items-end pb-[10vh]"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0 }}>
        <img
          src="/amenities-kitchen.jpg"
          alt="Modern kitchen"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-near-black/80 via-near-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-10">
        {/* Label */}
        <span
          ref={labelRef}
          className="font-mono text-xs uppercase tracking-[0.2em] text-off-white/70 block mb-6"
          style={{ opacity: 0 }}
        >
          Amenities
        </span>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          {/* Headline */}
          <h2
            ref={headlineRef}
            className="font-heading font-bold text-off-white text-[clamp(28px,4vw,56px)] leading-tight tracking-tight max-w-lg"
            style={{ opacity: 0 }}
          >
            Everything you need
            <br />
            for a comfortable stay.
          </h2>

          {/* Right side: Body + CTA + Icons */}
          <div className="lg:max-w-md">
            <p
              ref={bodyRef}
              className="text-off-white/80 text-base lg:text-lg leading-relaxed"
              style={{ opacity: 0 }}
            >
              Reliable Wi‑Fi, hot water, a stocked kitchen, and a workspace that
              actually works.
            </p>

            {/* Icon Row */}
            <div ref={iconsRef} className="mt-6 flex gap-6">
              <div className="flex items-center gap-2 text-off-white/70">
                <Wifi className="w-5 h-5" />
                <span className="text-sm">Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2 text-off-white/70">
                <Droplets className="w-5 h-5" />
                <span className="text-sm">Hot Water</span>
              </div>
              <div className="flex items-center gap-2 text-off-white/70">
                <UtensilsCrossed className="w-5 h-5" />
                <span className="text-sm">Kitchen</span>
              </div>
              <div className="flex items-center gap-2 text-off-white/70">
                <Briefcase className="w-5 h-5" />
                <span className="text-sm">Workspace</span>
              </div>
            </div>

            <button
              ref={ctaRef}
              onClick={scrollToContact}
              className="mt-8 text-gold font-medium text-sm tracking-wide border-b border-gold pb-1 hover:text-off-white hover:border-off-white transition-colors"
              style={{ opacity: 0 }}
            >
              View all amenities
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}