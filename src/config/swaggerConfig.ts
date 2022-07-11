import fs from "fs";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { isLocalOrDev } from "../toolsServices/DotEnvHelper";

export const fullDocOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "gest - api - BO",
            version: "2.0.0",
            description: fs.readFileSync(__dirname + "/swagger.readme.md").toString(),
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

export const uiOptions: swaggerUi.SwaggerUiOptions = {
    explorer: true,
    customCss: ".swagger-ui .topbar {display: none} section.models {display: none}",
    customSiteTitle: "gest API doc",
    customfavIcon: "../favicon.png",
};

export const shouldDisplayApiDoc = (): boolean => {
    return isLocalOrDev();
};
