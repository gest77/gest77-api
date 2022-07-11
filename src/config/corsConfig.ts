import cors from "cors";
// https://expressjs.com/en/resources/middleware/cors.html
export default {
    origin: process.env.NODE_CORS_ORIGIN ? process.env.NODE_CORS_ORIGIN.split(";") : "*",
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
} as cors.CorsOptions;
