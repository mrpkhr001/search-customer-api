const passport = require('passport');


exports.login = passport.authenticate('local', {
    failureRedirect: '/login?failed=true',
    successRedirect: '/'
});

exports.isLoggedIn = (req, res, next) =>{
    console.log(`is User authenticated : ${req.isAuthenticated()}`);
    if(req.isAuthenticated()){
        next();
        return;
    }
    res.redirect('/login');
};

