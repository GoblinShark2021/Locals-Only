const db = require('../models/storeModels');
const bcrypt = require('bcrypt')

const storeController = {};


storeController.login = async (req, res, next) => {
  // write code here

  try{
    //destructuring the request body data
    const {email, password} = req.body.data;
    //query the database for the email, if email exists then go 
    await db.query(
      'SELECT * FROM users WHERE email = $1', [email], (err, results) => {
        if(err){
          throw err;
        } 
        if(results.rows.length > 0){
          const user = results.rows[0];
          bcrypt.compare(password, user.pass_word, (err, isMatch) => {
            if(err){
              throw err;
            }
            if(isMatch){
              console.log('everything is good');
              res.answer = 'yes';
              return next();
            } else {
              console.log('passwords do not match')
              next();
            }
          })
        }
      }

    )

  } 
  catch(err){
    return next({
      log: 'storeController.getStores: ERROR: Error logging in.',
      message: { err: `Error occurred in storeController.getStores. err log: ${err}` },
    });
  }
  
};

storeController.getFavorites = async (req, res, next) => {


  try {
    const favoriteStores = await db.query(
      'SELECT * from favorite_places'    
    );
    res.favorites = favoriteStores.rows;
    return next();
  }
  catch(err){
    return next({
      log: 'storeController.getFavorites: ERROR: Error getting favorite stores',
      message: { err: `Error occurred in storeController.getFavorites. err log: ${err}` },
    });

}
}

storeController.registerUser = async (req, res, next) => {
  
  try {
    const {firstName, lastName, email, password} = req.body.data;
    const hashedPassWord = await bcrypt.hash(password, 10)
    const newUser = await db.query(
      'INSERT INTO users (first_name, last_name, email, pass_word) VALUES ($1,$2,$3,$4) RETURNING *', [firstName, lastName, email, hashedPassWord]      
    );
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

storeController.favorites = async (req, res, next) => {

  const {id, name, address, price_level, rating} = req.body.data;
 
  try {

    const newStore = await db.query(
      'INSERT INTO favorite_places (place_id, store_name, exact_address, price_level, rating) VALUES ($1,$2,$3,$4,$5) RETURNING *', [id, name, address, price_level, rating]      
    );

    const storeCheck = await db.query(
      'SELECT * FROM favorite_places'
    );
    console.log(newStore);
    console.log(storeCheck);
    res.store = storeCheck;
    return next(); 
  }
  catch(err){
    return next({
      log: 'storeController.postStore: ERROR: Error adding favorite store',
      message: { err: `Error occurred in storeController.postUser. err log: ${err}` },
    });

}
}

module.exports = storeController;