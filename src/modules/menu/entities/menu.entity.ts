import { Types } from "mongoose";

export interface MenuEntity {
  _id: Types.ObjectId;
  name: string;
  relatedId?: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}
