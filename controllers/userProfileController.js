

const router = require("express").Router();
const db = require('../models');
const profile = require("../models/profile");

function interestList(listString){

    let splitList = listString.split(",");

    return splitList;
}

// New profile form
router.get('/new/:addusername/:userid', (req, res) => {
    let addUsername = req.params.addusername;
    let newUserId = req.params.userid;
    res.render('createprofile.ejs', {addUsername, newUserId});
});

// Post route to create profile
router.post('/:addun/:uid', async (req, res) => {
    req.body.interest = interestList(req.body.interest);

    let newUserProfile = {
        name: req.body.name,
        username: req.params.addun,
        image: req.body.image,
        bio: req.body.bio,
        interest: req.body.interest,
        user:req.params.uid
    };

    await db.UserProfile.create(newUserProfile);
    
    res.redirect('/sessions/new');
});

module.exports = router