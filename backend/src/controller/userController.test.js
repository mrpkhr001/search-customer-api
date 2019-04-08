require('../dbConnect');
require("../handlers/passport");

const mongoose = require('mongoose');
const User = mongoose.model('User');

const userCtrl = require("./userController");

describe("userController", () => {

    const email = "test@test.com", name = "Test Name", password = "password";
    const req = { };

    afterEach(async () =>{
        await User.remove();
        jest.resetAllMocks();
    });

    test("should register user details when all user information is provided", async () => {
        const next = jest.fn();
        req.body = {email, name, password};

        await userCtrl.register(req, null, next);
        expect(next).toHaveBeenCalled();
        const user = await User.find({email});
        expect(user[0]).toBeDefined();
        expect(user[0].email).toBe(email);
        expect(user[0].name).toBe(name);
    });

    test("should not allow registering user details when given user details are already exists", async () => {
        const status = jest.fn(), json = jest.fn();
        const res = {status, json};
        status.mockImplementation(() => res);
        const next = jest.fn();
        req.body = {email, name, password};

        //Registering user
        await userCtrl.register(req, res, next);

        //Registering same user details
        await userCtrl.register(req, res, next);

        expect(status).toHaveBeenCalledWith(500);
        expect(json).toHaveBeenCalled();
        expect(json.mock.calls[0][0].message).toBe("A user with the given username is already registered");
    });

    test("should throw error when password is missing while registering user details", async () => {
        const status = jest.fn(), json = jest.fn();
        const res = {status, json};
        status.mockImplementation(() => res);
        req.body = {email, name};
        await userCtrl.register(req, res);

        expect(status).toHaveBeenCalledWith(500);
        expect(json.mock.calls[0][0]).toBeDefined()
        expect(json.mock.calls[0][0].message).toBe("No password was given");
    });

    test("should throw error when email is missing or invalid while registering user details", async () => {
        const status = jest.fn(), json = jest.fn();
        const res = {status, json};
        status.mockImplementation(() => res);
        req.body = {name, email: "email@test", password};
        await userCtrl.register(req, res);

        expect(status).toHaveBeenCalledWith(500);
        expect(json.mock.calls[0][0]).toBeDefined()
        expect(json.mock.calls[0][0].errors.email.message).toBe("Invalid Email Address");
    });

    test("should throw error when name is missing or invalid while registering user details", async () => {
        const status = jest.fn(), json = jest.fn();
        const res = {status, json};
        status.mockImplementation(() => res);
        req.body = {email: "email@test", password};
        await userCtrl.register(req, res);

        expect(status).toHaveBeenCalledWith(500);
        expect(json.mock.calls[0][0]).toBeDefined()
        expect(json.mock.calls[0][0].errors.name.message).toBe("Please supply a name");
    });
});