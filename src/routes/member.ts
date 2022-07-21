import { Router } from "express";
import * as memberController from "../controllers/members";
import { catcher } from "../middlewares/catcher";
import { checkJwt } from "../middlewares/jwtChecker";

export const memberRouter = Router();

memberRouter.get("/", checkJwt(), catcher(memberController.search, "memberController.search"));
memberRouter.get("/findme", checkJwt(), catcher(memberController.findme, "memberController.findme"));
memberRouter.post("/", checkJwt(), catcher(memberController.preregister, "memberController.preregister"));
memberRouter.get("/:year", checkJwt(), catcher(memberController.search, "memberController.search"));
