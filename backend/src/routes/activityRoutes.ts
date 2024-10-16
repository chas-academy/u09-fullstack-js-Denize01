import express, { Request, Response } from "express";
import Activity from "../models/activity"; // Importera Activity-modellen

const router = express.Router();

// POST: Lägg till en ny aktivitet
router.post("/activities", async (req: Request, res: Response) => {
  const { date, activity } = req.body;

  if (!date || !activity) {
    return res.status(400).json({ message: "Date and activity are required" });
  }

  try {
    const newActivity = new Activity({ date, activity });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    console.error("Error saving activity:", err);
    res.status(500).json({ message: "Failed to add activity" });
  }
});

// GET: Hämta aktiviteter för ett visst datum
router.get("/activities/:date", async (req: Request, res: Response) => {
  const { date } = req.params;

  try {
    const activities = await Activity.find({ date });
    res.status(200).json(activities);
  } catch (err) {
    console.error("Error fetching activities:", err);
    res.status(500).json({ message: "Failed to fetch activities" });
  }
});

export default router;
