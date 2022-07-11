"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldDisplayApiDoc = exports.uiOptions = exports.fullDocOptions = void 0;
var fs_1 = __importDefault(require("fs"));
var DotEnvHelper_1 = require("../toolsServices/DotEnvHelper");
exports.fullDocOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "gest - api - BO",
            version: "2.0.0",
            description: fs_1.default.readFileSync(__dirname + "/swagger.readme.md").toString(),
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    in: "header",
                    bearerFormat: "JWT",
                },
            },
        },
        servers: [{ url: "http://api.gest.wassa-dev.com" }, { url: "http://localhost:3030" }], // { url: "preprod" }, { url: "prod" }
    },
    apis: ["./src/**/*.swagger.ts", "./src/controllers/*.ts", "./src/services/*.ts"],
};
exports.uiOptions = {
    explorer: true,
    customCss: ".swagger-ui .topbar {display: none} section.models {display: none}",
    customSiteTitle: "gest API doc",
    customfavIcon: "../favicon.png",
};
var shouldDisplayApiDoc = function () {
    return (0, DotEnvHelper_1.isLocalOrDev)();
};
exports.shouldDisplayApiDoc = shouldDisplayApiDoc;
//# sourceMappingURL=swaggerConfig.js.map