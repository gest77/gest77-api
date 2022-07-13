import * as express from "express";
import { unauthorized } from "../toolsServices/ErrorService";
import { logger } from "../toolsServices/LoggerService";
import * as jwt from "jsonwebtoken";
import secret from "../config/jwtsecret.json";

export const getJwtSecret = (): string => {
    return secret.secret;
};

export const DUMMY = "Une phrase en dur dans le code. Si elle change, cela revoquera les api keys déjà distribuées.";

export const createApiKeyToken = (): string => {
    const payload: jwt.JwtPayload = {
        dummy: DUMMY,
    };
    return jwt.sign(payload, secret.secret, { algorithm: "HS512" });
};

export const getToken = (req: express.Request): string => {
    // Get the jwt token from the head
    const bearer = req.headers["authorization"] as string;
    if (!bearer) {
        throw unauthorized();
    }
    const split = bearer.split("Bearer ");
    if (split.length === 0) {
        throw unauthorized();
    }
    const token = split[1];
    logger.info("checkJwt - JWT received : " + token);

    return token;
};
