import * as log4js from "log4js";

log4js.configure({
    appenders: {
        notif: { type: "file", filename: `./gest.notifhelloasso.log` },
        default: { type: "file", filename: `./gest.api.log` },
    },
    categories: {
        notif: { appenders: ["notif"], level: "info" },
        default: { appenders: ["default"], level: "debug" },
    },
});

export const logger = log4js.getLogger("default");
export const notifHelloAssoLogger = log4js.getLogger("notif");
