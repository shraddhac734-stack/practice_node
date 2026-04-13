const {getInvalidRequestResponse,getNotFoundResponse,getUnauthorizeResponse,getInternalServerErrorResponse,getGeneralResponse,}
 = require("../utils/response");
const { InvalidRequestException, NotFoundException, UnauthoRizedException} = require("./exception");
const { ZodError } = require("zod");


module.exports = (err, req, res, next) => {
    console.error("ERROR: ", err);
    // Validation
    if (err instanceof InvalidRequestException) {
        return getGeneralResponse(
            res,
            getInvalidRequestResponse(err.message),
            null,
        );
    }

    //Zod Validation
    if (err instanceof ZodError) {
        const errorMessage = err.issues.map(e => e.message).join(", ");

        return getGeneralResponse(
            res,
            getInvalidRequestResponse(errorMessage)
        );
    }

    // Not Found
    if (err instanceof NotFoundException) {
        return getGeneralResponse(
            res,
            getNotFoundResponse(err.message),
            null,
        );
    }

    // Unauthorized
    if (err instanceof UnauthoRizedException) {
        return getGeneralResponse(
            res,
            getUnauthorizeResponse(err.message),
            null,
        );
    }
    // Fallback Internal Error
    return getGeneralResponse(res, getInternalServerErrorResponse(), null);
};
