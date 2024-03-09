
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

    currentUser: req.session.currentUser
    db.Reading.find({ user: req.session.currentUser._id }).then((readings) => {
        res.render("library/library-home.ejs", {
            readings: readings,
            currentUser: req.session.currentUser
        });
      });
});

//New
router.get('/new', (req, res) => {
    res.render("library/newreading.ejs", { currentUser: req.session.currentUser 
    });
});

//Create
router.post("/", async (req, res) => {
    req.body.favorite = req.body.favorite === 'on' ? true : false

    req.body.user = req.session.currentUser._id

    let newReading = await db.Reading.create(req.body)
    
    res.send(newReading)
})

//export so we can use this in other file
module.exports = router