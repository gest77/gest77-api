import { catcher } from "../middlewares/catcher";
import { Router } from "express";
import * as helloassoController from "../controllers/helloasso";

export const helloassoRouter = Router();

// https://gest77-api.herokuapp.com/helloasso/redirect
helloassoRouter.post("/redirect", catcher(helloassoController.redirect, "helloassoController.redirect"));
