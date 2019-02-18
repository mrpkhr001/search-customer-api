const passport = require('passport');


exports.login = passport.authenticate('local', {
    failureRedirect: '/login?failed=true',
    successRedirect: '/'
});

exports.isLoggedIn = (req, res, next) =>{
    if(req.isAuthenticated()){
        next();
        return;
    }
    res.redirect('/login');
};

