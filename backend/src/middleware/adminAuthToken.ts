import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const adminAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Kontrollera om userId finns i sessionen
  // console.log("Session userId:", req.session.userId); // Lägg till detta för att se vad som händer
  // if (!req.session.userId) {
  //   return res.status(401).json({ message: "You are not logged in." });
  // }
  console.log("JWT Token", req.cookies.token);
  const jwtcookie = req.cookies.token;

  interface DecodedToken {
    user: {
      _id: string;
      username: string;
      email: string;
      password: string;
      isActive: boolean;
      roles: string;
      createdAt: string;
      updatedAt: string;
    };
    iat: number;
  }

  try {
    let decoded = jwt.verify(
      jwtcookie,
      "8df254a9b6db0571414ab57b232f6f4b31987514120cf052822a83aff18c9414bede0da145e643c5fa13a1bd8bce0903d424a20e7e17ab617995e57a216c308f"
    ) as DecodedToken;

    if (decoded.user.roles === "admin") {
      next();
    } else {
      return res.status(401).json({ message: "You are not logged in." });
    }
  } catch (error) {
    return res.status(401).json({ message: "You are not logged in." });
  }
  // Användaren är autentiserad, fortsätt till nästa middleware eller rutt
};
