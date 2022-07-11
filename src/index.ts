import "dotenv/config";
import root from "app-root-path";
import express from "express";
import path from "path";
import * as i18n from "i18n";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import corsConfig from "./config/corsConfig";
import fileUploadConfig from "./config/uploadConfig";
import i18nConfig from "./config/i18nConfig";
import { router } from "./routes";

export const showEnv = () => {
    let result = "";
    const times = process.env.TIMES || 5;
    for (let i = 0; i < times; i++) {
        result += i + " ";
    }
    return result;
};

// express()
//     .use(express.static(path.join(__dirname, "public")))
//     .set("views", path.join(__dirname, "views"))
//     .set("view engine", "ejs")
//     .get("/", (req, res) => res.render("pages/index"))
//     .get("/times", (req, res) => res.send(showEnv()))
//     .listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));

// import { getJwtSecret } from "./toolsServices/TokenService";

const main = async () => {
    const app = express();
    app.use(i18n.init);
    app.use(cookieParser());
    app.use(cors(corsConfig));
    app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
    app.use(fileUpload());
    app.use(express.json()); // parse application/json

    // present file favicon (used in api doc, as favicon)
    app.use("/favicon.png", express.static(root + "/src/resources/favicon.png"));
    // present uploaded files to users.
    app.use(fileUploadConfig.UPLOAD_DIR, express.static(root + "/" + fileUploadConfig.UPLOAD_DIR));

    // should be the last ?
    app.use("/", router);

    // first parameter is the route as it would appears in navigator
    // third parameter is local path of public folder. (__dirname == ./src)
    // This one need cookie parser.

    app.listen(process.env.PORT, () => {
        console.log(`Server started on http://localhost:${process.env.PORT}`);
    });
};

//Trads options : note the header that would contains the language. it is not default !
//crashIfEnvKO();
i18n.configure(i18nConfig);
main();
