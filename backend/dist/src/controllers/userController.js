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
exports.getUsersController = exports.createUserController = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, roles } = req.body;
    try {
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User with this email already exists" });
        }
        console.log("recieved data", req.body);
        const newUser = yield userModel_1.default.create({ name, email, password, roles });
        res.status(201).json(newUser);
    }
    catch (error) {
        res
            .status(500)
            .json({ messsage: "Error. User could not be created", error });
    }
});
exports.createUserController = createUserController;
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});
exports.getUsersController = getUsersController;
// import { Request, Response } from "express";
// import User from "../models/userModel";
// // Skapa en ny användare
// export const createUserController = async (req: Request, res: Response) => {
//   const { name, email, password } = req.body;
//   try {
//     // Kontrollera om användaren redan finns
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "Användare med denna e-postadress finns redan" });
//     }
//     // Skapa en ny användare utan lösenordshashning
//     const newUser = await User.create({
//       name,
//       email,
//       password, // Lagrar lösenordet som det är (endast för teständamål)
//     });
//     res.status(201).json({
//       _id: newUser._id,
//       name: newUser.name,
//       email: newUser.email,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating user", error });
//   }
// };
// // Hämta alla användare
// export const getUsersController = async (req: Request, res: Response) => {
//   try {
//     const users = await User.find().select("-password"); // Exkludera lösenord från svaret
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching users", error });
//   }
// };
