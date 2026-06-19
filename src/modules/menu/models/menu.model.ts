import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

export const MenuSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    relatedId: {
      type: Schema.Types.ObjectId,
      ref: "Menu",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export type Menu = InferSchemaType<typeof MenuSchema>;

export type MenuDocument = HydratedDocument<Menu>;

export const MenuModel = model<Menu>("Menu", MenuSchema);
