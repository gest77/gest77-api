import * as express from "express";
import { manageRedirect } from "../services/google";
import { ResultWithStatusCode } from "../toolsServices/ErrorService";

export const redirect = async (req: express.Request): Promise<ResultWithStatusCode<void>> => {
    const code = req.query.code as string;

    await manageRedirect(code);
    return { statusCode: 200, result: undefined };
};
