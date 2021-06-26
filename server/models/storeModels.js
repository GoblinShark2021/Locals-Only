const { Pool, Client } = require('pg');

const connectionString = process.env.CONNECTION_URL; //PG_URI

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString, // connectionString: PG_URI
  
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};