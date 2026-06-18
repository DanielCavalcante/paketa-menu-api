import express from "express";
import menuRoutes from "./routes/menu.routes";

const app = express();

app.use(express.json());

app.use("/api/v1/menus", menuRoutes);

export default app;
