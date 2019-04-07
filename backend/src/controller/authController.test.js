
const MockPassportAuthenticate = {
    authenticate : (strategy, config) =>  (req, res) => {
            if(req.isValid){
                res.redirect(config.successRedirect);
            }else{
                res.redirect(config.failureRedirect);
            }
        }
    };

describe("authController.login", () => {
    let authCtrl;

    beforeEach(() => {
        jest.mock("passport", () => MockPassportAuthenticate);

        authCtrl = require("./authController");
    });

    test("should authenticate user and redirect to application root on success", () => {
        const req = {isValid : true};
        const res = {redirect : jest.fn()};
        authCtrl.login(req, res);
        expect(res.redirect).toHaveBeenCalled();
        expect(res.redirect).toHaveBeenCalledWith("/");
    });

    test("should authenticate user and redirect to login page on failure", () => {
        const req = {isValid : false};
        const res = {redirect : jest.fn()};
        authCtrl.login(req, res);
        expect(res.redirect).toHaveBeenCalled();
        expect(res.redirect).toHaveBeenCalledWith("/login?failed=true");
    });

    afterEach(() => {
        //jest.clearAllMocks();
    });
});

describe("authController.isLoggedIn", () => {
    let authCtrl;
    let isAuthenticated = jest.fn(), req, next = jest.fn(), res = {redirect : jest.fn()};
    beforeEach(() => {
        authCtrl = require("./authController");
        req = {isAuthenticated}
    });

    test("should proceed to requested request when request is authenticated", () => {
        isAuthenticated.mockImplementation(() => true);
        authCtrl.isLoggedIn(req, null, next);
        expect(next).toHaveBeenCalled();
    });

    test("should redirect to /login when request is not authenticated", () => {
        isAuthenticated.mockImplementation(() => false);
        authCtrl.isLoggedIn(req, res, next);
        expect(next).not.toHaveBeenCalled();

        expect(res.redirect).toHaveBeenCalled();
        expect(res.redirect).toHaveBeenCalledWith("/login");
    });
});

