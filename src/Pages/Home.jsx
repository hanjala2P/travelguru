import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const Home = () => {
    const [allDestinations, setAllDestinations] = useState([]); 
    const [searchQuery, setSearchQuery] = useState(''); 

   
    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => setAllDestinations(data))
            .catch(err => console.error(err));
    }, []);

  
    const filteredDestinations = allDestinations.filter(spot => 
        spot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
           
            <div className="p-4 max-w-md mx-auto">
                <input 
                    type="text" 
                    placeholder="Search destination..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="input input-bordered w-full"
                />
            </div>

     
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {
                    filteredDestinations.length > 0 ? (
                        filteredDestinations.map(spot => (
                            <Link to={`/cardInfo/${spot.id}`} key={spot.id}>
                                <div className="card bg-base-100 shadow-xl">
                                    <figure><img src={spot.img} alt={spot.title} /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{spot.title}</h2>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center col-span-3 text-gray-500 font-semibold">
                            No destination found matching "{searchQuery}"
                        </p>
                    )
                }
            </div>
        </div>
    );
};

export default Home;