import { MenuEntity } from "../../entities/menu.entity";
import { MenuNode } from "../../types/menu.type";

export function buildMenuTree(menus: MenuEntity[]): MenuNode[] {
  const map = new Map<string, MenuNode>();

  menus.forEach((menu) => {
    map.set(menu._id.toString(), {
      id: menu._id.toString(),
      name: menu.name,
      submenus: [],
    });
  });

  const roots: MenuNode[] = [];

  menus.forEach((menu) => {
    const currentNode = map.get(menu._id.toString())!;

    if (menu.relatedId) {
      const parentNode = map.get(menu.relatedId.toString());

      parentNode?.submenus.push(currentNode);
    } else {
      roots.push(currentNode);
    }
  });

  return roots;
}
