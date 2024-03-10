
const router = require("express").Router();
const bcrypt = require("bcrypt");
const db = require('../models');

// New User form
router.get('/new', (req, res) => {
    res.render('users/newUser.ejs', 
    {currentUser: req.session.currentUser});
});

// Post route to create user
router.post('/', async (req, res) => {
    // hash the password
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    
    let foundUser = await db.User.findOne({username: req.body.username});

    if(!foundUser === true){
        // create the user
        let newUser = await db.User.create(req.body); // req.body has form data to create new user
        res.redirect(`/userprofile/new/${req.body.username}/${newUser._id}`);
    }
    else{
        res.render('users/newUserExist.ejs');
    }

});

module.exports = router