import * as express from "express";
import { shouldDisplayApiDoc } from "../config/swaggerConfig";
import { LocalContext } from "../middlewares/locals";
import { isLocalOrDev } from "../toolsServices/DotEnvHelper";

export const status = async (req: express.Request, res: express.Response<unknown, LocalContext>): Promise<void> => {
    const protocol = isLocalOrDev() ? "http://" : "https://";
    const doc = protocol + req.headers.host + "/doc";

    // Check parameters -> Might fire exceptions
    res.json({
        title: process.env.API_TITLE,
        alive: true,
        version: process.env.API_VERSION,
        documentation: shouldDisplayApiDoc() ? doc : "",
        website: process.env.API_EXTERNAL_SITE,
        iosApp: process.env.IOS_APP_STORE,
        androidApp: process.env.ANDROID_APP_STORE,
    });
};
