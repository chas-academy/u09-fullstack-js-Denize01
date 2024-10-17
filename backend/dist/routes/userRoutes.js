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
const router = (0, express_1.Router)();
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Spara userId i sessionen
        req.session.userId = user._id;
        res.status(200).json({ message: "Login successful", userId: user._id });
    }
    catch (err) {
        res.status(500).json({ message: "Login failed" });
    }
}));
router.post("/register", userController_1.createUserController);
router.get("/users", userController_1.getUsersController);
// router.post("/login", loginUserController);
router.put("/users/:id", userController_1.updateUserRoleController);
router.delete("/users/:id", userController_1.deleteUserController);
exports.default = router;
