const request = require('supertest');
const app = require('./app');

const mongoose = require('mongoose');
const User = mongoose.model('User');


describe("Application", () => {
    let requestApp;

    beforeAll(() => {
        requestApp = request(app);
    });

    afterEach(async () => {
        await User.remove();
    });

    test("should respond ok when requested to root ('/') path", (done) => {
        requestApp
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                done();
            });

    });

    test("should respond with 404 when requested with unknown url", done => {
        requestApp
            .get('/some-unknown-url')
            .expect(404)
            .end(() => {
                done();
            });
    });

    test("should respond 302 when requested for search customer without login", done => {
        requestApp
            .get('/search')
            .expect(302)
            .expect("location", /\/login/)
            .end((err) => {
                if (err) done(err);
                done();
            });
    });

    test("should redirect to home page when user is trying access protected apis", done => {
        requestApp
            .get('/search')
            .expect(res => {
                expect(res.status).toBe(302);
                expect(res.header.location).toBe("/login");
            }).end(done);
    });


    describe("/register", () => {

        test("should register user details and redirect user to home page", done => {
            const name = "John Smith", email = "john@test.com", password = "password";
            requestApp
                .post('/register')
                .send({name, email, password})
                .set('Accept', 'application/json')
                .expect(302)
                .expect("location", "/")
                .expect("set-cookie", /connect.sid=/)
                .end(done);
        });

        test("should fail to register user details when incomplete user details are provided", done => {
            const email = "john@test.com", password = "password";
            requestApp
                .post('/register')
                .send({email, password})
                .set('Accept', 'application/json')
                .expect(500)
                .expect(res => {
                    expect(res.body.errors.name.message).toBe("Please supply a name");
                })
                .end(done);

        })
    });

    describe("/login and /logout ", () => {

        test("should present user with log in form", done => {
            requestApp
                .get("/login")
                .expect(200)
                .expect('provide user name and password to login', done)

        });

        test("should show error message when provided sign in details are not valid", done => {
            requestApp
                .get("/login?failed=true")
                .expect(401)
                .expect('invalid user name and password', done)
        });

        test("should allow user to sign in with valid user credentials", async done => {
            const name = "John Smith", email = "john@test.com", password = "password";
            await requestApp
                .post('/register')
                .send({name, email, password})
                .set('Accept', 'application/json');

            requestApp
                .post('/login')
                .send({email, password})
                .set('Accept', 'application/json')
                .expect(302)
                .expect("location", "/")
                .expect("set-cookie", /connect.sid=/)
                .end(done);
        });

        test("should allow user to logout from the application", async done => {

            requestApp
                .get('/search')
                .expect(res => {
                    expect(res.status).toBe(302);
                    expect(res.header.location).toBe("/login");
                });

            const name = "John Smith", email = "john@test.com", password = "password";
            let cookie;
            await requestApp
                .post('/register')
                .send({name, email, password})
                .set('Accept', 'application/json')
                .expect(response => {
                    cookie = response.header["set-cookie"];
                });

            requestApp
                .get('/search')
                .set("cookie", cookie)
                .expect(res => {
                    expect(res.status).toBe(200);
                    expect(res.body).isEqual([]);
                });

            requestApp
                .get("/logout")
                .expect(302)
                .expect("location", "/")
                .end(done);
        })
    });

    describe("customer add and search", () => {
        const userName = "John Smith", email = "john@test.com", password = "password";
        const customerName = "Test Customer";
        let cookie;
        beforeEach(async () => {

            await requestApp
                .post('/register')
                .send({name: userName, email, password})
                .set('Accept', 'application/json')
                .expect(response => {
                    cookie = response.header["set-cookie"];
                });
        });

        test("should add new customer details when user is logged into the system and provided valid customer details", done => {
            requestApp
                .post('/add')
                .send({name : customerName})
                .set("cookie", cookie)
                .expect(res => {
                    expect(res.status).toBe(200);
                    expect(res.body.name).toBe(customerName);
                }).end(done);
        })

        test("should return customers matching to provided search terms", done => {
            requestApp
                .get('/search?searchTerm=test')
                .set("cookie", cookie)
                .expect(res => {
                    expect(res.status).toBe(200);
                    expect(res.body.length).toBe(1);
                    expect(res.body[0].name).toBe(customerName)
                }).end(done);
        });

        test("should return empty list of customers if no match found", done => {
            requestApp
                .get('/search?searchTerm=test1')
                .set("cookie", cookie)
                .expect(res => {
                    expect(res.status).toBe(200);
                    expect(res.body.length).toBe(0);
                }).end(done);
        });


    })


});