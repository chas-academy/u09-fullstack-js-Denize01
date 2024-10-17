"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const authenticateToken = (req, res, next) => {
    // Kontrollera om userId finns i sessionen
    if (!req.session.userId) {
        return res.status(401).json({ message: "You are not logged in." });
    }
    // Användaren är autentiserad, fortsätt till nästa middleware eller rutt
    next();
};
exports.authenticateToken = authenticateToken;
