import React, { use, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router'; 
import logo from '../assets/logo.png';
import { AuthContext } from '../Provider/AuthProvider'; 

const Navbar = () => {
    const { user, logout, loading } = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    
   
    const [searchText, setSearchText] = useState('');
    
    const isTransparentPage = location.pathname === '/' || location.pathname.startsWith('/cardInfo/');

    const handleLogout = () => {
        logout()
            .then(() => {
                console.log("Logged out successfully");
                navigate('/auth/login'); 
            })
            .catch(error => {
                console.error("Logout Error:", error.message);
            });
    };

   
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchText(value);

      
        const event = new CustomEvent('searchDestinations', { detail: value });
        window.dispatchEvent(event);
    };

    const navLinks = (
        <>
            <li><NavLink to="/news" className={isTransparentPage ? "lg:text-white" : ""}>News</NavLink></li>
            <li><NavLink to="/destination/:id" className={isTransparentPage ? "lg:text-white" : ""}>Destination</NavLink></li>
            <li><NavLink to="/blog" className={isTransparentPage ? "lg:text-white" : ""}>Blog</NavLink></li>
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
                    value={searchText}
                    onChange={handleSearchChange} 
                    className={`input input-bordered input-sm sm:input-md w-full rounded-lg transition-all
                        ${isTransparentPage 
                            ? 'bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/60 focus:bg-white/20 focus:outline-none' 
                            : 'bg-base-100 text-base-content'
                        }`} 
                />
            </div>

            <div className="hidden lg:flex items-center">
                <ul className="menu menu-horizontal px-1 gap-1 font-medium">
                    {navLinks}
                </ul>
            </div>

          
            <div className="min-w-max flex items-center justify-end">
                {
                    loading ? (
                        <span className="loading loading-spinner loading-sm text-amber-400"></span>
                    ) : user ? (
                    
                        <div className="dropdown dropdown-end z-[100]">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
                                <div className="w-10 rounded-full ring ring-amber-400 ring-offset-base-100 ring-offset-2">
                                    {
                                        user?.photoURL ? (
                                            <img src={user.photoURL} alt="Profile" />
                                        ) : (
                                            <div className="bg-amber-400 text-slate-900 font-bold flex items-center justify-center h-full text-lg uppercase">
                                                {user?.displayName ? user.displayName[0] : user?.email[0]}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl bg-white text-slate-800 rounded-2xl w-56 border border-gray-100 space-y-2">
                                <li className="px-3 py-2 border-b border-gray-100">
                                    <p className="font-bold text-slate-900 block truncate p-0">
                                        {user?.displayName || "Traveler"}
                                    </p>
                                    <span className="text-[10px] text-gray-400 block truncate p-0">
                                        {user?.email}
                                    </span>
                                </li>
                                
                                <li>
                                    <Link to="/mybookings" className="font-semibold active:bg-amber-400 active:text-slate-900 py-2">
                                        🧳 My Bookings
                                    </Link>
                                </li>
                                
                                <div className="border-t border-gray-100 my-1"></div>
                                
                                <li>
                                    <button 
                                        onClick={handleLogout}
                                        className="bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 transition-colors"
                                    >
                                        🚪 Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to='/auth/login' className="flex items-center">
                            <button className={`btn btn-sm sm:btn-md rounded-lg transition-all duration-300
                                ${isTransparentPage 
                                    ? 'bg-amber-400 border-none text-slate-900 hover:bg-amber-500 font-bold' 
                                    : 'btn-neutral'
                                }`}
                            >
                                Login
                            </button>
                        </Link>
                    )
                }
            </div> 
        </div>
    );
};

export default Navbar;