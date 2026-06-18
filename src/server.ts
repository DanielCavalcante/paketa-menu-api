import app from "./app";
import connectMongo from "./config/mongodb";

const PORT = 3000;

async function bootstrap() {
  await connectMongo();

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}

bootstrap();
