import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import axios from "axios";
//import '@reach/combobox/styles.css';
import "./styles/styles.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import mapStyles from "./styles/mapStyle";
import Selection from "./Selection";
import { FullscreenExit } from "@material-ui/icons";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    backgroundColor: "#9dddc1",
    justifyContent: "center",
  },
  button: {
    background: "#8766b9",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(53, 56, 57)",
    color: "white",
    height: 22,
    padding: "0 35px",
  }
}));

const libraries = ["places"];
const mapContainerStyle = {
  width: "90vw",
  height: "80vh",
  margin: ".5rem",
  margin: "auto",
};

const center = {
  lat: 40.7831,
  lng: -73.9712,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: mapStyles,
};

const Map = () => {
  const classes = useStyles();
  const [locationMarker, setLocationMarker] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userCordinates, setUserCordinates] = useState({});
  const [requestData, setRequestData] = useState([]);
  const [business, setBusiness] = useState("");
  const [toggleBusiness, setToggleBusiness] = useState(false);
  const [distance, setDistance] = useState("");
  const [toggleDistance, setToggleDistance] = useState(false);

  useEffect(() => {
    axios
      .get("/api/googleRequest", {
        params: {
          lat: userCordinates.lat,
          lng: userCordinates.lng,
          business: business,
          distance: distance,
        },
      })
      .then((res) => {
        setRequestData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [userCordinates]);

  //reference to the map
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAK8A7qjJL3kKkKaNC1HkTg4BDvDEKY_3A",
    libraries,
  });

  const sendFavoriteBusiness = (location) => {
    console.log(location);
    axios
      .post("/api/favorites", {
        data: {
          name: location.name,
          address: location.vicinity,
          id: location.place_id,
          price_level: location.price_level,
          rating: location.rating,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  //loadError ? 'There was an error loading the map' : 'Loading Map';
  if (loadError) return "There was an error loading the map";
  if (!isLoaded) return "Loading Map";

  return (
    <div className={classes.root}>
      <Selection
        business={business}
        setBusiness={setBusiness}
        toggleBusiness={toggleBusiness}
        setToggleBusiness={setToggleBusiness}
        distance={distance}
        setDistance={setDistance}
        toggleDistance={toggleDistance}
        setToggleDistance={setToggleDistance}
      />
      <Search panTo={panTo} setUserCordinates={setUserCordinates} />
      <Container maxWidth="xl">
        <GoogleMap
          className={classes.root}
          mapContainerStyle={mapContainerStyle}
          zoom={11}
          center={center}
          options={options}
          clickableIcons={false}
          // enables user to click on location
          onClick={(e) => {
            setLocationMarker((current) => [
              ...current,
              {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              },
            ]);
          }}
          onLoad={onMapLoad}
        >
          {requestData.map((location, i) => (
            <Marker
              key={i}
              position={{
                lat: location.geometry.location.lat,
                lng: location.geometry.location.lng,
              }}
              icon={{
                url: "../client/assests/logo.png",
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
              // selects location so that a text bubble can be displayed
              onClick={() => {
                setSelectedLocation(location);
              }}
            />
          ))}
          {selectedLocation ? (
            <InfoWindow
              position={{
                lat: selectedLocation.geometry.location.lat,
                lng: selectedLocation.geometry.location.lng,
              }}
              onCloseClick={() => {
                setSelectedLocation(null);
              }}
            >
              <div>
                <p>{selectedLocation.name}</p>
                <p>{selectedLocation.vicinity}</p>
                <Button
                  className={classes.button}
                  onClick={() => sendFavoriteBusiness(selectedLocation)}
                >
                  Add To Favorites
                </Button>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </Container>
    </div>
  );
};

const Search = ({ panTo, setUserCordinates }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOpotions: {
      location: { lat: () => 40.750999, lng: () => -73.605629 },
      radius: 10000,
    },
  });

  return (
    <div className="searchBar">
      <Combobox
        // get lat and lng of location search
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const geoCodes = await getGeocode({ address });
            const { lat, lng } = await getLatLng(geoCodes[0]);
            panTo({ lat, lng });
            setUserCordinates({ lat: lat, lng: lng });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter Your City"
        />
        <ComboboxPopover>
          {status === "OK" &&
            data.map(({ id, description }, i) => (
              <ComboboxOption key={i} value={description} />
            ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};
export default Map;
