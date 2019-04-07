const passport = require('passport');

/**
 * Handles the POST:/login route
 *
 * With passport local strategy letting/authenticating user to log in to application
 * using email and password
 * on Success : Redirects to root of the application.
 * on Failure : Redirects to GET /login, which should present the login form
 */
exports.login = passport.authenticate('local', {
    failureRedirect: '/login?failed=true',
    successRedirect: '/'
});

/**
 * Acts as middleware to validate if user is logged into the application before.
 * @param req
 * @param res
 * @param next
 */
exports.isLoggedIn = (req, res, next) =>{
    if(req.isAuthenticated()){
        next();
        return;
    }
    res.redirect('/login');
};

