export const errorHandler = (err, req, res, next) => {
    var _a;
    const statusCode = err.statusCode || 500;
    const errorMessage = (_a = err === null || err === void 0 ? void 0 : err.errorMessage) !== null && _a !== void 0 ? _a : "Unknown error";
    const errorResponse = {
        statusCode,
        errorMessage,
    };
    res.status(statusCode).json(errorResponse);
};
