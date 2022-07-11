import * as doc from "../config/swaggerConfig";
import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

export const docRouter = Router();

// configure doc pages :
if (doc.shouldDisplayApiDoc()) {
    docRouter.use("/", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(doc.fullDocOptions), doc.uiOptions));
}
