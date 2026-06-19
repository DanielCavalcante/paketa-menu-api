import { Types } from "mongoose";
import { MenuRepository } from "../repositories/menu.repository";
import { CreateMenuDto, DetailMenuDto, MenuNode } from "../types/menu.type";
import { pino } from "pino";
import { AppError } from "../shared/errors/app-error";
import { buildMenuTree } from "../shared/utils/build-menu-tree";
const logger = pino();

export class MenuService {
  constructor(private repository = new MenuRepository()) {}

  async create(data: CreateMenuDto): Promise<DetailMenuDto> {
    const menuExists = await this.repository.findByName(data.name);

    if (menuExists) {
      logger.error(`Menu with name "${data.name}" already exists`);
      throw new AppError("Menu already exists", 409);
    }

    if (data.relatedId) {
      const parent = await this.repository.findById(data.relatedId);

      if (!parent) {
        logger.error(`Parent menu with ID "${data.relatedId}" not found`);
        throw new AppError("Parent menu not found", 404);
      }
    }

    const menu = await this.repository.create(data.name, data.relatedId);

    return {
      id: menu._id.toString(),
      name: menu.name,
      relatedId: menu.relatedId?.toString(),
    };
  }

  async delete(id: string): Promise<void> {
    logger.info(`Deleting menu with ID "${id}"`);
    await this.deleteRecursively(id);
  }

  private async deleteRecursively(id: string): Promise<void> {
    const children = await this.repository.findChildren(id);

    for (const child of children) {
      await this.deleteRecursively(child._id.toString());
    }

    await this.repository.deleteById(id);
  }

  async getMenuTree(): Promise<MenuNode[]> {
    const menus = await this.repository.findAll();
    return buildMenuTree(menus);
  }
}
