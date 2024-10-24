"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
router.get("/activities", authenticateToken_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ message: "Not logged in" });
    }
    try {
        const activities = yield activity_1.default.find({ userId });
        res.status(200).json(activities); // Returnera alla aktiviteter för användaren
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch activities" });
    }
}));
// DELETE: Radera en aktivitet baserat på ID
router.delete("/activities/:id", authenticateToken_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.session.userId; // Hämta userId från sessionen
    if (!userId) {
        return res.status(401).json({ message: "Not logged in" });
    }
    try {
        // Försök hitta och radera aktiviteten från databasen som tillhör den inloggade användaren
        const deletedActivity = yield activity_1.default.findOneAndDelete({
            _id: id,
            userId,
        });
        if (!deletedActivity) {
            return res
                .status(404)
                .json({ message: "Activity not found or not authorized" });
        }
        res.status(200).json({ message: "Activity deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting activity:", error);
        res.status(500).json({ message: "Failed to delete activity", error });
    }
}));
//GET: Sök aktivitet baserat på en sökterm
// router.get(
//   "/activities",
//   authenticateToken,
//   async (req: Request, res: Response) => {
//     const userId = req.session.userId;
//     if (!userId) {
//       return res.status(401).json({ message: "Not logged in" });
//     }
//     try {
//       const activities = await Activity.find({ userId });
//       res.status(200).json(activities); // Returnera alla aktiviteter
//     } catch (err) {
//       console.error("Error fetching activities:", err);
//       res.status(500).json({ message: "Failed to fetch activities" });
//     }
//   }
// );
router.get("/activities", authenticateToken_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ message: "Not logged in" });
    }
    try {
        const activities = yield activity_1.default.find({ userId });
        res.status(200).json(activities); // Returnera alla aktiviteter för användaren
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch activities" });
    }
}));
// DELETE: Radera en aktivitet baserat på ID
router.delete("/activities/:id", authenticateToken_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.session.userId; // Hämta userId från sessionen
    if (!userId) {
        return res.status(401).json({ message: "Not logged in" });
    }
    try {
        // Försök hitta och radera aktiviteten från databasen som tillhör den inloggade användaren
        const deletedActivity = yield activity_1.default.findOneAndDelete({
            _id: id,
            userId,
        });
        if (!deletedActivity) {
            return res
                .status(404)
                .json({ message: "Activity not found or not authorized" });
        }
        res.status(200).json({ message: "Activity deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting activity:", error);
        res.status(500).json({ message: "Failed to delete activity", error });
    }
}));
exports.default = router;
