import { Schema, model } from "mongoose";

const MenuSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Menu",
      default: null
    }
  },
  {
    timestamps: true
  }
);

MenuSchema.index({ name: 1 }, { unique: true });
MenuSchema.index({ parentId: 1 });

export default model("Menu", MenuSchema);