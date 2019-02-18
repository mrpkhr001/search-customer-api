/* Catch Errors Handler : With promise call backs a generic way to handle errors */
exports.catchErrors = (fn) => {
    return function(req, res, next) {
        return fn(req, res, next).catch(next);
    };
};

/* Handler for route not found scenarios */
exports.notFound = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};


/* Development Error Handler for more detail */
exports.developmentErrors = (err, req, res)  => {
    err.stack = err.stack || '';
    const errorDetails = {
        message: err.message,
        status: err.status,
        stackHighlighted: err.stack.replace(/[a-z_\-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
    };
    res.status(err.status || 500);
    res.json(errorDetails);
};

/* Production Error Handler */
exports.productionErrors = (err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
};