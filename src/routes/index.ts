import { Router } from "express";
import { docRouter } from "./doc";
import { googleRouter } from "./google";
import { memberRouter } from "./member";
import * as indexController from "../controllers/index";
export const router = Router();

router.get("/", indexController.status);

router.use("/google", googleRouter);
router.use("/member", memberRouter);

// add basic routes 'passe plat' to icoll api.
router.use("/doc", docRouter);
