import React, { useCallback, useState, useRef, useEffect } from 'react';
import  { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import axios from 'axios';
//import '@reach/combobox/styles.css';

//material-ui stuff
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      color: '#8766b9',
      marginTop: theme.spacing(2),
      marginBottom: 0,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
  

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

//menu
const classes = useStyles();
  const [business, setBusiness] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChangeBusiness = (event) => {
    setBusiness(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [distance, setDistance] = React.useState('');
  const [openDistance, setOpenDistance] = React.useState(false);
 
  const handleChangeDistance = (event) => {
    setDistance(event.target.value);
  };
  const handleCloseDistance = () => {
    setOpenDistance(false);
  };
  const handleOpenDistance = () => {
    setOpenDistance(true);
  };




//end menu


    const [locationMarker, setLocationMarker] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [userCordinates, setUserCordinates] = useState({});
    const [requestData, setRequestData] = useState([]);

    useEffect(() => {
        axios.get('/api/googleRequest', {
            params: {
                lat: userCordinates.lat,
                lng: userCordinates.lng,
                business: (business ? business : 'restaurant') ,
                distance: distance
            }
        })
        .then(res => {
            setRequestData(res.data);
            console.log(res.data[0].geometry.location.lat)
        })
        .catch(err => console.log(err));
    }, [userCordinates, business, distance]);
    
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
    console.log('select', business);
    return (
        <div>
            <Search panTo={panTo} setUserCordinates={setUserCordinates}/>

            <div>
              <Button className={classes.button} onClick={handleOpen}>
                Select Business
              </Button>
              <FormControl className={classes.formControl}>
                {/* <InputLabel id="demo-controlled-open-select-label">Business</InputLabel> */}
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={business}
                  onChange={handleChangeBusiness}
                >
                  <MenuItem value="">
                    <em>locals only.</em>
                  </MenuItem>
                  <MenuItem value={'restaurant'}>Restaurant</MenuItem>
                  <MenuItem value={'cafe'}>Cafe</MenuItem>
                  <MenuItem value={'bakery'}>Bakery</MenuItem>
                  <MenuItem value={'liquor_store'}>Liquor Store</MenuItem>
                  <MenuItem value={'beauty_salon'}>Salon</MenuItem>
                  <MenuItem value={'bicycle_store'}>Bike Store</MenuItem>
                  <MenuItem value={'book_store'}>Book Store</MenuItem>
                  <MenuItem value={'car_repair'}>Car Repair</MenuItem>
                  <MenuItem value={'plumber'}>Plumber</MenuItem>
                  <MenuItem value={'clothing_store'}>Clothing Store</MenuItem>
                  <MenuItem value={'convenience_store'}>Bodega</MenuItem>
                  <MenuItem value={'electrician'}>Electrician</MenuItem>
                  <MenuItem value={'florist'}>Florist</MenuItem>
                  <MenuItem value={'supermarket'}>Market</MenuItem>
                  <MenuItem value={'hardware_store'}>Hardware Store</MenuItem>
                  <MenuItem value={'home_goods_store'}>Home Goods</MenuItem>
                  <MenuItem value={'locksmith'}>Locksmith</MenuItem>
                  <MenuItem value={'bar'}>Bar</MenuItem>
                </Select>
              </FormControl>
            </div>
            
            <div>
              <Button className={classes.button} onClick={handleOpenDistance}>
                Select Distance
              </Button>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={openDistance}
                  onClose={handleCloseDistance}
                  onOpen={handleOpenDistance}
                  value={distance}
                  onChange={handleChangeDistance}
                >
                  <MenuItem value="">
                    <em>Distance</em>
                  </MenuItem>
                  <MenuItem value={'1609'}>1 Mile</MenuItem>
                  <MenuItem value={'3218'}>2 Miles</MenuItem>
                  <MenuItem value={'8046'}>5 Miles</MenuItem>
                  <MenuItem value={'16093'}>10 Miles</MenuItem>
                </Select>
              </FormControl>
            </div> 
         


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
                {requestData.map((location, i) => (
                    <Marker 
                        key={i} 
                        position={{lat: location.geometry.location.lat, lng: location.geometry.location.lng}}
                        icon= {{
                            url: '../client/assests/logo.png',
                            scaledSize: new window.google.maps.Size(30,30),
                            origin: new window.google.maps.Point(0,0),
                            anchor: new window.google.maps.Point(15,15)
                        }}
                        // selects location so that a text bubble can be displayed
                        onClick= {() => { 
                            setSelectedLocation(location);
                        }}
                        />
                ))}
                {selectedLocation ? (<InfoWindow 
                    position={{lat: selectedLocation.geometry.location.lat, lng: selectedLocation.geometry.location.lng}}
                    onCloseClick={() => {
                        setSelectedLocation(null);
                    }}
                >
                    <div>
                        <p>{selectedLocation.name}</p>
                        <p>{selectedLocation.vicinity}</p>
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
                placeholder='Enter Your City'
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
