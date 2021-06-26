const { Pool, Client } = require('pg');

const connectionString = 'postgres://rkplvayy:ZaneKj3YArjgcu0e5UO7A2I9D5pzt0Qd@batyr.db.elephantsql.com/rkplvayy'; //PG_URI

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