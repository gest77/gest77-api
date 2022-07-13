import { Router } from "express";
import * as apikeyController from "../controllers/apikey";
import { catcher } from "../middlewares/catcher";
import { isLocalOrDev } from "../toolsServices/DotEnvHelper";

export const apikeyRouter = Router();

if (isLocalOrDev()) apikeyRouter.get("/", catcher(apikeyController.create, "apikeyController.create"));
