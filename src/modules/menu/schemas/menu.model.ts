import { Schema, model } from "mongoose";

const MenuSchema = new Schema(
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

MenuSchema.index({ name: 1 }, { unique: true });
MenuSchema.index({ relatedId: 1 });

export default model("Menu", MenuSchema);
