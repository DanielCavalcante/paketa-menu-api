import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;

export default async function connectMongo() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI!);

  isConnected = true;
  console.log("MongoDB connected");
}
