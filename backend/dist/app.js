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
const cors_1 = __importDefault(require("cors")); // Importera CORS
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// const PORT = process.env.PORT || 3000;
// const FRONTEND_URL = process.env.REACT_APP_API_BASE_URL || "https://tracksterapp.netlify.app/";
// const SESSION_SECRET = process.env.SESSION_SECRET || "your-secret-key"; // Fallback för utveckling
// Använd CORS som middleware
app.use((0, cors_1.default)({
    origin: `https://tracksterapp.netlify.app/`, //http://localhost:5173
    credentials: true,
}));
app.use(express_1.default.json());
// Konfigurera sessionshantering
app.use((0, express_session_1.default)({
    secret: "SESSION_SECET", // Borde lagras i .env-filen
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }, // Sätt till 'true' om du använder HTTPS
}));
(0, db_1.default)();
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use("/api", userRoutes_1.default);
app.use("/api", activityRoutes_1.default);
// I testsyfte
app.get("/test", (req, res) => {
    res.json({ message: "Test route works!" });
});
exports.default = app;
