import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomeManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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
        imageRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        textPanelRef.current,
        { x: '60vw' },
        { x: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // SETTLE (30%-70%): Hold positions

      // EXIT (70%-100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        textPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [bodyRef.current, ctaRef.current],
        { y: 0, opacity: 1 },
        { y: '6vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        lineRef.current,
        { scaleY: 1 },
        { scaleY: 0, ease: 'power2.in' },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToListings = () => {
    const element = document.getElementById('property-card');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="section-pinned z-20 flex"
    >
      {/* Left Image Panel */}
      <div
        ref={imageRef}
        className="w-1/2 h-full relative"
        style={{ opacity: 0 }}
      >
        <img
          src="/manifesto-bedroom.jpg"
          alt="Cozy bedroom"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Vertical Hairline */}
      <div
        ref={lineRef}
        className="absolute left-1/2 top-[10vh] w-px h-[80vh] hairline origin-top"
        style={{ transform: 'scaleY(0)' }}
      />

      {/* Right Text Panel */}
      <div
        ref={textPanelRef}
        className="w-1/2 h-full bg-off-white flex items-center"
      >
        <div className="px-8 lg:px-16 xl:px-24 max-w-xl">
          <h2
            ref={headlineRef}
            className="font-heading font-bold text-text-primary text-[clamp(34px,4.2vw,64px)] leading-tight tracking-tight"
            style={{ opacity: 0 }}
          >
            Your home
            <br />
            in Kigali.
          </h2>
          <p
            ref={bodyRef}
            className="mt-8 text-text-secondary text-base lg:text-lg leading-relaxed"
            style={{ opacity: 0 }}
          >
            Clean spaces, local details, and the things you actually need—fast
            Wi‑Fi, fresh linen, and a great bed.
          </p>
          <button
            ref={ctaRef}
            onClick={scrollToListings}
            className="mt-10 text-gold font-medium text-sm tracking-wide border-b border-gold pb-1 hover:text-text-primary hover:border-text-primary transition-colors"
            style={{ opacity: 0 }}
          >
            See the space
          </button>
        </div>
      </div>
    </section>
  );
}