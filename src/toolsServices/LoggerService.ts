import * as log4js from "log4js";

log4js.configure({
    appenders: {
        default: { type: "file", filename: `./gest.api.log` },
    },
    categories: {
        default: { appenders: ["default"], level: "debug" },
    },
});

export const logger = log4js.getLogger("default");
