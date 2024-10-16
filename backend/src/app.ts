import express, { Express, Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import activityRoutes from "./routes/activityRoutes";
import connectDB from "./config/db";
import cors from "cors"; // Importera CORS

const app: Express = express();

// Använd CORS som middleware
app.use(cors());

app.use(express.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api", userRoutes);
app.use("/api", activityRoutes);

// I testsyfte
app.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Test route works!" });
});

export default app;
