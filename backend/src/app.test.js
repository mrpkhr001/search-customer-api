const request = require('supertest');
const app = require('./app');


describe("Application", () => {
    let requestApp;

    beforeAll(() =>{
        requestApp = request(app);
    });

    test("should respond ok when requested to root ('/') path", (done) =>{
            requestApp
                .get('/')
                .expect(200)
                .end((err, res) => {
                    if (err) done(err);
                    done();
                });

    });

    test("should respond with 404 when requested with unknown url", (done) => {
        requestApp
            .get('/some-unknown-url')
            .expect(404)
            .end((err) => {
                if (err) done(err);
                done();
            });
    });

    test("should respond 302 when requested for search customer without login" , (done) => {
        requestApp
            .get('/search')
            .expect(302)
            .expect("location",/\/login/)
            .end((err) => {
                if (err) done(err);
                done();
            });
    });
});