
//Require modules
const express = require('express');
// Router allows us to handle routing outisde of server.js
const router = express.Router();

//Require the db connection, and models
const db = require('../models');
const chapter = require('../models/chapter');

// New
router.get('/:chapid/new', (req, res) => {
    res.render("library/newComment.ejs", {
        chapId: req.params.chapid,
        currentUser: req.session.currentUser,
    });
});

// Create
router.post('/:chapterid', (req, res)=> {
    let newComment = {
        comment: req.body.comment,
        date: req.body.date
    }

    db.Chapter.findOneAndUpdate(
        { _id: req.params.chapterid },
        { $push: { comments: newComment } },
        {new: true}
     )
     .then((updatedChap)=> {
        res.redirect(`/chapter/${updatedChap.readingId}/${updatedChap.chaptername}`)
     })
});

// Index
router.get('/:readid/:chapname', (req, res)=> {
    db.Chapter.find({readingId: req.params.readid, chaptername: req.params.chapname})
    .then((readChapter) => {
        res.render("library/showChapter.ejs", {
            section: readChapter,
            currentUser: req.session.currentUser,
            id: readChapter[0]._id.toString()
        });
    });
});

// Delete
router.delete('/:chapterid/:commentindex', async (req, res) =>{

    await db.Chapter.find({_id: req.params.chapterid})
    .then((chapter)=> {
        db.Chapter.updateOne(
            {_id: req.params.chapterid},
            {$pull: {comments: chapter[0].comments[req.params.commentindex]}}
        )
        .then(() => res.redirect(`/chapter/${chapter[0].readingId}/${chapter[0].chaptername}`))
    })
});

module.exports = router