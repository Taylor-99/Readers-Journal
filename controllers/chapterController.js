
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

// Update
router.put('/:eid/:eIndex', async (req, res) => {

    let editComment = {
        comment: req.body.comment.concat("\t (edited)"),
        date: req.body.date
    }

   db.Chapter.find({_id: req.params.eid})
    .then((useChapter)=> {
        db.Chapter.findOneAndUpdate(
            { _id: req.params.eid },
            {$set: {[`comments.$[${req.params.eIndex}]`]: editComment}},
            {new: true}
        )
        .then(
            res.redirect(`/chapter/${useChapter[0].readingId}/${useChapter[0].chaptername}`)
        )
    })
});

// https://stackoverflow.com/questions/11372065/mongodb-how-do-i-update-a-single-subelement-in-an-array-referenced-by-the-inde

// Edit
router.get('/:cid/:cindex/edit', (req, res) => {
    db.Chapter.findById(req.params.cid)
        .then(fChapter => {
            res.render('library/editComment.ejs', {
                comment: fChapter.comments[req.params.cindex],
                currentUser: req.session.currentUser,
                chapterId: fChapter._id.toString(),
                uIndex: req.params.cindex
            })
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