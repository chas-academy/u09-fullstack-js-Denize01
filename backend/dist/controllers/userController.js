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
exports.updateUserController = exports.deleteOwnAccountController = exports.deleteActivity = exports.deleteUserController = exports.loginUserController = exports.getUsersController = exports.createUserController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const activity_1 = __importDefault(require("../models/activity"));
// Skapa en ny användare
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, roles } = req.body; // Hämta data från frontend
    try {
        // Kolla om användaren redan existerar
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // Hasha lösenordet innan du sparar
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        // Skapa och spara den nya användaren i databasen
        const newUser = new userModel_1.default({
            username,
            email,
            password: hashedPassword,
            roles: roles || "user", // Om ingen roll anges, sätt till "user"
        });
        yield newUser.save(); // Spara användaren i MongoDB
        res
            .status(201)
            .json({ message: "User registered successfully", user: newUser });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.createUserController = createUserController;
// Hämta alla användare
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find(); // Hämta alla användare från databasen
        res.status(200).json(users); // Returnera användarna i svaret
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getUsersController = getUsersController;
// Inloggningsfunktion
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body; // Ta emot inloggningsuppgifter
    try {
        // Hitta användaren baserat på e-post
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // Kontrollera om lösenordet är korrekt
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // Om inloggningen lyckas, returnera användarinformation eller token
        res.status(200).json({ message: "Login successful", user });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.loginUserController = loginUserController;
// Radera en användare
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Få användarens ID från URL:en
    try {
        // Hitta och radera användaren av Admin
        const deletedUser = yield userModel_1.default.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.deleteUserController = deleteUserController;
// DELETE-rutt för att radera en aktivitet
const deleteActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Försök hitta och radera aktiviteten från databasen
        const deletedActivity = yield activity_1.default.findByIdAndDelete(id);
        if (!deletedActivity) {
            return res.status(404).json({ message: "Activity not found" });
        }
        res.status(200).json({ message: "Activity deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete activity", error });
    }
});
exports.deleteActivity = deleteActivity;
// Användare raderar ditt eget konto
const deleteOwnAccountController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.session.userId; // Hämtar användarens ID från sessionen
    try {
        // Radera användaren baserat på sessionens användar-ID
        const deletedUser = yield userModel_1.default.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        // Rensa sessionen efter radering
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).json({ message: "Error destroying session" });
            }
            res
                .status(200)
                .json({ message: "Your account has been deleted successfully" });
        });
    }
    catch (error) {
        console.error("Error deleting own account:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.deleteOwnAccountController = deleteOwnAccountController;
// Uppdatera endast användarnamn
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Få användarens ID från URL:en
    const { username } = req.body; // Hämta nytt användarnamn från request body
    try {
        // Kontrollera att användarnamn är tillhandahållet
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        // Hitta och uppdatera användaren i databasen
        const updatedUser = yield userModel_1.default.findByIdAndUpdate(id, { username }, // Endast uppdatera användarnamnet
        { new: true } // Returnera den uppdaterade användaren
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res
            .status(200)
            .json({ message: "User updated successfully", user: updatedUser });
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateUserController = updateUserController;
