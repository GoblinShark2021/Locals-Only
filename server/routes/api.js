const express = require('express');
const storeController = require('../controllers/storeController');
const router = express.Router();

router.get('/',
 storeController.getStores, 
  (req, res) => {
    //console.log( 'store' ,res.locals.stores);
    res.status(200).json(res.locals.stores);
  }
 
);


//sign up route
router.post('/',
 storeController.postUser, 
  (req, res) => {
    console.log(req);
    return res.status(200).json(res.user);
  }
 
);



module.exports = router;