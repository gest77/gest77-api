"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showEnv = void 0;
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
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
var showEnv = function () {
    var result = "";
    var times = process.env.TIMES || 5;
    for (var i = 0; i < times; i++) {
        result += i + " ";
    }
    return result;
};
exports.showEnv = showEnv;
(0, express_1.default)()
    .use(express_1.default.static(path_1.default.join(__dirname, "public")))
    .set("views", path_1.default.join(__dirname, "views"))
    .set("view engine", "ejs")
    .get("/", function (req, res) { return res.render("pages/index"); })
    .get("/times", function (req, res) { return res.send((0, exports.showEnv)()); })
    .listen(process.env.PORT, function () { return console.log("Listening on ".concat(process.env.PORT)); });
//# sourceMappingURL=index.js.map