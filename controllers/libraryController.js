
//Require modules
const express = require('express');
// Router allows us to handle routing outisde of server.js
const router = express.Router();

//Require the db connection, and models
const db = require('../models');
// bring in the isAuthenticated middleware
const isAuthentcated = require('../controllers/isAuthenticated');

router.use(isAuthentcated);

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

function addChapters(idNew, diff, oldLength, nTitle, nAuthor, nImage, nDescription){

    let addChap = 1

    for(a=0; a < diff; a++){
        db.Chapter.create(
            {
                chaptername: (oldLength + addChap),
                readTitle: nTitle,
                readAuthor: nAuthor,
                readImage: nImage,
                readDescription: nDescription,
                comments: [],
                readingId: idNew
            }
        )

        addChap = addChap + 1
    }
}

function deleteChapters(idNew, newArrLength, oldArrLength){

    let deleteChap = 0;

    for(o = oldArrLength; o === newArrLength; o--){
        db.Chapter.findOneAndDelete({readingId: idNew, chaptername: (oldArrLength-deleteChap)});

        deleteChap = deleteChap + 1

        oldArrLength = oldArrLength-deleteChap
    }
}

// Update
router.put('/:id', async (req, res) => {

    let currentReading = await db.Reading.find({_id: req.params.id})

    let pastChapterL = currentReading[0].chapters.length

    // console.log(currentReading.re)

    let chapArray = [];

    for(h=1; h <= req.body.chapters; h++){
        chapArray.push(h);
    }

    req.body.chapters = chapArray;
    req.body.favorite = req.body.favorite === 'on' ? true : false
    req.body.tags = tagList(req.body.tags)

    let updatedReading = await db.Reading.findByIdAndUpdate(
        req.params.id,
        req.body,
    ) 

    let newId = updatedReading._id

    if(chapArray.length > pastChapterL){
        let chapDiff = chapArray.length - pastChapterL
        addChapters(newId, chapDiff, pastChapterL, updatedReading.title, updatedReading.author, updatedReading.image, updatedReading.description);

        res.redirect('/library/' + updatedReading._id)

    }
    else if(chapArray.length < pastChapterL){
        deleteChapters(newId, chapArray.length, pastChapterL);

        res.redirect('/library/' + updatedReading._id)
    }
});

//creates a chapter schema for the new reading
function createSectionSchema(chapterArray, iD, rTitle, rAuthor, rImage, rDescription){

    for(c=1; c <= chapterArray.length; c++){

        db.Chapter.create({
                chaptername: c,
                readTitle: rTitle,
                readAuthor: rAuthor,
                readImage: rImage,
                readDescription: rDescription,
                comments: [],
                readingId: iD
            })
    }
}

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