import { Router } from "express";
import { MenuController } from "../modules/menu/controllers/menu.controller";

const router = Router();

const controller = new MenuController();

router.post("/", controller.create);
router.delete("/:id", controller.delete);
router.get("/", controller.get);

export default router;
