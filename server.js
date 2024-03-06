
// Dependencies
require('dotenv').config()
const express = require('express');
const path = require('path')
//include the method-override package
const methodOverride = require('method-override');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const session = require('express-session')

// Require the db connection and models
// const db = require('./models');

//Controllers
const userCtrl = require('./controllers/userController.js');
const sessionCtrl = require('./controllers/sessionController');
const libraryCtrl = require('./controllers/libraryController');
const profileCtrl = require('./controllers/userProfileController');

// Create the Express app
const app = express();
const PORT = 3000;

// Define a function that will refresh the browser when nodemon restarts
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    // wait for nodemon to fully restart before refreshing the page
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

// Configure the app (app.set)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
  
// Mount middleware (app.use)
app.use(express.static('public'));
// to help with the form submission
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));
app.use(connectLiveReload());
// Session middleware: This will allow us to store data on the server between requests
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

app.get('/', function (req, res) {
    res.redirect('/library')
  });

//use controllers
app.use('/library', libraryCtrl)
app.use('/users', userCtrl);
app.use('/sessions', sessionCtrl);
app.use('/profile', profileCtrl);

// App Listen
app.listen(PORT, ()=> {
    console.log("Listening to port", PORT);
  });  