import { MenuEntity } from "../entities/menu.entity";
import { MenuModel } from "../schemas/menu.model";

export class MenuRepository {
  async create(name: string, parentId?: string): Promise<MenuEntity> {
    return MenuModel.create({
      name,
      relatedId: parentId || null,
    });
  }

  async findById(id: string): Promise<MenuEntity | null> {
    return MenuModel.findById(id);
  }

  async findByName(name: string): Promise<MenuEntity | null> {
    return MenuModel.findOne({ name });
  }

  async findAll(): Promise<MenuEntity[]> {
    return MenuModel.find().lean().exec();
  }

  async findChildren(parentId: string): Promise<MenuEntity[]> {
    return MenuModel.find({ relatedId: parentId });
  }

  async deleteById(id: string) {
    await MenuModel.findByIdAndDelete(id);
  }
}
