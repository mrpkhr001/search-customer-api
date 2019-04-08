require('../dbConnect');

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

const customerCtrl = require("./customerController");

describe("customerController ", () =>{

    describe("addCustomer", () => {

        afterEach(async () => {
           await Customer.remove();
        });

        test("should save customer data when valid customer data submitted in request.body", async () => {
            const name = "Test Customer";
            const req = {body : {name}};
            const status = jest.fn();
            const json =  jest.fn();
            const res = {status, json};
            status.mockImplementation(() => res);
            await customerCtrl.addCustomer(req, res);
            expect(status).toHaveBeenCalledWith(200);
            expect(json).toHaveBeenCalled();

            const newCustomer = await  Customer.find({name :new RegExp(name, "i")});
            expect(newCustomer[0]._id).toBeDefined();
            expect(newCustomer[0].name).toBe(name);
        });

        test("should throw error when customer name is empty or invalid", async () => {
            const expectedErrorMsg = "Please enter a name";
            let req = {body : {}};
            try {
                await customerCtrl.addCustomer(req);
            }catch(exp){
                expect(exp.errors.name.message).toBe(expectedErrorMsg);
            }
            req = {body : {name: ""}};
            try {
                await customerCtrl.addCustomer(req);
            }catch(exp){
                expect(exp.errors.name.message).toBe(expectedErrorMsg);
            }
        })
    });

    describe("nameSearch", () => {
        const customer1 = "First Customer", customer2 = "Second Customer";

        let res, req, status, json;
        beforeEach(async () => {
            status = jest.fn();
            json =  jest.fn();
            req = {query: {}}
            res = {status, json};
            status.mockImplementation(() => res);
            let customer = new Customer({
                name: customer1
            });
            await customer.save();

            customer = new Customer({
                name : customer2
            });
            await customer.save();
        });

        afterEach(async () =>{
            await Customer.remove();
           jest.resetAllMocks();
        });

        test("should return empty list when search term does not find any customer", (done) => {
            req.query.searchTerm = "notMatchingCustomerName";
            customerCtrl.nameSearch(req, res)
                .then(() => {
                    expect(status).toHaveBeenCalledTimes(1);
                    expect(status).toHaveBeenCalledWith(200);
                    expect(json).toHaveBeenCalledWith([]);
                    done();
                })
        });

        test("should return all customer when no search term is provided", (done) => {
            customerCtrl.nameSearch(req, res)
                .then(() => {
                    expect(status).toHaveBeenCalledTimes(1);
                    expect(status).toHaveBeenCalledWith(200);
                    expect(json.mock.calls[0][0].length).toBe(2);
                    done();
                })
        });

        test("should return customer with name 'Second Customer' when searchTerm is 'second'", (done) => {
            req.query.searchTerm = "second";
            customerCtrl.nameSearch(req, res)
                .then(() => {
                    expect(status).toHaveBeenCalledTimes(1);
                    expect(status).toHaveBeenCalledWith(200);
                    expect(json.mock.calls[0].length).toBe(1);
                    const searchResult = json.mock.calls[0][0];
                    expect(searchResult.length).toBe(1);
                    expect(searchResult[0].name).toBe(customer2);
                    done();
                })
        });
    })

});