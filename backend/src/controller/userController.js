const mongoose = require('mongoose');

const User = mongoose.model('User');


exports.register = (req, res, next) => {
    const user = new User({email: req.body.email, name: req.body.name});

    return User.register(user, req.body.password)
        .then(() =>{
            next();
        }).catch(err =>{
            res.status(500).json(err);
        });
};

