export interface MenuNode {
  id: string;
  name: string;
  submenus: MenuNode[];
}

export interface CreateMenuDto {
  name: string;
  relatedId?: string;
}

export interface DetailMenuDto {
  id: string;
  name: string;
  relatedId?: string;
}
