const express = require('express');
const storeController = require('../controllers/storeController');
const googleRequestCollers = require('../controllers/googleRequestController');
const router = express.Router();


router.get('/googleRequest', googleRequestCollers.getBusinesses, (req, res) => {
  res.status(200).json(res.locals);
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



module.exports = router;