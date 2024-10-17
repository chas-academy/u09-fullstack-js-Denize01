"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activity_1 = __importDefault(require("../models/activity")); // Importera Activity-modellen
const authenticateToken_1 = require("../middleware/authenticateToken");
const router = express_1.default.Router();
// POST: Lägg till en ny aktivitet för den inloggade användaren
router.post("/activities", authenticateToken_1.authenticateToken, (req, res) => {
    const { date, activity } = req.body;
    const userId = req.session.userId; // Hämta userId från sessionen
    if (!userId) {
        return res.status(401).json({ message: "Not logged in" });
    }
    if (!date || !activity) {
        return res.status(400).json({ message: "Date and activity are required" });
    }
    try {
        const newActivity = new activity_1.default({ date, activity, userId });
        newActivity
            .save()
            .then((savedActivity) => res.status(201).json(savedActivity))
            .catch((err) => res.status(500).json({ message: "Failed to add activity" }));
    }
    catch (err) {
        console.error("Error saving activity:", err);
        res.status(500).json({ message: "Failed to add activity" });
    }
});
// GET: Hämta aktiviteter för den inloggade användaren och ett specifikt datum
router.get("/activities/:date", authenticateToken_1.authenticateToken, (req, res) => {
    const { date } = req.params;
    const userId = req.session.userId; // Hämta userId från sessionen
    if (!userId) {
        return res.status(401).json({ message: "Not logged in" });
    }
    try {
        activity_1.default.find({ date, userId })
            .then((activities) => res.status(200).json(activities))
            .catch((err) => res.status(500).json({ message: "Failed to fetch activities" }));
    }
    catch (err) {
        console.error("Error fetching activities:", err);
        res.status(500).json({ message: "Failed to fetch activities" });
    }
});
exports.default = router;
