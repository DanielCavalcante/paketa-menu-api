import mongoose from "mongoose";
import { env } from "./env";

let isConnected = false;

export default async function connectMongo() {
  if (isConnected) return;

  await mongoose.connect(env.mongoUri!);

  isConnected = true;
  console.log("MongoDB connected");
}
