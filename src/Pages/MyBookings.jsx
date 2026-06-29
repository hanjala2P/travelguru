import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const MyBookings = () => {
    const navigate = useNavigate();
    const [myBooking, setMyBooking] = useState(null);

    useEffect(() => {
        
        const savedBooking = localStorage.getItem('latest_booking');
        if (savedBooking) {
            setMyBooking(JSON.parse(savedBooking));
        }
    }, []);

    const handleCancelBooking = () => {
        if(window.confirm("Are you sure you want to cancel this booking?")) {
            localStorage.removeItem('latest_booking'); 
            setMyBooking(null); 
            toast.error("Booking cancelled successfully.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                {/* Header section */}
                <div className="mb-8 border-b border-gray-200 pb-4">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Bookings</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and track your upcoming tours and reserved slots.</p>
                </div>

                {myBooking ? (
                  
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col md:flex-row gap-6 p-5 items-center">
                        {/* Image section */}
                        <img 
                            src={myBooking.img} 
                            alt={myBooking.title} 
                            className="w-full md:w-48 h-36 object-cover rounded-xl shadow-inner"
                        />

                        {/* Content section */}
                        <div className="flex-1 w-full space-y-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/50 uppercase">
                                        Confirmed Trip
                                    </span>
                                    <h2 className="text-2xl font-bold text-slate-800 mt-2">{myBooking.title}</h2>
                                </div>
                                <span className="text-lg font-black text-slate-900">৳ ৪,৫০০</span>
                            </div>

                            {/* Trip Info Tags */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                                <div>
                                    <p className="text-gray-400 font-medium uppercase">From</p>
                                    <p className="font-bold text-slate-700 mt-0.5">{myBooking.origin}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 font-medium uppercase">Destination</p>
                                    <p className="font-bold text-amber-600 mt-0.5">{myBooking.destination}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 font-medium uppercase">Journey Date</p>
                                    <p className="font-bold text-slate-700 mt-0.5">{myBooking.fromDate}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 font-medium uppercase">Return Date</p>
                                    <p className="font-bold text-slate-700 mt-0.5">{myBooking.toDate}</p>
                                </div>
                            </div>

                            {/* Action Area */}
                            <div className="flex justify-end pt-2">
                                <button 
                                    onClick={handleCancelBooking}
                                    className="btn btn-sm btn-error btn-outline rounded-lg font-bold normal-case hover:bg-red-600 border-red-200 text-red-500"
                                >
                                    Cancel Booking
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 p-6 shadow-sm">
                        <div className="text-5xl mb-4">🧳</div>
                        <h3 className="text-lg font-bold text-slate-800">No Upcoming Trips!</h3>
                        <p className="text-sm text-gray-400 max-w-xs mx-auto mt-1">You haven't booked any packages yet. Start exploring now.</p>
                        <button 
                            onClick={() => navigate('/')} 
                            className="btn bg-[#F9A51A] hover:bg-[#e09313] border-none text-slate-900 font-bold rounded-xl px-6 mt-5 text-sm"
                        >
                            Explore Destinations
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;