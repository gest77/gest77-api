import * as express from "express";
import { shouldDisplayApiDoc } from "../config/swaggerConfig";
import { VeraLocals } from "../middlewares/middlewareLocals";
import { isLocalOrDev } from "../toolsServices/DotEnvHelper";

export const status = async (req: express.Request, res: express.Response<unknown, VeraLocals>): Promise<void> => {
    const protocol = isLocalOrDev() ? "http://" : "https://";
    const doc = protocol + req.headers.host + "/doc";

    // Check parameters -> Might fire exceptions
    res.json({
        title: process.env.API_TITLE,
        alive: true,
        version: process.env.API_VERSION,
        documentation: shouldDisplayApiDoc() ? doc : "",
        website: process.env.API_EXTERNAL_SITE,
    });
};
