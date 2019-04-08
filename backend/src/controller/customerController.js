const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.nameSearch = (req, res) => {
    const {searchTerm} = req.query;
    const name = new RegExp(searchTerm, "i");
    return Customer
        .find({name})
        .then(customers => {
            res.status(200).json(customers);
        })
};

exports.addCustomer = (req, res) => {
    const customer = new Customer(req.body);
    return customer
        .save()
        .then(data => {
            res.status(200).json(data);
        })
};