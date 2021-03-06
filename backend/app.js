const express = require('express');
const helmet = require('helmet');
const nocache = require("nocache");
const path = require('path');


// MySQL DB connection
const db = require('./models/index');
db.sequelize.sync()
  .then( () => { console.log('Correct sync with database.') })
  .catch(error => { console.error('Problem with sync: ', error) });

// Server app
const app = express();

//  CORS (Cross Origin Resource Sharing) middleware
app.use((req, res, next) => {
  // Acess from any sort of origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Add headers to the requests generated by the API
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // Methods allowed in the API
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})

// Middleware able to access the client request by JSON, urlencoded data and multipart
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security booster
app.use(helmet());

// Middleware to disable some cache from client by changing some HTTP headers
app.use(nocache());

// Middleware to handle static images
app.use('/img', express.static(path.join(__dirname, './img')));

// API routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use('/api', userRoutes);
app.use('/api', postRoutes);

module.exports = app;
