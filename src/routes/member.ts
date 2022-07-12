import { Router } from "express";
import * as memberController from "../controllers/members";
import { catcher } from "../middlewares/catcher";

export const memberRouter = Router();

memberRouter.get("/", catcher(memberController.search, "memberController.search"));
