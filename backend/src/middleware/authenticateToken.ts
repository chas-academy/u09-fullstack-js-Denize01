import { Request, Response, NextFunction } from "express";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Kontrollera om userId finns i sessionen
  console.log("Session userId:", req.session.userId); // Lägg till detta för att se vad som händer
  if (!req.session.userId) {
    return res.status(401).json({ message: "You are not logged in." });
  }

  // Användaren är autentiserad, fortsätt till nästa middleware eller rutt
  next();
};
