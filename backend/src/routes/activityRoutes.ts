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
router.get("/activities", authenticateToken, async (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    const activities = await Activity.find({ userId });
    res.status(200).json(activities); // Returnera alla aktiviteter för användaren
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch activities" });
  }
});

// DELETE: Radera en aktivitet baserat på ID
router.delete(
  "/activities/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.session.userId; // Hämta userId från sessionen

    if (!userId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    try {
      // Försök hitta och radera aktiviteten från databasen som tillhör den inloggade användaren
      const deletedActivity = await Activity.findOneAndDelete({
        _id: id,
        userId,
      });

      if (!deletedActivity) {
        return res
          .status(404)
          .json({ message: "Activity not found or not authorized" });
      }

      res.status(200).json({ message: "Activity deleted successfully" });
    } catch (error) {
      console.error("Error deleting activity:", error);
      res.status(500).json({ message: "Failed to delete activity", error });
    }
  }
);

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

router.get("/activities", authenticateToken, async (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    const activities = await Activity.find({ userId });
    res.status(200).json(activities); // Returnera alla aktiviteter för användaren
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch activities" });
  }
});

// DELETE: Radera en aktivitet baserat på ID
router.delete(
  "/activities/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.session.userId; // Hämta userId från sessionen

    if (!userId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    try {
      // Försök hitta och radera aktiviteten från databasen som tillhör den inloggade användaren
      const deletedActivity = await Activity.findOneAndDelete({
        _id: id,
        userId,
      });

      if (!deletedActivity) {
        return res
          .status(404)
          .json({ message: "Activity not found or not authorized" });
      }

      res.status(200).json({ message: "Activity deleted successfully" });
    } catch (error) {
      console.error("Error deleting activity:", error);
      res.status(500).json({ message: "Failed to delete activity", error });
    }
  }
);

export default router;
