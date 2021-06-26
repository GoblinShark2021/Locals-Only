import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';

const GoogleMap = ({center, zoom}) => {
    return (
        <div className='googleMap'>
            <GoogleMapReact
                bootstrapURLKeys={{key:'AIzaSyAK8A7qjJL3kKkKaNC1HkTg4BDvDEKY_3A'}}
                defaultCenter={ center }
                defaultZoom= { zoom }
            >
                <LocationMarker lat={center.lat} lng={center.lng}/>
            </GoogleMapReact>
        </div>
    )
}

GoogleMap.defaultProps = {
    center: {
        lat: 40.750999,
        lng: -73.605629
    },
    zoom: 13
}

export default GoogleMap;