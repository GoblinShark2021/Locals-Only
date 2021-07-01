const db = require('../models/storeModels');

const storeController = {};

storeController.getStores = (req, res, next) => {
  // write code here

  try{
    
    const SQLQueryString = 'SELECT * FROM users';

                     

    db.query(SQLQueryString)
      .then(data =>{
        console.log(data);
        res.locals.stores = data.rows;
        // return data.rows;
        return next();
      });
    
    
  } 
  catch(err){
    return next({
      log: 'storeController.getStores: ERROR: Error getting stores data from stores.json file',
      message: { err: `Error occurred in storeController.getStores. err log: ${err}` },
    });
  }
  
};

storeController.postUser = async (req, res, next) => {
  try {
    const {firstName, lastName, email, password} = req.body.data;
    const newUser = await db.query(
      "INSERT INTO users (first_name, last_name, email_address, pass_word) VALUES ($1,$2,$3,$4) RETURNING *", [firstName, lastName, email, password]      
    );
    res.user = newUser;
    return next(); 
  }
  catch(err){
    return next({
      log: 'storeController.postUser: ERROR: Error adding user',
      message: { err: `Error occurred in storeController.postUser. err log: ${err}` },
    });
  }
//  console.log(req.body.data)


}




module.exports = storeController;