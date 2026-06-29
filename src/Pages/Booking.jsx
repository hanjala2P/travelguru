import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Booking = () => {
    const [destinations, setDestinations] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState('');


    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => setDestinations(data))
            .catch(err => console.error("Error loading destinations:", err));
    }, []);

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        
        const origin = form.origin.value;
        const destination = form.destination.value;
        const fromDate = form.fromDate.value;
        const toDate = form.toDate.value;

        const bookingDetails = { origin, destination, fromDate, toDate };
        console.log("Booking Confirmed:", bookingDetails);

        toast.success(`Booking successful for ${destination}!`);
        form.reset();
    };

    return (
        <div className="min-h-screen bg-base-200 pt-24 pb-12 px-4 sm:px-8 flex items-center justify-center">
            <div className="max-w-4xl w-full bg-base-100 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-gray-200/50">
                
                {/* Left Side: Info / Promo */}
                <div className="md:col-span-5 bg-neutral text-neutral-content p-8 sm:p-10 flex flex-col justify-between gap-6 bg-cover bg-center relative group" 
                     style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600')` }}>
                    
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
                            Book Your Ticket
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-extrabold mt-4 mb-3 text-white leading-tight">
                            Start Your Journey Today
                        </h1>
                        <p className="text-sm text-gray-300">
                            Book your next dream destination seamlessly. Get instant confirmation, premium tour guides, and 24/7 support.
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="flex flex-col gap-4 my-4">
                        <div className="flex items-center gap-3 text-sm">
                            <span className="text-amber-400 text-lg">✔</span>
                            <p className="text-gray-200">Best Price Guaranteed</p>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="text-amber-400 text-lg">✔</span>
                            <p className="text-gray-200">Free Cancellation (24h before)</p>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="text-amber-400 text-lg">✔</span>
                            <p className="text-gray-200">Verified Local Tour Guides</p>
                        </div>
                    </div>

                    <div className="text-xs text-gray-400 border-t border-gray-700 pt-4">
                        *Prices may vary based on peak seasons and availability.
                    </div>
                </div>

                {/* Right Side: Booking Form */}
                <div className="md:col-span-7 p-8 sm:p-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-base-content mb-6">Enter Details to Book</h2>
                    
                    <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                        
                        {/* Origin (From) */}
                        <div className="form-control">
                            <label className="label text-xs font-semibold uppercase text-gray-500">Origin / From</label>
                            <input 
                                required 
                                type="text" 
                                name="origin"
                                placeholder="e.g., Dhaka, Bangladesh" 
                                className="input input-bordered w-full bg-base-100 focus:outline-amber-400" 
                            />
                        </div>

                        {/* Destination (To) - Dynamic Dropdown */}
                        <div className="form-control">
                            <label className="label text-xs font-semibold uppercase text-gray-500">Destination / To</label>
                            <select 
                                required
                                name="destination"
                                value={selectedDestination}
                                onChange={(e) => setSelectedDestination(e.target.value)}
                                className="select select-bordered w-full bg-base-100 focus:outline-amber-400 text-gray-600 font-medium"
                            >
                                <option value="" disabled>Select your destination</option>
                                {destinations.map(spot => (
                                    <option key={spot.id} value={spot.title}>
                                        {spot.title} ({spot.location})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date Pickers */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label text-xs font-semibold uppercase text-gray-500">Journey Date</label>
                                <input 
                                    required 
                                    type="date" 
                                    name="fromDate"
                                    className="input input-bordered w-full bg-base-100 focus:outline-amber-400" 
                                />
                            </div>
                            <div className="form-control">
                                <label className="label text-xs font-semibold uppercase text-gray-500">Return Date</label>
                                <input 
                                    required 
                                    type="date" 
                                    name="toDate"
                                    className="input input-bordered w-full bg-base-100 focus:outline-amber-400" 
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button className="btn bg-amber-400 text-white hover:bg-amber-500 border-none w-full mt-4 rounded-xl font-bold text-base shadow-md">
                            Start Booking Process
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Booking;