import express from "express";
import menuRoutes from "./routes/menu.routes";
import { errorMiddleware } from "./modules/menu/shared/middlewares/error.middleware";
import swaggerUi from "swagger-ui-express";
import { openApiDocument } from "./config/openapi/swagger";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.use("/api/v1/menus", menuRoutes);
app.use(errorMiddleware);
export default app;
