import React, { useRef } from 'react';
import bg from '../assets/images/Rectangle 1.png';
import { Link, useLoaderData } from 'react-router';

const Hero = () => {
    const scrollContainerRef = useRef(null);
    const cards = useLoaderData() || []; // ডাটা যদি কোনো কারণে আনডিফাইন্ড থাকে

    const handleScroll = (direction) => {
        if (scrollContainerRef.current) {
            const isMobile = window.innerWidth < 640;
            const cardWidth = isMobile ? 256 : 294; 
            
            if (direction === 'left') {
                scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            } else {
                scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="hero min-h-screen overflow-hidden py-10 lg:py-0" style={{ backgroundImage: `url(${bg})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            
            <div className="hero-content flex flex-col lg:flex-row items-center justify-between gap-10 w-full max-w-7xl px-4 text-neutral-content z-10">
                
                {/* Left Side: Text Content */}
                <div className="max-w-md text-center lg:text-left flex-1 shrink-0 mt-6 lg:mt-0">
                    <h1 className="mb-4 text-4xl sm:text-5xl font-bold leading-tight">Explore the World with Us</h1>
                    <p className="mb-6 text-sm sm:text-base text-gray-200">Discover breathtaking destinations, unique experiences, and unforgettable adventures. Your journey starts here.</p>
                    <button className="btn bg-amber-400 border-none text-black hover:bg-amber-500 px-6">Get Started</button>
                </div>

                {/* Right Side: Scrollable Cards Container */}
                <div className="w-full flex-1 overflow-hidden flex flex-col gap-6">
                    
                    {/* Horizontal Scrollable Wrapper */}
                    <div 
                        ref={scrollContainerRef}
                        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth snap-x snap-mandatory py-4 px-2"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <style>{` div::-webkit-scrollbar { display: none; } `}</style>

                        {cards.map((card) => (
                           <Link to={`/cardInfo/${card.id}`}>
                            <div 
                                key={card.id}
                                className="relative rounded-2xl h-[360px] w-[240px] sm:h-[416px] sm:w-[270px] shrink-0 overflow-hidden shadow-2xl group cursor-pointer snap-start transition-all duration-300 hover:scale-[1.02] bg-gray-800"
                            >
                                {/* রিয়েল ইমেজ ট্যাগ (যা CSS background-image থেকে অনেক বেশি নির্ভরযোগ্য) */}
                                <img 
                                    src={card.img} 
                                    alt={card.alt || card.title} 
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                        // যদি অনলাইন লিংক কাজ না করে, তবে এই ফলব্যাক ইমেজটি দেখাবে
                                        e.target.src = bg; 
                                    }}
                                />

                                {/* Stylish Hover Border Animation Overlay */}
                                <div className="absolute inset-0 border-t-0 border-x-0 border-b-0 border-amber-400 opacity-0 group-hover:opacity-100 group-hover:border-t-[1px] group-hover:border-x-[1px] group-hover:border-b-[4px] transition-all duration-300 rounded-2xl z-20 pointer-events-none"></div>

                                {/* Card Black Shade */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
                                
                                {/* Text Center & 8px bottom gap */}
                                <div className="absolute bottom-0 inset-x-0 p-4 text-center z-10">
                                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 transition-transform duration-300 group-hover:-translate-y-1">{card.title}</h3>
                                </div>
                            </div></Link>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-4 justify-center lg:justify-start pl-2 mb-6 lg:mb-0">
                        <button onClick={() => handleScroll('left')} className="btn btn-circle btn-sm sm:btn-md bg-white/20 hover:bg-white text-white hover:text-black border-none backdrop-blur-md transition-all active:scale-95 shadow-lg">❮</button>
                        <button onClick={() => handleScroll('right')} className="btn btn-circle btn-sm sm:btn-md bg-amber-400 text-black hover:bg-amber-500 border-none transition-all active:scale-95 shadow-lg">❯</button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Hero;