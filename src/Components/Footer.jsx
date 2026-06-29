import React from 'react';
import { Link } from 'react-router';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="relative bg-slate-900 text-slate-200 pt-16 pb-8 border-t border-white/10 overflow-hidden">
            {/* ব্যাকগ্রাউন্ড লাইট ইফেক্ট */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 relative z-10">
                
                {/* ১ নম্বর কলাম: লোগো এবং বিবরণ */}
                <div className="md:col-span-4 space-y-4">
                    <Link to='/' className="flex items-center">
                        <img 
                            src={logo} 
                            alt="Travel Guru" 
                            className="h-12 w-16 object-contain brightness-0 invert" 
                        />
                    </Link>
                    <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
                        Discover breathtaking destinations, unique experiences, and unforgettable adventures with Travel Guru. Your ultimate journey planner since 2026.
                    </p>
                </div>

                {/* ২ নম্বর কলাম: কুইক লিংকস */}
                <div className="md:col-span-3 space-y-3">
                    <h3 className="text-amber-400 font-bold uppercase tracking-wider text-sm">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link to="/news" className="hover:text-white transition-colors">Latest News</Link></li>
                        <li><Link to="/blog" className="hover:text-white transition-colors">Our Blog</Link></li>
                        <li><Link to="/mybookings" className="hover:text-white transition-colors">My Bookings</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                {/* ৩ নম্বর কলাম: সাপোর্ট */}
                <div className="md:col-span-2 space-y-3">
                    <h3 className="text-amber-400 font-bold uppercase tracking-wider text-sm">Support</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#help" className="hover:text-white transition-colors">Help Center</a></li>
                        <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                        <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* ৪ নম্বর কলাম: নিউজলেটার সাবস্ক্রিপশন */}
                <div className="md:col-span-3 space-y-3">
                    <h3 className="text-amber-400 font-bold uppercase tracking-wider text-sm">Newsletter</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">Subscribe to get special offers and updates.</p>
                    <div className="flex gap-2">
                        <input 
                            type="email" 
                            placeholder="Your Email" 
                            className="input input-sm input-bordered bg-white/5 border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-amber-400 w-full rounded-lg"
                        />
                        <button className="btn btn-sm bg-amber-400 hover:bg-amber-500 border-none text-slate-900 font-bold rounded-lg px-4">
                            Go
                        </button>
                    </div>
                </div>

            </div>

            {/* নিচের কপিরাইট অংশ */}
            <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} Travel Guru. All rights reserved.</p>
                <div className="flex gap-4">
                    <a href="#facebook" className="hover:text-amber-400 transition-colors">Facebook</a>
                    <a href="#twitter" className="hover:text-amber-400 transition-colors">Twitter</a>
                    <a href="#instagram" className="hover:text-amber-400 transition-colors">Instagram</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;