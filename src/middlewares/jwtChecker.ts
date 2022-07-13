import * as express from "express";
import * as jwt from "jsonwebtoken";
import { DUMMY, getJwtSecret, getToken } from "../toolsServices/TokenService";
import { sendError, unauthorized } from "../toolsServices/ErrorService";
import { VeraLocals } from "./middlewareLocals";

export const checkJwt = (): ((req: express.Request, res: express.Response<unknown, VeraLocals>, next: express.NextFunction) => Promise<void>) => {
    return async (req: express.Request, res: express.Response<unknown, VeraLocals>, next: express.NextFunction): Promise<void> => {
        // Middleware should not throw, in this architecture.

        // TODO add full Url of the request to see where it fails ?
        // console.log("FULL URL IN CHECKJWT: ", req?.protocol + "://" + req?.get("host") + req?.originalUrl);

        try {
            const jwtPayload = await extractTokenData(req, res);

            if (jwtPayload.dummy !== DUMMY) {
                // if somebody should reset its password, refuse access.
                sendError(unauthorized(), res);
                return;
            }
        } catch (error) {
            console.log("checkJwt  caught !  => in doubt : not authorized " + JSON.stringify(error));
            // If token is not valid, respond with 401 (unauthorized)
            sendError(unauthorized(), res); // to have security.
            return;
        }

        // Call the next middleware or controller
        if (!res.headersSent) next();
    };
};

export const extractTokenData = async (req: express.Request, res: express.Response<unknown, VeraLocals>): Promise<jwt.JwtPayload> => {
    const secret = getJwtSecret();
    const token = getToken(req);
    // Unauthorized if token is blackList
    const jwtPayload: jwt.JwtPayload = jwt.verify(token, secret, { ignoreExpiration: true }) as jwt.JwtPayload;

    res.locals.jwtPayload = jwtPayload;
    res.locals.authToken = token;

    return jwtPayload;
};
