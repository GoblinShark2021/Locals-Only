import React from 'react';


const LocationMarker = ({lat, lng}) => {
    return (
        <div>
            <img
              src={'../client/assests/logo.png'}
              alt="logo"
              className= 'locationImage'
            />
        </div>
    )
}

export default LocationMarker;