
const isAuthenticated = (req, res, next)=> {
    if(req.session.currentUser){
        return next()
    }
    else{
        res.render('loginorcreate.ejs')
    }
};

module.exports = isAuthenticated;