import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PropertyCard() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        titleRef.current,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(
        metaRef.current,
        { y: '3vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // Thumbnails stagger
      const thumbnails = thumbnailsRef.current?.children;
      if (thumbnails) {
        scrollTl.fromTo(
          thumbnails,
          { x: '6vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.15
        );
      }

      scrollTl.fromTo(
        priceRef.current,
        { y: '3vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0, opacity: 1 },
        { scale: 1.06, y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '40vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        titleRef.current,
        { y: 0, opacity: 1 },
        { y: '-3vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      if (thumbnails) {
        scrollTl.fromTo(
          thumbnails,
          { x: 0, opacity: 1 },
          { x: '6vw', opacity: 0, stagger: 0.01, ease: 'power2.in' },
          0.74
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
      id="property-card"
      className="section-pinned z-30 flex items-center justify-center"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0 }}>
        <img
          src="/card-interior-sofa.jpg"
          alt="Interior with sofa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-near-black/20" />
      </div>

      {/* Floating Card */}
      <div
        ref={cardRef}
        className="absolute right-[8vw] top-[18vh] w-[80vw] md:w-[50vw] lg:w-[38vw] bg-off-white rounded-2xl card-shadow p-6 lg:p-8"
        style={{ opacity: 0 }}
      >
        <h3
          ref={titleRef}
          className="font-heading font-bold text-text-primary text-2xl lg:text-3xl tracking-tight"
          style={{ opacity: 0 }}
        >
          Sunlit 1‑BR Apartment
        </h3>
        <p
          ref={metaRef}
          className="mt-3 text-text-secondary text-sm"
          style={{ opacity: 0 }}
        >
          2 guests · 1 bedroom · 1 bath
        </p>

        {/* Thumbnail Strip */}
        <div ref={thumbnailsRef} className="mt-6 flex gap-3">
          <div className="flex-1">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src="/thumb-living.jpg"
                alt="Living room"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary mt-2 block">
              Living
            </span>
          </div>
          <div className="flex-1">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src="/thumb-bedroom.jpg"
                alt="Bedroom"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary mt-2 block">
              Bedroom
            </span>
          </div>
          <div className="flex-1">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src="/thumb-bathroom.jpg"
                alt="Bathroom"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary mt-2 block">
              Bath
            </span>
          </div>
        </div>

        {/* Price & CTA */}
        <div
          ref={priceRef}
          className="mt-8 flex items-center justify-between"
          style={{ opacity: 0 }}
        >
          <div>
            <span className="font-heading font-bold text-text-primary text-xl">
              From $58
            </span>
            <span className="text-text-secondary text-sm"> / night</span>
          </div>
          <button
            onClick={scrollToContact}
            className="px-6 py-3 bg-gold text-near-black rounded-full text-sm font-medium hover:bg-[#c49350] transition-colors"
          >
            Check availability
          </button>
        </div>
      </div>
    </section>
  );
}