const express = require('express');
const storeController = require('../controllers/storeController');
const router = express.Router();
const axios = require('axios');

router.get('/googleRequest', (req, res) => {
  const {lat, lng} = req.query;
  //console.log(lat, lng);
  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&keyword=resturant&key=${process.env.GOOGLE_API_KEY}`)
    .then(res => console.log(res.data.results))
    .catch(err => console.log(err));
  
})



router.get('/',
 storeController.getStores, 
  (req, res) => {
    //console.log( 'store' ,res.locals.stores);
    res.status(200).json(res.locals.stores);
  }
 
);

router.post('/',
 storeController.postUser, 
  (req, res) => {
    console.log(req);
    return res.status(200).json(res.user);
  }
 
);



module.exports = router;