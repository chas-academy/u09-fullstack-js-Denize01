import express, { Express, Request, Response } from "express";
import session from "express-session";
import userRoutes from "./routes/userRoutes";
import activityRoutes from "./routes/activityRoutes";
import connectDB from "./config/db";
import cors from "cors"; // Importera CORS

const app: Express = express();

// Använd CORS som middleware
app.use(
  cors({
    origin: `http://localhost:5173`,
    credentials: true,
  })
);

app.use(express.json());

// Konfigurera sessionshantering
app.use(
  session({
    secret: "your-secret-key", // Borde lagras i .env-filen
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Sätt till 'true' om du använder HTTPS
  })
);

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
