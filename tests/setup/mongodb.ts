import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: MongoMemoryServer;

export async function connectMongoMemory() {
  mongo = await MongoMemoryServer.create();

  await mongoose.connect(mongo.getUri());
}

export async function disconnectMongoMemory() {
  await mongoose.connection.dropDatabase();

  await mongoose.connection.close();

  await mongo.stop();
}

export async function clearDatabase() {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}
