
//Require modules
const express = require('express');
// Router allows us to handle routing outisde of server.js
const router = express.Router();

//Require the db connection, and models
const db = require('../models');

router.get('/:readid/:chapname', (req, res)=> {

    db.Chapter.find({readingId: req.params.readid, chaptername: req.params.chapname})
    .then(
        (chapter) => res.render("library/showChapter.ejs", {
            chap: chapter,
            currentUser: req.session.currentUser,
        })
        // (chapter) => res.send(chapter)
    )
})

module.exports = router