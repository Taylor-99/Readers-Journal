
//Require modules
const express = require('express');
// Router allows us to handle routing outisde of server.js
const router = express.Router();

//Require the db connection, and models
const db = require('../models');

router.get('/:readid/:chapname', (req, res)=> {

    db.Chapter.find({readingId: req.params.readid, chaptername: req.params.chapname})
    .then((readChapter) => {
        res.render("library/showChapter.ejs", {
            chapter: readChapter,
            currentUser: req.session.currentUser,
        });
    });
})

module.exports = router