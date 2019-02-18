const handlers = require('./errorHandlers');

describe('errorHandlers.notFound',  () =>{
    test('should proceed to next with error of status 404 when url not found', ()=>{
        const next = jest.fn();
        handlers.notFound(null, null, next);
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls.length).toBe(1);
        expect(next.mock.calls[0][0] instanceof Error).toBeTruthy();
        expect(next.mock.calls[0][0].status).toBe(404);
    });
});

describe('errorHandlers.catchErrors',  () =>{
    const callback = jest.fn();
    let middleware;

    beforeEach(() => {
        middleware = handlers.catchErrors(callback);
    });
    test('should return a function that wraps the given callback', ()=>{
        expect(middleware).toBeDefined();
    });

    test('should invoke the given callback when returned middleware is called', () => {
        const catchCb = jest.fn();
        callback.mockReturnValue({catch: catchCb});
        middleware("req", "res", "next");
        expect(callback).toHaveBeenCalled();
        expect(callback).toHaveBeenCalledWith("req", "res", "next");
        expect(catchCb).toHaveBeenCalled();
        expect(catchCb).toHaveBeenCalledWith("next");
    })
});