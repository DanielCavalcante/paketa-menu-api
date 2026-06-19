import app from "./app";
import { env } from "./config/env";
import connectMongo from "./config/mongodb";

const PORT = env.port;

async function bootstrap() {
  await connectMongo();

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}

bootstrap();
