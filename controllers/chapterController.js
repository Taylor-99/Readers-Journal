
//Require modules
const express = require('express');
// Router allows us to handle routing outisde of server.js
const router = express.Router();

//Require the db connection, and models
const db = require('../models');
const chapter = require('../models/chapter');

router.get('/:chapid/new', (req, res) => {
    res.render("library/newComment.ejs", {
        chapId: req.params.chapid,
        currentUser: req.session.currentUser,
    });
});

router.post('/:chapterid', (req, res)=> {
    let newComment = {
        comment: req.body.comment,
        date: req.body.date
    }

    db.Chapter.findOneAndUpdate(
        { _id: req.params.chapterid },
        { $push: { comments: newComment } }
     )
     .then((updatedChap)=> {
        res.redirect(`/chapter/${req.params.chapterid}/${updatedChap.chaptername}`)
     })
})

router.get('/:readid/:chapname', (req, res)=> {
    db.Chapter.find({readingId: req.params.readid, chaptername: req.params.chapname})
    .then((readChapter) => {
        res.render("library/showChapter.ejs", {
            section: readChapter,
            currentUser: req.session.currentUser,
        });
    });
});

module.exports = router