import * as express from "express";
import { ResultWithStatusCode } from "../toolsServices/ErrorService";
import * as TokenService from "../toolsServices/TokenService";

export const create = async (req: express.Request): Promise<ResultWithStatusCode<{ apikey: string }>> => {
    return { statusCode: 200, result: { apikey: TokenService.createApiKeyToken() } };
};
