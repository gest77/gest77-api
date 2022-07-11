"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showEnv = void 0;
require("dotenv/config");
var app_root_path_1 = __importDefault(require("app-root-path"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var corsConfig_1 = __importDefault(require("./config/corsConfig"));
var uploadConfig_1 = __importDefault(require("./config/uploadConfig"));
var i18nConfig_1 = __importDefault(require("./config/i18nConfig"));
var routes_1 = require("./routes");
var showEnv = function () {
    var result = "";
    var times = process.env.TIMES || 5;
    for (var i = 0; i < times; i++) {
        result += i + " ";
    }
    return result;
};
exports.showEnv = showEnv;
// express()
//     .use(express.static(path.join(__dirname, "public")))
//     .set("views", path.join(__dirname, "views"))
//     .set("view engine", "ejs")
//     .get("/", (req, res) => res.render("pages/index"))
//     .get("/times", (req, res) => res.send(showEnv()))
//     .listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));
// import { getJwtSecret } from "./toolsServices/TokenService";
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var app;
    return __generator(this, function (_a) {
        app = (0, express_1.default)();
        app.use(i18n.init);
        app.use((0, cookie_parser_1.default)());
        app.use((0, cors_1.default)(corsConfig_1.default));
        app.use(express_1.default.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
        app.use((0, express_fileupload_1.default)());
        app.use(express_1.default.json()); // parse application/json
        // present file favicon (used in api doc, as favicon)
        app.use("/favicon.png", express_1.default.static(app_root_path_1.default + "/src/resources/favicon.png"));
        // present uploaded files to users.
        app.use(uploadConfig_1.default.UPLOAD_DIR, express_1.default.static(app_root_path_1.default + "/" + uploadConfig_1.default.UPLOAD_DIR));
        // should be the last ?
        app.use("/", routes_1.router);
        // first parameter is the route as it would appears in navigator
        // third parameter is local path of public folder. (__dirname == ./src)
        // This one need cookie parser.
        app.listen(process.env.PORT, function () {
            console.log("Server started on http://localhost:".concat(process.env.PORT));
        });
        return [2 /*return*/];
    });
}); };
//Trads options : note the header that would contains the language. it is not default !
//crashIfEnvKO();
i18n.configure(i18nConfig_1.default);
main();
//# sourceMappingURL=index.js.map