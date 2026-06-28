import React from 'react';
import { useLoaderData, useNavigate } from 'react-router';

const CardInfo = () => {
    const card = useLoaderData(); // আপনার loader থেকে আসা ডেটা
    const navigate = useNavigate();

    const handleBooking = (e) => {
        e.preventDefault();
        
        navigate('/booking-details', { state: { bookingData: card } });
    };

    return (
        <div 
            className="min-h-screen w-full bg-cover bg-center relative flex items-center justify-center px-4 sm:px-12 md:px-24 pt-24"
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${card?.img})` }}
        >
            {/* Main Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl items-center text-white z-10 my-10">
                
           
                <div className="space-y-4 max-w-xl">
                    <h1 className="text-4xl sm:text-6xl font-bold font-serif leading-tight">
                        {card?.title || "Destination"}
                    </h1>
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                        {card?.alt || "Explore the beautiful places of Bangladesh with Travel Guru. Enjoy your hybrid or luxury tour with our expert guides."}
                    </p>
                    <div className="flex items-center gap-2 text-yellow-400 font-semibold text-lg">
                        <span>⭐</span>
                        <span>{card?.rating || "4.5"}</span>
                    </div>
                </div>

              
                <div className="bg-white text-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md lg:justify-self-end">
                    <form onSubmit={handleBooking} className="space-y-4">
                        
                        {/* Origin input */}
                        <div className="form-control">
                            <label className="label font-medium text-slate-500 text-sm">Origin</label>
                            <input 
                                type="text" 
                                placeholder="Dhaka" 
                                required
                                className="input input-bordered bg-slate-50 border-slate-200 focus:outline-none focus:border-warning w-full font-semibold"
                            />
                        </div>

                        {/* Destination input */}
                        <div className="form-control">
                            <label className="label font-medium text-slate-500 text-sm">Destination</label>
                            <input 
                                type="text" 
                                defaultValue={card?.title} 
                                readOnly
                                className="input input-bordered bg-slate-100 border-slate-200 focus:outline-none w-full font-semibold cursor-not-allowed"
                            />
                        </div>

                        {/* From & To Dates */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label font-medium text-slate-500 text-sm">From</label>
                                <input 
                                    type="date" 
                                    required
                                    className="input input-bordered bg-slate-50 border-slate-200 focus:outline-none focus:border-warning w-full font-medium text-sm"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label font-medium text-slate-500 text-sm">To</label>
                                <input 
                                    type="date" 
                                    required
                                    className="input input-bordered bg-slate-50 border-slate-200 focus:outline-none focus:border-warning w-full font-medium text-sm"
                                />
                            </div>
                        </div>

                        {/* Booking Submit Button */}
                        <button 
                            type="submit" 
                            className="btn btn-warning w-full mt-4 text-base font-bold bg-[#F9A51A] border-none text-slate-900 hover:bg-[#e09313]"
                        >
                            Start Booking
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default CardInfo;