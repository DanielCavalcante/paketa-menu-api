export interface MenuNode {
  id: string;
  name: string;
  submenus: MenuNode[];
}

export interface CreateMenuDto {
  name: string;
  relatedId?: string;
}
