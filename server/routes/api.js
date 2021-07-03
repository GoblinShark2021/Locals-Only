const express = require('express');
const storeController = require('../controllers/storeController');
const googleRequestCollers = require('../controllers/googleRequestController');
const router = express.Router();


router.get('/googleRequest', googleRequestCollers.getBusinesses, (req, res) => {
  res.status(200).json(res.locals);
})

router.get('/getFavorites', storeController.getFavorites, (req,res) => {
  res.status(200).json(res.favorites);
})

router.post('/login',
  storeController.login, 
  (req, res) => {
    if(res.answer === 'yes'){
      return res.status(200).send('good');
    }
    return res.status(200).send('no good');
  }
);

router.post('/register',
  storeController.registerUser, 
  (req, res) => {
    return res.status(200).json(res.user);
  }
 
);

router.post('/favorites',
  storeController.favorites, 
  (req, res) => {
    return res.status(200).json(res.store);
  }
);

module.exports = router;