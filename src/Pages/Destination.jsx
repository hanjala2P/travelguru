import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Destination = () => {
    const [allDestinations, setAllDestinations] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                setAllDestinations(data);
                setFilteredData(data);
            })
            .catch(err => console.error("Error loading destinations:", err));
    }, []);

    const handleFilter = (category) => {
        if (category === 'All') setFilteredData(allDestinations);
        else setFilteredData(allDestinations.filter(item => item.category === category));
        setCurrentPage(1);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className="min-h-screen bg-base-200 pt-24 pb-12 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
                
                {/* Header & Filter */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-base-content mb-3">Explore Popular Destinations</h1>
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        {['All', 'Adventure', 'Beach', 'Mountain', 'Historical'].map(cat => (
                            <button key={cat} onClick={() => handleFilter(cat)} className="btn btn-sm btn-outline border-amber-500 text-amber-600 hover:bg-amber-500 hover:border-amber-500 hover:text-white rounded-full px-6">
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentItems.map((spot) => (
                        <div key={spot.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden border border-gray-200/50 group">
                            <figure className="h-56 relative overflow-hidden">
                                <img src={spot.img} alt={spot.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                                <div className="absolute bottom-3 right-3 bg-neutral/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-md">
                                    {spot.budget || "Standard"} Budget
                                </div>
                            </figure>
                            <div className="card-body p-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-semibold text-amber-500 uppercase">{spot.location}</span>
                                    <span className="text-sm font-bold flex items-center gap-1">⭐ {spot.rating}</span>
                                </div>
                                <h2 className="card-title text-xl font-bold group-hover:text-amber-500 transition-colors">{spot.title}</h2>
                                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{spot.description}</p>
                                <div className="card-actions mt-5">
                                    <Link to={`/cardInfo/${spot.id}`} className="btn btn-sm sm:btn-md bg-amber-400 text-white hover:bg-amber-500 border-none w-full font-bold rounded-xl">
                                        Explore Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Clean Pagination Controls */}
                <div className="flex flex-col items-center gap-4 mt-12">
                    <span className="text-sm text-gray-500 font-medium">
                        Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
                    </span>
                    <div className="flex items-center gap-2">
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="btn btn-sm btn-outline px-6"
                        >Previous</button>
                        
                        <button className="btn btn-sm bg-amber-400 text-white border-none cursor-default">
                            {currentPage}
                        </button>
                        
                        <button 
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="btn btn-sm btn-outline px-6"
                        >Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Destination;