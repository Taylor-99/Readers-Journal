
//Require modules
const express = require('express');
// Router allows us to handle routing outisde of server.js
const router = express.Router();

//Require the db connection, and models
const db = require('../models');
// bring in the isAuthenticated middleware
const isAuthentcated = require('../controllers/isAuthenticated');

router.use(isAuthentcated);

// I.N.D.U.C.E.S

//Index
router.get('/', (req, res)=> {
    res.send("this is the home page");
});

//New
router.get('/new', (req, res) => {
    res.send("New Reading");
});

//export so we can use this in other file
module.exports = router