import mongoose from "mongoose";
import { env } from "./env";
import pino from "pino";

const logger = pino();
let isConnected = false;

export default async function connectMongo() {
  if (isConnected) return;

  await mongoose.connect(env.mongoUri!);

  isConnected = true;
  logger.info("MongoDB connected");
}
