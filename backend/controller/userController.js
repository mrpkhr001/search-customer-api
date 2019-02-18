const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.validateRegister = (req, res, next)=>{
    req.sanitizeBody('name');
    req.checkBody('name', 'You must supply a name!').notEmpty();
    req.checkBody('email', 'That email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension : false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Password cannot be Blank!').notEmtpy();
    req.checkBody('password-confirm', 'Password-confirm cannot be Blank!').notEmtpy();
    req.checkBody('password-confirm', 'Oops! Your password do not match').equals(req.body.password);

    const errors = req.validationErrors();
    if(errors){
        res.json(errors);
        return;
    }
    next();
};

exports.register = (req, res, next) => {
    const user = new User({email: req.body.email, name: req.body.name});

    User.register(user, req.body.password).then(() =>{
            next();
        }).catch(err =>{
            console.log(err);
            res.status(500).json(err);
        });
};

