import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const BookingDetails = () => {
    const navigate = useNavigate();
    const [bookingData, setBookingData] = useState(null);

    useEffect(() => {
        // লোকাল স্টোরেজ থেকে ডেটা রিড করা হচ্ছে
        const savedBooking = localStorage.getItem('latest_booking');
        if (savedBooking) {
            setBookingData(JSON.parse(savedBooking));
        }
    }, []);

    const handleConfirmPayment = () => {
        toast.success(`Congratulations! Your trip to ${bookingData?.title || 'Destination'} is confirmed.`);
        
    
        navigate('/mybookings'); 
    };

    if (!bookingData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4">
                <h2 className="text-xl font-bold text-error mb-2">No Booking Data Found!</h2>
                <p className="text-sm text-gray-500 mb-4">Please go back and fill the booking form again.</p>
                <button onClick={() => navigate('/')} className="btn bg-[#F9A51A] text-slate-900 border-none font-bold rounded-xl px-6">
                    Go Back Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 pt-24 pb-12 px-4 sm:px-8 flex items-center justify-center">
            <div className="max-w-3xl w-full bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 grid grid-cols-1 md:grid-cols-12">
                
                {/* Left Side: Destination Preview */}
                <div className="md:col-span-5 relative min-h-[200px] md:min-h-full bg-cover bg-center"
                     style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url(${bookingData.img})` }}>
                    <div className="absolute bottom-4 left-4 text-white p-2">
                        <span className="text-xs font-bold uppercase bg-amber-500 text-slate-900 px-2 py-0.5 rounded-md mb-1 inline-block">
                            {bookingData.location || "Bangladesh"}
                        </span>
                        <h2 className="text-2xl font-extrabold drop-shadow">{bookingData.title}</h2>
                    </div>
                </div>

                {/* Right Side: Booking Summary Invoice */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
                    <div>
                        <div className="border-b border-gray-100 pb-3 mb-4">
                            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Review Your Booking</h1>
                            <p className="text-xs text-gray-400 mt-1">Please verify your tour timeline details before confirmation.</p>
                        </div>

                        {/* Information Grid */}
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between border-b border-gray-50 pb-2">
                                <span className="text-gray-400 font-medium">Starting Point (Origin):</span>
                                <span className="font-bold text-slate-800">{bookingData.origin}</span>
                            </div>
                            
                            <div className="flex justify-between border-b border-gray-50 pb-2">
                                <span className="text-gray-400 font-medium">Destination:</span>
                                <span className="font-bold text-amber-600">{bookingData.destination}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <div>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Journey Date</p>
                                    <p className="font-semibold text-slate-800 mt-0.5">{bookingData.fromDate}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Return Date</p>
                                    <p className="font-semibold text-slate-800 mt-0.5">{bookingData.toDate}</p>
                                </div>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="mt-5 bg-amber-50 border border-amber-200/50 rounded-xl p-3 flex justify-between items-center">
                            <div>
                                <p className="text-xs text-amber-800 font-semibold">Estimated Cost</p>
                                <p className="text-xs text-gray-400">Includes guide & transport facility</p>
                            </div>
                            <span className="text-xl font-black text-slate-900">৳ ৪,৫০০</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button 
                            onClick={() => navigate(-1)} 
                            className="btn btn-outline border-gray-300 text-slate-600 hover:bg-slate-100 hover:text-slate-800 rounded-xl font-bold flex-1"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleConfirmPayment}
                            className="btn bg-[#F9A51A] hover:bg-[#e09313] border-none text-slate-900 rounded-xl font-bold flex-1 shadow-md"
                        >
                            Confirm Booking
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BookingDetails;