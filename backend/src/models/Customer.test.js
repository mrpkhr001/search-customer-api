const Customer = require('./Customer');

describe("Customer Schema", () => {

    test("should validate customer name as mandatory", () => {
        const customer = new Customer({});
        const validations = customer.validateSync();
        expect(validations.name).toBe("ValidationError");
        expect(validations.errors.name.message).toBe("Please enter a name");
    });

    test("should not throw any error when valid name is provided", () => {
        const customer = new Customer({name : "John Smith"});
        const validations = customer.validateSync();
        expect(validations).not.toBeDefined();
    })
});