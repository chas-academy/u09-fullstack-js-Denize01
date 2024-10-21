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
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userModel_1 = __importDefault(require("../models/userModel"));
const authenticateToken_1 = require("../middleware/authenticateToken");
const router = (0, express_1.Router)();
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Spara userId i sessionen
        req.session.userId = user._id;
        console.log("User logged in, session userId:", req.session.userId);
        res
            .status(200)
            .json({ message: "Login successful", username: user.username });
    }
    catch (err) {
        res.status(500).json({ message: "Login failed" });
    }
}));
router.post("/register", userController_1.createUserController);
router.get("/users", userController_1.getUsersController);
// router.post("/login", loginUserController);
router.get("/session-info", (req, res) => {
    res.json({
        sessionId: req.session.id,
        userId: req.session.userId,
        session: req.session,
    });
});
router.put("/users/:id", authenticateToken_1.authenticateToken, userController_1.updateUserController);
router.delete("/users/:id", userController_1.deleteUserController);
// Radera användarens eget konto (användarens funktion)
router.delete("/user/delete", authenticateToken_1.authenticateToken, userController_1.deleteOwnAccountController);
exports.default = router;
