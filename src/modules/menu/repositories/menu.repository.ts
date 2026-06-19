import MenuModel from "../schemas/menu.model";

export class MenuRepository {
  async create(name: string, parentId?: string) {
    return MenuModel.create({
      name,
      relatedId: parentId || null,
    });
  }

  async findById(id: string) {
    return MenuModel.findById(id);
  }

  async findByName(name: string) {
    return MenuModel.findOne({ name });
  }

  async findAll() {
    return MenuModel.find().lean();
  }

  async findChildren(parentId: string) {
    return MenuModel.find({ parentId });
  }

  async deleteById(id: string) {
    await MenuModel.findByIdAndDelete(id);
  }
}
