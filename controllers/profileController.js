
const express = require('express');
const router = express.Router();
const db = require('../models');

// Update
router.put('/:id', async (req, res) => {

    await db.UserProfile.findByIdAndUpdate(
        req.params.id,
        req.body,
    ) 

        res.redirect('/profile/')
        // res.send(updatedProfile)
});

// Edit
router.get('/:profid/edit', (req, res) => {
    db.UserProfile.findById(req.params.profid)
        .then(profile => {
            res.render('library/editProfile.ejs', {
                profile: profile,
                currentUser: req.session.currentUser
            })
        })
});

// Index
router.get('/', (req, res)=> {

    db.UserProfile.find({ user: req.session.currentUser._id }).then((profile) => {
        
        db.Reading.find({user: req.session.currentUser._id})
        .then( (userReadings) => {

            res.render('library/viewProfile.ejs', {
                profile: profile,
                readings: userReadings,
                currentUser: req.session.currentUser,
                profId: profile[0]._id.toString()
            });
        })
    })
});

module.exports = router