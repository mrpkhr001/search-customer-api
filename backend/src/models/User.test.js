const User = require('./User');

describe("User Schema", () => {

    test("should validate user details when empty no details are provided", () => {
        const user = new User({});
        const errors = user.validateSync();
        expect(errors).toBeDefined();

        expect(errors.name).toBe("ValidationError");
        expect(errors.errors.name.message).toBe("Please supply a name");
        expect(errors.errors.email.message).toBe("Please supply an email address");
    });

    test("should validate user with no errors when valid name and email address are provided ", () => {
        const user = new User({name: "Test User", email: "test@test.com"});
        const errors = user.validateSync();
        expect(errors).not.toBeDefined();
    });

    test("should throw error when invalid email address is provided", () => {
        const user = new User({name: "Test User", email: "test@test"});
        const errors = user.validateSync();
        expect(errors).toBeDefined();
        expect(errors.errors.email.message).toBe("Invalid Email Address");
    })

});