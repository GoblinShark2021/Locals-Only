import React, { useCallback, useState, useRef, useEffect } from 'react';
import  { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import axios from 'axios';
//import '@reach/combobox/styles.css';


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
    zoomControl: true,
}

const Map = () => {

    const [locationMarker, setLocationMarker] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [userCordinates, setUserCordinates] = useState({});

    useEffect(() => {
        axios.get('/googleRequest/', {
            params: {
                lat: userCordinates.lat,
                lng: userCordinates.lng
            }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }, [userCordinates]);

    // useEffect(() => {
    //     axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userCordinates.lat},${userCordinates.lng}&radius=10000&type=supermarket&key=AIzaSyAK8A7qjJL3kKkKaNC1HkTg4BDvDEKY_3A`)
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err));
    // },[userCordinates]);
    
    //reference to the map
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey:'AIzaSyAK8A7qjJL3kKkKaNC1HkTg4BDvDEKY_3A',
        libraries, 
    });
    
    //loadError ? 'There was an error loading the map' : 'Loading Map';
    if (loadError) return 'There was an error loading the map';
    if (!isLoaded) return 'Loading Map';
    console.log(userCordinates)
    return (
        <div>
            <Search panTo={panTo} setUserCordinates={setUserCordinates}/>
            <GoogleMap mapContainerStyle={mapContainerStyle} 
                zoom={12} 
                center={center}
                options={options}
                clickableIcons={false}
                // MapTypeId="a6203cae83730651"
                // enables user to click on location
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
                        // selects location so that a text bubble can be displayed
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

const Search = ({panTo, setUserCordinates}) => {
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOpotions: {
            location: {lat: () => 40.750999, lng: () => -73.605629 },
            radius: 10000
        }
    });

    return (
        <div>
            <Combobox 
            // get lat and lng of location search
            onSelect={async (address) => {
                setValue(address, false);
                clearSuggestions();
                try{
                    const geoCodes = await getGeocode({address});
                    const {lat, lng} = await getLatLng(geoCodes[0]);
                    panTo({ lat, lng });
                    setUserCordinates({lat:lat, lng:lng})
                    } catch (error){
                    console.log(error);
                    }
                }}
            >
                <ComboboxInput value={value} onChange={(e) => {
                    setValue(e.target.value);
                }}
                disabled={!ready}
                placeholder='Find Small Business'
                />
                <ComboboxPopover>
                    {status === 'OK' && data.map(({id, description}, i) => (
                        <ComboboxOption key={i} value={description} />
                    ))}
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}
export default Map;
