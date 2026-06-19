import { MenuEntity } from "../entities/menu.entity";
import { MenuDocument } from "../models/menu.model";

export interface IMenuRepository {
  create(name: string, parentId?: string): Promise<MenuDocument>;

  findById(id: string): Promise<MenuDocument | null>;

  findByName(name: string): Promise<MenuDocument | null>;

  findAll(): Promise<MenuEntity[]>;

  findChildren(parentId: string): Promise<MenuDocument[]>;

  deleteById(id: string): Promise<void>;
}
