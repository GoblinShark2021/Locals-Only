const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const PORT = 3000;
const cors = require('cors')
app.use(express.json());
// Route Handlers
//Default Error Handler
app.use(cors());
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
if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}
// Catch-all to unknown routes (404)
app.use((req,res) => res.status(404).send('not found'))
//Start Server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
module.exports = app;