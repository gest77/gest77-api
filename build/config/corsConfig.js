"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://expressjs.com/en/resources/middleware/cors.html
exports.default = {
    origin: process.env.NODE_CORS_ORIGIN ? process.env.NODE_CORS_ORIGIN.split(";") : "*",
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
//# sourceMappingURL=corsConfig.js.map