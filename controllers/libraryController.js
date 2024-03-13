
//Require modules
const express = require('express');
// Router allows us to handle routing outisde of server.js
const router = express.Router();

//Require the db connection, and models
const db = require('../models');
// bring in the isAuthenticated middleware
const isAuthentcated = require('../controllers/isAuthenticated');

router.use(isAuthentcated);

//creates a chapter chema for the new reading
function createSectionSchema(chapterArray, iD, rTitle, rAuthor, rImage, rDescription){

    for(c=1; c <= chapterArray.length; c++){

        let newChapter = {
            chaptername: c,
            readTitle: rTitle,
            readAuthor: rAuthor,
            readImage: rImage,
            readDescription: rDescription,
            comments: [],
            readingId: iD
        }

        dbChapter = db.Chapter.create(newChapter)
    }
}

//makes an array for the tag list
function tagList(listString){

    let splitList = listString.split(",");

    return splitList;
}

// I.N.D.U.C.E.S

// Index
router.get('/', (req, res)=> {

    db.Reading.find({ user: req.session.currentUser._id }).then((readings) => {
        res.render("library/libraryHome.ejs", {
            readings: readings,
            currentUser: req.session.currentUser
        });
      });
});

// New
router.get('/new', (req, res) => {
    res.render("library/newReading.ejs", { currentUser: req.session.currentUser 
    });
});

// Delete
router.delete('/:id', async (req, res) =>{
    await db.Reading.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/library'))
});

// Update
router.put('/:id', async (req, res) => {
    let chapArray = [];

    for(h=1; h <= req.body.chapters; h++){
        chapArray.push(h);
    }

    req.body.chapters = chapArray;
    req.body.favorite = req.body.favorite === 'on' ? true : false
    req.body.tags = tagList(req.body.tags)

    await db.Reading.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(reads => res.redirect('/library/' + reads._id))
})

// Create
router.post("/", async (req, res) => {

    let chapArray = [];

    for(h=1; h <= req.body.chapters; h++){
        chapArray.push(h);
    }

    req.body.chapters = chapArray;
    req.body.favorite = req.body.favorite === 'on' ? true : false
    req.body.user = req.session.currentUser._id
    req.body.tags = tagList(req.body.tags)
    let newReading = await db.Reading.create(req.body); 

    createSectionSchema(newReading.chapters, newReading._id, newReading.title, newReading.author, newReading.image, newReading.description);
    
    res.redirect('/library');
});

// Edit
router.get('/:id/edit', (req, res) => {
    db.Reading.findById(req.params.id)
        .then(reads => {
            res.render('library/editReadings.ejs', {
                reads: reads,
                currentUser: req.session.currentUser
            })
        })
})

// Show
router.get('/:rid', (req, res)=> {

    db.Reading.findById(req.params.rid)
    .then(reads => {
        res.render('library/showReading.ejs', {
            reads: reads,
            currentUser: req.session.currentUser
        });
    })
})

//export so we can use this in other file
module.exports = router