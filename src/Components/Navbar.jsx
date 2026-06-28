import React from 'react';
import { Link, NavLink, useLocation } from 'react-router'; // বা react-router-dom
import logo from '../assets/logo.png';

const Navbar = () => {
    const location = useLocation();
    
    // 🛠️ এখানে পরিবর্তন করা হয়েছে: Home অথবা cardInfo পেজ দুটোর জন্যই transparent হবে
    const isTransparentPage = location.pathname === '/' || location.pathname.startsWith('/cardInfo/');

    const navLinks = (
        <>
            <li><NavLink to="/" className={isTransparentPage ? "lg:text-white" : ""}>News</NavLink></li>
            <li><NavLink to="/about" className={isTransparentPage ? "lg:text-white" : ""}>Destination</NavLink></li>
            <li><NavLink to="/about" className={isTransparentPage ? "lg:text-white" : ""}>Blog</NavLink></li>
            <li><NavLink to="/contact" className={isTransparentPage ? "lg:text-white" : ""}>Contact</NavLink></li>
        </>
    );

    return (
       
        <div className={`navbar flex items-center justify-between gap-2 px-4 py-3 transition-all duration-300 z-50 
            ${isTransparentPage 
                ? 'absolute top-0 left-0 w-full bg-black/20 backdrop-blur-md text-white shadow-none' 
                : 'bg-base-100 shadow-sm text-base-content'
            }`}
        >
            
            <div className="flex items-center gap-1 min-w-max">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-sm sm:btn-md lg:hidden px-2">
                      
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={isTransparentPage ? "white" : "currentColor"}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                   
                    <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-white text-slate-800 rounded-box z-[99] mt-3 w-52 p-2 shadow-2xl font-semibold">
                        {navLinks}
                    </ul>
                </div>

                {/* Logo */}
                <Link to='/' className="flex items-center">
                    <img 
                        src={logo} 
                        alt="Logo" 
                        className={`h-10 w-12 sm:h-12 sm:w-16 object-contain transition-all duration-300
                            ${isTransparentPage ? 'brightness-0 invert' : ''}`} 
                    />
                </Link>
            </div>

            {/* Middle Side: Search Bar */}
            <div className="flex-1 max-w-xs sm:max-w-md mx-2">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className={`input input-bordered input-sm sm:input-md w-full rounded-lg transition-all
                        ${isTransparentPage 
                            ? 'bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/60 focus:bg-white/20 focus:outline-none' 
                            : 'bg-base-100 text-base-content'
                        }`} 
                />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center">
                <ul className="menu menu-horizontal px-1 gap-1 font-medium">
                    {navLinks}
                </ul>
            </div>

            {/* Right Side Button */}
            <div className="min-w-max">
                <Link to='/' className="flex items-center">
                    <img 
                        src={logo} 
                        alt="Logo" 
                        className={`h-10 w-12 sm:h-12 sm:w-16 object-contain transition-all duration-300
                            ${isTransparentPage ? 'brightness-0 invert' : 'brightness-0'}`} 
                    />
                </Link>
            </div>

        </div>
    );
};

export default Navbar;