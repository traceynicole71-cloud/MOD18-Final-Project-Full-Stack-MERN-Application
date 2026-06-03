//Catch all instances where client attempts to ping a non-existent endpoint
const notFound = (req, res, next) => {
    const error = new Error(`Resource Path Not Found - [${req.method}] ${req.originalUrl}`);
    res.status(404);
    next(error);
};
//Centralized runtime error interceptor
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    //Trigger error with invalid Mongoose ObjectId in URL path
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 400;
        message = 'Resource identification parsing failed.  Invalid ID parameter string format';
    }
    //Trigger when data payloads fail constraint rules
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map((val) => val.message).join(', ');
    }

    //Log error trace to server terminal
    console.error(`[API ERROR ENCOUNTERED]: ${err.message}`);

    res.status(statusCode).json({
        success: false,
        message: message,
        //Security enforcement
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

module.exports = {
    notFound,
    errorHandler
};
