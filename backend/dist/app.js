"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const activityRoutes_1 = __importDefault(require("./routes/activityRoutes"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Använd miljövariabler för frontend-URL och sessionshemlighet
const FRONTEND_URL = process.env.REACT_APP_API_BASE_URL || "http://tracksterapp.netlify.app";
const SESSION_SECRET = process.env.SESSION_SECRET || "your-secret-key";
// Konfigurera CORS
app.use((0, cors_1.default)({
    origin: FRONTEND_URL, // Tillåt endast anrop från frontend-URL
    credentials: true, // Tillåt cookies vid API-anrop
}));
app.use(express_1.default.json());
// Konfigurera sessionshantering
app.use((0, express_session_1.default)({
    secret: SESSION_SECRET, // Hämtas från .env
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" }, // Säkra cookies endast i produktion
}));
// Anslut till databasen
(0, db_1.default)();
// Testroute
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
// API-rutter
app.use("/api", userRoutes_1.default);
app.use("/api", activityRoutes_1.default);
// Testroute för att verifiera API-åtkomst
app.get("/test", (req, res) => {
    res.json({ message: "Test route works!" });
});
exports.default = app;
