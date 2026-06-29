import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Blog = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                setAllBlogs(data);
                setFilteredBlogs(data);
            })
            .catch(err => console.error("Error loading blog data:", err));
    }, []);

    // Filter Logic
    const handleFilter = (category) => {
        if (category === 'All') setFilteredBlogs(allBlogs);
        else setFilteredBlogs(allBlogs.filter(item => item.category === category));
        setCurrentPage(1);
    };

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

    return (
        <div className="min-h-screen bg-base-100 pt-24 pb-12 px-4 sm:px-8">
            <div className="max-w-5xl mx-auto">
                
                {/* Header */}
                <div className="mb-12 border-b border-gray-200 pb-6 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-base-content mb-2">Wanderlust Stories</h1>
                    <p className="text-gray-500 text-sm sm:text-base">Read personal experiences, packing guides, and deep-dives from passionate travelers.</p>
                    
                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        {['All', 'Guides', 'Stories', 'Tips'].map(cat => (
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

                {/* Blog Post List */}
                <div className="flex flex-col gap-10">
                    {currentItems.map((post) => (
                        <article key={post.id} className="group grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                            <div className="md:col-span-5 h-56 sm:h-64 w-full overflow-hidden rounded-2xl shadow-md bg-base-200">
                                <img src={post.img} alt={post.alt} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                            </div>
                            <div className="md:col-span-7 flex flex-col gap-3">
                                <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">#{post.category || "Travel"}</span>
                                <h2 className="text-xl sm:text-2xl font-bold text-base-content group-hover:text-amber-500 transition-colors cursor-pointer">
                                    <Link to={`/cardInfo/${post.id}`}>{post.title}</Link>
                                </h2>
                                <p className="text-gray-500 text-sm sm:text-base line-clamp-3">{post.description}</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <div className="avatar"><div className="w-9 h-9 rounded-full"><img src={post.authorImg} alt={post.author} /></div></div>
                                    <div className="text-xs">
                                        <p className="font-semibold text-base-content">{post.author}</p>
                                        <p className="text-gray-400">{post.date} • {post.readTime || "5 min read"}</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col items-center gap-4 mt-12">
                    <span className="text-sm text-gray-500 font-medium">Page {currentPage} of {totalPages === 0 ? 1 : totalPages}</span>
                    <div className="flex items-center gap-2">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="btn btn-sm btn-outline px-6">Previous</button>
                        <button className="btn btn-sm bg-amber-400 text-white border-none cursor-default">{currentPage}</button>
                        <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => prev + 1)} className="btn btn-sm btn-outline px-6">Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Blog;