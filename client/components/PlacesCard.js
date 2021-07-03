import React from 'react';

const PlacesCard = ({business}) => {
    return (
        <div>
            <h1>Business: {business.store_name}</h1>
            <p>Address: {business.exact_address}</p>
            <p>Rating: {business.rating}</p>
            <p>Price Level: {business.price_level}</p>
        </div>
    )
}

export default PlacesCard;