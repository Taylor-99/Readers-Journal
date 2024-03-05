
const bcrypt = require('bcrypt');
const router = require('express').Router();
const db = require('../models');

router.get('/new', (req, res)=> {
    res.render('sessions/newSession.ejs', { 
        currentUser: req.session.currentUser 
    });
});

router.post('/', async (req, res)=> {
    // Find the user trying to log in ( so that we can compare passwords)
    const foundUser = await db.User.findOne({ username: req.body.username});
    // after we find the user compare passwords
    if (!foundUser){
        res.render('sessions/newSessionNotFound.ejs')
        // res.send('cannot find user')
    }
    // if the passwords match, create a new session
    else if( await bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.currentUser = foundUser
    }
        // if the passwords don't match, send an error message
        else{
            res.render('sessions/newSessionNotFound.ejs');
            // res.send('password does not match');
        }
});

//log out aka destroy the session
router.delete('/', (req, res)=> {
    req.session.destroy(()=> {
        res.redirect('/')
    })
});

module.exports = router