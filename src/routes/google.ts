import { Router } from "express";
import * as googleController from "../controllers/google";

export const googleRouter = Router();

googleRouter.get("/redirect", googleController.redirect);
