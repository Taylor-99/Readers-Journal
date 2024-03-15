
const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res)=> {

    console.log(req.session)

   db.UserProfile.find({ user: req.session.currentUser._id }).then((profile) => {
        res.send(profile);
      });
})

module.exports = router