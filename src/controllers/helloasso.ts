import * as express from "express";
import { manageRedirect, NotificationEvent } from "../services/helloasso";
import { ResultWithStatusCode } from "../toolsServices/ErrorService";
import { notifHelloAssoLogger } from "../toolsServices/LoggerService";

export const redirect = async (req: express.Request): Promise<ResultWithStatusCode<void>> => {
    notifHelloAssoLogger.log("controller : " + JSON.stringify(req.body, null, 2));
    try {
        await manageRedirect(req.body as NotificationEvent);
    } catch (err) {
        notifHelloAssoLogger.log("controller catch  : " + err);
    }
    return { statusCode: 200, result: undefined };
};
