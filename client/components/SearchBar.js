import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
//import '@reach/combobox/styles.css';


// const goToLocation = useCallback(({lat, lng}) => {
//     mapRef.current.goToLocation({lat,lng});
//     mapRef.current.setZoom(14);
// }, []);

const Search = ({goToLocation}) => {
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestion} = usePlacesAutocomplete({
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
                try{
                    const geoCodes = await getGeocode({address});
                    const {lat, lng} = await getLatLng(geoCodes[0]);
                    console.log({lat, lng});

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

const SearchBar = () => {
    return (
        <div>
            <Search />
        </div>
    )
}

export default SearchBar;