import React from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        
        // ইউজার ইনপুট করা ডেটা অবজেক্ট আকারে নেওয়া
        const name = form.elements[0].value;
        const email = form.elements[1].value;
        const subject = form.elements[2].value;
        const message = form.elements[3].value;

        const contactData = { name, email, subject, message };
        console.log("Submitted Message Data:", contactData); 
        
    

        toast.success(`Thank you, ${name}! Your message has been sent.`);
        form.reset();
    };

    return (
        <div className="min-h-screen bg-base-200 pt-24 pb-12 px-4 sm:px-8 flex items-center">
            <div className="max-w-5xl mx-auto bg-base-100 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 w-full border border-gray-200/50">
                
                {/* Left Side: Contact Information */}
                <div className="md:col-span-5 bg-neutral text-neutral-content p-8 sm:p-12 flex flex-col justify-between gap-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-amber-400">Contact Information</h1>
                        <p className="text-sm text-gray-300">
                            Have questions or feedback? Drop us a message, and our travel experts will get back to you within 24 hours.
                        </p>
                    </div>

                    {/* Info Details */}
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/10 rounded-lg text-amber-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-medium">Call Us</p>
                                <p className="text-sm font-semibold">+880 1234 567890</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/10 rounded-lg text-amber-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-medium">Email Us</p>
                                <p className="text-sm font-semibold">support@travelguru.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/10 rounded-lg text-amber-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-medium">Our Headquarter</p>
                                <p className="text-sm font-semibold">Gulshan-2, Dhaka, Bangladesh</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-xs text-gray-400">
                        © 2026 Travel Guru Ltd. All rights reserved.
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="md:col-span-7 p-8 sm:p-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-base-content mb-6">Send us a Message</h2>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label text-xs font-semibold uppercase text-gray-500">Your Name</label>
                                <input required type="text" placeholder="John Doe" className="input input-bordered w-full bg-base-100 focus:outline-amber-400" />
                            </div>
                            <div className="form-control">
                                <label className="label text-xs font-semibold uppercase text-gray-500">Email Address</label>
                                <input required type="email" placeholder="john@example.com" className="input input-bordered w-full bg-base-100 focus:outline-amber-400" />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label text-xs font-semibold uppercase text-gray-500">Subject</label>
                            <input required type="text" placeholder="How can we help you?" className="input input-bordered w-full bg-base-100 focus:outline-amber-400" />
                        </div>

                        <div className="form-control">
                            <label className="label text-xs font-semibold uppercase text-gray-500">Message</label>
                            <textarea required rows="4" placeholder="Write your message here..." className="textarea textarea-bordered w-full bg-base-100 h-32 focus:outline-amber-400"></textarea>
                        </div>

                        <button className="btn bg-amber-400 text-white hover:bg-amber-500 border-none w-full mt-2 rounded-lg font-bold">
                            Send Message
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Contact;