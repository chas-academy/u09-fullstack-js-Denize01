import express, { Request, Response } from "express";
import Activity from "../models/activity"; // Importera Activity-modellen
import { authenticateToken } from "../middleware/authenticateToken";

const router = express.Router();

// POST: Lägg till en ny aktivitet för den inloggade användaren
router.post("/activities", authenticateToken, (req: Request, res: Response) => {
  const { date, activity } = req.body;
  const userId = req.session.userId; // Hämta userId från sessionen

  if (!userId) {
    return res.status(401).json({ message: "Not logged in" });
  }

  if (!date || !activity) {
    return res.status(400).json({ message: "Date and activity are required" });
  }

  try {
    const newActivity = new Activity({ date, activity, userId });
    newActivity
      .save()
      .then((savedActivity) => res.status(201).json(savedActivity))
      .catch((err) =>
        res.status(500).json({ message: "Failed to add activity" })
      );
  } catch (err) {
    console.error("Error saving activity:", err);
    res.status(500).json({ message: "Failed to add activity" });
  }
});

// GET: Hämta aktiviteter för den inloggade användaren och ett specifikt datum
router.get(
  "/activities/:date",
  authenticateToken,
  (req: Request, res: Response) => {
    const { date } = req.params;
    const userId = req.session.userId; // Hämta userId från sessionen

    if (!userId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    try {
      Activity.find({ date, userId })
        .then((activities) => res.status(200).json(activities))
        .catch((err) =>
          res.status(500).json({ message: "Failed to fetch activities" })
        );
    } catch (err) {
      console.error("Error fetching activities:", err);
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  }
);

export default router;
