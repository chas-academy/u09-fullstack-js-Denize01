"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const authenticateToken = (req, res, next) => {
    // Kontrollera om userId finns i sessionen
    console.log("Session userId:", req.session.userId); // Lägg till detta för att se vad som händer
    if (!req.session.userId) {
        return res.status(401).json({ message: "You are not logged in." });
    }
    // Användaren är autentiserad, fortsätt till nästa middleware eller rutt
    next();
};
exports.authenticateToken = authenticateToken;
