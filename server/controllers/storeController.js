const db = require('../models/storeModels');

const storeController = {};

storeController.getStores = (req, res, next) => {
  // write code here

  try{
    
    const SQLQueryString = 'SELECT tb1.*';

                     

    db.query(SQLQueryString)
      .then(data =>{
        // console.log(data);
        res.locals.stores = data.rows;
        // return data.rows;
        return next();
      });
    
    
  } 
  catch(err){
    return next({
      log: 'storeController.getStores: ERROR: Error getting characters data from characters.json file',
      message: { err: `Error occurred in storeController.getStores. err log: ${err}` },
    });
  }
  
};