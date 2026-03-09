import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Bed, Bath } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const listings = [
  {
    id: 1,
    title: 'Garden 1‑BR Apartment',
    guests: 2,
    bedrooms: 1,
    baths: 1,
    price: 58,
    image: '/listing-garden-apartment.jpg',
  },
  {
    id: 2,
    title: 'Penthouse Studio',
    guests: 2,
    bedrooms: 0,
    baths: 1,
    price: 72,
    image: '/listing-penthouse-studio.jpg',
  },
];

export default function ExploreListings() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: '10vh', opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );

        // Image parallax
        const img = card.querySelector('.card-image');
        if (img) {
          gsap.fromTo(
            img,
            { y: '-2vh' },
            {
              y: '2vh',
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });
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
      id="listings"
      className="relative z-50 bg-off-white py-20 lg:py-28"
    >
      <div className="px-6 lg:px-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
          style={{ opacity: 0 }}
        >
          <h2 className="font-heading font-bold text-text-primary text-[clamp(34px,4vw,56px)] tracking-tight">
            Explore listings
          </h2>
          <p className="text-text-secondary text-base lg:text-lg max-w-md">
            Choose a space that fits your trip—work, rest, or a little of both.
          </p>
        </div>

        {/* Listing Cards */}
        <div className="space-y-10">
          {listings.map((listing, index) => (
            <div
              key={listing.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="w-full bg-white rounded-2xl card-shadow overflow-hidden hover:shadow-card-hover transition-shadow duration-300"
              style={{ opacity: 0 }}
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image */}
                <div className="lg:w-[55%] h-[300px] lg:h-[400px] overflow-hidden relative">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="card-image w-full h-full object-cover scale-110"
                  />
                </div>

                {/* Content */}
                <div className="lg:w-[45%] p-6 lg:p-10 flex flex-col justify-center">
                  <h3 className="font-heading font-bold text-text-primary text-2xl lg:text-3xl tracking-tight">
                    {listing.title}
                  </h3>

                  {/* Meta */}
                  <div className="mt-4 flex flex-wrap gap-4 text-text-secondary text-sm">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{listing.guests} guests</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4" />
                      <span>
                        {listing.bedrooms === 0
                          ? 'Studio'
                          : `${listing.bedrooms} bedroom`}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-4 h-4" />
                      <span>{listing.baths} bath</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="mt-8 flex items-center justify-between">
                    <div>
                      <span className="font-heading font-bold text-text-primary text-2xl">
                        From ${listing.price}
                      </span>
                      <span className="text-text-secondary text-sm">
                        {' '}
                        / night
                      </span>
                    </div>
                    <button
                      onClick={scrollToContact}
                      className="px-6 py-3 bg-gold text-near-black rounded-full text-sm font-medium hover:bg-[#c49350] transition-colors"
                    >
                      Check availability
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}