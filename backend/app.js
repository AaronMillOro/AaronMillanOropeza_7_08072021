const express = require('express');
const helmet = require('helmet');
const nocache = require("nocache");
const dotenv = require('dotenv').config();
const path = require('path');

// TODO import routes

// MySQL DB connection

const app = express();

//  TODO CORS middleware: Cross Origin Resource Sharing 


// Middleware able to access the client request by req.body
app.use(express.json());

// Security booster
app.use(helmet());

// Middleware to disable some cache from client by changing some HTTP headers
app.use(nocache());

// TODO Middleware to handle static images

// TODO API routes

module.exports = app;