import { Router } from "express";
import * as apikeyController from "../controllers/apikey";
import { catcher } from "../middlewares/catcher";

export const apikeyRouter = Router();

apikeyRouter.get("/", catcher(apikeyController.create, "apikeyController.create"));
