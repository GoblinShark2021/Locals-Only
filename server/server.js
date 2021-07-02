const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const apiRouter = require('./routes/api');
const PORT = 3000;
const session = require('express-session');
const flash = require('express-flash');


// const cors = require('cors')
app.use(express.json());

//session -- parses cookies, max time of 3 mins, no initial cookie
// app.use(session({
//   secret: 'super secret',
//   cookie: {maxAge: 180000},
//   saveUninitialized: false,
//   resave: false
// }));
// Route Handlers
app.use('/api', apiRouter);
//test route for login



//Default Error Handler
// app.use(cors());
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// switching between production and development mode

  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '../index.html'));
  });

// Catch-all to unknown routes (404)
app.use((req,res) => res.status(404).send('not found'))
//Start Server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;