const  {Pool} = require('pg');
const dotenv = require('dotenv')
dotenv.config();



const connectionString = "postgres://ddlvuqvg:mEN_TjcyLZ3BXIc7W5Sk2Ce0A0OGGLxx@batyr.db.elephantsql.com/ddlvuqvg"
// const connectionString = process.env.CONNECTION_URL; //PG_URI

// create a new pool here using the connection string above
const pool = new Pool({
  // user: "postgres",
  // password: "Luca1113",
  // database: "locals_only",
  // host: "localhost",
  // port: 5432

  connectionString, // connectionString: PG_URI
  
});

module.exports = pool;
// module.exports = {
//   query: (text, params, callback) => {
//     console.log('executed query', text);
//     return pool.query(text, params, callback);
//   }
// };
