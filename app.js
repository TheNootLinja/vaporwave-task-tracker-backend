// Storing the output of the modules we need into aptly named variables
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// storing the result of running the express function in the app variable
const app = express();

// telling app to use cors
app.use('*', cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// setting our view engine to ejs
app.set('view engine', 'ejs');
// setting where our views (pages) are found
app.set('views', './src/pages');

// telling the app to use urlencoded which is from bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/static', express.static(path.join(`${__dirname}/public`)));

const adminRoute = require('./routes/admin');
const { access } = require('fs');

// This would be the home page when navigating to '/'
// app.get('/', (req, res) => res.send('Home Route'));

app.use('/', adminRoute);

// Telling the app which port to run on
const port = process.env.PORT || 8080;

// using mongoose (ODM) to connect our database to the application
mongoose
  .connect(process.env.DB_HOST, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  // telling the app that once it starts running to listen on the given port
  // and output the message we gave it to the console.
  .then(() => {
    app.listen(port, () =>
      console.log(
        `Server and Database running on ${port}, http://localhost:${port}`
      )
    );
  })
  // catching and handling any errors that occur by showing them in console
  .catch((err) => {
    console.log(err);
  });
