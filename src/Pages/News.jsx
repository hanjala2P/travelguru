import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const News = () => {
    const [allNews, setAllNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                setAllNews(data);
                setFilteredNews(data);
            })
            .catch(err => console.error("Error loading data:", err));
    }, []);

    // Filter Logic
    const handleFilter = (category) => {
        if (category === 'All') setFilteredNews(allNews);
        else setFilteredNews(allNews.filter(item => item.category === category));
        setCurrentPage(1);
    };

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

    return (
        <div className="min-h-screen bg-base-200 pt-24 pb-12 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
                
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-base-content mb-3">Latest Travel News & Updates</h1>
                    
                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        {['All', 'Tips', 'Announcements', 'Stories'].map(cat => (
                            <button 
                                key={cat} 
                                onClick={() => handleFilter(cat)}
                                className="btn btn-sm btn-outline border-amber-500 text-amber-600 hover:bg-amber-500 hover:border-amber-500 hover:text-white rounded-full px-6"
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentItems.map((news) => (
                        <div key={news.id} className="card bg-base-100 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
                            <figure className="h-48 overflow-hidden relative">
                                <img src={news.img} alt={news.alt} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                                <span className="absolute top-3 left-3 bg-amber-400 text-white font-semibold text-xs px-3 py-1 rounded-full shadow">
                                    {news.category || "Travel"}
                                </span>
                            </figure>

                            <div className="card-body p-6 flex flex-col justify-between">
                                <div>
                                    <p className="text-xs text-gray-400 mb-2 font-medium">{news.date}</p>
                                    <h2 className="card-title text-lg font-bold text-base-content hover:text-amber-500 cursor-pointer line-clamp-2">
                                        {news.title}
                                    </h2>
                                    <p className="text-gray-500 text-sm mt-2 line-clamp-3">{news.description}</p>
                                </div>

                                <div className="card-actions justify-end mt-4">
                                    <Link to={`/cardInfo/${news.id}`} className="btn btn-sm btn-ghost text-amber-500 hover:bg-amber-50 font-semibold rounded-lg flex items-center gap-1">
                                        Read More <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
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

export default News;