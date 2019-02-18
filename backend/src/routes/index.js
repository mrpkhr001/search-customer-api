const express = require('express');
const router = express.Router();

const customerCtrl = require('../controller/customerController');
const userCtrl = require('../controller/userController');
const authCtrl = require('../controller/authController');
const {catchErrors} = require('../handlers/errorHandlers');


// Do work here
router.get('/', (req, res) => {
   res.send(`<pre>Hi There, 
                This is customer search application to search customer names
                API details
   * /                            : \`GET\`  Default landing page   
   * /search?searchTerm={keyword} : \`GET\`  \`Secured\` Search of customer names with given keyword
   * /add                         : \`POST\`  \`Secured\` Adding new customer names, {name}
   * /register                    : \`POST\` User can sign up using {name, email, password} 
   * /login                       : \`POST\` Log into application {email, password}                          
   * /logout                      : \`GET\` Logout from application    </pre>`);
});
router.get('/search', authCtrl.isLoggedIn, customerCtrl.nameSearch);
router.post('/add', authCtrl.isLoggedIn, catchErrors(customerCtrl.addCustomer));

    // userCtrl.validateRegister,
router.post('/register', userCtrl.register, authCtrl.login);

router.post('/login', authCtrl.login);

router.get('/login', (req, res) => {

    if(req.query.failed) {
        res.status(401);
        res.send('invalid user name and password');
    }else{
        res.status(200);
        res.send('provide user name and password to login');
    }
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});



module.exports = router;
