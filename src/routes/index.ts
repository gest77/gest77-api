import { Router } from "express";
import * as indexController from "../controllers/index";
import { docRouter } from "./doc";

export const router = Router();

router.get("/", indexController.status);

// add basic routes 'passe plat' to icoll api.
router.use("/doc", docRouter);
