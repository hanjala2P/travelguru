import React, { useRef, useState, useEffect } from 'react';
import bg from '../assets/images/Rectangle 1.png';
import { Link, useLoaderData } from 'react-router';

const Hero = () => {
    const scrollContainerRef = useRef(null);
    const cards = useLoaderData() || [];
    const [searchQuery, setSearchQuery] = useState('');
    
  
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

  
    useEffect(() => {
        const handleSearch = (e) => setSearchQuery(e.detail);
        window.addEventListener('searchDestinations', handleSearch);
        return () => window.removeEventListener('searchDestinations', handleSearch);
    }, []);

   
    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                
                if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: 250, behavior: 'smooth' });
                }
            }
        }, 3000); 
        return () => clearInterval(interval);
    }, []);

    const filteredCards = cards.filter(card => 
        card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  
    const onMouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const onMouseLeaveOrUp = () => setIsDown(false);

    const onMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleScroll = (direction) => {
        if (scrollContainerRef.current) {
            const cardWidth = window.innerWidth < 640 ? 256 : 294;
            scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
        }
    };

    return (
        <section>
<div
  className="hero-content w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 max-w-7xl px-4 text-neutral-content z-10"
  style={{ backgroundImage: `url(${bg})` }}
>
  <div className="hero-overlay bg-opacity-60"></div>

  <div className="hero-content flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 w-full max-w-7xl px-4 sm:px-6 text-neutral-content z-10">

    {/* Left Content */}
    <div className="max-w-md text-center lg:text-left flex-1 shrink-0 mt-4 lg:mt-0">
      <h1 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
        Explore the World with Us
      </h1>

      <p className="mb-6 text-sm sm:text-base lg:text-lg text-gray-200 px-2 lg:px-0">
        Discover breathtaking destinations, unique experiences, and unforgettable adventures. Your journey starts here.
      </p>

      <Link to={`/destination/${cards[0]?.id || "1"}`}>
        <button className="btn bg-amber-400 border-none text-black hover:bg-amber-500 px-6">
          Get Started
        </button>
      </Link>
    </div>

    {/* Right Cards */}
    <div className="w-full flex-1 overflow-hidden flex flex-col gap-6">
      <div
        ref={scrollContainerRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeaveOrUp}
        onMouseUp={onMouseLeaveOrUp}
        onMouseMove={onMouseMove}
        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth snap-x snap-mandatory py-4 px-1 sm:px-2 cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <Link
              to={`/cardInfo/${card.id}`}
              key={card.id}
              className="snap-start shrink-0"
            >
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  bg-gray-800
                  shadow-2xl
                  group
                  transition-all
                  duration-300
                  hover:scale-[1.02]

                  w-[180px] h-[280px]
                  sm:w-[220px] sm:h-[340px]
                  md:w-[250px] md:h-[390px]
                  lg:w-[270px] lg:h-[416px]
                "
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = bg;
                  }}
                />

                <div className="absolute inset-0 border-t border-x border-b-4 border-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl z-20 pointer-events-none"></div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>

                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-center z-10">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white">
                    {card.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-white">No Match Found</p>
        )}
      </div>

      {filteredCards.length > 0 && (
        <div className="flex gap-4 justify-center lg:justify-start pl-2">
          <button
            onClick={() => handleScroll("left")}
            className="btn btn-circle bg-white/20 hover:bg-white text-white border-none shadow-lg"
          >
            ❮
          </button>

          <button
            onClick={() => handleScroll("right")}
            className="btn btn-circle bg-amber-400 text-black hover:bg-amber-500 border-none shadow-lg"
          >
            ❯
          </button>
        </div>
      )}
    </div>
  </div>
</div>
            
     
           <section className="py-8 px-4 max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-slate-800 mb-8">Popular Destinations</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
     
        {cards.slice(0, 4).map(card => (
            <div key={card.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all">
                <figure className="h-48"><img src={card.img} alt={card.title} /></figure>
                <div className="card-body">
                    <h3 className="font-bold">{card.title}</h3>
                    <p className="text-sm text-gray-500">{card.location}</p>
                </div>
            </div>
        ))}
    </div>
</section>
            <section className="bg-amber-50 py-8">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6">
            <span className="text-4xl mb-4 block">🛡️</span>
            <h4 className="font-bold text-lg">Safe & Secure</h4>
            <p className="text-sm text-gray-600">Your safety is our top priority.</p>
        </div>
        <div className="p-6">
            <span className="text-4xl mb-4 block">💰</span>
            <h4 className="font-bold text-lg">Best Prices</h4>
            <p className="text-sm text-gray-600">Unbeatable deals on all packages.</p>
        </div>
        <div className="p-6">
            <span className="text-4xl mb-4 block">📞</span>
            <h4 className="font-bold text-lg">24/7 Support</h4>
            <p className="text-sm text-gray-600">We are always here to help you.</p>
        </div>
    </div>
</section>
              {/* Newsletter */}
            <section className="py-8 bg-slate-800 text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
                    <div className="flex gap-2 justify-center">
                        <input type="email" placeholder="Enter your email" className="input text-black w-full max-w-xs" />
                        <button className="btn bg-amber-400 text-black border-none">Subscribe</button>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Hero;