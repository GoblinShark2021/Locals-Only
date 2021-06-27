import React, { useCallback, useState, useRef } from 'react';
import  { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
    width: '80vw',
    height: '80vh'
};

const center = {
    lat: 40.750999,
    lng: -73.605629
};

const options= {
    disableDefaultUI: true,
    zoomControl: true
}

const Map = () => {

    const [locationMarker, setLocationMarker] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    
    //reference to the map
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey:'AIzaSyAK8A7qjJL3kKkKaNC1HkTg4BDvDEKY_3A',
        libraries, 
    });
    
    //loadError ? 'There was an error loading the map' : 'Loading Map';
    if (loadError) return 'There was an error loading the map';
    if (!isLoaded) return 'Loading Map';

    return (
        <div>
            <GoogleMap mapContainerStyle={mapContainerStyle} 
                zoom={12} 
                center={center}
                options={options}
                onClick={(e) => {
                    setLocationMarker(current => [...current, 
                    {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                    },
                ])}}
                onLoad={onMapLoad}
                >
                {locationMarker.map((marker, i) => (
                    <Marker 
                        key={i} 
                        position={{lat: marker.lat, lng: marker.lng}}
                        icon= {{
                            url: '../client/assests/logo.png',
                            scaledSize: new window.google.maps.Size(30,30),
                            origin: new window.google.maps.Point(0,0),
                            anchor: new window.google.maps.Point(15,15)
                        }}
                        onClick= {() => { 
                            setSelectedLocation(marker);
                        }}
                        />
                ))}
                {selectedLocation ? (<InfoWindow 
                    position={{lat: selectedLocation.lat, lng: selectedLocation.lng}}
                    onCloseClick={() => {
                        setSelectedLocation(null);
                    }}
                >
                    <div>
                        <p>this is where all the business info goes</p>
                    </div>
                </InfoWindow>) : null}
            </GoogleMap>
        </div>
    )
}


export default Map;