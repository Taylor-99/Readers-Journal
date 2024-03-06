

const router = require("express").Router();
const db = require('../models');

function interestList(listString){

    let splitList = listString.split(",");

    return splitList;
}

// New profile form
router.get('/new/:username', (req, res) => {
    console.log("new profile");
    res.render('createprofile.ejs');
});

// Post route to create profile
router.post('/', async (req, res) => {

    req.body.interest = interestList(req.body.interest);

    let newProfile = await db.UserProfile.create(req.body);

    console.log(newProfile);

    res.redirect('/');
});

module.exports = router