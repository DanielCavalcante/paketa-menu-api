import { Router } from "express";
import { MenuController } from "../modules/menu/controllers/menu.controller";
import { createMenuSchema } from "../modules/menu/schemas/create-menu.shema";
import { validate } from "../modules/menu/shared/middlewares/validate.middleware";

const router = Router();

const controller = new MenuController();

router.post("/", validate(createMenuSchema), controller.create);
router.delete("/:id", controller.delete);
router.get("/", controller.get);

export default router;
