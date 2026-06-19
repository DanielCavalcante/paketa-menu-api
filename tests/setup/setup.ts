import {
  clearDatabase,
  connectMongoMemory,
  disconnectMongoMemory,
} from "./mongodb";

beforeAll(async () => {
  await connectMongoMemory();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await disconnectMongoMemory();
});
