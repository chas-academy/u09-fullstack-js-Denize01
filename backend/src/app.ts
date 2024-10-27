import express, { Express, Request, Response } from "express";
import session from "express-session";
import userRoutes from "./routes/userRoutes";
import activityRoutes from "./routes/activityRoutes";
import connectDB from "./config/db";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

// Använd miljövariabler för frontend-URL och sessionshemlighet
const FRONTEND_URL =
  process.env.REACT_APP_API_BASE_URL || "http://tracksterapp.netlify.app";
const SESSION_SECRET = process.env.SESSION_SECRET || "your-secret-key";

// Konfigurera CORS
app.use(
  cors({
    origin: FRONTEND_URL, // Tillåt endast anrop från frontend-URL
    credentials: true, // Tillåt cookies vid API-anrop
  })
);

app.use(express.json());

// Konfigurera sessionshantering
app.use(
  session({
    secret: SESSION_SECRET, // Hämtas från .env
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" }, // Säkra cookies endast i produktion
  })
);

// Anslut till databasen
connectDB();

// Testroute
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// API-rutter
app.use("/api", userRoutes);
app.use("/api", activityRoutes);

// Testroute för att verifiera API-åtkomst
app.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Test route works!" });
});

export default app;
