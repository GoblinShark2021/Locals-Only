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



router.post('/login',
  storeController.login, 
  (req, res) => {
    res.status(200).send('you got this');
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