import React from 'react';

const CardDetails = () => {
    const {id}= useParams();
    connsole.log(id);
    return (
        <div>
            <h2>Card Details</h2>
        </div>
    );
};

export default CardDetails;