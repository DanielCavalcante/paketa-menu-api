import { pino } from "pino";
import app from "./app";
import { env } from "./config/env";
import connectMongo from "./config/mongodb";

const PORT = env.port;
const logger = pino();

async function bootstrap() {
  await connectMongo();

  app.listen(PORT, () => {
    logger.info(`Server running on ${PORT}`);
  });
}

bootstrap();
