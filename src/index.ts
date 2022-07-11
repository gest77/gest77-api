import "dotenv/config";
import express from "express";
import path from "path";

// import root from "app-root-path";
// import * as i18n from "i18n";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { router } from "./routes";
// import i18nConfig from "./config/i18nConfig";
// import corsConfig from "./config/corsConfig";
// import { initializeRights } from "./services/rights";
// import { getJwtSecret } from "./toolsServices/TokenService";
// import fileUpload from "express-fileupload";
// import fileUploadConfig from "./config/uploadConfig";

console.log("dot env : " + process.env.PORT);

export const showEnv = () => {
    let result = "";
    const times = process.env.TIMES || 5;
    for (let i = 0; i < times; i++) {
        result += i + " ";
    }
    return result;
};

express()
    .use(express.static(path.join(__dirname, "public")))
    .set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs")
    .get("/", (req, res) => res.render("pages/index"))
    .get("/times", (req, res) => res.send(showEnv()))
    .listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));
