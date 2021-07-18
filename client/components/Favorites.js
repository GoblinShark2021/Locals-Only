import React, {useState, useEffect} from "react";
import axios from 'axios';
import PlacesCard from './PlacesCard';


const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get('/api/getFavorites')
    .then(res => {
      console.log(res.data)
      setFavorites(res.data);
    })
    .catch(err => console.log(err))
  },[]);

  const onDelete = (place) => {
    axios.delete('/api/deleteFavorite',{
      data: {
        place_id: place
      }
    })
    .then(res => {
      const newFavorites = favorites.filter(business => business.place_id !== place);
      setFavorites(newFavorites);
    })
    .catch(err => console.log(err));
  }

  return (
    <div className='favorites'>
      {favorites.map(place => (
        <PlacesCard key={place.place_id} business={place} onDelete={onDelete}></PlacesCard>
      ))}
    </div>
  );
};

export default Favorites;
