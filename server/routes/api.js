const express = require('express');
const storeController = require('../controllers/storeController');
const googleRequestCollers = require('../controllers/googleRequestController');
const router = express.Router();


router.get('/googleRequest', googleRequestCollers.getBusinesses, (req, res) => {
  res.status(200).json(res.locals);
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