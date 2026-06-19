import express from "express";
import menuRoutes from "./routes/menu.routes";
import { errorMiddleware } from "./modules/menu/shared/middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use("/api/v1/menus", menuRoutes);
app.use(errorMiddleware);
export default app;
