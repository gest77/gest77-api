import * as express from "express";
import * as yup from "yup";
import * as errorService from "../toolsServices/ErrorService";
import { logger } from "../toolsServices/LoggerService";
import { VeraLocals } from "./middlewareLocals";

/*
 * This function is a middleware.
 * It is an helper to encapsulate another function : functionToLaunch
 * @param functionToLaunch , will be managed with try catch and log,
 * If it success, Response will be built, and the middleware Next, will be called
 * @param functionName : the second parameter is the name of function that cannot be introspected after typescript compilation.
 * it will be used only for logging purpose.
 * @param statusCode
 * is the default parameter that will be called in case of success.
 * @return a middleware function
 *
 */

export const catcher = (
    functionToLaunch: (req: express.Request, res: express.Response<unknown, VeraLocals>) => Promise<errorService.ResultWithStatusCode<unknown>>,
    functionName: string
): ((req: express.Request, res: express.Response<unknown, VeraLocals>, next: express.NextFunction) => Promise<void>) => {
    return async (req: express.Request, res: express.Response<unknown, VeraLocals>): Promise<void> => {
        try {
            const result = await functionToLaunch(req, res);
            // Build response is currently send the response (or might crash i guess).

            if (result) {
                errorService.sendResponse(result, res);
            }

            return;
        } catch (e) {
            // here functionToLaunch have fire an exception.
            // various treatment possible depending of error type.

            logger.error(`${functionName} Caught in CATCHER`);
            logger.debug(`    body = ${JSON.stringify(req.body, null, 2)}`);

            // Yup error, due to validation of input.
            // Awaited Error handling !
            if (e instanceof yup.ValidationError) {
                const yupErr = errorService.yupError(e, res);
                logger.error(`    Fail with yup.ValidationError ${JSON.stringify(yupErr, null, 2)}`);
                errorService.sendError(yupErr, res);
                return;
            }

            // custom error from our error service. fired by our code.
            // Awaited Error handling !
            if (errorService.isErrorBody(e)) {
                logger.error(`    Fail with typeof(ErrorBody) ${JSON.stringify(e, null, 2)}`);
                errorService.sendError(e, res);
                return;
            }

            // Probably not awaited error, fired by system, not our code directly.
            if (e instanceof Error) {
                logger.error(`    Fail with typeof(Error) ${e}`);
                errorService.sendError(errorService.es5Err(e, res), res);
                return;
            }

            // other errors thrown. Unknown type, do our best with it.
            if (typeof e === "object" && e !== null) {
                logger.error(`    Fail with object error ${JSON.stringify(e)}`);
            } else {
                logger.error(`    Fail with unknown error ${e}`);
            }

            errorService.sendError(errorService.unknownError(e, res), res);
            return;
        }

        // NOT really a middleware finally, we knows that there is nothing next.
        // All path of the middleware SHOULD have send response, and returned.

        // NO NEED of following
        // If the current middleware function does not end the http request-response cycle,
        // it MUST call next() to pass control to the next middleware function.
        // Otherwise, the request will be left hanging.
        // if (!res.headersSent) next();
    };
};
