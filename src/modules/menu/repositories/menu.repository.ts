import { IMenuRepository } from "../interfaces/menu.interface";
import { MenuDocument, MenuModel } from "../models/menu.model";

export class MenuRepository implements IMenuRepository {
  async create(name: string, parentId?: string): Promise<MenuDocument> {
    return MenuModel.create({
      name,
      relatedId: parentId || null,
    });
  }

  async findById(id: string): Promise<MenuDocument | null> {
    return MenuModel.findById(id);
  }

  async findByName(name: string): Promise<MenuDocument | null> {
    return MenuModel.findOne({ name });
  }

  async findAll(): Promise<MenuDocument[]> {
    return MenuModel.find().exec();
  }

  async findChildren(parentId: string): Promise<MenuDocument[]> {
    return MenuModel.find({ relatedId: parentId });
  }

  async deleteById(id: string) {
    await MenuModel.findByIdAndDelete(id);
  }
}
