import { Request, Response } from "express";
import { MenuService } from "../services/menu.service";
import { pino } from "pino";

const logger = pino();

export class MenuController {
  constructor(private service = new MenuService()) {}

  create = async (req: Request, res: Response) => {
    const response = await this.service.create(req.body);
    return res.status(201).json(response);
  };

  delete = async (req: Request, res: Response) => {
    const rawId = req.params?.id;
    if (!rawId) return res.sendStatus(400);

    const id = Array.isArray(rawId) ? rawId[0] : rawId;
    await this.service.delete(id);
    return res.sendStatus(200);
  };

  get = async (req: Request, res: Response) => {
    const menus = await this.service.getMenuTree();
    return res.status(200).json(menus);
  };
}
