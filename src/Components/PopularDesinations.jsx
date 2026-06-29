import React from 'react';

const PopularDesinations = () => {
    return (
        <div>
            <section className="py-16 px-4 max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-slate-800 mb-8">Popular Destinations</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
       
        {cards.slice(0, 4).map(card => (
            <div key={card.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all">
                <figure className="h-48"><img src={card.img} alt={card.title} /></figure>
                <div className="card-body">
                    <h3 className="font-bold">{card.title}</h3>
                    <p className="text-sm text-gray-500">{card.location}</p>
                </div>
            </div>
        ))}
    </div>
</section>
        </div>
    );
};

export default PopularDesinations;