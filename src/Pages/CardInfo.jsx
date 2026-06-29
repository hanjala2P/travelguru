import React from 'react';
import { useLoaderData, useNavigate } from 'react-router';

const CardInfo = () => {
    const card = useLoaderData(); // loader থেকে আসা নির্দিষ্ট স্পটের ডেটা
    const navigate = useNavigate();

    const handleBooking = (e) => {
        e.preventDefault();
        const form = e.target;
        
        // ফর্ম থেকে ইউজারের ইনপুট ভ্যালুগুলো নেওয়া হচ্ছে
        const origin = form.origin.value;
        const destination = card?.title;
        const fromDate = form.fromDate.value;
        const toDate = form.toDate.value;

        const completeBookingData = {
            id: card?.id,
            title: card?.title,
            img: card?.img,
            location: card?.location,
            origin,
            destination,
            fromDate,
            toDate
        };

       
        localStorage.setItem('latest_booking', JSON.stringify(completeBookingData));

       
        navigate('/bookingDetails'); 
    };

    return (
        <div 
            className="min-h-screen w-full bg-cover bg-center relative flex items-center justify-center px-4 sm:px-12 md:px-24 pt-24 pb-12"
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.75)), url(${card?.img})` }}
        >
            {/* Main Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl items-center text-white z-10 my-6">
                
                {/* Left Side: Destination Info */}
                <div className="space-y-5 max-w-xl animate-fadeIn">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                        {card?.location || "Bangladesh"}
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-extrabold font-serif leading-tight text-white drop-shadow-md">
                        {card?.title || "Destination"}
                    </h1>
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-light">
                        {card?.description || "Explore the beautiful places of Bangladesh with Travel Guru. Enjoy your hybrid or luxury tour with our expert guides."}
                    </p>
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md w-fit px-4 py-2 rounded-xl border border-white/10">
                        <span className="text-amber-400 text-xl">⭐</span>
                        <span className="font-bold text-lg">{card?.rating || "4.5"}</span>
                        <span className="text-xs text-gray-300">({card?.reviews || "500+"} reviews)</span>
                    </div>
                </div>

                {/* Right Side: Booking Card Form */}
                <div className="bg-white text-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md lg:justify-self-end border border-gray-100">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-slate-900">Book Your Slot</h2>
                        <p className="text-xs text-slate-400 mt-1">Fill up the form to lock your reservation setup.</p>
                    </div>

                    <form onSubmit={handleBooking} className="space-y-4">
                        
                        {/* Origin input */}
                        <div className="form-control">
                            <label className="label font-semibold text-slate-600 text-xs uppercase tracking-wider">Origin / From</label>
                            <input 
                                type="text" 
                                name="origin"
                                placeholder="e.g., Dhaka" 
                                required
                                className="input input-bordered bg-slate-50 border-slate-200 focus:outline-none focus:border-amber-400 focus:bg-white w-full font-semibold transition-all"
                            />
                        </div>

                        {/* Destination input */}
                        <div className="form-control">
                            <label className="label font-semibold text-slate-600 text-xs uppercase tracking-wider">Destination</label>
                            <input 
                                type="text" 
                                defaultValue={card?.title} 
                                readOnly
                                className="input input-bordered bg-slate-100 border-slate-200 text-slate-500 focus:outline-none w-full font-bold cursor-not-allowed"
                            />
                        </div>

                        {/* From & To Dates */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label font-semibold text-slate-600 text-xs uppercase tracking-wider">From</label>
                                <input 
                                    type="date" 
                                    name="fromDate"
                                    required
                                    className="input input-bordered bg-slate-50 border-slate-200 focus:outline-none focus:border-amber-400 focus:bg-white w-full font-medium text-sm transition-all"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label font-semibold text-slate-600 text-xs uppercase tracking-wider">To</label>
                                <input 
                                    type="date" 
                                    name="toDate"
                                    required
                                    className="input input-bordered bg-slate-50 border-slate-200 focus:outline-none focus:border-amber-400 focus:bg-white w-full font-medium text-sm transition-all"
                                />
                            </div>
                        </div>

                        {/* Booking Submit Button */}
                        <button 
                            type="submit" 
                            className="btn bg-amber-400 text-slate-900 hover:bg-amber-500 border-none w-full mt-4 text-base font-bold rounded-xl shadow-md shadow-amber-400/20 transition-all duration-300"
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